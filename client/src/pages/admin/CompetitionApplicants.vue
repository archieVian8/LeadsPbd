<template>
  <q-layout view="hHh lpR fF2">
    <q-page>
      <img src="/images/home-banner.jpg" alt="Banner" class="home-banner">
      <div class="main-container">
        <div class="row items-center">
          <q-btn unelevated round color="grey-5" icon="chevron_left" size="sm" />
          <p class="jakarta-b text-3xl q-ml-lg">Data Peserta</p>
        </div>
        <p class="text-lg q-mt-xl">Total Peserta: <span class="jakarta-b">{{ rows.length }}</span></p>
        <div class="q-pa-md">
          <q-table class="jakarta-r q-mt-xl" style="height: 400px" flat bordered :rows="rows" :columns="columns" row-key="index"
            virtual-scroll v-model:pagination="pagination" :rows-per-page-options="[0]">
            <template v-slot:body-cell-action="props">
              <div class="q-gutter-x-md row justify-center">
                <q-btn color="green" @click="showConfirmationChampion(1)" label="Juara" no-caps />
              </div>
            </template>
          </q-table>
          <q-dialog v-model="showConfirmationDialog">
            <q-card>
              <q-card-section>
                <p>Apakah anda yakin ingin menjadikan user ini menjad juara?</p>
              </q-card-section>
              <q-card-actions align="right">
                <q-btn unelevated label="Jadikan Juara" color="primary" @click="makeWinnerUser(championUser)" no-caps />
              </q-card-actions>
            </q-card>
          </q-dialog>
        </div>
      </div>
    </q-page>
  </q-layout>
</template>

<script>
import { ref } from 'vue';
import { api } from 'src/boot/axios';
import { Notify } from 'quasar';

export default {
  name: 'CompetitionApplicants',

  data() {
    return {
      rank: 1,
      showConfirmationDialog: ref(false),
      championUser: ref(null),
    }
  },

  setup() {
    const columns = [
      {
        name: 'index',
        label: 'No',
        field: 'index'
      },
      {
        name: 'firstName',
        align: 'center',
        label: 'Nama Depan',
        field: 'firstName'
      },
      {
        name: 'lastName',
        align: 'center',
        label: 'Nam Belakang',
        field: 'lastName'
      },
      {
        name: 'email',
        align: 'center',
        label: 'Email',
        field: 'email'
      },
      {
        name: 'phoneNumber',
        align: 'center',
        label: 'No. Telepon',
        field: 'phoneNumber'
      },
      {
        name: 'action',
        align: 'center',
        label: 'Juara',
        field: 'action'
      },
    ]

    const rows = ref([])

    return {
      columns,
      rows,

      pagination: ref({
        rowsPerPage: 0
      })
    }
  },

  methods: {
    async getApplicantsData() {
      try {
        const response = await api.post('viewCompetitionApplicants', {
          organizerId: 1,
          competitionId: this.$route.query.compeId
        })
        if (response.data) {
          const data = response.data
          this.rows = data.map((applicant, index) => ({
            index: index,
            firstName: applicant.firstName,
            lastName: applicant.lastName,
            email: applicant.email,
            phoneNumber: applicant.phoneNumber
          }));
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

    showConfirmationChampion(userId) {
      this.championUserId = userId
      this.showConfirmationDialog = true;
    },

    async makeWinnerUser() {
      try {
        const response = await api.post('chooseCompetitionWinnersRanked', {
          organizerId: 1,
          competitionId: this.$route.query.compeId,
          winnerInfo: `${this.rank},Juara ${this.rank}`
        })
        console.log(response);
        Notify.create({
          color: 'green',
          message: 'Berhasil menambahkan juara',
          position: 'top',
          timeout: 2500
        });
        this.rank = this.rank + 1;
        this.showConfirmationDialog = false;
      } catch (error) {
        console.log(error);
        Notify.create({
          color: 'red',
          message: 'Gagal menambahkan juara silahkan coba lagi',
          position: 'top',
          timeout: 2500
        });
        this.showConfirmationDialog = false;
      }
    }
  },

  async mounted() {
    await this.getApplicantsData();
  }
}
</script>
<style scoped></style>
