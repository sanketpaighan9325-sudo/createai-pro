async function generateImage() {
  const promptInput = document.getElementById("imagePrompt");
  const resultBox = document.getElementById("imageResult");

  const prompt = promptInput.value.trim();

  if (!prompt) {
    resultBox.textContent = "कृपया आधी Image Prompt लिहा.";
    return;
  }

  resultBox.textContent = "AI तुमची Image तयार करत आहे...";

  try {
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        prompt: prompt
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.error || "Image तयार होऊ शकली नाही."
      );
    }

    if (!data.image) {
      throw new Error("Image मिळाली नाही. पुन्हा प्रयत्न करा.");
    }

    resultBox.innerHTML = "";

    const image = document.createElement("img");
    image.src = data.image;
    image.alt = "AI Generated Image";
    image.style.width = "100%";
    image.style.maxWidth = "700px";
    image.style.borderRadius = "12px";
    image.style.display = "block";

    resultBox.appendChild(image);

    const downloadButton = document.createElement("a");
    downloadButton.href = data.image;
    downloadButton.download = "CreateAI-Pro-Image.jpg";
    downloadButton.textContent = "Download Image";
    downloadButton.style.display = "inline-block";
    downloadButton.style.marginTop = "15px";
    downloadButton.style.padding = "12px 20px";
    downloadButton.style.background = "#7c3aed";
    downloadButton.style.color = "#ffffff";
    downloadButton.style.borderRadius = "8px";
    downloadButton.style.textDecoration = "none";

    resultBox.appendChild(downloadButton);

  } catch (error) {
    resultBox.textContent =
      "Error: " + error.message;
  }
}

document.getElementById("year").textContent =
  new Date().getFullYear();
