const dancer = document.getElementById("dancer");
const playBtn = document.getElementById("playBtn");
const stopBtn = document.getElementById("stopBtn");
const caption = document.getElementById("caption");

const captions = [
  "Cilla är inte direkt Mensa-medlem, men herregud vad hon kan dansa.",
  "Forskare bekräftar: Cillas höfter ljuger inte, men hennes ursäkter gör det.",
  "Lokal legend Cilla dansade en gång så hårt att WiFin kopplade ner.",
  "Cilla Baccaldi — sprider kaosglädje varhelst det finns en högtalare.",
  "Varning: långvarig exponering för Cillas dans kan orsaka spontan lycka.",
  "De bad Cilla dra ner på det. Hon drog upp det istället.",
  "Cilla löste aldrig ett korsord, men hon har vunnit varje dansbattle.",
];

let captionTimer = null;
let player = null;
let unmuted = false;

function cycleCaptions() {
  caption.textContent = captions[Math.floor(Math.random() * captions.length)];
}

function unmuteOnFirstInteraction() {
  if (!unmuted && player && typeof player.unMute === "function") {
    player.unMute();
    unmuted = true;
  }
}
document.addEventListener("click", unmuteOnFirstInteraction);
document.addEventListener("keydown", unmuteOnFirstInteraction);

function onYouTubeIframeAPIReady() {
  player = new YT.Player("ytplayer", {
    videoId: "RZWPq8i6MAs",
    playerVars: { rel: 0, autoplay: 1, mute: 1, playsinline: 1 },
    events: {
      onReady: (event) => event.target.playVideo(),
      onStateChange: onPlayerStateChange,
    },
  });
}

function onPlayerStateChange(event) {
  if (event.data === YT.PlayerState.PLAYING) {
    dancer.classList.add("dancing");
    cycleCaptions();
    captionTimer = captionTimer || setInterval(cycleCaptions, 2000);
  } else {
    dancer.classList.remove("dancing");
    clearInterval(captionTimer);
    captionTimer = null;
  }
}

playBtn.addEventListener("click", () => {
  unmuteOnFirstInteraction();
  if (player && typeof player.playVideo === "function") {
    player.playVideo();
  }
});

stopBtn.addEventListener("click", () => {
  if (player && typeof player.pauseVideo === "function") {
    player.pauseVideo();
  }
  caption.textContent = "Cilla tar en bugning. Publiken (du) går bananas.";
});
