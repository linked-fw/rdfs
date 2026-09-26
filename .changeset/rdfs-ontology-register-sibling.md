---
'@_linked/rdfs': patch
---

Register the `rdf` and `rdfs` ontologies from a sibling module instead of importing the module into itself.

`rdf.ts` and `rdfs.ts` ended with `linkedOntology(_this, …)`, where `_this` came from the file importing itself. That is a circular import to a bundler; the binding has been observed undefined at runtime (`_this is not defined` at boot) in an application bundling these packages. `tsc` preserves it, which is why the form survived while packages were built with `tsc` alone.

Registration moves to `rdf.register.ts` / `rdfs.register.ts`, where the same import is ordinary, and the entry imports those. This is the form every other `@_linked/*` ontology already uses; `rdfs` was the last package still on the self-import.
