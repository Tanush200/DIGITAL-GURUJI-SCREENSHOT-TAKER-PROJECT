document.getElementById("screenshotBtn").addEventListener("click", async () => {
  const response = await fetch("http://localhost:5000/screenshot");
  const blob = await response.blob();


  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "screenshot.png";
  link.click();
});

