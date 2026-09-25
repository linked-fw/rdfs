# @_linked/rdfs

The RDF and RDF Schema vocabularies as ontologies, plus the core
`@linkedShape` classes every other vocabulary builds on.

## Shapes

- `Resource` — `rdfs:Resource` (`label`, `type`)
- `Class` — `rdfs:Class` (`isDefinedBy`, `ontology`)
- `Property` — `rdf:Property` (`comment`, `domain`, `range`, `isDefinedBy`)

## Ontologies

- `rdf` — `http://www.w3.org/1999/02/22-rdf-syntax-ns#`
- `rdfs` — `http://www.w3.org/2000/01/rdf-schema#`

## Components

- `LabelView` — renders a resource's `rdfs:label`, falling back to the last
  segment of its IRI.

## Usage

```ts
import { Resource, Property } from '@_linked/rdfs/shapes';
import { rdfs } from '@_linked/rdfs/ontologies/rdfs';
```

## History

Renamed from `lincd-rdfs` and migrated out of the
[lincd.org](https://github.com/lincd-org) umbrella into its own repo.
The source is unchanged apart from the registry name passed to
`linkedPackage()`, which also changes the shape IRI slug from
`lincd-rdfs` to `rdfs` (`https://linked.cm/shape/rdfs/Resource`),
matching every other `@_linked/*` vocabulary package.
