const video = document.getElementById('video');
const playPauseBtn = document.getElementById('playPauseBtn');
const seekBar = document.getElementById('seekBar');
const volumeBar = document.getElementById('volumeBar');
const muteBtn = document.getElementById('muteBtn');
const speedSelect = document.getElementById('speed');
const currentTimeDisplay = document.getElementById('currentTime');
const durationDisplay = document.getElementById('duration');
const fullscreenBtn = document.getElementById('fullscreenBtn');
const videoContainer = document.getElementById('videoContainer');
const controls = document.getElementById('controls');
const playPauseAnimation = document.getElementById('playPauseAnimation');
const playIcon = document.getElementById('playIcon');
const pauseIcon = document.getElementById('pauseIcon');
const playPauseIcon = document.getElementById('playPauseIcon');
const muteIcon = document.getElementById('muteIcon');

let hideControlsTimeout;

// Play/Pause functionality
playPauseBtn.addEventListener('click', function () {
  togglePlayPause();
});

let clickTimeout;

video.addEventListener('click', function () {
  if (clickTimeout) {
    clearTimeout(clickTimeout);
    clickTimeout = null;
    toggleFullscreen(); // Double-click triggers fullscreen
  } else {
    clickTimeout = setTimeout(function () {
      togglePlayPause(); // Single-click toggles play/pause
      clickTimeout = null;
    }, 200); // 200ms delay to differentiate between single and double click
  }
});


function togglePlayPause() {
  if (video.paused) {
    video.play();
    playPauseIcon.innerHTML = '<path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>';
    showPauseAnimation();
  } else {
    video.pause();
    playPauseIcon.innerHTML = '<path d="M8 5v14l11-7z"/>';
    showPlayAnimation();
  }
}

// Keyboard controls
document.addEventListener('keydown', function (e) {
  switch (e.key.toLowerCase()) {
    case ' ': // Space: Play/Pause
      e.preventDefault();
      togglePlayPause();
      break;
    case 'm': // M: Mute/Unmute
      toggleMute();
      break;
    case 'f': // F: Fullscreen
      toggleFullscreen();
      break;
    case '=': // =: Increase speed
      changeSpeed(0.25);
      break;
    case '-': // -: Decrease speed
      changeSpeed(-0.25);
      break;
    case 'arrowup': // Up Arrow: Increase Volume
      changeVolume(0.1);
      break;
    case 'arrowdown': // Down Arrow: Decrease Volume
      changeVolume(-0.1);
      break;
    case 'arrowright': // Right Arrow: Seek Forward 5 seconds
      video.currentTime = Math.min(video.duration, video.currentTime + 5);
      break;
    case 'arrowleft': // Left Arrow: Seek Backward 5 seconds
      video.currentTime = Math.max(0, video.currentTime - 5);
      break;

  }
});

function changeVolume(delta) {
  video.volume = Math.min(1, Math.max(0, video.volume + delta));
  volumeBar.value = video.volume;
}


function toggleMute() {
  video.muted = !video.muted;
  muteIcon.innerHTML = video.muted ?
    '<path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-.77-3.29-2-4.31v8.62c1.23-1.02 2-2.54 2-4.31zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.84-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>' :
    '<path d="M3 9v6h4l5 5V4L7 9H3zm10-2.1L8.64 8H5V6h3.64L13 3.9v10.2zM19 12c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z"/>';
}

muteBtn.addEventListener('click', toggleMute);

// Fullscreen functionality
fullscreenBtn.addEventListener('click', function () {
  toggleFullscreen();
});

function toggleFullscreen() {
  if (!document.fullscreenElement) {
    videoContainer.requestFullscreen();
    fullscreenBtn.innerHTML = '<path d="M5 16h2v-2H5v2zm4 0h10V8H9v8zm-4 0h2V8H5v8zm16-2v2h-2v-2h2zm0-8v2h-2V6h2zM3 6v2H1V6h2zm2-2h2v2H5V4zm12 0h2v2h-2V4zm4 0v2h-2V4h2z"/>';  // Fullscreen exit icon
  } else {
    document.exitFullscreen();
    fullscreenBtn.innerHTML = '<path d="M7 14H5v5h5v-2H7v-3zm0-4h2V7h3V5H7v5zm10 8h-3v2h5v-5h-2v3zm-3-8h3v3h2V5h-5v2z"/>';  // Fullscreen icon
  }
}

document.addEventListener('fullscreenchange', function () {
  if (!document.fullscreenElement) {
    fullscreenBtn.innerHTML = '<path d="M7 14H5v5h5v-2H7v-3zm0-4h2V7h3V5H7v5zm10 8h-3v2h5v-5h-2v3zm-3-8h3v3h2V5h-5v2z"/>';
  }
});

const playPauseArea = document.getElementById('playPauseAnimation');

playPauseArea.addEventListener('click', function () {
  if (clickTimeout) {
    clearTimeout(clickTimeout);
    clickTimeout = null;
    toggleFullscreen(); // Double-click triggers fullscreen
  } else {
    clickTimeout = setTimeout(function () {
      togglePlayPause(); // Single-click toggles play/pause
      clickTimeout = null;
    }, 200); // 200ms delay to differentiate between single and double click
  }
});

// Play/Pause animation
function showPlayAnimation() {
  pauseIcon.style.display = 'none';
  playIcon.style.display = 'block';
  playPauseAnimation.classList.add('show-animation');
  setTimeout(() => {
    playPauseAnimation.classList.remove('show-animation');
  }, 500);
}

