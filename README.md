# @_linked/rdfs

The RDF and RDF Schema vocabularies as ontologies, plus the core
`@linkedShape` classes every other vocabulary builds on.

## Shapes

- `Resource` — `rdfs:Resource` (`label`, `comment`, `type`)
- `Class` — `rdfs:Class` (`isDefinedBy`, `subClassOf` (any number), `ontology`)
- `Property` — `rdf:Property` (`domain`, `range`, `subPropertyOf` (each any number),
  `isDefinedBy`)

The package mirrors the RDF and RDFS namespaces: it holds only their terms, and its shapes only
classes they define. Custom shapes live in a package of their own namespace.

## Ontologies

- `rdf` — `http://www.w3.org/1999/02/22-rdf-syntax-ns#`
- `rdfs` — `http://www.w3.org/2000/01/rdf-schema#`

## The data

Each ontology's data is the latest official release of its standard, as the W3C publishes it at
the namespace, unchanged apart from a leading comment that names the source:

| File | Source | Version |
|---|---|---|
| `src/data/rdf.ttl` | <https://www.w3.org/1999/02/22-rdf-syntax-ns> (Turtle) | `dc:date "2019-12-16"` (RDF 1.1 Concepts, with JSON-LD 1.1's `rdf:JSON`, `rdf:CompoundLiteral`, `rdf:language`, `rdf:direction`) |
| `src/data/rdfs.ttl` | <https://www.w3.org/2000/01/rdf-schema> (Turtle) | Last-Modified 2024-12-18 |

To refresh, download each with `curl -sSL -H 'Accept: text/turtle' <source>`, put the comment
back with the new Last-Modified (`curl -sI`) and, for rdf, `dc:date`, and run
`npx linked generate-ontology`.

The official files are the only source of the package's terms: the package never adds a class
or property to a standard's namespace. What the published standard lacks, mainly metadata, goes
in one extra file per prefix, `src/data/<prefix>-added.ttl`, listed in `"linkedOntologies"`' data:

- the ontology entity itself: `owl:Ontology`, title, description,
  `vann:preferredNamespacePrefix`, `vann:preferredNamespaceUri`, the source URL and version;
- annotations on terms the standard already defines, such as a missing `rdfs:label`.

New classes or properties never go there; a term a standard lacks belongs in the consumer's own
ontology package.

Both files here carry their own ontology header, so this package has no `-added` file.

The build copies the data into `lib/esm/data/`. `linked generate-ontology` writes the accessor
modules from it (`package.json` `"linkedOntologies"`): `ontologies/<prefix>.ts` holds one named
export per term, and `ontologies/<prefix>.data.ts` holds `ns`, `dataFiles`, `_ontologyResource`
and `loadData()`, which reads the data on the server.

## Components

- `LabelView` — renders a resource's `rdfs:label`, falling back to the last
  segment of its IRI.

## Usage

```ts
import { Resource, Property } from '@_linked/rdfs/shapes';
import * as rdfs from '@_linked/rdfs/ontologies/rdfs';

rdfs.label; // {id: 'http://www.w3.org/2000/01/rdf-schema#label'}
```

## Development

Build with `npx linked build` from this directory. (`yarn linked build` is
refused by the wrapper and exits 0, so it looks like a successful no-op.)

### A nested `node_modules/@_linked/core` is the thing to watch for

This section used to say "do not run `npm install` in this directory", on the
grounds that npm here writes a nested `node_modules/@_linked/core` and two
copies of core mean two distinct `Shape` classes. **The prohibition was wrong,
and the diagnosis of where the nested copy came from was wrong.** It has been
measured since: the nested install dated from when this package was built in a
`staging/` directory *outside* the workspace globs, where it genuinely was a
standalone package and npm was the right tool. Moving it into `packages/`
carried that private `node_modules` along with it. The directory has been
deleted, and `packages/rdfs` now has no `node_modules` of its own — it resolves
to the single workspace `@_linked/core` through the hoisted symlink.

`package-lock.json` being tracked here is correct and should stay: CI runs
`npm ci`.

What remains true is the *symptom*, which is worth recognising because it names
neither npm nor this package. Two copies of `@_linked/core` mean two distinct
`Shape` classes; nothing crashes, and the error surfaces in a *consumer*. This
is what `@_linked/owl` hit while it was migrating off `lincd-rdfs`:

```
Type 'typeof Property' is not assignable to type 'typeof Shape'.
  Type 'Map<string, Set<typeof import(".../packages/rdfs/node_modules/@_linked/core/lib/esm/shapes/Shape").Shape>>'
    is not assignable to
    'Map<string, Set<typeof import(".../packages/core/lib/esm/shapes/Shape").Shape>>'.
```

If you ever see that, check `ls packages/rdfs/node_modules` — the path inside
the message says which copy is the stray one — and delete the nested tree. The
split is silent until something downstream fails to compile, or two `Shape`
registries diverge at runtime.

## History

Renamed from `lincd-rdfs` and migrated out of the
[lincd.org](https://github.com/lincd-org) umbrella into its own repo.
The source is unchanged apart from the registry name passed to
`linkedPackage()`, which also changes the shape IRI slug from
`lincd-rdfs` to `rdfs` (`https://linked.cm/shape/rdfs/Resource`),
matching every other `@_linked/*` vocabulary package.

## Data license

The package code is MIT licensed (see `LICENSE`). The bundled ontology data is derived from the W3C RDF and RDF Schema specifications and is not covered by the MIT license: it remains under the W3C Software and Document License, https://www.w3.org/copyright/software-license-2023/. See `NOTICE`.
