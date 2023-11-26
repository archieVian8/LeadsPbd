<template>
  <q-layout view="hHh lpR fF2">
    <q-page class="main-container">
      <img src="/images/detail-banner.jpg" alt="Banner" class="banner">
      <div class="row justify-between q-mt-lg">
        <div class="col-6">
          <p class="jakarta-b text-3xl">{{ competitionData.competitionName }}</p>
          <div class="row items-center q-mt-md">
            <q-icon name="img:/icons/participant.png" size="24px" />
            <p class="jakarta-sb q-ml-md">Diikuit oleh <span class="jakarta-b">{{ competitionData.capacityTotal -
              competitionData.capacityTersisa }}</span> Tim</p>
          </div>
          <p class="q-mt-md">Kategori: <span class="jakarta-b">{{ competitionData.competitionCategory }}</span></p>
          <p class="q-mt-md">Tingkat: <span class="jakarta-b">{{ competitionData.tingkat }}</span></p>
          <p class="q-mt-md">Kapasitas Tersisa: <span class="jakarta-b">{{ competitionData.capacityTersisa }}</span></p>
        </div>
        <div class="col-5 right-container">
          <div class="row justify-between items-center text-lg">
            <p class="jakarta-r">Buka Pendaftaran</p>
            <p class="jakarta-b" style="color: red;">{{ competitionData.registrationDate }}</p>
          </div>
          <div class="row justify-between items-center text-lg">
            <p class="jakarta-r">Status</p>
            <p class="jakarta-b" style="color: red;">{{ competitionData.capacityStatus }}</p>
          </div>
        </div>
      </div>
      <div class="desc-container q-mt-xl">
        <p class="jakarta-b text-lg">Deskripsi</p>
        <p class="jakarta-r text-md q-mt-md">{{ competitionData.deskripsi }}</p>
      </div>
      <div class="requirement-container q-mt-xl">
        <p class="jakarta-b text-lg">Syarat dan Ketentuan</p>
        <p class="jakarta-r text-md q-mt-md">{{ competitionData.requirement }}</p>
      </div>
      <q-btn @click="this.$router.push('/home')" outline color="grey-10" label="Kembali" class="q-mt-xl" no-caps />
      <q-btn @click="joinCompetition()" color="primary" label="Daftar Sekarang" class="q-mt-md" no-caps />
    </q-page>
  </q-layout>
</template>

<script>
import { api } from 'src/boot/axios';
import { Notify } from 'quasar';
import { getUserId } from 'src/utils/localStorage';

export default {
  name: 'CompetitionDetail',

  data() {
    return {
      competitionData: [],
    }
  },

  methods: {
    async getCompetitionData() {
      try {
        const response = await api.post('viewCompetitionById', {
          competitionId: this.$route.query.compeId
        })
        if (response.data.competitionName) {
          this.competitionData = response.data;
          console.log(this.competitionData);
        } else {
          Notify.create({
            color: 'red',
            message: 'Gagal mengambil data kompetisi silakan refresh halaman',
            position: 'top',
            timeout: 2500
          });
        }
      } catch (error) {
        console.log(error);
        Notify.create({
          color: 'red',
          message: 'Gagal mengambil data kompetisi silakan refresh halaman',
          position: 'top',
          timeout: 2500
        });
      }
    },

    async joinCompetition() {
      const id = getUserId();
      try {
        const response = await api.post('joinCompetition', {
          userId: id,
          competitionId: this.$route.query.compeId
        });
        console.log(response);
        if (response.data.status === "Success") {
          Notify.create({
            color: 'green',
            message: 'Berhasil mengikuti kompetisi',
            position: 'top',
            timeout: 2500
          });
          this.$router.push('/home');
        } else {
          Notify.create({
            color: 'red',
            message: 'Gagal mengikuti komptisi silahkan coba kembali',
            position: 'top',
            timeout: 2500
          });
        }
      } catch (error) {
        console.log(error);
        Notify.create({
          color: 'red',
          message: 'Gagal mengikuti komptisi silahkan coba kembali',
          position: 'top',
          timeout: 2500
        });
      }
    }
  },

  async mounted() {
    await this.getCompetitionData();
  }
}
</script>

<style scoped>
.banner {
  width: 100%;
  object-fit: cover;
}

.right-container {
  display: flex;
  width: 553px;
  height: fit-content;
  padding: 24px;
  flex-direction: column;
  gap: 12px;
  border-radius: 15px;
  border: 1px solid #000;
  background: #FAFAFA;
}

.desc-container {
  width: 100%;
  height: fit-content;
  padding: 24px;
  border-radius: 15px;
  border: 1px solid #171717;
}

.requirement.container {
  width: 1128px;
  height: fit-content;
  padding: 24px;
  border-radius: 15px;
  background: #FAFAFA;
  box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.10);
}

.q-btn {
  width: 100%;
  height: 42px;
  border-radius: 6px;
  font-weight: bold;
  color: white;
}
</style>
