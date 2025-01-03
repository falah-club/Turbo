export interface Geo {
    lat: number;
    lon: number;
    radius: number;
  }

  export interface Event {
    uid: string;
    title: string;
    description: string;
    location?: string; // Optional field
    url: string;
    geo: Geo;
    categories: string[];
    start: [number, number, number, number, number]; // Tuple: [Year, month, day, hour, minute]
    duration: [number, number]; // Tuple: [hours, minutes]
    status: string;
    sequence: number;
    productId: string; // Adjusted naming to match TS convention
  }