# @\_linked/rdfs

## 1.5.1

### Patch Changes

- [#42](https://github.com/linked-fw/rdfs/pull/42) [`d5d380b`](https://github.com/linked-fw/rdfs/commit/d5d380b12b8175c67c56489cf68c7d9ba92a776b) Thanks [@flyon](https://github.com/flyon)! - license: MIT; data license noted

## 1.5.0

### Minor Changes

- [#40](https://github.com/linked-fw/rdfs/pull/40) [`c029970`](https://github.com/linked-fw/rdfs/commit/c02997048af4ed23594a573c62c098f38e799758) Thanks [@flyon](https://github.com/flyon)! - `src/data/rdf.ttl` and `src/data/rdfs.ttl` are now the W3C's own Turtle, as published at each
  namespace, with a comment naming the source and version. The README records the sources and the
  rule that the package never adds a term to a standard's namespace (metadata the standard lacks
  goes in `src/data/<prefix>-added.ttl`).
  
  - `ontologies/rdf` gains the four terms the published vocabulary has and the package lacked:
    `rdf.JSON`, `rdf.CompoundLiteral`, `rdf.language`, `rdf.direction` (22 terms).
  - `rdfs:isDefinedBy`'s comment is the published "The definition of the subject resource."
  - No term was removed or renamed.

## 1.4.0

### Minor Changes

- [#38](https://github.com/linked-fw/rdfs/pull/38) [`96a5ade`](https://github.com/linked-fw/rdfs/commit/96a5aded7834c7629ba8ce59806bbac57b8e8ed4) Thanks [@flyon](https://github.com/flyon)! - The `rdf` and `rdfs` accessor modules are generated from `src/data/rdf.ttl` and
  `src/data/rdfs.ttl` by `linked generate-ontology` (`package.json` `"linkedOntologies"`), and
  `linked build` fails when they are stale. `ontologies/rdf` exports 18 terms (up from 9) and
  `ontologies/rdfs` 15 (up from 12), one named export each.
  
  Breaking changes:
  
  - The aggregated `rdf` and `rdfs` objects are gone. Import each module as a namespace:
  
    ```ts
    import * as rdfs from '@_linked/rdfs/ontologies/rdfs';
    @literalProperty({path: rdfs.label}) get label(): string {…}
    ```
  
  - `ns`, `dataFiles`, `loadData` and `_ontologyResource` moved to `ontologies/rdf.data` and
    `ontologies/rdfs.data`; `import * as rdf` no longer reaches them, and each registered ontology
    carries only its terms.
  - No terms were renamed.

## 1.3.1

### Patch Changes

- [#36](https://github.com/linked-fw/rdfs/pull/36) [`48f7e6c`](https://github.com/linked-fw/rdfs/commit/48f7e6c958bf435eeba95b8ce6780b5ec87cb2af) Thanks [@flyon](https://github.com/flyon)! - Ships `lib/esm/data/shapes.ttl`; core range raised.

## 1.3.0

### Minor Changes

- [#34](https://github.com/linked-fw/rdfs/pull/34) [`3d46494`](https://github.com/linked-fw/rdfs/commit/3d464949e7ab96479b6fd95bceaf7e5cc0b0dbae) Thanks [@flyon](https://github.com/flyon)! - The ontology data ships as Turtle, the shapes gain RDFS's own hierarchy terms, and `domain` and
  `range` are multi-valued.
  
  - `src/data/rdf.json` and `rdfs.json` are replaced by `src/data/rdf.ttl` (102 triples) and
    `rdfs.ttl` (87), copied into `lib/esm/data/` by the build. Each ontology module's `loadData()`
    now resolves to the Turtle text (`string[]`, read through
    `@_linked/core/ontology/loadOntologyFiles`, server only) and the modules export `dataFiles`.
  - **Breaking:** the `@_linked/rdfs/data/*.json` export is removed.
  - **Breaking:** `Property.domain` and `Property.range` are multi-valued (`ShapeSet<Class>`, no
    `maxCount`): RDFS states no cardinality and describes `rdfs:domain` as "*a* domain of the
    subject property".
  - **Breaking:** `comment` (`rdfs:comment`) moves from `Property` to `Resource`, so every shape
    extending `Resource` has it; a property shape for it on a subclass now overrides the inherited
    one.
  - `Class.subClassOf` (`rdfs:subClassOf`, multi-valued `ShapeSet<Class>`) and
    `Property.subPropertyOf` (`rdfs:subPropertyOf`, multi-valued `ShapeSet<Property>`) are added,
    and the `rdfs` ontology exports `seeAlso`.
  - The package declares that it mirrors the RDF and RDFS namespaces, so the shape check reports
    any term in them the data does not define. `npm test` runs `test/shape-check.test.mjs`, which
    asserts the check finds nothing in this package.

## 1.2.0

### Minor Changes

- [#30](https://github.com/linked-fw/rdfs/pull/30) [`922c0c1`](https://github.com/linked-fw/rdfs/commit/922c0c101dbf332ff2a29efb9bb22612450d70eb) Thanks [@flyon](https://github.com/flyon)! - Depend on `@_linked/react@^2.0.0` (was `^1.1.0`) and `@_linked/core@^2.27.0` (was `^2.22.8`, raised to the core peer range `@_linked/react` 2 requires).
  
  An app on `@_linked/react` 2 no longer installs a second copy of `@_linked/react` 1 through this package. The only thing used from it is `createLinkedComponentFn`, which 2.0 did not change.
  
  Minor rather than major: `@_linked/react` is a regular dependency here, not a peer, so no consumer has to change anything to install this release, and dependents on `@_linked/rdfs@^1` pick it up without a range change.

## 1.1.6

### Patch Changes

- [#28](https://github.com/linked-fw/rdfs/pull/28) [`1e37be1`](https://github.com/linked-fw/rdfs/commit/1e37be17c702be5a5e29f02858e9dacc0fda5a8a) Thanks [@flyon](https://github.com/flyon)! - Build with `linked build`, the standard build for linked packages. The published `lib/` holds the same files as before; the `rimraf` and `copyfiles` dev dependencies are gone.

## 1.1.5

### Patch Changes

- [#26](https://github.com/linked-fw/rdfs/pull/26) [`d752f0f`](https://github.com/linked-fw/rdfs/commit/d752f0fcb9889be9a19ca74a31984dc11e41c9dd) Thanks [@flyon](https://github.com/flyon)! - Publish only the files consumers need; the tarball no longer includes `.changeset/`, `.gitattributes`, `.github/`, `renovate.json` or tsconfig files.

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
