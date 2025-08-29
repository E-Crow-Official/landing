export function initComingSoonAnimation() {
	const comingSoonText = document.querySelector('.categories__subtitle')

	if (comingSoonText && comingSoonText.textContent.includes('coming soon')) {
		const baseText = 'coming soon'
		comingSoonText.innerHTML = baseText + '<span class="dots-container"></span>'

		const dotsContainer = comingSoonText.querySelector('.dots-container')

		let dotCount = 0

		function cycleDots() {
			dotCount = (dotCount + 1) % 4
			dotsContainer.textContent = '.'.repeat(dotCount)
		}

		setInterval(cycleDots, 500)
	}
}

export function initAdBulletLevitation() {
	const adBullets = [
		...document.querySelectorAll('.ad-bullet'),
		 ...document.querySelectorAll('.caregory-bullet')
		]

	adBullets.forEach((bullet, index) => {
		// Smooth levitation patterns for each bullet
		const patterns = [
			{ x: [-8, 8], y: [-5, 5] }, // First bullet: gentle left-right
			{ x: [6, -6], y: [-8, 8] }, // Second bullet: opposite direction
			{ x: [-10, 10], y: [-3, 3] }, // Third bullet: wider horizontal movement
		]

		const pattern = patterns[index % patterns.length]

		animate(bullet, {
			x: pattern.x,
			y: pattern.y,
			rotate: [-1, 1],
			loop: true,
			alternate: true,
			duration: 4000 + index * 500,
			easing: 'ease-in-out-sine',
		})
	})
}

export function initDraggableCards() {
	const adBullets = document.querySelectorAll('.ad-bullet-container')

	adBullets.forEach(container => {
		anime.createDraggable(container, {
			container: [10, 10, 10, 10],
		})
	})
}

export function initEyeAnimation() {
	const eyes = document.querySelectorAll('.eye')

	eyes.forEach(container => {
		animate(container, {
			x: [0, -60, 0],
			loop: true, 
			easing: 'inOutExpo',
			duration: 45000,
		})
	})
}
