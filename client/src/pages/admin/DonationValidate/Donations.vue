<template>
  <q-layout>
    <q-page>
      <div class="q-ma-md">
        <div class="row justify-between q-mb-lg">
          <div class="row items-center">
            <q-btn unelevated round color=#E2E8F0 icon="img:icons/admin/AddDisaster/arrow-left.svg" 
             :to='`/admin?Uid=${this.Uid}&Uname=${this.Uname}`' />
            <p class="q-mb-none text-h6 text-weight-bold">Validasi Bantuan</p>
          </div>
          <q-select outlined v-model="statusFilter" color="orange" :options="statusOptions" dense />
        </div>
        <q-input rounded outlined v-model="search" type="search" color="orange" placeholder="Cari Bantuan"
          class="q-mt-sm q-mb-lg q-pt-sm" dense>
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
        <div>
          <div class="donation-card q-pa-md q-mb-md" v-for="(donation, index) in filteredDonations">
            <div class="row justify-between">
              <div>
                <p class="text-weight-bold">Bantuan</p>
                <p>{{ formatDateTime(donation.createdAt) + ' WIB' }}</p>
                <p>{{ 'Pengirim: ' + donation.userDonate }}</p>
                <p>{{ 'Dikirim Untuk: ' + donation.evacName }}</p>
              </div>
              <div :class="['status-container', getStatusClass(donation.donateStatus)]">
                <p>{{ getDonationStatus(donation.donateStatus) }}</p>
              </div>
            </div>
            <div class="row q-mt-md">
              <img class="donation-img" :src="getDonationImage(donation.needsType)" />
              <div class="q-ml-sm">
                <p class="text-weight-bold">{{ donation.needsName }}</p>
                <p class="text-caption text-weight-medium">{{ 'Tipe Bantuan: ' + donation.needsType }}</p>
                <p class="text-caption text-weight-medium">{{ 'Kuantitas : ' + donation.donateQuantity }}</p>
              </div>
            </div>
            <div class="row justify-between q-mt-md">
              <q-btn v-if="donation.donateStatus == 1" unelevated class="accept-button" label="Bantuan Diterima" disable
                no-caps />
              <q-btn v-if="donation.donateStatus == 2" unelevated class="decline-button" label="Bantuan Ditolak" disable
                no-caps />
              <q-btn v-if="donation.donateStatus == 0" unelevated class="decline-button col-5"
                @click="declineDonate(donations[index])" label="Tolak" no-caps />
              <q-btn v-if="donation.donateStatus == 0" unelevated class="accept-button col-5"
                @click="approveDonate(donations[index])" label="Terima" no-caps />
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
  name: 'AdminDonations',

  data() {
    return {
      donations: [],
      unApprovedDonations: [],
      approvedDonations: [],
      declinedDonations: []
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
    async getDonateData() {
      try {
        const unApprovedResponse = await api.get('/admin/getUnApproveDonate');
        const unApprovedDonations = unApprovedResponse.data.map(item => ({
          id: item.id,
          itemId: item.itemId,
          evacName: item.evacName,
          userDonate: item.userDonate,
          needsName: item.needsName,
          needsType: item.needsType,
          donateQuantity: item.donateQuantity,
          donateStatus: item.donateStatus,
          createdAt: item.createdAt
        })).reverse();
        const approvedResponse = await api.get('/admin/getApproveDonate');
        const approvedDonations = approvedResponse.data.map(item => ({
          id: item.id,
          itemId: item.itemId,
          evacName: item.evacName,
          userDonate: item.userDonate,
          needsName: item.needsName,
          needsType: item.needsType,
          donateQuantity: item.donateQuantity,
          donateStatus: item.donateStatus,
          createdAt: item.createdAt
        })).reverse();
        const declinedResponse = await api.get('/admin/getDeclineDonate');
        const declinedDonations = declinedResponse.data.map(item => ({
          id: item.id,
          itemId: item.itemId,
          evacName: item.evacName,
          userDonate: item.userDonate,
          needsName: item.needsName,
          needsType: item.needsType,
          donateQuantity: item.donateQuantity,
          donateStatus: item.donateStatus,
          createdAt: item.createdAt
        })).reverse();
        const donations = [...unApprovedDonations, ...approvedDonations, ...declinedDonations];
        donations.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        this.donations = donations;
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

    getDonationStatus(status) {
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

    getDonationImage(type) {
      switch (type) {
        case 'medicine':
          return '/icons/admin/DonationValidate/medicine-needs.jpg'
        case 'food':
          return '/icons/admin/DonationValidate/food-needs.jpg'
        case 'clothing':
          return '/icons/admin/DonationValidate/clothing-needs.jpg'
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

    async approveDonate(row) {
      console.log('approveDonate called')
      const payload = {
        jenisKebutuhan: row.needsType,
        kuantitas: row.donateQuantity,
        tbDonateId: row.id,
        itemId: row.itemId,
        adminApprove: this.Uname,
      }
      console.log("****payload")
      console.log(payload)
      try {
        const response = await api.post('/admin/approveDonate', payload);
        console.log("****response")
        console.log(response)
        Notify.create({
          color: 'green',
          message: 'Berhasil Menerima Bantuan',
          position: 'top',
          timeout: 1000
        });
        window.location.reload();
      } catch (error) {
        console.log(error);
        Notify.create({
          color: 'red',
          message: 'Gagal Menerima Bantuan Silahkan Coba Lagi',
          position: 'top',
          timeout: 2500
        });
      }
    },

    async declineDonate(row) {
      console.log("Decline Donate")
      const payload = {
        tbDonateId: row.id,
        adminApprove: this.Uname,
      }
      console.log("****payload")
      console.log(payload)
      try {
        const response = await api.post('/admin/declineDonate', payload);
        console.log("****response")
        console.log(response)
        Notify.create({
          color: 'green',
          message: 'Berhasil Menolak Bantuan',
          position: 'top',
          timeout: 1000
        });
        window.location.reload();
      } catch (error) {
        console.error(error)
        Notify.create({
          color: 'red',
          message: 'Gagal Menolak Bantuan Silahkan Coba Lagi',
          position: 'top',
          timeout: 2500
        });
      }
    },

    filterDonations() {
      const filtered = this.donations.filter(donation => {
        const searchMatch =
          donation.evacName.toLowerCase().includes(this.search.toLowerCase()) ||
          donation.userDonate.toLowerCase().includes(this.search.toLowerCase()) ||
          donation.needsName.toLowerCase().includes(this.search.toLowerCase()) ||
          donation.needsType.toLowerCase().includes(this.search.toLowerCase()) ||
          donation.donateQuantity.toString().includes(this.search) ||
          this.formatDateTime(donation.createdAt)
            .toLowerCase()
            .includes(this.search.toLowerCase());

        if (this.statusFilter === 'Semua') {
          return searchMatch;
        } else {
          const status = this.statusFilter === 'Menunggu' ? 0 : this.statusFilter === 'Diterima' ? 1 : 2;
          return searchMatch && donation.donateStatus === status;
        }
      });

      return filtered;
    },
  },

  computed: {
    filteredDonations() {
      return this.filterDonations();
    },
  },

  mounted() {
    this.getDonateData();
    this.Uid = this.$route.query.Uid;
    this.Uname = this.$route.query.Uname;
  }
}
</script>

<style>
.donation-card {
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

.donation-img {
  width: 56px;
  height: 56px;
  object-fit: cover;
  border-radius: 5px;
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
