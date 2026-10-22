---
'@_linked/rdfs': minor
---

The ontology data ships as Turtle, the shapes gain RDFS's own hierarchy terms, and `domain` and
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
