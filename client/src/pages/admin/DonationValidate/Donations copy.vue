<template>
  <q-layout view="hHh lpR fF2">
    <q-page class="main-page">
      <div class="row items-center justify-between q-mt-md">
        <div class=" row items-center">
          <!-- <q-btn unelevated round color=#E2E8F0 icon="img:icons/arrow-back.png" /> -->
          <p style="font-size: 18px; font-weight: bold;">Validasi Bantuan</p>
        </div>
        <!-- <q-select clearable outlined dense v-model="chooseStatus" :options="optionsStatus">
          <template v-slot:selected>
            <template v-if="chooseStatus">
              {{ chooseStatus }}
            </template>
            <template v-else>All Status</template>
          </template>
        </q-select> -->
        <div>
          <q-table :rows="rows" :columns="columns" row-key="status" :filter="chooseStatus" grid 
            :visible-columns="['donatedTo','needsType','needsName', 'donateQuantity', 'status']">

            <template v-slot:item="props">
              <div>
                <q-card>
                  <q-card-section>
                    <div class="row justify-between">
                      <p class="poppins-sb q-mb-none">BANTUAN</p>
                      <!-- <div class="q-pa-xs" v-if="props.row.status === 'Pending'"
                        style=" width: min-content; height: min-content; outline: solid #FC440F; border-radius: 5px;">
                        <P class=" poppins-sb q-mb-none" style="color: #FC440F; font-size: 12px;">{{ props.row.status }}
                        </P>
                      </div>
                      <div class="q-pa-xs" v-else-if="props.row.status === 'Accepted'"
                        style=" width: min-content; height: min-content; outline: solid #008956; border-radius: 5px;">
                        <P class=" poppins-sb q-mb-none" style="color: #008956; font-size: 12px;">{{ props.row.status }}
                        </P>
                      </div>
                      <div class="q-pa-xs" v-else
                        style=" width: min-content; height: min-content; outline: solid #EC2D2E; border-radius: 5px;">
                        <P class=" poppins-sb q-mb-none" style="color: #EC2D2E; font-size: 12px;">{{ props.row.status }}
                        </P>
                      </div> -->
                    </div>
                    <p class="b2 poppins-r q-mb-none">{{ props.row.date }}</p>
                    <div class="row">
                      <p class="b2 poppins-r q-mb-none">Pengirim: </p>
                      <p class="b2 poppins-r q-mb-none q-ml-xs">{{ props.row.sender }}</p>
                    </div>
                  </q-card-section>
                  <q-separator />
                  <q-list style="width: 100%;">
                    
                    <!-- <q-item> -->
                      <!-- <q-item-section avatar top>
                        <template v-slot:body-cell-image="props">
                          <q-img :src="props.rows.donationPhoto"
                            size="56px" />
                        </template>
                      </q-item-section> -->

                      <q-item-section class="details">
                        <q-list dense>
                          <q-item v-for="col in props.cols" :key="col.name">
                            <q-item-section>
                              <q-item-label style="width: min-content;">{{ col.label }}</q-item-label>
                            </q-item-section>
                            <q-item-section>
                              <q-item-label class="q-ml-sm" style="width: min-content;">{{ col.value }}</q-item-label>
                            </q-item-section>
                          </q-item>
                        </q-list>
                      </q-item-section>
                    <!-- </q-item> -->
                  </q-list>
                  <!-- <div class="row justify-between q-px-md">
                    <div class="row">
                      <q-icon name="img:icons/admin/DonationValidate/address.svg" size="16px" />
                      <p class="b1 poppins-r q-mb-none q-ml-xs" style="max-width: 152px;">{{ props.row.senderAddress }}
                      </p>
                    </div>
                    <q-btn outline no-caps style="color: black" label="View Details" size="12px" class="q-pa-sm" />
                  </div> -->
                  <!-- <q-card-action>
                    <div v-if="props.row.status === 'Pending'" class="row justify-between q-pa-none q-mt-md">
                      <q-btn text-color="white" label="Declined Donation" unelevated color="error"
                        class="b2 poppins-md bt-width q-mb-md q-ml-xs" align="center" no-caps />
                      <q-btn class="b2 poppins-md bt-width q-mb-md q-mr-xs" text-color="white" no-caps unelevated
                        color="succes" align="center" label="Accept Donation" />
                    </div>
                    <q-btn v-else-if="props.row.status === 'Accepted'"
                      class="b2 poppins-md full-width q-mt-md q-mb-md q-mx-md" text-color="white" no-caps unelevated
                      color="succes" align="center" label="Accept Donation" disable />
                    <q-btn v-else text-color="white" label="Declined Donation" unelevated color="error"
                      class="b2 poppins-md full-width q-mt-md q-mb-md" align="center" no-caps disable />
                  </q-card-action> -->
                </q-card>
              </div>
            </template>
          </q-table>
          
        </div>
      </div>
      
    </q-page>
  </q-layout>
