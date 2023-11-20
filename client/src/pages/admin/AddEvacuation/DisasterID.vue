<template>
  <q-layout view="hHh lpR fF2">
    <q-page-container>
      <q-page>
        <div class="q-ma-lg">
          <div class="row items-center">
            <q-btn unelevated round color=#E2E8F0 icon="img:icons/admin/AddDisaster/arrow-left.svg"
              :to='`/admin?Uid=${this.Uid}&Uname=${this.Uname}`' />
            <p class="q-mb-none text-subtitle1 text-weight-bold">Pilih Lokasi Penampungan</p>
          </div>
          <q-input v-if="!addEvacuationLocationFlag" rounded outlined v-model="search" type="search" color="orange"
            placeholder="Cari Lokasi Penampungan" class="q-mt-sm q-mb-lg q-pt-sm" dense>
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>

          <div v-if="!addEvacuationLocationFlag" v-for="(evacLoc) in filteredEvacLocs"
            class="evacuation-card q-mb-md q-pa-md">
            <div class="row justify-between items-start">
              <p class="text-weight-bold">{{ evacLoc.evacName }}</p>
              <q-icon name="img:/icons/admin/AddEvacuation/edit.svg" class="q-mt-xs"
                @click="editNeeds(`${evacLoc.disasterId}`, `${evacLoc.id}`, `${evacLoc.evacName}`, `${evacLoc.alamat}`, `${evacLoc.kecamatan}`, `${evacLoc.rt}`, `${evacLoc.rw}`, `${evacLoc.namaPetugas}`, `${evacLoc.nomorPetugas}`)" />
            </div>
            <div class="row items-start q-mt-sm">
              <q-icon name="img:/icons/admin/AddEvacuation/disaster-location.svg" class="q-mt-xs" size="16px" />
              <div class="q-ml-sm" style="max-width: 85%;">
                <p class="text-red text-weight-bold">Lokasi Penampungan</p>
                <p>{{ evacLoc.alamat + ' RT ' + evacLoc.rt + ' RW ' + evacLoc.rw + ', ' + evacLoc.kecamatan }}</p>
              </div>
            </div>
            <div class="row items-start q-mt-sm">
              <q-icon name="img:/icons/admin/AddEvacuation/worker.svg" class="q-mt-xs" size="16px" />
              <div class="q-ml-sm">
                <p class="text-red text-weight-bold">Petugas Lokasi</p>
                <p>{{ evacLoc.namaPetugas + ' (' + evacLoc.nomorPetugas + ')' }}</p>
              </div>
            </div>
            <div class="row justify-center q-mt-sm">
              <q-btn color="orange" label="Tambah Data" class="add-btn" unelevated no-caps
                @click="addVictimNeeds(`${evacLoc.disasterId}`, `${evacLoc.id}`, `${evacLoc.evacName}`, `${evacLoc.alamat}`, `${evacLoc.kecamatan}`, `${evacLoc.rt}`, `${evacLoc.rw}`, `${evacLoc.namaPetugas}`, `${evacLoc.nomorPetugas}`,)" />
            </div>
            <!-- </router-link> -->
          </div>
          <div v-if="!addEvacuationLocationFlag">
            <q-btn class="q-mt-md q-px-sm" outline color="black" label="Tambah Lokasi Penampungan" no-caps
              @click="addEvacuationLocationFlag = true" />
          </div>
          <div v-if="addEvacuationLocationFlag">
            <q-form @submit="addEvacuationLocation()" class="q-mt-md q-pt-sm">
              <div>
                <p class="text-weight-bold q-mb-sm">Nama Penampungan</p>
                <q-input outlined v-model="evacLocName" :rules="[(val) => !!val]" color="orange" placeholder="" dense />
              </div>
              <div>
                <p class="text-weight-bold q-mb-sm">Alamat</p>
                <q-input outlined v-model="evacAlamat" :rules="[(val) => !!val]" color="orange" placeholder="" dense />
              </div>
              <div>
                <p class="text-weight-bold q-mb-sm">Kecamatan</p>
                <q-input outlined v-model="evacKecamatan" :rules="[(val) => !!val]" color="orange" placeholder="" dense />
              </div>
              <div class="row justify-between items-center">
                <div class="col-5">
                  <p class="text-weight-bold q-mb-sm">RT</p>
                  <q-input outlined v-model="evacRt" :rules="[(val) => !!val]" color="orange" placeholder="" dense />
                </div>
                <div class="col-5">
                  <p class="text-weight-bold q-mb-sm">RW</p>
                  <q-input outlined v-model="evacRw" :rules="[(val) => !!val]" color="orange" placeholder="" dense />
                </div>
              </div>
              <div>
                <p class="text-weight-bold q-mb-sm">Petugas</p>
                <q-input outlined v-model="evacPetugas" :rules="[(val) => !!val]" color="orange" placeholder="" dense />
              </div>
              <div>
                <p class="text-weight-bold q-mb-sm">Nomor Petugas</p>
                <q-input outlined v-model="evacNomorPetugas" :rules="[(val) => !!val]" color="orange" placeholder=""
                  dense />
              </div>
              <div v-if="addEvacuationLocationFlag" class="row justify-between items-center">
                <q-btn outline class="cancel-button q-mt-md q-mb-lg" size="md" label="Batal" @click="cancelForm()"
                  no-caps />
                <q-btn flat class="submit-button q-mt-md q-mb-lg" size="md" type="submit" label="Simpan" no-caps />
              </div>
            </q-form>
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from 'vue'
import { api } from 'boot/axios'
import { Notify } from 'quasar'

