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
          <div class="row items-center q-mt-sm">
            <q-btn
              round
              icon="fa-solid fa-arrow-left"
            />
            <p class="q-mb-none" style="font-size: 18px; font-weight: bold">
              Edit Recovery Needs
            </p>
          </div>
          <q-icon
            class="q-mt-md"
            name="img:icons/dinamic-maps.png"
            style="width: 100%; height: 180px"
          />
  
          <div>
            <p
              class="q-mb-none q-mt-md"
              style="font-size: 16px; font-weight: bold"
            >
              Clothing Needs
            </p>
  
            <div
              class="row justify-between q-mt-lg"
              v-for="keyClothing in countClothing"
              :key="keyClothing"
            >
              <div>
                <q-input
                  v-model="valuesClothing['dynamic-field-' - keyClothing]"
                  :id="keyClothing"
                  type="text"
                  outlined
                  dense
                  placeholder="Type clothing here"
                  style="width: 180px"
                />
              </div>
  
              <div>
                <q-input
                  type="text"
                  outlined
                  dense
                  v-model="totalClothing"
                  placeholder="Total"
                  style="width: 72px"
                />
              </div>
              <q-btn
                dense
                color="red"
                icon="fa-solid fa-x"
                @click="removeClothing"
              />
            </div>
  
            <div>
              <q-btn
                class="q-mt-md"
                outline
                color="black"
                label="Add more clothing need"
                style="height: 12px"
                @click="addClothing"
              />
            </div>
          </div>
  
          <div>
            <p
              class="q-mb-none q-mt-md"
              style="font-size: 16px; font-weight: bold"
            >
              Food Needs
            </p>
            <div
              class="row justify-between q-mt-lg"
              v-for="keyFood in countFood"
              :key="keyFood"
            >
              <div>
                <q-input
                  v-model="valuesFood['dynamic-field-' - keyFood]"
                  :id="keyFood"
                  type="text"
                  outlined
                  dense
                  placeholder="Type food here"
                  style="width: 180px"
                />
              </div>
  
              <div>
                <q-input
                  type="text"
                  outlined
                  dense
                  v-model="totalFood"
                  placeholder="Total"
                  style="width: 72px"
                />
              </div>
              <q-btn dense color="red" icon="fa-solid fa-x" @click="removeFood" />
            </div>
  
            <div>
              <q-btn
                class="q-mt-md"
                outline
                color="black"
                label="Add more food need"
                style="height: 12px"
                @click="addFood"
              />
            </div>
          </div>
  
          <div>
            <div>
              <p
                class="q-mb-none q-mt-md"
                style="font-size: 16px; font-weight: bold"
              >
                Logistic Needs
              </p>
            </div>
  
            <div
              class="row justify-between q-mt-lg"
              v-for="keyLogistic in countLogistic"
              :key="keyLogistic"
            >
              <div>
                <q-input
                  v-model="valuesLogistic['dynamic-field-' - keyLogistic]"
                  :id="keyLogistic"
                  type="text"
                  outlined
                  dense
                  placeholder="Type logistic need"
                  style="width: 180px"
                />
              </div>
  
              <div>
                <q-input
                  type="text"
                  outlined
                  dense
                  v-model="totalLogistic"
                  placeholder="Total"
                  style="width: 72px"
                />
              </div>
              <q-btn
                dense
                color="red"
                icon="fa-solid fa-x"
                @click="removeLogistic"
              />
            </div>
  
            <div>
              <q-btn
                class="q-mt-md"
                outline
                color="black"
                label="Add more logistic need"
                style="height: 12px"
                @click="addLogistic"
              />
            </div>
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
    name: "Logistics",
    data: function () {
      return {
        totalClothing: null,
        totalFood: null,
        totalLogistic: null,
  
        countLogistic: 1,
        countFood: 1,
        countClothing: 1,
  
        valuesLogistic: {},
        valuesFood: {},
        valuesClothing: {},
      };
    },
    methods: {
      addLogistic: function () {
        this.countLogistic++;
      },
      addFood: function () {
        this.countFood++;
      },
      addClothing: function () {
        this.countClothing++;
      },
      removeLogistic: function () {
        this.countLogistic--;
      },
      removeFood: function () {
        this.countFood--;
      },
      removeClothing: function () {
        this.countClothing--;
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