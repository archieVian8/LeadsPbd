<template>
  <q-layout view="hHh lpR fF2">
    <q-page>
      <img src="/images/home-banner.jpg" alt="Banner" class="home-banner">
      <div class="main-container">
        <div class="row items-center">
          <img src="/images/blue-rectangle.jpg" alt="Rectangle">
          <p class="jakarta-b text-3xl q-ml-md">Tambah Kompetisi</p>
        </div>
        <q-form @submit="submit" class="row justify-between q-mt-lg">
          <div class="col-6">
            <div>
              <p class="jakarta-sb q-mb-xs">Nama kompetisi</p>
              <q-input outlined v-model="name" :rules="[(val) => !!val || 'Nama Kompetisi wajib diisi']" />
            </div>
            <div class="q-mt-xs">
              <p class="jakarta-sb q-mb-xs">Kategori</p>
              <q-input outlined v-model="category" :rules="[(val) => !!val || 'Kategori wajib diisi']" />
            </div>
            <div class="row justify-between q-mt-xs">
              <div class="half-input">
                <p class="jakarta-sb q-mb-xs">Jenjang</p>
                <q-select outlined v-model="jenjang" :options="jenjagOptions" />
              </div>
              <div class="half-input">
                <p class="jakarta-sb q-mb-xs">Tingkat</p>
                <q-select outlined v-model="tingkat" :options="tingkatOptions" />
              </div>
            </div>
            <div class="row justify-between q-mt-lg">
              <div class="half-input">
                <p class="jakarta-sb q-mb-xs">Tanggal Registrasi</p>
                <q-input outlined v-model="date" type="date"
                  :rules="[(val) => !!val || 'Tanggal Registrasi wajib diisi']" />
              </div>
              <div class="half-input">
                <p class="jakarta-sb q-mb-xs">Hadiah</p>
                <q-input outlined v-model="prize" :rules="[(val) => !!val || 'Hadiah wajib diisi']" prefix="Rp" />
              </div>
            </div>
            <div class="row justify-between q-mt-xs">
              <div class="full-input">
                <p class="jakarta-sb q-mb-xs">Kapasitas</p>
                <q-input outlined v-model="capacity" :rules="[(val) => !!val || 'Kapasitas wajib diisi']" />
              </div>
            </div>
            <div class="row items-center justify-between q-mt-lg">
              <q-btn @click="this.$router.push('/organizer/competition')" class="btn" outline color="grey-10" label="Kembali" no-caps />
              <q-btn type="submit" class="btn" unelevated color="primary" label="Tambah Kompetisi" no-caps />
            </div>
          </div>
          <div class="col-5">
            <div class="q-mb-lg">
              <p class="jakarta-sb q-mb-xs">Deskripsi</p>
              <q-input outlined v-model="desc" type="textarea" :rules="[(val) => !!val || 'Deskripsi wajib diisi']" />
            </div>
            <div>
              <p class="jakarta-sb q-mb-xs">Ketentuan</p>
              <q-input outlined v-model="rules" type="textarea" :rules="[(val) => !!val || 'Ketentuan wajib diisi']" />
            </div>
          </div>
        </q-form>
      </div>
    </q-page>
  </q-layout>
</template>

<script>
import { ref } from 'vue';
import { api } from 'src/boot/axios';
import { Notify } from 'quasar';
import { getUserId } from 'src/utils/localStorage';

export default {
  name: 'AddCompetition',

  data() {
    return {
      name: ref(null),
      category: ref(null),
      jenjang: ref(null),
      tingkat: ref(null),
      date: ref(null),
      prize: ref(null),
      capacity: ref(null),
      thumbnail: ref(null),
      desc: ref(null),
      rules: ref(null),
    }
  },

  setup() {
    return {
      jenjagOptions: [
        'Sekolah Dasar', 'Sekolah Menengah Pertama', 'Sekolah Menengah Atas', 'Universitas', 'Umum'
      ],
      tingkatOptions: [
        'Kota', 'Provinsi', 'Nasional'
      ]
    }
  },

  methods: {
    async submit() {
      try {
        const id = getUserId();
        const response = await api.post('createCompetition', {
          idOrganizer: id,
          competitionName: this.name,
          competitionCategory: this.category,
          jenjang: this.jenjang,
          registrationDate: this.date,
          deskripsi: this.desc,
          tingkat: this.tingkat,
          prizes: this.prize,
          requirement: this.rules,
          capacityTotal: this.capacity
        });
      } catch (error) {
        if (error.response.data.msg === "Competition created successfully") {
          Notify.create({
            color: 'green',
            message: 'Berhasil menambahkan event akademik',
            position: 'top',
            timeout: 2500
          });
          this.$router.push('/organizer/competition');
        } else {
          Notify.create({
            color: 'red',
            message: `${error.response.data.msg}`,
            position: 'top',
            timeout: 2500
          });
        }
      }
    }
  }
}
</script>

<style scoped>
.full-input {
  width: 100%;
}

.half-input {
  width: 45%;
}

.btn {
  width: 220px;
  height: 42px;
}
</style>
