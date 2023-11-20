<template>
  <q-layout view="hHr LpR lFf">
    <q-page padding>
      <div class="row items-center">
        <q-btn unelevated round color=#E2E8F0 icon="img:icons/admin/AddDisaster/arrow-left.svg"
          :to='`/volunteer?Uid=${this.Uid}&Uname=${this.Uname}`' />
        <p class="q-mb-none text-subtitle1 text-weight-bold">Laporan Lokasi Evakuasi</p>
      </div>
      <q-input rounded outlined v-model="search" type="search" color="primary" placeholder="Cari Nama Lokasi"
        class="q-mt-sm q-mb-lg q-pt-sm" dense>
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
      <div class="card-container column items-center">
        <q-card v-for="evac in filteredEvacs" :key="index" class="shadow-7">
          <q-card-section>
            <div>
              <div>
                <q-icon class="q-mr-sm" name="img:icons/volunteer/homePages/target.svg" size="1rem" />
                <span class="detail-title poppins-md q-mt-md">Lokasi Bencana</span>
              </div>
              <span class="detail-word poppins-r q-ml-lg q-mt-xs q-mb-none" color="dark">
                {{ `${evac.evacName}` }}
              </span>
            </div>
            <div>
              <div>
                <q-icon class="q-mr-sm" name="img:icons/volunteer/homePages/pin-map.svg" size="1rem" />
                <span class="detail-title poppins-md q-mt-md">Deskripsi Lokasi</span>
              </div>
              <span class="detail-word poppins-r q-ml-lg q-mt-xs q-mb-none" color="dark">
                {{ `${evac.alamat}, RT ${evac.rt}, RW ${evac.rw}` }}
              </span>
            </div>
            <div>
              <div>
                <q-icon class="q-mr-sm" name="img:icons/volunteer/homePages/worker.svg" size="1rem" />
                <span class="detail-title poppins-md q-mt-md">Petugas Penanggung Jawab</span>
              </div>
              <span class="detail-word poppins-r q-ml-lg q-mt-xs q-mb-none" color="dark">
                {{ `${evac.namaPetugas}(${evac.nomorPetugas})` }}
              </span>
            </div>
          </q-card-section>

          <q-separator size="0.125rem" />

          <q-card-section v-if="dataAvailable">
            <apexchart type="bar" height="350" :options="chartOptions" :series="series[`${evac.index}`]"></apexchart>
          </q-card-section>

          <q-separator size="0.125rem" />

          <q-card-section class="row justify-between items-center">
            <q-btn color="orange" class="detail-btn" unelevated label="Obat" @click="onDetailObat(`${evac.id}`)"
              no-caps></q-btn>
            <q-btn color="green" class="detail-btn" unelevated label="Pangan" @click="onDetailPangan(`${evac.id}`)"
              no-caps></q-btn>
            <q-btn color="yellow" class="detail-btn" unelevated label="Sandang" @click="onDetailSandang(`${evac.id}`)"
              no-caps></q-btn>
          </q-card-section>

        </q-card>
      </div>
    </q-page>
  </q-layout>
</template>

<script>
import { api } from 'boot/axios'

