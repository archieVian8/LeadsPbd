<template>
  <q-layout view="hHh lpR fFf" style="background-color: #ffffff">
    <q-page width="360px" height="800px">
      <q-page-container class="column flex-center">
        <div class="back-arrow row self-start">
          <q-btn unelevated text-color="black" round color="white" icon="arrow_back" to="/" />
        </div>

        <q-page-container class="column flex-center q-pt-xl">
          <div class="vol-auth-icon">
            <q-icon name="img:icons/landing/roles-volunteer.svg" size="360px" />
          </div>
        </q-page-container>

        <q-page-container>
          <div class="sign-bar shadow-up-8 column flex-center">
            <q-page-container class="column flex-center">
              <div class="auth-vol-note">
                <p>
                  Semua bantuan Anda akan sangat dihargai dan pasti akan membantu mereka yang
                  sangat membutuhkannya.
                </p>
              </div>
            </q-page-container>
            <q-btn class="sign-in-btn column" flat dense no-caps label="Masuk" to="/auth/volunteer/login" />
            <q-btn class="sign-up-btn" dense no-caps outline label="Daftar" to="/auth/volunteer/register" />
          </div>
        </q-page-container>
      </q-page-container>
    </q-page>
  </q-layout>
</template>

<script>
export default {
  name: 'confirmVolunteer'
}
</script>

<style lang="scss">
.back-arrow {
  margin-top: 12px;
  margin-left: 24px;
}

.vol-auth-icon {
  margin-top: 27px;
}

.sign-bar {
  border-top-left-radius: 50px;
  border-top-right-radius: 50px;
  background-color: #f1f5f9;
  color: white;
  font-size: 14px;
  margin-top: 42px;
  padding-left: 24px;
  padding-right: 24px;
}

.auth-vol-note {
  text-align: center;
  width: 312px;
  height: 97px;
  font-size: 14px;
  font-weight: medium;
  color: black;
  margin-bottom: 20px;
  margin-top: 32px;
}

.sign-in-btn {
  color: #ffffff;
  width: 312px;
  height: 42px;
  background-color: #56bde6;
  font-size: medium;
}

.sign-up-btn {
  color: #56bde6;
  width: 312px;
  height: 42px;
  margin-top: 12px;
  margin-bottom: 24px;
}
</style>
