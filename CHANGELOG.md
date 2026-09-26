# @\_linked/rdfs

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
