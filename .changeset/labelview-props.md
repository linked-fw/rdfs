---
"@_linked/rdfs": patch
---

`LabelView` renders again. It read its label from `linkedData[0]`, but only set components
receive `linkedData`. A single linked component gets its query result spread onto props, so every
render threw `Cannot destructure ... of undefined`. It now reads `label`. Removing the `as any`
cast on its query lets that prop be type-checked.
