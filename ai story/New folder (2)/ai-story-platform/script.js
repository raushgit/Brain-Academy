let storyInterval;

function startStory() {
    const output = document.getElementById("story-output");
    output.style.display = "block";
    output.innerHTML = "Once upon a time, in a magical land...";

    storyInterval = setInterval(() => {
        output.innerHTML += " more exciting adventures unfold...";
    }, 2000);
}

function stopStory() {
    clearInterval(storyInterval);
    alert("Story generation stopped!");
}

function generateCharacterStory() {
    const character = document.getElementById("character-name").value || "a brave hero";
    const output = document.getElementById("story-output");
    output.style.display = "block";
    output.innerHTML = `This is a special story about ${character}...`;
}

function narrateStory() {
    const text = document.getElementById("story-output").innerText;
    if (text) {
        const utterance = new SpeechSynthesisUtterance(text);
        speechSynthesis.speak(utterance);
    } else {
        alert("Please generate a story first!");
    }
}

function bedtimeMode() {
    document.getElementById("story-output").innerHTML = "A calm and soothing bedtime story begins...";
}

function createCustomCharacter() {
    alert("Custom character creation coming soon!");
}

function goBack() {
    window.location.href = "index.html";
}

function navigateTo(page) {
    window.location.href = page;
}
