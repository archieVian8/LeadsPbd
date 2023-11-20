<template>
  <q-page>
    <div class="row justify-center">
      <q-input
        v-model="search"
        debounce="1000"
        rounded
        outlined
        bg-color="searchbar"
        placeholder="Search Location"
        class="q-mt-lg font-poppins-medium fixed z-top searchbar-props">
        <template v-slot:prepend>
          <q-icon name="search" color="dark" />
        </template>
      </q-input>
    </div>
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2948.1758775081366!2d-71.09864467033977!3d42.36009091261601!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89e370aaf51a6a87%3A0xd0e08ea5b308203c!2sMassachusetts%20Institute%20of%20Technology!5e0!3m2!1sen!2sid!4v1676440509423!5m2!1sen!2sid"
      width="1080" height="1920" style="border:0;" allowfullscreen="" loading="lazy"
      referrerpolicy="no-referrer-when-downgrade"></iframe>
  </q-page>
</template>

<script>
export default {
  name: 'Maps'
}
</script>

<style>
.bg-searchbar {
  background: #F1F5F9 !important;
}

.searchbar-props {
  width: 328px;
  height: 44px;
}
</style>