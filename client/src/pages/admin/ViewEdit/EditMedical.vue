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
  
        <q-page class="column main-page">
          <q-form>
            <div class="row items-center q-mt-lg">
              <q-btn
                round
                icon="fa-solid fa-arrow-left"
              />
              <p class="q-mb-none" style="font-size: 18px; font-weight: bold; margin-left: 12px;">
                Edit Medicine Supply
              </p>
            </div>
            <q-icon
              class="q-mt-md"
              name="img:icons/dinamic-maps.png"
              style="width: 100%; height: 180px"
            />
  
            <div
              class="row justify-between q-mt-lg"
              v-for="keyMedicine in countMedicine"
              :key="keyMedicine"
            >
              <div>
                <q-input
                  v-model="valueMedicine['dynamic-field-' - keyMedicine]"
                  :id="keyMedicine"
                  type="text"
                  outlined
                  dense
                  placeholder="Type medicine need"
                  style="width: 180px"
                />
              </div>
  
              <div>
                <q-input
                  type="text"
                  outlined
                  dense
                  v-model="totalMedicine"
                  placeholder="Total"
                  style="width: 72px"
                />
              </div>
              <q-btn
                dense
                color="red"
                icon="fa-solid fa-x"
                @click="removeMedicine"
              />
            </div>
  
            <div>
              <q-btn
                class="q-mt-md"
                outline
                color="black"
                label="Add more medicine need"
                style="height: 12px"
                @click="addMedicine"
              />
            </div>
  
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
            @click="onSubmit"
          />
          </q-form>
        </q-page>
    </q-layout>
  </template>
  
  <script>
  export default {
    name: "AdminEditMedical",
    data: function () {
      return {
        totalMedicine: null,
  
        countMedicine: 1,
  
        valueMedicine: {},
      };
    },
    methods: {
      addMedicine: function () {
        this.countMedicine++;
      },
      removeMedicine: function () {
        this.countMedicine--;
      },
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