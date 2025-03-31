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



const express = require("express");
const puppeteer = require("puppeteer-core");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: "*" }));

let browser;

(async () => {
  try {
    browser = await puppeteer.launch({
     executablePath:
       "/opt/render/.cache/puppeteer/chrome/linux-134.0.6998.35/chrome",
     headless: "new",
     args: ["--no-sandbox", "--disable-setuid-sandbox"],
   });

    console.log("✅ Puppeteer launched successfully.");
  } catch (error) {
    console.error("❌ Error launching Puppeteer:", error);
  }
})();

app.get("/screenshot", async (req, res) => {
  try {
    if (!browser) {
      console.log("ℹ️ Puppeteer not running, restarting...");
      browser = await puppeteer.launch({
        executablePath:
          "/opt/render/.cache/puppeteer/chrome/linux-134.0.6998.35/chrome", // ✅ Added executablePath
        headless: "new",
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
      });
    }

    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });

    console.log("🌍 Navigating to page...");
    await page.goto("https://candid-madeleine-89d933.netlify.app/", {
      waitUntil: "networkidle2",
    });

    console.log("📷 Taking screenshot...");
    const screenshot = await page.screenshot({ fullPage: true });

    await page.close();

    res.set("Content-Type", "image/png");
    res.send(screenshot);
  } catch (error) {
    console.error("❌ Error generating screenshot:", error);
    res.status(500).send("Error generating screenshot.");
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
