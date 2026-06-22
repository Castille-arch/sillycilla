const dancers = document.querySelectorAll(".dancer");
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
let playerReady = false;
let pendingPlay = false;
let unmuted = false;

function cycleCaptions() {
  caption.textContent = captions[Math.floor(Math.random() * captions.length)];
}

function setDancing(on) {
  dancers.forEach((d) => d.classList.toggle("dancing", on));
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
      onReady: (event) => {
        playerReady = true;
        event.target.playVideo();
        if (pendingPlay) {
          unmuteOnFirstInteraction();
          event.target.playVideo();
          pendingPlay = false;
        }
      },
      onStateChange: onPlayerStateChange,
      onError: () => {
        caption.textContent = "Hoppsan, låten gick inte att ladda. Cilla dansar tyst istället.";
      },
    },
  });
}

function onPlayerStateChange(event) {
  if (event.data === YT.PlayerState.PLAYING) {
    setDancing(true);
    cycleCaptions();
    captionTimer = captionTimer || setInterval(cycleCaptions, 2000);
  } else {
    setDancing(false);
    clearInterval(captionTimer);
    captionTimer = null;
  }
}

playBtn.addEventListener("click", () => {
  if (playerReady && player) {
    unmuteOnFirstInteraction();
    player.playVideo();
  } else {
    pendingPlay = true;
    caption.textContent = "Laddar låten, ett ögonblick...";
  }
});

stopBtn.addEventListener("click", () => {
  if (player && typeof player.pauseVideo === "function") {
    player.pauseVideo();
  }
  caption.textContent = "Cilla tar en bugning. Publiken (du) går bananas.";
});
