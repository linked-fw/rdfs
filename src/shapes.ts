import { Shape } from '@_linked/core/shapes/Shape';
import { ShapeSet } from '@_linked/core/collections/ShapeSet';
import {
  createPropertyShape,
  literalProperty,
  objectProperty,
} from '@_linked/core/shapes/SHACL';
import { shacl } from '@_linked/core/ontologies/shacl';
import type { NodeReferenceValue } from '@_linked/core/utils/NodeReference';
import { Prefix } from '@_linked/core/utils/Prefix';
import { linkedShape } from './package.js';
import * as rdf from './ontologies/rdf.js';
import * as rdfs from './ontologies/rdfs.js';

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

  @literalProperty({
    path: rdfs.comment,
    maxCount: 1,
  })
  get comment(): string {
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

  /** The classes this class is a subclass of (`rdfs:subClassOf`), any number of them. */
  get subClassOf(): ShapeSet<Class> {
    return new ShapeSet<Class>();
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

  /**
   * The classes the subject of this property is an instance of (`rdfs:domain`). RDFS states no
   * cardinality and describes the property as "*a* domain of the subject property", so any number.
   */
  get domain(): ShapeSet<Class> {
    return new ShapeSet<Class>();
  }

  @objectProperty({
    path: rdfs.isDefinedBy,
    maxCount: 1,
  })
  get isDefinedBy(): NodeReferenceValue {
    return null;
  }

  /** The classes the values of this property are instances of (`rdfs:range`), any number. */
  get range(): ShapeSet<Class> {
    return new ShapeSet<Class>();
  }

  /** The properties this property is a subproperty of (`rdfs:subPropertyOf`), any number. */
  get subPropertyOf(): ShapeSet<Property> {
    return new ShapeSet<Property>();
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
  },
  'domain',
  shacl.IRI,
  Property
);

createPropertyShape(
  {
    path: rdfs.range,
    shape: Class,
  },
  'range',
  shacl.IRI,
  Property
);

// Self-referencing properties are created after their class exists, like `domain` and `range`.
createPropertyShape(
  {
    path: rdfs.subClassOf,
    shape: Class,
  },
  'subClassOf',
  shacl.IRI,
  Class
);

createPropertyShape(
  {
    path: rdfs.subPropertyOf,
    shape: Property,
  },
  'subPropertyOf',
  shacl.IRI,
  Property
);
