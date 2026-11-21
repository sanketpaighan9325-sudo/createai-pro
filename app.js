function demo(inputId, resultId) {
  const value = document.getElementById(inputId).value.trim();
  const box = document.getElementById(resultId);

  if (!value) {
    box.textContent = "कृपया आधी तुमचा प्रॉम्प्ट लिहा.";
    return;
  }

  box.textContent =
    "हा डेमो इंटरफेस आहे. प्रत्यक्ष जनरेशन सुरू करण्यासाठी AI API आणि सुरक्षित backend जोडणे आवश्यक आहे.";
}

async function generateImage() {
  const input = document.getElementById("imagePrompt");
  const box = document.getElementById("imageResult");
  const prompt = input.value.trim();

  if (!prompt) {
    box.textContent = "कृपया आधी तुमचा इमेज प्रॉम्प्ट लिहा.";
    return;
  }

  box.textContent = "AI तुमची इमेज तयार करत आहे... कृपया थांबा.";

  try {
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ prompt })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "इमेज तयार झाली नाही.");
    }

    if (!data.image) {
      throw new Error("इमेज मिळाली नाही.");
    }

    box.replaceChildren();

    const image = document.createElement("img");
    image.src = data.image;
    image.alt = "AI Generated Image";
    image.style.maxWidth = "100%";
    image.style.borderRadius = "12px";

    box.appendChild(image);

  } catch (error) {
    box.textContent =
      error.message || "काहीतरी चूक झाली. पुन्हा प्रयत्न करा.";
  }
}

document.getElementById("year").textContent =
  new Date().getFullYear();
