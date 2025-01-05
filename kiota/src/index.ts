export function hello(name: string) {
    return "Hello, " + name;
}


import { createFalahClient } from "../client/falahClient"; // Update this path as per your project structure
import { AnonymousAuthenticationProvider } from "@microsoft/kiota-abstractions";
import { FetchRequestAdapter } from "@microsoft/kiota-http-fetchlibrary";

// // API requires no authentication, so use the anonymous
// authentication provider
const authProvider = new AnonymousAuthenticationProvider();
// Create request adapter using the fetch-based implementation
const adapter = new FetchRequestAdapter(authProvider);
// Create the API client

const client = createFalahClient(adapter);
const main = async () => {
  // @ts-ignore
  const response = await client.event.get(); // Assuming it returns a response object
  console.log(response); // Now you should get the actual data
};

// Execute the anonymous function
main();
