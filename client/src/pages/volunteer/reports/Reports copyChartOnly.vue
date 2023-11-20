<template>
  <q-layout view="hHr LpR lFf">
    <p class="poppins-md q-mt-md q-ml-md text-capitalize text-h5">Perkembangan Kebutuhan Setiap Lokasi Evakuasi</p>
    <q-page padding>
      <chartProgress>
      </chartProgress>    
    </q-page>
  </q-layout>
</template>

<script>
import { ref } from 'vue'
import {api} from 'boot/axios'
import {useRouter} from 'vue-router'

import { defineComponent , defineAsyncComponent } from 'vue';


var chartProgress = defineAsyncComponent(() =>
import('src/components/charts/chartProgress.vue')
)

export default defineComponent({
  name: 'LineCharts',
  components:{
    chartProgress,
  },
  

})

// export default {


// setup () {

//   //const locId=0

//   //const router = useRouter()


//   return {
    
//     //onEditMedicine
//     //  onEditFoods,
//     //  onEditClothing,
//   }

// },

// data() {
//   return{
//    evacs: [],
//   };
// },

// methods: {
//   onDetailObat(){
//   console.log("View Detail Obat Click")
//   this.$router.push(`/volunteer/viewNeeds`)
//   },

//   onDetailPangan(){
//   console.log("View Detail Pangan Click")
//   },

//   onDetailSandang(){
//   console.log("View Detail Sandang Click")
//   },

//   async getEvacLocationByDisasterId(){
//       console.log('getEvacLocationByDisasterId - called' )
    
//       const payload = {
//         "disasterId" : this.disasterId,
//       }
//       console.log("Reports.vue-getEvacLocationByDisasterId")
//       console.log(payload)

//       await api
//         .post('/admin/getEvacLocationDisasterId', payload )
//         .then((response)=>{
//         const resp = response.data;
//           this.evacs = resp.map((item) => ({
//             id: item.id,
//             evacName: item.evacName,
//             alamat: item.alamat,
//             kecamatan: item.kecamatan,
//             rt: item.rt,
//             rw: item.rw,
//             namaPetugas: item.namaPetugas,
//             nomorPetugas: item.nomorPetugas,
//           }));
//       })
//       .catch((err) => {
//           console.error(err);
//         });
//     },
// },

// mounted()
// {
//     console.log("disasterID view")
//     console.log(this.$route.query)
//     this.disasterId = this.$route.query.disasterId
//     this.locId = this.$route.query.locId
//     console.log("this locId")
//     // console.log(this.locId)

//     this.getEvacLocationByDisasterId()
//   }

// }

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
