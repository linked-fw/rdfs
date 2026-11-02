// Runs against the built lib: `linked build && npm test`.
//
// The term shapes read the ontology graphs by default (`static defaultReadGraphs`, see core's
// docs/architecture/ontologies.md, "A shape's default read set"); `Resource` does not, since
// every other shape of any package may extend it.
import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { graphs } from '@_linked/core/ontologies/graphs';
import { Class, Property, Resource } from '../lib/esm/shapes.js';

describe('default read set', () => {
  it('Class and Property read graphs.allOntologies; Resource declares none', () => {
    assert.equal(Class.defaultReadGraphs, graphs.allOntologies);
    assert.equal(Property.defaultReadGraphs, graphs.allOntologies);
    assert.equal(Object.prototype.hasOwnProperty.call(Resource, 'defaultReadGraphs'), false);
  });
});
