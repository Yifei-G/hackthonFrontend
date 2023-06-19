<template>
  <div id="app">
    <TerminalScreen/>
  </div>

</template>

<script>
import TerminalScreen from './components/terminal/TerminalScreen.vue'

export default {
  name: 'App',
  components: {
    TerminalScreen
  }
}
</script>

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
