/*
  Edit this array when the final Nerd Connection album/song list is ready.
  Add or reorder songs inside each release to change the expanded list.
*/
const releases = [
  {
    koreanTitle: "그래도 우리는",
    englishTitle: "And Yet We Still",
    year: "2024",
    type: "Album",
    theme: "#3D3B34",
    description: "무너지고 다시 이어지는 마음을 낮은 호흡으로 쌓아 올린 음악.",
    cover: "assets/and-yet-we-still.jpg",
    songs: [
      { title: "Losing Myself", src: "audio/losing-myself.mp3" },
      { title: "그림자 놀이", src: "audio/shadow-play.mp3" },
      { title: "Psychiatric Hospital", src: "" },
      { title: "headshrinker", src: "audio/headshrinker.mp3" },
      { title: "Freddy", src: "audio/freddy.mp3" }
    ]
  },
  {
    koreanTitle: "그대만 있다면",
    englishTitle: "If I Had You Only",
    year: "2023",
    type: "Single",
    theme: "#6F593A",
    description: "담담한 고백과 선명한 밴드 사운드가 한 화면처럼 겹쳐지는 곡.",
    cover: "assets/if-i-had-you-only.jpg",
    songs: [{ title: "그대만 있다면", src: "audio/if-i-had-you-only.mp3" }]
  },
  {
    koreanTitle: "설명하기 어려운 것들",
    englishTitle: "Hard To Explain",
    year: "2023",
    type: "EP",
    theme: "#2E3832",
    description: "말로 붙잡기 어려운 감정들을 낮고 섬세한 밴드 사운드로 펼친 EP.",
    cover: "assets/hard-to-explain.jpg",
    songs: [
      { title: "설명하기 어려운 것들", src: "" },
      { title: "대나무숲", src: "" },
      { title: "Back in Time", src: "" },
      { title: "편지", src: "" }
    ]
  },
  {
    koreanTitle: "New Century Masterpiece Cinema",
    englishTitle: "New Century Masterpiece Cinema",
    year: "2021",
    type: "Album",
    theme: "#27323F",
    description: "영화적인 스케일과 청춘의 온도가 함께 흐르는 정규 앨범 무드.",
    cover: "assets/new-century-masterpiece-cinema.jpg",
    songs: [
      { title: "버들길", src: "" },
      { title: "좋은 밤 좋은 꿈", src: "audio/good-night-good-dream.mp3" },
      { title: "Back in Time", src: "" },
      { title: "Hollywood Movie Star", src: "" },
      { title: "대나무숲", src: "" }
    ]
  },
  {
    koreanTitle: "좋은 밤 좋은 꿈",
    englishTitle: "Good Night Good Dream",
    year: "2020",
    type: "Single",
    theme: "#243D4A",
    description: "밤의 결을 따라 천천히 번지는 너드커넥션의 서정적인 사운드.",
    cover: "assets/good-night-good-dream.jpg",
    songs: [{ title: "좋은 밤 좋은 꿈", src: "audio/good-night-good-dream.mp3" }]
  },
  {
    koreanTitle: "TOO FAST",
    englishTitle: "TOO FAST",
    year: "2019",
    type: "EP",
    theme: "#4C4F48",
    description: "빠르게 지나가는 감정의 잔상을 거친 질감으로 붙잡는 트랙.",
    cover: "assets/too-fast.jpg",
    songs: [
      { title: "Marion", src: "" },
      { title: "waterfall", src: "" },
      { title: "Where are we", src: "" },
      { title: "V", src: "" }
    ]
  }
];

