<script lang="ts">
import TerminalScreen from '../components/terminal/TerminalScreen.vue';
import SendForm from '../components/sendForm/SendForm.vue';

export default {
  name: 'App',
  components: {
    SendForm,
    TerminalScreen
  }
}
</script>

<template>
  <div id="app">
    <div>
      <TerminalScreen/>
    </div>
    <div id="form-container">
      <SendForm />
    </div>


  </div>

</template>

<style>
#app {
  display: block;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
#form-container {
  display: flex;
  justify-content: center;
}
</style>
