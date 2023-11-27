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
          <q-table class="jakarta-r q-mt-xl" style="height: 400px" flat bordered :rows="rows" :columns="columns"
            row-key="index" virtual-scroll v-model:pagination="pagination" :rows-per-page-options="[0]">
            <template v-slot:body-cell-action="props">
              <div class="q-gutter-x-md row justify-center">
                <q-btn color="green" @click="showConfirmationChampion(props.row.index)" label="Juara" no-caps />
              </div>
            </template>
          </q-table>
          <q-dialog v-model="showConfirmationDialog">
            <q-card>
              <q-card-section>
                <p>Apakah anda yakin ingin menjadikan user ini menjad juara?</p>
                <p class="q-mt-md">Rank</p>
                <q-input outlined v-model="rank" type="number"
                  :rules="[(val) => !!val || 'Rank wajib diisi']" dense/>
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
import { getUserId } from 'src/utils/localStorage';

export default {
  name: 'CompetitionApplicants',

  data() {
    return {
      rank: ref(null),
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
        const id = getUserId();
        const response = await api.post('viewCompetitionApplicants', {
          organizerId: id,
          competitionId: this.$route.query.compeId
        })
        if (response.data[0].Status === "Anda tidak memiliki izin untuk melihat pendaftar kompetisi") {
          Notify.create({
            color: 'red',
            message: 'Anda tidak memiliki izin untuk melihat pendaftar kompetisi',
            position: 'top',
            timeout: 2500
          });
          this.$router.push('/organizer/competition');
        } else {
          const data = response.data
          this.rows = data.map((applicant, index) => ({
            index: index + 1,
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
      this.championUser = userId
      this.showConfirmationDialog = true;
    },

    async makeWinnerUser(userId) {
      try {
        const id = getUserId();
        const response = await api.post('chooseCompetitionWinnersRanked', {
          organizerId: id,
          competitionId: this.$route.query.compeId,
          winnerInfo: `${userId},Juara ${this.rank}`
        });
        if (response.data.Status != "Pemenang berhasil ditentukan manual dengan peringkat") {
          Notify.create({
            color: 'red',
            message: `${response.data.Status}`,
            position: 'top',
            timeout: 2500
          });
        } else {
          Notify.create({
            color: 'green',
            message: 'Berhasil menambahkan juara',
            position: 'top',
            timeout: 2500
          });
          this.rank = this.rank + 1;
          this.showConfirmationDialog = false;
        }
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
