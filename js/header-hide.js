function initHeaderHide() {
	const header = document.querySelector('.header-container');
	const teamInviteSection = document.querySelector('.team-invite');

	if (!header || !teamInviteSection) return;

	const HIDE_RATIO = 0.9; // когда 90% секции видно — прячем header

	// --- IntersectionObserver (быстрая реакция на desktop и обычные браузеры) ---
	const io = new IntersectionObserver(
		(entries) => {
			entries.forEach(entry => {
				// используем intersectionRatio, но это может "прыгать" на iOS
				if (entry.intersectionRatio >= HIDE_RATIO) {
					header.classList.add('hidden');
				} else {
					header.classList.remove('hidden');
				}
			});
		},
		{
			// ставим несколько порогов, чтобы intersectionRatio был более точным
			threshold: Array.from({ length: 21 }, (_, i) => i / 20)
		}
	);
	io.observe(teamInviteSection);

	// --- visualViewport fallback / уточнение для iOS Safari ---
	// visualViewport корректно отражает реальную видимую область, когда адресная/панель инструментов меняются.
	if (window.visualViewport) {
		let ticking = false;

		function checkVisualViewport() {
			if (ticking) return;
			ticking = true;
			requestAnimationFrame(() => {
				const rect = teamInviteSection.getBoundingClientRect();
				const vHeight = window.visualViewport.height;

				// вычисляем видимую высоту секции внутри visualViewport
				const visibleTop = Math.max(rect.top, 0);
				const visibleBottom = Math.min(rect.bottom, vHeight);
				const visibleHeight = Math.max(0, visibleBottom - visibleTop);
				const ratio = rect.height > 0 ? visibleHeight / rect.height : 0;

				if (ratio >= HIDE_RATIO) {
					header.classList.add('hidden');
				} else {
					header.classList.remove('hidden');
				}

				ticking = false;
			});
		}

		// слушаем основные события, которые влияют на визуальную область
		window.addEventListener('scroll', checkVisualViewport, { passive: true });
		visualViewport.addEventListener('resize', checkVisualViewport);
		visualViewport.addEventListener('scroll', checkVisualViewport);

		// стартовая проверка на загрузке
		checkVisualViewport();
	}

	// опционально: безопасная начальная проверка (если ни IO ни visualViewport не дали событие сразу)
	setTimeout(() => {
		const rect = teamInviteSection.getBoundingClientRect();
		const viewportH = window.innerHeight;
		const visibleTop = Math.max(rect.top, 0);
		const visibleBottom = Math.min(rect.bottom, viewportH);
		const visibleHeight = Math.max(0, visibleBottom - visibleTop);
		const ratio = rect.height > 0 ? visibleHeight / rect.height : 0;
		if (ratio >= HIDE_RATIO) header.classList.add('hidden');
	}, 100);
}
