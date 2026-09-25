import { Shape } from '@_linked/core/shapes/Shape';
import {
  createPropertyShape,
  literalProperty,
  objectProperty,
} from '@_linked/core/shapes/SHACL';
import { shacl } from '@_linked/core/ontologies/shacl';
import type { NodeReferenceValue } from '@_linked/core/utils/NodeReference';
import { Prefix } from '@_linked/core/utils/Prefix';
import { linkedShape } from './package.js';
import { rdf } from './ontologies/rdf.js';
import { rdfs } from './ontologies/rdfs.js';

@linkedShape
export class Resource extends Shape {
  static targetClass = rdfs.Resource;

  get type(): Class {
    return null;
  }

  @literalProperty({
    path: rdfs.label,
    maxCount: 1,
  })
  get label(): string {
    return '';
  }
}

@linkedShape
export class Class extends Resource {
  static targetClass = rdfs.Class;

  @objectProperty({
    path: rdfs.isDefinedBy,
    maxCount: 1,
  })
  get isDefinedBy(): NodeReferenceValue {
    return null;
  }

  get ontology(): NodeReferenceValue {
    if (this.isDefinedBy) {
      return this.isDefinedBy;
    }
    if (!this.id) {
      return null;
    }
    const [ontologyURI] = Prefix.findMatch(this.id);
    if (ontologyURI) {
      return { id: ontologyURI };
    }
    return null;
  }
}

@linkedShape
export class Property extends Resource {
  static targetClass = rdf.Property;

  @literalProperty({
    path: rdfs.comment,
    maxCount: 1,
  })
  get comment(): string {
    return '';
  }

  get domain(): Class {
    return null;
  }

  @objectProperty({
    path: rdfs.isDefinedBy,
    maxCount: 1,
  })
  get isDefinedBy(): NodeReferenceValue {
    return null;
  }

  get range(): Class {
    return null;
  }
}

createPropertyShape(
  {
    path: rdf.type,
    shape: Class,
    maxCount: 1,
  },
  'type',
  shacl.IRI,
  Resource
);

createPropertyShape(
  {
    path: rdfs.domain,
    shape: Class,
    maxCount: 1,
  },
  'domain',
  shacl.IRI,
  Property
);

createPropertyShape(
  {
    path: rdfs.range,
    shape: Class,
    maxCount: 1,
  },
  'range',
  shacl.IRI,
  Property
);
