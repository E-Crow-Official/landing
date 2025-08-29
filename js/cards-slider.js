let swiperCards = null

function initCardsSlider() {
	function checkScreenSize() {
		const screenWidth = window.innerWidth

		if (screenWidth < 1024) {
			if (!swiperCards) {
				swiperCards = new Swiper('.swiper-cards', {
					slidesPerView: 1,
					spaceBetween: 0,
					initialSlide: 0,
					effect: 'flip',
					flipEffect: {
						slideShadows: false,
					},
					loop: true,
					autoplay: {
						delay: 2000,
					},
				})
			}
		} else {
			if (swiperCards) {
				swiperCards.destroy(true, true)
				swiperCards = null
			}
		}
	}

	checkScreenSize()
	window.addEventListener('resize', checkScreenSize)
}
