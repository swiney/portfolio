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
  let isImageFullSize = false;

  function updateLightboxAlignment() {
    if (!isImageFullSize) return;
    
    const imgWidth = imgEl.offsetWidth;
    const imgHeight = imgEl.offsetHeight;
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    // Check each dimension independently
    const overflowsWidth = imgWidth > viewportWidth;
    const overflowsHeight = imgHeight > viewportHeight;
    
    // Update alignment classes based on overflow
    if (overflowsWidth) {
      lightbox.classList.add('overflow-width');
    } else {
      lightbox.classList.remove('overflow-width');
      captionEl.style.top = ''; // Clear inline style
    }
    
    if (overflowsHeight) {
      lightbox.classList.add('overflow-height');
    } else {
      lightbox.classList.remove('overflow-height');
    }
    
    // Check if caption would be off-screen
    // Account for caption height and some margin
    const captionHeight = captionEl.offsetHeight || 50; // fallback estimate
    const totalHeight = imgHeight + captionHeight + 32; // 32px for margins
    
    if (totalHeight > viewportHeight) {
      lightbox.classList.add('caption-fixed');
      captionEl.style.top = ''; // Clear inline style, use bottom positioning
    } else {
      lightbox.classList.remove('caption-fixed');
      
      // For wide images that don't overflow vertically, position caption below image
      if (overflowsWidth && !overflowsHeight) {
        // Calculate where the bottom of the image is relative to viewport
        const imgRect = imgEl.getBoundingClientRect();
        const captionTop = imgRect.bottom + 16; // 16px margin
        captionEl.style.top = `${captionTop}px`;
      } else {
        captionEl.style.top = ''; // Clear for normal flow
      }
    }
  }

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

  function closeLightbox() {
    lightbox.classList.remove('active');
    clearLightboxContent();
    // Re-enable body scroll when lightbox is closed
    document.body.style.overflow = '';
    // Reset zoom state
    isImageFullSize = false;
    lightbox.classList.remove('overflow-width');
    lightbox.classList.remove('overflow-height');
    lightbox.classList.remove('hide-arrows');
    lightbox.classList.remove('caption-fixed');
    // Clear inline caption positioning
    captionEl.style.top = '';
  }

  function openLightbox(index) {
    clearLightboxContent();
    isImageFullSize = false; // Reset zoom state when opening new image

    currentIndex = index;
    const item = items[currentIndex];
    const type = item.dataset.type;
    const src = item.dataset.src;
    let embedHtml = item.dataset.embed || '';
    const description = item.dataset.description || '';

    if (type === 'image') {
      imgEl.src = src;
      imgEl.style.display = 'block';
      imgEl.classList.remove('full-size');
      imgEl.style.cursor = 'zoom-in';
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
    
    // Disable body scroll when lightbox is open
    document.body.style.overflow = 'hidden';
  }

  items.forEach((item, i) => {
    item.addEventListener('click', () => openLightbox(i));
  });

  document.getElementById('lightbox-close').addEventListener('click', () => {
    closeLightbox();
  });

  document.getElementById('lightbox-prev').addEventListener('click', () => {
    openLightbox((currentIndex - 1 + items.length) % items.length);
  });

  document.getElementById('lightbox-next').addEventListener('click', () => {
    openLightbox((currentIndex + 1) % items.length);
  });

  lightbox.addEventListener('click', e => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  // Toggle image size when clicking on the image
  imgEl.addEventListener('click', (e) => {
    e.stopPropagation(); // Prevent lightbox from closing
    isImageFullSize = !isImageFullSize;
    
    if (isImageFullSize) {
      imgEl.classList.add('full-size');
      imgEl.style.cursor = 'zoom-out';
      lightbox.classList.add('hide-arrows');
      
      // Wait for the image to render at full size, then check alignment
      setTimeout(() => {
        updateLightboxAlignment();
      }, 0);
    } else {
      imgEl.classList.remove('full-size');
      imgEl.style.cursor = 'zoom-in';
      lightbox.classList.remove('overflow-width');
      lightbox.classList.remove('overflow-height');
      lightbox.classList.remove('hide-arrows');
      lightbox.classList.remove('caption-fixed');
      captionEl.style.top = '';
    }
  });

  // Update alignment when window is resized
  window.addEventListener('resize', () => {
    if (lightbox.classList.contains('active') && isImageFullSize) {
      updateLightboxAlignment();
    }
  });
});
