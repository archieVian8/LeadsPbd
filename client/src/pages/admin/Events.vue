<template>
  <q-layout view="hHh lpR fF2">
    <q-page>
      <img src="/images/home-banner.jpg" alt="Banner" class="home-banner">
      <div class="main-container">
        <div class="card-container">
          <img src="/images/add-event.png" alt="Add Competition" class="add-btn q-mt-xl q-pt-xl">
          <div v-if="academicData.length > 0" v-for="academic in academicData" :key="academic.idAcademicEvents" class="card q-mt-xl">
            <img src="/images/card-thumbnail.png" :alt="academic.eventsName + ' Thumbnail'">
            <div class="text-gap">
              <p class="jakarta-b text-lg">{{ academic.eventsName }}</p>
              <p class="jakarta-r">Kategori: <span class="jakarta-b">{{ academic.eventsTheme }}</span></p>
              <p class="jakarta-r">Jenjang: <span class="jakarta-b">{{ academic.eventsJenjang }}</span></p>
              <p class="jakarta-r">Lokasi: <span class="jakarta-b">{{ academic.eventsHeld }}</span></p>
              <p class="jakarta-r">Kapasitas Tersisa: <span class="jakarta-b">{{ academic.capacityTersisa }}</span></p>
            </div>
            <q-btn color="primary" icon-right="chevron_right" label="Peserta" no-caps />
          </div>
        </div>
      </div>
    </q-page>
  </q-layout>
</template>

<script>
import { ref } from 'vue';
import { api } from 'src/boot/axios';
import { Notify } from 'quasar';

export default {
  name: 'OrganizerEvents',

  data() {
    return {
      competitionData: [],
      academicData: [],
    }
  },

  methods: {
    async getAcademicData() {
      try {
        const response = await api.get('viewAllAcademicEvents')
        this.academicData = response.data;
        console.log("academic", this.academicData);
      } catch (error) {
        console.log(error);
        Notify.create({
          color: 'red',
          message: 'Gagal mengambil data acara akademik silakan refresh halaman',
          position: 'top',
          timeout: 2500
        });
      }
    },
  },

  async mounted() {
    await this.getAcademicData();
  }
}
</script>

<style scoped>

.add-btn {
  width: 264px;
  height: 320px;
  cursor: pointer;
}

.card {
  height: fit-content;
  width: 264px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 12px;
  border-radius: 15px;
  background: #FAFAFA;
  box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.04),
    0px 20px 25px -5px rgba(0, 0, 0, 0.1);
}

.text-gap {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.card-container {
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
}
</style>
