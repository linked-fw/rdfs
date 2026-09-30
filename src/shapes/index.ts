/**
 * Registers every shape this package defines, and nothing else.
 *
 * A shape registers when its module is evaluated, so this module exists to be
 * imported for that side effect alone: `import '@_linked/rdfs/shapes/index';`
 * It has no exports and pulls in no components, so it loads in plain node
 * (no CSS, no React tree) as well as in a bundle. The package entry imports it
 * instead of listing shapes itself.
 *
 * The shapes still live in `src/shapes.ts`, which consumers import as
 * `@_linked/rdfs/shapes`; moving them into this folder would break that path.
 */
import '../ontologies/rdf.register.js';
import '../ontologies/rdfs.register.js';
import '../shapes.js';
