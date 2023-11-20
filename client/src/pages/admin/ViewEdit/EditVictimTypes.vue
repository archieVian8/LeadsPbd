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
        <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
          <div class="row items-center q-mt-sm">
            <q-btn
              unelevated
              round
              color="#E2E8F0"
              icon="img:icons/arrow-back.png"
            />
            <p class="no-margin" style="font-size: 18px; font-weight: bold">
              Edit Victims Types
            </p>
          </div>
  
          <q-icon
            class="q-mt-md"
            name="img:icons/dinamic-maps.png"
            style="width: 100%; height: 180px"
          />
          <p class="q-mb-none q-mt-md" style="font-size: 18px; font-weight: bold">
            Total Death Body
          </p>
          <q-input outlined v-model="totalDeathBody" placeholder="Type total death body here..." />
  
          <p class="q-mb-none q-mt-md" style="font-size: 18px; font-weight: bold">
            Total Major Injury
          </p>
          <q-input outlined v-model="totalMajorInjury" placeholder="Type total major injury here..." />
  
          <p class="q-mb-none q-mt-md" style="font-size: 18px; font-weight: bold">
            Total Minor Injury
          </p>
          <q-input outlined v-model="totalMinorInjury" placeholder="Type total minor injury here..." />
  
          <p class="q-mb-none q-mt-md" style="font-size: 18px; font-weight: bold">
            Total Lost
          </p>
          <q-input outlined v-model="totalLost" placeholder="Type total lost here..." />
  
          <p class="q-mb-none q-mt-md" style="font-size: 18px; font-weight: bold">
            Total Evacuated
          </p>
          <q-input outlined v-model="totalEvacuated" placeholder="Type total evacuated here..." />
  
          <q-btn
            class="q-mt-md q-mb-lg"
            style="
              background: #f97c21;
              width: 100%;
              height: 42px;
              border-radius: 10px;
              color: black;
            "
            label="Save"
            type="submit"
          />
  
        </q-form>
      </q-page>
    </q-layout>
  </template>
  
  <script>
  import { useQuasar } from "quasar";
  import { ref } from "vue";
  
  export default {
    name: "VictimTypes",
  
    data() {
      const totalDeathBody = ref(null)
      const totalMajorInjury = ref(null)
      const totalMinorInjury = ref(null)
      const totalLost = ref(null)
      const totalEvacuated = ref(null)
  
      return {
        totalDeathBody,
        totalMajorInjury,
        totalMinorInjury,
        totalLost,
        totalEvacuated
      }
    }
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
  </style>