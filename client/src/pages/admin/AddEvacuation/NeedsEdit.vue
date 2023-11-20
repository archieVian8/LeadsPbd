<template>
  <q-layout view="hHh lpR fF2">
    <q-page class="main-page">
      <div clas="q-mt-md">
        <q-form>
          <q-stepper v-model="step" ref="stepper" active-color="orange" done-color="orange" class="my-stepper"
            done-icon="fa-solid fa-check" contracted flat animated>
            
            <q-step :name="1" icon="fa-solid fa-1" :done="step > 1" class="q-px-lg">
              <p class="text-h6 text-weight-bold q-mt-sm q-mb-md">Edit Kebutuhan Obat</p>
              <div v-if="!addMedicineFlag" class="row justify-between q-mb-md" v-for="(medicine) in medicines">
                <q-input outlined v-model="medicine.medicineName" color="orange"/>
                <q-input outlined v-model="medicine.medicineNameQuantity" color="orange"/>
                <div>
                  <q-btn class="q-mt-md q-px-sm" outline color="black" label="Update" 
                  @click="updateMedicineItem(`${medicine.id}`,`${medicine.disasterId}`,`${medicine.locId}`,`${medicine.medicineName}`,`${medicine.medicineNameQuantity}`,`${medicine.medicineNameProgressQuantity}`)"/>
                </div>
              </div>

              <q-form @submit="addMedicine()" v-if="addMedicineFlag">
                <div>
                  <p class="text-weight-bold q-mb-sm">Nama Obat</p>
                  <q-input outlined v-model="medicineName" :rules="[val => (val && val.length > 0) || '']" color="orange"
                    placeholder="Nama Obat" />
                </div>
                <div>
                  <p class="text-weight-bold q-mb-sm">Kuantitas Obat</p>
                  <q-input outlined v-model="medicineNameQuantity" :rules="[val => (val && val.length > 0) || '']"
                    color="orange" placeholder="Kuantitas Obat" />
                </div>
                <div class="row justify-between items-center">
                  <q-btn outline class="outline-button col-5 q-mt-md q-mb-lg" label="Batal"
                    @click="addMedicineFlag = false" no-caps />
                  <q-btn flat class="flat-button col-5 q-mt-md q-mb-lg" type="submit" label="Simpan" no-caps />
                </div>
              </q-form>
              <div v-if="!addMedicineFlag">
                <q-btn class="q-mt-md q-px-sm" outline color="black" label="Tambahkan Obat" no-caps
                  @click="addMedicineFlag = true" />
              </div>
            </q-step>

            <q-step :name="2" icon="fa-solid fa-2" :done="step > 2" class="q-px-lg">
              <p class="text-h6 text-weigh-bold q-mb-md q-mt-sm">Edit Kebutuhan Pangan</p>
              <div v-if="!addFoodsFlag" class="row justify-between q-mb-md" v-for="(food) in foods">
                <q-input outlined v-model="food.foodsName" color="orange"/>
                <q-input outlined v-model="food.foodsNameQuantity" color="orange"/>
                <div>
                  <q-btn class="q-mt-md q-px-sm" outline color="black" label="Update" 
                  @click="updateFoodsItem(`${food.id}`,`${food.disasterId}`,`${food.locId}`,`${food.foodsName}`,`${food.foodsNameQuantity}`,`${food.foodsNameProgressQuantity}`)"/>
                </div>
              </div>

              <q-form @submit="addFoods()" v-if="addFoodsFlag">
                <div>
                  <p class="text-weight-bold q-mb-sm">Nama Pangan</p>
                  <q-input outlined v-model="foodsName" :rules="[val => (val && val.length > 0) || '']" color="orange"
                    placeholder="Nama Pangan" />
                </div>
                <div>
                  <p class="text-weight-bold q-mb-sm">Kuantitas Pangan</p>
                  <q-input outlined v-model="foodsNameQuantity" :rules="[val => (val && val.length > 0) || '']"
                    color="orange" placeholder="Kuantitas Pangan" />
                </div>
                <div class="row justify-between items-center">
                  <q-btn outline class="outline-button col-5 q-mt-md q-mb-lg" label="Batal" @click="addFoodsFlag = false"
                    no-caps />
                  <q-btn flat class="flat-button col-5 q-mt-md q-mb-lg" type="submit" label="Simpan" no-caps />
                </div>
              </q-form>
              <div v-if="!addFoodsFlag">
                <q-btn class="q-mt-md q-px-sm" outline color="black" label="Tambahkan Pangan" no-caps
                  @click="addFoodsFlag = true" />
              </div>
            </q-step>

            <q-step :name="3" icon="fa-solid fa-3" :done="step > 3" class="q-px-lg">
              <p class="text-h6 text-weight-bold q-mt-sm q-mb-md">Edit Kebutuhan Sandang</p>
              <div v-if="!addClothingFlag" class="row justify-between q-mb-md" v-for="(clothing) in clothings">
                <q-input outlined v-model="clothing.clothingName" color="orange"/>
                <q-input outlined v-model="clothing.clothingNameQuantity" color="orange"/>
                <div>
                  <q-btn class="q-mt-md q-px-sm" outline color="black" label="Update" 
                  @click="updateClothingItem(`${clothing.id}`,`${clothing.disasterId}`,`${clothing.locId}`,`${clothing.clothingName}`,`${clothing.clothingNameQuantity}`,`${clothing.clothingNameProgressQuantity}`)"/>
                </div>
              </div>

              <q-form @submit="addClothing()" v-if="addClothingFlag">
                <div>
                  <p class="text-weight-bold q-mb-sm">Nama Sandang</p>
                  <q-input outlined v-model="clothingName" :rules="[val => (val && val.length > 0) || '']" color="orange"
                    placeholder="Nama Sandang" />
                </div>
                <div>
                  <p class="text-weight-bold q-mb-sm">Kuantitas Sandang</p>
                  <q-input outlined v-model="clothingNameQuantity" :rules="[val => (val && val.length > 0) || '']"
                    color="orange" placeholder="Kuantitas Sandang" />
                </div>
                <div class="row justify-between items-center">
                  <q-btn outline class="outline-button col-5 q-mt-md q-mb-lg" label="Batal"
                    @click="addClothingFlag = false" no-caps />
                  <q-btn flat class="flat-button col-5 q-mt-md q-mb-lg" type="submit" label="Simpan" no-caps />
                </div>
              </q-form>
              <div v-if="!addClothingFlag">
                <q-btn class="q-mt-md q-px-sm" outline color="black" label="Tambahkan Sandang" no-caps
                  @click="addClothingFlag = true" />
              </div>
            </q-step>

            <template v-slot:navigation v-if="!addClothingFlag && !addFoodsFlag && !addMedicineFlag">
              <q-stepper-navigation class="q-mt-md">
                <div class="row justify-between items-center">
                  <!-- <q-btn outline label="Kembali" class="outline-button col-5 poppins-r bt-width" v-if="step == 1"
                    align="center" no-caps :to="`/admin/evacuation/disaster-id?disasterId=${disasterId}`" /> -->
                  <q-btn flat v-if="step == 1" class="flat-button col-5 poppins-r" no-caps @click="$refs.stepper.next()"
                    label="Selanjutnya" unelevated />
                </div>
                <div class="row justify-between q-mt-md" v-if="step > 1">
                  <q-btn outline @click="$refs.stepper.previous()" label="Kembali"
                    class="outline-button col-5 poppins-r bt-width" align="center" no-caps unelevated stretch />

                  <q-btn flat class="flat-button col-5 poppins-r bt-width" v-if="step > 1 && step < 3" no-caps
                    @click="$refs.stepper.next()" label="Selanjutnya" align="center" unelevated stretch />

                  <!-- <q-btn flat class="flat-button col-5 poppins-r bt-width" v-if="step > 2 && step < 5" no-caps
                    @click="$refs.stepper.next()" label="Selanjutnya" align="center" unelevated stretch /> -->
                  <q-btn flat class="flat-button col-5 poppins-r bt-width" v-if="step == 3" no-caps label="Simpan"
                    @click="submitData()" align="center" unelevated stretch />
                  <!-- <q-btn flat v-if="step == 2" class="flat-button col-5 poppins-r" no-caps @click="saveAndContinue()"
                    label="Simpan" unelevated /> -->
                    
                </div>
              </q-stepper-navigation>
            </template>
          </q-stepper>
        </q-form>
      </div>
    </q-page>
  </q-layout>
