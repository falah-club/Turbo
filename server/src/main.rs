mod html;
mod subscription;
mod info;
mod event;
mod auth;

use std::mem;
use lazy_static::lazy_static;
use std::sync::Mutex;
use rusqlite::{params, Connection, Result};
use salvo::http::Method;
use salvo::prelude::*;
use crate::event::{Event, Geo};
use crate::html::INDEX_HTML;
use crate::subscription::ical::generate_ics;
use crate::subscription::rss::rss;

// Lazy static connection, using Mutex for thread safety
lazy_static! {
    static ref CONN: Mutex<Connection> = Mutex::new(Connection::open_in_memory().unwrap());
}


// Endpoint to get all events
#[endpoint(
    tags("event", "crud"),
    summary = "Retrieve a list of events",
    description = "Fetches a list of events with optional offset and limit for pagination.",
    tags("event", "pagination"),
    parameters(
        ("offset", description = "Offset is an optional query paramter."),
    )
)]
async fn get_events(_req: &mut Request, _depot: &mut Depot, res: &mut Response, _ctrl: &mut FlowCtrl) {
    // let id = _req.param::<i64>("id").unwrap();
    let events = event::read_events().await;
    res.render(&format!("{:?}", events));
}

// Endpoint to create a new event
#[endpoint(
    tags("event", "crud"),
    summary = "Create a event",
    tags("event"),
    parameters(Event),

)]
async fn post_event(_req: &mut Request, _depot: &mut Depot, res: &mut Response, _ctrl: &mut FlowCtrl) {
    res.render("Hello world");
}

// Endpoint to get a specific event by ID
#[endpoint(
    summary = "Read a specific event",
    description = "Finds the event with the given id and reads it.",
    tags("event", "slug", "crud"),
    parameters(
        ("offset", description = "Offset is an optional query paramter."),
    )
)]
async fn get_event(_req: &mut Request, _depot: &mut Depot, res: &mut Response, _ctrl: &mut FlowCtrl) {
    let id = _req.param::<i64>("id").unwrap();
    res.render(&format!("Hello {} world", id));
}

// Endpoint to update a specific event
#[endpoint(
    summary = "Update a specific event",
    description = "Finds the event with the given id and updates it with the provided data.",
    tags("event", "slug", "crud"),
    parameters(
        ("offset", description = "Offset is an optional query paramter."),
    )
)]
async fn patch_event(_req: &mut Request, _depot: &mut Depot, res: &mut Response, _ctrl: &mut FlowCtrl) {
    res.render("Hello world");
}

// Endpoint to delete a specific event
#[endpoint(
    tags("event"),
    summary = "Delete a specific event",
    description = "Finds the event with the given id and deletes it.",
    tags("event", "slug", "crud"),
    parameters(
        ("offset", description = "Offset is an optional query paramter."),
    )
)]
async fn delete_event(_req: &mut Request, _depot: &mut Depot, res: &mut Response, _ctrl: &mut FlowCtrl) {

    res.render("Hello world");
}

// Endpoint to generate RSS feed subscription
#[endpoint(
    tags("subscription","slug", "feed", "crud"),
    summary = "Generate a rss feed of events",
    description = "Queries the database for events and creates a rss feed.",
    parameters(
        ("offset", description = "Offset is an optional query paramter."),
    )
)]
async fn event_feed_subscription(_req: &mut Request, _depot: &mut Depot, res: &mut Response, _ctrl: &mut FlowCtrl) {
    let events = event::read_events().await;
    let feed = rss(events);
    res.add_header("Content-Type", "xml/rss", false).unwrap();    // Render the ICS data as the response body
    res.render(feed);
}

// Endpoint to generate calendar subscription
#[endpoint(
    tags("subscription","slug", "calendar", "crud"),
    summary = "Generate a calendar of events",
    description = "Queries the database for events and creates a ical.",
    parameters(
        ("offset", description = "Offset is an optional query paramter."),
    )
)]
async fn event_calendar_subscription(_req: &mut Request, _depot: &mut Depot, res: &mut Response, _ctrl: &mut FlowCtrl) {
    let events = event::read_events().await;
    let ics_data = generate_ics("My Calendar", events, Some("https://mycalendar.com/feed"));
    // Set the Content-Type header to text/calendar
    res.add_header("Content-Type", "text/calendar", false).unwrap();    // Render the ICS data as the response body
    res.render(ics_data);
}

