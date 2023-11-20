<template>
  <q-layout view="hHh lpR fF2">
    <q-page class="main-page">
      <div clas="q-mt-md">
        <q-form>
          <q-stepper v-model="step" ref="stepper" active-color="orange" done-color="orange" class="my-stepper"
            done-icon="fa-solid fa-check" contracted flat animated>
            <q-step :name="1" icon="fa-solid fa-1" :done="step > 1" class="q-px-lg">
              <p class="text-h6 text-weight-bold q-mt-sm">Edit Detail Korban</p>
              <div>
                <P class="text-weight-bold q-mb-sm q-mt-md">Total Korban Anak (0 - 16 Tahun)</P>
                <q-input outlined v-model="totalChild" placeholder="" color="orange"
                  :rules="[val => (val && val.length > 0) || 'Masukkan Data']" />
              </div>
              <div>
                <P class="text-weight-bold q-mb-sm">Total Korban Dewasa (17 - 59 Tahun)</P>
                <q-input outlined v-model="totalAdults" placeholder="" color="orange"
                  :rules="[val => (val && val.length > 0) || 'Masukkan Data']" />
              </div>
              <div>
                <P class="text-weight-bold q-mb-sm">Total Korban Lanjut Usia (>60 Tahun)</P>
                <q-input outlined v-model="totalEldery" placeholder="" color="orange"
                  :rules="[val => (val && val.length > 0) || 'Masukkan Data']" />
              </div>
              <div>
                <P class="text-weight-bold q-mb-sm">Total Korban Hamil</P>
                <q-input outlined v-model="totalPregnancy" placeholder="" color="orange"
                  :rules="[val => (val && val.length > 0) || 'Masukkan Data']" />
              </div>
            </q-step>

            <q-step :name="2" icon="fa-solid fa-2" :done="step > 2" class="q-px-lg">
              <p class="text-h6 text-weight-bold q-mb-none q-mt-sm">Edit Detail Kondisi Korban</p>
              <div>
                <P class="text-weight-bold q-mb-sm q-mt-md">Total Korban Meninggal</P>
                <q-input outlined v-model="totalDeathBody" placeholder="" color="orange"
                  :rules="[val => (val && val.length > 0) || 'Masukkan Data']" />
              </div>
              <div>
                <P class="text-weight-bold q-mb-sm">Total Korban Cedera Berat</P>
                <q-input outlined v-model="totalMajorInjury" placeholder="" color="orange"
                  :rules="[val => (val && val.length > 0) || 'Masukkan Data']" />
              </div>
              <div>
                <P class="text-weight-bold q-mb-sm">Total Korban Cedera Ringan</P>
                <q-input outlined v-model="totalMinorInjury" placeholder="" color="orange"
                  :rules="[val => (val && val.length > 0) || 'Masukkan Data']" />
              </div>
              <div>
                <P class="text-weight-bold q-mb-sm">Total Korban Hilang</P>
                <q-input outlined v-model="totalLost" placeholder="" color="orange"
                  :rules="[val => (val && val.length > 0) || 'Masukkan Data']" />
              </div>
              <div>
                <P class="text-weight-bold q-mb-sm">Total Korban Tertampung</P>
                <q-input outlined v-model="totalEvacuated" placeholder="" color="orange"
                  :rules="[val => (val && val.length > 0) || 'Masukkan Data']" />
              </div>
            </q-step>


            <template v-slot:navigation v-if="!addClothingFlag && !addFoodsFlag && !addMedicineFlag">
              <q-stepper-navigation class="q-mt-md">
                <div class="row justify-between items-center">
                  <q-btn outline label="Kembali" class="outline-button col-5 poppins-r bt-width" v-if="step == 1"
                    align="center" no-caps :to="`/admin/evacuation/disaster-id?disasterId=${disasterId}`" />
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

      // stepper 1
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
      await this.addVictim();
    },

    async submitData() {
      console.log("submit data is called");
      await this.addVictim();
      Notify.create({
        color: 'green',
        message: 'Berhasil menambahkan data',
        position: 'top',
        timeout: 2500
      });
      this.$router.push('/admin')
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


    
  },

  async mounted() {
    console.log("evacuationId test");

    console.log(this.$route.query);
    this.disasterId = this.$route.query.disasterId;
    this.locId = this.$route.query.locId;
    this.evacName = this.$route.query.evacName;
    this.alamat = this.$route.query.alamat;
    this.kecamatan = this.$route.query.kecamatan;
    this.rt = this.$route.query.rt;
    this.rw = this.$route.query.rw;
    this.namaPetugas = this.$route.query.namaPetugas;
    this.nomorPetugas = this.$route.query.nomorPetugas;;
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
