<template>
  <div class="contiainer">
    <div>
      <button class="connect" @click="connect">Connect</button>
      <button class="disconnect" @click="disconnect">Disconnect</button>
    </div>
    <form action="/"  @submit.prevent="sendMsg">
      <h5>Enter your message:</h5>
      <input v-model="message">
      <button class="formButton">Send</button>
    </form>
       <p class="one-message">Echo start</p>
      <!--eslint-disable-next-line-->
      <p class="one-message list" v-for="mes in chat">{{ mes }}</p>
    
  </div>
</template>

<script>
export default {
  name: 'echo',
  data () {
    return {
      isConnected: false,
      message:'',
      chat: [],
      socket: ""
    }
  },
  methods: {
    sendMsg() {
      this.socket.send(this.message);
      this.chat.push("send: " + this.message);
      this.message = "";
      return false;
    },
    connect() {
      this.socket = new WebSocket('wss://echo.websocket.org/');
      // this.socket.onerror = function(error) {
      //     console.log('WebSocket Error: ' + error);
      // };
      this.socket.addEventListener('open', () => {
          this.chat.push("Connected!");
      });
      this.socket.addEventListener('message', (event) => {
          this.chat.push("returned: " + event.data);
      });
      this.socket.addEventListener('close', () => {
          this.chat.push("Disconnected!");
      });
    },
    disconnect() {
      this.socket.close();
    },
    pingServer() {
      // Send the "pingServer" event to the server.
      this.$socket.emit('pingServer', 'PING!')
    }
  },
  sockets: {
    connect() {
      // Fired when the socket connects.
      this.isConnected = true;
    },

    disconnect() {
      this.isConnected = false;
    },
    messageChannel(data) {
      this.message = data
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

input {
  padding: 10px;
  display: inline;
}
.connect {
  background: #42b983;
  color: white;
}
.disconnect {
  background: #db3139;
  color: white;
}
button {
  display: inline-block;
  text-align: center;
  margin: 0 auto;
  border-radius: 5px;
  padding: 15px 25px;
}
.formButton {
  display: inline-block;
  margin: 10px auto;
  padding: 12px;
  background: #cecece;
  color: rgb(46, 46, 46);
}
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
