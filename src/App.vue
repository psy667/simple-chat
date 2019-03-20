<template>
    <div id="app">
        <div class="messages" id='messages'>
            <p style="color:white; margin: 0;">
                {{ user === "" ? "Enter username :" : "" }}
            </p>
            <div v-for='message in messages'>
                <p class="message">
                    <span :style="{color: message.color}" class="message__user">[{{ message.user }}]:</span> {{ message.text }}
                </p>
            </div>
        </div>
        <div class="message__input">
            <input v-model='message' @keypress.enter='sendMessage'>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        name: 'app',
        data() {
            return {
                user: "",
                message: "",
                messages: [],
                lastTime: 0
            }
        },
        methods: {
            sendMessage() {
                this.login(this.message);

                if (this.message === "") return false;
                if (this.user === "") return false;

                const user = this.user;
                const message = this.message;
                this.message = '';
                axios.post('/addNew', {user, message})
                    .then(() => {
                        this.getAll();
                    })
                    .catch(e => {
                        console.log(e)
                    })
            },
            getAll() {
                if (this.user === "") return false;

                axios.get('/getNew', {params: {lastTime: this.lastTime}})
                    .then((response) => {
                        const data = response.data;

                        if (data.length) {
                            this.messages.push(...data);
                            this.lastTime = data[data.length - 1].time;
                        }
                    })
                    .catch(e => {
                        console.log(e)
                    })
            },
            login(str) {
                if (this.user === "") {
                    this.user = str;
                    this.message = "";
                    return true;
                }
                return false;
            }
        },
        mounted() {
            document.querySelector(".message__input input").focus();
            document.onclick = () => document.querySelector(".message__input input").focus();
            window.scrollTop=document.body.scrollHeight;
            setInterval(this.getAll, 200);
        },
        components: {}
    }
</script>


<style lang="scss">
    body {
        margin: 0;
        height: 100vh;
        width: 100vw;
        background-color: #000;
        font-family: "Courier New";
        overflow-x: hidden;

        &::-webkit-scrollbar {
            width: 0;
        }

        -ms-overflow-style: none;
        overflow: -moz-scrollbars-none;
    }

    .message {
        color: white;
        width: 100%;
        word-wrap: break-word;
        margin: 0;
    }

    .message__user {
        color: red;
    }

    .message__input {
        width: 90%;
        position: relative;

        input {
            background: transparent;
            outline: none;
            border: none;
            color: white;
            width: 100%;
            padding-left: 20px;
            font-family: "Courier New";
        }
    }

    .message__input::before {
        content: '>';
        font-family: "Courier New";
        color: white;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 3px;
    }
</style>
