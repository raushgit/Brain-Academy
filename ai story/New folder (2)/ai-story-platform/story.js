document.getElementById('generateStory').addEventListener('click', async () => {
    const storyPrompt = document.getElementById('storyPrompt').value;
    const storyOutput = document.getElementById('storyOutput');

    if (!storyPrompt) {
        alert('Please enter a story idea!');
        return;
    }

    storyOutput.innerHTML = "<p><em>Generating story...</em></p>";

    try {
        const response = await fetch('http://localhost:5000/api/story/generate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt: storyPrompt })
        });

        const data = await response.json();
        storyOutput.innerHTML = `<p>${data.story}</p>`;
    } catch (error) {
        storyOutput.innerHTML = "<p style='color:red;'>Error generating story. Try again!</p>";
        console.error(error);
    }
});

// Stop button functionality (placeholder)
document.getElementById('stopGeneration').addEventListener('click', () => {
    alert('Stop button clicked! (Feature coming soon)');
});
