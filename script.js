document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('container');
    const urlParams = new URLSearchParams(window.location.search);
    const videoID = urlParams.get('videoID');
  
    if (videoID) {
      // If videoID exists in URL, display the video in full size
      container.innerHTML = `
        <iframe src="https://www.youtube.com/embed/${videoID}" allowfullscreen></iframe>
      `;
      document.body.style.overflow = 'hidden'; // Disable body scrolling during video playback
    } else {
      // Otherwise, fetch the links from file.txt
      fetch('file.txt')
        .then(response => response.text())
        .then(data => {
          const links = data.split('\n').filter(Boolean); // Remove empty lines
          links.forEach(link => {
            const videoID = link.split('v=')[1];
            const thumbnailUrl = `https://i.ytimg.com/vi/${videoID}/hqdefault.jpg?sqp=-oaymwEcCOADEI4CSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLADJE_r8arqPS2eTHBimp3k_PiXAQ`;
  
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
    }
  });
  