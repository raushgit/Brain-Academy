document.addEventListener('DOMContentLoaded', () => {
    const numberDisplay = document.getElementById('numberDisplay');
    const resultText = document.getElementById('resultText');
    const startGameButton = document.getElementById('startGame');
    const startRecognitionButton = document.getElementById('startRecognition');

    let currentNumber = 1;

    startGameButton.addEventListener('click', () => {
        currentNumber = Math.floor(Math.random() * 10) + 1;
        numberDisplay.textContent = currentNumber;
        resultText.textContent = '';
    });

    startRecognitionButton.addEventListener('click', () => {
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            const recognition = new SpeechRecognition();
            recognition.lang = 'en-US';
            recognition.continuous = false;
            recognition.interimResults = false;

            recognition.onstart = () => {
                resultText.textContent = 'Listening...';
                console.log('Voice recognition started.');
            };

            recognition.onresult = (event) => {
                const spokenNumber = event.results[0][0].transcript;
                console.log('Recognized:', spokenNumber);
                if (parseInt(spokenNumber) === currentNumber) {
                    resultText.textContent = 'Correct!';
                } else {
                    resultText.textContent = `Incorrect. You said ${spokenNumber}. Try again!`;
                }
            };

            recognition.onerror = (event) => {
                resultText.textContent = 'Error occurred in recognition: ' + event.error;
                console.error('Recognition error:', event.error);
            };

            recognition.onend = () => {
                console.log('Voice recognition ended.');
            };

            recognition.start();
        } else {
            resultText.textContent = 'Speech recognition not supported in this browser.';
            console.error('Speech recognition not supported in this browser.');
        }
    });
});