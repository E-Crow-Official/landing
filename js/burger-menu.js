function initBurgerMenu() {
	const burgerButton = document.getElementById('burger-menu');
	const nav = document.getElementById('nav');
	const navLinks = document.querySelectorAll('.nav__list a');
	
	if (!burgerButton || !nav) return;
	
	function toggleMenu() {
		burgerButton.classList.toggle('active');
		nav.classList.toggle('active');
		document.body.classList.toggle('menu-open');
	}
	
	function closeMenu() {
		burgerButton.classList.remove('active');
		nav.classList.remove('active');
		document.body.classList.remove('menu-open');
	}
	
	burgerButton.addEventListener('click', toggleMenu);
	
	navLinks.forEach(link => {
		link.addEventListener('click', closeMenu);
	});
	
	document.addEventListener('click', (e) => {
		if (!nav.contains(e.target) && !burgerButton.contains(e.target)) {
			closeMenu();
		}
	});
	
	window.addEventListener('resize', () => {
		if (window.innerWidth > 1159) {
			closeMenu();
		}
	});
}