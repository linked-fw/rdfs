---
'@_linked/rdfs': minor
---

`Class` and `Property` declare `static defaultReadGraphs = graphs.allOntologies`: with
a `@_linked/core` that reads `defaultReadGraphs` (its next minor), a select, count or ask of them (and of OWL's term shapes, which
extend them) without `.from()` reads every ontology graph the registry lists. `Resource` declares
none. An explicit `.from()` wins. Older core ignores the static.
