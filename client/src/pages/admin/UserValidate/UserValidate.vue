<template>
  <q-layout>
    <q-page>
      <div class="q-ma-md">
        <div class="row justify-between q-mb-lg">
          <div class="row items-center">
            <q-btn unelevated round color=#E2E8F0 icon="img:icons/admin/AddDisaster/arrow-left.svg" 
            :to='`/admin?Uid=${this.Uid}&Uname=${this.Uname}`' />
            <p class="q-mb-none text-h6 text-weight-bold">Aktivasi Akun</p>
          </div>
          <q-select outlined v-model="statusFilter" color="orange" :options="statusOptions" dense />
        </div>
        <q-input rounded outlined v-model="search" type="search" color="orange" placeholder="Cari Akun"
          class="q-mt-sm q-mb-lg q-pt-sm" dense>
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
        <div>
          <div class="account-card q-pa-md q-mb-md" v-for="(account, index) in filteredAccounts">
            <div class="row justify-between">
              <div>
                <p class="text-weight-bold">Aktivasi Akun</p>
                <p>{{ formatDateTime(account.createdAt) + ' WIB' }}</p>
                <p>{{ 'Peran : ' + account.role }}</p>
                <p>{{ 'Instansi : ' + account.instansi }}</p>
                <p>{{ 'Nama : ' + account.accountName }}</p>
                <p>{{ 'ID Keanggotaan : ' + account.idKeanggotaan }}</p>
                <p>{{ 'NIK : ' + account.nik }}</p>
                <p>{{ 'Jenis Kelamin : ' + account.gender }}</p>
                <p>{{ 'Email : ' + account.email }}</p>
                <p>{{ 'Nomor Telepon : ' + account.nomorTelepon }}</p>
              </div>
              <div :class="['status-container', getStatusClass(account.accountStatus)]">
                <p>{{ getAccountStatus(account.accountStatus) }}</p>
              </div>
            </div>
            <div class="row justify-between q-mt-md">
              <q-btn v-if="account.accountStatus == 1" unelevated class="accept-button" label="Aktivasi Akun Diterima" disable
                no-caps />
              <q-btn v-if="account.accountStatus == 2" unelevated class="decline-button" label="Aktivasi Akun Ditolak" disable
                no-caps />
              <q-btn v-if="account.accountStatus == 0" unelevated class="decline-button col-5"
                @click="declineAccount(accounts[index])" label="Tolak" no-caps />
              <q-btn v-if="account.accountStatus == 0" unelevated class="accept-button col-5"
                @click="approveAccount(accounts[index])" label="Terima" no-caps />
            </div>
          </div>
        </div>
      </div>
    </q-page>
  </q-layout>
</template>

<script>
import { ref } from 'vue';
import { api } from 'boot/axios';
import { Notify } from 'quasar';

