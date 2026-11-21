# Tickforge UI Kit

A framework-free interface kit derived from Arcana's website design language.

## Demo

Open `UI/index.html` directly or serve the repository:

```bash
python3 -m http.server 8000
```

Visit `http://localhost:8000/UI/`.

## Integration

Link this stylesheet and script from Tickforge pages:

```html
<link rel="stylesheet" href="./UI/tickforge-ui.css" />
<script src="./UI/theme-designer.js" defer></script>
```

For theme controls, add `data-open-designer` to the trigger and include the modal markup from `UI/index.html`.

## Core classes

- `tf-panel`, `tf-panel-raised`
- `tf-stack`, `tf-row`, `tf-between`
- `tf-button`, `tf-button-primary`, `tf-button-danger`
- `tf-tabs`, `tf-tab`
- `tf-slot`, `tf-slot-active`
- `tf-inventory-slot`
- `tf-meter`, `tf-meter-fill`
- `tf-modal`, `tf-modal-backdrop`
- `tf-designer`

## Theme variables

```css
:root {
  --tf-bg: #0b0e16;
  --tf-panel: #171b28;
  --tf-panel-raised: #1f2433;
  --tf-accent: #bba4ff;
  --tf-text: #f5f5fb;
  --tf-muted: #a6aabd;
  --tf-border: #34394d;
  --tf-danger: #ef6f7d;
  --tf-success: #67c995;
  --tf-radius: 12px;
}
```

The theme designer stores its settings in `localStorage` under `tickforge-ui-theme-v1`.

## Scope

This package contains presentation patterns only. It does not copy Arcana game data, routes, server code, accounts, or Arcana-specific codex records.
