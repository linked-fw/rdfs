# @\_linked/rdfs

## 1.1.4

### Patch Changes

- [#23](https://github.com/linked-fw/rdfs/pull/23) [`dbed8cd`](https://github.com/linked-fw/rdfs/commit/dbed8cd05fe1d5ce1e1a125c451f08adbae86aee) Thanks [@flyon](https://github.com/flyon)! - `LabelView` renders again. It read its label from `linkedData[0]`, but only set components
  receive `linkedData`. A single linked component gets its query result spread onto props, so every
  render threw `Cannot destructure ... of undefined`. It now reads `label`. Removing the `as any`
  cast on its query lets that prop be type-checked.

## 1.1.3

### Patch Changes

- [#18](https://github.com/linked-fw/rdfs/pull/18) [`48c5242`](https://github.com/linked-fw/rdfs/commit/48c5242ea83343a2f2a705a1e6956429ac79d95d) Thanks [@flyon](https://github.com/flyon)! - Add `src/shapes/index.ts`, which registers the package's shapes (`Resource`, `Class`, `Property`)
  and their ontologies, so an app can load them with `import '@_linked/rdfs/shapes/index'` without
  pulling in the React components. The package entry now imports it. `linked build` (cli 1.32.0)
  fails a package that declares shapes but has no `shapes/index`, and CI is switching to
  `linked build`. `@_linked/rdfs/shapes` still resolves to the shapes module as before.

## 1.1.2

### Patch Changes

- [#8](https://github.com/linked-fw/rdfs/pull/8) [`0b18101`](https://github.com/linked-fw/rdfs/commit/0b181016ec843c39be330506e905aacc83bb56f9) Thanks [@flyon](https://github.com/flyon)! - Sourcemaps now embed their TypeScript source, so consumers no longer see 'points to missing source files' warnings.

## 1.1.1

### Patch Changes

- [#5](https://github.com/linked-fw/rdfs/pull/5) [`e88491d`](https://github.com/linked-fw/rdfs/commit/e88491d1bcf30f39ee7211d2dc40a05231697cc6) Thanks [@flyon](https://github.com/flyon)! - Register the `rdf` and `rdfs` ontologies from a sibling module instead of importing the module into itself.

  `rdf.ts` and `rdfs.ts` ended with `linkedOntology(_this, …)`, where `_this` came from the file importing itself. That is a circular import to a bundler; the binding has been observed undefined at runtime (`_this is not defined` at boot) in an application bundling these packages. `tsc` preserves it, which is why the form survived while packages were built with `tsc` alone.

  Registration moves to `rdf.register.ts` / `rdfs.register.ts`, where the same import is ordinary, and the entry imports those. This is the form every other `@_linked/*` ontology already uses; `rdfs` was the last package still on the self-import.

## 1.1.0

### Minor Changes

- [#3](https://github.com/linked-fw/rdfs/pull/3) [`470f339`](https://github.com/linked-fw/rdfs/commit/470f3398a6e5f4510e6475c6fd4fab86b3e558d6) Thanks [@flyon](https://github.com/flyon)! - Require `@_linked/core@^2.22.8` (was `^2.21.0`), and pin it in the lockfile.

  The declared range was wide enough that the resolved core depended on whatever the
  consumer — or this repo's own CI, via `package-lock.json` — happened to install. Core
  decides how a shape's IRI is minted, so a stale core made this package emit legacy
  `data.lincd.org` IRIs instead of the arch-02 `linked.cm` scheme. Which IRIs a published
  package produces should not be a function of the installer's dependency tree.

  Minor rather than patch: this raises the minimum core a consumer must resolve, so it
  changes what gets installed rather than only what this package does internally.
