document.addEventListener('DOMContentLoaded', function() {
  const tagButtons = document.querySelectorAll('.tag-btn');
  const projectCards = document.querySelectorAll('.project-card');
  const galleryItems = document.querySelectorAll('.gallery-item');
  let activeTags = new Set();

  // Parse URL parameters on page load
  function getTagsFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const tagsParam = urlParams.get('tags');
    if (tagsParam) {
      // Split by comma, plus sign, or space
      return tagsParam.split(/[,+\s]+/).filter(tag => tag.length > 0);
    }
    return [];
  }

  // Update URL with current tags
  function updateURL() {
    if (activeTags.size > 0) {
      // Manually construct URL with + signs (bypassing URLSearchParams encoding)
      const tagString = Array.from(activeTags).join('+');
      const newURL = `${window.location.pathname}?tags=${tagString}`;
      window.history.replaceState({}, '', newURL);
    } else {
      // Remove tags parameter
      window.history.replaceState({}, '', window.location.pathname);
    }
  }

  // Filter projects based on active tags
  function filterProjects() {
    if (activeTags.size === 0) {
      // Show all if no tags selected
      projectCards.forEach(card => {
        card.style.display = '';
      });
      return;
    }

    projectCards.forEach(card => {
      const cardTags = card.getAttribute('data-tags');
      if (!cardTags) {
        card.style.display = 'none';
        return;
      }

      const cardTagArray = cardTags.split(',').map(tag => tag.trim());
      
      // Show card if it has ANY of the active tags (OR logic)
      const hasAnyTag = Array.from(activeTags).some(tag => 
        cardTagArray.includes(tag)
      );

      card.style.display = hasAnyTag ? '' : 'none';
    });
  }

  // Filter gallery items based on active tags
  function filterGallery() {
    if (activeTags.size === 0) {
      // Show all if no tags selected
      galleryItems.forEach(item => {
        item.style.display = '';
      });
      return;
    }

    galleryItems.forEach(item => {
      const itemTags = item.getAttribute('data-tags');
      if (!itemTags) {
        item.style.display = 'none';
        return;
      }

      const itemTagArray = itemTags.split(',').map(tag => tag.trim());
      
      // Show item if it has ANY of the active tags (OR logic)
      const hasAnyTag = Array.from(activeTags).some(tag => 
        itemTagArray.includes(tag)
      );

      item.style.display = hasAnyTag ? '' : 'none';
    });
  }

  // Update button states (for all tag button instances)
  function updateButtonStates() {
    tagButtons.forEach(btn => {
      const tag = btn.getAttribute('data-tag');
      if (tag === 'all') {
        btn.classList.toggle('active', activeTags.size === 0);
      } else {
        btn.classList.toggle('active', activeTags.has(tag));
      }
    });
  }

  // Handle tag button clicks
  tagButtons.forEach(btn => {
    btn.addEventListener('click', function(e) {
      const tag = this.getAttribute('data-tag');
      
      // Check if this button is in the gallery section by looking for the ID
      const portfolioTagsContainer = this.closest('.portfolio-tags');
      const isGallerySection = portfolioTagsContainer?.id === 'gallery-tags';
      
      // Store multiple reference points for more robust tracking
      let savedScrollY = null;
      let buttonRect = null;
      let gallerySection = null;
      let gallerySectionRect = null;
      
      if (isGallerySection) {
        savedScrollY = window.pageYOffset;
        buttonRect = this.getBoundingClientRect();
        gallerySection = document.querySelector('.gallery-section');
        if (gallerySection) {
          gallerySectionRect = gallerySection.getBoundingClientRect();
        }
      }

      if (tag === 'all') {
        activeTags.clear();
      } else {
        if (activeTags.has(tag)) {
          activeTags.delete(tag);
        } else {
          activeTags.add(tag);
        }
      }

      updateButtonStates();
      filterProjects();
      filterGallery();
      updateURL();
      
      // Compensate for layout shift when clicking gallery tags
      if (isGallerySection && buttonRect) {
        // Use requestAnimationFrame to ensure DOM has updated
        requestAnimationFrame(() => {
          // Get new positions after filtering
          const newButtonRect = this.getBoundingClientRect();
          const shift = newButtonRect.top - buttonRect.top;
          
          // Calculate max scrollable distance
          const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
          
          if (Math.abs(shift) > 1) {
            // Calculate target scroll position
            let targetScroll = window.pageYOffset + shift;
            
            // Clamp to valid scroll range
            targetScroll = Math.max(0, Math.min(targetScroll, maxScroll));
            
            window.scrollTo({ 
              top: targetScroll, 
              behavior: 'instant' 
            });
          }
        });
      }
    });
  });

  // Initialize from URL on page load
  const urlTags = getTagsFromURL();
  urlTags.forEach(tag => activeTags.add(tag));
  updateButtonStates();
  filterProjects();
  filterGallery();
});
