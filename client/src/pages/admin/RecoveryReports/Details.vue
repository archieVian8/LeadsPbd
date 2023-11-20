<template>
  <q-page padding style="height: 1250px;">
    <div class="row items-center">
      <q-btn unelevated round color=#E2E8F0 icon="img:icons/admin/AddDisaster/arrow-left.svg"
      @click="backAdmin()"/>
      <p class="q-mb-none text-subtitle1 text-weight-bold">Detail Kebutuhan Setiap Lokasi Evakuasi</p>
    </div>
    <!-- <p class="poppins-md q-mt-md q-ml-md text-capitalize text-h5"> Kebutuhan Setiap Lokasi Evakuasi </p> -->

  <div class="q-pa-md">

  <q-table
    flat bordered
    title="Obat"
    :rows="medRows"
    :columns="medColumns"
    row-key="id"
    :visible-columns="visibleMedicineColumns"
  >
  <template v-slot:top="props">
      <div class="col-2 q-table__title">Obat</div>
      <q-space />

      <div v-if="$q.screen.gt.xs" class="col">
        <q-toggle v-model="visibleMedicineColumns" val="namaObat" label="Nama Obat" />
        <q-toggle v-model="visibleMedicineColumns" val="kebutuhanAwal" label="Kebutuhan Awal" />
        <q-toggle v-model="visibleMedicineColumns" val="terpenuhi" label="Terpenuhi" />
        <q-toggle v-model="visibleMedicineColumns" val="sisaKebutuhan" label="Sisa Kebutuhan" />
      </div>
      <q-select
        v-else
        v-model="visibleMedicineColumns"
        multiple
        borderless
        dense
        options-dense
        :display-value="$q.lang.table.columns"
        emit-value
        map-options
        :options="medColumns"
        option-value="name"
        style="min-width: 150px"
      />

      <q-btn
        flat round dense
        :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
        @click="props.toggleFullscreen"
        class="q-ml-md"
      />

    </template>
  </q-table>

  <q-table
    flat bordered
    title="Foods"
    :rows="foodsRows"
    :columns="foodsColumns"
    row-key="id"
    :visible-columns="visibleFoodsColumns"
  >
  <template v-slot:top="props">
      <div class="col-2 q-table__title">Pangan</div>
      <q-space />

      <div v-if="$q.screen.gt.xs" class="col">
        <q-toggle v-model="visibleFoodsColumns" val="namaMakanan" label="Nama Makanan" />
        <q-toggle v-model="visibleFoodsColumns" val="kebutuhanAwal" label="Kebutuhan Awal" />
        <q-toggle v-model="visibleFoodsColumns" val="terpenuhi" label="Terpenuhi" />
        <q-toggle v-model="visibleFoodsColumns" val="sisaKebutuhan" label="Sisa Kebutuhan" />
      </div>
      <q-select
        v-else
        v-model="visibleFoodsColumns"
        multiple
        borderless
        dense
        options-dense
        :display-value="$q.lang.table.columns"
        emit-value
        map-options
        :options="foodsColumns"
        option-value="name"
        style="min-width: 150px"
      />

      <q-btn
        flat round dense
        :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
        @click="props.toggleFullscreen"
        class="q-ml-md"
      />

    </template>

    <!-- <template v-slot:body-cell-actions="props">
      <q-td :props="props">
        <q-btn color="primary" label="Bantu" @click="onEditFoods(props.row)"></q-btn>
      </q-td>
    </template> -->

  </q-table>

  <q-table
    flat bordered
    title="Clothing"
    :rows="clothingRows"
    :columns="clothingColumns"
    row-key="id"
    :visible-columns="visibleClothingColumns"
  >
  <template v-slot:top="props">
      <div class="col-2 q-table__title">Sandang</div>
      <q-space />

      <div v-if="$q.screen.gt.xs" class="col">
        <q-toggle v-model="visibleClothingColumns" val="namaPakaian" label="Nama Pakaian" />
        <q-toggle v-model="visibleClothingColumns" val="kebutuhanAwal" label="Kebutuhan Awal" />
        <q-toggle v-model="visibleClothingColumns" val="terpenuhi" label="Terpenuhi" />
        <q-toggle v-model="visibleClothingColumns" val="sisaKebutuhan" label="Sisa Kebutuhan" />
      </div>
      <q-select
        v-else
        v-model="visibleClothingColumns"
        multiple
        borderless
        dense
        options-dense
        :display-value="$q.lang.table.columns"
        emit-value
        map-options
        :options="clothingColumns"
        option-value="name"
        style="min-width: 150px"
      />

      <q-btn
        flat round dense
        :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
        @click="props.toggleFullscreen"
        class="q-ml-md"
      />

    </template>

    <!-- <template v-slot:body-cell-actions="props">
      <q-td :props="props">
        <q-btn color="primary" label="Bantu"
        @click="onEditClothing(props.row)"></q-btn>
      </q-td>
    </template> -->

  </q-table>

  </div>
  </q-page>

