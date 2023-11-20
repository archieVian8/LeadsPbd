<template>
  <q-page padding>
    <p class="q-mb-none q-mx-md text-subtitle1 text-weight-bold">Kebutuhan Setiap Lokasi Evakuasi</p>
    <div class="q-pa-md">

      <q-table v-if="type === 'medicine'" flat bordered title="Obat" :rows="medRows" :columns="medColumns" row-key="id"
        :visible-columns="visibleMedicineColumns">
        <template v-slot:top="props">
          <div class="col-2 q-table__title">Obat</div>
          <q-space />

          <div v-if="$q.screen.gt.xs" class="col">
            <q-toggle v-model="visibleMedicineColumns" val="namaObat" label="Nama Obat" />
            <q-toggle v-model="visibleMedicineColumns" val="kebutuhanAwal" label="Kebutuhan Awal" />
            <q-toggle v-model="visibleMedicineColumns" val="terpenuhi" label="Terpenuhi" />
            <q-toggle v-model="visibleMedicineColumns" val="sisaKebutuhan" label="Sisa Kebutuhan" />
          </div>
          <q-select v-else v-model="visibleMedicineColumns" multiple borderless dense options-dense
            :display-value="$q.lang.table.columns" emit-value map-options :options="medColumns" option-value="name"
            style="min-width: 150px" />

          <q-btn flat round dense :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
            @click="props.toggleFullscreen" class="q-ml-md" />

        </template>

        <template v-slot:body-cell-actions="props">
          <q-td :props="props">
            <q-btn color="primary" label="Bantu" @click="onEditMedicine(props.row)"></q-btn>
          </q-td>
        </template>

      </q-table>

      <q-table v-if="type === 'food'" flat bordered title="Foods" :rows="foodsRows" :columns="foodsColumns" row-key="id"
        :visible-columns="visibleFoodsColumns">
        <template v-slot:top="props">
          <div class="col-2 q-table__title">Pangan</div>
          <q-space />

          <div v-if="$q.screen.gt.xs" class="col">
            <q-toggle v-model="visibleFoodsColumns" val="namaMakanan" label="Nama Makanan" />
            <q-toggle v-model="visibleFoodsColumns" val="kebutuhanAwal" label="Kebutuhan Awal" />
            <q-toggle v-model="visibleFoodsColumns" val="terpenuhi" label="Terpenuhi" />
            <q-toggle v-model="visibleFoodsColumns" val="sisaKebutuhan" label="Sisa Kebutuhan" />
          </div>
          <q-select v-else v-model="visibleFoodsColumns" multiple borderless dense options-dense
            :display-value="$q.lang.table.columns" emit-value map-options :options="foodsColumns" option-value="name"
            style="min-width: 150px" />

          <q-btn flat round dense :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
            @click="props.toggleFullscreen" class="q-ml-md" />

        </template>

        <template v-slot:body-cell-actions="props">
          <q-td :props="props">
            <q-btn color="primary" label="Bantu" @click="onEditFoods(props.row)"></q-btn>
          </q-td>
        </template>

      </q-table>

      <q-table v-if="type === 'clothing'" flat bordered title="Clothing" :rows="clothingRows" :columns="clothingColumns" row-key="id"
        :visible-columns="visibleClothingColumns">
        <template v-slot:top="props">
          <div class="col-2 q-table__title">Sandang</div>
          <q-space />

          <div v-if="$q.screen.gt.xs" class="col">
            <q-toggle v-model="visibleClothingColumns" val="namaPakaian" label="Nama Pakaian" />
            <q-toggle v-model="visibleClothingColumns" val="kebutuhanAwal" label="Kebutuhan Awal" />
            <q-toggle v-model="visibleClothingColumns" val="terpenuhi" label="Terpenuhi" />
            <q-toggle v-model="visibleClothingColumns" val="sisaKebutuhan" label="Sisa Kebutuhan" />
          </div>
          <q-select v-else v-model="visibleClothingColumns" multiple borderless dense options-dense
            :display-value="$q.lang.table.columns" emit-value map-options :options="clothingColumns" option-value="name"
            style="min-width: 150px" />

          <q-btn flat round dense :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
            @click="props.toggleFullscreen" class="q-ml-md" />

        </template>

        <template v-slot:body-cell-actions="props">
          <q-td :props="props">
            <q-btn color="primary" label="Bantu" @click="onEditClothing(props.row)"></q-btn>
          </q-td>
        </template>

      </q-table>

    </div>
  </q-page>
</template>

<script>
import { ref } from 'vue'
import { api } from 'boot/axios'
import { useRouter } from 'vue-router'

const medColumnsConst = [
  {
    name: 'name',
    required: true,
    label: 'Nama Lokasi Evakuasi',
    align: 'left',
    field: row => row.evacName,
    format: val => `${val}`,
    sortable: true
  },
  { name: 'actions', label: 'Bantuan', required: true },
  { name: 'namaObat', align: 'center', label: 'Nama Obat', field: row => row.medicineName },
  { name: 'kebutuhanAwal', label: 'Kebutuhan Awal', field: row => row.medicineNameQuantity, sortable: true },
  { name: 'terpenuhi', label: 'Terpenuhi', field: row => row.medicineNameProgressQuantity, sortable: true },
  { name: 'sisaKebutuhan', label: 'Sisa Kebutuhan', field: row => row.medicineNameMinusQuantity, sortable: true }
]

