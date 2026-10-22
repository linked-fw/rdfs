import { Prefix } from '@_linked/core/utils/Prefix';
import { createNameSpace } from '@_linked/core/utils/NameSpace';
import { loadOntologyFiles } from '@_linked/core/ontology/loadOntologyFiles';

/** The package's ontology data, relative to this module (Turtle, copied into `lib/` by the build). */
export const dataFiles = ['../data/rdfs.ttl'];

/** Reads the package's ontology data (server only). */
export const loadData = () => loadOntologyFiles(import.meta.url, dataFiles);

const base = 'http://www.w3.org/2000/01/rdf-schema#';
export const ns = createNameSpace(base);
Prefix.add('rdfs', base);

export const _ontologyResource = ns('');

export const Class = ns('Class');
export const Datatype = ns('Datatype');
export const Literal = ns('Literal');
export const Resource = ns('Resource');

export const comment = ns('comment');
export const domain = ns('domain');
export const isDefinedBy = ns('isDefinedBy');
export const label = ns('label');
export const range = ns('range');
export const seeAlso = ns('seeAlso');
export const subClassOf = ns('subClassOf');
export const subPropertyOf = ns('subPropertyOf');

export const rdfs = {
  _ontologyResource,
  Class,
  Datatype,
  Literal,
  Resource,
  comment,
  domain,
  isDefinedBy,
  label,
  range,
  seeAlso,
  subPropertyOf,
  subClassOf,
};
