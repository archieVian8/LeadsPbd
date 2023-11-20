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
              <div class="maps">
                  <q-icon class="maps-image" name="img:icons/static-maps.png"/>
              </div>
          </q-page>
      </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'AdminMapView'
}
</script>

<style>
*{
    margin: 0;
    background-color: none;
}

.header {
    width: 100%;
    height: 120px;
    background-color: #F97C21;
 }

.header-title{
    color: black;
    font-weight: bolder;
    font-size:24pX;
}
.topbar{
    margin: 0 24px;
    padding-top: 24px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
}
.maps{
    width: 100%;
    height: 100%;
    display: flex;
    position: fixed;
}
.maps-image {
    display: flex;
    height: auto;
    width: auto;
}
</style>