const dancer = document.getElementById("dancer");
const playBtn = document.getElementById("playBtn");
const stopBtn = document.getElementById("stopBtn");
const caption = document.getElementById("caption");

const captions = [
  "Cecilia Baccaldi: turning bad decisions into dance moves since forever.",
  "Scientists agree: Cecilia's hips do not lie, but her excuses do.",
  "Local legend Cecilia once danced so hard the WiFi disconnected.",
  "Cecilia Baccaldi — bringing chaotic joy wherever there is a speaker.",
  "Warning: prolonged exposure to Cecilia's dancing may cause spontaneous happiness.",
  "They asked Cecilia to tone it down. She turned it up instead.",
];

let captionTimer = null;
let audioCtx = null;
let isPlaying = false;
let noteTimeouts = [];

function cycleCaptions() {
  caption.textContent = captions[Math.floor(Math.random() * captions.length)];
}

// A goofy little melody, no external files or licensing needed.
const melody = [
  { freq: 392, dur: 200 },
  { freq: 440, dur: 200 },
  { freq: 523, dur: 200 },
  { freq: 440, dur: 200 },
  { freq: 587, dur: 300 },
  { freq: 523, dur: 200 },
  { freq: 440, dur: 200 },
  { freq: 392, dur: 400 },
];

function playMelodyLoop() {
  if (!isPlaying) return;
  let t = audioCtx.currentTime;
  noteTimeouts = [];

  melody.forEach((note) => {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = "square";
    osc.frequency.value = note.freq;
    gain.gain.value = 0.08;
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start(t);
    osc.stop(t + note.dur / 1000);
    t += note.dur / 1000;
  });

  const totalDuration = melody.reduce((sum, n) => sum + n.dur, 0);
  const id = setTimeout(playMelodyLoop, totalDuration);
  noteTimeouts.push(id);
}

playBtn.addEventListener("click", () => {
  if (isPlaying) return;
  isPlaying = true;
  audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
  playMelodyLoop();

  dancer.classList.add("dancing");
  cycleCaptions();
  captionTimer = setInterval(cycleCaptions, 2500);
});

stopBtn.addEventListener("click", () => {
  isPlaying = false;
  noteTimeouts.forEach(clearTimeout);
  dancer.classList.remove("dancing");
  clearInterval(captionTimer);
  caption.textContent = "Cecilia takes a bow. The crowd (you) goes wild.";
});
