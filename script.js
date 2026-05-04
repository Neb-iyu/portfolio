// Style constants for easy theming
const STYLE_CONSTANTS = {
  themes: [
    {
      name: 'Teal',
      primary: 'hsl(174, 50%, 50%)',
      secondary: 'hsl(280, 50%, 60%)',
    },
    {
      name: 'Blue',
      primary: 'hsl(220, 70%, 55%)',
      secondary: 'hsl(280, 60%, 60%)',
    },
    {
      name: 'Purple',
      primary: 'hsl(270, 60%, 60%)',
      secondary: 'hsl(320, 60%, 60%)',
    },
    {
      name: 'Orange',
      primary: 'hsl(25, 80%, 55%)',
      secondary: 'hsl(340, 70%, 60%)',
    },
  ],
  currentThemeIndex: 0,
};

// Theme toggle functionality
function toggleTheme() {
  STYLE_CONSTANTS.currentThemeIndex = 
    (STYLE_CONSTANTS.currentThemeIndex + 1) % STYLE_CONSTANTS.themes.length;
  
  const theme = STYLE_CONSTANTS.themes[STYLE_CONSTANTS.currentThemeIndex];
  
  document.documentElement.style.setProperty('--color-primary', theme.primary);
  document.documentElement.style.setProperty('--color-secondary', theme.secondary);
  
  console.log(`Theme switched to: ${theme.name}`);
}

// Video modal functionality
const videoModal = document.getElementById('videoModal');
const videoFrame = document.getElementById('videoFrame');
const videoModalTitle = document.getElementById('videoModalTitle');

function openVideo(videoUrl, projectName) {
  if (!videoUrl) {
    alert('Demo video coming soon!');
    return;
  }
  
  videoFrame.src = videoUrl;
  videoModalTitle.textContent = projectName || 'Demo Video';
  videoModal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeVideo() {
  videoFrame.src = '';
  videoModal.classList.add('hidden');
  document.body.style.overflow = 'auto';
}

// Event delegation for all interactive elements
document.addEventListener('click', (e) => {
  const target = e.target.closest('[data-action]');
  if (!target) return;
  
  const action = target.dataset.action;
  
  switch (action) {
    case 'toggle-theme':
      toggleTheme();
      break;
      
    case 'open-video':
      e.preventDefault();
      const videoUrl = target.dataset.videoUrl;
      const projectName = target.dataset.projectName;
      openVideo(videoUrl, projectName);
      break;
      
    case 'close-video':
      closeVideo();
      break;
  }
});

// Close modal when clicking backdrop
videoModal?.addEventListener('click', (e) => {
  if (e.target === videoModal) {
    closeVideo();
  }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !videoModal.classList.contains('hidden')) {
    closeVideo();
  }
});

// Image fallback handling
document.addEventListener('DOMContentLoaded', () => {
  const images = document.querySelectorAll('.project-img');
  
  images.forEach(img => {
    img.addEventListener('error', function() {
      const fallbackSrc = this.dataset.fallbackSrc;
      if (fallbackSrc && this.src !== fallbackSrc) {
        this.src = fallbackSrc;
      }
    });
  });
  
  // Smooth scroll offset for fixed nav
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        const offset = 80;
        const targetPosition = target.offsetTop - offset;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
});

console.log('Portfolio loaded! Click the palette button to cycle through color themes.');
