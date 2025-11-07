const backend = "https://YOUR_BACKEND_URL.vercel.app"; // canza zuwa URL na server ɗinka

async function generateText() {
  const prompt = document.getElementById("prompt").value;
  document.getElementById("result").innerHTML = "⏳ Ana aiki...";
  const res = await fetch(`${backend}/api/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt }),
  });
  const data = await res.json();
  document.getElementById("result").innerText = data.reply || "Babu amsa.";
}

async function generateImage() {
  const prompt = document.getElementById("prompt").value;
  document.getElementById("ai-image").style.display = "none";
  const res = await fetch(`${backend}/api/image`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt }),
  });
  const data = await res.json();
  const img = document.getElementById("ai-image");
  img.src = data.image || "";
  img.style.display = "block";
}
