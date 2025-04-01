// const express = require("express");
// const puppeteer = require("puppeteer");
// const cors = require("cors");

// const app = express();
// const PORT = process.env.PORT || 5000;

// app.use(cors());

// app.get("/screenshot", async (req, res) => {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();

//   await page.goto("https://candid-madeleine-89d933.netlify.app/", {
//     waitUntil: "networkidle2",
//   });

//   const screenshot = await page.screenshot();
//   await browser.close();

//   res.set("Content-Type", "image/png");
//   res.send(screenshot);
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });


// https://remarkable-pothos-f697a4.netlify.app/
// https://candid-madeleine-89d933.netlify.app/



// const express = require("express");
// const puppeteer = require("puppeteer");
// const cors = require("cors");

// const app = express();
// const PORT = process.env.PORT || 5000;

// app.use(cors({ origin: "*" }));

// app.get("/screenshot", async (req, res) => {
//   let browser;
//   try {
//     console.log("🚀 Launching Puppeteer...");
//     browser = await puppeteer.launch({
//       args: ["--no-sandbox", "--disable-setuid-sandbox"],
//       headless: "new",
//     });

//     const page = await browser.newPage();
//     await page.setViewport({ width: 1280, height: 800 });

//     console.log("🌍 Navigating to page...");
//     await page.goto("https://candid-madeleine-89d933.netlify.app/", {
//       waitUntil: "networkidle2",
//     });

//     console.log("📷 Taking screenshot...");
//     const screenshot = await page.screenshot({ fullPage: true });

//     await page.close();
//     await browser.close();

//     res.set("Content-Type", "image/png");
//     res.send(screenshot);
//   } catch (error) {
//     console.error("❌ Error generating screenshot:", error);
//     res.status(500).send("Error generating screenshot.");
//   } finally {
//     if (browser) await browser.close();
//   }
// });

// app.listen(PORT, () => {
//   console.log(`🚀 Server running on http://localhost:${PORT}`);
// });


const express = require("express");
const puppeteer = require("puppeteer-core");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// CORS Middleware
app.use(cors({ origin: "*" }));

app.get("/screenshot", async (req, res) => {
  try {
    console.log("🚀 Launching Chrome...");
    const browser = await puppeteer.connect({
      browserWSEndpoint: `wss://chrome.browserless.io?token=free`,
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });

    console.log("🌍 Navigating to page...");
    await page.goto("https://candid-madeleine-89d933.netlify.app/", {
      waitUntil: "networkidle2",
    });

    console.log("📷 Taking screenshot...");
    const screenshot = await page.screenshot({ fullPage: true });

    await page.close();
    await browser.close();

    res.set("Content-Type", "image/png");
    res.send(screenshot);
  } catch (error) {
    console.error("❌ Error generating screenshot:", error);
    res.status(500).json({ error: "Error generating screenshot" });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
