const btn = document.querySelector('.talk');
const content = document.querySelector('.content');

let voices = [];

// Load available voices and set a Jarvis-like voice
function loadVoices() {
    voices = window.speechSynthesis.getVoices();
    // Try selecting a Jarvis-like voice (e.g., Google UK English Male or a deep voice)
    const jarvisVoice = voices.find(voice => voice.name.includes("UK English Male") || voice.name.includes("Microsoft David")) || voices[0];
    return jarvisVoice;
}

function speak(text) {
    const text_speak = new SpeechSynthesisUtterance(text);
    text_speak.voice = loadVoices(); // Assign the selected Jarvis-like voice
    text_speak.rate = 0.9; // Slightly slower for a more refined sound
    text_speak.volume = 1; // Full volume
    text_speak.pitch = 0.9; // Slightly lower pitch for a deep tone

    window.speechSynthesis.speak(text_speak);
}

// Ensure voices are loaded correctly (some browsers need this)
window.speechSynthesis.onvoiceschanged = loadVoices;

function wishMe() {
    const day = new Date();
    const hour = day.getHours();

    if (hour >= 0 && hour < 12) {
        speak("Good Morning Boss...");
    } else if (hour >= 12 && hour < 17) {
        speak("Good Afternoon Master...");
    } else {
        speak("Good Evening Sir...");
    }
}

window.addEventListener('load', () => {
    speak("Initializing JARVIS..");
    wishMe();
});

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.onresult = (event) => {
    const currentIndex = event.resultIndex;
    const transcript = event.results[currentIndex][0].transcript;
    content.textContent = transcript;
    takeCommand(transcript.toLowerCase());
};

btn.addEventListener('click', () => {
    content.textContent = "Listening....";
    recognition.start();
});

function takeCommand(message) {
    if (message.includes('hey') || message.includes('hello')) {
        speak("Hello Sir, How May I Help You?");
    } else if (message.includes('who are you') || message.includes('jarvis')) {
        speak("Hello Sir, I am Jarvis, the Real AI of Solana.");
    } else if (message.includes("open google")) {
        window.open("https://google.com", "_blank");
        speak("Opening Google...");
    } else if (message.includes("open youtube")) {
        window.open("https://youtube.com", "_blank");
        speak("Opening YouTube...");
    } else if (message.includes("open facebook")) {
        window.open("https://facebook.com", "_blank");
        speak("Opening Facebook...");
    } else if (message.includes("pump") || message.includes('fun')) {
        window.open("https://pump.fun", "_blank");
        speak("Opening Pump Fun...");
    } else if (message.includes("ca") || message.includes('contract address')) {
        window.open("https://pump.fun/", "_blank");
        speak("Opening Pump Fun...");
    } else if (message.includes("tg") || message.includes('telegram')) {
        window.open("https://t.me/", "_blank");
        speak("Opening Telegram...");
    } else if (message.includes("x") || message.includes('twitter')) {
        window.open("https://x.com/jarvistherealai", "_blank");
        speak("Opening X...");
    } else if (message.includes('what is') || message.includes('who is') || message.includes('what are')) {
        window.open(`https://www.google.com/search?q=${message.replace(" ", "+")}`, "_blank");
        const finalText = "This is what I found on the internet regarding " + message;
        speak(finalText);
    } else if (message.includes('wikipedia')) {
        window.open(`https://en.wikipedia.org/wiki/${message.replace("wikipedia", "")}`, "_blank");
        const finalText = "This is what I found on Wikipedia regarding " + message;
        speak(finalText);
    } else if (message.includes('time')) {
        const time = new Date().toLocaleString(undefined, { hour: "numeric", minute: "numeric" });
        speak(time);
    } else if (message.includes('date')) {
        const date = new Date().toLocaleString(undefined, { month: "short", day: "numeric" });
        speak(date);
    } else if (message.includes('calculator')) {
        window.open('Calculator:///');
        speak("Opening Calculator...");
    } else {
        window.open(`https://www.google.com/search?q=${message.replace(" ", "+")}`, "_blank");
        speak("I found some information for " + message + " on Google.");
    }
}
