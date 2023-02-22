<template>
  <main class="main">
    <Ansi>{{ '\u001b[34mhello world' }}</Ansi>
    <br>
    <Ansi>{{ `hello ${GREEN_FG}world` }}</Ansi>
    <br>
    <Ansi>{{ 'this sentence\rthat\nwill make you pause' }}</Ansi>
    <br>
    <Ansi>{{ '01hello\b goodbye' }}</Ansi>
    <br>
    <Ansi>{{ '02hello\b\b goodbye' }}</Ansi>
    <br>
    <Ansi>{{ '03hello\b\b\b goodbye' }}</Ansi>
    <br>
    <Ansi linkify>{{ '  ➜  can not link:   https://localhost:5173/' }}</Ansi>
    <br>
    <Ansi linkify>{{ '  ➜  this is a link: https://nteract.io:5173/' }}</Ansi>
    <br>
    <Ansi linkify>{{ '  ➜  this is a link: www.google.com' }}</Ansi>
    <br>
    <Ansi linkify>{{ "can't click this link: 'http://www.google.com'" }}</Ansi>
    <br>
    <Ansi linkify>{{ '<transport.model.TransportInfo' }}</Ansi>
    <br>
    <Ansi linkify>{{ "<module 'something' from '/usr/local/lib/python2.7/dist-packages/something/__init__.pyc'>" }}</Ansi>
    <br>
    <Ansi linkify>{{ 'this is a link: www.google.com and this is a second link: www.microsoft.com' }}</Ansi>
    <br>
    <Ansi linkify>{{ 'this is a link: www.google.com and this is text after' }}</Ansi>
    <br>
    <Ansi use-classes>{{ `hello ${GREEN_FG}world` }}</Ansi>
    <br>
    <Ansi linkify use-classes>{{ `${GREEN_FG}this is a link: https://nteract.io/` }}</Ansi>
    <br>
    <Ansi>{{ `hello ${GREEN_FG}${BOLD}world${RESET}!` }}</Ansi>
    <br>
  </main>
</template>

<script setup lang="ts">
import Ansi from 'ansi-to-vue3';

const GREEN_FG = '\u001b[32m';
// const YELLOW_BG = '\u001b[43m';
const BOLD = '\u001b[1m';
const RESET = '\u001b[0;m';
</script>

<style>
span {
  white-space: pre;
}

.main {
  color: rgba(55, 65, 81, 1);
  position: relative;
}

.component {
  position: absolute;
  left: 0;
  right: 0;
  top: 25px;
}
</style>
