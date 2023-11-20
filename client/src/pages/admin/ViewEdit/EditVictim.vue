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
            <p class="q-mb-none" style="font-size: 18px; font-weight: bold">
              Edit Victims Details
            </p>
          </div>
  
          <q-icon
            class="q-mt-md"
            name="img:icons/dinamic-maps.png"
            style="width: 100%; height: 180px"
          />
  
          <p class="q-mb-none q-mt-md" style="font-size: 18px; font-weight: bold">
            Total Children (0 - 16 y.0)
          </p>
          <q-input
            outlined
            v-model="totalChildren"
            placeholder=""
            :rules="[(val) => (val && val.length > 0) || 'Please type something']"
          />
  
          <p class="q-mb-none q-mt-sm" style="font-size: 18px; font-weight: bold">
            Total Adults (17 - 49 y.0)
          </p>
          <q-input
            outlined
            v-model="totaAdult"
            placeholder=""
            :rules="[(val) => (val && val.length > 0) || 'Please type something']"
          />
  
          <p class="q-mb-none q-mt-sm" style="font-size: 18px; font-weight: bold">
            Total Elderly (> 50 y.0)
          </p>
          <q-input
            outlined
            v-model="totalElderly"
            placeholder=""
            :rules="[(val) => (val && val.length > 0) || 'Please type something']"
          />
  
          <p class="q-mb-none q-mt-sm" style="font-size: 18px; font-weight: bold">
            Total Pregnancy (> 50 y.0)
          </p>
          <q-input
            outlined
            v-model="totalPregnancy"
            placeholder=""
            :rules="[(val) => (val && val.length > 0) || 'Please type something']"
          />
  
          <q-btn
            class="q-mt-md"
            style="
              background: #f97c21;
              width: 100%;
              height: 42px;
              border-radius: 10px;
              color: black;
            "
            label="Continue"
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
    name: "AdminEditVictim",
  
    data() {
      const totalChildren = ref(null);
      const totaAdult = ref(null);
      const totalElderly = ref(null);
      const totalPregnancy = ref(null);
  
      return {
        totalChildren,
        totaAdult,
        totalElderly,
        totalPregnancy
  
      };
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
  </style>