import falah from "@falah-club/falah";

const main = async () => {

    const response = await falah().event.get()
    console.log(response); // Now you should get the actual data
  };

  // Execute the anonymous function
  main();