</template>

<script>
import { ref } from 'vue'
import {api} from 'boot/axios'
import {useRouter} from 'vue-router'

const medColumnsConst = [
// {
//   name: 'id',
//   required: true,
//   label: 'itemId',
//   align: 'left',
//   field: row => row.id,
//   format: val => `${val}`,
//   sortable: true
// },

{
  name: 'name',
  required: true,
  label: 'Nama Lokasi Evakuasi',
  align: 'left',
  field: row => row.evacName,
  format: val => `${val}`,
  sortable: true
},
// { name: 'actions', label: 'Bantuan', required: true },
{ name: 'namaObat', align: 'center', label: 'Nama Obat', field: row =>row.medicineName},
{ name: 'kebutuhanAwal', label: 'Kebutuhan Awal', field: row =>row.medicineNameQuantity, sortable: true },
{ name: 'terpenuhi', label: 'Terpenuhi', field: row => row.medicineNameProgressQuantity, sortable: true },
{ name: 'sisaKebutuhan', label: 'Sisa Kebutuhan', field: row => row.medicineNameMinusQuantity, sortable: true }
]

const foodsColumnsConst = [
// {
//   name: 'id',
//   required: true,
//   label: 'itemId',
//   align: 'left',
//   field: row => row.id,
//   format: val => `${val}`,
//   sortable: true
// },

{
  name: 'name',
  required: true,
  label: 'Nama Lokasi Evakuasi',
  align: 'left',
  field: row => row.evacName,
  format: val => `${val}`,
  sortable: true
},
// { name: 'actions', label: 'Bantuan', required: true },
{ name: 'namaMakanan', align: 'center', label: 'Nama Makanan', field: row =>row.foodsName},
{ name: 'kebutuhanAwal', label: 'Kebutuhan Awal', field: row =>row.foodsNameQuantity, sortable: true },
{ name: 'terpenuhi', label: 'Terpenuhi', field: row => row.foodsNameProgressQuantity, sortable: true },
{ name: 'sisaKebutuhan', label: 'Sisa Kebutuhan', field: row => row.foodsNameMinusQuantity, sortable: true }
]

const clothingColumnsConst = [
// {
//   name: 'id',
//   required: true,
//   // label: 'itemId',
//   align: 'left',
//   field: row => row.id,
//   format: val => `${val}`,
//   sortable: true
// },

{
  name: 'name',
  required: true,
  label: 'Nama Lokasi Evakuasi',
  align: 'left',
  field: row => row.evacName,
  format: val => `${val}`,
  sortable: true
},
// { name: 'actions', label: 'Bantuan', required: true },
{ name: 'namaPakaian', align: 'center', label: 'Nama Pakaian', field: row =>row.clothingName},
{ name: 'kebutuhanAwal', label: 'Kebutuhan Awal', field: row =>row.clothingNameQuantity, sortable: true },
{ name: 'terpenuhi', label: 'Terpenuhi', field: row => row.clothingNameProgressQuantity, sortable: true },
{ name: 'sisaKebutuhan', label: 'Sisa Kebutuhan', field: row => row.clothingNameMinusQuantity, sortable: true }
]

// const medRows = [
//   {
//     id : "1",
//     locName : "RT1",
//     medicineName: "paracetamol",
//     medicineNameQuantity: "10",
//     medicineNameProgressQuantity: "",
//     medicineNameMinusQuantity: ""
//   },
//   {
//     id : "2",
//     locName : "RT2",
//     medicineName: "paracetamol",
//     medicineNameQuantity: "20",
//     medicineNameProgressQuantity: "",
//     medicineNameMinusQuantity: ""
//   },

// ]
// const router = useRouter()

