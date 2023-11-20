<template>
  <q-layout view="hHh lpR fF2">
    <q-page>
      <q-carousel arrows animated v-model="slide">
        <q-carousel-slide name="first" class="volunteer-section">
          <div class="parent column justify-center items-center">
            <img src="/icons/landing/landing-volunteer.png" />
            <p class="poppins-sb text-center q-mt-lg q-pt-lg" color="white">
              Mendata setiap bencana dan kebutuhan korban pada setiap lokasi penampungan
            </p>
            <div class="btn-parent">
              <q-btn unelevated class="volunteer-btn" label="Lanjutkan Sebagai Pengguna" to="/roles/volunteer" no-caps />
            </div>
          </div>
        </q-carousel-slide>
        <q-carousel-slide name="second" class="admin-section">
          <div class="parent column justify-center items-center">
            <img src="/icons/landing/landing-admin.png" />
            <p class="poppins-md text-center q-mt-lg q-pt-lg" color="white">
              Bantu penyaluran kebutuhan para korban sesuai dengan kebutuhan yang telah ditetapkan
            </p>
            <div class="btn-parent">
              <q-btn unelevated class="admin-btn" label="Lanjutkan Sebagai Admin" to="/roles/admin" no-caps />
            </div>
          </div>
        </q-carousel-slide>
      </q-carousel>
    </q-page>
  </q-layout>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'Roles',
  setup() {
    return {
      slide: ref('first')
    }
  }
}

</script>

<style>
.q-carousel {
  width: 100%;
  height: 100vh;
}

.parent {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.admin-section {
  width: 100vh;
  height: 100vh;
  padding-top: 20vh;
  background-color: #FA9851;
  color: white;
}

.volunteer-section {
  width: 100%;
  height: 100%;
  padding-top: 20vh;
  background-color: #56BDE6;
  color: white;
}

img {
  max-width: calc(100vw - 32px);
}

.btn-parent {
  width: 100%;
  margin-top: 64px;
}

.volunteer-btn {
  width: 100%;
  height: 42px;
  border-radius: 8px;
  background-color: #2AACDF;
  color: white;
}

.admin-btn {
  width: 100%;
  height: 42px;
  border-radius: 8px;
  background-color: #F97C21;
  color: white;
}
</style>
