<template>
  <q-page class="column justify-evenly items-center">
      <q-btn :ripple="{ color: 'grey-4' }" class="poppins-r skip-p self-end q-mr-sm" label="Skip" flat no-caps />
      <q-img src="/icons/landing/landing-art.svg" loading="lazy" />
      <p class="poppins-md catch-phrase">Start your journey helping this world with ALDER App</p>
      <q-btn round color="button" icon="arrow_downward" />
      <section class="bubble self-end">
      </section>
  </q-page>
</template>

<script>
export default {
  name: 'landing'
}
</script>

<style lang="scss">

.catch-phrase {
  width: 360px;
  font-size: 18px;
  text-align: center;
}

.skip-p {
  font-size: 14px;
}

.text-button {
  color: #2AACDF !important;
}
.bg-button {
  background: #2AACDF !important;
}

</style>
