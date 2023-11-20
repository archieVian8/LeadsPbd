<template>
  <q-layout view="hHr LpR lFf">
    <p class="poppins-md q-mt-md q-ml-md text-capitalize text-h5">Perkembangan Kebutuhan Setiap Lokasi Evakuasi</p>
    <q-page padding>
      <div class="card-container column items-center">

        <q-card v-for="evac in evacs" :key="index" class="shadow-7">
          <q-card-section>
            <div>
              <div>
                <span class="detail-title poppins-md q-mt-md">Lokasi Penampungan</span>
                
              </div>
              <span class="detail-word poppins-r q-ml-lg q-mt-xs q-mb-none" color="dark">
                {{ `${evac.evacName}` }}
              
              </span>
            </div>
            <div>
              <div>
                <span class="detail-title poppins-md q-mt-md">Alamat Penampungan</span>
              </div>
              <span class="detail-word poppins-r q-ml-lg q-mt-xs q-mb-none" color="dark">
                {{ `${evac.alamat}, RT ${evac.rt}, RW ${evac.rw}` }}
              </span>
            </div>
            <div>
              <div>
                <span class="detail-title poppins-md q-mt-md">Petugas Penanggung Jawab</span>
              </div>
              <span class="detail-word poppins-r q-ml-lg q-mt-xs q-mb-none" color="dark">
                {{ `Petugas = ${evac.namaPetugas}, Nomor = ${evac.nomorPetugas} ` }}
              </span>
            </div>
          </q-card-section>

          <q-separator size="0.125rem" />

          <q-card-section v-if="dataAvailable"  > 
            <!-- <chartProgress>
            </chartProgress>     -->
            <!-- {{ this.updateChart() }} -->

            <!-- {{ `Petugas = ${evac.series}` }} -->
            
            <apexchart type="bar" height="350" :options="chartOptions" :series= " series[`${evac.index}`] " ></apexchart>

          </q-card-section>

          <q-separator size="0.125rem" /> 

          <q-card-section>
            <q-btn color="primary" label="Bantu Obat" @click="onDetailObat(`${evac.id}`)"></q-btn>
            <q-btn color="primary" label="Bantu Pangan" @click="onDetailPangan(`${evac.id}`)"></q-btn>
            <q-btn color="primary" label="Bantu Sandang" @click="onDetailSandang(`${evac.id}`)"></q-btn>
          </q-card-section>

        </q-card>
      </div>
    </q-page>
  </q-layout>
</template>

<script>
import { ref } from 'vue'
import {api} from 'boot/axios'
import {useRouter} from 'vue-router'
import {apexChart } from 'vue3-apexcharts'

import { defineComponent , defineAsyncComponent } from 'vue';


// var chartProgress = defineAsyncComponent(() =>
// import('src/components/charts/chartProgress.vue')
// )


