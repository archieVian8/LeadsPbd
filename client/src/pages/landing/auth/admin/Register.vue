<template>
  <q-layout>
    <q-page>
      <div class="q-mx-md q-my-lg">
        <q-btn unelevated round color=#E2E8F0 icon="img:icons/admin/AddDisaster/arrow-left.svg" to='/roles/admin' />
        <p class="text-h5 poppins-sb text-center q-my-md">DAFTAR</p>
        <q-form @submit="addAccount()">
          <div>
            <p class="text-weight-bold q-mb-xs">Nama Lengkap</p>
            <q-input outlined v-model="accountName" :rules="[(val) => !!val]" color="orange" placeholder="" dense />
          </div>
          <div class="q-mb-sm">
            <p class="text-weight-bold q-mb-xs">Jenis Kelamin</p>
            <q-select outlined v-model="gender" :options="genderOptions" label="Jenis Kelamin" dense />
          </div>
          <div>
            <p class="text-weight-bold q-mb-xs">Email</p>
            <q-input outlined v-model="email" :rules="[(val) => !!val, (val) => isValidEmail(val) || 'email tidak valid']"
              color="orange" placeholder="" dense />
          </div>
          <div class="q-mb-md">
            <p class="text-weight-bold q-mb-xs">Password</p>
            <q-input outlined v-model="password" :type="isPwd ? 'password' : 'text'" color="orange" dense>
              <template v-slot:append>
                <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="isPwd = !isPwd" />
              </template>
            </q-input>
          </div>
          <div>
            <p class="text-weight-bold q-mb-xs">Konfirmasi Password</p>
            <q-input outlined v-model="passwordConfirmation" :type="isPwdConfirm ? 'password' : 'text'" :rules="[
              (val) => !!val,
              (val) => val === password || 'Password tidak sama'
            ]" color="orange" dense>
              <template v-slot:append>
                <q-icon :name="isPwdConfirm ? 'visibility_off' : 'visibility'" class="cursor-pointer"
                  @click="isPwdConfirm = !isPwdConfirm" />
              </template>
            </q-input>
          </div>
          <div>
            <p class="text-weight-bold q-mb-xs">Nomor Telepon</p>
            <q-input outlined v-model="nomorTelepon" :rules="[(val) => !!val]" color="orange" placeholder="" dense />
          </div>
          <div>
            <p class="text-weight-bold q-mb-xs">NIK</p>
            <q-input outlined v-model="nik" :rules="[(val) => !!val]" color="orange" placeholder="" dense />
          </div>
          <div>
            <p class="text-weight-bold q-mb-xs">Nama Badan Berwenang/Komunitas</p>
            <q-input outlined v-model="instansi" :rules="[(val) => !!val]" color="orange" placeholder="" dense />
          </div>
          <div>
            <p class="text-weight-bold q-mb-xs">NIP/ID Keanggotaan</p>
            <q-input outlined v-model="idKeanggotaan" :rules="[(val) => !!val]" color="orange" placeholder="" dense />
          </div>
          <div class="q-mt-lg">
            <q-btn unelevated type="submit" class="regis-btn full-width" no-caps label="Daftar" />
          </div>
        </q-form>
      </div>
    </q-page>
  </q-layout>
</template>

<script>
import { ref } from 'vue'
import { api } from 'boot/axios'
import { Notify } from 'quasar'

const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default {

  name: 'adminRegister',

  data() {
    return {
      accountName: '',
      role: 'Admin',
      gender: '',
      genderOptions: ['Pria', 'Wanita'],
      email: '',
      password: '',
      passwordConfirmation: '',
      isPwd: ref(true),
      isPwdConfirm: ref(true),
      nomorTelepon: '',
      nik: '',
      instansi: '',
      idKeanggotaan: ''
    }
  },

  methods: {
    async addAccount() {
      try {
        const payload = {
          accountName: this.accountName,
          role: this.role,
          gender: this.gender,
          email: this.email,
          password: this.password,
          nomorTelepon: this.nomorTelepon,
          nik: this.nik,
          instansi: this.instansi,
          idKeanggotaan: this.idKeanggotaan,
          accountStatus: 0
        };
        console.log("Add Account called");
        const response = await api.post('/admin/addAccount', payload);
        Notify.create({
          color: 'green',
          message: 'Silahkan Tunggu Aktivasi Akun',
          position: 'top',
          timeout: 2500
        });
        this.$router.push('/')
      } catch (error) {
        console.error(error);
        Notify.create({
          color: 'red',
          message: 'Terjadi kesalahan saat mendaftarkan akun',
          position: 'top',
          timeout: 2500
        });
      }
    },
    isValidEmail(email) {
      return EMAIL_REGEX.test(email);
    }
  }
};
</script>

<style>
.q-form {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.regis-btn {
  background-color: #f97c21;
  color: #ffffff;
  height: 42px;
  border-radius: 5px;
}
</style>
