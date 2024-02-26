# Features

Features are the main building blocks of the application. They represent features that are used in the application.

What is the difference between a feature and a container? A container is like a page and a feature might be used in several containers. A container is never used by a feature.

Features can depend on other features.

Components and containers group interface elements and features group functionality.

## Components in features

Features can provide components and these components can make use of the types provided by the feature. But the components are not allowed to access the state of the feature directly. They can only access the state through the props or the context. Components can depend on other components if they are part of the same feature.

## Adding a new feature