export default {
  data() {
    return {
      dataAvailable: 0,
      evacs: [],
      compData: [],
      search: "",
      series:
        [
          [
            {
              name: 'Kebutuhan',
              data: [12, 23, 14]
            },
            {
              name: 'Terpenuhi',
              data: [21, 7, 25]
            }
          ],

          [
            {
              name: 'Kebutuhan',
              data: [120, 230, 140]
            },
            {
              name: 'Terpenuhi',
              data: [210, 70, 250]
            }
          ]
        ],

      chartOptions: {
        chart: {
          id: 'ChartPerkembanganBantuan',
          type: 'bar',
          height: 350,
          stacked: false,
          toolbar: {
            show: true
          },
          zoom: {
            enabled: true
          }
        },

        responsive: [{
          breakpoint: 480,
          options: {
            legend: {
              position: 'bottom',
              offsetX: -10,
              offsetY: 0
            }
          }
        }],

        plotOptions: {
          bar: {
            horizontal: false,
            borderRadius: 0,
            dataLabels: {
              total: {
                enabled: true,
                style: {
                  fontSize: '13px',
                  fontWeight: 900
                }
              }
            }
          },
        },

        xaxis: {
          categories: ["Obat", "Pangan", "Sandang"
          ],
        },
        legend: {
          position: 'right',
          offsetY: 40
        },
        fill: {
          opacity: 1
        }
      },
    };
  },

  methods: {
    async updateChart(locId) {

      console.log('**** Update Chart')
      let dataKebutuhan = []
      let dataTerpenuhi = []

      const payload = {
        "locId": locId,
      }
      console.log(payload)

      await api.post('/user/getTotalMedicineByLocationId', payload).then((response) => {
        const dataIn = response.data

        console.log(dataIn)
        console.log(dataIn[0].TotalKebutuhanObat)
        dataKebutuhan.push(dataIn[0].TotalKebutuhanObat)
        dataTerpenuhi.push(dataIn[0].TotalTerpenuhiObat)
      })

      await api.post('/user/getTotalFoodsByLocationId', payload).then((response) => {
        const dataIn = response.data

        console.log(dataIn)
        console.log(dataIn[0].TotalKebutuhanPangan)
        dataKebutuhan.push(dataIn[0].TotalKebutuhanPangan)
        dataTerpenuhi.push(dataIn[0].TotalTerpenuhiPangan)
      })

      await api.post('/user/getTotalClothingByLocationId', payload).then((response) => {
        const dataIn = response.data

        console.log(dataIn)
        console.log(dataIn[0].TotalKebutuhanSandang)
        dataKebutuhan.push(dataIn[0].TotalKebutuhanSandang)
        dataTerpenuhi.push(dataIn[0].TotalTerpenuhiSandang)
        this.compData.push
          (
            [{
              name: 'Kebutuhan',
              data: dataKebutuhan
            },
            {
              name: 'Terpenuhi',
              data: dataTerpenuhi
            }]
          )
        console.log('******this.compData')
        console.log(this.compData)
        this.series = this.compData

        console.log('******** this.series')
        console.log(this.series)

      })

    },
    onDetailObat(locId) {
      console.log("View Detail Obat Click");
      this.$router.push(`/volunteer/viewNeeds?locId=${locId}&Uid=${this.Uid}&Uname=${this.Uname}&type=medicine`);
    },

    onDetailPangan(locId) {
      console.log("View Detail Pangan Click");
      this.$router.push(`/volunteer/viewNeeds?locId=${locId}&Uid=${this.Uid}&Uname=${this.Uname}&type=food`);
    },

    onDetailSandang(locId) {
      console.log("View Detail Sandang Click");
      this.$router.push(`/volunteer/viewNeeds?locId=${locId}&Uid=${this.Uid}&Uname=${this.Uname}&type=clothing`);
    },

    async getEvacLocationByDisasterId() {
      console.log('getEvacLocationByDisasterId - called')

      const payload = {
        "disasterId": this.disasterId,
      }
      console.log("Reports.vue-getEvacLocationByDisasterId")
      console.log(payload)

      await api
        .post('/admin/getEvacLocationDisasterId', payload)
        .then(async (response) => {
          const resp = response.data;
          console.log('*******resp')
          console.log(this.evacs.length)
          console.log(resp)
          console.log(resp[0].alamat)



          for (let i = 0; i < resp.length; i++) {
            let locId = resp[i].id

            let waitComplete = await this.updateChart(locId);

          }

          for (let i = 0; i < resp.length; i++) {
            this.evacs.push(
              {
                index: i,
                id: resp[i].id,
                evacName: resp[i].evacName,
                alamat: resp[i].alamat,
                kecamatan: resp[i].kecamatan,
                rt: resp[i].rt,
                rw: resp[i].rw,
                namaPetugas: resp[i].namaPetugas,
                nomorPetugas: resp[i].nomorPetugas
              })

          }

          this.dataAvailable = 1

          console.log('****this.evacs')
          console.log(this.evacs)

        })
        .catch((err) => {
          console.error(err);
        });
    },
  },

  computed: {
    filteredEvacs() {
      if (this.search) {
        const searchTerm = this.search.toLowerCase();
        return this.evacs.filter(evac => {
          const lowerCaseName = evac.evacName.toLowerCase();
          return (
            lowerCaseName.includes(searchTerm)
          );
        });
      }
      return this.evacs;
    }
  },

  mounted() {
    console.log("disasterID view")
    this.Uid = this.$route.query.Uid;
    this.Uname = this.$route.query.Uname;
    this.disasterId = this.$route.query.disasterId
    this.locId = this.$route.query.locId
    this.dataAvailable = 0
    this.getEvacLocationByDisasterId()
    this.dataAvailable = 1
  },
  setup() {

  }

}

</script>

<style>
.card-container {
  gap: 1rem;
  margin-top: 24px;
  margin-bottom: 24px;
}

.card-container>.q-card {
  width: 90%;
  border-radius: 0.75rem;
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

.detail-btn {
  width: 30%;
}</style>
