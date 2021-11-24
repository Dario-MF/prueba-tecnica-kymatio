<template>
  <div class="chatbot" v-if="isActive">
    <div class="chatbot__header">
      <img src="/assets/bot.png" alt="" />
      <p>
        <strong>ChatBot Support</strong>
        <br />
        <span>Online</span>
      </p>
      <button 
        class="chatbot__close"
        @click="openCloseBotchat"
      >
        <i class="bi bi-x-lg"></i>
    </button>
    </div>
    <div class="chatbot__message-window">
      <ul class="chatbot__messages">
        <template v-for="msg in messages" :key="msg.id">
          <!--  bot msg -->
          <li v-if="msg.type === 'bot'" class="bot-msg animation">
            <!-- dots delay  -->
            <span v-if="msg.isLoading" class="loader">
              <span class="loader__dot"></span>
              <span class="loader__dot"></span>
              <span class="loader__dot"></span>
            </span>

            <template v-else>
              <div class="bot__profile-picture">
                <img class="icon-avatar" src="/assets/bot.png" alt="" />
              </div>
              <span class="chatbot__arrow chatbot__arrow--left"></span>
              <p class="chatbot__message">
                {{ msg.text }}
              </p>
              <!-- options questions -->
              <div v-if="msg.questions" class="chatbot__question__container">
                <button
                  v-for="question in questionsData"
                  :key="question.id"
                  @click="onSelectQuestion(question.id)"
                  class="chatbot__question__title"
                >
                  {{ question.title }}
                </button>
              </div>
              <!-- options answers -->
              <div v-if="msg.answers" class="chatbot__question__container">
                <button
                  v-for="answer in questionSelected[0].answers"
                  :key="answer.value"
                  @click="onSelectAnswer(answer.value)"
                  class="chatbot__question__title"
                >
                  {{ answer.title }}
                </button>
              </div>
            </template>
          </li>
          <!-- user-msg-->
          <li v-else-if="msg.type === 'user'" class="user-msg animation">
            <p class="chatbot__message">
              {{ msg.text }}
            </p>
            <span class="chatbot__arrow chatbot__arrow--right"></span>
          </li>
        </template>
      </ul>
    </div>
    <div class="chatbot__entry chatbot--closed">
      <input
        v-model="userMsg"
        type="text"
        class="chatbot__input"
        placeholder="Mandar mensaje..."
      />
      <img
        class="chatbot__icon-submit"
        src="/assets/send.png"
        alt="send"
        @click="onSendMsg"
      />
    </div>
  </div>
  
  <button 
    class="chatbot__open-close"
    @click="openCloseBotchat"
  >
        <img v-if="!isActive" src="/assets/bot.png" alt="botchat">
        <img v-else src="/assets/close.png" alt="botchat">
  </button>
</template>

<script>
import { ref } from 'vue';
import useChatbot from '../composables/useChatbot'

export default {
  setup() {
      const {
        questionsData,
        questionSelected,
        onSelectQuestion,
        onSelectAnswer,
        userMsg,
        onSendMsg,
        messages,
      } = useChatbot()
      const isActive = ref(false)
      const openCloseBotchat = () => (isActive.value = !isActive.value)

    return {
        isActive,
        openCloseBotchat,
        questionsData,
        questionSelected,
        onSelectQuestion,
        onSelectAnswer,
        userMsg,
        onSendMsg,
        messages,
    };
  },
};
</script>

<style lang="scss" scoped>
.chatbot__open-close {
    position: fixed;
    bottom: 3%;
    right: 3%;
    border: none;
    background-color: transparent;
    
    img {
        width: 80px;
        transition: all .3s ease-in-out;
        &:hover {
            transform: scale(1.3);
        }
    }
}
.chatbot {
    z-index: $z-fixed;
    position: fixed;
    top: 0;
    bottom: 0;
    width: 100%;
    box-shadow: 0 -6px 99px -17px rgba(0, 0, 0, 0.68);
    @include mq(l) {
        max-width: 420px;
        height: 500px;
        right: 60px;
        top: 0;
    }
}

