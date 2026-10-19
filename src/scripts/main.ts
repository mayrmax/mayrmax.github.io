function initNavbarBurger(): void {
  const burger = document.querySelector<HTMLElement>('.navbar-burger');
  const menu = document.querySelector<HTMLElement>('.navbar-menu');
  if (!burger || !menu) return;

  burger.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('hidden') === false;
    burger.setAttribute('aria-expanded', String(isOpen));
  });
}

/**
 * A link to something inside a collapsed <details> — the university projects,
 * the thesis abstracts — would otherwise land on a closed box. Open it first.
 */
function openTargetDetails(): void {
  const id = decodeURIComponent(location.hash.slice(1));
  if (!id) return;
  const target = document.getElementById(id);
  const details = target?.closest('details');
  if (!target || !details) return;
  details.open = true;
  target.scrollIntoView();
}

/**
 * The light/dark toggle. BaseLayout has already set data-theme on <html>; this
 * flips it, remembers the choice, and keeps following the system setting for
 * as long as the visitor has not made one.
 */
function initThemeToggle(): void {
  const root = document.documentElement;
  const button = document.querySelector<HTMLButtonElement>('.theme-toggle');
  const system = matchMedia('(prefers-color-scheme: dark)');

  const stored = (): string | null => {
    try {
      return localStorage.getItem('theme');
    } catch {
      return null;
    }
  };
  const apply = (theme: 'light' | 'dark'): void => {
    root.dataset.theme = theme;
    button?.setAttribute('aria-pressed', String(theme === 'dark'));
  };

  apply(root.dataset.theme === 'dark' ? 'dark' : 'light');
  system.addEventListener('change', (event) => {
    if (!stored()) apply(event.matches ? 'dark' : 'light');
  });
  button?.addEventListener('click', () => {
    const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    apply(next);
    try {
      localStorage.setItem('theme', next);
    } catch {
      // Private mode or storage disabled: the choice lasts for this page.
    }
  });
}

initNavbarBurger();
initThemeToggle();
openTargetDetails();
window.addEventListener('hashchange', openTargetDetails);
