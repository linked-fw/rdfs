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

## Development: do not run `npm install` in this directory

`packages/rdfs` is a member of Create Now's **yarn** workspace. Installing with
npm here writes a nested `node_modules/@_linked/core` instead of letting the
package resolve to the workspace copy via the hoisted symlink — and two copies
of `@_linked/core` means **two distinct `Shape` classes**. Nothing crashes;
the symptom is a type error in a *consumer*, far from the cause. This is what
`@_linked/owl` hit when it migrated off `lincd-rdfs`:

```
Type 'typeof Property' is not assignable to type 'typeof Shape'.
  Type 'Map<string, Set<typeof import(".../packages/rdfs/node_modules/@_linked/core/lib/esm/shapes/Shape").Shape>>'
    is not assignable to
    'Map<string, Set<typeof import(".../packages/core/lib/esm/shapes/Shape").Shape>>'.
```

Run `yarn` from the workspace root instead, and build with `npx linked build`
from this directory. If a nested `node_modules/@_linked/core` already exists,
delete it — the shape identity split is silent until something downstream
fails to compile, or, worse, until two `Shape` registries diverge at runtime.

## History

Renamed from `lincd-rdfs` and migrated out of the
[lincd.org](https://github.com/lincd-org) umbrella into its own repo.
The source is unchanged apart from the registry name passed to
`linkedPackage()`, which also changes the shape IRI slug from
`lincd-rdfs` to `rdfs` (`https://linked.cm/shape/rdfs/Resource`),
matching every other `@_linked/*` vocabulary package.
