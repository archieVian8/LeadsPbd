<template>
  <q-layout view="hHh lpR fF2">
    <q-page class="row justify-between">
      <div class="col-6 column jusutify-center items-center">
        <q-form @submit="submit()" class="form-container">
          <img src="/images/logo-black.png" alt="Logo">
          <div class="q-mt-lg">
            <p>Email</p>
            <q-input outlined v-model="email" :rules="[(val) => !!val || 'Email wajib diisi']" />
          </div>
          <div class="q-mt-xs">
            <p>Password</p>
            <q-input class="q-mt-sm" outlined v-model="password" :type="isPwd ? 'password' : 'text'" :rules="[
              (val) => !!val,
              (val) =>
                val.length > 5 ||
                'Password minimal terdiri dari 8 karakter',
            ]">
              <template v-slot:append>
                <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="isPwd = !isPwd" />
              </template>
            </q-input>
          </div>
          <q-btn type="submit" class="q-mt-xl" unelevated color="primary" label="Masuk" no-caps />
        </q-form>
      </div>
      <div class="col-5 auth-image"></div>
    </q-page>
  </q-layout>
</template>

<script>
import { ref } from 'vue';
import { api } from 'src/boot/axios';
import { Notify } from 'quasar';

export default {
  name: 'UserLogin',

  data() {
    return {
      email: ref(null),
      password: ref(null),
      isPwd: ref(true),
    };
  },

  methods: {

    resetDefault() {
      this.email = ref(null);
      this.password = ref(null);
      this.isPwd = ref(true);
    },

    async submit() {
      try {
        const response = await api.post('signInUser', {
          email: this.email,
          password: this.password
        });
        console.log(response);
        // if (response.status === 200) {
        //   this.$router.push('/home');
        // }
      } catch (error) {
        console.log(error);
        this.resetDefault();
        Notify.create({
          color: 'red',
          message: 'Gagal login silahkan coba kembali',
          position: 'top',
          timeout: 2500
        });
      }
    }
  }
}
</script>

<style scoped>
.auth-image {
  height: 100vh;
  background-image: url("/images/user-auth.jpg");
  background-repeat: round;
  object-fit: cover;
}

.form-container {
  margin: auto;
}

.q-input {
  width: 360px;
}

.q-btn {
  width: 100%;
  height: 42px;
}
</style>