</template>

<script>
import { ref } from 'vue'
import { api } from 'boot/axios'
import { Notify, useQuasar } from 'quasar'

const $q = useQuasar();

export default {
  name: 'EvacuationID',

  data() {
    return {

      // stepper 3 (Medicine)
      disasterId: "",
      locId: "",
      evacName: "",
      alamat: "",
      kecamatan: "",
      rt: "",
      rw: "",
      namaPetugas: "",
      nomorPetugas: "",
      medicineName: "",
      medicineNameQuantity: "",
      addMedicineFlag: false,
      medicines: [],

      // stepper 4 (Foods)
      disasterId: "",
      locId: "",
      evacName: "",
      alamat: "",
      kecamatan: "",
      rt: "",
      rw: "",
      namaPetugas: "",
      nomorPetugas: "",
      foodsName: "",
      foodsNameQuantity: "",
      addFoodsFlag: false,
      foods: [],

      // stepper 5 (Clothing)
      disasterId: "",
      locId: "",
      evacName: "",
      alamat: "",
      kecamatan: "",
      rt: "",
      rw: "",
      namaPetugas: "",
      nomorPetugas: "",
      clothingName: "",
      clothingNameQuantity: "",
      addClothingFlag: false,
      clothings: [],
    }
  },

  setup() {
    return {
      model: ref(0),
      step: ref(1),
      text: ref(''),
    }
  },

  methods: {
    // async saveData() {
    //   console.log("saved data is called");
    //   await this.addVictim();
    // },

    async submitData() {
      console.log("submit data is called");
      // await this.addVictim();
      Notify.create({
        color: 'green',
        message: 'Berhasil menambahkan data',
        position: 'top',
        timeout: 2500
      });
      this.$router.push(`/admin/evacuation?Uid=${this.Uid}&Uname=${this.Uname}`)
    },


    // saveAndContinue() {
    //   this.$q.dialog({
    //     title: 'Peringatan',
    //     message: 'Semua data yang kamu masukan akan disimpan, pastikan semua data yang kamu masukan sudah benar',
    //     ok: {
    //       push: true,
    //       color: 'orange',
    //       label: 'Simpan',
    //       outline: true,
    //       noCaps: true
    //     },
    //     cancel: {
    //       push: true,
    //       color: 'orange',
    //       flat: true,
    //       label: 'Kembali',
    //       noCaps: true
    //     },
    //     persistent: true
    //   }).onOk(async () => {
    //     await this.saveData();
    //     this.step = 3;
    //   });
    // },

    async addMedicine() {
      this.addMedicineFlag = false;
      console.log("addMedicineCalled");
      const payload = {
        disasterId: this.disasterId,
        locId: this.locId,
        evacName: this.evacName,
        alamat: this.alamat,
        kecamatan: this.kecamatan,
        rt: this.rt,
        rw: this.rw,
        namaPetugas: this.namaPetugas,
        nomorPetugas: this.nomorPetugas,
        medicineName: this.medicineName,
        medicineNameQuantity: this.medicineNameQuantity,
        medicineNameMinusQuantity: this.medicineNameQuantity,
        medicineNameProgressQuantity: 0
      };
      try {
        const response = await api.post('/admin/addMedicine', payload);
        this.medicineName = "";
        this.medicineNameQuantity = "";
        await this.getMedicineByLocationId();
      } catch (error) {
        console.error(error);
        Notify.create({
          color: 'red',
          message: 'Gagal menambahkan obat silahkan coba lagi',
          position: 'top',
          timeout: 2500
        });
      }
    },

    async getMedicineByLocationId() {
      console.log('getMedicineByLocationId - called');
      try {
        const payload = {
          locId: this.locId
        };
        const response = await api.post('/admin/getMedicineByLocationId', payload);
        this.medicines = response.data.map(item => ({
          id: item.id,
          disasterId: item.disasterId,
          locId: item.locId,
          medicineId: item.medicineId,
          medicineName: item.medicineName,
          medicineNameQuantity: item.medicineNameQuantity,
          medicineNameProgressQuantity: item.medicineNameProgressQuantity

        })).reverse();
      } catch (error) {
        console.error(error);
        Notify.create({
          color: 'red',
          message: 'Gagal mengambil data silahkan restart aplikasi',
          position: 'top',
          timeout: 2500
        });
      }
    },

    async updateMedicineItem(id, disasterId, locId, medicineName,medicineNameQuantity, medicineNameProgressQuantity ) {
      console.log("updateMedicineItem");

      let medicineNameMinusQuantity = medicineNameQuantity - medicineNameProgressQuantity
      const payload = {
        id: id,
        disasterId: disasterId,
        locId: locId,
        medicineName: medicineName,
        medicineNameQuantity: medicineNameQuantity,
        medicineNameMinusQuantity: medicineNameMinusQuantity
      };
      console.log("****Update Medicine Payload");
      console.log(payload);
      try {
        const response = await api.post('/admin/updateMedicineItem', payload);
      } catch (error) {
        console.error(error);
        Notify.create({
          color: 'red',
          message: 'Gagal update obat silahkan coba lagi',
          position: 'top',
          timeout: 2500
        });
      }
    },

    async addFoods() {
      this.addFoodsFlag = false;
      console.log("addFoodsCalled");
      const payload = {
        disasterId: this.disasterId,
        locId: this.locId,
        evacName: this.evacName,
        alamat: this.alamat,
        kecamatan: this.kecamatan,
        rt: this.rt,
        rw: this.rw,
        namaPetugas: this.namaPetugas,
        nomorPetugas: this.nomorPetugas,
        foodsName: this.foodsName,
        foodsNameQuantity: this.foodsNameQuantity,
        foodsNameMinusQuantity: this.foodsNameQuantity,
        foodsNameProgressQuantity: 0
      };
      try {
        const response = await api.post('/admin/addFoods', payload);
        this.foodsName = "";
        this.foodsNameQuantity = "";
        await this.getFoodsByLocationId();
      } catch (error) {
        console.error(error);
        Notify.create({
          color: 'red',
          message: 'Gagal menambahkan pangan silahkan coba lagi',
          position: 'top',
          timeout: 2500
        });
      }
    },

    async getFoodsByLocationId() {
      console.log('getFoodsByLocationId - called');
      try {
        const payload = {
          locId: this.locId
        };
        const response = await api.post('/admin/getFoodsByLocationId', payload);
        this.foods = response.data.map(item => ({
          id: item.id,
          disasterId: item.disasterId,
          locId: item.locId,
          foodsName: item.foodsName,
          foodsNameQuantity: item.foodsNameQuantity,
          foodsNameProgressQuantity: item.foodsNameProgressQuantity

        })).reverse();
      } catch (error) {
        console.error(error);
        Notify.create({
          color: 'red',
          message: 'Gagal mengambil data silahkan restart aplikasi',
          position: 'top',
          timeout: 2500
        });
      }
    },

    async updateFoodsItem(id, disasterId, locId, foodsName,foodsNameQuantity, foodsNameProgressQuantity) {
      console.log("updateFoodsItem");

      let foodsNameMinusQuantity = foodsNameQuantity - foodsNameProgressQuantity
      const payload = {
        id: id,
        disasterId: disasterId,
        locId: locId,
        foodsName: foodsName,
        foodsNameQuantity: foodsNameQuantity,
        foodsNameMinusQuantity:foodsNameMinusQuantity
      };
      console.log(payload);
      try {
        const response = await api.post('/admin/updateFoodsItem', payload);
      } catch (error) {
        console.error(error);
        Notify.create({
          color: 'red',
          message: 'Gagal update pangan silahkan coba lagi',
          position: 'top',
          timeout: 2500
        });
      }
    },

    async addClothing() {
      this.addClothingFlag = false;
      console.log("addClothingCalled");
      console.log(this.clothingName);
      const payload = {
        disasterId: this.disasterId,
        locId: this.locId,
        evacName: this.evacName,
        alamat: this.alamat,
        kecamatan: this.kecamatan,
        rt: this.rt,
        rw: this.rw,
        namaPetugas: this.namaPetugas,
        nomorPetugas: this.nomorPetugas,
        clothingName: this.clothingName,
        clothingNameQuantity: this.clothingNameQuantity,
        clothingNameMinusQuantity: this.clothingNameQuantity,
        clothingNameProgressQuantity: 0
      };
      try {
        const response = await api.post('/admin/addClothing', payload);
        this.clothingName = "";
        this.clothingNameQuantity = "";
        await this.getClothingByLocationId();
      } catch (error) {
        console.error(error);
        Notify.create({
          color: 'red',
          message: 'Gagal menambahkan sandang silahkan coba lagi',
          position: 'top',
          timeout: 2500
        });
      }
    },

    async getClothingByLocationId() {
      console.log('getClothingByLocationId - called');
      try {
        const payload = {
          locId: this.locId
        };
        const response = await api.post('/admin/getClothingByLocationId', payload);
        this.clothings = response.data.map(item => ({
          id: item.id,
          disasterId: item.disasterId,
          locId: item.locId,
          clothingName: item.clothingName,
          clothingNameQuantity: item.clothingNameQuantity,
          clothingNameProgressQuantity: item.clothingNameProgressQuantity

        })).reverse();
      } catch (error) {
        console.error(error);
        Notify.create({
          color: 'red',
          message: 'Gagal mengambil data silahkan restart aplikasi',
          position: 'top',
          timeout: 2500
        });
      }
    },

    async updateClothingItem(id, disasterId, locId, clothingName, clothingNameQuantity, clothingNameProgressQuantity) {
      console.log("updateClothingItem");

      let clothingNameMinusQuantity = clothingNameQuantity - clothingNameProgressQuantity
      const payload = {
        id: id,
        disasterId: disasterId,
        locId: locId,
        clothingName: clothingName,
        clothingNameQuantity: clothingNameQuantity,
        clothingNameMinusQuantity: clothingNameMinusQuantity
      };
      console.log(payload);
      try {
        const response = await api.post('/admin/updateClothingItem', payload);
      } catch (error) {
        console.error(error);
        Notify.create({
          color: 'red',
          message: 'Gagal update sandang silahkan coba lagi',
          position: 'top',
          timeout: 2500
        });
      }
    }

  },

  async mounted() {
    console.log("evacuationId test");

    console.log(this.$route.query);
    this.Uid = this.$route.query.Uid;
    this.Uname = this.$route.query.Uname;
    this.disasterId = this.$route.query.disasterId;
    this.locId = this.$route.query.locId;
    this.evacName = this.$route.query.evacName;
    this.alamat = this.$route.query.alamat;
    this.kecamatan = this.$route.query.kecamatan;
    this.rt = this.$route.query.rt;
    this.rw = this.$route.query.rw;
    this.namaPetugas = this.$route.query.namaPetugas;
    this.nomorPetugas = this.$route.query.nomorPetugas;

    await this.getMedicineByLocationId();
    await this.getFoodsByLocationId();
    await this.getClothingByLocationId();
  }
}

</script>

<style>
.my-stepper .q-stepper__step-inner {
  padding: 0px;
  padding-top: 0px;
  padding-bottom: 8px;
}

.flat-button {
  width: 100%;
  min-height: 42px;
  background-color: #F97C21;
  color: white;
}

.outline-button {
  width: 100%;
  min-height: 42px;
  color: #F97C21;
  font-weight: bolder;
}

.supply-container {
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #000;
}
</style>
