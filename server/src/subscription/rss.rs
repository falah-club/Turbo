use rss::{ChannelBuilder, ItemBuilder};
use crate::event::Event;

// Function to generate RSS feed from events
pub fn rss(events: Vec<Event>)-> String {
    let mut items = Vec::new();

    // Convert each event to an RSS item
    for event in events {
        let item = ItemBuilder::default()
            .title(event.title)
            .link(event.url)
            .description(event.description)
            .build();

        // Push the item to the items vector
        items.push(item);
    }

    // Build the RSS channel with all items
    let channel = ChannelBuilder::default()
        .title("Channel Title")
        .link("http://example.com")
        .description("An RSS feed.")
        .items(items) // Add all items to the channel
        .build();

    let rss_string = channel.to_string();

    rss_string
}
