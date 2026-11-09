# The UI Shelf

A collection of small, single-purpose tools for frontend developers and designers.
Pick what you need and take it from the shelf!

**Try it live:** [ui-shelf.vercel.app](https://ui-shelf.vercel.app)

## Tools

| Tool                      | What it does                                                                                 | Status      |
| ------------------------- | -------------------------------------------------------------------------------------------- | ----------- |
| Contrast checker          | WCAG contrast ratio and AA/AAA pass–fail for a foreground/background pair                    | Live        |
| Palette generator         | Generate color palettes and combinations, lock and edit swatches, copy as HEX/RGB/HSL or CSS | Live        |
| Color blindness simulator | Preview colors under protanopia, deuteranopia, and tritanopia                                | Coming soon |

More tools will be added as they ship.

## Next steps

- **Color blindness simulator**: the next tool on the shelf. Preview colors and
  uploaded images under protanopia, deuteranopia, and tritanopia.
- **Palette generator**
  - Shareable URLs that restore colors, combination, and locks
  - A contrast badge on each swatch, against black and white text
  - Export a palette as PNG or JSON

Ideas or bugs? [Open an issue](https://github.com/camilamarendazzo/ui-shelf/issues).

## Stack

- [React](https://react.dev/) 19 (with the React Compiler) + [TypeScript](https://www.typescriptlang.org/)
- [React Router](https://reactrouter.com/) for client-side routing
- [Vite](https://vite.dev/) for dev server and builds
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Vitest](https://vitest.dev/) for tests
- [oxlint](https://oxc.rs/docs/guide/usage/linter) + [Prettier](https://prettier.io/) for linting and formatting

All tool logic is 100% client-side; the site deploys as a static bundle.

## Local development

Requires [Node.js](https://nodejs.org/) and [pnpm](https://pnpm.io/).

```sh
pnpm install
pnpm dev        # start the dev server
pnpm test       # run the test suite
pnpm lint       # lint
pnpm build      # typecheck + production build
```

## License

[MIT](LICENSE)
