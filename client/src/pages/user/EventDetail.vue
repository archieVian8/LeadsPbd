<template>
  <q-layout view="hHh lpR fF2">
    <q-page class="main-container">
      <img src="/images/detail-banner.jpg" alt="Banner" class="banner">
      <div class="row justify-between q-mt-lg">
        <div class="col-6">
          <p class="jakarta-b text-3xl">{{ AcadmiAcademicEventData.eventsName }}</p>
          <div class="row items-center q-mt-md">
            <q-icon name="img:/icons/participant.png" size="24px" />
            <p class="jakarta-sb q-ml-md">Diikuit oleh <span class="jakarta-b">{{ AcadmiAcademicEventData.capacityTotal -
              AcadmiAcademicEventData.capacityTersisa }}</span> Tim</p>
          </div>
          <p class="q-mt-md">Kategori: <span class="jakarta-b">{{ AcadmiAcademicEventData.eventCategory }}</span></p>
          <p class="q-mt-md">Jenjang: <span class="jakarta-b">{{ AcadmiAcademicEventData.eventsJenjang }}</span></p>
          <p class="q-mt-md">Tempat Pelaksanaan: <span class="jakarta-b">{{ AcadmiAcademicEventData.eventsHeld }}</span></p>
          <p class="q-mt-md">Kapasitas Tersisa: <span class="jakarta-b">{{ AcadmiAcademicEventData.capacityTersisa
          }}</span></p>
        </div>
        <div class="col-5 right-container">
          <div class="row justify-between items-center text-lg">
            <p class="jakarta-r">Buka Pendaftaran</p>
            <p class="jakarta-b" style="color: red;">{{ AcadmiAcademicEventData.registrationDate }}</p>
          </div>
          <div class="row justify-between items-center text-lg">
            <p class="jakarta-r">Status</p>
            <p class="jakarta-b" style="color: red;">{{ AcadmiAcademicEventData.capacityStatus }}</p>
          </div>
        </div>
      </div>
      <div class="border-container q-mt-xl">
        <p class="jakarta-b text-lg">Deskripsi</p>
        <p class="jakarta-r text-md q-mt-md">{{ AcadmiAcademicEventData.deskripsiEvent }}</p>
      </div>
      <div class="border-container q-mt-xl">
        <p class="jakarta-b text-lg">Lokasi</p>
        <p class="jakarta-r text-md q-mt-md">{{ AcadmiAcademicEventData.eventsLoc }}</p>
      </div>
      <div class="border-container q-mt-xl">
        <p class="jakarta-b text-lg">Waktu dan Tangggal</p>
        <p class="jakarta-r text-md q-mt-md">{{ AcadmiAcademicEventData.eventsDate }}</p>
      </div>
      <div class="border-container q-mt-xl">
        <p class="jakarta-b text-lg">Kapasitas </p>
        <p class="jakarta-r text-md q-mt-md">{{ AcadmiAcademicEventData.capacityTotal }}</p>
      </div>
      <q-btn @click="this.$router.push('/home')" outline color="grey-10" label="Kembali" class="q-mt-xl" no-caps />
      <q-btn @click="joinEvent()" color="primary" label="Daftar Sekarang" class="q-mt-md" no-caps />
    </q-page>
  </q-layout>
</template>

<script>
import { api } from 'src/boot/axios';
import { Notify } from 'quasar';
import { getUserId } from 'src/utils/localStorage';

export default {
  name: 'EventDetail',

  data() {
    return {
      AcadmiAcademicEventData: [],
    }
  },

  methods: {
    async getAcadmiAcademicEventData() {
      try {
        const response = await api.post('viewAcademicEventsById', {
          academicEventsId: this.$route.query.eventId
        })
        if (response.data.eventsName) {
          this.AcadmiAcademicEventData = response.data;
        } else {
          Notify.create({
            color: 'red',
            message: 'Gagal mengambil data kompetisi silakan refresh halaman',
            position: 'top',
            timeout: 2500
          });
        }
      } catch (error) {
        console.log(error);
        Notify.create({
          color: 'red',
          message: 'Gagal mengambil data kompetisi silakan refresh halaman',
          position: 'top',
          timeout: 2500
        });
      }
    },

    async joinEvent() {
      const id = getUserId();
      try {
        const response = await api.post('joinAcademicEvents', {
          userId: id,
          academicEventsId: this.$route.query.eventId
        });
        console.log(response);
        if (response.data.status === "Success") {
          Notify.create({
            color: 'green',
            message: 'Berhasil mengikuti Event Akdemik',
            position: 'top',
            timeout: 2500
          });
          this.$router.push('/home');
        } else {
          Notify.create({
            color: 'red',
            message: `${response.data.status}`,
            position: 'top',
            timeout: 2500
          });
        }
      } catch (error) {
        console.log(error);
        Notify.create({
          color: 'red',
          message: 'Gagal mengikuti Event Akdemik silahkan coba kembali',
          position: 'top',
          timeout: 2500
        });
      }
    }
  },

  async mounted() {
    await this.getAcadmiAcademicEventData();
  }
}
</script>

<style scoped>
.banner {
  width: 100%;
  object-fit: cover;
}

.right-container {
  display: flex;
  width: 553px;
  height: fit-content;
  padding: 24px;
  flex-direction: column;
  gap: 12px;
  border-radius: 15px;
  border: 1px solid #000;
  background: #FAFAFA;
}

.border-container {
  width: 100%;
  height: fit-content;
  padding: 24px;
  border-radius: 15px;
  border: 1px solid #171717;
}

.q-btn {
  width: 100%;
  height: 42px;
  border-radius: 6px;
  font-weight: bold;
  color: white;
}
</style>
