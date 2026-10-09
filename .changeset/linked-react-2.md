---
'@_linked/rdfs': minor
---

Depend on `@_linked/react@^2.0.0` (was `^1.1.0`) and `@_linked/core@^2.27.0` (was `^2.22.8`, raised to the core peer range `@_linked/react` 2 requires).

An app on `@_linked/react` 2 no longer installs a second copy of `@_linked/react` 1 through this package. The only thing used from it is `createLinkedComponentFn`, which 2.0 did not change.

Minor rather than major: `@_linked/react` is a regular dependency here, not a peer, so no consumer has to change anything to install this release, and dependents on `@_linked/rdfs@^1` pick it up without a range change.
