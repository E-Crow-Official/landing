function initHeaderHide() {
	const header = document.querySelector('.header-container')
	const teamInviteSection = document.querySelector('.team-invite')
	
	if (!header || !teamInviteSection) {
		return
	}

	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					header.classList.add('hidden')
				} else {
					header.classList.remove('hidden')
				}
			})
		},
		{
			threshold: 0.9
		}
	)

	observer.observe(teamInviteSection)
}