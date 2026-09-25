import { Prefix } from '@_linked/core/utils/Prefix';
import { createNameSpace } from '@_linked/core/utils/NameSpace';
import { linkedOntology } from '../package.js';
import * as _this from './rdfs.js';

const dataFile = '../data/rdfs.json';
export const loadData = () => {
  //@ts-ignore
  return import('../data/rdfs.json', { with: { type: 'json' } }).then(
    (data) => data.default
  );
};

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
  subPropertyOf,
  subClassOf,
};

linkedOntology(_this, ns, 'rdfs', loadData, dataFile);
