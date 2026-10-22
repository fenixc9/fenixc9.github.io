/* Mark the current section without changing Fluid's navigation or search. */
(function () {
  'use strict';
  const currentPath = window.location.pathname;
  document.querySelectorAll('#navbar .nav-link[href], #mobile-grid-menu a[href]').forEach(function (link) {
    const path = new URL(link.href, window.location.href).pathname;
    if (link.getAttribute('href') !== 'javascript:;' && (path === '/' ? currentPath === '/' : currentPath.startsWith(path))) {
      link.setAttribute('aria-current', 'page');
    }
  });
  const toggle = document.getElementById('navbar-toggler-btn');
  const menu = document.getElementById('mobile-grid-menu');
  if (!toggle || !menu) return;
  toggle.setAttribute('aria-label', '打开导航菜单');
  toggle.setAttribute('aria-controls', 'mobile-grid-menu');
  new MutationObserver(function () {
    const open = menu.classList.contains('show');
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? '关闭导航菜单' : '打开导航菜单');
    menu.inert = !open;
  }).observe(menu, { attributes: true, attributeFilter: ['class'] });
  menu.inert = !menu.classList.contains('show');
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && menu.classList.contains('show')) {
      toggle.click();
      toggle.focus();
    }
  });
})();
