function initHeaderThemeToggle() {
	const headerContainer = document.querySelector('.header-container')
	const firstAdoptersSection = document.getElementById('first-adopters')

	if (!firstAdoptersSection) return

	function updateHeaderTheme() {
		const scrollPosition = window.scrollY
		const sectionTop = firstAdoptersSection.offsetTop
		const triggerPoint = sectionTop - window.innerHeight + 640

		if (scrollPosition >= triggerPoint) {
			headerContainer.classList.add('dark-header')
		} else {
			headerContainer.classList.remove('dark-header')
		}
	}

	let scrollTimeout
	window.addEventListener('scroll', () => {
		clearTimeout(scrollTimeout)
		scrollTimeout = setTimeout(updateHeaderTheme, 10)
	})

	updateHeaderTheme()
}

function initThemeToggle() {
	const themeToggle = document.getElementById('theme-toggle')
	const navThemeToggle = document.getElementById('nav-theme-toggle')
	const html = document.documentElement

	function getPreferredTheme() {
		const savedTheme = localStorage.getItem('theme')
		if (savedTheme) {
			return savedTheme
		}
		return window.matchMedia('(prefers-color-scheme: dark)').matches
			? 'dark'
			: 'light'
	}

	function setTheme(theme) {
		if (theme === 'dark') {
			html.setAttribute('data-theme', 'dark')
		} else {
			html.removeAttribute('data-theme')
		}
		localStorage.setItem('theme', theme)
	}

	function toggleTheme() {
		const currentTheme = html.getAttribute('data-theme')
		const newTheme = currentTheme === 'dark' ? 'light' : 'dark'
		setTheme(newTheme)
	}

	const currentTheme = getPreferredTheme()
	setTheme(currentTheme)

	if (themeToggle) {
		themeToggle.addEventListener('click', toggleTheme)
	}
	
	if (navThemeToggle) {
		navThemeToggle.addEventListener('click', toggleTheme)
	}

	window
		.matchMedia('(prefers-color-scheme: dark)')
		.addEventListener('change', e => {
			if (!localStorage.getItem('theme')) {
				setTheme(e.matches ? 'dark' : 'light')
			}
		})
}