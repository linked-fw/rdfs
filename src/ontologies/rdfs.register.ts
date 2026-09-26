/**
 * Registers this ontology.
 *
 * Kept out of `rdfs.ts` because registration needs that module's whole export
 * namespace, and the framework has moved every ontology off the self-import form:
 * a module importing itself is a circular import to a bundler, and the binding has
 * been observed undefined at runtime (`_this is not defined` at boot). `tsc`
 * preserves it, which is why the pattern survived while packages were built with
 * `tsc` alone.
 *
 * From a sibling module the same import is ordinary and survives.
 */
import * as terms from './rdfs.js';
import {loadData, ns} from './rdfs.js';
import {linkedOntology} from '../package.js';

linkedOntology(terms, ns, 'rdfs', loadData, '../data/rdfs.json');
