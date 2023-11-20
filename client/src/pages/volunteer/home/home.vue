<template>
  <q-layout view="hHr LpR lFf">
    <q-page padding>
      <q-input rounded outlined v-model="search" type="search" color="primary" placeholder="Cari Bencana"
        class="q-mt-sm q-mb-lg q-pt-sm" dense>
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
      <div class="card-container column items-center">
        <q-card v-for="disaster in filteredDisasters" :key="index" class="shadow-7" @click="onClickCard(disaster.id)">
          <img src="/icons/map.jpg" alt="map" />
          <q-card-section>
            <div class="disaster-overview row justify-center">
              <div class="column jutify-center items-center">
                <div>
                  <q-icon size="xs" name="img:/icons/volunteer/homePages/earthquake.svg" />
                  <span class="overview-title poppins-md">Tipe</span>
                </div>
                <span class="poppins-md">{{ disaster.type }}</span>
              </div>
              <div v-if="disaster.scale" class="column justify-center items-center">
                <div>
                  <q-icon size="xs" name="img:/icons/volunteer/homePages/balance.svg" />
                  <span class="overview-title poppins-md">Skala</span>
                </div>
                <span class="poppins-md">{{ disaster.scale + ' Magnitude' }}</span>
              </div>
            </div>
          </q-card-section>
          <q-separator size="0.125rem" />
          <q-card-section>
            <div>
              <div>
                <q-icon class="q-mr-sm" name="img:icons/volunteer/homePages/target.svg" size="1rem" />
                <span class="detail-title poppins-md q-mt-md">Lokasi Bencana</span>
              </div>
              <span class="detail-word poppins-r q-ml-lg q-mt-xs q-mb-none" color="dark">
                {{ `${disaster.district}, ${disaster.province}, Indonesia` }}
              </span>
            </div>
            <div class="q-mt-xs">
              <div>
                <q-icon class="q-mr-sm" name="img:icons/volunteer/homePages/time.svg" size="1rem" />
                <span class="detail-title poppins-md q-mt-md">Waktu</span>
              </div>
              <span class="detail-word poppins-r q-ml-lg q-mt-xs q-mb-none" color="dark">
                {{ disaster.startDate }}
              </span>
            </div>
            <div class="q-mt-xs">
              <div>
                <q-icon class="q-mr-sm" name="img:icons/volunteer/homePages/pin-map.svg" size="1rem" />
                <span class="detail-title poppins-md q-mt-md">Deskripsi Lokasi</span>
              </div>
              <span class="detail-word poppins-r q-ml-lg q-mt-xs q-mb-none" color="dark">
                {{ disaster.description }}
              </span>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </q-page>
  </q-layout>
</template>

<script>
import { api } from "boot/axios";

export default {
  data() {
    return {
      disasters: [],
      search: "",
    };
  },

  methods: {
    async getDisasterData() {
      await api
        .get("/user/getAllDisaster")
        .then((response) => {
          const resp = response.data;
          this.disasters = resp.map((item) => ({
            id: item.id,
            name: item.disasterName,
            province: item.province,
            district: item.district,
            village: item.village,
            type: item.disasterType,
            startDate: this.localize(item.startDate),
            cause: item.cause,
            scale: item.scale,
            description: item.locDesc,
          }));
        })
        .catch((err) => {
          console.error(err);
        });
    },
    onClickCard(disasterId) {
      this.$router.push(`/volunteer/Reports?disasterId=${disasterId}&Uid=${this.Uid}&Uname=${this.Uname}`);
    },
    localize(dateInput) {
      return new Date(dateInput).toLocaleDateString("id-ID", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        timeZone: "Asia/Jakarta",
        timeZoneName: "short",
      });
    },
  },

computed: {
  filteredDisasters() {
    if (this.search) {
      const searchTerm = this.search.toLowerCase();
      return this.disasters.filter(disaster => {
        const lowerCaseDisasterType = disaster.type.toLowerCase();
        const lowerCaseDistrict = disaster.district.toLowerCase();
        const lowerCaseProvince = disaster.province.toLowerCase();
        const lowerCaseDescription = disaster.province.toLowerCase();
        const startDate = this.localize(disaster.startDate).toLowerCase();
        return (
          lowerCaseDisasterType.includes(searchTerm) ||
          lowerCaseDistrict.includes(searchTerm) ||
          lowerCaseProvince.includes(searchTerm) ||
          startDate.includes(searchTerm)
        );
      });
    }
    return this.disasters;
  }
},

  mounted() {
    this.getDisasterData();
    this.Uid = this.$route.query.Uid;
    this.Uname = this.$route.query.Uname;
  },
};
</script>

<style>
/*----- Card Styling -----*/
.card-container {
  gap: 1rem;
  margin-top: 24px;
  margin-bottom: 24px;
}

.card-container>.q-card {
  width: 90%;
  border-radius: 0.75rem;
}

.q-card>img {
  width: 100%;
  height: 7rem;
  object-fit: cover;
}

.disaster-overview {
  gap: 1rem;
}

.overview-title {
  font-size: 12px;
  margin-left: 0.5rem;
}

.detail-title {
  color: #ec7e88;
  font-size: 14px;
  display: inline;
}

.detail-word {
  font-size: 0.875rem;
  display: block;
  word-wrap: break-word;
  white-space: normal;
}

/*------------------------*/

.text-view {
  color: black !important;
}

.bg-view {
  background: #83ceed !important;
}

.status {
  font-size: 11px;
  border: 1px solid;
  border-radius: 5px;
  padding: 3px;
}
</style>
