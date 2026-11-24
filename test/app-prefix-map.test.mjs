// Runs against the built lib: `linked build && npm test`.
//
// The package registers no prefix: `Class.ontology` falls back to a namespace of the app's
// prefix map, which this test loads itself, as an app does at start.
import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { Prefix } from '@_linked/core/utils/Prefix';
import '../lib/esm/ontologies/index.js';
import { Class } from '../lib/esm/shapes.js';

const RDFS = 'http://www.w3.org/2000/01/rdf-schema#';
const ontologyOf = (id, isDefinedBy = null) =>
  Object.getOwnPropertyDescriptor(Class.prototype, 'ontology').get.call({ id, isDefinedBy });

describe("Class.ontology and the app's prefix map", () => {
  it('finds no ontology by namespace when the map lacks it', () => {
    Prefix.load({});
    assert.equal(ontologyOf(`${RDFS}label`), null);
  });

  it('falls back to the namespace of the map in use', () => {
    Prefix.load({ rdfs: RDFS });
    assert.deepEqual(ontologyOf(`${RDFS}label`), { id: RDFS });
    assert.deepEqual(ontologyOf(`${RDFS}label`, { id: 'http://example.org/o' }), { id: 'http://example.org/o' });
  });
});