</template>

<script>
import { ref } from 'vue'


const columns = [
  // name cannot contain '-' ex: T-shirt
  {
    name: 'donatedTo',
    required: true,
    align: 'left',
    label: 'Nama Evakuasi:',
    // field: row => row.donateTo,
    field: 'donatedTo',
    format: val => `${val}`,
    sortable: true
  },
  { name: 'needsType', align: 'left', label: 'Jenis Kebutuhan: ', field: 'needsType' },
  { name: 'needsName', label: 'Nama Kebutuhan:', field: row => row.needsName},
  { name: 'donateQuantity', align: 'left', label: 'Kuantitas: ', field: 'donateQuantity' },
  { name: 'status', label: 'Status:', field: 'status' },
  // { name: 'donationPhoto', label: 'Photo:', field: 'donationPhoto' },

  //{ name: 'donatedTo', label: 'Donated to:', field: 'donatedTo' },

]

const rows = [
  {
    sender: 'Archie',
    date: '13/02/2023',
    donatedTo: 'Evakuasi 1',
    needsType:'medicine',
    needsName: 'Obat Batuk',
    donateQuantity: 159,
    // donationPhoto: 'icons/admin/DonationValidate/food-donation.png',
    // senderAddress: 'Bekasi1, West Java, Indonesia',
    status: "Pending"
  },
  // {
  //   name: 'Rice',
  //   date: '14/02/2023',
  //   sender: 'Faiz',
  //   donationPhoto: 'icons/admin/DonationValidate/rice-donation.png',
  //   senderAddress: 'Bekasi2, West Java, Indonesia',
  //   quantity: 237,
  //   donatedTo: 'Klepu',
  //   status: "Declined"
  // },
  // {
  //   name: 'Shirt',
  //   date: '15/02/2023',
  //   sender: 'Ghatfan',
  //   donationPhoto: 'icons/admin/DonationValidate/T-Shirt-donation.png',
  //   senderAddress: 'Bekasi3, West Java, Indonesia',
  //   quantity: 262,
  //   donatedTo: 'Klepu',
  //   status: "Declined"
  // },
  // {
  //   name: 'Paracetamol',
  //   date: '16/02/2023',
  //   sender: 'Mirza',
  //   donationPhoto: 'icons/admin/DonationValidate/paracetamol-donation.png',
  //   senderAddress: 'Bekasi4, West Java, Indonesia',
  //   quantity: 305,
  //   donatedTo: 'Klepu',
  //   status: "Declined"
  // },
  // {
  //   name: 'Bed',
  //   date: '17/02/2023',
  //   sender: 'Budi Setiawan',
  //   donationPhoto: 'icons/admin/DonationValidate/food-donation.png',
  //   senderAddress: 'Bekasi5, West Java, Indonesia',
  //   quantity: 356,
  //   donatedTo: 'Klepu',
  //   status: "Declined"
  // },
  // {
  //   name: 'Fan',
  //   date: '18/02/2023',
  //   sender: 'Budi Hartono',
  //   donationPhoto: 'icons/admin/DonationValidate/rice-donation.png',
  //   senderAddress: 'Bekasi6, West Java, Indonesia',
  //   quantity: 356,
  //   donatedTo: 'Klepu',
  //   status: "Pending"
  // },
]

export default {
  name: 'AdminDonations',

  setup() {
    const chooseStatus = ref(null)

    return {
      filter: ref(""),
      columns,
      rows,
      chooseStatus,
      // optionsStatus: [
      //   "Accepted", "Declined", "Pending"
      // ]
    }
  },
}
</script>

<style>
.main-page {
  padding: 0 24px;
}

.my-card {
  width: 100%;
  height: min-content;
}

.b2 {
  font-size: 12px;
}

.text-stepActive {
  color: #F97C21 !important;
}

.bg-stepActive {
  background-color: #F97C21 !important;
}

.text-succes {
  color: #008956 !important;
}

.bg-succes {
  background-color: #008956 !important;
}

.text-error {
  color: #EC2D2E !important;
}

.bg-error {
  background-color: #EC2D2E !important;
}
</style>