.chatbot__header {
    color: $color-text-ligth;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: $color-accent;
    height: 54px;
    padding: 0 20px;
    width: 100%;
    cursor: pointer;
    transition: all 0.2s ease;
    img {
        height: 80%;
        margin-right: 1rem;
    }
    p {
        flex: 1;
    }
    .chatbot__close {
        border: none;
        background-color: transparent;
        font-size: 1.5rem;
        color: $color-text-ligth;
        cursor: pointer;
    }
}

.chatbot__message-window {
    height: calc(100% - 134px);
    padding: (20px * 2) 20px 20px;
    background-color: white;
    overflow-x: none;
    overflow-y: auto;

    @include mq(l) {
        height: 380px;
    }

    &::-webkit-scrollbar {
        display: none;
    }
}

.chatbot__messages {
    padding: 0;
    margin: 0;
    list-style: none;
    display: flex;
    flex-direction: column;
    width: auto;

    li {
        margin-bottom: 20px;

        &.bot-msg {
        display: inline-flex;
        flex-wrap: wrap;
        align-items: flex-start;
        & .chatbot__question__container {
            width: 100%;
            flex-shrink: 0;
            margin-top: 0.5rem;
            display: flex;
            flex-direction: column;
            align-items: center;

            & .chatbot__question__title {
                @include btn;
                border: 2px solid $color-third;
                margin-bottom: 0.5rem;
                width: 80%;
                text-align: initial;
            &:hover {
                box-shadow: none;
                margin-bottom: 0.5rem;
                border-color: $color-fourth;
            }
            }
        }
        }
        &.user-msg {
            text-align: right;
            display: inline-flex;
            align-self: flex-end;
        }
        .bot__profile-picture {
            .icon-avatar {
                height: 40px;
                padding-top: 6px;
            }
        }
    }
}

.chatbot__message {
    display: block;
    padding: 12px 20px;
    word-break: break-word;
    margin: 0;
    border-radius: 6px;
    letter-spacing: -0.01em;
    line-height: 1.45;
    overflow: hidden;
    width: 80%;
    .bot-msg & {
        background-color: $color-third;
    }
    .user-msg & {
        background-color: $color-success;
        margin-left: 20px * 1.5;
    }
    a {
        color: rgb(0, 92, 128);
        word-break: break-all;
        display: inline-block;
    }
    p:first-child {
        margin-top: 0;
    }
    p:last-child {
        margin-bottom: 0;
    }
}

.animation {
    &:last-child {
        animation: fadein 0.25s;
        animation-timing-function: all 200ms cubic-bezier(0.55, 0.055, 0.675, 0.19);
    }
}

.chatbot__arrow {
    width: 0;
    height: 0;
    margin-top: 18px;
}

.chatbot__arrow--right {
    border-top: 6px solid transparent;
    border-bottom: 6px solid transparent;
    border-left: 6px solid $color-third;
}

.chatbot__arrow--left {
    border-top: 6px solid transparent;
    border-bottom: 6px solid transparent;
    border-right: 6px solid $color-third;
}

.chatbot__entry {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    height: 80px;
    padding: 10px 20px;
    border-top: 1px solid $color-text-ligth-medium;
    background-color: $color-first;
}

.chatbot__input {
    height: 100%;
    width: 80%;
    border: 0;
    padding-left: 1rem;
    margin-right: 1rem;
    &:focus {
        outline: none;
    }
}

.chatbot__icon-submit {
    height: 35px;
    width: 35px;
    transition: all 0.2s ease-in-out;
    cursor: pointer;
    &:hover {
        transform: scale(1.3);
    }
}

.loader {
    margin-bottom: -2px;
    text-align: center;
    opacity: 0.3;
}

.loader__dot {
    display: inline-block;
    vertical-align: middle;
    width: 6px;
    height: 6px;
    margin: 0 1px;
    background: black;
    border-radius: 50px;
    animation: loader 0.45s infinite alternate;
    &:nth-of-type(2) {
        animation-delay: 0.15s;
    }
    &:nth-of-type(3) {
        animation-delay: 0.35s;
    }
}

@keyframes loader {
    0% {
        transform: translateY(0);
    }
    100% {
        transform: translateY(-5px);
    }
}

@keyframes fadein {
    from {
        opacity: 0;
        margin-top: 10px;
        margin-bottom: 0;
    }
    to {
        opacity: 1;
        margin-top: 0;
        margin-bottom: 10px;
    }
}
</style>