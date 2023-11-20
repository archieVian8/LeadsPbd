<template>
  <q-page>
    <div class="back-arrow row self-start">
      <q-btn unelevated text-color="black" round color="white" icon="arrow_back" to="/" />
    </div>

    <div class="row justify-center q-pt-xl">
      <div class="auth-admin-icon">
        <q-icon name="img:icons/landing/roles-admin.svg" size="360px" />
      </div>
    </div>

    <div>
      <q-card class="sign-bar shadow-up-8 row justify-center">
        <div class="auth-admin-note">
          <span>
            Harap dicatat bahwa dengan mendaftar sebagai administrator, Anda telah diberikan tanggung jawab besar untuk
            membantu memulihkan akibat bencana secepat dan efisien mungkin.
          </span>
        </div>
        <q-card-section>
          <div>
            <q-btn class="sign-in column" flat dense no-caps label="Masuk"  to="/auth/admin/login" />
          </div>
          <div>
            <q-btn class="sign-up" dense no-caps outline label="Daftar" to="/auth/admin/register" />
          </div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
export default {
  name: "confirmAdmin",
};
</script>

<style lang="scss">
.back-arrow {
  margin-top: 24px;
  margin-left: 24px;
}

.auth-admin-icon {
  margin-top: 18px;
}

.sign-bar {
  border-top-left-radius: 50px;
  border-top-right-radius: 50px;
  background-color: #f1f5f9;
  color: white;
  font-size: 14px;
  margin-top: 42px;
}

.auth-admin-note {
  text-align: center;
  width: 312px;
  height: 97px;
  font-size: 14px;
  font-weight: medium;
  color: #000000;
  margin-bottom: 16px;
  margin-top: 32px;
}

.sign-in {
  color: #ffffff;
  width: 312px;
  height: 42px;
  background-color: #df6206;
  font-size: medium;
}

.sign-up {
  color: #df6206;
  width: 312px;
  height: 42px;
  margin-top: 12px;
  margin-bottom: 24px;
}
</style>
