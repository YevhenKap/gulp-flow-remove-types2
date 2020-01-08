# gulp-flow-remove-types2

Gulp plugin for [flow-remove-types](https://github.com/flowtype/flow-remove-types).

This plugin is just a fork of [gulp-flow-remove-types](https://github.com/Wain-PC/gulp-flow-remove-types) plugin - the last one is outdated and doesn't work for me. Also this plugin is improved according to [official requirements](https://github.com/gulpjs/gulp/blob/master/docs/writing-a-plugin/guidelines.md).

## Installation

Install the package:

- npm `npm i gulp-flow-remove-types2 --save-dev`
- yarn `yarn add gulp-flow-remove-types2 --dev`

## Usage

```javascript
const { src, dest } = require('gulp')
const flowRemoveTypes = require('gulp-flow-remove-types2')


src('file.js')
  .pipe(flowRemoveTypes())
  .pipe(dest('dist'))
```

## Options

### `pretty`

Type: `boolean` Default: `false`

By default, [flow-remove-types](https://github.com/flowtype/flow-remove-types) replaces Flow type definitions with whitespaces.

Pass `{pretty: true}` if you want more condensed output (no whitespaces).

##### Example

```javascript
src('file.js')
  .pipe(flowRemoveTypes({
      pretty: true
  }))
  .pipe(dest('dist'))
```

### `sourceMap`

Type: `boolean` Default: `false`

If set to `true` gulp will additionally output `your_file_name.js.map` file to the stream.

##### Example

```javascript
src('file.js')
  .pipe(flowRemoveTypes({
      sourceMap: true
  }))
  .pipe(dest('dist')); //This will output both file.js and file.js.map
```