<template>
  <q-layout view="hHh lpR fF2">
    <q-page>
      <img src="/images/home-banner.jpg" alt="Banner" class="home-banner">
      <div class="main-container">
        <div class="card-container">
          <img src="/images/add-competition.png" alt="Add Event" @click="navigateAddCompetition" class="add-btn q-mt-xl q-pt-xl">
          <div v-if="competitionData.length > 0" v-for="compe in competitionData" :key="compe.idCompetition" class="card q-mt-xl">
            <img src="/images/card-thumbnail.png" :alt="compe.competitionName + ' Thumbnail'">
            <div class="text-gap">
              <p class="jakarta-b text-lg">{{ compe.competitionName }}</p>
              <p class="jakarta-r">Kategori: <span class="jakarta-b">{{ compe.competitionCategory }}</span></p>
              <p class="jakarta-r">Jenjang: <span class="jakarta-b">{{ compe.jenjang }}</span></p>
              <p class="jakarta-r">Tingkat: <span class="jakarta-b">{{ compe.tingkat }}</span></p>
              <p class="jakarta-r">Kapasitas Tersisa: <span class="jakarta-b">{{ compe.capacityTersisa }}</span></p>
            </div>
            <q-btn color="primary" icon-right="chevron_right" label="Detail" />
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
  name: 'OrganizerCompetition',

  data() {
    return {
      competitionData: [],
      academicData: [],
    }
  },

  methods: {
    async getCompetitionData() {
      try {
        const response = await api.get('viewAllCompetitions')
        this.competitionData = response.data;
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

    navigateAddCompetition() {
      this.$router.push('/organizer/competition/create');
    },
  },

  async mounted() {
    await this.getCompetitionData();
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
