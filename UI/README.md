# Tickforge UI Kit

A framework-free Arcana-inspired interface kit for Tickforge. It provides reusable CSS classes, a live HTML showcase, theme presets, and a saved in-browser theme designer.

## Open the demo

Open `UI/index.html` in a browser, or serve the repository:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000/UI/`.

## Include it in Tickforge

```html
<link rel="stylesheet" href="./UI/arcana-ui.css" />
<script src="./UI/theme-designer.js" defer></script>
```

For pages that have theme controls, add `data-open-designer` to the button that opens the designer and include the modal markup from `UI/index.html`.

## Reusable classes

- `arcana-panel`, `arcana-panel-raised`
- `arcana-stack`, `arcana-row`, `arcana-between`
- `arcana-button`, `arcana-button-primary`, `arcana-button-danger`
- `arcana-tabs`, `arcana-tab`
- `arcana-slot`, `arcana-slot-active`
- `arcana-inventory-slot`
- `arcana-meter`, `arcana-meter-fill`
- `arcana-modal`, `arcana-modal-backdrop`
- `arcana-designer`

## Theme variables

```css
:root {
  --arc-bg: #0b0e16;
  --arc-panel: #171b28;
  --arc-panel-raised: #1f2433;
  --arc-accent: #bba4ff;
  --arc-text: #f5f5fb;
  --arc-muted: #a6aabd;
  --arc-border: #34394d;
  --arc-danger: #ef6f7d;
  --arc-success: #67c995;
  --arc-radius: 12px;
}
```

The designer saves theme choices in `localStorage` under `tickforge-ui-theme-v1`.
