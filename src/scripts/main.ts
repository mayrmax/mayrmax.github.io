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

initNavbarBurger();
openTargetDetails();
window.addEventListener('hashchange', openTargetDetails);
