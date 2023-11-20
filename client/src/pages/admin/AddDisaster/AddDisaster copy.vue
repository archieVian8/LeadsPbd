<template>
  <q-layout view="hHh lpR fFf" style="background-color: #ffffff">
    <q-page width="360px" height="800px" class="q-py-lg">
      <q-header elevated class="location-header">
        <q-toolbar class="q-mt-xl">
          <q-btn dense flat round icon="account_circle" size="24px" />
          <q-toolbar-title
            class="location-title text-center text-uppercase text-overline"
          >
            LOCATION
          </q-toolbar-title>
          <q-btn dense flat round icon="notifications" size="24px" />
        </q-toolbar>
      </q-header>

      <q-page-container>
        <q-stepper
          v-model="step"
          header-nav
          class="full-width"
          flat
          animated
          :transition-duration="150"
          :contracted="$q.platform.is.mobile"
          done-color="green"
          ref="stepper"
        >
          <q-step
            :name="1"
            title="Location Details"
            caption="Where is the location"
            prefix="1"
            done
          >
            <div class="static-maps-big row justify-center">
              <q-icon name="img:icons/static-maps-big.svg" size="320px" />
            </div>
            <div>
              <q-btn
                class="choose-by-map"
                no-caps
                icon="fa-solid fa-map-location-dot"
                label="Choose by map"
              />
            </div>
            <div class="input-province">
              <q-input outlined filled v-model="province" label="Province" />
            </div>
            <div class="input-district">
              <q-input outlined filled v-model="district" label="District" />
            </div>
            <div class="input-ward-village">
              <q-input outlined filled v-model="village" label="Village" />
            </div>
          </q-step>

          <q-step
            :name="2"
            title="Disaster Details"
            caption="Where and when the disaster happen"
            prefix="2"
          >
            <div class="static-maps-big row justify-center">
              <q-icon name="img:icons/static-maps-big.svg" size="320px" />
            </div>

            <div class="column">
              <q-select outlined v-model="disasterType" :options="disasterTypeOptions" label="Disaster Type" />
            </div>

            <div class="row justify-start q-my-md">
              <q-input v-model="date" filled type="date" />
              <q-input v-model="time" filled type="time" class="q-ml-sm" />
            </div>

            <div class="row justify-between">
              <div class="column">
                <q-select outlined v-model="disasterCause" :options="disasterCauseOptions" label="Cause of Disaster" />
              </div>
              <div class="column">
                <q-input v-show="disasterType == 'Earthquake'" outlined v-model="scale" label="scale" />
              </div>
            </div>

            <div class="column q-mt-md" style="max-width: 360px">
              <span>Location details</span>
              <q-input v-model="locationDetail" filled type="textarea" />
            </div>
          </q-step>

          <template #navigation>
            <q-stepper-navigation class="row">
              <q-btn
                v-if="step > 1"
                flat
                no-caps
                @click="$refs.stepper.previous()"
                label="Back"
                class="back-button q-ml-xs"
              />
              <q-space />
              <q-btn  v-if="step !== 2"
                class="continue-button"
                no-caps
                label="Continue"
                @click="$refs.stepper.next()"
              />
              <q-btn v-if="step === 2"
                class="continue-button"
                no-caps
                label="submit"
                @click="addDisaster()"
              />
            </q-stepper-navigation>
          </template>

          <template #message>
            <div
              v-if="step === 1"
              class="row items-center"
              style="margin-left: 24px; margin-right: 24px"
            >
              <q-btn
                size="12px"
                text-color="black"
                round
                color="white"
                icon="fa-solid fa-arrow-left"
              />
              <span style="margin-left: 12px; font-size: 18px; font-weight: 500"
                >Location Details</span
              >
            </div>

            <div
              v-if="step === 2"
              class="row items-center"
              style="margin-left: 24px; margin-right: 24px"
            >
              <q-btn
                size="12px"
                text-color="black"
                round
                color="white"
                icon="fa-solid fa-arrow-left"
              />
              <span style="margin-left: 12px; font-size: 18px; font-weight: 500"
                >Disaster Details</span
              >
            </div>
          </template>
        </q-stepper>
      </q-page-container>
    </q-page>
  </q-layout>
</template>

<script>
// export default {
//   name: 'AdminAddDisaster'
// }

import { ref } from "vue"
import {api} from 'boot/axios'
import { useQuasar } from 'quasar'
const $q = useQuasar()
//const step = ref(1);
// location details
// disaster locations

export default {
  name: 'AdminAddDisaster',

  data () {
    return {
      province:'Province',
      district:'district',
      village:'vilage',
      disasterType:'',
      disasterTypeOptions:['Earthquake',
                          'Lan Slide',
                          'Flood',
                          'Eruption'],
      date:'',
      time:'',    
      disasterCauseOptions:['Flood','Eruption'] ,
      disasterCause:'',
      scale:'',
      locationDetail:''
    }
  },
  setup () {
    return {
      step: ref(1)

    }
  },
  methods:{

    async getDisaster(){
      await api.get('/user/getAllDisaster').then(
        (response)=>{
          console.log(response)
        }
      )
    },

    async addDisaster(){
      console.log('finish')
      const payload = {
        "province" : this.province,
        "district" : this.district,
        "village" : this.village,
        "disasterType" : this.disasterType,
        "startDate" : this.date,
        "cause" : this.disasterCause,
        "scale" : this.scale,
        "locDesc" : this.locationDetail
      }
      console.log("Add Disaster")
      await api.post('/admin/addDisaster', payload).then(
        (response)=>{
          console.log(response)
          $q.notify({
            type : 'success',
            message : 'Insert Data Success'
          })
        }
      )
      
    }

    //  addDisaster()
    // {  $q.notify({
    //         type : 'negative',
    //         message : 'Insert Data Success'
    //       })
    // }

  },

  mounted() {



  },  // end of mounted
  computed:{
    

  }

}

</script>

<style>
.location-header {
  background-color: #f97c21;
  height: 120px;
}

.location-title {
  font-size: 22px;
  font-weight: 700;
  color: #000000;
}

.static-maps-big {
  border-radius: 5px;
  filter: brightness(70%);
}

.choose-by-map {
  background-color: #f97c21;
  color: #ffffff;
  font-size: 16px;
}

.input-province {
  margin-top: 24px;
  font-size: 16px;
}

.input-district {
  margin-top: 24px;
  font-size: 16px;
}

.input-ward-village {
  margin-top: 24px;
  font-size: 16px;
}

.back-button {
  color: #f97c21;
}

.continue-button {
  background-color: #f97c21;
  color: #ffffff;
}
</style>