const releaseList = document.querySelector("#release-list");
const albumCard = document.querySelector("#album-card");
const albumArt = document.querySelector("#album-art");
const albumOrbit = document.querySelector("#album-orbit");
const titleEl = document.querySelector("#current-title");
const subtitleEl = document.querySelector("#current-subtitle");
const cursor = document.querySelector(".cursor");
const audioPlayer = document.querySelector("#audio-player");
const playBtn = document.querySelector("#play-btn");
const pauseBtn = document.querySelector("#pause-btn");
const playerTitle = document.querySelector("#player-title");
const miniPlayer = document.querySelector("#mini-player");
const miniPlayerTitle = document.querySelector("#mini-player-title");
const miniPlayBtn = document.querySelector("#mini-play-btn");
const miniPauseBtn = document.querySelector("#mini-pause-btn");
const volumeSlider = document.querySelector("#volume-slider");
const miniVolumeSlider = document.querySelector("#mini-volume-slider");
const seekSlider = document.querySelector("#seek-slider");
const currentTimeEl = document.querySelector("#current-time");
const durationTimeEl = document.querySelector("#duration-time");
const miniTimeEl = document.querySelector("#mini-time");
const visualizerBars = [...document.querySelectorAll("#audio-visualizer span")];
const aboutDetail = document.querySelector("#about-detail");
const aboutDetailKicker = document.querySelector("#about-detail-kicker");
const aboutDetailTitle = document.querySelector("#about-detail-title");
const aboutDetailDescription = document.querySelector("#about-detail-description");
const aboutDetailImage = document.querySelector("#about-detail-image");
const memberInfo = document.querySelector("#member-info");
const liveList = document.querySelector("#live-list");
const aboutDetailClose = document.querySelector("#about-detail-close");
const aboutButtons = [...document.querySelectorAll("[data-about-view]")];
const parallaxItems = [...document.querySelectorAll(".parallax-item, .record-card img")];

let activeIndex = 0;
let currentSong = null;
let visualizerRaf = null;
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
let cursorX = mouseX;
let cursorY = mouseY;
let orbitX = 0;
let orbitY = 0;
let activeAboutView = null;
let parallaxRaf = null;

// Edit this array later when exact member names, bios, or image files are ready.
const members = [
  {
    id: "vocal",
    name: "서영주",
    part: "VOCAL",
    description: "Seo Youngju / 감정을 전달하는 중심적인 목소리",
    image: "images/vocal.webp",
    alt: "서영주 보컬 사진",
    details: [
      ["파트", "VOCAL"],
      ["출생", "1993년 3월 17일 (33세)"],
      ["신체", "174cm | B형"],
      ["소속", "너드커넥션 (보컬, 서브기타)"],
      ["소속사", "Your summer"],
      ["학력", "연세대학교 공과대학 (전기전자공학 / 학사)"],
      ["MBTI", "INFP"]
    ]
  },
  {
    id: "guitar",
    name: "최승원",
    part: "GUITAR",
    description: "Choi Seungwon / 섬세하면서도 강렬한 사운드를 만드는 파트",
    image: "images/guitar.webp",
    alt: "최승원 기타 사진",
    details: [
      ["파트", "GUITAR"],
      ["출생", "1992년 8월 19일 (33세)"],
      ["출신", "강원특별자치도 춘천시"],
      ["신체", "177cm | O형"],
      ["소속", "너드커넥션 (리더, 메인기타)"],
      ["소속사", "Your summer"],
      ["학력", "연세대학교 공과대학 (신소재공학 / 학사)"],
      ["MBTI", "INTJ"]
    ]
  },
  {
    id: "bass",
    name: "박재현",
    part: "BASS",
    description: "Park Jaehyun / 곡의 중심을 단단하게 잡아주는 리듬",
    image: "images/bass.webp",
    alt: "박재현 베이스 사진",
    details: [
      ["파트", "BASS"],
      ["출생", "1993년 3월 26일 (33세)"],
      ["신체", "172cm | B형"],
      ["소속", "너드커넥션 (베이시스트)"],
      ["소속사", "Your summer"],
      ["학력", "연세대학교 문과대학 (영어영문학 / 학사)"],
      ["MBTI", "INTP"]
    ]
  },
  {
    id: "drum",
    name: "드럼",
    part: "DRUM",
    description: "라이브의 에너지를 완성하는 비트",
    image: "images/drum.webp",
    alt: "드럼 사진",
    details: [
      ["파트", "DRUM"],
      ["출생", "1991년 11월 5일 (34세)"],
      ["신체", "175.4cm | O형"],
      ["소속", "너드커넥션 (드러머)"],
      ["소속사", "Your summer"],
      ["학력", "명지대학교 예술체육대학 (무예과 / 학사)"],
      ["MBTI", "ENFP"]
    ]
  }
];

