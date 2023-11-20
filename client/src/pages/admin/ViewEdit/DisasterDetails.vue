<template>
  <q-layout view="hHh lpR fF2">
      <q-page-container>
          <q-header>
              <div class="header">
                  <div class="topbar">
                      <q-icon name="fa-solid fa-user" color="white" size="24px" />
                      <h1 class="header-title">EDIT</h1>
                      <q-btn flat round color="white" icon="fa-regular fa-bell" size="16px" />
                  </div>
              </div>
          </q-header>
          <q-page>
              <div class="column disaster-details">
                  <div class="maps">
                      <q-icon class="dinamic-image" name="img:icons/dinamic-maps.png" />
                  </div>
                  <div class="general-details" style="height: 62px; background-color: #F1F5F9;">
                      <div class=" row justify-center q-mx-xl q-mt-sm">
                          <div class="column q-ml-sm">
                              <div class="row">
                                  <q-icon name="img:icons/Earthquake.png" size="16px" />
                                  <p class="q-ml-sm q-mb-none" style="font-size: 12px; font-weight: bold;">Type</p>
                              </div>
                              <p class="q-mb-none q-mt-xs" style="font-size: 12px; font-weight: bold;">Earthquake</p>
                          </div>
                          <div class="column q-ml-sm">
                              <div class="row">
                                  <q-icon name="img:icons/Eruption.png" size="16px" />
                                  <p class="q-mb-none" style="font-size: 12px; font-weight: bold;">cause</p>
                              </div>
                              <p class="q-mb-none q-mt-xs" style="font-size: 12px; font-weight: bold; text-align: center;">
                              Eruption</p>
                          </div>
                          <div class="column q-ml-sm">
                              <div class="row">
                                  <q-icon name="img:icons/Balance.png" size="16px" />
                                  <p class="q-mb-none" style="font-size: 12px; font-weight: bold;">Scale</p>
                              </div>
                              <p class="q-mb-none q-mt-xs" style="font-size: 12px; font-weight: bold;">Enormous</p>
                          </div>
                      </div>
                  </div>
                  <div class="location-and-time q-my-sm q-px-md">
                      <div class="row justify-between">
                          <p class="q-mt-sm q-mb-none" style="font-size: 18px; font-weight: bolder;">Location and Time</p>
                          <q-btn flat round color="none" icon="img:icons/edit.png" />
                      </div>
                      <div class="row items-start example-container">
                          <div class="example-cell" tabindex="0">
                              <q-icon class="q-mt-sm" name="img:icons/location.png" size="24px" />
                          </div>
                          <div class="example-cell col-6" tabindex="0" style="width: 277px;">
                              <p class="q-mt-sm q-mb-none q-ml-sm"
                                  style="font-size: 14px; font-weight: bolder; color: #484541;">Disaster Loation</p>
                              <p class="q-mb-none q-ml-sm" style="font-size: 14px; font-weight: bolder; color: #484541;">
                                  Lowokwaru, Malang, East Java, Indonesia</p>
                          </div>
                      </div>
                      <div class="row items-start example-container">
                          <div class="example-cell" tabindex="0">
                              <q-icon class="q-mt-sm" name="img:icons/time.png" size="24px" />
                          </div>
                          <div class="example-cell col-6" tabindex="0" style="width: 277px;">
                              <p class="q-mt-sm q-mb-none q-ml-sm"
                                  style="font-size: 14px; font-weight: bolder; color: #484541;">Time</p>
                              <p class="q-mb-none q-ml-sm" style="font-size: 14px; font-weight: bolder; color: #484541;">
                                  11:22 Am, 7th February 2023</p>
                          </div>
                      </div>
                      <div class="row items-start example-container">
                          <div class="example-cell" tabindex="0">
                              <q-icon class="q-mt-sm" name="img:icons/description.png" size="24px" />
                          </div>
                          <div class="example-cell col-6" tabindex="0" style="width: 277px;">
                              <p class="q-mt-sm q-mb-none q-ml-sm"
                                  style="font-size: 14px; font-weight: bolder; color: #484541;">Location Description</p>
                              <p class="q-mb-none q-ml-sm" style="font-size: 14px; font-weight: bolder; color: #484541;">
                                  III - IV Bayah, III - IV Banjasari, III - IV Tamanjaya, III Serang, III Pandeglang, III
                                  Malingping</p>
                          </div>
                      </div>
                      <div class="row items-start example-container">
                          <div class="example-cell" tabindex="0">
                              <q-icon class="q-mt-sm" name="img:icons/from-you.png" size="24px" />
                          </div>
                          <div class="example-cell col-6" tabindex="0" style="width: 277px;">
                              <p class="q-mt-sm q-mb-none q-ml-sm"
                                  style="font-size: 14px; font-weight: bolder; color: #484541;">Distance From You</p>
                              <p class="q-mb-none q-ml-sm" style="font-size: 14px; font-weight: bolder; color: #484541;">
                                  23 KM From East Cikarang</p>
                          </div>
                      </div>
                  </div>
                  <div class="victims-details q-px-md">
                      <div class="row justify-between">
                          <div class="row justify-between">
                              <p class="q-mt-sm q-mb-none" style="font-size: 18px; font-weight: bolder;">Victims</p>
                              <div class="q-ml-md q-mt-sm">
                                  <q-btn-dropdown split align="left" outline style="color: black; border-radius: 5px; width: 102px;"
                                      label="All" dropdown-icon="img:icons/dropdown-arrow.png">
                                      <q-list>
                                          <q-item clickable v-close-popup @click="onItemClick">
                                              <q-item-section>
                                                  <q-item-label>Dead</q-item-label>
                                              </q-item-section>
                                          </q-item>
                                          <q-item clickable v-close-popup @click="onItemClick">
                                              <q-item-section>
                                                  <q-item-label>Missing</q-item-label>
                                              </q-item-section>
                                          </q-item>
                                          <q-item clickable v-close-popup @click="onItemClick">
                                              <q-item-section>
                                                  <q-item-label>Severly Wounded</q-item-label>
                                              </q-item-section>
                                          </q-item>
                                          <q-item clickable v-close-popup @click="onItemClick">
                                              <q-item-section>
                                                  <q-item-label>Lightly Wounded</q-item-label>
                                              </q-item-section>
                                          </q-item>
                                          <q-item clickable v-close-popup @click="onItemClick">
                                              <q-item-section>
                                                  <q-item-label>Evacuated</q-item-label>
                                              </q-item-section>
                                          </q-item>
                                      </q-list>
                                  </q-btn-dropdown>
                              </div>
                          </div>
                          <q-btn flat round color="none" icon="img:icons/edit.png" />
                      </div>
                      <div class="row items-center q-mt-md">
                          <q-icon name="img:icons/children-victims.png" style="width: 26px; height: 26px;" />
                          <p class="q-mb-none q-ml-xs" style="font-size: 14px; font-weight: bold;">Children (0 -
                              16 y.o): 15 person</p>
                      </div>
                      <div class="row items-center q-mt-md">
                          <q-icon name="img:icons/adult-victims.png" style="width: 22px; height: 22px;" />
                          <p class="q-mb-none q-ml-sm" style="font-size: 14px; font-weight: bold;">Adult (17 - 49
                              y.o): 10 person</p>
                      </div>
                      <div class=" row items-center q-mt-md">
                          <q-icon name="img:icons/eldery-victims.png" style="width: 26px; height: 28px;" />
                          <p class="q-mb-none q-ml-xs" style="font-size: 14px; font-weight: bold;">Eldery (50 >=):
                              10 person</p>
                      </div>
                      <div class="row items-center q-mt-md">
                          <q-icon class="q-ml-xs" name="img:icons/pregnant-victims.png"
                              style="width: 10px; height: 28px;" />
                          <p class="q-mb-none q-ml-md" style="font-size: 14px; font-weight: bold;">Pregnant Women:
                              10 person</p>
                      </div>
                  </div>
                  <div class="damage-details q-my-sm q-px-md">
                      <div class="row justify-between">
                          <p class="q-mt-sm q-mb-none" style="font-size: 18px; font-weight: bolder;">Damage</p>
                          <q-btn flat round color="none" icon="img:icons/edit.png" />
                      </div>
                      <p class="q-mb-none q-mt-md" style="font-size: 16px; font-weight: bold;">House</p>
                      <div class="row">
                          <div class="row items-start example-container">
                              <div class="example-cell" tabindex="0">
                                  <q-icon class="q-mt-sm" name="img:icons/major-damage.png" size="24px" />
                              </div>
                              <div class="example-cell col-6" tabindex="0" style="width: 120px;">
                                  <p class="q-mt-sm q-mb-none q-ml-sm"
                                      style="font-size: 14px; font-weight: bolder; color: #484541;">Major Damage</p>
                                  <p class="q-mb-none q-ml-sm"
                                      style="font-size: 14px; font-weight: bolder; color: #484541;">
                                      80 houses</p>
                              </div>
                              <div class=" q-ml-lg row items-start example-container">
                                  <div class="example-cell" tabindex="0">
                                      <q-icon class="q-mt-sm" name="img:icons/minor-damage.png" size="24px" />
                                  </div>
                                  <div class="example-cell col-6" tabindex="0" style="width: 120px;">
                                      <p class="q-mt-sm q-mb-none q-ml-sm"
                                          style="font-size: 14px; font-weight: bolder; color: #484541;">Minor Damage
                                      </p>
                                      <p class="q-mb-none q-ml-sm"
                                          style="font-size: 14px; font-weight: bolder; color: #484541;">
                                          80 houses</p>
                                  </div>
                              </div>
                          </div>
                      </div>
                      <div class="row q-mt-md">
                          <div class="row items-start example-container">
                              <div class="example-cell" tabindex="0">
                                  <q-icon class="q-mt-sm" name="img:icons/medium-damage.png" size="24px" />
                              </div>
                              <div class="example-cell col-6" tabindex="0" style="width: 120px;">
                                  <p class="q-mt-sm q-mb-none q-ml-sm"
                                      style="font-size: 14px; font-weight: bolder; color: #484541;">Medium Damage</p>
                                  <p class="q-mb-none q-ml-sm"
                                      style="font-size: 14px; font-weight: bolder; color: #484541;">
                                      80 houses</p>
                              </div>
                              <div class=" q-ml-lg row items-start example-container">
                                  <div class="example-cell" tabindex="0">
                                      <q-icon class="q-mt-sm" name="img:icons/flooded-damage.png" size="24px" />
                                  </div>
                                  <div class="example-cell col-6" tabindex="0" style="width: 113px;">
                                      <p class="q-mt-sm q-mb-none q-ml-sm"
                                          style="font-size: 14px; font-weight: bolder; color: #484541;">Flooded House
                                      </p>
                                      <p class="q-mb-none q-ml-sm"
                                          style="font-size: 14px; font-weight: bolder; color: #484541;">
                                          80 houses</p>
                                  </div>
                              </div>
                          </div>
                      </div>
                      <p class="q-mb-none q-mt-md" style="font-size: 16px; font-weight: bold;">Public Facilities</p>
                      <div class="row q-mt-md">
                          <div class="row items-start example-container">
                              <div class="example-cell" tabindex="0">
                                  <q-icon class="q-mt-sm" name="img:icons/school-damage.png" size="24px" />
                              </div>
                              <div class="example-cell col-6" tabindex="0" style="width: 120px;">
                                  <p class="q-mt-sm q-mb-none q-ml-sm"
                                      style="font-size: 14px; font-weight: bolder; color: #484541;">School Facilities</p>
                                  <p class="q-mb-none q-ml-sm"
                                      style="font-size: 14px; font-weight: bolder; color: #484541;">
                                      80 Facilities</p>
                              </div>
                              <div class=" q-ml-lg row items-start example-container">
                                  <div class="example-cell" tabindex="0">
                                      <q-icon class="q-mt-sm" name="img:icons/health-damage.png" size="24px" />
                                  </div>
                                  <div class="example-cell col-6" tabindex="0" style="width: 113px;">
                                      <p class="q-mt-sm q-mb-none q-ml-sm"
                                          style="font-size: 14px; font-weight: bolder; color: #484541;">Health Facilities
                                      </p>
                                      <p class="q-mb-none q-ml-sm"
                                          style="font-size: 14px; font-weight: bolder; color: #484541;">
                                          80 Facilities</p>
                                  </div>
                              </div>
                          </div>
                      </div>
                      <div class="q-mt-md row items-start example-container">
                          <div class="example-cell" tabindex="0">
                              <q-icon class="q-mt-sm" name="img:icons/worship-damage.png" size="24px" />
                          </div>
                          <div class="example-cell col-6" tabindex="0" style="width: 120px;">
                              <p class="q-mt-sm q-mb-none q-ml-sm"
                                  style="font-size: 14px; font-weight: bolder; color: #484541;">Worship Place</p>
                              <p class="q-mb-none q-ml-sm" style="font-size: 14px; font-weight: bolder; color: #484541;">
                                  80 Facilities</p>
                          </div>
                      </div>
                  </div>
                  <div class="donation-priorities q-px-md">
                      <div style="display: flex; flex-direction: row; justify-content: space-between;">
                          <p class="q-mt-sm q-mb-none" style="font-size: 18px; font-weight: bolder;">Donation Priorities</p>
                          <q-btn flat round color="none" icon="img:icons/edit.png" />
                      </div>
                      <q-btn class="q-mt-md" unelevated color="none" style="background: #D21315; width: 100%;height: 18px; border-radius: 5px; color: white" label="Medicine 25%" />
                      <q-btn class="q-mt-sm" unelevated color="none" style="background: #D21315; width: 100%;height: 18px; border-radius: 5px; color: white" label="Papan 30%" />
                      <q-btn class="q-mt-sm" unelevated color="none" style="background: #FC440F; width: 100%;height: 18px; border-radius: 5px; color: white" label="Clothing 50%" />
                      <q-btn class="q-mt-sm q-mb-md" unelevated color="none" style="background: #008956; width: 100%;height: 18px; border-radius: 5px; color: white" label="Food 80%" />
                  </div>
              </div>
          </q-page>
      </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'AdminDisasterDetails',
  setup() {
        return {
            onItemClick() {
            }
        }
    }
}
</script>

<style>
* {
    margin: 0;
}

.header {
    width: 100%;
    height: 120px;
    background-color: #F97C21;
}

.header-title {
    color: black;
    font-weight: bolder;
    font-size: 24pX;
}

.topbar {
    margin: 0 24px;
    padding-top: 24px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
}

q-page {
    background-color: #E2E8F0;
}

.maps {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 158px;
}

.dinamic-image {
    display: flex;
    width: auto;
    height: 158px;
    max-height: 158px;
}

.location-and-time {
    width: 100%;
    height: 306px;
    background-color: #F1F5F9;
}

.victims-details {
    width: 100%;
    height: 250px;
    background-color: #F1F5F9;
}

.damage-details {
    width: 100%;
    height: 375px;
    background-color: #F1F5F9;
}

.donation-priorities {
    width: 100%;
    height: 250px;
    background-color: #F1F5F9;
}

.flex-break {
    flex: 1 0 100% !important;
    height: 0 !important;
}
</style>