export default {
  name: 'AccountValidate',

  data() {
    return {
      accounts: [],
      unApprovedAccounts: [],
      approvedAccounts: [],
      declinedAccounts: []
    }
  },

  setup() {
    return {
      statusFilter: ref('Semua'),
      statusOptions: [
        'Semua', 'Menunggu', 'Diterima', 'Ditolak'
      ],
      search: ref('')
    }
  },

  methods: {
    async getAccountData() {
      try {
        const unApprovedResponse = await api.get('/admin/getUnApproveAccount');
        const unApprovedAccounts = unApprovedResponse.data.map(item => ({
          id: item.id,
          accountName: item.accountName,
          role: item.role,
          gender: item.gender,
          email: item.email,
          password: item.password,
          nomorTelepon: item.nomorTelepon,
          nik: item.nik,
          instansi: item.instansi,
          idKeanggotaan: item.idKeanggotaan,
          accountStatus: item.accountStatus,
          createdAt: item.createdAt
        })).reverse();
        const approvedResponse = await api.get('/admin/getApproveAccount');
        const approvedAccounts = approvedResponse.data.map(item => ({
          id: item.id,
          accountName: item.accountName,
          role: item.role,
          gender: item.gender,
          email: item.email,
          password: item.password,
          nomorTelepon: item.nomorTelepon,
          nik: item.nik,
          instansi: item.instansi,
          idKeanggotaan: item.idKeanggotaan,
          accountStatus: item.accountStatus,
          createdAt: item.createdAt
        })).reverse();
        const declinedResponse = await api.get('/admin/getDeclineAccount');
        const declinedAccounts = declinedResponse.data.map(item => ({
          id: item.id,
          accountName: item.accountName,
          role: item.role,
          gender: item.gender,
          email: item.email,
          password: item.password,
          nomorTelepon: item.nomorTelepon,
          nik: item.nik,
          instansi: item.instansi,
          idKeanggotaan: item.idKeanggotaan,
          accountStatus: item.accountStatus,
          createdAt: item.createdAt
        })).reverse();
        const accounts = [...unApprovedAccounts, ...approvedAccounts, ...declinedAccounts];
        accounts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        this.accounts = accounts;
      } catch (error) {
        console.log(error);
        Notify.create({
          color: 'red',
          message: 'Gagal mengambil data silakan restart aplikasi',
          position: 'top',
          timeout: 2500
        });
      }
    },

    getAccountStatus(status) {
      switch (status) {
        case 0:
          return 'Menunggu'
        case 1:
          return 'Diterima'
        case 2:
          return 'Ditolak'
      }
    },

    getStatusClass(status) {
      switch (status) {
        case 0:
          return 'text-orange-5'
        case 1:
          return 'text-green-9'
        case 2:
          return 'text-red-9'
      }
    },

    formatDateTime(dateString) {
      const date = new Date(dateString);
      const options = {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      };
      const formattedDate = date.toLocaleString('en-ID', options).replace(',', ' ');
      return formattedDate;
    },

    async approveAccount(row) {
      console.log('Approve Account called')
      const payload = {
        id: row.id,
      }
      console.log(payload)
      try {
        const response = await api.post('/admin/approveAccount', payload);
        Notify.create({
          color: 'green',
          message: 'Berhasil Aktivasi Akun',
          position: 'top',
          timeout: 1000
        });
        window.location.reload();
      } catch (error) {
        console.log(error);
        Notify.create({
          color: 'red',
          message: 'Gagal menerima akun silahkan coba lagi',
          position: 'top',
          timeout: 2500
        });
      }
    },

    async declineAccount(row) {
      console.log("Decline Account")
      const payload = {
        id: row.id,
      }
      console.log(payload)
      try {
        const response = await api.post('/admin/declineAccount', payload);
        Notify.create({
          color: 'green',
          message: 'Berhasil Menolak Aktivasi Akun',
          position: 'top',
          timeout: 1000
        });
        window.location.reload();
      } catch (error) {
        console.error(error)
        Notify.create({
          color: 'red',
          message: 'Gagal Menolak Aktivasi Akun Silahkan Coba Lagi',
          position: 'top',
          timeout: 2500
        });
      }
    },

    filterAccounts() {
      const filtered = this.accounts.filter(account => {
        const searchMatch =
          account.accountName.toLowerCase().includes(this.search.toLowerCase()) ||
          account.role.toLowerCase().includes(this.search.toLowerCase()) ||
          account.instansi.toLowerCase().includes(this.search.toLowerCase()) ||
          account.idKeanggotaan.toLowerCase().includes(this.search.toLowerCase()) ||
          this.formatDateTime(account.createdAt)
            .toLowerCase()
            .includes(this.search.toLowerCase());

        if (this.statusFilter === 'Semua') {
          return searchMatch;
        } else {
          const status = this.statusFilter === 'Menunggu' ? 0 : this.statusFilter === 'Diterima' ? 1 : 2;
          return searchMatch && account.accountStatus === status;
        }
      });

      return filtered;
    },
  },

  computed: {
    filteredAccounts() {
      return this.filterAccounts();
    },
  },

  mounted() {
    this.getAccountData();
    this.Uid = this.$route.query.Uid;
    this.Uname = this.$route.query.Uname;
  }
}
</script>

<style>
.account-card {
  width: 100%;
  height: fit-content;
  border-radius: 5px;
  box-shadow: 0px 2px 20px 0px rgba(0, 0, 0, 0.25);
}

.status-container {
  height: fit-content;
  padding: 2px 3px;
  border-radius: 5px;
  border: 2px solid;
  font-weight: bold;
}

.accept-button {
  width: 100%;
  height: 32px;
  border-radius: 5px;
  background-color: #008956;
  color: white;
}

.decline-button {
  width: 100%;
  height: 32px;
  border-radius: 5px;
  background-color: #EC2D2E;
  color: white;
}
</style>