const memberViews = members.reduce((views, member) => {
  views[member.id] = {
    kicker: member.part,
    title: member.name,
    description: member.description,
    image: member.image,
    alt: member.alt,
    details: member.details
  };
  return views;
}, {});

const aboutViews = {
  band: {
    kicker: "Band Archive",
    title: "BAND",
    description: "서정적인 멜로디와 거친 밴드 에너지가 함께 흐르는 팀.",
    image: "assets/nerd-connection-band.webp",
    alt: "너드커넥션 밴드 사진",
    details: [
      ["Archive", "Nerd Connection"],
      ["Mood", "Band / Rock / Live"]
    ]
  },
  rock: {
    kicker: "Sound Mood",
    title: "ROCK",
    description: "섬세한 감정선을 잃지 않으면서도 무대에서는 밀도 높은 록 사운드를 만듭니다.",
    image: "assets/nerd-connection-band.webp",
    alt: "너드커넥션 공연 분위기 사진",
    details: [
      ["Sound", "Guitar / Bass / Drum"],
      ["Texture", "Emotional rock"]
    ]
  },
  live: {
    kicker: "Live Schedule",
    title: "LIVE",
    description: "가까운 공연 일정과 라이브 무드를 모아둔 임시 리스트입니다."
  },
  ...memberViews
};

function coverValue(track) {
  return track.cover ? `url("${track.cover}")` : "linear-gradient(135deg, #40595B 0%, #1C2D30 45%, #D7C8A6 100%)";
}

function renderReleaseList() {
  releaseList.innerHTML = releases.map((release, index) => `
    <article class="release-item${index === activeIndex ? " is-active" : ""}" data-index="${index}">
      <button class="release-button interactive" type="button" aria-expanded="${index === activeIndex}">
        <span class="release-korean">${release.koreanTitle}</span>
        <span class="release-meta">${release.englishTitle} / ${release.year} / ${release.type}</span>
      </button>
      <ol class="song-list" aria-label="${release.koreanTitle} 수록곡">
        ${release.songs.map((song, songIndex) => `
          <li style="--delay:${songIndex * 42}ms">
            <button class="song-button interactive" type="button" data-release="${index}" data-song="${songIndex}">
              <span>${String(songIndex + 1).padStart(2, "0")}</span>
              <strong>${song.title}</strong>
              <em>${song.src ? "Ready" : "Add file"}</em>
            </button>
          </li>
        `).join("")}
      </ol>
    </article>
  `).join("");
}

function updateRelease(index) {
  if (index === activeIndex && albumArt.style.getPropertyValue("--cover")) return;

  activeIndex = index;
  const release = releases[index];

  albumCard.classList.add("is-changing");

  window.setTimeout(() => {
    albumArt.style.setProperty("--cover", coverValue(release));
    albumArt.setAttribute("aria-label", `${release.koreanTitle} album image`);
    titleEl.textContent = release.koreanTitle;
    subtitleEl.textContent = `${release.englishTitle} / ${release.year}`;
    titleEl.classList.toggle("is-long", release.koreanTitle.length > 18);

    document.querySelectorAll(".release-item").forEach((item) => {
      const isActive = Number(item.dataset.index) === index;
      item.classList.toggle("is-active", isActive);
      item.querySelector(".release-button").setAttribute("aria-expanded", String(isActive));
    });

    albumCard.classList.remove("is-changing");
  }, 280);
}

function bindReleaseEvents() {
  releaseList.addEventListener("click", (event) => {
    const songButton = event.target.closest(".song-button");
    if (songButton) {
      playSong(Number(songButton.dataset.release), Number(songButton.dataset.song));
      return;
    }

    const button = event.target.closest(".release-button");
    if (!button) return;
    const item = button.closest(".release-item");
    updateRelease(Number(item.dataset.index));
  });
}

