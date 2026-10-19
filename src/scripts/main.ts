const TYPING_SPEED_MS = 200;
const TYPING_DELAY_MS = 500;

function initNavbarBurger(): void {
  const burger = document.querySelector<HTMLElement>('.navbar-burger');
  const menu = document.querySelector<HTMLElement>('.navbar-menu');
  if (!burger || !menu) return;

  burger.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('hidden') === false;
    burger.setAttribute('aria-expanded', String(isOpen));
  });
}

function autoType(selector: string, typingSpeed: number): void {
  const host = document.querySelector<HTMLElement>(selector);
  const target = host?.querySelector<HTMLElement>('.home-text');
  if (!host || !target) return;

  const characters = Array.from((target.textContent ?? '').trim());
  target.textContent = '';

  window.setTimeout(() => {
    characters.forEach((character, index) => {
      window.setTimeout(
        () => {
          target.textContent += character;
        },
        (index + 1) * typingSpeed,
      );
    });

    window.setTimeout(() => {
      const blinker = document.createElement('span');
      blinker.className = 'blinker';
      blinker.setAttribute('aria-hidden', 'true');
      blinker.textContent = '|';
      host.append(blinker);
    }, characters.length * typingSpeed);
  }, TYPING_DELAY_MS);
}

initNavbarBurger();

// Respect users who asked for reduced motion: show the name immediately.
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  autoType('.typewriter', TYPING_SPEED_MS);
}
