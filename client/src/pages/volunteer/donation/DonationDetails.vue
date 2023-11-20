<template>
  <q-layout view="hHh lpR fF2">
    <q-page>
      <div class="row items-center q-mt-md" style="padding: 0 24px">
        <q-btn
          unelevated
          round
          color="#E2E8F0"
          icon="img:icons/arrow-back.png"
          to="/volunteer/donation"
        />
        <p class="h6 poppins-sb q-mb-none">Donation Details</p>
      </div>
      <q-table
        grid
        :rows="rows"
        :columns="columns"
        row-key="name"
        class="q-mt-md"
        hide
        hide-bottom
        :visible-columns="[
          'sender',
          'phoneNumber',
          'donatedTo',
          'senderAddress',
          'arrivedDate',
          'status',
        ]"
      >
        <template v-slot:item="props">
          <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3">
            <p class="h6 q-mb-none" style="font-weight: bold; padding: 0 16px">
              General
            </p>
            <q-list dense>
              <q-item v-for="col in props.cols" :key="col.name">
                <q-item-section>
                  <q-item-label caption>{{ col.label }}</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-item-label style="text-align: right; max-width: 170px">{{
                    col.value
                  }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
            <p
              class="h6 q-mb-none q-mt-xl"
              style="font-weight: bold; padding: 0 16px"
            >
              Donation
            </p>
            <q-list>
              <q-item class="q-pa-none">
                <q-item-section>
                  <div
                    class="q-mt-md"
                    style="width: 100%; height: min-content; padding: 0 16px"
                  >
                    <div class="row">
                      <q-icon :name="props.row.donationPhoto" size="75px" />
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
                        <p
                          class="b1 poppins-sm q-mb-none"
                          style="max-width: 215px"
                        >
                          {{ props.row.notes }}
                        </p>
                      </div>
                    </div>
                  </div>
                </q-item-section>
              </q-item>
            </q-list>
            <div
              class="q-mt-xl"
              style="width: 100%; height: min-content; padding: 0px 16px"
            >
              <div v-if="props.row.status === 'Pending'" class="column">
                <q-btn
                  text-color="white"
                  label="Declined Donation"
                  unelevated
                  color="error"
                  class="b2 poppins-md bt-width q-mb-md"
                  align="center"
                  no-caps
                  size="md"
                />
                <q-btn
                  class="b2 poppins-md bt-width"
                  text-color="white"
                  no-caps
                  unelevated
                  color="succes"
                  align="center"
                  label="Accept Donation"
                  size="md"
                />
              </div>
              <div v-if="props.row.status === 'Accepted'">
                <q-btn
                  class="b2 poppins-md full-width"
                  stytext-color="white"
                  no-caps
                  unelevated
                  color="succes"
                  align="center"
                  label="Accepted Donation"
                  size="md"
                />
              </div>
              <div v-if="props.row.status === 'Declined'">
                <q-btn
                  class="b2 poppins-md full-width"
                  stytext-color="white"
                  no-caps
                  unelevated
                  color="error"
                  align="center"
                  label="Decline Donation"
                  size="md"
                />
              </div>
            </div>
          </div>
        </template>
      </q-table>
    </q-page>
  </q-layout>
</template>

<script>
const columns = [
  // name cannot contain '-' ex: T-shirt
  {
    name: "sender",
    required: true,
    align: "left",
    label: "Sender:",
    field: (row) => row.sender,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "phoneNumber",
    align: "left",
    label: "Phone Number: ",
    field: "phoneNumber",
  },
  { name: "quantity", align: "left", label: "Quantity: ", field: "quantity" },
  { name: "donatedTo", label: "Donated to:", field: "donatedTo" },
  {
    name: "senderAddress",
    align: "left",
    label: "Sender Address: ",
    field: "senderAddress",
  },
  {
    name: "arrivedDate",
    align: "left",
    label: "Arrived at: ",
    field: "arrivedDate",
  },
  { name: "status", label: "Status:", field: "status" },
];

const rows = [
  {
    sender: "Archie",
    phoneNumber: "0881234567890",
    senderAddress: "Bekasi1, West Java, Indonesia",
    name: "Snack",
    quantity: 159,
    donatedTo: "Klepu  Village",
    donationPhoto: "img:icons/admin/DonationValidate/food-donation.jpg",
    arrivedDate: "13/02/2023",
    notes: "Lorem ipsum dolor sit amet consectetuer adipiscing elit.",
    status: "Pending",
  },
  {
    sender: "Archie",
    phoneNumber: "0881234567890",
    senderAddress: "Bekasi1, West Java, Indonesia",
    name: "Snack",
    quantity: 159,
    donatedTo: "Klepu  Village",
    donationPhoto: "img:icons/admin/DonationValidate/food-donation.jpg",
    arrivedDate: "13/02/2023",
    notes: "Lorem ipsum dolor sit amet consectetuer adipiscing elit.",
    status: "Accepted",
  },
  {
    sender: "Archie",
    phoneNumber: "0881234567890",
    senderAddress: "Bekasi1, West Java, Indonesia",
    name: "Snack",
    quantity: 159,
    donatedTo: "Klepu  Village",
    donationPhoto: "img:icons/admin/DonationValidate/food-donation.jpg",
    arrivedDate: "13/02/2023",
    notes: "Lorem ipsum dolor sit amet consectetuer adipiscing elit.",
    status: "Declined",
  },
];

export default {
  name: "DonationDetails",
  setup() {
    return {
      columns,
      rows,
    };
  },
};
</script>

<style>
.h6 {
  font-size: 18px;
}

.b1 {
  font-size: 14px;
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