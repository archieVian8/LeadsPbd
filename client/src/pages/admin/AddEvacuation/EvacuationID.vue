<template>
  <q-layout view="hHh lpR fF2">
    <q-page class="main-page">
      <div clas="q-mt-md">
        <q-form>
          <q-stepper v-model="step" ref="stepper" active-color="orange" done-color="orange" class="my-stepper"
            done-icon="fa-solid fa-check" contracted flat animated>

            <q-step :name="1" icon="fa-solid fa-1" :done="step > 1" class="q-px-lg">
              <p class="text-h6 text-weight-bold q-mt-sm">Detail Korban</p>
              <div>
                <P class="text-weight-bold q-mb-sm q-mt-md">Total Korban Anak (0 - 16 Tahun)</P>
                <q-input outlined v-model="totalChild" placeholder="" color="orange"/>
              </div>
              <div>
                <P class="text-weight-bold q-mb-sm">Total Korban Dewasa (17 - 59 Tahun)</P>
                <q-input outlined v-model="totalAdults" placeholder="" color="orange"/>
              </div>
              <div>
                <P class="text-weight-bold q-mb-sm">Total Korban Lanjut Usia (>60 Tahun)</P>
                <q-input outlined v-model="totalEldery" placeholder="" color="orange"/>
              </div>
              <div>
                <P class="text-weight-bold q-mb-sm">Total Korban Hamil</P>
                <q-input outlined v-model="totalPregnancy" placeholder="" color="orange"/>
              </div>
            </q-step>

            <q-step :name="2" icon="fa-solid fa-2" :done="step > 2" class="q-px-lg">
              <p class="text-h6 text-weight-bold q-mb-none q-mt-sm">Detail Kondisi Korban</p>
              <div>
                <P class="text-weight-bold q-mb-sm q-mt-md">Total Korban Meninggal</P>
                <q-input outlined v-model="totalDeathBody" placeholder="" color="orange"/>
              </div>
              <div>
                <P class="text-weight-bold q-mb-sm">Total Korban Cedera Berat</P>
                <q-input outlined v-model="totalMajorInjury" placeholder="" color="orange"/>
              </div>
              <div>
                <P class="text-weight-bold q-mb-sm">Total Korban Cedera Ringan</P>
                <q-input outlined v-model="totalMinorInjury" placeholder="" color="orange"/>
              </div>
              <div>
                <P class="text-weight-bold q-mb-sm">Total Korban Hilang</P>
                <q-input outlined v-model="totalLost" placeholder="" color="orange"/>
              </div>
              <div>
                <P class="text-weight-bold q-mb-sm">Total Korban Tertampung</P>
                <q-input outlined v-model="totalEvacuated" placeholder="" color="orange"/>
              </div>
            </q-step>

            <q-step :name="3" icon="fa-solid fa-3" :done="step > 3" class="q-px-lg">
              <p class="text-h6 text-weight-bold q-mt-sm q-mb-md">Kebutuhan Obat</p>
              <div v-if="!addMedicineFlag" class="row justify-between q-mb-md" v-for="(medicine) in medicines">
                <div class="supply-container col-8">
                  <p>{{ medicine.medicineName }}</p>
                </div>
                <div class="supply-container text-center col-3">
                  <p>{{ medicine.medicineNameQuantity }}</p>
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

            <q-step :name="4" icon="fa-solid fa-4" :done="step > 4" class="q-px-lg">
              <p class="text-h6 text-weigh-bold q-mb-md q-mt-sm">Kebutuhan Pangan</p>
              <div v-if="!addFoodsFlag" class="row justify-between q-mb-md" v-for="(food) in foods">
                <div class="supply-container col-8">
                  <p>{{ food.foodsName }}</p>
                </div>
                <div class="supply-container text-center col-3">
                  <p>{{ food.foodsNameQuantity }}</p>
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

            <q-step :name="5" icon="fa-solid fa-5" :done="step > 5" class="q-px-lg">
              <p class="text-h6 text-weight-bold q-mt-sm q-mb-md">Kebutuhan Sandang</p>
              <div v-if="!addClothingFlag" class="row justify-between q-mb-md" v-for="(clothing) in clothings">
                <div class="supply-container col-8">
                  <p>{{ clothing.clothingName }}</p>
                </div>
                <div class="supply-container text-center col-3">
                  <p>{{ clothing.clothingNameQuantity }}</p>
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
                  <q-btn outline label="Kembali" class="outline-button col-5 poppins-r bt-width" v-if="step == 1"
                    align="center" no-caps :to="`/admin/evacuation/disaster-id?disasterId=${disasterId}&Uid=${this.Uid}&Uname=${this.Uname}`" />
                  <q-btn flat v-if="step == 1" class="flat-button col-5 poppins-r" no-caps @click="$refs.stepper.next()"
                    label="Selanjutnya" unelevated />
                </div>
                <div class="row justify-between q-mt-md" v-if="step > 1">
                  <q-btn outline @click="$refs.stepper.previous()" label="Kembali"
                    class="outline-button col-5 poppins-r bt-width" align="center" no-caps unelevated stretch />
                  <q-btn flat class="flat-button col-5 poppins-r bt-width" v-if="step > 1 && step < 2" no-caps
                    @click="$refs.stepper.next()" label="Selanjutnya" align="center" unelevated stretch />
                  <q-btn flat class="flat-button col-5 poppins-r bt-width" v-if="step > 2 && step < 5" no-caps
                    @click="$refs.stepper.next()" label="Selanjutnya" align="center" unelevated stretch />
                  <q-btn flat class="flat-button col-5 poppins-r bt-width" v-if="step == 5" no-caps label="Simpan"
                    @click="submitData()" align="center" unelevated stretch />
                  <q-btn flat v-if="step == 2" class="flat-button col-5 poppins-r" no-caps @click="saveAndContinue()"
                    label="Simpan" unelevated />
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
      // stepNo:1,

      // stepper 1
      victimDataExist:false,
      disasterId: "",
      locId: "",
      evacName: "",
      alamat: "",
      kecamatan: "",
      rt: "",
      rw: "",
      namaPetugas: "",
      nomorPetugas: "",
      totalChild: "",
      totalAdults: "",
      totalEldery: "",
      totalPregnancy: "",

      // stepper 2
      totalDeathBody: "",
      totalMajorInjury: "",
      totalMinorInjury: "",
      totalLost: "",
      totalEvacuated: "",

      // stepper 3 (Medicine)
      addMedicineFlag: false,
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
      medicines: [],

      // stepper 4 (Foods)
      addFoodsFlag: false,
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
      foods: [],

      // stepper 5 (Clothing)
      addClothingFlag: false,
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
    async saveData() {
      console.log("saved data is called");

      if (this.victimDataExist == true) {
        //Update Data
        await this.updateVictim();
      }

      else{
        //add data
        await this.addVictim();
      }

    },

    async submitData() {
      console.log("submit data is called");
      // await this.addVictim();
      Notify.create({
        color: 'green',
        message: 'Berhasil menambahkan data',
        position: 'top',
        timeout: 2500
      });
      this.$router.push(`/admin?Uid=${this.Uid}&Uname=${this.Uname}`)
    },


    async addVictim() {
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
        totalChild: this.totalChild,
        totalAdults: this.totalAdults,
        totalEldery: this.totalEldery,
        totalPregnancy: this.totalPregnancy,
        totalDeathBody: this.totalDeathBody,
        totalMajorInjury: this.totalMajorInjury,
        totalMinorInjury: this.totalMinorInjury,
        totalLost: this.totalLost,
        totalEvacuated: this.totalEvacuated,
      };
      try {
        const response = await api.post('/admin/addVictim', payload);
      } catch (error) {
        console.error(error);
        Notify.create({
          color: 'red',
          message: 'Gagal menambahkan korban silakan coba lagi',
          position: 'top',
          timeout: 2500
        });
      }
    },

    async updateVictim() {
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
        totalChild: this.totalChild,
        totalAdults: this.totalAdults,
        totalEldery: this.totalEldery,
        totalPregnancy: this.totalPregnancy,
        totalDeathBody: this.totalDeathBody,
        totalMajorInjury: this.totalMajorInjury,
        totalMinorInjury: this.totalMinorInjury,
        totalLost: this.totalLost,
        totalEvacuated: this.totalEvacuated,
      };
      try {
        const response = await api.post('/admin/updateVictim', payload);
      } catch (error) {
        console.error(error);
        Notify.create({
          color: 'red',
          message: 'Gagal update korban silakan coba lagi',
          position: 'top',
          timeout: 2500
        });
      }
    },

    
    async getVictimById() {
      console.log('getVictimById - called');
      try {
        const payload = {
          disasterId : this.disasterId,
          locId: this.locId
        };
        const response = await api.post('/admin/getVictimById', payload);
        // this.victims = response.data.map(item => ({
        //   totalChild: item.totalChild,
        //   totalAdults: item.totalAdults,
        //   totalEldery: item.totalEldery,
        //   totalPregnancy: item.totalPregnancy,
        //   totalDeathBody: item.totalDeathBody,
        //   totalMajorInjury: item.totalMajorInjury,
        //   totalMinorInjury: item.totalMinorInjury,
        //   totalLost: item.totalLost,
        //   totalEvacuated: item.totalEvacuated,
        // })).reverse();
        if(response.data.length > 0){
          this.victimDataExist = true
          let item = response.data[0]
          this.totalChild = item.totalChild
          this.totalAdults = item.totalAdults
          this.totalEldery = item.totalEldery
          this.totalPregnancy = item.totalPregnancy
          this.totalDeathBody = item.totalDeathBody
          this.totalMajorInjury = item.totalMajorInjury
          this.totalMinorInjury = item.totalMinorInjury
          this.totalLost = item.totalLost
          this.totalEvacuated = item.totalEvacuated
        }
        else{
          this.victimDataExist = false
        }

        console.log(response)
      } catch (error) {
        console.error(error);
        Notify.create({
          color: 'red',
          message: 'Gagal mengambil data silakan restart aplikasi',
          position: 'top',
          timeout: 2500
        });
      }
    },



    saveAndContinue() {
      this.$q.dialog({
        title: 'Peringatan',
        message: 'Semua data yang kamu masukan akan disimpan, pastikan semua data yang kamu masukan sudah benar',
        ok: {
          push: true,
          color: 'orange',
          label: 'Simpan',
          outline: true,
          noCaps: true
        },
        cancel: {
          push: true,
          color: 'orange',
          flat: true,
          label: 'Kembali',
          noCaps: true
        },
        persistent: true
      }).onOk(async () => {
        await this.saveData();
        this.step = 3;
      });
    },

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
          message: 'Gagal menambahkan obat silakan coba lagi',
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
          medicineId: item.medicineId,
          medicineName: item.medicineName,
          medicineNameQuantity: item.medicineNameQuantity
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
          message: 'Gagal menambahkan pangan silakan coba lagi',
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
          foodsName: item.foodsName,
          foodsNameQuantity: item.foodsNameQuantity
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
          message: 'Gagal menambahkan sandang silakan coba lagi',
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
          clothingName: item.clothingName,
          clothingNameQuantity: item.clothingNameQuantity
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

    // this.stepNo = this.$route.query.stepNo;
    // this.step = this.stepNo;

    await this.getVictimById();
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
