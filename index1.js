import puppeteer from "puppeteer";

const getPrograms = async () => {
  // Start a Puppeteer session with:
  // - a visible browser (`headless: false` - easier to debug because you'll see the browser in action)
  // - no default viewport (`defaultViewport: null` - website page will in full width and height)
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
  });

  // Open a new page
  const page = await browser.newPage();

  // On this new page:
  // - open the "https://www.meetup.com/home/" website
  // - wait until the dom content is loaded (HTML is ready)

  await page.goto("https://www.meetup.com/find/?source=EVENTS&eventType=inPerson&sortField=DATETIME&location=ca--ab--Calgary", {
    waitUntil: "domcontentloaded",
  });


    // Wait for the content to load
    await page.waitForSelector(".AdHeader");

 // Get page data
 const programs = await page.evaluate(() => {
    // Fetch the first element with class "quote"
    const programList = document.querySelectorAll(".AdHeader" , { timeout: 60000 });
    const programData = [];

    programList.forEach((program) => {
        const title = program.querySelector(".display-none .text--bold").innerText;
        const description = program.querySelector(".display-none .text--small").innerText;
  
        programData.push({ title, description });
      });

    return programData;
    });
  

  // Display the programs
  console.log(programs);

 // Click on the "Next page" button if it exists
const nextPageButton = await page.$(".pagination-next a");
if (nextPageButton) {
  await nextPageButton.click();
} else {
  console.log("No next page button found.");
}

  // Close the browser
  //await browser.close();
};


// Start the scraping
getPrograms();