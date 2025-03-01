document.addEventListener("DOMContentLoaded", () => {
    const characters = document.querySelectorAll(".character");
    const storyOutput = document.getElementById("storyOutput");
    const narrationButton = document.getElementById("narrateStory");

    characters.forEach((character) => {
        character.addEventListener("click", async () => {
            const characterName = character.dataset.name;
            if (!characterName) return alert("Character name missing!");

            storyOutput.innerHTML = "Generating story... ⏳";

            try {
                const response = await fetch("http://localhost:5000/api/generate-character-story", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ characterName })
                });

                const data = await response.json();
                if (data.story) {
                    storyOutput.innerText = data.story;
                    narrationButton.style.display = "block"; // Show narration button
                } else {
                    storyOutput.innerText = "Failed to generate story.";
                }
            } catch (error) {
                console.error("Error fetching story:", error);
                storyOutput.innerText = "Error fetching story.";
            }
        });
    });

    narrationButton.addEventListener("click", () => {
        const storyText = storyOutput.innerText;
        if (!storyText) return;

        const utterance = new SpeechSynthesisUtterance(storyText);
        utterance.voice = speechSynthesis.getVoices()[0]; // Pick a default voice
        speechSynthesis.speak(utterance);
    });
});