function playSong(releaseIndex, songIndex) {
  const release = releases[releaseIndex];
  const song = release.songs[songIndex];
  currentSong = { releaseIndex, songIndex, release, song };
  setPlaybackTheme(release);
  playerTitle.textContent = `${song.title} / ${release.koreanTitle}`;
  miniPlayerTitle.textContent = `${song.title} / ${release.koreanTitle}`;

  document.querySelectorAll(".song-button").forEach((button) => {
    const isActive =
      Number(button.dataset.release) === releaseIndex &&
      Number(button.dataset.song) === songIndex;
    button.classList.toggle("is-playing", isActive);
  });

  if (!song.src) {
    audioPlayer.pause();
    resetPlaybackTheme();
    audioPlayer.removeAttribute("src");
    playerTitle.textContent = `${song.title} / 파일을 audio 폴더에 추가해주세요`;
    miniPlayerTitle.textContent = `${song.title} / Add audio file`;
    return;
  }

  if (audioPlayer.getAttribute("src") !== song.src) {
    audioPlayer.src = song.src;
    audioPlayer.load();
  }
  audioPlayer.muted = false;
  playAudio();
  startVisualizer();
}

function bindPlayerControls() {
  const playCurrent = () => {
    if (currentSong && currentSong.song.src) {
      playAudio();
      startVisualizer();
    }
  };

  const pauseCurrent = () => {
    audioPlayer.pause();
  };

  playBtn.addEventListener("click", playCurrent);
  miniPlayBtn.addEventListener("click", playCurrent);
  pauseBtn.addEventListener("click", pauseCurrent);
  miniPauseBtn.addEventListener("click", pauseCurrent);
}

function playAudio() {
  const playPromise = audioPlayer.play();
  if (playPromise && typeof playPromise.catch === "function") {
    playPromise.catch((error) => {
      resetPlaybackTheme();
      playerTitle.textContent = `재생 실패: ${error.name || "브라우저 제한"}`;
      miniPlayerTitle.textContent = "Playback blocked";
    });
  }
}

function setPlaybackTheme(release) {
  document.body.classList.add("theme-playing");
  document.body.style.setProperty("--play-bg", release.theme || "#2A3E40");
  document.body.style.setProperty("--play-cover", `url("${release.cover}")`);
}

function resetPlaybackTheme() {
  document.body.classList.remove("theme-playing");
  document.body.style.removeProperty("--play-bg");
  document.body.style.removeProperty("--play-cover");
}

function formatTime(seconds) {
  if (!Number.isFinite(seconds)) return "0:00";
  const minutes = Math.floor(seconds / 60);
  const rest = Math.floor(seconds % 60).toString().padStart(2, "0");
  return `${minutes}:${rest}`;
}

function syncProgress() {
  const duration = audioPlayer.duration || 0;
  const current = audioPlayer.currentTime || 0;
  const percent = duration ? (current / duration) * 100 : 0;
  seekSlider.value = percent;
  seekSlider.style.setProperty("--seek", `${percent}%`);
  currentTimeEl.textContent = formatTime(current);
  durationTimeEl.textContent = formatTime(duration);
  miniTimeEl.textContent = `${formatTime(current)} / ${formatTime(duration)}`;
}

function bindSeekControls() {
  audioPlayer.addEventListener("timeupdate", syncProgress);
  audioPlayer.addEventListener("loadedmetadata", syncProgress);
  audioPlayer.addEventListener("play", () => {
    document.body.classList.add("audio-playing");
    if (currentSong) setPlaybackTheme(currentSong.release);
  });
  audioPlayer.addEventListener("pause", () => {
    document.body.classList.remove("audio-playing");
    resetPlaybackTheme();
  });
  audioPlayer.addEventListener("ended", () => {
    syncProgress();
    document.body.classList.remove("audio-playing");
    resetPlaybackTheme();
    document.querySelectorAll(".song-button").forEach((button) => button.classList.remove("is-playing"));
  });
  audioPlayer.addEventListener("error", () => {
    resetPlaybackTheme();
    playerTitle.textContent = "이 오디오 파일을 재생할 수 없습니다";
    miniPlayerTitle.textContent = "Audio file error";
  });

  seekSlider.addEventListener("input", () => {
    if (!audioPlayer.duration) return;
    audioPlayer.currentTime = (Number(seekSlider.value) / 100) * audioPlayer.duration;
    syncProgress();
  });
}

