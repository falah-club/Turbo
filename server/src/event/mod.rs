use salvo::oapi::{ToParameters, ToSchema};
use serde::Deserialize;
use crate::CONN;
use rusqlite::{Result};
use tokio::task;

#[derive(Deserialize, ToParameters, Debug)]
pub struct Event {
    pub(crate) uid: String,
    pub(crate) title: String,
    pub(crate) description: String,
    pub(crate) location: Option<String>,
    pub(crate) url: String,
    pub(crate) geo: Geo,
    pub(crate) categories: Vec<String>,
    pub(crate) start: [i32; 5], // Year, month, day, hour, minute
    pub(crate) duration: (i32, i32), // Duration in hours and minutes
    pub(crate) status: String,
    pub(crate) sequence: i32,
    pub(crate) product_id: String,
}

#[derive(Deserialize, ToSchema, Debug)]
pub struct Geo {
    pub(crate) lat: f64,
    pub(crate) lon: f64,
    pub(crate) radius: i32,
}

pub(crate) async fn read_events() -> Vec<Event> {
    // Using `tokio::task::spawn_blocking` to offload the blocking SQLite query
    let events = task::spawn_blocking(|| {
        // Try to acquire the database lock
        let conn = match CONN.lock() {
            Ok(conn) => conn,
            Err(_) => {
                eprintln!("Error: Failed to acquire database lock.");
                return vec![]; // Return empty if locking fails
            }
        };

        // Prepare the SQL statement
        let mut stmt = match conn.prepare(
            "SELECT
                uid, title, description, location, url,
                geo_lat, geo_lon, geo_radius, categories,
                start_year, start_month, start_day, start_hour, start_minute,
                duration_hrs, duration_min, status, sequence, product_id
            FROM event",
        ) {
            Ok(stmt) => stmt,
            Err(_) => {
                eprintln!("Error: Failed to prepare SQL statement.");
                return vec![]; // Return empty vector if preparation fails
            }
        };

        // Execute the query and map rows to Event structs
        let event_iter = match stmt.query_map([], |row| {
            Ok(Event {
                uid: row.get(0)?,
                title: row.get(1)?,
                description: row.get(2)?,
                location: row.get(3)?,
                url: row.get(4)?,
                geo: Geo {
                    lat: row.get(5)?,
                    lon: row.get(6)?,
                    radius: row.get(7)?,
                },
                categories: row.get::<_, String>(8)?
                    .split(',')
                    .map(|s| s.to_string())
                    .collect(),
                start: [
                    row.get(9)?,
                    row.get(10)?,
                    row.get(11)?,
                    row.get(12)?,
                    row.get(13)?,
                ],
                duration: (row.get(14)?, row.get(15)?),
                status: row.get(16)?,
                sequence: row.get(17)?,
                product_id: row.get(18)?,
            })
        }) {
            Ok(iter) => iter,
            Err(_) => {
                eprintln!("Error: Failed to execute query or map rows.");
                return vec![]; // Return empty vector if query fails
            }
        };

        // Collect the events or return empty if there's an error
        let events: Vec<Event> = event_iter.filter_map(|result| result.ok()).collect();

        events
    }).await;

    // Return the events, or an empty vector if there was an error in the task
    events.unwrap_or_else(|_| {
        eprintln!("Error: Failed to execute blocking task for reading events.");
        vec![] // Return empty vector if task execution fails
    })
}