function showPauseAnimation() {
  playIcon.style.display = 'none';
  pauseIcon.style.display = 'block';
  playPauseAnimation.classList.add('show-animation');
  setTimeout(() => {
    playPauseAnimation.classList.remove('show-animation');
  }, 500);
}

// Hide controls after inactivity
function hideControlsAfterTimeout() {
  clearTimeout(hideControlsTimeout);
  hideControlsTimeout = setTimeout(() => {
    controls.classList.remove('show');
  }, 3000);
}

// Show controls on hover
videoContainer.addEventListener('mousemove', function () {
  controls.classList.add('show');
  hideControlsAfterTimeout();
});

// Initial control timeout
hideControlsAfterTimeout();

// Speed control
speedSelect.addEventListener('change', function () {
  video.playbackRate = speedSelect.value;
});

function changeSpeed(delta) {
  let newSpeed = parseFloat(video.playbackRate) + delta;
  if (newSpeed >= 0.25 && newSpeed <= 2) {
    video.playbackRate = newSpeed;
    speedSelect.value = newSpeed;
  }
}

// Update the seek bar as the video plays
video.addEventListener('timeupdate', function () {
  const progress = (video.currentTime / video.duration) * 100;
  seekBar.value = progress;

  // Change the color of the watched part of the seekbar
  seekBar.style.background = `linear-gradient(to right, red ${progress}%, #444 ${progress}%)`;

  // Update current time display
  const currentMinutes = Math.floor(video.currentTime / 60);
  const currentSeconds = Math.floor(video.currentTime % 60);
  currentTimeDisplay.textContent = `${currentMinutes}:${currentSeconds.toString().padStart(2, '0')}`;

  // Update total duration
  if (!isNaN(video.duration)) {
    const totalMinutes = Math.floor(video.duration / 60);
    const totalSeconds = Math.floor(video.duration % 60);
    durationDisplay.textContent = `${totalMinutes}:${totalSeconds.toString().padStart(2, '0')}`;
  }
});


// Seek video
seekBar.addEventListener('input', function () {
  const time = (seekBar.value / 100) * video.duration;
  video.currentTime = time;
});

// Tooltip for seekbar time
const tooltip = document.createElement('div');
tooltip.classList.add('seekbar-tooltip');
videoContainer.appendChild(tooltip);

seekBar.addEventListener('mousemove', function (e) {
  const rect = seekBar.getBoundingClientRect();
  const seekTime = ((e.clientX - rect.left) / rect.width) * video.duration;
  const minutes = Math.floor(seekTime / 60);
  const seconds = Math.floor(seekTime % 60).toString().padStart(2, '0');

  tooltip.textContent = `${minutes}:${seconds}`;
  tooltip.style.display = 'block';  // Make tooltip visible on hover
  tooltip.style.left = `${e.clientX - videoContainer.offsetLeft}px`;
  tooltip.style.bottom = '40px'; // Adjust positioning above the seek bar
});

seekBar.addEventListener('mouseleave', function () {
  tooltip.style.display = 'none';  // Hide tooltip when the mouse leaves the seekbar
});




// Volume control
volumeBar.addEventListener('input', function () {
  video.volume = volumeBar.value;
  if (video.volume > 0) {
    video.muted = false; // Unmute immediately when volume is changed
    muteIcon.innerHTML = '<path d="M3 9v6h4l5 5V4L7 9H3zm10-2.1L8.64 8H5V6h3.64L13 3.9v10.2zM19 12c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z"/>';
  }
});

// Get video ID from URL parameters
const params = new URLSearchParams(window.location.search);
const videoID = params.get('videoID'); // Use the appropriate key here
const src = params.get('src');

if (videoID && videoID.endsWith('.m3u8')) {
  if (Hls.isSupported()) {
    const hls = new Hls();
    hls.loadSource(videoID);
    hls.attachMedia(video);
    hls.on(Hls.Events.MANIFEST_PARSED, () => {
      video.play();
    });
  } else {
    // For Safari
    video.src = videoID;
    video.addEventListener('loadedmetadata', () => {
      video.play();
    });
  }
  videoContainer.classList.remove('hidden');
} else if (src == 'html') {
  video.src = videoID;
  videoContainer.classList.remove('hidden');
  video.load();
  video.setAttribute('autoplay', true);
} else if (videoID) {
  container.innerHTML = `
        <iframe src="https://www.youtube.com/embed/${videoID}" allowfullscreen></iframe>
      `;
  containers.classList.remove('hidden');
}  else {
  // Otherwise, fetch the links from file.txt
  fetch('file.txt')
    .then(response => response.text())
    .then(data => {
      const links = data.split('\n').filter(Boolean); // Remove empty lines
      links.forEach(link => {
        const videoID = link.split('v=')[1];
        const thumbnailUrl = `https://img.youtube.com/vi/${videoID}/mqdefault.jpg`;

        // Create a thumbnail element with 16:9 ratio and rounded corners
        const thumbnailDiv = document.createElement('div');
        thumbnailDiv.classList.add('thumbnail');
        thumbnailDiv.innerHTML = `
        <img src="${thumbnailUrl}" alt="Thumbnail">
      `;

        // Add click event to redirect with videoID in URL
        thumbnailDiv.addEventListener('click', () => {
          window.location.href = `?videoID=${videoID}`;
        });

        container.appendChild(thumbnailDiv);
      });
    })
    .catch(error => console.error('Error fetching video links:', error));
  containers.classList.remove('hidden');
}