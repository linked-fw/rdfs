---
'@_linked/rdfs': patch
---

Add `src/shapes/index.ts`, which registers the package's shapes (`Resource`, `Class`, `Property`)
and their ontologies, so an app can load them with `import '@_linked/rdfs/shapes/index'` without
pulling in the React components. The package entry now imports it. `linked build` (cli 1.32.0)
fails a package that declares shapes but has no `shapes/index`, and CI is switching to
`linked build`. `@_linked/rdfs/shapes` still resolves to the shapes module as before.
