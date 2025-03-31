const express = require("express");
const puppeteer = require("puppeteer");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());

app.get("/screenshot", async (req, res) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto("https://helpful-panda-045468.netlify.app/", {
    waitUntil: "networkidle2",
  });

  const screenshot = await page.screenshot();
  await browser.close();

  res.set("Content-Type", "image/png");
  res.send(screenshot);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
