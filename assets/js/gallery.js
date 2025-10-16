document.addEventListener('DOMContentLoaded', () => {
  const lightbox = document.getElementById('gallery-lightbox');
  const imgEl = document.getElementById('lightbox-image');
  const videoEl = document.getElementById('lightbox-video');
  const videoSrcEl = document.getElementById('lightbox-video-src');
  const captionEl = document.getElementById('lightbox-caption');

  // We'll inject the iframe here when needed
  let embedContainer = document.createElement('div');
  embedContainer.id = 'lightbox-embed';
  lightbox.insertBefore(embedContainer, captionEl);

  const items = Array.from(document.querySelectorAll('.gallery-item'));
  let currentIndex = 0;

  function clearLightboxContent() {
    imgEl.style.display = 'none';
    videoEl.style.display = 'none';
    videoEl.pause();

    // Clear out any previous embed iframe
    embedContainer.innerHTML = '';
    embedContainer.style.display = 'none';
  }

  function openLightbox(index) {
    clearLightboxContent();

    currentIndex = index;
    const item = items[currentIndex];
    const type = item.dataset.type;
    const src = item.dataset.src;
    const embedHtml = item.dataset.embed;
    const description = item.dataset.description || '';

    if (type === 'image') {
      imgEl.src = src;
      imgEl.style.display = 'block';
    } else if (type === 'video') {
      videoSrcEl.src = src;
      videoEl.load();
      videoEl.style.display = 'block';
    } else if (type === 'embed') {
      embedContainer.innerHTML = embedHtml;
      embedContainer.style.display = 'block';
    }

    captionEl.innerHTML = description;
    lightbox.classList.add('active');
  }

  items.forEach((item, i) => {
    item.addEventListener('click', () => openLightbox(i));
  });

  document.getElementById('lightbox-close').addEventListener('click', () => {
    lightbox.classList.remove('active');
    clearLightboxContent();
  });

  document.getElementById('lightbox-prev').addEventListener('click', () => {
    openLightbox((currentIndex - 1 + items.length) % items.length);
  });

  document.getElementById('lightbox-next').addEventListener('click', () => {
    openLightbox((currentIndex + 1) % items.length);
  });

  lightbox.addEventListener('click', e => {
    if (e.target === lightbox) {
      lightbox.classList.remove('active');
      clearLightboxContent();
    }
  });
});
