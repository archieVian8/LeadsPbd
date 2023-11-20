<template>
  <q-layout>
    <q-page>
      <div class="q-mx-md q-my-lg">
        <q-btn unelevated round color=#E2E8F0 icon="img:icons/admin/AddDisaster/arrow-left.svg" to='/roles/volunteer' />
        <div class="row justify-center items-center q-mt-md">
          <q-img src="/Logo.png" alt="logo" style="width: 110px; height: 110px;" />
        </div>
        <div class="q-mt-lg q-mb-xl">
          <p class="text-h5 poppins-sb q-mt-md">Selamat datang di ALDER</p>
          <p class="text-weight-bold subtitle-text">Senang bertemu dengan anda kembali.</p>
        </div>
        <q-form @submit="loginAccount()" class="q-mt-md q-pt-sm">
          <div>
            <p class="text-weight-bold q-mb-sm">Email</p>
            <q-input outlined v-model="email" :rules="[(val) => !!val]" placeholder="" dense />
          </div>
          <div>
            <p class="text-weight-bold q-mb-sm">Password</p>
            <q-input outlined v-model="password" :type="isPwd ? 'password' : 'text'" dense>
              <template v-slot:append>
                <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="isPwd = !isPwd" />
              </template>
            </q-input>
          </div>
          <div class="q-mt-lg">
            <q-btn unelevated class="login-btn full-width" no-caps label="Masuk" type="submit" />
          </div>
        </q-form>
        <router-view />
      </div>
    </q-page>
  </q-layout>
</template>

<script>
import { ref } from 'vue'
import { api } from 'boot/axios'
import { Notify } from 'quasar'

export default {

  name: 'volunteerLogin',

  data() {
    return {
      email: '',
      role: 'Pengguna',
      password: '',
      isPwd: ref(true),
    }
  },

  methods: {
    async loginAccount() {
      try {
        const payload = {
          email: this.email,
          role: this.role,
          password: this.password
        };
        console.log("Login Account Called");
        const response = await api.post('/admin/loginAccount', payload);
        console.log(response)

        if (response.data.length > 0) {
          Notify.create({
            color: 'green',
            message: 'Silahkan Masuk',
            position: 'top',
            timeout: 2500
          });
          if (response.data[0].role == "Pengguna") {
            this.$router.push(`/volunteer?Uid=${response.data[0].id}&Uname=${response.data[0].accountName}`)

          } else {
            this.$router.push(`/admin?Uid=${response.data[0].id}&Uname=${response.data[0].accountName}`)
          }
        }
        else {
          Notify.create({
            color: 'red',
            message: 'akun anda salah atau belum di aktivasi',
            position: 'top',
            timeout: 2500
          });
        }
      }
      catch (error) {
        console.error(error);
      }
    }
  }
};

</script>

<style>
.login-btn {
  background-color: #56BDE6;
  color: #ffffff;
  height: 42px;
  border-radius: 5px;
}
.subtitle-text {
  font-size: 14px;
  color: #64748B;
}
</style>


