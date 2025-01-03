use chrono::{NaiveDate, NaiveDateTime, NaiveTime, Utc};
use crate::event::{Event};

// Generate Apple-specific structured location string
fn apple_structured_location(ev: &Event) -> Option<String> {
    Some(format!(
        "X-APPLE-STRUCTURED-LOCATION;VALUE=URI;X-APPLE-RADIUS={};X-TITLE=\"{}\":geo:{},{}",
        ev.geo.radius,
        ev.location.clone().unwrap_or_default(),
        ev.geo.lat,
        ev.geo.lon
    ))
}

// Format a single event into iCalendar format
fn format_event(ev: &Event) -> String {
    // Use `from_ymd_opt` and `from_hms_opt` to avoid deprecation warnings
    let start_time = match NaiveDate::from_ymd_opt(ev.start[0], ev.start[1] as u32, ev.start[2] as u32) {
        Some(date) => match NaiveTime::from_hms_opt(ev.start[3] as u32, ev.start[4] as u32, 0) {
            Some(time) => NaiveDateTime::new(date, time),
            None => return String::new(),  // Invalid time
        },
        None => return String::new(),  // Invalid date
    };

    // Calculate end time based on duration
    let duration_minutes = ev.duration.0 * 60 + ev.duration.1;
    let end_time = start_time + chrono::Duration::minutes(duration_minutes as i64);

    // Get the current UTC time for DTSTAMP
    let dtstamp = Utc::now().format("%Y%m%dT%H%M%SZ").to_string();

    // Format the main event data
    let mut event_data = format!(
        "BEGIN:VEVENT\r\nUID:{}\r\nDTSTAMP:{}\r\nDTSTART:{}\r\nDTEND:{}\r\nSUMMARY:{}\r\nDESCRIPTION:{}\r\nLOCATION:{}\r\nURL:{}\r\nSTATUS:{}\r\nSEQUENCE:{}\r\n",
        ev.uid,
        dtstamp,  // Add DTSTAMP here
        start_time.format("%Y%m%dT%H%M%S"),
        end_time.format("%Y%m%dT%H%M%S"),
        ev.title,
        ev.description,
        ev.location.clone().unwrap_or_default().replace(",", "\\,"),
        ev.url,
        ev.status,
        ev.sequence,
    );

    // Add Apple structured location markup if available
    if let Some(loc_markup) = apple_structured_location(ev) {
        event_data.push_str(&format!("\r\n{}", loc_markup));
    }

    event_data.push_str("END:VEVENT\r\n");
    event_data
}

// Public function to generate complete iCalendar file content
pub fn generate_ics(title: &str, events:Vec<Event>, feed_url: Option<&str>) -> String {
    let mut ics = String::new();

    // Add the VCALENDAR header to start the iCalendar
    ics.push_str("BEGIN:VCALENDAR\r\nVERSION:2.0\r\nPRODID:-//YourCompany//NONSGML v1.0//EN\r\n");

    // Generate event data
    for ev in events {
        ics.push_str(&format_event(&ev));
    }

    // Add feed metadata and close the calendar
    ics.push_str(&format!(
        "X-WR-CALNAME:{}\r\n{}END:VCALENDAR\r\n",
        title,
        feed_url.map_or_else(|| String::new(), |url| format!("X-ORIGINAL-URL:{}\r\n", url)),
    ));

    ics
}