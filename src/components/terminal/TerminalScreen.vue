<template src="./TerminalScreen.html"></template>
<style scoped> @import './TerminalScreen.css'; </style>
<script>
import axios from 'axios';
export default {
  name: "TerminalScreen",
  data() {
    return {
      lastAnimatedMessageIndex: 0,
      terminalContainer: null,
      socket: null,
      displayMessages: [],
      matrix_characters: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
      messages: [
        {content: "MATRIX", charPosition: []},
      ],
    };
  },
  mounted() {
    this.terminalContainer = this.$refs.terminalContainer;
    this.setUpConnectionWithServer();
    this.setUpCanvas();
    this.animateMessagesLikeMatrix();
  },

  async created() {

  },

  methods: {

    /**
     * TODO: Set up here a persistent connection with a server to receive messages
     * currently the connection is a GET call, the browser needs to be refreshed everytime to get the information
     * the goal is to have a real time user experience
     */
    setUpConnectionWithServer() {
      const username = 'admin';
      const password = 'admin';

      const token = btoa(`${username}:${password}`);

      axios.get('http://localhost:8085/api/message/all', {
        headers: {
          'Authorization': `Basic ${token}`
        }
      })
          .then((response) => {
            const messages = response.data;
            console.log(messages);
            messages.forEach(message => {
              this.handleMessage(message.message);
            });
          })
          .catch((error) => {
            console.error('Error fetching messages:', error);
          });
    },



    /**
     * Use this method to add messages to the canvas as soon they are available
     * @param data
     */
    handleMessage(data) {
      this.messages.push(
          {
            content: data,
            charPosition: [],
          });
    },

    setUpCanvas() {
      this.canvas = this.$refs.canvas;
      this.ctx = this.canvas.getContext('2d');

      this.canvas.width = this.canvas.parentElement.offsetWidth;
      this.canvas.height = this.canvas.parentElement.offsetHeight;

      this.ctx.font = '14px Arial';
      this.ctx.fillStyle = '#50fa7b';
    },

    /**
     * TODO:
     * This is the method with the problem, developers has tried to draw a message here that
     * can be animated in the canvas in the same fashion as matrix.
     */
    animateMessagesLikeMatrix() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      const initialPositionInCanvas = 70;
      const movement = 1;
      this.messages.forEach((msg, msgIndex) => {
        let position = msgIndex + 1;
        //calculate a new position on the canvas for the message
        let messagePositionX = initialPositionInCanvas
        let messagePositionY = initialPositionInCanvas * position * movement;

        this.ctx.fillText(msg.content, messagePositionX, messagePositionY);

        // Create matrix glitch effect by occasionally replace the character with a random matrix character
        if (Math.random() < 0.1) {
          const matrixChar = this.matrix_characters.charAt(Math.floor(Math.random() * this.matrix_characters.length));
          this.ctx.fillText(matrixChar, messagePositionX, messagePositionY);
        }

      });

      requestAnimationFrame(() => {
        setTimeout(() => {
          this.animateMessagesLikeMatrix();
        }, 50);
      });

    },

  },
};
</script>