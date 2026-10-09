document.querySelector('#year').textContent = new Date().getFullYear();

const menu = document.querySelector('.menu');
const nav = document.querySelector('#nav');
menu.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menu.setAttribute('aria-expanded', String(isOpen));
  menu.textContent = isOpen ? '×' : '☰';
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menu.setAttribute('aria-expanded', 'false');
  menu.textContent = '☰';
}));

const form = document.querySelector('#inquiry-form');
if (form) {
  form.addEventListener('submit', event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const fields = new FormData(form);
    const subject = `Project inquiry: ${fields.get('project')}`;
    const body = [
      `Name: ${fields.get('name')}`,
      `Email: ${fields.get('email')}`,
      `Project: ${fields.get('project')}`,
      '',
      String(fields.get('message'))
    ].join('\n');
    window.location.href = `mailto:hello@alphadigital.studio?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
}

const gallery = document.querySelector('.gallery-grid');
if (gallery) {
  const items = [...gallery.querySelectorAll('.gallery-item')];
  const count = document.querySelector('#gallery-count');
  const filters = document.querySelectorAll('[data-filter]');
  filters.forEach(button => button.addEventListener('click', () => {
    const category = button.dataset.filter;
    let visible = 0;
    items.forEach(item => {
      item.hidden = category !== 'all' && item.dataset.category !== category;
      if (!item.hidden) visible++;
    });
    count.textContent = `${String(visible).padStart(2, '0')} EXPLORATIONS`;
    filters.forEach(filter => {
      const active = filter === button;
      filter.classList.toggle('active', active);
      filter.setAttribute('aria-pressed', String(active));
    });
  }));

  const dialog = document.querySelector('#gallery-dialog');
  const preview = document.querySelector('#gallery-preview');
  items.forEach(item => item.addEventListener('click', () => {
    preview.replaceChildren(item.querySelector('.gallery-art').cloneNode(true));
    document.querySelector('#gallery-dialog-title').textContent = item.dataset.title;
    document.querySelector('#gallery-dialog-detail').textContent = item.dataset.detail;
    dialog.showModal();
  }));
  dialog.querySelector('.gallery-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
}
