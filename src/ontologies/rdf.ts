import { Prefix } from '@_linked/core/utils/Prefix';
import { createNameSpace } from '@_linked/core/utils/NameSpace';
import { loadOntologyFiles } from '@_linked/core/ontology/loadOntologyFiles';

/** The package's ontology data, relative to this module (Turtle, copied into `lib/` by the build). */
export const dataFiles = ['../data/rdf.ttl'];

/** Reads the package's ontology data (server only). */
export const loadData = () => loadOntologyFiles(import.meta.url, dataFiles);

const base = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#';
export const ns = createNameSpace(base);
Prefix.add('rdf', base);

export const _ontologyResource = ns('');

export const Property = ns('Property');
export const List = ns('List');
export const first = ns('first');
export const langString = ns('langString');
export const nil = ns('nil');
export const rest = ns('rest');
export const type = ns('type');
export const HTML = ns('HTML');
export const value = ns('value');

export const rdf = {
  _ontologyResource,
  List,
  Property,
  first,
  langString,
  nil,
  rest,
  type,
  HTML,
  value,
};
