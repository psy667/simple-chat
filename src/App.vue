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
      axios.get('http://localhost:3000/addNew', {
        params: {user, message}})
        .then(console.log('success'))
        .catch(e => {
          console.log(e)
        })
    },
    getAll(){
      axios.get('http://localhost:3000/getAll')
        .then((response) => {
          console.log(this);
          this.messages = response.data.messages;
        })
        .catch(e => {
          console.log(e)
        })
    }
  },
  mounted(){
    setInterval(this.getAll, 1000);
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
