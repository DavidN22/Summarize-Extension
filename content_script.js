const button = document.querySelector("#summarize-button");
const buttonAudio = document.querySelector("#summarize-button-audio");
const text = document.querySelector("#text-input");
const audioElement = document.getElementById("audio");
let response = document.getElementById("response");
let summarizedText = "";
audioElement.style.display = "none";

button.addEventListener("click", () => {
  const textContent = text.value;
  response.value = "";
  button.classList.add("loading");
  button.innerHTML = "Summarizing...";
  button.disabled = true;
  fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization:
      //example key: 
      //"Bearer sk-abc123abc123",
      //your key put under here
      "replace with your key",
    },

    body: JSON.stringify({
      messages: [
        {
          role: "user",
          content:
            "Explain the text, but keep it very short:" +
            textContent,
        },
      ],
      model: "gpt-4o",
    }),
  })
    .then((data) => data.json())
    .then((data) => {
      summarizedText = data.choices[0].message.content;
      let i = 0;
      function typeWriter() {
        if (i < summarizedText.length) {
          document.getElementById("response").value += summarizedText.charAt(i);
          i++;
          setTimeout(typeWriter, 20);
        } else {
          button.classList.remove("loading");
          button.innerHTML = "Explain";
          button.disabled = false;
        }
      }
      typeWriter();
    });
});
