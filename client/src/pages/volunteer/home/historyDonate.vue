<template>
  <q-layout>
    <q-page>
      <div class="q-ma-md">
        <div class="row justify-between q-mb-lg">
          <div class="row items-center">
            <q-btn unelevated round color=#E2E8F0 icon="img:icons/admin/AddDisaster/arrow-left.svg" 
             :to='`/volunteer?Uid=${this.Uid}&Uname=${this.Uname}`' />
            <p class="q-mb-none text-h6 text-weight-bold">Riwayat Bantuan</p>
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
                <p>{{ 'Admin Validator: ' + donation.adminApprove }}</p>
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
      Uid: "",
      donations: [],
      unApprovedDonationsAccount: [],
      approvedDonationsAccount: [],
      declinedDonationsAccount: []
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
          const payload = {
          "Uid" : this.Uid, 
        }
          console.log("***payload")
          console.log(payload)
      try {
        const unApprovedResponse = await api.post('/admin/getAccountUnApproveDonate', payload);
        console.log(unApprovedResponse)
        const unApprovedDonationsAccount = unApprovedResponse.data.map(item => ({
          Uid: item.Uid,
          userDonate: item.Uname,
          id: item.id,
          itemId: item.itemId,
          evacName: item.evacName,
          adminApprove: item.adminApprove,
          needsName: item.needsName,
          needsType: item.needsType,
          donateQuantity: item.donateQuantity,
          donateStatus: item.donateStatus,
          createdAt: item.createdAt
        })).reverse();
        // console.log("****unApprovedDonationsAccount")
        // console.log(unApprovedDonationsAccount)
        const approvedResponse = await api.post('/admin/getAccountApproveDonate', payload);
        const approvedDonationsAccount = approvedResponse.data.map(item => ({
          Uid: item.Uid,
          userDonate: item.Uname,
          id: item.id,
          itemId: item.itemId,
          evacName: item.evacName,
          adminApprove: item.adminApprove,
          needsName: item.needsName,
          needsType: item.needsType,
          donateQuantity: item.donateQuantity,
          donateStatus: item.donateStatus,
          createdAt: item.createdAt
        })).reverse();
        const declinedResponse = await api.post('/admin/getAccountDeclineDonate', payload);
        const declinedDonationsAccount = declinedResponse.data.map(item => ({
          Uid: item.Uid,
          userDonate: item.Uname,
          id: item.id,
          itemId: item.itemId,
          evacName: item.evacName,
          adminApprove: item.adminApprove,
          needsName: item.needsName,
          needsType: item.needsType,
          donateQuantity: item.donateQuantity,
          donateStatus: item.donateStatus,
          createdAt: item.createdAt
        })).reverse();
        const donations = [...unApprovedDonationsAccount, ...approvedDonationsAccount, ...declinedDonationsAccount];
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

    filterDonations() {
      const filtered = this.donations.filter(donation => {
        const searchMatch =
          donation.evacName.toLowerCase().includes(this.search.toLowerCase()) ||
          donation.adminApprove.toLowerCase().includes(this.search.toLowerCase()) ||
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
    this.Uid = this.$route.query.Uid
    this.Uname = this.$route.query.Uname
    
    this.getDonateData();
    
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
