# ansi-to-vue3

This package convert ANSI escape codes to formatted text output for Vue3. Copy from ansi-to-react.

## Installation

```bash
$ yarn add ansi-to-vue3
```

```bash
$ npm install -S ansi-to-vue3
```

## playground

```bash
git clone https://github.com/jerrywu001/ansi-to-vue3

npm i

npm run dev
```

## Usage

### Basic

The example below shows how we can use this package to render a string with ANSI escape codes.

```html
<template>
  <Ansi>{{ '\u001b[34mhello world' }}</Ansi>
</template>

<script setup lang="ts">
import Ansi from 'ansi-to-vue3';
</script>
```

Will render:

```javascript
<code>
  <span style="color:rgb(0, 0, 187)">hello world</span>
</code>
```

### Classes

Style with classes instead of `style` attribute.

```html
<template>
  <Ansi use-classes>{{ "\u001b[34mhello world" }}</Ansi>
</template>

<script setup lang="ts">
import Ansi from 'ansi-to-vue3';
</script>
```

Will render

```javascript
<code>
  <span class="ansi-blue-fg">hello world</span>
</code>
```

#### Class Names

| Font color             | Background Color |
| ---------------------- | ---------------- |
| ansi-black-fg          | ansi-black-bg    |
| ansi-red-fg            | ansi-red-bg      |
| ansi-green-fg          | ansi-green-bg    |
| ansi-yellow-fg         | ansi-yellow-bg   |
| ansi-blue-fg           | ansi-blue-bg     |
| ansi-magenta-fg        | ansi-magenta-bg  |
| ansi-cyan-fg           | ansi-cyan-bg     |
| ansi-white-fg          | ansi-white-bg    |
| ansi-bright-black-fg   |
| ansi-bright-red-fg     |
| ansi-bright-green-fg   |
| ansi-bright-yellow-fg  |
| ansi-bright-blue-fg    |
| ansi-bright-magenta-fg |
| ansi-bright-cyan-fg    |
| ansi-bright-white-fg   |

## Development

To develop on this project, fork and clone this repository on your local machine. Before making modifications, install the project's dependencies.

```
$ npm install
```

To run the test suite for this project, run:

```
$ npm test
```

## Support

If you experience an issue while using this package or have a feature request, please file an issue on the [issue board](https://github.com/jerrywu001/ansi-to-vue3/issues),