export default {
  // components:{
  //    chartProgress,
  // },

  setup () {

    //const locId=0

    //const router = useRouter()

    return {
      
   
    }

  },

  data() {
    return{
      dataAvailable:0,
      evacs:[],
      //   {
      //     index: 0,
      //     id: "",
      //     evacName: "",
      //     alamat: "",
      //     kecamatan: "",
      //     rt: "",
      //     rw: "",
      //     namaPetugas: "",
      //     nomorPetugas: "",
      //   }
      // ],

      compData:[],

      series:
        [
          [
            {
              name: 'Kebutuhan',
              data: [12,23,14]
            }, 
            {
              name: 'Terpenuhi',
              data: [21, 7, 25]
            }
          ],

          [
            {
              name: 'Kebutuhan',
              data: [120,230,140]
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
        // type: 'datetime',
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
  async updateChart(locId){

  console.log('**** Update Chart')
  let dataKebutuhan =[]
  let dataTerpenuhi=[]

  const payload = {
    "locId" : locId, 
  }
  console.log(payload)

  await api.post('/user/getTotalMedicineByLocationId', payload).then((response) => {
    const dataIn = response.data
    
    console.log(dataIn)
    console.log(dataIn[0].TotalKebutuhanObat)
    dataKebutuhan.push(dataIn[0].TotalKebutuhanObat)
    dataTerpenuhi.push(dataIn[0].TotalTerpenuhiObat)
    //var chart = new apexChart(document.querySelector("chartTotal"), this.chartOptions)

    // this.series.push
    // (
    //     [{
    //       name: 'Kebutuhan',
    //       data:dataKebutuhan
    //   },
    //   {
    //       name: 'Terpenuhi',
    //       data: dataTerpenuhi
    //   }]
    // )

    // ApexCharts.exec('stackedChart','updateSeries',
    //   [{
    //     name: 'Kebutuhan',
    //     data:dataKebutuhan
    // },
    // {
    //     name: 'Terpenuhi',
    //     data: dataTerpenuhi
    // }])

  })

  await api.post('/user/getTotalFoodsByLocationId', payload).then((response) => {
    const dataIn = response.data

    console.log(dataIn)
    console.log(dataIn[0].TotalKebutuhanPangan)
    dataKebutuhan.push(dataIn[0].TotalKebutuhanPangan)
    dataTerpenuhi.push(dataIn[0].TotalTerpenuhiPangan)
    //var chart = new apexChart(document.querySelector("chartTotal"), this.chartOptions)

    // this.series.push
    // (
    //     [{
    //       name: 'Kebutuhan',
    //       data:dataKebutuhan
    //   },
    //   {
    //       name: 'Terpenuhi',
    //       data: dataTerpenuhi
    //   }]
    // )

    // ApexCharts.exec('stackedChart','updateSeries',
    //   [{
    //     name: 'Kebutuhan',
    //     data:dataKebutuhan
    // },
    // {
    //     name: 'Terpenuhi',
    //     data:dataTerpenuhi
    // }])

  })

  await api.post('/user/getTotalClothingByLocationId', payload).then((response) => {
    const dataIn = response.data

    console.log(dataIn)
    console.log(dataIn[0].TotalKebutuhanSandang)
    dataKebutuhan.push(dataIn[0].TotalKebutuhanSandang)
    dataTerpenuhi.push(dataIn[0].TotalTerpenuhiSandang)
    //var chart = new apexChart(document.querySelector("chartTotal"), this.chartOptions)

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

    // ApexCharts.exec('stackedChart','appendData',
    //   [{
    //     name: 'Kebutuhan',
    //     data: dataKebutuhan
    // },
    // {
    //     name: 'Terpenuhi',
    //     data: dataTerpenuhi
    // }])
    //ApexCharts.exec('stackedChart','updateSeries',this.compData)
    console.log('******this.compData')
    console.log(this.compData)
    this.series = this.compData

    console.log('******** this.series')
    console.log(this.series)

  })

  },

  // onDetailObat(){
  // console.log("View Detail Obat Click")
  // this.$router.push(`/volunteer/viewNeeds`)
  // },

  // onDetailPangan(){
  // console.log("View Detail Pangan Click")
  // this.$router.push(`/volunteer/viewNeeds`)
  // },

  // onDetailSandang(){
  // console.log("View Detail Sandang Click")
  // this.$router.push(`/volunteer/viewNeeds`)
  // },
  
  onDetailObat(locId) {
    console.log("View Detail Obat Click");
    this.$router.push(`/volunteer/viewNeeds?locId=${locId}`);
  },

  onDetailPangan(locId) {
    console.log("View Detail Pangan Click");
    this.$router.push(`/volunteer/viewNeeds?locId=${locId}`);
  },

  onDetailSandang(locId) {
    console.log("View Detail Sandang Click");
    this.$router.push(`/volunteer/viewNeeds?locId=${locId}`);
  },

  async getEvacLocationByDisasterId(){
      console.log('getEvacLocationByDisasterId - called' )
    
      const payload = {
        "disasterId" : this.disasterId,
      }
      console.log("Reports.vue-getEvacLocationByDisasterId")
      console.log(payload)

      await api
        .post('/admin/getEvacLocationDisasterId', payload )
        .then(async (response)=>{
        const resp = response.data;
          // this.evacs = resp.map((item) => ({
          //   id: item.id,
          //   evacName: item.evacName,
          //   alamat: item.alamat,
          //   kecamatan: item.kecamatan,
          //   rt: item.rt,
          //   rw: item.rw,
          //   namaPetugas: item.namaPetugas,
          //   nomorPetugas: item.nomorPetugas,
          // }));
       

          console.log('*******resp')
          console.log(this.evacs.length)
          console.log(resp)
          console.log(resp[0].alamat)

        
          
          for(let i=0; i<resp.length; i++){
            let locId=resp[i].id

            let waitComplete = await this.updateChart(locId);
            
          }
         // this.series.splice(0,2)

          for(let i=0; i<resp.length; i++){
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
              nomorPetugas:resp[i].nomorPetugas
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

  mounted()
  {
      console.log("disasterID view")
    //   console.log(this.$route.query)
      this.disasterId = this.$route.query.disasterId
      this.locId = this.$route.query.locId
      this.dataAvailable = 0

      this.getEvacLocationByDisasterId()
      this.dataAvailable = 1
    
  },
  setup(){
      
  }
 
}

</script>

<style>
.card-container {
  gap: 1rem;
  margin-top: 24px;
  margin-bottom: 24px;
}

.card-container > .q-card {
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
