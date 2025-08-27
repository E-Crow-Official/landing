function animateIndicator(menu, indicator, activeClass) {
	const items = menu.querySelectorAll('[data-index]')

	function updateIndicator() {
		const activeItem = menu.querySelector(`.${activeClass}`)
		if (activeItem) {
			const itemRect = activeItem.getBoundingClientRect()
			const menuRect = menu.getBoundingClientRect()
			const left = itemRect.left - menuRect.left + itemRect.width / 2

			if (indicator.classList.contains('menu-underline')) {
				indicator.style.left = itemRect.left - menuRect.left + 'px'
				indicator.style.width = itemRect.width + 'px'
			} else {
				indicator.style.left = left + 'px'
			}
		}
	}

	items.forEach(item => {
		item.addEventListener('click', () => {
			items.forEach(i => i.classList.remove(activeClass))
			item.classList.add(activeClass)
			updateIndicator()
		})
	})

	updateIndicator()

	window.addEventListener('resize', updateIndicator)

	return { updateIndicator, items }
}

function initScrollNavigation(menu, indicator, activeClass) {
	const { updateIndicator, items } = animateIndicator(
		menu,
		indicator,
		activeClass
	)
	const sections = Array.from(items)
		.map(item => {
			const href = item.getAttribute('href')
			return document.querySelector(href)
		})
		.filter(Boolean)

	let isScrolling = false

	function updateActiveSection() {
		if (isScrolling) return

		const scrollPosition = window.scrollY + 300

		let activeIndex = 0
		for (let i = sections.length - 1; i >= 0; i--) {
			const section = sections[i]
			if (section && section.offsetTop <= scrollPosition) {
				activeIndex = i
				break
			}
		}

		items.forEach((item, index) => {
			item.classList.toggle(activeClass, index === activeIndex)
		})

		updateIndicator()
	}

	let scrollTimeout
	window.addEventListener('scroll', () => {
		clearTimeout(scrollTimeout)
		scrollTimeout = setTimeout(updateActiveSection, 10)
	})

	items.forEach(item => {
		item.addEventListener('click', () => {
			isScrolling = true
			setTimeout(() => {
				isScrolling = false
			}, 1000)
		})
	})

	updateActiveSection()
}