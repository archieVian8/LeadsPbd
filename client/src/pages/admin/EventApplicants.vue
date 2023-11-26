<template>
  <q-layout view="hHh lpR fF2">
    <q-page>
      <img src="/images/home-banner.jpg" alt="Banner" class="home-banner">
      <div class="main-container">
        <div class="row items-center">
          <q-btn unelevated round color="grey-5" icon="chevron_left" size="sm" />
          <p class="jakarta-b text-3xl q-ml-lg">Data Peserta Events</p>
        </div>
        <p class="text-lg q-mt-xl">Total Peserta: <span class="jakarta-b">{{ rows.length }}</span></p>
        <div class="q-pa-md">
          <q-table class="jakarta-r q-mt-xl" style="height: 400px" flat bordered :rows="rows" :columns="columns" row-key="index"
            virtual-scroll v-model:pagination="pagination" :rows-per-page-options="[0]" />
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
  name: 'EventApplicants',

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
        const response = await api.post('viewAcademicEventsApplicants', {
          organizerId: id,
          academicEventsId: this.$route.query.eventId
        })
        console.log(response);
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
    }
  },

  async mounted() {
    await this.getApplicantsData();
  }
}
</script>
<style scoped></style>
