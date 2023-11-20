<template>
  <q-layout view="hHh lpR fFf" style="background-color: #ffffff">
    <q-page width="360px" height="800px" class="q-pb-lg">
      <div>
        <p class="text-h5 poppins-sb text-center q-mt-md">Menu</p>
        <div>
          <q-separator class="separator-1" />
        </div>
        <div class="add-disaster-location q-pt-md">
          <div>
            <p class="poppins-md q-mb-sm">Tambah Lokasi Bencana</p>
          </div>
          <div class="poppins-md add-disaster-location-desc row justify-between">
            <q-card flat bordered style="border-color: #000000">
              <q-item>
                <q-item-section style="padding-left: 0px; padding-right: 0px; width: 220px">
                  <q-item-label>Menambahkan lokasi dan informasi bencana</q-item-label>
                </q-item-section>
              </q-item>
            </q-card>
            <q-btn flat rounded color="black" icon="fa-solid fa-chevron-right" @click="onAddDisaster()" />
          </div>
        </div>
        <div>
          <q-separator class="separator-2" />
        </div>
        <div class="poppins-md add-evacuation-location" style="padding-top: 18px">
          <p class="poppins-md q-mb-sm">Tambah Lokasi Evakusi dan Data Kebutuhan</p>
          <div class="poppins-md add-evacuation-location-desc row justify-between">
            <q-card flat bordered style="border-color: #000000">
              <q-item>
                <q-item-section style="padding-left: 0px; padding-right: 0px; width: 220px">
                  <q-item-label>1. Pilih bencana</q-item-label>
                  <q-item-label>2. Tambahkan lokasi evakuasi bencana</q-item-label>
                  <q-item-label>3. Pendataan korban</q-item-label>
                  <q-item-label>4. Pendataan kerusakan</q-item-label>
                  <q-item-label>5. Pendataan kebutuhan</q-item-label>
                </q-item-section>
              </q-item>
            </q-card>
            <q-btn flat rounded color="black" icon="fa-solid fa-chevron-right" @click="onAddEvacuation()" />
          </div>
        </div>
        <div>
          <q-separator class="separator-2" />
        </div>
        <div class="poppins-md add-evacuation-location" style="padding-top: 18px">
          <div>
            <p class="poppins-md q-mb-sm">Persetujuan Bantuan</p>
          </div>
          <div class="poppins-md add-evacuation-location-desc row justify-between">
            <q-card flat bordered style="border-color: #000000">
              <q-item>
                <q-item-section style="padding-left: 0px; padding-right: 0px; width: 220px">
                  <q-item-label>Menyetujui bantuan yang telah tervalidasi kebenarannya</q-item-label>
                </q-item-section>
              </q-item>
            </q-card>
            <q-btn flat rounded color="black" icon="fa-solid fa-chevron-right" @click="onValidateDonate()"/>
          </div>
        </div>
        <div>
          <q-separator class="separator-2" />
        </div>
        <div class="poppins-md add-evacuation-location" style="padding-top: 18px">
          <p class="poppins-md q-mb-sm">Perkembangan Distribusi Kebutuhan Bencana</p>
          <div class="poppins-md add-evacuation-location-desc row justify-between">
            <q-card flat bordered style="border-color: #000000">
              <q-item>
                <q-item-section style="padding-left: 0px; padding-right: 0px; width: 220px">
                  <q-item-label>Grafik perkembangan pendistribusian kebutuhan bencana</q-item-label>
                </q-item-section>
              </q-item>
            </q-card>
            <q-btn flat rounded color="black" icon="fa-solid fa-chevron-right" @click="onReport()" />
          </div>
        </div>
        <div>
          <q-separator class="separator-2" />
        </div>
        <div class="poppins-md add-evacuation-location" style="padding-top: 18px">
          <p class="poppins-md q-mb-sm">Aktivasi Akun</p>
          <div class="poppins-md add-evacuation-location-desc row justify-between">
            <q-card flat bordered style="border-color: #000000">
              <q-item>
                <q-item-section style="padding-left: 0px; padding-right: 0px; width: 220px">
                  <q-item-label>Admin melakukan verifikasi data untuk aktivasi akun</q-item-label>
                </q-item-section>
              </q-item>
            </q-card>
            <q-btn flat rounded color="black" icon="fa-solid fa-chevron-right" @click="onValidateAccount()"/>
          </div>
        </div>
        <router-view />
      </div>
    </q-page>
  </q-layout>
</template>

<script>
import { api } from "boot/axios";

export default {

  methods: {
    onAddDisaster(){
      this.$router.push(`/admin/add-disaster?Uid=${this.Uid}&Uname=${this.Uname}`);
    },

    onAddEvacuation(){
      this.$router.push(`/admin/evacuation?Uid=${this.Uid}&Uname=${this.Uname}`);
    },

    onValidateDonate(){
      this.$router.push(`/admin/donation?Uid=${this.Uid}&Uname=${this.Uname}`);
    },

    onReport(){
      this.$router.push(`/admin/reports?Uid=${this.Uid}&Uname=${this.Uname}`);
    },

    onValidateAccount(){
      this.$router.push(`/admin/uservalidate?Uid=${this.Uid}&Uname=${this.Uname}`);
    }
  },
  mounted() {
    this.Uid = this.$route.query.Uid;
    this.Uname = this.$route.query.Uname;
  }
};
</script>

<style>
.separator-1 {
  margin-top: 24px;
}

.separator-2 {
  margin-top: 24px;
}

.add-disaster-location {
  font-size: 18px;
  font-weight: 500;
  margin: 0 24px;
}

.add-disaster-location-desc {
  width: auto;
  font-size: 14px;
}

.add-evacuation-location {
  font-size: 18px;
  font-weight: 500;
  margin: 0 24px;
}

.add-evacuation-location-desc {
  width: auto;
  font-size: 14px;
}
</style>
