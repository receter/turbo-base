# Containers

Containers are the connection between the Redux store and React components. They are responsible for passing the correct props to the components.

A container is like a page. It is not aware of other containers. It is only aware of the Redux store and the components it renders.

Containers can depend on features.

When a container is mounted, all features that it needs and that are not already registered by another container are registered. When a container is unmounted, all features that are not registered by any container anymore are automatically unloaded.

Features have a unique string identifier that is identical to the name of the feature folder.

## Dynamic reducer injection

https://github.com/markerikson/redux-ecosystem-links/blob/master/reducers.md#dynamic-reducer-injection
https://github.com/asteridux/paradux

## Lazy loading containers

Containers could be lazy loaded using React.lazy and Suspense.

```js
import React, { lazy, Suspense } from "react";

const LazyComponent = lazy(() => import("./LazyComponent"));

const MyComponent = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <LazyComponent />
  </Suspense>
);
```
