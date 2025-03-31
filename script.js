document.getElementById("screenshotBtn").addEventListener("click", async () => {
  const response = await fetch(
    "https://digital-guruji-project-2iyiqii6m-tanush200s-projects.vercel.app"
  );
  const blob = await response.blob();


  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "screenshot.png";
  link.click();
});

