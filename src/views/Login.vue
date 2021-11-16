<template>
  <div class="backdrop">
    <div class="logo">
      <img src="@/assets/h-logo-w.png" alt="" class="logo" />
    </div>
    <label for="username">
      <input
        class="rectangle"
        type="text"
        name="username"
        v-model="username"
        placeholder="Uživatelské jméno"
      />
    </label>
    <label for="password">
      <input
        class="rectangle"
        type="password"
        name="password"
        v-model="password"
        placeholder="Heslo"
      />
    </label>
    <button @click="submit" class="rectangle submit">Přihlásit se</button>
  </div>
</template>

<script>
// import Api from '@/services/Api';

export default {
  name: 'login',

  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    submit() {
      this.$store
        .dispatch('login', {
          username: this.username,
          password: this.password,
        })
        .then(() => {
          this.$router.push({ name: 'Home' });
        });
    },
  },
};
</script>

<style>
.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #001414;
  overflow: hidden;
  color: white;
}
.logo {
  width: 80%;
  margin: 2rem 0;
}
.rectangle {
  height: 6rem;
  border: none;
  /* width: 85%; */
  margin: 1rem 0;
  border-radius: 0.4rem;
}

label {
  width: 85%;
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

input {
  width: 100%;
  padding: 10px 0;
  padding-left: 5rem;
  color: white;
  font-size: 1.6rem;
}

input {
  box-shadow: none;
  background-color: #262d2d;
}
button.submit {
  margin: 5rem;
  padding: 0;
  overflow: visible;
  background-color: #e60001;
  color: white;
  font-size: 2rem;
  font-family: 'Avenir Next', 'Avenir', sans-serif;
  font-weight: 700;
  width: 85%;
}
</style>
