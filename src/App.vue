<template>
  <div id="app">
    <div class="messages" id='messages'>
      <div class="message" v-for='message in messages'>
        [{{ message.user }}]: {{ message.text }}
      </div>
    </div>
    <input v-model='message' @keypress.enter='sendMessage'>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'app',
  data(){
    return {
      user: "user",
      message: "",
      messages: []
    }
  },
  methods: {
    sendMessage(){
      const user = this.user;
      const message = this.message;
      this.message = '';
      axios.post('http://localhost:4000/addNew', {user, message})
        .then(console.log('success'))
        .catch(e => {
          console.log(e)
        })
    },
    getAll(){
      axios.get('http://localhost:4000/getNew', {params: {lastTime: 0}})
        .then((response) => {
          console.log(response);
          this.messages = response.data;
        })
        .catch(e => {
          console.log(e)
        })
    }
  },
  mounted(){
    setInterval(this.getAll, 500);
  },
  components: {
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  margin-top: 60px;
}
.messages{
  height: 300px;
  overflow-y: scroll;
}
</style>
