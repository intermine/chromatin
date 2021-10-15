# chromatin

Intermine's component library in React.

## Install

To install this library you can do using npm or yarn:

```bash
npm i @intermine/chromatin
# or
yarn add @intermine/chromatin
```

## Project Setup

### Clone the repo

```bash
git clone https://github.com/intermine/chromatin.git
```

### Install dependencies

First you have to navigate to the project folder.

```bash
cd chromatin
```

Then install dependencies.

```bash
npm i
```

Typescript:

```bash
npm install -g typescript
# or
npm install -g typescript@next
```

> Note: `react` and `react-dom` are peer dependencies. So to build this project locally or to run storybook you need to install these two dependencies manually. You can do so by following below steps.

```bash
npm i react react-dom @types/react @types/react-dom --no-save
```

### Build

```bash
npm run build
```

### Prod

```bash
npm run prod
```

### Test

```bash
npm run test
```

### Storybook

#### Run

```bash
npm run storybook
```

#### Build

```bash
npm run build-storybook
```
