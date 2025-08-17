// Unified Theme Toggle for all pages
document.addEventListener('DOMContentLoaded', function() {
	const themeToggle = document.getElementById('theme-toggle');
	if (!themeToggle) return;

	// Use a single key for theme
	const THEME_KEY = 'namasteTheme';
	const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
	const savedTheme = localStorage.getItem(THEME_KEY) || (prefersDark ? 'dark' : 'light');

	function applyTheme(theme) {
		if (theme === 'dark') {
			document.body.classList.add('dark-mode');
			themeToggle.textContent = '☀️';
			themeToggle.setAttribute('aria-label', 'Switch to light mode');
		} else {
			document.body.classList.remove('dark-mode');
			themeToggle.textContent = '🌙';
			themeToggle.setAttribute('aria-label', 'Switch to dark mode');
		}
	}

	applyTheme(savedTheme);

	themeToggle.addEventListener('click', function() {
		const isDark = document.body.classList.toggle('dark-mode');
		const newTheme = isDark ? 'dark' : 'light';
		localStorage.setItem(THEME_KEY, newTheme);
		applyTheme(newTheme);
	});
});
