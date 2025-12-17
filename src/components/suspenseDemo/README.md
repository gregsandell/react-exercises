# React Suspense Demo
Source of code: a ChatGpt query requesting a short sample of Suspense.

## Relationship to Next.js
`<Suspense>` requires a framework where a "promise is thrown".

When using `next.js`, that framework is built-in and using _Suspense_ only requires a few lines of code.

Since _next.js_ is not used here, the extra baggage of the createUserResource, userResourceCache and getUserResource are necessary.
