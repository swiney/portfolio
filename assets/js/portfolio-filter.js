document.addEventListener('DOMContentLoaded', function() {
  const tagButtons = document.querySelectorAll('.tag-btn');
  const projectCards = document.querySelectorAll('.project-card');
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

  // Update button states
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
    btn.addEventListener('click', function() {
      const tag = this.getAttribute('data-tag');

      if (tag === 'all') {
        // Clear all tags
        activeTags.clear();
      } else {
        // Toggle tag
        if (activeTags.has(tag)) {
          activeTags.delete(tag);
        } else {
          activeTags.add(tag);
        }
      }

      updateButtonStates();
      filterProjects();
      updateURL();
    });
  });

  // Initialize from URL on page load
  const urlTags = getTagsFromURL();
  urlTags.forEach(tag => activeTags.add(tag));
  updateButtonStates();
  filterProjects();
});
