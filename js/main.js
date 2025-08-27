document.addEventListener('DOMContentLoaded', () => {
	initScrollNavigation(
		document.getElementById('menu'),
		document.getElementById('dot'),
		'active'
	)
	initThemeToggle()
	initHeaderThemeToggle()
	initCardsSlider()
	initBurgerMenu()
})