function startVisualizer() {
  if (visualizerRaf) return;
  function tick() {
    const isPlaying = !audioPlayer.paused && !audioPlayer.ended && audioPlayer.readyState > 2;
    const t = audioPlayer.currentTime || 0;
    visualizerBars.forEach((bar, index) => {
      const wave = Math.sin(t * (3.2 + index * 0.17) + index * 0.85);
      const pulse = Math.abs(wave);
      const height = isPlaying ? 12 + pulse * 78 : 12;
      bar.style.height = `${height}%`;
      bar.style.opacity = `${isPlaying ? 0.24 + pulse * 0.64 : 0.16}`;
    });
    visualizerRaf = requestAnimationFrame(tick);
  }

  tick();
}

function bindVolumeControls() {
  const setVolume = (value) => {
    audioPlayer.volume = Number(value);
    volumeSlider.value = value;
    miniVolumeSlider.value = value;
  };

  volumeSlider.addEventListener("input", () => setVolume(volumeSlider.value));
  miniVolumeSlider.addEventListener("input", () => setVolume(miniVolumeSlider.value));
  setVolume(volumeSlider.value);
}

function bindStickyPlayer() {
  const playerBar = document.querySelector(".player-bar");
  const syncMiniPlayer = () => {
    const rect = playerBar.getBoundingClientRect();
    const isVisible = rect.bottom > 0 && rect.top < window.innerHeight;
    miniPlayer.classList.toggle("show", !isVisible);
  };

  const observer = new IntersectionObserver(([entry]) => {
    miniPlayer.classList.toggle("show", !entry.isIntersecting);
  }, { threshold: 0.2 });

  observer.observe(playerBar);
  window.addEventListener("scroll", syncMiniPlayer, { passive: true });
  window.addEventListener("resize", syncMiniPlayer);
  syncMiniPlayer();
}

function bindCursorEvents() {
  document.addEventListener("mousemove", (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
  });

  document.addEventListener("mouseover", (event) => {
    if (event.target.closest(".interactive")) cursor.classList.add("is-hovering");
  });

  document.addEventListener("mouseout", (event) => {
    const current = event.target.closest(".interactive");
    const next = event.relatedTarget && event.relatedTarget.closest(".interactive");
    if (current && current !== next) cursor.classList.remove("is-hovering");
  });
}

function animateCursor() {
  // Lower easing value gives the custom cursor a slower, more cinematic follow.
  cursorX += (mouseX - cursorX) * 0.12;
  cursorY += (mouseY - cursorY) * 0.12;
  cursor.style.left = `${cursorX}px`;
  cursor.style.top = `${cursorY}px`;
  requestAnimationFrame(animateCursor);
}

