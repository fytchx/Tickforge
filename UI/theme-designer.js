(() => {
  const root = document.documentElement;
  const storageKey = 'tickforge-ui-theme-v1';

  const presets = {
    arcana: { main: '#0b0e16', panel: '#171b28', accent: '#bba4ff', text: '#f5f5fb', pattern: 'rings', button: 'solid', radius: 12, texture: 5 },
    abyss: { main: '#070c18', panel: '#10192a', accent: '#78b9ff', text: '#edf6ff', pattern: 'contours', button: 'outline', radius: 10, texture: 7 },
    ember: { main: '#120d0b', panel: '#261915', accent: '#f29a64', text: '#fff4e8', pattern: 'diagonal', button: 'solid', radius: 8, texture: 6 },
    moss: { main: '#0a100d', panel: '#162118', accent: '#82c994', text: '#effbf2', pattern: 'grid', button: 'ghost', radius: 14, texture: 4 },
    gold: { main: '#100f0a', panel: '#242116', accent: '#dcc16c', text: '#fffbee', pattern: 'stars', button: 'solid', radius: 6, texture: 5 }
  };

  const patternCss = {
    plain: 'none',
    rings: 'repeating-radial-gradient(circle at 80% 20%, transparent 0 18px, var(--tf-pattern-ink) 19px, transparent 21px, transparent 36px)',
    stars: 'radial-gradient(circle at 20% 20%, var(--tf-pattern-ink) 1px, transparent 2px), radial-gradient(circle at 75% 68%, var(--tf-pattern-ink) 1.5px, transparent 3px)',
    grid: 'linear-gradient(90deg, var(--tf-pattern-ink) 1px, transparent 1px), linear-gradient(var(--tf-pattern-ink) 1px, transparent 1px)',
    diagonal: 'repeating-linear-gradient(135deg, transparent 0 16px, var(--tf-pattern-ink) 17px, transparent 18px, transparent 34px)',
    contours: 'repeating-radial-gradient(ellipse at 10% 20%, transparent 0 12px, var(--tf-pattern-ink) 13px, transparent 14px, transparent 26px)' 
  };

  const els = {};

  function load() {
    try { return JSON.parse(localStorage.getItem(storageKey)) || presets.arcana; }
    catch { return presets.arcana; }
  }

  function save(theme) {
    try { localStorage.setItem(storageKey, JSON.stringify(theme)); } catch {}
  }

  function apply(theme) {
    root.style.setProperty('--tf-bg', theme.main);
    root.style.setProperty('--tf-panel', theme.panel);
    root.style.setProperty('--tf-accent', theme.accent);
    root.style.setProperty('--tf-text', theme.text);
    root.style.setProperty('--tf-radius', `${theme.radius}px`);
    root.style.setProperty('--tf-pattern-alpha', (theme.texture / 100).toString());
    root.style.setProperty('--tf-pattern-ink', `color-mix(in srgb, ${theme.accent} ${Math.max(theme.texture, 1)}%, transparent)`);
    root.style.setProperty('--tf-pattern', patternCss[theme.pattern] || 'none');

    document.querySelectorAll('.tf-button-primary').forEach((button) => { button.dataset.style = theme.button; });

    if (els.preset) els.preset.value = theme.preset || '';
    if (els.main) els.main.value = theme.main;
    if (els.panel) els.panel.value = theme.panel;
    if (els.accent) els.accent.value = theme.accent;
    if (els.text) els.text.value = theme.text;
    if (els.pattern) els.pattern.value = theme.pattern;
    if (els.button) els.button.value = theme.button;
    if (els.radius) els.radius.value = theme.radius;
    if (els.texture) els.texture.value = theme.texture;
    save(theme);
  }

  function currentTheme() {
    return {
      preset: els.preset?.value || '',
      main: els.main?.value,
      panel: els.panel?.value,
      accent: els.accent?.value,
      text: els.text?.value,
      pattern: els.pattern?.value,
      button: els.button?.value,
      radius: Number(els.radius?.value),
      texture: Number(els.texture?.value)
    };
  }

  document.addEventListener('DOMContentLoaded', () => {
    els.preset = document.querySelector('[data-theme-preset]');
    els.main = document.querySelector('[data-theme-main]');
    els.panel = document.querySelector('[data-theme-panel]');
    els.accent = document.querySelector('[data-theme-accent]');
    els.text = document.querySelector('[data-theme-text]');
    els.pattern = document.querySelector('[data-theme-pattern]');
    els.button = document.querySelector('[data-theme-button]');
    els.radius = document.querySelector('[data-theme-radius]');
    els.texture = document.querySelector('[data-theme-texture]');
    const backdrop = document.querySelector('.tf-modal-backdrop');

    if (els.preset) {
      els.preset.innerHTML = '<option value="">Custom</option>' + Object.entries(presets).map(([key]) => `<option value="${key}">${key[0].toUpperCase() + key.slice(1)}</option>`).join('');
      els.preset.addEventListener('change', () => {
        if (els.preset.value) apply({ ...presets[els.preset.value], preset: els.preset.value });
      });
    }

    [els.main, els.panel, els.accent, els.text, els.pattern, els.button, els.radius, els.texture].forEach((el) => {
      el?.addEventListener('input', () => apply(currentTheme()));
      el?.addEventListener('change', () => apply(currentTheme()));
    });

    document.querySelectorAll('[data-open-designer]').forEach((button) => button.addEventListener('click', () => {
      if (!backdrop) return;
      backdrop.hidden = false;
      backdrop.querySelector('button')?.focus();
    }));

    document.querySelectorAll('[data-close-designer]').forEach((button) => button.addEventListener('click', () => {
      if (!backdrop) return;
      backdrop.hidden = true;
      document.querySelector('[data-open-designer]')?.focus();
    }));

    backdrop?.addEventListener('click', (event) => {
      if (event.target === backdrop) backdrop.hidden = true;
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && backdrop && !backdrop.hidden) backdrop.hidden = true;
    });

    document.querySelector('[data-reset-theme]')?.addEventListener('click', () => apply({ ...presets.arcana, preset: 'arcana' }));

    apply(load());
  });
})();
