<template>
    <form class="form" @submit.prevent="handleSubmit">
        <input class="input" type="text" v-model="message">
        <button class="button">Send</button>
    </form>
</template>
<script lang="ts" setup>
import { ref } from 'vue';

const message = ref("message");

const POST_ENDPOINT = "http://localhost:8085/api/message/send";

const handleSubmit = async () => {
    if (!message.value) return;

    const headers = new Headers();

    headers.set("Authorization", `Basic ${btoa("admin:admin")}`);
    headers.set("Content-Type", "application/json");

    try {
      await fetch(POST_ENDPOINT, {
        method: "POST",
        headers,
        body: JSON.stringify({ message: message.value }),
      });
      message.value = "";
    } catch (error) {
      console.log(error);
      message.value = "";
    }
}
</script>

<style>
.form {
    display: flex;
    gap: 1rem;
    padding: 1rem;
}
.input{

  position: relative;
  cursor: text;
  font-size: 14px;
  line-height: 20px;
  padding: 0 16px;
  height: 48px;
  background-color: #fff;
  border: 1px solid #d6d6e7;
  border-radius: 3px;
  color: rgb(35, 38, 59);
  box-shadow: inset 0 1px 4px 0 rgb(119 122 175 / 30%);
  overflow: hidden;
  transition: all 100ms ease-in-out;
}

.input:focus {
  border-color: #3c4fe0;
  box-shadow: 0 1px 0 0 rgb(35 38 59 / 5%);
}

.button {
  display: inline-block;
  outline: none;
  cursor: pointer;
  font-size: 14px;
  line-height: 1;
  border-radius: 500px;
  transition-property: background-color,border-color,color,box-shadow,filter;
  transition-duration: .3s;
  border: 1px solid transparent;
  letter-spacing: 2px;
  min-width: 160px;
  text-transform: uppercase;
  white-space: normal;
  font-weight: 700;
  text-align: center;
  padding: 16px 14px 18px;
  color: #616467;
  box-shadow: inset 0 0 0 2px #616467;
  background-color: transparent;
  height: 48px;
}

.button:hover{
  color: #fff;
  background-color: #616467;
}


</style>