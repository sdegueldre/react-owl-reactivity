# React Owl reactivity

This is a simple demo of using [Owl's](https://github.com/odoo/owl) reactivity system with React to benefit from dead simple, no fuss reactivity that is optimized for rendering, ie: renders only the components that need to update their DOM and not their entire subtree. Create a reactive object anywhere, get automatic subscriptions in a component with `useReactive`. Mutate the state and let the reactivity sytem tell React what to render. For best results, your components should be memoized.

See it live at https://sdegueldre.github.io/react-owl-reactivity/