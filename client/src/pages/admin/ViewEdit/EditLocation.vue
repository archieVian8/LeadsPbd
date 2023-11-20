<template>
    <q-layout view="hHh lpR fF2">
      <q-header>
        <div class="header">
          <div class="topbar">
            <q-icon name="fa-solid fa-user" color="white" size="24px" />
            <h1 class="header-title">EDIT</h1>
            <q-btn
              flat
              round
              color="white"
              icon="fa-regular fa-bell"
              size="16px"
            />
          </div>
        </div>
      </q-header>
      <q-page class="main-page">
        <div class="row items-center q-mt-lg">
          <q-btn round icon="fa-solid fa-arrow-left" />
          <p class="q-mb-none q-ml-sm" style="font-size: 18px; font-weight: bold">
            Edit Location Details
          </p>
        </div>
        <q-icon
          class="q-mt-md"
          name="img:icons/dinamic-maps.png"
          style="width: 100%; height: 180px"
        />

        <q-form
          action="https://127.0.0.13000/"
          method="GET"
          @submit="onSubmit"
          @reset="onReset"
        >
          <p class="q-mb-none q-mt-md" style="font-size: 18px; font-weight: bold">
            Province Details
          </p>
          <q-input
            v-model="province"
            outlined
            name="body"
            placeholder="Type the province"
            :rules="[val => (val && val.length > 0) || 'Please type something!']"
          />
          <p class="q-mb-none" style="font-size: 18px; font-weight: bold">
            District
          </p>
          <q-input
            outlined
            v-model="district"
            placeholder="Type the town/district"
            :rules="[val => (val && val.length > 0) || 'Please type something!']"
          />
          <p class="q-mb-none" style="font-size: 18px; font-weight: bold">
            Ward/Village
          </p>
          <q-input outlined v-model="village" placeholder="Type the village" :rules="[val => (val && val.length > 0) || 'Please type something!']"/>
          <p class="q-mb-none" style="font-size: 18px; font-weight: bold">
            Start Date & Time
          </p>
          <div class="row" inline outline-style="js">
            <q-input v-model="date" filled type="date" :rules="[val => (val && val.length > 0) || 'Please type something!']"/>
            <q-input class="q-ml-md" v-model="time" filled type="time" :rules="[val => (val && val.length > 0) || 'Please type something!']"/>
          </div>

          <div class="row justify-between">
            <div style="width: 152px">
              <p
                class="q-mb-none q-mt-sm"
                style="font-size: 18px; font-weight: bold"
              >
                Cause of Disaster
              </p>
              <q-select outlined dense v-model="cause" :options="causeOptions"/>
            </div>

            <div style="width: 152px">
              <p
                class="q-mb-none q-mt-sm"
                style="font-size: 18px; font-weight: bold"
              >
                Scale
              </p>
              <q-select outlined dense v-model="scale" :options="scaleOptions"/>
            </div>
          </div>
          <p class="q-mb-none q-mt-sm" style="font-size: 18px; font-weight: bold">
            Location Description
          </p>
          <div style="width: 100%">
            <q-input v-model="description" outlined type="textarea" :rules="[val => (val && val.length > 0) || 'Please type something!']"/>
          </div>
          <q-btn
            type="submit"
            class="q-mt-md q-mb-xs"
            style="
              background: #f97c21;
              width: 100%;
              height: 42px;
              border-radius: 10px;
              color: black;
            "
            label="save"
            @click="onSubmit"
          />
          <q-btn
            type="reset"
            flat
            class="q-mb-md"
            style="
              background: #ffffff;
              width: 100%;
              height: 42px;
              border-radius: 10px;
              color: black;
            "
            label="Reset"
            @click="onReset"
          />
        </q-form>
      </q-page>
    </q-layout>
  </template>

  <script>
  import { useQuasar } from "quasar";
  import { ref } from "vue";

  export default {
    name: "AdminEditLocation",
    setup() {
      const province = ref(null);
      const district = ref(null);
      const village = ref(null);
      const date = ref(null);
      const time = ref(null);
      const description = ref(null);

      return {
        province,
        district,
        village,
        date,
        time,
        description,
        cause: ref(null),
        scale: ref(null),

        causeOptions: ['Google', 'Facebook', 'Twitter', 'Apple', 'Oracle'],
        scaleOptions: ['Bing', 'Instagram', 'Reddit', 'Samsung', 'Unity'],


        onSubmit() {

        },

        onReset() {
          province.value = null;
          district.value = null;
          village.value = null;
          date.value = null;
          time.value = null;
          description.value = null;
        },
      };


      function onSubmit (event) {
        console.log('on submit')
      }

      function onReset (event) {
        console.log('on reset')
      }
    },
  };
  </script>

  <style>
  * {
    margin: 0;
    background-color: none;
  }

  .header {
    width: 100%;
    height: 120px;
    background-color: #f97c21;
  }

  .header-title {
    color: black;
    font-weight: bolder;
    font-size: 24px;
  }

  .topbar {
    margin: 0 24px;
    padding-top: 24px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  .main-page {
    padding: 0 24px;
  }

  .date-input {
    width: 160px;
    margin-right: 8px;
  }

  time-input {
    width: 120px;
  }
  </style>