export default {

  data() {
    return {
      disasterId: ref(''),
      evacLocName: ref(''),
      evacAlamat: ref(''),
      evacKecamatan: ref(''),
      evacRt: ref(''),
      evacRw: ref(''),
      evacPetugas: ref(''),
      evacNomorPetugas: ref(''),
      addEvacuationLocationFlag: ref(false),
      evacLocs: [],
    }
  },

  setup() {
    return {
      search: ref('')
    }
  },

  methods: {

    addVictimNeeds(disasterId, id, evacName, alamat, kecamatan, rt, rw, namaPetugas, nomorPetugas) {
      console.log("Add Victim Needs");
      console.log(disasterId, id)
      this.$router.push(`/admin/evacuation/disaster-id/evacuation-id?disasterId=${disasterId}&locId=${id}&evacName=${evacName}&alamat=${alamat}&kecamatan=${kecamatan}&rt=${rt}&rw=${rw}&namaPetugas=${namaPetugas}&nomorPetugas=${nomorPetugas}&Uid=${this.Uid}&Uname=${this.Uname}`);

    },

    editNeeds(disasterId, id, evacName, alamat, kecamatan, rt, rw, namaPetugas, nomorPetugas,) {
      console.log("Edit Needs");
      this.$router.push(`/admin/evacuation/needsedit?disasterId=${disasterId}&locId=${id}&evacName=${evacName}&alamat=${alamat}&kecamatan=${kecamatan}&rt=${rt}&rw=${rw}&namaPetugas=${namaPetugas}&nomorPetugas=${nomorPetugas}&Uid=${this.Uid}&Uname=${this.Uname}`);
    },

    cancelForm() {
      this.evacLocName = '';
      this.evacAlamat = '';
      this.evacKecamatan = '';
      this.evacRt = '';
      this.evacRw = '';
      this.evacPetugas = '';
      this.evacNomorPetugas = '';
      this.addEvacuationLocationFlag = false
    },

    async addEvacuationLocation() {
      const payload = {
        disasterId: this.disasterId,
        evacName: this.evacLocName,
        alamat: this.evacAlamat,
        kecamatan: this.evacKecamatan,
        rt: this.evacRt,
        rw: this.evacRw,
        namaPetugas: this.evacPetugas,
        nomorPetugas: this.evacNomorPetugas
      };
      try {
        const response = await api.post('/admin/addEvacLocation', payload);
        this.addEvacuationLocationFlag = false;
        Notify.create({
          color: 'green',
          message: 'Berhasil menambahkan lokasi penampungan',
          position: 'top',
          timeout: 2500
        });
      } catch (error) {
        console.error(error);
        Notify.create({
          color: 'red',
          message: 'Gagal menambahkan lokasi silakan coba lagi',
          position: 'top',
          timeout: 2500
        });
        this.cancelForm();
      }
      await this.getEvacLocByDisasterId();
    },

    async getEvacLocByDisasterId() {
      console.log('getEvacLocByDisasterId - called');
      this.evacLocs = [];
      const payload = {
        disasterId: this.disasterId
      };
      try {
        const response = await api.post('/admin/getEvacLocationDisasterId', payload);
        this.evacLocs = response.data.map((item) => ({
          id: item.id,
          disasterId: item.disasterId,
          evacName: item.evacName,
          alamat: item.alamat,
          kecamatan: item.kecamatan,
          rt: item.rt,
          rw: item.rw,
          namaPetugas: item.namaPetugas,
          nomorPetugas: item.nomorPetugas
        })).reverse();
      } catch (error) {
        console.error(error);
        Notify.create({
          color: 'red',
          message: 'Gagal mengambil data silakan restart aplikasi',
          position: 'top',
          timeout: 2500
        });
      }
    }
  },

  computed: {
    filteredEvacLocs() {
      const searchQuery = this.search.toLowerCase();
      return this.evacLocs.filter((evacLoc) => {
        const evacName = evacLoc.evacName.toLowerCase();
        const address = `${evacLoc.alamat.toLowerCase()} RT ${evacLoc.rt} RW ${evacLoc.rw}, ${evacLoc.kecamatan.toLowerCase()}`;
        const assignedPerson = `${evacLoc.namaPetugas.toLowerCase()}(${evacLoc.nomorPetugas}`;
        return (
          evacName.includes(searchQuery) ||
          address.includes(searchQuery) ||
          assignedPerson.includes(searchQuery)
        );
      });
    }
  },

  mounted() {
    this.Uid = this.$route.query.Uid;
    this.Uname = this.$route.query.Uname;
    this.disasterId = this.$route.query.disasterId
    this.getEvacLocByDisasterId()
  }
}
</script>

<style>
* {
  margin: 0;
  background-color: none;
}

.evacuation-card {
  height: fit-content;
  border-radius: 10px;
  box-shadow: 1px 1px 15px 0px rgba(0, 0, 0, 0.25);
}

.submit-button {
  width: 45%;
  height: 42px;
  background: #F97C21;
  font-size: 16px;
  color: white;
}

.cancel-button {
  width: 45%;
  height: 42px;
  font-size: 16px;
  color: #EC2D2E;
}

.add-btn {
  width: 80%;
}
</style>

