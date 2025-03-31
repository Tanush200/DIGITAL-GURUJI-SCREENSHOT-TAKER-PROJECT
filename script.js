document.getElementById("screenshotBtn").addEventListener("click", async () => {
  const response = await fetch(
    "https://digital-guruji-screenshot-taker-project-4.onrender.com/screenshot"
  );
  const blob = await response.blob();


  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "screenshot.png";
  link.click();
});

