<template>
  <q-page>
    <div class="row items-center q-pa-md">
      <q-btn unelevated round color=#E2E8F0 icon="img:icons/admin/AddDisaster/arrow-left.svg"
        :to='`/volunteer/viewNeeds?locId=${locId}&Uid=${this.Uid}&Uname=${this.Uname}&type=${type}`' />
      <p class="q-mb-none text-h6 text-weight-bold">{{ getType(type) }}</p>
    </div>
    <img :src="getDonationImage(type)" class="type-banner" alt="type image">
    <div class="q-pa-md">
      <q-field outlined class="q-mb-md" label="Nama Lokasi Penampungan" stack-label :dense="dense">
        <template v-slot:control>
          <div class="self-center full-width no-outline" tabindex="0">{{ evacName }}</div>
        </template>
      </q-field>
      <q-field outlined class="q-mb-md" label="Jenis Kebutuhan" stack-label :dense="dense">
        <template v-slot:control>
          <div class="self-center full-width no-outline" tabindex="0">{{ type }}</div>
        </template>
      </q-field>
      <div class="row justify-between items-center">
        <q-field outlined class="col-5 q-mb-md" label="Nama Kebutuhan" stack-label :dense="dense">
          <template v-slot:control>
            <div class="self-center full-width no-outline" tabindex="0">{{ itemName }}</div>
          </template>
        </q-field>
        <q-field outlined class="col-5 q-mb-md" label="Kuantitas Kebutuhan" stack-label :dense="dense">
          <template v-slot:control>
            <div class="self-center full-width no-outline" tabindex="0">{{ minusQuantity }}</div>
          </template>
        </q-field>
      </div>
      <q-form class="q-mt-sm" @submit="addDonate()">
        <div>
          <p class="text-weight-bold q-mb-sm">Kuantitas Bantuan</p>
          <q-input outlined v-model="donateQuantity"
            :rules="[val => !!val && Number(val) <= Number(minusQuantity) || 'Bantuan tidak dapat lebih dari kebutuhan']"
            placeholder="Kuantitas" />
        </div>
        <q-btn unelevated class="submit-button" type="submit" label="Kirim" no-caps />
      </q-form>
    </div>
  </q-page>
</template>

<script>
import { ref } from 'vue'
import { api } from 'boot/axios'
import { Notify } from 'quasar'

export default {

  data() {
    return {
      disasterId: "",
      locId: "",
      Uname: "",
      evacName: "",
      type: "",
      itemId: "",
      itemName: "",
      minusQuantity: "",
      dense: ref(false),
    }
  },

  setup() {
    return {
      donateQuantity: ref(''),
    }
  },

  methods: {
    getDonationImage(type) {
      switch (type) {
        case 'medicine':
          return '/icons/volunteer/homePages/donateEvac/medicine-banner.jpg'
        case 'food':
          return '/icons/volunteer/homePages/donateEvac/food-banner.jpg'
        case 'clothing':
          return '/icons/volunteer/homePages/donateEvac/clothing-banner.jpg'
      }
    },


    getType(type) {
      switch (type) {
        case 'food':
          return 'Pangan'
        case 'medicine':
          return 'Obat'
        case 'clothing':
          return 'Sandang'
        default:
          return ''
      }
    },

    async addDonate() {
      try {
        const payload = {
          locId: this.locId,
          itemId: this.itemId,
          Uid: this.Uid,
          evacName: this.evacName,
          needsType: this.type,
          needsName: this.itemName,
          userDonate: this.Uname,
          adminApprove: "",
          donateStatus: 0,
          donateQuantity: this.donateQuantity
        };
        const response = await api.post('/user/addDonate', payload);
        Notify.create({
          color: 'green',
          message: 'Berhasil menambahkan donasi',
          position: 'top',
          timeout: 2500
        });
        this.$router.push(`/volunteer?Uid=${this.Uid}&Uname=${this.Uname}`)
      } catch (error) {
        console.log(error);
        Notify.create({
          color: 'red',
          message: 'Gagal menambahkan donasi, silakan coba lagi',
          position: 'top',
          timeout: 2500
        });
      }
    }
  },

  mounted() {
    this.Uid = this.$route.query.Uid
    this.Uname = this.$route.query.Uname
    this.type = this.$route.query.type
    this.disasterId = this.$route.query.disasterId
    this.locId = this.$route.query.locId
    this.itemId = this.$route.query.itemId
    this.evacName = this.$route.query.evacName
    this.itemName = this.$route.query.itemName
    this.minusQuantity = this.$route.query.minusQuantity
  }
}

</script>

<style>
.type-banner {
  width: 100%;
  aspect-ratio: 16/9;
  object-fit: cover;
}

.submit-button {
  width: 100%;
  height: 42px;
  border-radius: 8px;
  background-color: #56BDE6;
  color: white;
}
</style>
