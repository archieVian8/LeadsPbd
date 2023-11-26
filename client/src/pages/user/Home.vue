<template>
  <q-layout view="hHh lpR fF2">
    <q-page>
      <img src="/images/home-banner.jpg" alt="Banner" class="home-banner">
      <div class="main-container row justify-between">
        <div class="filter-container col-3">
          <div class="row justify-between items-center">
            <p class="jakarta-b text-lg">Filter</p>
            <q-icon name="img:/icons/filter.svg" size="24px" />
          </div>
          <div class="column">
            <p class="jakarta-b">Kategori</p>
            <q-checkbox size="md" v-model="compe" val="md" label="Lomba" />
            <q-checkbox size="md" v-model="event" val="md" label="Event" />
          </div>
          <div class="column">
            <p class="jakarta-b">Tingkatan</p>
            <q-checkbox size="md" v-model="elementary" val="md" label="SD" />
            <q-checkbox size="md" v-model="junior" val="md" label="SMP" />
            <q-checkbox size="md" v-model="senior" val="md" label="SMA" />
            <q-checkbox size="md" v-model="university" val="md" label="Universitas" />
            <q-checkbox size="md" v-model="public" val="md" label="Umum" />
          </div>
          <div class="column">
            <p class="jakarta-b">Skala</p>
            <q-checkbox size="md" v-model="city" val="md" label="Kota" />
            <q-checkbox size="md" v-model="province" val="md" label="Provinsi" />
            <q-checkbox size="md" v-model="national" val="md" label="Nasional" />
          </div>
        </div>
        <div class="col-8 card-container">
          <div v-if="(!event || compe) && competitionData.length > 0" v-for="compe in competitionData" :key="compe.idCompetition" class="card q-mt-xl">
            <img src="/images/card-thumbnail.png" :alt="compe.competitionName + ' Thumbnail'">
            <div class="text-gap">
              <p class="jakarta-b text-lg">{{ compe.competitionName }}</p>
              <p class="jakarta-r">Kategori: <span class="jakarta-b">{{ compe.competitionCategory }}</span></p>
              <p class="jakarta-r">Jenjang: <span class="jakarta-b">{{ compe.jenjang }}</span></p>
              <p class="jakarta-r">Tingkat: <span class="jakarta-b">{{ compe.tingkat }}</span></p>
              <p class="jakarta-r">Kapasitas Tersisa: <span class="jakarta-b">{{ compe.capacityTersisa }}</span></p>
            </div>
            <q-btn @click="navigateCompeDetail(compe.idCompetition)" color="primary" icon-right="chevron_right" label="Detail" no-caps />
          </div>
          <div v-if="(!compe || event) && academicData.length > 0" v-for="academic in academicData" :key="academic.idAcademicEvents" class="card q-mt-xl">
            <img src="/images/card-thumbnail.png" :alt="academic.eventsName + ' Thumbnail'">
            <div class="text-gap">
              <p class="jakarta-b text-lg">{{ academic.eventsName }}</p>
              <p class="jakarta-r">Kategori: <span class="jakarta-b">{{ academic.eventsTheme }}</span></p>
              <p class="jakarta-r">Jenjang: <span class="jakarta-b">{{ academic.eventsJenjang }}</span></p>
              <p class="jakarta-r">Lokasi: <span class="jakarta-b">{{ academic.eventsHeld }}</span></p>
              <p class="jakarta-r">Kapasitas Tersisa: <span class="jakarta-b">{{ academic.capacityTersisa }}</span></p>
            </div>
            <q-btn @click="navigateEventDetail(academic.idAcademicEvents)" color="primary" icon-right="chevron_right" label="Detail" no-caps />
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
  name: 'UserHome',

  data() {
    return {
      search: ref(null),
      competitionData: [],
      academicData: [],
      combineData: [],
    }
  },

  setup() {
    return {
      compe: ref(false),
      event: ref(false),
      elementary: ref(false),
      junior: ref(false),
      senior: ref(false),
      university: ref(false),
      public: ref(false),
      city: ref(false),
      province: ref(false),
      national: ref(false),
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

    async getCompetitionDataByJenjang(jenjang) {
      try {
        const response = await api.get(`viewCompetitionsByJenjang/${jenjang}`)
        this.competitionData = response.data;
        console.log("compe", this.competitionData);
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

    navigateCompeDetail(id) {
      this.$router.push(`/competition?compeId=${id}`);
    },

    navigateEventDetail(id) {
      this.$router.push(`/event?eventId=${id}`);
    }
  },

  async mounted() {
    await this.getCompetitionData();
    await this.getAcademicData();
  }
}
</script>

<style scoped>
.filter-container {
  height: fit-content;
  display: flex;
  padding: 24px;
  flex-direction: column;
  gap: 24px;
  border-radius: 15px;
  background: #FAFAFA;
}

.q-input {
  height: fit-content;
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