function bindAlbumMotion() {
  document.addEventListener("mousemove", (event) => {
    const nx = (event.clientX / window.innerWidth - 0.5) * 2;
    const ny = (event.clientY / window.innerHeight - 0.5) * 2;
    orbitX = nx;
    orbitY = ny;
  });

  function animateAlbum() {
    const moveX = orbitX * 16;
    const moveY = orbitY * 12;
    const rotateY = orbitX * 5;
    const rotateX = orbitY * -5;
    albumOrbit.style.transform = `translate3d(${moveX}px, ${moveY}px, 0) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    requestAnimationFrame(animateAlbum);
  }

  animateAlbum();
}

function bindRevealAnimations() {
  const targets = document.querySelectorAll(".reveal-up, .motion-reveal, .mask-title, .section-heading");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("in-view");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.18 });

  targets.forEach((target) => observer.observe(target));
}

function prepareScrollMotion() {
  // Add motion classes in one place so the HTML stays easy to edit later.
  const revealGroups = [
    ".about-kicker",
    ".about-copy .eyebrow",
    ".about-lead",
    ".about-panel",
    ".about-detail",
    ".photo-heading",
    ".about-photo",
    ".section-heading",
    ".record-card",
    ".site-footer"
  ];

  revealGroups.forEach((selector) => {
    document.querySelectorAll(selector).forEach((element, index) => {
      element.classList.add("motion-reveal");
      element.style.setProperty("--reveal-delay", `${Math.min(index * 90, 360)}ms`);
    });
  });

  document.querySelectorAll(".record-card").forEach((card, index) => {
    card.style.setProperty("--reveal-delay", `${index * 120}ms`);
  });
}

function bindSmoothAnchors() {
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const target = document.querySelector(link.getAttribute("href"));
      if (!target) return;

      event.preventDefault();
      const startY = window.scrollY;
      const targetY = target.getBoundingClientRect().top + window.scrollY;
      const distance = targetY - startY;
      const duration = Math.min(1200, Math.max(700, Math.abs(distance) * 0.6));
      let startTime = null;

      document.body.classList.add("is-smooth-scrolling");

      function step(timestamp) {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        window.scrollTo(0, startY + distance * eased);

        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          document.body.classList.remove("is-smooth-scrolling");
          history.replaceState(null, "", link.getAttribute("href"));
        }
      }

      requestAnimationFrame(step);
    });
  });
}

function updateParallax() {
  parallaxItems.forEach((item) => {
    const rect = item.getBoundingClientRect();
    const viewportCenter = window.innerHeight / 2;
    const itemCenter = rect.top + rect.height / 2;
    const speed = Number(item.dataset.parallaxSpeed || 12);
    const progress = Math.max(-1, Math.min(1, (viewportCenter - itemCenter) / window.innerHeight));
    item.style.setProperty("--parallax-y", `${progress * speed}px`);
  });
  parallaxRaf = null;
}

function bindParallax() {
  const requestParallax = () => {
    if (parallaxRaf) return;
    parallaxRaf = requestAnimationFrame(updateParallax);
  };

  window.addEventListener("scroll", requestParallax, { passive: true });
  window.addEventListener("resize", requestParallax);
  requestParallax();
}

function closeAboutDetail() {
  activeAboutView = null;
  aboutDetail.classList.remove("is-open", "is-live", "is-changing");
  aboutDetail.setAttribute("aria-hidden", "true");
  liveList.setAttribute("aria-hidden", "true");
  aboutButtons.forEach((button) => button.classList.remove("is-active"));
}

function setAboutView(viewName) {
  if (viewName === activeAboutView && aboutDetail.classList.contains("is-open")) {
    closeAboutDetail();
    return;
  }

  const nextView = viewName;
  const view = aboutViews[nextView];
  if (!view || !aboutDetail) return;

  activeAboutView = nextView;
  aboutDetail.classList.add("is-changing");
  aboutDetail.classList.add("is-open");
  aboutDetail.setAttribute("aria-hidden", "false");

  window.setTimeout(() => {
    aboutDetailKicker.textContent = view.kicker;
    aboutDetailTitle.textContent = view.title;
    aboutDetailDescription.textContent = view.description;
    aboutDetail.classList.toggle("is-live", nextView === "live");
    liveList.setAttribute("aria-hidden", String(nextView !== "live"));
    memberInfo.innerHTML = (view.details || []).map(([label, value]) => `
      <div class="${label === "학력" ? "is-wide" : ""}">
        <dt>${label}</dt>
        <dd>${value}</dd>
      </div>
    `).join("");

    if (view.image) {
      aboutDetailImage.src = view.image;
      aboutDetailImage.alt = view.alt;
    }

    aboutButtons.forEach((button) => {
      button.classList.toggle("is-active", button.dataset.aboutView === nextView);
    });

    aboutDetail.classList.remove("is-changing");
  }, 180);
}

function bindAboutInteractions() {
  aboutButtons.forEach((button) => {
    button.addEventListener("click", () => {
      setAboutView(button.dataset.aboutView);
    });
  });
  aboutDetailClose.addEventListener("click", closeAboutDetail);
  closeAboutDetail();
}

function init() {
  prepareScrollMotion();
  renderReleaseList();
  titleEl.classList.toggle("is-long", releases[0].koreanTitle.length > 18);
  updateRelease(0);
  bindReleaseEvents();
  bindPlayerControls();
  bindVolumeControls();
  bindSeekControls();
  bindStickyPlayer();
  bindCursorEvents();
  bindAlbumMotion();
  bindRevealAnimations();
  bindAboutInteractions();
  bindSmoothAnchors();
  bindParallax();
  animateCursor();
}

init();
