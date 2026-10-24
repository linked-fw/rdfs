---
"@_linked/rdfs": minor
---

The `rdf` and `rdfs` accessor modules are generated from `src/data/rdf.ttl` and
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
