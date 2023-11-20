<template>
  <q-layout view="hHh lpR fFf" style="background-color: #ffffff">
    <q-page class="q-py-lg">
      <q-page-container>
        <q-form @submit="addDisaster()">
          <q-stepper v-model="step" header-nav class="full-width" flat animated :transition-duration="120"
            :contracted="$q.platform.is.mobile" active-color="orange" done-color="orange" ref="stepper">
            <q-step :name="1" prefix="1" done>
              <div class="input-province">
                <p class="text-subtitle1 text-weight-bold q-mb-xs">Provinsi</p>
                <q-input outlined v-model="province" :rules="[(val) => !!val]" color="orange" placeholder="Provinsi" />
              </div>
              <div class="input-district">
                <p class="text-subtitle1 text-weight-bold q-mb-xs">Kota/Kabupaten</p>
                <q-input outlined v-model="district" :rules="[(val) => !!val]" color="orange"
                  placeholder="Kota/Kabupaten" />
              </div>
            </q-step>

            <q-step :name="2" prefix="2">

              <q-select outlined v-model="disasterType" :options="disasterTypeOptions" color="orange" class="q-mb-md"
                label="Nama Bencana" />

              <div v-if="disasterType == 'Gempa Bumi'">
                <p class="text-subtitle1 text-weight-medium q-mb-xs">Skala Gempa Bumi</p>
                <q-input outlined v-model="scale" :rules="[(val) => !!val]" color="orange" placeholder="Skala" />
              </div>

              <div class="row justify-between">
                <q-input outlined v-model="date" :rules="[(val) => !!val]" color="orange" type="date" />
                <q-input outlined v-model="time" :rules="[(val) => !!val]" color="orange" type="time" class="q-ml-sm" />
              </div>

              <div class="column">
                <p class="text-subtitle1 text-weight-medium q-mb-xs">Detail Lokasi Bencana</p>
                <q-input outlined v-model="locationDetail" color="orange" type="textarea" />
              </div>
            </q-step>

            <template #navigation>
              <q-stepper-navigation class="row">
                <q-btn unelevated v-if="step > 1" flat no-caps @click="$refs.stepper.previous()" label="Kembali"
                  class="back-button q-ml-xs" />
                <q-space />
                <q-btn unelevated v-if="step !== 2" class="continue-button" no-caps label="Selanjutnya"
                  @click="$refs.stepper.next()" />
                <q-btn unelevated v-if="step === 2" class="continue-button" no-caps label="Selesai" type="submit" />
              </q-stepper-navigation>
            </template>

            <template #message>
              <div v-if="step === 1" class="row items-center q-ml-md">
                <span class="poppins-sb q-ml-sm" style="font-size: 18px;">Detail Lokasi Bencana</span>
              </div>
              <div v-if="step === 2" class="row items-center q-ml-md">
                <q-btn unelevated round color=#E2E8F0 icon="img:icons/admin/AddDisaster/arrow-left.svg" 
                :to='`/admin?Uid=${this.Uid}&Uname=${this.Uname}`'/>
                <span class="poppins-sb q-ml-sm" style="font-size: 18px;">Detail Bencana</span>
              </div>
            </template>
          </q-stepper>
        </q-form>
      </q-page-container>
    </q-page>
  </q-layout>
</template>

<script>
import { ref } from "vue"
import { api } from 'boot/axios'
import { Notify } from 'quasar'

export default {
  name: 'AdminAddDisaster',

  data() {
    return {
      province: '',
      district: '',
      village: '',
      disasterType: '',
      disasterTypeOptions: ['Gempa Bumi',
        'Gunung Meletus',
        'Banjir',
        'Longsor',
        'Tsunami',
      ],
      date: '',
      time: '',
      disasterCauseOptions: ['Flood', 'Eruption'],
      disasterCause: '',
      scale: '',
      locationDetail: ''
    }
  },
  setup() {
    return {
      step: ref(1)
    }
  },
  methods: {
    async addDisaster() {
      try {
        const payload = {
          province: this.province,
          district: this.district,
          village: this.village,
          disasterType: this.disasterType,
          startDate: `${this.date} ${this.time}`,
          cause: this.disasterCause,
          scale: this.scale,
          locDesc: this.locationDetail,
        };
        console.log("Add Disaster called");
        const response = await api.post('/admin/addDisaster', payload);
        Notify.create({
          color: 'green',
          message: 'Berhasil menambahkan bencana',
          position: 'top',
          timeout: 2500
        });
        this.$router.push(`/admin?Uid=${this.Uid}&Uname=${this.Uname}`)
      } catch (error) {
        console.error(error);
        Notify.create({
          color: 'red',
          message: 'Terjadi kesalahan saat menambahkan bencana',
          position: 'top',
          timeout: 2500
        });
      }
    }
  },

  mounted() {
    this.Uid = this.$route.query.Uid;
    this.Uname = this.$route.query.Uname;
  }
};

</script>

<style>
.back-button {
  color: #f97c21;
  height: 42px;
  border-radius: 5px;
}

.continue-button {
  background-color: #f97c21;
  color: #ffffff;
  height: 42px;
  border-radius: 5px;
}
</style>
