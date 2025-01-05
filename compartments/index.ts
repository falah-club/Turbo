
import { createFalahClient } from "./client/falahClient"; // Update this path as per your project structure
import { AnonymousAuthenticationProvider } from "@microsoft/kiota-abstractions";
import { FetchRequestAdapter } from "@microsoft/kiota-http-fetchlibrary";

// // API requires no authentication, so use the anonymous
// authentication provider
const authProvider = new AnonymousAuthenticationProvider();
// Create request adapter using the fetch-based implementation
const adapter = new FetchRequestAdapter(authProvider);
// Create the API client

const client = createFalahClient({...adapter, {baseUrl :"http://127.0.0.1:5800"}});
const main = async () => {
  // @ts-ignore
  const allEvents = await client.event.get()
  console.log(allEvents)
};

// Execute the anonymous function
main();