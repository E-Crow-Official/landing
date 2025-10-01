function initHeaderHide() {
	const header = document.querySelector('.header-container');
	const teamInviteSection = document.querySelector('.team-invite');

	if (!header || !teamInviteSection) return;

	let lastScrollY = window.scrollY;

	function check() {
		const rect = teamInviteSection.getBoundingClientRect();
		const windowHeight = window.innerHeight;
		const currentScrollY = window.scrollY;
		const scrollingUp = currentScrollY < lastScrollY;

		// Если секция сильно в зоне видимости → скрываем хедер
		if (rect.top < windowHeight * 0.1) {
			header.classList.add('hidden');
		} else {
			// Если мы скроллим вверх → показываем хедер
			if (scrollingUp) {
				header.classList.remove('hidden');
			}
			// Если скроллим вниз → можно прятать (опционально)
			// else {
			//   header.classList.add('hidden');
			// }
		}

		lastScrollY = currentScrollY;
	}

	window.addEventListener('scroll', check, { passive: true });
	check();
}
