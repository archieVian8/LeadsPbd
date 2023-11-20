<template>
  <q-layout view="hHh lpR fF2">
    <q-page>
      <div class="q-mt-md q-mx-md">
        <div class="row items-center">
          <q-btn unelevated round color=#E2E8F0 icon="img:icons/admin/AddDisaster/arrow-left.svg" 
          :to='`/admin?Uid=${this.Uid}&Uname=${this.Uname}`' />
          <p class="q-mb-none text-subtitle1 text-weight-bold">Pilih Bencana</p>
        </div>
        <q-input rounded outlined v-model="search" type="search" color="orange" placeholder="Cari Bencana"
          class="q-mt-sm q-mb-lg q-pt-sm" dense>
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
        <div class="disaster-card q-my-md q-pa-md" v-for="(disaster) in filteredDisasters">
          <router-link :to="`/admin/evacuation/disaster-id?disasterId=${disaster.id}&Uid=${this.Uid}&Uname=${this.Uname}`">
            <p class="text-weight-bold">{{ disaster.disasterType + ' Pada ' + formatDateTime(disaster.startDate) + ' WIB'
            }}
            </p>
            <div class="row items-start q-mt-sm">
              <q-icon name="img:/icons/admin/AddEvacuation/disaster-location.svg" class="q-mt-xs" size="16px" />
              <div class="q-ml-sm">
                <p class="text-red text-weight-bold">Lokasi Bencana</p>
                <p>{{ disaster.district + ', ' + disaster.province }}</p>
              </div>
            </div>
            <div class="row items-start q-mt-sm q-pt-xs">
              <q-icon name="img:/icons/admin/AddEvacuation/detail-location.svg" class="q-mt-xs" size="16px" />
              <div class="q-ml-sm">
                <p class="text-red text-weight-bold">Detail Lokasi Bencana</p>
                <p>{{ disaster.locDesc }}</p>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </q-page>
  </q-layout>
</template>

<script>
import { ref } from 'vue';
import { api } from 'boot/axios';
import { Notify } from 'quasar';

export default {
  name: 'AdminChooseDisaster',

  data() {
    return {
      disasters: [],
      search: ref('')
    }
  },

  methods: {
    formatDateTime(dateString) {
      const date = new Date(dateString);
      const options = {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      };
      const formattedDate = date.toLocaleString('en-ID', options).replace(',', ' ');
      return formattedDate;
    },

    async getDisasterData() {
      try {
        const response = await api.get('/user/getAllDisaster');
        this.disasters = response.data.map((item) => ({
          id: item.id,
          cause: item.cause,
          createdAt: item.createdAt,
          disasterName: item.disasterName,
          disasterType: item.disasterType,
          district: item.district,
          locDesc: item.locDesc,
          province: item.province,
          startDate: item.startDate,
          updatedAt: item.updatedAt,
          village: item.village
        })).reverse();
      } catch (error) {
        console.error(error);
        Notify.create({
          color: 'red',
          message: 'Gagal mengambil data silakan restart aplikasi',
          position: 'top',
          timeout: 2500
        });
      }
    }
  },

  computed: {
    filteredDisasters() {
      const searchTerm = this.search.toLowerCase();
      return this.disasters.filter(disaster => {
        const lowerCaseDisasterType = disaster.disasterType.toLowerCase();
        const lowerCaseDistrict = disaster.district.toLowerCase();
        const lowerCaseProvince = disaster.province.toLowerCase();
        const startDate = this.formatDateTime(disaster.startDate).toLowerCase();
        return (
          lowerCaseDisasterType.includes(searchTerm) ||
          lowerCaseDistrict.includes(searchTerm) ||
          lowerCaseProvince.includes(searchTerm) ||
          startDate.includes(searchTerm)
        );
      });
    }
  },

  mounted() {
    this.Uid = this.$route.query.Uid;
    this.Uname = this.$route.query.Uname;
    console.log('get disaster called');
    this.getDisasterData();
  }
}
</script>

<style>
.disaster-card {
  height: fit-content;
  border-radius: 10px;
  box-shadow: 1px 1px 15px 0px rgba(0, 0, 0, 0.25);
}
icon-padding {
  padding-top: 2px;
}
text-red {
  color: #EC7E88;
}
</style>
