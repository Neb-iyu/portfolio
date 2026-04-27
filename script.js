// Style constants controller (interchangeable theme)
const STYLE_CONSTANTS = {
	colors: {
		primary: '#3b82f6',
		primaryDark: '#2563eb',
		secondary: '#8b5cf6',
		accent: '#f59e0b',
		bgPage: '#f8fafc',
		bgCard: '#ffffff',
		textPrimary: '#0f172a',
		textSecondary: '#334155',
		textMuted: '#64748b',
		border: '#e2e8f0',
	},
	borderRadius: { card: '1.5rem', button: '2rem' },
	shadows: {
		sm: '0 10px 25px -5px rgba(0, 0, 0, 0.05)',
		md: '0 20px 25px -12px rgba(0, 0, 0, 0.08)',
	},
};
const THEME_PALETTES = [
	{
		primary: '#3b82f6',
		primaryDark: '#2563eb',
		secondary: '#8b5cf6',
		accent: '#f59e0b',
		bgPage: '#f8fafc',
		bgCard: '#ffffff',
		textPrimary: '#0f172a',
		textSecondary: '#334155',
		textMuted: '#64748b',
		border: '#e2e8f0',
	},
	{
		primary: '#ec489a',
		primaryDark: '#db2777',
		secondary: '#f97316',
		accent: '#84cc16',
		bgPage: '#fefce8',
		bgCard: '#ffffff',
		textPrimary: '#2d2a24',
		textSecondary: '#57534e',
		textMuted: '#78716c',
		border: '#e7e5e4',
	},
	{
		primary: '#0ea5a4',
		primaryDark: '#0f766e',
		secondary: '#0284c7',
		accent: '#f97316',
		bgPage: '#f0fdfa',
		bgCard: '#ffffff',
		textPrimary: '#042f2e',
		textSecondary: '#155e75',
		textMuted: '#0f766e',
		border: '#99f6e4',
	},
];

let currentThemeIndex = 0;

function applyTheme() {
	const c = STYLE_CONSTANTS.colors;
	const root = document.documentElement;
	root.style.setProperty('--color-primary', c.primary);
	root.style.setProperty('--color-primary-dark', c.primaryDark);
	root.style.setProperty('--color-secondary', c.secondary);
	root.style.setProperty('--color-accent', c.accent);
	root.style.setProperty('--color-bg-page', c.bgPage);
	root.style.setProperty('--color-bg-card', c.bgCard);
	root.style.setProperty('--color-text-primary', c.textPrimary);
	root.style.setProperty('--color-text-secondary', c.textSecondary);
	root.style.setProperty('--color-text-muted', c.textMuted);
	root.style.setProperty('--color-border', c.border);
}

function toggleDemoTheme() {
	currentThemeIndex = (currentThemeIndex + 1) % THEME_PALETTES.length;
	Object.assign(STYLE_CONSTANTS.colors, THEME_PALETTES[currentThemeIndex]);
	applyTheme();
}

function hideModal() {
	document.getElementById('demoModal').classList.add('hidden');
}

function showDemoVideo(projectName, videoUrl = null) {
	const modal = document.getElementById('videoModal');
	const videoFrame = document.getElementById('videoFrame');
	const modalTitle = document.getElementById('videoModalTitle');

	modalTitle.innerText = `${projectName} - Demo Video`;

	let finalUrl = videoUrl;
	if (!finalUrl) {
		finalUrl = 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=0';
	}

	videoFrame.src = finalUrl;
	modal.classList.remove('hidden');
}

function closeVideoModal() {
	const modal = document.getElementById('videoModal');
	const videoFrame = document.getElementById('videoFrame');
	videoFrame.src = '';
	modal.classList.add('hidden');
}



function openDemoVideoFromButton(button) {
	showDemoVideo(button.dataset.projectName || 'Demo', button.dataset.videoUrl || null);
}



function attachFallbackImageHandlers() {
	document.querySelectorAll('img.project-img').forEach((image) => {
		image.addEventListener('error', () => {
			const placeholderSrc = image.dataset.fallbackSrc;
			if (placeholderSrc && image.src !== placeholderSrc) {
				image.src = placeholderSrc;
				image.alt = image.dataset.fallbackAlt || image.alt;
				return;
			}

			const iconClass = image.dataset.fallbackIcon || 'fas fa-image';
			const label = image.dataset.fallbackLabel || 'Preview unavailable';
			const container = image.parentElement;
			if (!container) {
				return;
			}

			image.remove();
			const placeholder = document.createElement('div');
			placeholder.className = 'img-placeholder-icon';
			placeholder.innerHTML = `<i class="${iconClass} fa-4x"></i><div class="absolute bottom-2 text-xs bg-black/50 text-white px-2 rounded">${label}</div>`;
			container.appendChild(placeholder);
		});
	});
}

window.addEventListener('DOMContentLoaded', () => {
	applyTheme();
	attachFallbackImageHandlers();

	document.querySelectorAll('[data-action="toggle-theme"]').forEach((button) => {
		button.addEventListener('click', toggleDemoTheme);
	});

	document.querySelectorAll('[data-action="open-video"]').forEach((button) => {
		button.addEventListener('click', () => openDemoVideoFromButton(button));
	});

	document.querySelectorAll('[data-action="close-video"]').forEach((button) => {
		button.addEventListener('click', closeVideoModal);
	});

	const videoModal = document.getElementById('videoModal');
	if (videoModal) {
		videoModal.addEventListener('click', (event) => {
			if (event.target === videoModal) {
				closeVideoModal();
			}
		});
	}

});
