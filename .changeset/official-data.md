---
"@_linked/rdfs": minor
---

`src/data/rdf.ttl` and `src/data/rdfs.ttl` are now the W3C's own Turtle, as published at each
namespace, with a comment naming the source and version. The README records the sources and the
rule that the package never adds a term to a standard's namespace (metadata the standard lacks
goes in `src/data/<prefix>-added.ttl`).

- `ontologies/rdf` gains the four terms the published vocabulary has and the package lacked:
  `rdf.JSON`, `rdf.CompoundLiteral`, `rdf.language`, `rdf.direction` (22 terms).
- `rdfs:isDefinedBy`'s comment is the published "The definition of the subject resource."
- No term was removed or renamed.
