document.getElementById("generateAudio").addEventListener("click", async () => {
    const text = document.getElementById("storyText").innerText;  // Get story text

    try {
        const response = await fetch("/api/tts", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text })
        });

        const data = await response.json();
        if (data.audio) {
            const audio = new Audio(data.audio);
            audio.play();
        } else {
            console.error("No audio received");
        }
    } catch (error) {
        console.error("Error playing audio:", error);
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const storyList = document.querySelectorAll(".story-list li");
    const storyText = document.getElementById("storyText");
    const narrateStoryBtn = document.getElementById("narrateStory");
    const audioPlayer = document.getElementById("audioPlayer");

    let selectedStory = "";

    // Highlight selected story & show its text
    storyList.forEach(item => {
        item.addEventListener("click", () => {
            storyList.forEach(story => story.classList.remove("selected"));
            item.classList.add("selected");

            selectedStory = item.getAttribute("data-story");
            storyText.textContent = selectedStory;

            narrateStoryBtn.disabled = false;
        });
    });

    // Send the selected story for AI narration
    narrateStoryBtn.addEventListener("click", async () => {
        if (!selectedStory) return;

        narrateStoryBtn.textContent = "🔄 Generating...";
        narrateStoryBtn.disabled = true;

        try {
            const response = await fetch("/api/tts", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ text: selectedStory })
            });

            const data = await response.json();
            if (data.audio) {
                audioPlayer.src = data.audio;
                audioPlayer.play();
            } else {
                alert("Error generating narration.");
            }
        } catch (error) {
            console.error("Error:", error);
        } finally {
            narrateStoryBtn.textContent = "🎙️ Narrate Story";
            narrateStoryBtn.disabled = false;
        }
    });
});

