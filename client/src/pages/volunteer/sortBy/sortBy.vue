<template>
  <q-layout view="hHh lpR fF2" style="background-color: #ffffff">
    <q-page width="360px" height="800px">
      <q-header
        style="height: 110px; overflow: hidden; background-color: #56bde6"
      >
        <q-toolbar class="q-mt-xl">
          <q-btn dense flat round icon="account_circle" size="24px" />
          <q-toolbar-title
            class="text-center text-uppercase text-overline"
            style="font-size: 24px"
          >
            SORT BY
          </q-toolbar-title>
          <q-btn dense flat round icon="notifications" size="24px" />
        </q-toolbar>
        <div class="circle-1"></div>
        <div class="circle-2"></div>
        <div class="circle-3"></div>
        <div class="circle-4"></div>
      </q-header>
      <q-page-container>
        <q-page padding>
          <div class="row justify-start items-center">
            <p
              class="q-mt-md q-ml-md text-capitalize"
              style="font-size: 18px; margin-right: 12px; font-weight: 500"
            >
              Sort By
            </p>
            <div>
              <q-btn-dropdown dense no-caps label="Distance">
                <q-list>
                  <q-item clickable v-close-popup @click="onItemClick">
                    <q-item-section>
                      <q-item-label>Distance</q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item clickable v-close-popup @click="onItemClick">
                    <q-item-section>
                      <q-item-label>Needs</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-btn-dropdown>
            </div>
            <div>
              <q-btn-dropdown
                dense
                no-caps
                label="Overview"
                style="margin-left: 8px"
              >
                <q-list>
                  <q-item clickable v-close-popup @click="onItemClick">
                    <q-item-section>
                      <q-item-label>Food</q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item clickable v-close-popup @click="onItemClick">
                    <q-item-section>
                      <q-item-label>Medicine</q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item clickable v-close-popup @click="onItemClick">
                    <q-item-section>
                      <q-item-label>Clothing</q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item clickable v-close-popup @click="onItemClick">
                    <q-item-section>
                      <q-item-label>Logistic</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-btn-dropdown>
            </div>
          </div>
          <q-card
            class="q-mt-md q-mb-lg q-mx-md shadow-7"
            style="border-radius: 20px"
          >
            <q-icon
              name="img:icons/static-maps.svg"
              size="200px"
              style="
                text-align: center;
                width: auto;
                height: auto;
                filter: brightness(70%);"
            />
            <q-card-section>
              <div class="row justify-start q-mt-xs">
                <div>
                  <p
                    class="font-poppins text-weight-medium"
                    style="display: inline; font-size: 12px"
                  >
                    Earthquake at 08/02/2023 at 10:42 AM
                  </p>
                </div>
              </div>
              <div class="q-mt-sm">
                <q-icon
                  class="q-mr-sm"
                  name="img:icons/disaster-location.svg"
                  size="16px"
                />
                <p
                  class="q-mt-md text-capitalize text-weight-medium"
                  style="color: #ec7e88; font-size: 14px; display: inline"
                >
                  disaster location
                </p>
                <p
                  class="q-mt-xs q-mb-none text-capitalize text-weight-medium"
                  color="dark"
                  style="font-size: 14px; margin-left: 28px"
                >
                  Lowokwaru, Malang, East Java, Indonesia
                </p>
              </div>
              <div class="q-mt-xs">
                <q-icon
                  class="q-mr-sm"
                  name="img:icons/map-marker-distance.svg"
                  size="16px"
                />
                <p
                  class="q-mt-md text-capitalize text-weight-medium"
                  style="color: #ec7e88; font-size: 14px; display: inline"
                >
                  Distance From You
                </p>
                <p
                  class="q-mt-xs q-mb-none text-capitalize text-weight-medium"
                  color="dark"
                  style="font-size: 14px; margin-left: 28px"
                >
                  23 KM from East Cikarang
                </p>
              </div>
            </q-card-section>
          </q-card>
          <q-card
            class="q-mt-lg q-mb-lg q-mx-md shadow-7"
            style="border-radius: 20px"
          >
            <q-icon
              name="img:icons/static-maps.svg"
              size="200px"
              style="
                text-align: center;
                width: auto;
                height: auto;
                filter: brightness(70%);
              "
            />
            <q-card-section>
              <div class="row justify-start q-mt-xs">
                <div>
                  <p
                    class="font-poppins text-weight-medium"
                    style="display: inline; font-size: 12px"
                  >
                    Earthquake at 08/02/2023 at 10:42 AM
                  </p>
                </div>
              </div>
              <div class="q-mt-sm">
                <q-icon
                  class="q-mr-sm"
                  name="img:icons/disaster-location.svg"
                  size="16px"
                />
                <p
                  class="q-mt-md text-capitalize text-weight-medium"
                  style="color: #ec7e88; font-size: 14px; display: inline"
                >
                  disaster location
                </p>
                <p
                  class="q-mt-xs q-mb-none text-capitalize text-weight-medium"
                  color="dark"
                  style="font-size: 14px; margin-left: 28px"
                >
                  Lowokwaru, Malang, East Java, Indonesia
                </p>
              </div>
              <div class="q-mt-xs">
                <q-icon
                  class="q-mr-sm"
                  name="img:icons/map-marker-distance.svg"
                  size="16px"
                />
                <p
                  class="q-mt-md text-capitalize text-weight-medium"
                  style="color: #ec7e88; font-size: 14px; display: inline"
                >
                  Distance From You
                </p>
                <p
                  class="q-mt-xs q-mb-none text-capitalize text-weight-medium"
                  color="dark"
                  style="font-size: 14px; margin-left: 28px"
                >
                  23 KM from East Cikarang
                </p>
              </div>
            </q-card-section>
          </q-card>
          <q-card
            class="q-mt-lg q-mb-lg q-mx-md shadow-7"
            style="border-radius: 20px"
          >
            <q-icon
              name="img:icons/static-maps.svg"
              size="200px"
              style="
                text-align: center;
                width: auto;
                height: auto;
                filter: brightness(70%);
              "
            />
            <q-card-section>
              <div class="row justify-start q-mt-xs">
                <div>
                  <p
                    class="font-poppins text-weight-medium"
                    style="display: inline; font-size: 12px"
                  >
                    Earthquake at 08/02/2023 at 10:42 AM
                  </p>
                </div>
              </div>
              <div class="q-mt-sm">
                <q-icon
                  class="q-mr-sm"
                  name="img:icons/disaster-location.svg"
                  size="16px"
                />
                <p
                  class="q-mt-md text-capitalize text-weight-medium"
                  style="color: #ec7e88; font-size: 14px; display: inline"
                >
                  disaster location
                </p>
                <p
                  class="q-mt-xs q-mb-none text-capitalize text-weight-medium"
                  color="dark"
                  style="font-size: 14px; margin-left: 28px"
                >
                  Lowokwaru, Malang, East Java, Indonesia
                </p>
              </div>
              <div class="q-mt-xs">
                <q-icon
                  class="q-mr-sm"
                  name="img:icons/map-marker-distance.svg"
                  size="16px"
                />
                <p
                  class="q-mt-md text-capitalize text-weight-medium"
                  style="color: #ec7e88; font-size: 14px; display: inline"
                >
                  Distance From You
                </p>
                <p
                  class="q-mt-xs q-mb-none text-capitalize text-weight-medium"
                  color="dark"
                  style="font-size: 14px; margin-left: 28px"
                >
                  23 KM from East Cikarang
                </p>
              </div>
            </q-card-section>
          </q-card>
        </q-page>
      </q-page-container>
      <q-footer reveal elevated>
        <q-tabs
          v-model="tab"
          dense
          align="center"
          class="text-white shadow-2"
          :breakpoint="0"
          style="background-color: #ffffff; height: 60px"
        >
          <q-tab
            label="Home"
            icon="fa-solid fa-home"
            size="16px"
            style="color: #64748b"
          />
          <q-tab
            label="Maps"
            icon="fa-solid fa-earth-americas"
            size="16px"
            style="color: #64748b"
          />
          <q-tab
            label="Sort by"
            icon="fa-solid fa-sliders"
            size="16px"
            style="color: #56bde6"
          />
          <q-tab
            label="Reports"
            icon="fa-solid fa-chart-simple"
            size="16px"
            style="color: #64748b"
          />
        </q-tabs>
      </q-footer>
    </q-page>
  </q-layout>