const foodsColumnsConst = [
  {
    name: 'name',
    required: true,
    label: 'Nama Lokasi Evakuasi',
    align: 'left',
    field: row => row.evacName,
    format: val => `${val}`,
    sortable: true
  },
  { name: 'actions', label: 'Bantuan', required: true },
  { name: 'namaMakanan', align: 'center', label: 'Nama Makanan', field: row => row.foodsName },
  { name: 'kebutuhanAwal', label: 'Kebutuhan Awal', field: row => row.foodsNameQuantity, sortable: true },
  { name: 'terpenuhi', label: 'Terpenuhi', field: row => row.foodsNameProgressQuantity, sortable: true },
  { name: 'sisaKebutuhan', label: 'Sisa Kebutuhan', field: row => row.foodsNameMinusQuantity, sortable: true }
]

const clothingColumnsConst = [
  {
    name: 'name',
    required: true,
    label: 'Nama Lokasi Evakuasi',
    align: 'left',
    field: row => row.evacName,
    format: val => `${val}`,
    sortable: true
  },
  { name: 'actions', label: 'Bantuan', required: true },
  { name: 'namaPakaian', align: 'center', label: 'Nama Pakaian', field: row => row.clothingName },
  { name: 'kebutuhanAwal', label: 'Kebutuhan Awal', field: row => row.clothingNameQuantity, sortable: true },
  { name: 'terpenuhi', label: 'Terpenuhi', field: row => row.clothingNameProgressQuantity, sortable: true },
  { name: 'sisaKebutuhan', label: 'Sisa Kebutuhan', field: row => row.clothingNameMinusQuantity, sortable: true }
]
export default {


  setup() {
    return {
      visibleMedicineColumns: ref(['namaObat', 'kebutuhanAwal', 'terpenuhi', 'sisaKebutuhan', 'status', 'donate']),
      visibleFoodsColumns: ref(['namaMakanan', 'kebutuhanAwal', 'terpenuhi', 'sisaKebutuhan', 'status', 'donate']),
      visibleClothingColumns: ref(['namaPakaian', 'kebutuhanAwal', 'terpenuhi', 'sisaKebutuhan', 'status', 'donate']),
    }
  },

  data() {
    return {
      medColumns: [],
      medRows: [],
      medQuantity: 0,
      foodsColumns: [],
      foodsRows: [],
      clothingColumns: [],
      clothingRows: [],
      locId: 0,
      type: ''
    }
  },

  methods: {
    onEditMedicine(row) {
      console.log("Edit Medicine Click")
      this.$router.push(`/volunteer/donateEvac?type=medicine&itemId=${row.id}&locId=${this.locId}&evacName=${row.evacName}&itemName=${row.medicineName}&minusQuantity=${row.medicineNameMinusQuantity}&Uid=${this.Uid}&Uname=${this.Uname}`)
    },

    onEditFoods(row) {
      console.log("Edit Foods Click")
      this.$router.push(`/volunteer/donateEvac?type=food&itemId=${row.id}&locId=${this.locId}&evacName=${row.evacName}&itemName=${row.foodsName}&minusQuantity=${row.foodsNameMinusQuantity}&Uid=${this.Uid}&Uname=${this.Uname}`)
    },

    onEditClothing(row) {
      console.log("Edit Clothing Click")
      this.$router.push(`/volunteer/donateEvac?type=clothing&itemId=${row.id}&locId=${this.locId}&evacName=${row.evacName}&itemName=${row.clothingName}&minusQuantity=${row.clothingNameMinusQuantity}&Uid=${this.Uid}&Uname=${this.Uname}`)
    },

    async getMedicineByLocationId() {
      console.log('getMedicineByLocationId - called')
      console.log(this.locId)
      const payload = {
        "locId": this.locId,
      }
      console.log("viewNeeds.vue-getMedicineByLocationId")
      console.log(payload)

      await api.post('/admin/getMedicineByLocationId', payload).then((response) => {
        console.log(response)
        this.medRows = response.data
        console.log("medRows : ")
        console.log(this.medRows)
        console.log("medQuantity : ")
        console.log(this.medQuantity)
      })
    },
    async getFoodsByLocationId() {
      console.log('getFoodsByLocationId - called')

      const payload = {
        "locId": this.locId,
      }
      console.log("viewNeeds.vue-getFoodsByLocationId")
      console.log(payload)

      await api.post('/admin/getFoodsByLocationId', payload).then((response) => {
        console.log(response)
        this.foodsRows = response.data
      })
    },
    async getClothingByLocationId() {
      console.log('getClothingByLocationId - called')
      const payload = {
        "locId": this.locId,
      }
      console.log("viewNeeds.vue-getClothingByLocationId")
      console.log(payload)

      await api.post('/admin/getClothingByLocationId', payload).then((response) => {
        console.log(response)
        this.clothingRows = response.data
      })
    },
  },

  mounted() {
    this.Uid = this.$route.query.Uid;
    this.Uname = this.$route.query.Uname;
    this.disasterId = this.$route.query.disasterId
    this.locId = this.$route.query.locId
    this.type = this.$route.query.type

    this.getMedicineByLocationId()
    this.medColumns = medColumnsConst

    this.getFoodsByLocationId()
    this.foodsColumns = foodsColumnsConst

    this.getClothingByLocationId()
    this.clothingColumns = clothingColumnsConst

  }
}

</script>
