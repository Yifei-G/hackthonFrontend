<template src="./TerminalScreen.html"></template>
<style scoped>
@import "./TerminalScreen.css";
</style>
<script lang="ts" setup>
import { ref, onMounted, type Ref } from "vue";
import axios from "axios";
import { MessageModel } from "@models";
import { hasValue } from "@utils";
const canvas: Ref<HTMLCanvasElement | undefined> = ref();
const terminalContainer = ref();
let canvasObject: HTMLCanvasElement | undefined;
let ctx: CanvasRenderingContext2D | undefined | null;
const matrix_characters: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const colorSchema: string[] = ["#cefbe4", "#81ec72", "#5cd646", "#54d13c"];
let messages: MessageModel[] = [];
const fontSize = 16; // 14 de la fuente y 2 de margen

let arrayX = new Array();
let arrayY = new Array();
let velocity = new Array();
let delay = new Array();
let listOfPositions: any = [];

onMounted(() => {
  canvasObject = canvas.value;
  setUpConnectionWithServer();
  setUpCanvas();
  animateMessagesLikeMatrix();
});

//Task1: Make the connection persistent with Websocket...
function setUpConnectionWithServer() {

  let socket = new WebSocket ("ws://172.17.254.23:8085/api/topic/message");

  socket.onopen = () => {
    console.log("[open] Connection established");
    console.log("Sending to server");
    socket.send("Opening websocket for hackthon");
  }

  socket.onmessage = function(event) {
    console.log(`[message] Data received from server: ${event.data}`);
  };

  socket.onclose = function(event) {
    if (event.wasClean) {
      console.log(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
    } else {
      // e.g. server process killed or network down
      // event.code is usually 1006 in this case
      console.log('[close] Connection died');
    }
  };

  socket.onerror = function(error) {
    console.log(error);
  };
}

function handleMessage(message: MessageModel) {
  const messageAlreadyExists = messages.find((m) => m.id === message.id);
  if (hasValue(messageAlreadyExists)) {
    return;
  }
  messages.push(message);

  arrayX[messages.length - 1] = Math.floor(Math.random() * 1265);
  arrayY[messages.length - 1] = -Math.floor(Math.random() * canvasObject!.height) - 100;
  delay[messages.length - 1] = -(10 * Math.floor(Math.random() * 7) + 3);
  velocity[messages.length - 1] = Math.floor(Math.random() * 7) + 3;
  setCurrentPositionForId(getNextPositionAvailable(), message.id);
}

function setUpCanvas() {
  if (typeof canvasObject === "undefined" || canvasObject === null) {
    return;
  }
  ctx = canvasObject.getContext("2d");

  canvasObject.width = canvasObject.parentElement!.offsetWidth;
  canvasObject.height = canvasObject.parentElement!.offsetHeight;

  listOfPositions = [...Array(Math.trunc(canvasObject.width / fontSize))].map(
    (x) => -1
  );
  console.log(listOfPositions);
}

function animateMessagesLikeMatrix() {
  if (typeof ctx === "undefined" || ctx === null) {
    return;
  }
  ctx!.clearRect(0, 0, canvasObject!.width, canvasObject!.height);

  for (var j = 0; j < messages.length; j++) {
    ctx!.font = "14px arial";
    ctx!.textBaseline = "top";
    ctx!.textAlign = "center";

    if (arrayY[j] > (canvasObject!.height * 2)) {
      // si sale fuera del cuadro
      arrayX[j] = Math.floor(Math.random() * canvasObject!.width);
      arrayY[j] = -Math.floor(Math.random() * canvasObject!.height) - 100;
      velocity[j] = Math.floor(Math.random() * 7) + 3;
      delay[messages.length - 1] = -(10 * Math.floor(Math.random() * 7) + 3);
      drawItem(arrayX[j], arrayY[j], messages[j]);
      arrayY[j] += delay[j];
      // clearCurrentPosition(getCurrentPosition(messages[j].id));
      // setCurrentPositionForId(getNextPositionAvailable(), messages[j].id);
    } else {
      // si sigue dentro del cuadro
      drawItem(arrayX[j], arrayY[j], messages[j]);
    }

    arrayY[j] += velocity[j];
  }

  requestAnimationFrame(() => {
    setTimeout(() => {
      animateMessagesLikeMatrix();
    }, 10);
  });
}

function getNextPositionAvailable(): number {
  const randomIndex = Math.floor(Math.random() * listOfPositions.length);
  const randomValueOfIndex = listOfPositions[randomIndex];
  if (randomValueOfIndex !== -1) {
    return getNextPositionAvailable();
  } else {
    return randomIndex;
  }
}

function getCurrentPosition(id: number): number {
  return listOfPositions.indexOf(id);
}

function clearCurrentPosition(id: number): boolean {
  console.log("limpiamos para:", id);
  const positionOfId = getCurrentPosition(id);
  if (positionOfId !== -1) {
    listOfPositions[positionOfId] = -1;
    return true;
  }
  return false;
}

function setCurrentPositionForId(index: number, id: number): void {
  listOfPositions[index] = id;
}

function drawItem(x: number, y: number, item: MessageModel) {
  if (typeof ctx === "undefined" || ctx === null) {
    return;
  }
  for (var k = 0; k <= item.message.length; k++) {
    var randChar = item.message.charAt(k);
    if (randChar.trim() !== "" && typeof ctx!.fillText !== "undefined") {
      if (k < colorSchema.length - 1) {
        ctx!.fillStyle = colorSchema[k];
      } else {
        ctx!.fillStyle = colorSchema[colorSchema.length - 1];
      }
      ctx!.fillText(randChar, x, y);
    }
    y = y - 14;
  }
}
</script>