</template>

<script>
export default {
  name: 'sortBy'
}
</script>

<style lang="sass">
.circle-1
  position: absolute
  width: 190px
  height: 190px
  left: -80px
  top: 49px
  background: #F8FAFC
  opacity: 0.3
  border-radius: 50%


.circle-2
  position: absolute
  width: 190px
  height: 190px
  left: 233px
  top: -115px
  background: #F8FAFC
  opacity: 0.3
  border-radius: 50%

.circle-3
  position: absolute
  width: 25px
  height: 25px
  left: 342px
  top: 101px
  background: #F8FAFC
  opacity: 0.3
  border-radius: 50%

.circle-4
  position: absolute
  width: 25px
  height: 25px
  left: 168px
  top: -13px
  background: #F8FAFC
  opacity: 0.3
  border-radius: 50%

.view-button
  background-color: #83CEED

.donation-title
  font-size: 14px

.donation-details
  font-size: 10px

.accepted
  padding: 4px 3px
  font-size: 10px
  align-items: center
  color: #008956
  display: inline
  border-style: solid
  border-color: #008956
  border-radius: 4px
  border-width: 1px

.declined
  padding: 4px 3px
  font-size: 10px
  align-items: center
  color: #EC2D2E
  display: inline
  border-style: solid
  border-color: #EC2D2E
  border-radius: 4px
  border-width: 1px

.pending
  padding: 4px 3px
  font-size: 10px
  align-items: center
  color: #FD6A40
  display: inline
  border-style: solid
  border-color: #FD6A40
  border-radius: 4px
  border-width: 1px

.disabled-dono
  background: #CBD5E1
  color: #64748B
</style>
