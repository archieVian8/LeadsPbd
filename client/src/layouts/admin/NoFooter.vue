<!-- /src/layouts/User.vue -->
<template>
  <q-layout view="hHh lpR fF2">

    <q-header bordered="false" class="header-bg">
      <q-toolbar class="q-mt-xl">
        <q-btn dense flat round icon="img:icons/volunteer/homePages/dummy-profilepic.png" size="20px" />
        <q-toolbar-title class="poppins-b text-center text-uppercase text-overline header-title">
          {{ pageTitle }}
        </q-toolbar-title>
				<q-btn dense flat round icon="img:icons/logout.png" to="/" size="18px" exact />
      </q-toolbar>

    </q-header>

    <!-- this is where the Pages are injected -->
    <q-page-container>
      <router-view></router-view>
    </q-page-container>

  </q-layout>
</template>

<script>
export default {
  name: 'NoFooter',
  props: {
    pageTitle: {
      type: String,
      required: true
    }
  }
}
</script>

<style>
.header-bg {
  background-color: #F97C21;
  overflow: hidden;
}

.header-title {
  font-size: 22px;
}
</style>
