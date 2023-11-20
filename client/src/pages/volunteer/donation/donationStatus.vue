<template>
  <q-layout view="hHh lpR fF2">
    <q-page class="main-page">
      <div class="row items-center justify-between q-mt-md">
        <div class="row items-center">
          <q-btn
            unelevated
            round
            color="#E2E8F0"
            icon="img:icons/arrow-back.png"
          />
          <p class="q-mb-none" style="font-size: 18px; font-weight: bold">
            Donation Status
          </p>
        </div>
        <q-select
          clearable
          outlined
          dense
          v-model="chooseStatus"
          :options="optionsStatus"
        >
          <template v-slot:selected>
            <template v-if="chooseStatus">
              {{ chooseStatus }}
            </template>
            <template v-else>All Status</template>
          </template>
        </q-select>
        <div>
          <q-table
            :rows="rows"
            :columns="columns"
            row-key="status"
            :filter="chooseStatus"
            grid
            :visible-columns="['name', 'quantity', 'donatedTo', 'status']"
          >
            <template v-slot:item="props">
              <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3">
                <q-card>
                  <q-card-section>
                    <div class="row justify-between">
                      <p class="poppins-sb q-mb-none">Donation</p>
                      <div
                        class="q-pa-xs"
                        v-if="props.row.status === 'Pending'"
                        style="
                          width: min-content;
                          height: min-content;
                          outline: solid #fc440f;
                          border-radius: 5px;
                        "
                      >
                        <P
                          class="poppins-sb q-mb-none"
                          style="color: #fc440f; font-size: 12px"
                          >{{ props.row.status }}
                        </P>
                      </div>
                      <div
                        class="q-pa-xs"
                        v-else-if="props.row.status === 'Accepted'"
                        style="
                          width: min-content;
                          height: min-content;
                          outline: solid #008956;
                          border-radius: 5px;
                        "
                      >
                        <P
                          class="poppins-sb q-mb-none"
                          style="color: #008956; font-size: 12px"
                          >{{ props.row.status }}
                        </P>
                      </div>
                      <div
                        class="q-pa-xs"
                        v-else
                        style="
                          width: min-content;
                          height: min-content;
                          outline: solid #ec2d2e;
                          border-radius: 5px;
                        "
                      >
                        <P
                          class="poppins-sb q-mb-none"
                          style="color: #ec2d2e; font-size: 12px"
                          >{{ props.row.status }}
                        </P>
                      </div>
                    </div>
                    <p class="b2 poppins-r q-mb-none">{{ props.row.date }}</p>
                    <div class="row">
                      <p class="b2 poppins-r q-mb-none">Pengirim:</p>
                      <p class="b2 poppins-r q-mb-none q-ml-xs">
                        {{ props.row.sender }}
                      </p>
                    </div>
                  </q-card-section>
                  <q-separator />
                  <q-list style="width: 100%">
                    <q-item>
                      <q-item-section avatar top>
                        <q-icon :name="props.row.donationPhoto" size="70px" />
                      </q-item-section>

                      <q-item-section class="q-mb-md">
                        <div class="column q-ml-sm">
                          <p
                            class="b1 poppins-sb q-mb-none"
                            style="max-width: 215px"
                          >
                            {{ props.row.name }}
                          </p>
                          <div class="row">
                            <p class="b1 poppins-sm q-mb-none">Quantity:</p>
                            <p class="b1 poppins-sm q-mb-none q-ml-xs">
                              {{ props.row.quantity }}
                            </p>
                          </div>
                          <div class="row">
                            <p class="b1 poppins-sm q-mb-none">Donated to:</p>
                            <p class="b1 poppins-sm q-mb-none q-ml-xs">
                              {{ props.row.donatedTo }}
                            </p>
                          </div>
                        </div>
                      </q-item-section>
                    </q-item>
                  </q-list>
                  <div class="row justify-between q-px-md">
                    <div class="row">
                      <q-icon
                        name="img:icons/admin/DonationValidate/address.svg"
                        size="16px"
                      />
                      <p
                        class="b1 poppins-r q-mb-none q-ml-xs"
                        style="max-width: 152px"
                      >
                        {{ props.row.senderAddress }}
                      </p>
                    </div>

                  </div>
                  <q-card-action>
                    <div
                      v-if="props.row.status === 'Pending'"
                      class="row justify-around q-pa-none q-mt-md"
                    >
                      <q-btn
                        text-color="white"
                        label="Donate again"
                        unelevated
                        color="grey"
                        class="b2 poppins-md bt-width q-mb-md q-ml-xs"
                        align="center"
                        no-caps
                        disable
                      />
                      <q-btn
                      outline
                      no-caps
                      style="color: black"
                      label="View Details"
                      size="12px"
                      class="b2 poppins-md bt-width q-mb-md q-ml-xs"
                      to="donation/details"
                      dense
                    />

                    </div>

                    <div v-else class="row justify-around q-pa-none q-mt-md">
                      <q-btn
                        text-color="white"
                        label="Donate again"
                        unelevated
                        color="blue"
                        class="b2 poppins-md bt-width q-mb-md q-ml-xs"
                        align="center"
                        no-caps
                      />
                      <q-btn
                      outline
                      no-caps
                      style="color: black"
                      label="View Details"
                      size="12px"
                      class="b2 poppins-md bt-width q-mb-md q-ml-xs"
                      to="donation/details"
                      dense
                    />
                    </div>
                  </q-card-action>
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
import { ref } from "vue";

