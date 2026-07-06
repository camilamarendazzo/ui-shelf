# The UI Shelf

A collection of small, single-purpose tools for frontend developers and designers.
Pick what you need and take it from the shelf!

## Tools

| Tool              | What it does                                                              | Status      |
| ----------------- | ------------------------------------------------------------------------- | ----------- |
| Contrast checker  | WCAG contrast ratio and AA/AAA pass–fail for a foreground/background pair | In progress |
| Palette generator | Color harmonies from a base color, with lockable swatches and export      | Coming soon |

More tools will be added as they ship.

## Stack

- [React](https://react.dev/) 19 (with the React Compiler) + [TypeScript](https://www.typescriptlang.org/)
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
