// Constants and helper functions for API calls
const BASE_URL = 'https://api.example.com/events'; // Replace with your actual API URL

const _update = async (event: Event, newDetails: Partial<Pick<Event, 'title' | 'description' | 'location' | 'categories' | 'start' | 'duration' | 'status'>>): Promise<Event> => {
    const response = await fetch(`${BASE_URL}/${event.uid}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newDetails),
    });

    if (!response.ok) {
        throw new Error(`Failed to update event with UID ${event.uid}`);
    }
    const updatedData = await response.json();
    return Object.assign(event, updatedData);
};

const _delete = async (uid: string): Promise<void> => {
    const response = await fetch(`${BASE_URL}/${uid}`, {
        method: 'DELETE',
    });

    if (!response.ok) {
        throw new Error(`Failed to delete event with UID ${uid}`);
    }
};

const _fetchAll = async (): Promise<Event[]> => {
    const response = await fetch(BASE_URL);
    if (!response.ok) {
        throw new Error('Failed to fetch events');
    }
    const eventsData = await response.json();
    return eventsData.map((event: any) => new Event(event));
};

const _create = async (eventData: Omit<Event, 'uid'>): Promise<Event> => {
    const response = await fetch(BASE_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventData),
    });

    if (!response.ok) {
        throw new Error('Failed to create event');
    }
    const createdEvent = await response.json();
    return new Event(createdEvent);
};

// TypeScript interface representing the Geo struct
interface Geo {
    lat: number;
    lon: number;
    radius: number;
}

// TypeScript class representing the Event struct
export class Event {
    uid: string;
    title: string;
    description: string;
    location: string | null;
    url: string;
    geo: Geo;
    categories: string[];
    start: [number, number, number, number, number]; // Year, month, day, hour, minute
    duration: [number, number]; // Hours and minutes
    status: string;
    sequence: number;
    product_id: string;

    constructor(data: Event) {
        this.uid = data.uid;
        this.title = data.title;
        this.description = data.description;
        this.location = data.location;
        this.url = data.url;
        this.geo = data.geo;
        this.categories = data.categories;
        this.start = data.start;
        this.duration = data.duration;
        this.status = data.status;
        this.sequence = data.sequence;
        this.product_id = data.product_id;
    }

    // Update event details via the backend
    async update(newDetails: Partial<Pick<Event, 'title' | 'description' | 'location' | 'categories' | 'start' | 'duration' | 'status'>>): Promise<Event> {
        return await _update(this, newDetails);
    }

    // Delete the event via the backend
    async delete(): Promise<void> {
        await _delete(this.uid);
    }
}

// Class to manage a collection of events
export class Events {
    endpoint : URL
    constructor(endpoint: URL) {
        this.endpoint = endpoint;
    }

    // Fetch all events from the backend
    async fetchAll(): Promise<Event[]> {
        return await _fetchAll();
    }

    // Create a new event via the backend
    async create(eventData: Omit<Event, 'uid'>): Promise<Event> {
        return await _create(eventData);
    }

    // Delete an event by UID via the backend
    async deleteById(eventUid: string): Promise<void> {
        await _delete(eventUid);
    }

    // Find an event by UID via the backend
    async findById(eventUid: string): Promise<Event> {
        const response = await fetch(`${BASE_URL}/${eventUid}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch event with UID ${eventUid}`);
        }
        const eventData = await response.json();
        return new Event(eventData);
    }

    // Find events by category via the backend
    async findByCategory(category: string): Promise<Event[]> {
        const response = await fetch(`${BASE_URL}?categories=${category}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch events with category ${category}`);
        }
        const eventsData = await response.json();
        return eventsData.map((event: any) => new Event(event));
    }

    // Find events by date range via the backend
    async findByDateRange(startDate: string, endDate: string): Promise<Event[]> {
        const response = await fetch(`${BASE_URL}?start=${startDate}&end=${endDate}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch events between ${startDate} and ${endDate}`);
        }
        const eventsData = await response.json();
        return eventsData.map((event: any) => new Event(event));
    }

    // Update an event by UID via the backend
    async updateById(eventUid: string, newDetails: Partial<Pick<Event, 'title' | 'description' | 'location' | 'categories' | 'start' | 'duration' | 'status'>>): Promise<Event> {
        const event = await this.findById(eventUid);
        return await event.update(newDetails);
    }
}

// Usage example:

(async () => {
    const endpoint = new URL("www.google.com")
    const eventsManager = new Events(endpoint);

    // Create a new event
    const newEvent = await eventsManager.create({
        title: 'New Year Party',
        description: 'Join us for a fun celebration to ring in the new year!',
        location: 'New York',
        url: 'https://example.com/new-year-party',
        geo: { lat: 40.7128, lon: -74.0060, radius: 50 },
        categories: ['Party', 'Celebration'],
        start: [2025, 1, 1, 21, 0],
        duration: [5, 30], // 5 hours and 30 minutes
        status: 'Upcoming',
        sequence: 1,
        product_id: 'NY123',
    });
    console.log('Created Event:', newEvent);

    // Fetch all events
    const allEvents = await eventsManager.fetchAll();
    console.log('All Events:', allEvents);

    // Find event by ID
    const event = await eventsManager.findById(newEvent.uid);
    console.log('Event by ID:', event);

    // Update an event by ID
    const updatedEvent = await eventsManager.updateById(newEvent.uid, { title: 'Updated New Year Party' });
    console.log('Updated Event:', updatedEvent);

    // Delete an event by ID
    await eventsManager.deleteById(newEvent.uid);
    console.log('Event Deleted');
})();