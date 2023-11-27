<template>
  <q-layout view="hHh lpR fF2">
    <q-page class="main-container">
      <div class="profile-container">
        <img src="/images/profile-banner.png" alt="Banner" class="banner">
        <div class="row items-center">
          <q-icon name="img:/icons/avatar.png" size="64px" />
          <p class="jakarta-b text-lg q-ml-md">{{ userData.firstName }} {{ userData.lastName }}</p>
        </div>
        <q-separator class="divider" />
        <div class="about-container">
          <p class="jakarta-b text-md">About Me</p>
          <p class="jakarta-r text-justify">{{ userData.about }}</p>
        </div>
        <div class="achievement-container ">
          <p class="jakarta-b text-md">Penghargaan</p>
          <div v-if="userAchievements.length > 0" v-for="achievement in userAchievements">
            <div class="row justify-start">
              <q-icon name="img:/icons/compe-icon.png" size="56px" class="q-mr-lg" />
              <div class="text-container">
                <p class="jakarta-b text-md">{{ achievement.rankWinners }}</p>
                <p class="jakarta-b text-md">{{ achievement.competitionName }}</p>
                <p class="jakarta-b text-md">Kategori {{ achievement.competitionCategory }}</p>
                <p class="jakarta-b text-grey text-md">{{ achievement.organizerInstitution }}, {{ achievement.organizerName }}</p>
              </div>
            </div>
            <q-separator class="divider q-mt-md" />
          </div>
          <p v-else class="jakarta-b text-grey text-md">User belum mempunyai penghargaan</p>
        </div>
      </div>
    </q-page>
  </q-layout>
</template>

<script>
import { api } from 'src/boot/axios';
import { Notify } from 'quasar';
import { getUserId } from 'src/utils/localStorage';

export default {
  name: 'Achievement',

  data() {
    return {
      userData: [],
      userAchievements: [],
    }
  },

  methods: {
    async getUserData() {
      try {
        const id = getUserId();
        const response = await api.post('viewProfileById', {
          userId: id
        })
        if (response.data[0].firstName) {
          this.userData = response.data[0];
          console.log(this.userData);
        } else {
          Notify.create({
            color: 'red',
            message: 'Gagal mengambil data user silakan refresh halaman',
            position: 'top',
            timeout: 2500
          });
        }
      } catch (error) {
        console.log(error);
        Notify.create({
          color: 'red',
          message: 'Gagal mengambil data user silakan refresh halaman',
          position: 'top',
          timeout: 2500
        });
      }
    },

    async getAchievementData() {
      try {
        const id = getUserId();
        const response = await api.post('viewUserAchievement', {
          userId: id
        })
        if (response.data[0].competitionName) {
          this.userAchievements = response.data;
          console.log(this.userAchievements);
        } else {
          Notify.create({
            color: 'red',
            message: 'Gagal mengambil data penghargaan silakan refresh halaman',
            position: 'top',
            timeout: 2500
          });
        }
      } catch (error) {
        console.log(error);
        Notify.create({
          color: 'red',
          message: 'Gagal mengambil data penghargaan silakan refresh halaman',
          position: 'top',
          timeout: 2500
        });
      }
    },
  },

  async mounted() {
    await this.getUserData();
    await this.getAchievementData();
  }
}
</script>

<style scoped>
.profile-container {
  display: flex;
  width: 100%;
  height: fit-content;
  padding: 24px;
  flex-direction: column;
  align-items: flex-start;
  gap: 18px;
  border-radius: 15px;
  background: #FAFAFA;
  box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.25);
}

.banner {
  width: 100%;
  object-fit: cover;
}

.divider {
  width: 100%;
  height: 1px;
  background-color: #A3A3A3;
}

.about-container {
  display: flex;
  width: 100%;
  height: fit-content;
  padding: 12px;
  flex-direction: column;
  align-items: flex-start;
  gap: 18px;
  border-radius: 12px;
  border: 1px solid #000;
  background: #F5F5F5;
}

.achievement-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 18px;
}

/* .text-container {
  display: flex;
  flex-direction: column;
  gap: 2px;
} */
</style>
