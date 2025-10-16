document.addEventListener('DOMContentLoaded', () => {
  const lightbox = document.getElementById('gallery-lightbox');
  const imgEl = document.getElementById('lightbox-image');
  const videoEl = document.getElementById('lightbox-video');
  const videoSrcEl = document.getElementById('lightbox-video-src');
  const captionEl = document.getElementById('lightbox-caption');

  // Find the existing embed container or create it (and ensure it has the right class)
  let embedContainer = document.getElementById('lightbox-embed');
  if (!embedContainer) {
    embedContainer = document.createElement('div');
    embedContainer.id = 'lightbox-embed';
    embedContainer.className = 'lightbox-embed';
    lightbox.insertBefore(embedContainer, captionEl);
  } else {
    // make sure it has the CSS class used by your stylesheet
    if (!embedContainer.classList.contains('lightbox-embed')) {
      embedContainer.classList.add('lightbox-embed');
    }
  }

  const items = Array.from(document.querySelectorAll('.gallery-item'));
  let currentIndex = 0;

  function decodeHtmlEntities(encoded) {
    // decode HTML entities if the YAML was escaped into an attribute
    const txt = document.createElement('textarea');
    txt.innerHTML = encoded;
    return txt.value;
  }

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
    let embedHtml = item.dataset.embed || '';
    const description = item.dataset.description || '';

    if (type === 'image') {
      imgEl.src = src;
      imgEl.style.display = 'block';
    } else if (type === 'video') {
      videoSrcEl.src = src;
      videoEl.load();
      videoEl.style.display = 'block';
    } else if (type === 'embed') {
      // If the embed was stored escaped in data-embed, decode it
      embedHtml = decodeHtmlEntities(embedHtml);

      // Remove width/height attributes and inline style attributes to let CSS manage sizing
      embedHtml = embedHtml.replace(/(width|height)=["']\d+["']/gi, '')
                           .replace(/style=["'][^"']*["']/gi, '');

      // Inject cleaned iframe HTML into the existing .lightbox-embed container
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
