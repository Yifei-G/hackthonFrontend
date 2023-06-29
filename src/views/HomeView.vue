<script lang="ts">
import TerminalScreen from '../components/terminal/TerminalScreen.vue';

export default {
  name: 'App',
  components: {
    TerminalScreen
  }
}
</script>

<template>
  <div id="app">
    <TerminalScreen/>
  </div>

</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
