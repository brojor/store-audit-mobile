<template>
  <div class="backdrop">
    <div class="logo">
      <img src="@/assets/h-logo-w.png" alt="logo" />
    </div>
    <form @submit.prevent="submit">
      <label for="username">
        <input
          @focus="removeErrorMessage"
          autofocus
          type="text"
          name="username"
          v-model="username"
          placeholder="Uživatelské jméno"
          autocomplete="off"
        />
      </label>
      <label for="password">
        <input
          @focus="removeErrorMessage"
          type="password"
          name="password"
          v-model="password"
          placeholder="Heslo"
        />
      </label>
      <div class="error-message" v-if="errorMessage">
        <p :class="{ shake: animation }">{{ errorMessage }}</p>
      </div>
      <input type="submit" class="btn submit" value="Přihlásit se" />
    </form>
  </div>
</template>

<script>
export default {
  name: 'login',
  data() {
    return {
      username: '',
      password: '',
      errorMessage: '',
      animation: false,
    };
  },
  computed: {
    credentials() {
      return this.username + this.password;
    },
  },
  watch: {
    credentials() {
      this.removeErrorMessage();
    },
  },
  methods: {
    runAnimation() {
      this.animation = true;
      setTimeout(() => {
        this.animation = false;
      }, 750);
    },
    removeErrorMessage() {
      this.errorMessage = '';
    },
    submit() {
      this.$store
        .dispatch('login', {
          username: this.username,
          password: this.password,
        })
        .then(() => {
          this.$router.push({ name: 'Home' });
        })
        .catch((err) => {
          const { message } = err.response.data;
          this.errorMessage = message;
          this.runAnimation();
        });
    },
  },
};
</script>

<style scoped>
.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #001414;
  overflow: hidden;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.error-message {
  padding: 1rem 0;
  color: #e60001;
  font-size: 1.2rem;
}

form {
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.logo {
  width: 80%;
  margin: 2rem 0;
}

img {
  width: 100%;
}

input {
  height: 6rem;
  border: none;
  margin: 1rem 0;
  border-radius: 0.4rem;
  outline-color: rgb(131, 131, 131);
  width: 100%;
  padding: 10px 0;
  padding-left: 5rem;
  color: white;
  font-size: 1.6rem;
  box-shadow: none;
  background-color: #262d2d;
}

.submit {
  background-color: #e60001;
  font-size: 2rem;
  font-family: 'Avenir Next', 'Avenir', sans-serif;
  font-weight: 700;
  padding: 0;
}

label {
  width: 100%;
  position: relative;
}

label:before {
  content: '';
  position: absolute;
  left: 10px;
  top: 0;
  bottom: 0;
  width: 30px;
}

label[for='username']:before {
  background: url('../assets/user.svg') center / contain no-repeat;
}

label[for='password']:before {
  background: url('../assets/lock.svg') center / contain no-repeat;
}

.shake {
  animation: shake 0.75s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  transform: translate3d(0, 0, 0);
}

@keyframes shake {
  10%,
  90% {
    transform: translate3d(-1px, 0, 0);
  }

  20%,
  80% {
    transform: translate3d(2px, 0, 0);
  }

  30%,
  50%,
  70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%,
  60% {
    transform: translate3d(4px, 0, 0);
  }
}
</style>
