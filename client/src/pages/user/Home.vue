<template>
  <q-layout view="hHh lpR fF2">
    <q-page>
      <img src="/images/home-banner.jpg" alt="Banner" class="home-banner">
      <div class="main-container row justify-between">
        <div class="filter-container col-2">
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
            <q-checkbox @click="getDataByJenjang('Sekolah%20Dasar', elementary)" size="md" v-model="elementary" val="md"
              label="SD" />
            <q-checkbox @click="getDataByJenjang('Sekolah%20Menengah%20Pertama', junior)" size="md" v-model="junior"
              val="md" label="SMP" />
            <q-checkbox @click="getDataByJenjang('Sekolah%20Menengah%20Atas', senior)" size="md" v-model="senior" val="md"
              label="SMA" />
            <q-checkbox @click="getDataByJenjang('Universitas', university)" size="md" v-model="university" val="md"
              label="Universitas" />
            <q-checkbox @click="getDataByJenjang('Umum', public)" size="md" v-model="public" val="md" label="Umum" />
          </div>
          <div class="column">
            <p class="jakarta-b">Tempat Pelaksanaan</p>
            <q-checkbox @click="getDataByHeld('luring', offline)" size="md" v-model="offline" val="md" label="Offline" />
            <q-checkbox @click="getDataByHeld('daring', online)" size="md" v-model="online" val="md" label="Online" />
          </div>
          <div class="column">
            <p class="jakarta-b">Tingkat</p>
            <q-checkbox @click="getDataByTingkat('Kota', city)" size="md" v-model="city" val="md" label="Kota" />
            <q-checkbox @click="getDataByTingkat('Provinsi', province)" size="md" v-model="province" val="md"
              label="Provinsi" />
            <q-checkbox @click="getDataByTingkat('Nasional', national)" size="md" v-model="national" val="md"
              label="Nasional" />
          </div>
        </div>
        <div class="col-9 card-container">
          <div v-if="(!event || compe) && competitionData.length > 0" v-for="compe in competitionData"
            :key="compe.idCompetition" class="card q-mt-xl">
            <img src="/images/card-thumbnail.png" :alt="compe.competitionName + ' Thumbnail'">
            <div class="text-gap">
              <p class="jakarta-b text-lg">{{ compe.competitionName }}</p>
              <p class="jakarta-r">Kategori: <span class="jakarta-b">{{ compe.competitionCategory }}</span></p>
              <p class="jakarta-r">Jenjang: <span class="jakarta-b">{{ compe.jenjang }}</span></p>
              <p class="jakarta-r">Tingkat: <span class="jakarta-b">{{ compe.tingkat }}</span></p>
              <p class="jakarta-r">Kapasitas Tersisa: <span class="jakarta-b">{{ compe.capacityTersisa }}</span></p>
            </div>
            <q-btn @click="navigateCompeDetail(compe.idCompetition)" color="primary" icon-right="chevron_right"
              label="Detail" no-caps />
          </div>
          <div v-if="(!compe || event) && academicData.length > 0" v-for="academic in academicData"
            :key="academic.idAcademicEvents" class="card q-mt-xl">
            <img src="/images/card-thumbnail.png" :alt="academic.eventsName + ' Thumbnail'">
            <div class="text-gap">
              <p class="jakarta-b text-lg">{{ academic.eventsName }}</p>
              <p class="jakarta-r">Kategori: <span class="jakarta-b">{{ academic.eventsTheme }}</span></p>
              <p class="jakarta-r">Jenjang: <span class="jakarta-b">{{ academic.eventsJenjang }}</span></p>
              <p class="jakarta-r">Lokasi: <span class="jakarta-b">{{ academic.eventsHeld }}</span></p>
              <p class="jakarta-r">Kapasitas Tersisa: <span class="jakarta-b">{{ academic.capacityTersisa }}</span></p>
            </div>
            <q-btn @click="navigateEventDetail(academic.idAcademicEvents)" color="primary" icon-right="chevron_right"
              label="Detail" no-caps />
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
      offline: ref(false),
      online: ref(false),
      city: ref(false),
      province: ref(false),
      national: ref(false)
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

    async getDataByJenjang(jenjang, status) {
      if (status === true) {
        try {
          console.log("p");
          const compeResp = await api.get(`viewCompetitionsByJenjang/${jenjang}`)
          this.competitionData = compeResp.data;
          try {
            const eventResp = await api.get(`viewAcademicEventsByJenjang/${jenjang}`);
            this.academicData = eventResp.data;
          } catch (error) {
            Notify.create({
              color: 'red',
              message: 'Gagal mengambil data akademik event silakan refresh halaman',
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
      } else {
        await this.getCompetitionData();
        await this.getAcademicData();
      }
    },

    async getDataByHeld(held, status) {
      if (status === true) {
        try {
          const response = await api.get(`viewAcademicEventsByHeld/${held}`);
          this.academicData = response.data;;
        } catch (error) {
          console.log(error);
          Notify.create({
            color: 'red',
            message: 'Gagal mengambil data Akademik Event silakan refresh halaman',
            position: 'top',
            timeout: 2500
          });
        }
      } else {
        await this.getCompetitionData();
        await this.getAcademicData();
      }
    },

    async getDataByTingkat(tingkat, status) {
      if (status === true) {
        try {
          const response = await api.get(`viewCompetitionsByTingkat/${tingkat}`);
          this.competitionData = response.data;;
        } catch (error) {
          console.log(error);
          Notify.create({
            color: 'red',
            message: 'Gagal mengambil data Kompetisi silakan refresh halaman',
            position: 'top',
            timeout: 2500
          });
        }
      } else {
        await this.getCompetitionData();
        await this.getAcademicData();
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