export default {


setup () {

  //const locId=0

  //const router = useRouter()


  return {
     visibleMedicineColumns: ref([ 'namaObat', 'kebutuhanAwal', 'terpenuhi', 'sisaKebutuhan', 'status','donate' ]),
     visibleFoodsColumns:ref([ 'namaMakanan', 'kebutuhanAwal', 'terpenuhi', 'sisaKebutuhan', 'status','donate' ]),
     visibleClothingColumns:ref([ 'namaPakaian', 'kebutuhanAwal', 'terpenuhi', 'sisaKebutuhan', 'status','donate' ]),
    // router,
    //onEditMedicine
    //  onEditFoods,
    //  onEditClothing,
  }

},

data() {
  return{
    // visibleMedicineColumns: ref([ 'namaObat', 'kebutuhanAwal', 'terpenuhi', 'sisaKebutuhan', 'status','donate' ]),
    medColumns:[],
    medRows:[],
    medQuantity:0,
    foodsColumns:[],
    foodsRows:[],
    clothingColumns:[],
    clothingRows:[],
    locId:0,
  }
},

methods: {
  // async getEvacDetailByLocId(){
  // }
  backAdmin() {
    console.log("View Detail Obat Click");
    this.$router.push(`/admin?&Uid=${this.Uid}&Uname=${this.Uname}`);
  },

  onEditMedicine (row) {
    console.log("Edit Medicine Click")
    // console.log(`Editing row - '${row.id}', evacName - '${row.evacName}, SisaKebutuhan - '${row.medicineNameMinusQuantity} '`)
    // const toPath = this.$route.query.to || '/'
    // this.$router.push(`/volunteer/donateEvac?type=Obat&itemId=${row.id}&disasterId=${this.disasterId}&locId=${this.locId}&evacName=${row.evacName}&itemName=${row.medicineName}&minusQuantity=${row.medicineNameMinusQuantity}`)
    this.$router.push(`/volunteer/donateEvac?type=Obat&itemId=${row.id}&locId=${this.locId}&evacName=${row.evacName}&itemName=${row.medicineName}&minusQuantity=${row.medicineNameMinusQuantity}&Uid=${this.Uid}&Uname=${this.Uname}`)
  },

  onEditFoods (row) {
    console.log("Edit Foods Click")
    //console.log(`Editing row - '${row.id}', evacName - '${row.evacName}, SisaKebutuhan - '${row.foodsNameMinusQuantity} '`)
    // this.$router.push(`/volunteer/donateEvac?type=Pangan&itemId=${row.id}&disasterId=${this.disasterId}&locId=${this.locId}&evacName=${row.evacName}&itemName=${row.foodsName}&minusQuantity=${row.foodsNameMinusQuantity}`)
    this.$router.push(`/volunteer/donateEvac?type=Pangan&itemId=${row.id}&locId=${this.locId}&evacName=${row.evacName}&itemName=${row.foodsName}&minusQuantity=${row.foodsNameMinusQuantity}&Uid=${this.Uid}&Uname=${this.Uname}`)
  },

  onEditClothing (row) {
    console.log("Edit Clothing Click")
    //console.log(`Editing row - '${row.id}', evacName - '${row.evacName}, SisaKebutuhan - '${row.clothingNameMinusQuantity} '`)
    //this.$router.push(`/volunteer/donateEvac?type=Sandang&itemId=${row.id}&disasterId=${this.disasterId}&locId=${this.locId}&evacName=${row.evacName}&itemName=${row.clothingName}&minusQuantity=${row.clothingNameMinusQuantity}`)
    this.$router.push(`/volunteer/donateEvac?type=Sandang&itemId=${row.id}&locId=${this.locId}&evacName=${row.evacName}&itemName=${row.clothingName}&minusQuantity=${row.clothingNameMinusQuantity}&Uid=${this.Uid}&Uname=${this.Uname}`)
  },

  // tes(){
  //   this.$router.push('/volunteer/donateEvac')
  // },

  async getMedicineByLocationId(){
      console.log('getMedicineByLocationId - called' )
      console.log(this.locId)

      //this.medRows = []
      const payload = {
        "locId" : this.locId,
      }
      console.log("viewNeeds.vue-getMedicineByLocationId")
      console.log(payload)

      await api.post('/admin/getMedicineByLocationId', payload ).then((response)=>{
        console.log (response)
         this.medRows =  response.data
        // this.medQuantity = response.data[0].medicineNameQuantity
        console.log ("medRows : ")
        console.log(this.medRows)
        console.log("medQuantity : ")
        console.log(this.medQuantity)
      })
    },
    async getFoodsByLocationId(){
      console.log('getFoodsByLocationId - called' )

      const payload = {
        "locId" : this.locId,
      }
      console.log("viewNeeds.vue-getFoodsByLocationId")
      console.log(payload)

      await api.post('/admin/getFoodsByLocationId', payload ).then((response)=>{
        console.log (response)
         this.foodsRows =  response.data
      })
    },
    async getClothingByLocationId(){
      console.log('getClothingByLocationId - called' )
      //this.medRows = []
      const payload = {
        "locId" : this.locId,
      }
      console.log("viewNeeds.vue-getClothingByLocationId")
      console.log(payload)

      await api.post('/admin/getClothingByLocationId', payload ).then((response)=>{
        console.log (response)
         this.clothingRows =  response.data
        // console.log ("medRows : ")
        // console.log(this.medRows)
      })
    },
},

mounted()
{
    console.log("disasterID view")
    console.log(this.$route.query)

    this.Uid = this.$route.query.Uid;
    this.Uname = this.$route.query.Uname;
    this.disasterId = this.$route.query.disasterId
    this.locId = this.$route.query.locId
    console.log("this locId")
    console.log(this.locId)

    this.getMedicineByLocationId()
    this.medColumns = medColumnsConst

    this.getFoodsByLocationId()
    this.foodsColumns = foodsColumnsConst

    this.getClothingByLocationId()
    this.clothingColumns = clothingColumnsConst

  }
}

</script>
