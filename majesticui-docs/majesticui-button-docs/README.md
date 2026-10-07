# MajesticUI Button System

This documentation is only for the **Button system** in MajesticUI.

It covers:

- Normal buttons
- Shadcn-based buttons
- Multiple button variants
- Stateful buttons
- Stateful button variants
- Associated CSS
- Tailwind CSS
- Framer Motion
- Icon dependencies
- `"use client"` handling
- Existing file detection
- Conflict handling
- Registry metadata
- Selective dependency installation

This documentation does **not** describe the full MajesticUI architecture.

## Main Commands

```bash
majestic add button
majestic add button:shadcn
majestic add button:animated
majestic add button:glass

majestic add stateful-button
majestic add stateful-button:spinner
majestic add stateful-button:progress
```

MajesticUI installs only the dependencies required by the selected button or variant.
