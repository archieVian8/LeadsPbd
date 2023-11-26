<template>
  <q-layout>
    <q-header class="header column justify-center">
      <div class="main-container row items-center justify-between">
        <img src="/images/logo-black.png" alt="Logo">
        <div class="row items-center gap-md">
          <a href="/organizer/competition" class="jakarta-sb q-mr-xl">Competition</a>
          <a href="/organizer/event" class="jakarta-sb">Events</a>
        </div>
        <div class="row items-center">
          <img src="/images/user-header.png" alt="Avatar">
          <p class="jakarta-b q-mx-lg">Budi</p>
          <q-icon name="img:/icons/logout.png" size="24px" />
        </div>
      </div>
    </q-header>
    <q-page-container>
      <RouterView></RouterView>
    </q-page-container>
    <q-footer class="footer">
      <div class="divider" />
      <div class="row items-center justify-between q-mt-lg">
        <img src="/images/logo-white.png" alt="Logo">
        <div>
          <q-icon name="img:/icons/dribble.png" size="24px" />
          <q-icon name="img:/icons/instagram.png" size="24px" class="q-mx-lg" />
          <q-icon name="img:/icons/linkedin.png" size="24px" />
        </div>
      </div>
      <p class="jakarta-b text-center text-white q-mt-lg">© 2023 LEADS. All Rights Reserved.</p>
    </q-footer>
  </q-layout>
</template>

<script>
</script>

<style scoped>
.header {
  width: 100%;
  height: 100px;
  max-height: 100px;
  background-color: white;
}

.footer {
  padding: 80px 156px;
  background-color: #000;
  color: white;
}

.divider {
  width: 100%;
  height: 1px;
  background-color: #D2D5DA;
}
</style>
