<template src="./TerminalScreen.html"></template>
<style scoped>
@import './TerminalScreen.css';
</style>
<script lang="ts" setup>
import { ref, onMounted, type Ref } from 'vue';
import axios from 'axios';
import { MessageModel } from '@models';
import { hasValue } from '@utils';
const canvas: Ref<HTMLCanvasElement | undefined> = ref();
const terminalContainer = ref();
let canvasObject: HTMLCanvasElement | undefined;
let ctx: CanvasRenderingContext2D | undefined | null;
const matrix_characters: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
const colorSchema: string[] = ['#cefbe4', '#81ec72', '#5cd646', '#54d13c', '#4ccc32', '#43c728'];
let messages: MessageModel[] = [
  // { content: 'Sergio es un capullo', charPosition: [] },
  // { content: 'Alex el mejor', charPosition: [] },
  // { content: 'Ivan perdedor', charPosition: [] },
  // { content: 'Promociones ya!', charPosition: [] },
  // { content: 'jajjajajajaja kaka', charPosition: [] },
  // { content: 'pelele :P', charPosition: [] },
  // { content: 'Sergio es un capullo', charPosition: [] },
  // { content: 'Alex el mejor', charPosition: [] },
  // { content: 'Ivan perdedor', charPosition: [] },
  // { content: 'Promociones ya!', charPosition: [] },
  // { content: 'jajjajajajaja kaka', charPosition: [] },
  // { content: 'pelele :P', charPosition: [] },
  // { content: 'Sergio es un capullo', charPosition: [] },
  // { content: 'Alex el mejor', charPosition: [] },
  // { content: 'Ivan perdedor', charPosition: [] },
  // { content: 'Promociones ya!', charPosition: [] },
  // { content: 'jajjajajajaja kaka', charPosition: [] },
  // { content: 'pelele :P', charPosition: [] },
  // { content: 'Sergio es un capullo', charPosition: [] },
  // { content: 'Alex el mejor', charPosition: [] },
  // { content: 'Ivan perdedor', charPosition: [] },
  // { content: 'Promociones ya!', charPosition: [] },
  // { content: 'jajjajajajaja kaka', charPosition: [] },
  // { content: 'pelele :P', charPosition: [] },
  // { content: 'Sergio es un capullo', charPosition: [] },
  // { content: 'Alex el mejor', charPosition: [] },
  // { content: 'Ivan perdedor', charPosition: [] },
  // { content: 'Promociones ya!', charPosition: [] },
  // { content: 'jajjajajajaja kaka', charPosition: [] },
  // { content: 'pelele :P', charPosition: [] },
  // { content: 'Sergio es un capullo', charPosition: [] },
  // { content: 'Alex el mejor', charPosition: [] },
  // { content: 'Ivan perdedor', charPosition: [] },
  // { content: 'Promociones ya!', charPosition: [] },
  // { content: 'jajjajajajaja kaka', charPosition: [] },
  // { content: 'pelele :P', charPosition: [] },
  // { content: 'Sergio es un capullo', charPosition: [] },
  // { content: 'Alex el mejor', charPosition: [] },
  // { content: 'Ivan perdedor', charPosition: [] },
  // { content: 'Promociones ya!', charPosition: [] },
  // { content: 'jajjajajajaja kaka', charPosition: [] },
  // { content: 'pelele :P', charPosition: [] },
  // { content: 'Sergio es un capullo', charPosition: [] },
  // { content: 'Alex el mejor', charPosition: [] },
  // { content: 'Ivan perdedor', charPosition: [] },
  // { content: 'Promociones ya!', charPosition: [] },
  // { content: 'jajjajajajaja kaka', charPosition: [] },
  // { content: 'pelele :P', charPosition: [] },
  // { content: 'Sergio es un capullo', charPosition: [] },
  // { content: 'Alex el mejor', charPosition: [] },
  // { content: 'Ivan perdedor', charPosition: [] },
  // { content: 'Promociones ya!', charPosition: [] },
  // { content: 'jajjajajajaja kaka', charPosition: [] },
  // { content: 'pelele :P', charPosition: [] },
  // { content: 'Sergio es un capullo', charPosition: [] },
  // { content: 'Alex el mejor', charPosition: [] },
  // { content: 'Ivan perdedor', charPosition: [] },
  // { content: 'Promociones ya!', charPosition: [] },
  // { content: 'jajjajajajaja kaka', charPosition: [] },
  // { content: 'pelele :P', charPosition: [] }
]