#[tokio::main]
async fn main() -> Result<()> {
    let conn = CONN.lock().unwrap();
    conn.execute(
        "CREATE TABLE event (
            uid          TEXT PRIMARY KEY,
            title        TEXT NOT NULL,
            description  TEXT,
            location     TEXT,
            url          TEXT NOT NULL,
            geo_lat      REAL NOT NULL,
            geo_lon      REAL NOT NULL,
            geo_radius   INTEGER NOT NULL,
            categories   TEXT NOT NULL,
            start_year   INTEGER NOT NULL,
            start_month  INTEGER NOT NULL,
            start_day    INTEGER NOT NULL,
            start_hour   INTEGER NOT NULL,
            start_minute INTEGER NOT NULL,
            duration_hrs INTEGER NOT NULL,
            duration_min INTEGER NOT NULL,
            status       TEXT NOT NULL,
            sequence     INTEGER NOT NULL,
            product_id   TEXT NOT NULL
        )",
        [],
    )?;

    let event = Event {
        uid: "1".to_string(),
        title: "Sample Event".to_string(),
        description: "An example event".to_string(),
        location: Some("Virtual".to_string()),
        url: "https://example.com".to_string(),
        geo: Geo {
            lat: 40.7128,
            lon: -74.0060,
            radius: 100,
        },
        categories: vec!["Tech".to_string(), "Workshop".to_string()],
        start: [2025, 1, 10, 9, 30],
        duration: (2, 0),
        status: "CONFIRMED".to_string(),
        sequence: 1,
        product_id: "ProductXYZ".to_string(),
    };

    conn.execute(
        "INSERT INTO event (
            uid, title, description, location, url,
            geo_lat, geo_lon, geo_radius, categories,
            start_year, start_month, start_day, start_hour, start_minute,
            duration_hrs, duration_min, status, sequence, product_id
        ) VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10, ?11, ?12, ?13, ?14, ?15, ?16, ?17, ?18, ?19)",
        params![
            event.uid,
            event.title,
            event.description,
            event.location,
            event.url,
            event.geo.lat,
            event.geo.lon,
            event.geo.radius,
            event.categories.join(","), // Storing categories as a comma-separated string
            event.start[0],
            event.start[1],
            event.start[2],
            event.start[3],
            event.start[4],
            event.duration.0,
            event.duration.1,
            event.status,
            event.sequence,
            event.product_id,
        ],
    )?;

    mem::drop(conn); // Unlock the mutex explicitly

    tracing_subscriber::fmt().init();

    // Set up routing
    let mut router = Router::new()
        .get(index)
        .push(
            Router::with_path("event")
                .get(get_events)
                .post(post_event)
                .push(
                    Router::with_path("<id>")
                        .get(get_event)
                        .patch(patch_event)
                        .delete(delete_event),
                ),
        )
        .push(
            Router::with_path("subscription")
                .push(
                    Router::with_path("feed")
                        .get(event_feed_subscription)
                )
                .push(
                    Router::with_path("calendar")
                        .get(event_calendar_subscription)
                ),
        );
    // Now you can call the function from api_info.rs
    let api_info = info::get_api_info();
    let doc = OpenApi::with_info(api_info).merge_router(&router);

    // Add OpenAPI documentation routes
    router = router
        .unshift(doc.into_router("/api-doc/openapi.json"))
        .unshift(
            Scalar::new("/api-doc/openapi.json")
                .title("Falah - Scalar")
                .into_router("/scalar"),
        );


    let cors = Cors::new()
        .allow_origin("https://salvo.rs")
        .allow_methods(vec![Method::GET, Method::POST, Method::DELETE])
        .into_handler();

    let router = Router::new().get(hello);
    let service = Service::new(router).hoop(cors);

    let acceptor = TcpListener::new("127.0.0.1:5800").bind().await;
    Server::new(acceptor).serve(service).await;

    // Start the server
    let acceptor = TcpListener::new("127.0.0.1:5800").bind().await;
    Server::new(acceptor).serve(router).await;

    Ok(())
}

// Handler for the index page
#[handler]
pub async fn index() -> Text<&'static str> {
    Text::Html(INDEX_HTML)
}
