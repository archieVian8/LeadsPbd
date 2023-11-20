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
            style="width: 100%; height: 195px"
          />
  
          <p class="q-mb-none q-mt-md" style="font-size: 16px; font-weight: bold">
            House Damage
          </p>
  
          <div class="row justify-between q-mt-sm">
            <q-select
              clearable
              :options="options"
              outlined
              v-model="SelectDamage1"
              style="width: 200px"
              label="Choose damage type"
            />
            <q-input clearable outlined v-model.number="totalSelectDamage1" placeholder="Type" style="width: 95px" />
          </div>
  
          <div class="row justify-between q-mt-sm">
            <q-select
              clearable
              :options="options"
              outlined
              v-model="SelectDamage2"
              style="width: 200px"
              label="Choose damage type"
            />
            <q-input clearable outlined v-model.number="totalSelectDamage2" placeholder="Type" style="width: 95px" />
          </div>
  
          <div class="row justify-between q-mt-sm">
            <q-select
              clearable
              :options="options"
              outlined
              v-model="SelectDamage3"
              style="width: 200px"
              label="Choose damage type"
            />
            <q-input clearable outlined v-model.number="totalSelectDamage3" placeholder="Type" style="width: 95px" />
          </div>
  
          <div class="row justify-between q-mt-sm">
            <q-select
              clearable
              :options="options"
              outlined
              v-model="SelectDamage4"
              style="width: 200px"
              label="Choose damage type"
            />
            <q-input clearable outlined v-model.number="totalSelectDamage4" placeholder="Type" style="width: 95px" />
          </div>
  
          <p class="q-mb-none q-mt-md" style="font-size: 16px; font-weight: bold">
            Public Facilities Damage
          </p>
  
          <div class="row justify-between q-mt-sm">
            <q-select
              clearable
              :options="optionsFacilities"
              outlined
              v-model="FacilitiesDamage1"
              style="width: 200px"
              label="Choose damage type"
            />
            <q-input clearable outlined v-model.number="totalDamageFacilities1" placeholder="Type" style="width: 95px" />
          </div>
  
          <div class="row justify-between q-mt-sm">
            <q-select
              clearable
              :options="optionsFacilities"
              outlined
              v-model="FacilitiesDamage2"
              style="width: 200px"
              label="Choose damage type"
            />
            <q-input clearable outlined v-model.number="totalDamageFacilities2" placeholder="Type" style="width: 95px" />
          </div>
  
          <div class="row justify-between q-mt-sm">
            <q-select
              clearable
              :options="optionsFacilities"
              outlined
              v-model="FacilitiesDamage3"
              style="width: 200px"
              label="Choose damage type"
            />
            <q-input clearable outlined v-model.number="totalFacilitesDamage3" placeholder="Type" style="width: 95px" />
          </div>
  
          <q-btn
            class="q-mt-lg q-mb-lg"
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
  import { ref } from 'vue'
  
  export default {
    name: "AdminEditDamage",
  
    setup() {
      const SelectDamage1 = ref(null)
      const SelectDamage2 = ref(null)
      const SelectDamage3 = ref(null)
      const SelectDamage4 = ref(null)
      const totalSelectDamage1 = ref(null)
      const totalSelectDamage2 = ref(null)
      const totalSelectDamage3 = ref(null)
      const totalSelectDamage4 = ref(null)
      const FacilitiesDamage1 = ref(null)
      const FacilitiesDamage2 = ref(null)
      const FacilitiesDamage3 = ref(null)
      const totalDamageFacilities1 = ref(null)
      const totalDamageFacilities2 = ref(null)
      const totalDamageFacilities3 = ref(null)
  
      return {
        SelectDamage1,
        SelectDamage2,
        SelectDamage3,
        SelectDamage4,
        totalSelectDamage1,
        totalSelectDamage2,
        totalSelectDamage3,
        totalSelectDamage4,
        FacilitiesDamage1,
        FacilitiesDamage2,
        FacilitiesDamage3,
        totalDamageFacilities1,
        totalDamageFacilities2,
        totalDamageFacilities3,
  
        options: [
          'Major Damage', 'Medium Damage', 'Minor Damage', 'Flooded'
        ],
        optionsFacilities: [
          'Healt Facilities', 'School Facilities', 'Worship Facilities'
        ]
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