let arrayX = new Array();
let arrayY = new Array();
let dY = new Array();

for (var i = 0; i < messages.length; i++) {
  arrayX[i] = Math.floor(Math.random() * 1265);
  arrayY[i] = -100;
  dY[i] = Math.floor(Math.random() * 7) + 3;
}

onMounted(() => {
  canvasObject = canvas.value
  setUpConnectionWithServer();
  setUpCanvas();
  animateMessagesLikeMatrix();
})

function setUpConnectionWithServer() {
  const username = 'admin'
  const password = 'admin'

  const token = btoa(`${username}:${password}`)

  axios
    .get('http://localhost:8085/api/message/all', {
      headers: {
        Authorization: `Basic ${token}`
      }
    })
    .then((response ) => {
      const messages: MessageModel[] = response.data;
      console.log(messages);
      messages.forEach((message: MessageModel) => {
         handleMessage(message);
      })
    })
    .catch((error) => {
      console.error('Error fetching messages:', error)
    })
}

function handleMessage(message: MessageModel) {
  const messageAlreadyExists = messages.find(m => m.id === message.id);
  if(hasValue(messageAlreadyExists)) {
    return;
  }
  messages.push(message);

  arrayX[messages.length - 1] = Math.floor(Math.random() * 1265);
  arrayY[messages.length - 1] = -100;
  dY[messages.length - 1] = Math.floor(Math.random() * 7) + 3;
}

function setUpCanvas() {
  if (typeof canvasObject === 'undefined' || canvasObject === null) {
    return
  }
  ctx = canvasObject.getContext('2d')

  canvasObject.width = canvasObject.parentElement!.offsetWidth
  canvasObject.height = canvasObject.parentElement!.offsetHeight
}

function animateMessagesLikeMatrix() {
  if (typeof ctx === 'undefined' || ctx === null) {
    return;
  }
  ctx!.clearRect(0, 0, canvasObject!.width, canvasObject!.height)
  // ctx!.shadowBlur = 8
  // ctx!.shadowOffsetX = ctx!.shadowOffsetY = 0
  // ctx!.shadowColor = '#94f475'

  for (var j = 0; j < messages.length; j++) {
    ctx!.font = '14px arial'
    ctx!.textBaseline = 'top'
    ctx!.textAlign = 'center'

    if (arrayY[j] > 1358) {
      arrayX[j] = Math.floor(Math.random() * canvasObject!.width)
      arrayY[j] = -100
      dY[j] = Math.floor(Math.random() * 7) + 3
      drawItem(arrayX[j], arrayY[j], messages[j].message)
    } else drawItem(arrayX[j], arrayY[j], messages[j].message.toUpperCase())

    arrayY[j] += dY[j]
  }

  requestAnimationFrame(() => {
    setTimeout(() => {
      animateMessagesLikeMatrix()
    }, 10)
  })
}

function drawItem(x: number, y: number, item: string) {
  if (typeof ctx === 'undefined' || ctx === null) {
    return
  }
  for (var k = 0; k <= item.length; k++) {
    var randChar = item.charAt(k)
    if(randChar.trim() !== '' && typeof ctx!.fillText !== 'undefined') {
      ctx!.fillStyle = colorSchema[5]
      switch (k) {
        case 0:
          ctx!.fillStyle = colorSchema[0]
          break
        case 1:
          ctx!.fillStyle = colorSchema[1]
          break
        case 3:
          ctx!.fillStyle = colorSchema[2]
          break
        case 7:
          ctx!.fillStyle = colorSchema[3]
          break
        case 13:
          ctx!.fillStyle = colorSchema[4]
          break
        case 17:
          ctx!.fillStyle = colorSchema[5]
          break
      }
      ctx!.fillText(randChar, x, y)
    }
    y = y - 14
  }
}
</script>