const columns = [
  // name cannot contain '-' ex: T-shirt
  {
    name: "name",
    required: true,
    align: "left",
    label: "Name:",
    field: (row) => row.name,
    format: (val) => `${val}`,
    sortable: true,
  },
  { name: "quantity", align: "left", label: "Quantity: ", field: "quantity" },
  { name: "donatedTo", label: "Donated to:", field: "donatedTo" },
  { name: "status", label: "Status:", field: "status" },
  { name: "donationPhoto", label: "Photo:", field: "donationPhoto" },
];

const rows = [
  {
    sender: "Archie",
    phoneNumber: "0881234567890",
    senderAddress: "Bekasi1, West Java, Indonesia",
    name: "Snack",
    quantity: 159,
    donatedTo: "Klepu Village",
    donationPhoto: "img:icons/admin/DonationValidate/food-donation.jpg",
    date: "13/02/2023",
    notes: "Lorem ipsum dolor sit amet consectetuer adipiscing elit.",
    status: "Accepted",
  },
  {
    sender: "Faiz",
    phoneNumber: "0881234567890",
    senderAddress: "Bekasi2, West Java, Indonesia",
    name: "Rice",
    quantity: 237,
    donatedTo: "Klepu Village",
    donationPhoto: "img:icons/admin/DonationValidate/rice-donation.jpg",
    date: "14/02/2023",
    notes: "Lorem ipsum dolor sit amet consectetuer adipiscing elit.",
    status: "Declined",
  },
  {
    sender: "Ghatfan",
    phoneNumber: "0881234567890",
    senderAddress: "Bekasi3, West Java, Indonesia",
    name: "Shirt",
    quantity: 262,
    donatedTo: "Klepu Village",
    donationPhoto: "img:icons/admin/DonationValidate/T-Shirt-donation.jpg",
    date: "15/02/2023",
    notes: "Lorem ipsum dolor sit amet consectetuer adipiscing elit.",
    status: "Declined",
  },
  {
    sender: "Mirza",
    phoneNumber: "0881234567890",
    senderAddress: "Bekasi4, West Java, Indonesia",
    name: "Paracetamol",
    quantity: 305,
    donatedTo: "Klepu Village",
    donationPhoto: "img:icons/admin/DonationValidate/paracetamol-donation.jpg",
    date: "16/02/2023",
    notes: "Lorem ipsum dolor sit amet consectetuer adipiscing elit.",
    status: "Declined",
  },
  {
    sender: "Budi Setiawan",
    phoneNumber: "0881234567890",
    senderAddress: "Bekasi5, West Java, Indonesia",
    name: "Bed",
    quantity: 356,
    donatedTo: "Klepu Village",
    donationPhoto: "img:icons/admin/DonationValidate/food-donation.jpg",
    date: "17/02/2023",
    notes: "Lorem ipsum dolor sit amet consectetuer adipiscing elit.",
    status: "Declined",
  },
  {
    sender: "Budi Hartono",
    phoneNumber: "0881234567890",
    senderAddress: "Bekasi6, West Java, Indonesia",
    name: "Fan",
    quantity: 356,
    donatedTo: "Klepu Village",
    donationPhoto: "img:icons/admin/DonationValidate/rice-donation.jpg",
    date: "18/02/2023",
    notes: "Lorem ipsum dolor sit amet consectetuer adipiscing elit.",
    status: "Pending",
  },
];

export default {
  status: "DonationStatus",
  setup() {
    const chooseStatus = ref(null);

    return {
      filter: ref(""),
      columns,
      rows,
      chooseStatus,
      optionsStatus: ["Accepted", "Declined", "Pending"],
    };
  },
};
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
  color: #f97c21 !important;
}

.bg-stepActive {
  background-color: #f97c21 !important;
}

.text-succes {
  color: #008956 !important;
}

.bg-succes {
  background-color: #008956 !important;
}

.text-error {
  color: #ec2d2e !important;
}

.bg-error {
  background-color: #ec2d2e !important;
}
</style>