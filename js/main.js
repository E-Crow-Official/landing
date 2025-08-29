import { initComingSoonAnimation, initDraggableCards, initAdBulletLevitation, initEyeAnimation } from './animations.js'

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
	initHeaderHide()
	initComingSoonAnimation()
	initDraggableCards()
	initAdBulletLevitation()
	initEyeAnimation()
})