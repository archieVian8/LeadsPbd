<!-- /src/layouts/User.vue -->
<template>
	<q-layout view="hHh lpR fF2">

		<q-header class="header-bg">
			<span class="circle-1" />
			<span class="circle-2" />
			<span class="circle-3" />
			<span class="circle-4" />
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

		<q-footer elevated class="footer-bg">
			<q-tabs class="text-grey row justify-evenly" active-color="footer" indicator-color="transparent">
				<q-route-tab no-caps icon="fa-solid fa-house" label="Beranda" :to='`/volunteer?Uid=${this.Uid}&Uname=${this.Uname}`' exact />
				<q-route-tab no-caps icon="fa-solid fa-earth-americas" label="Riwayat Bantuan" :to='`/volunteer/historyDonate?Uid=${this.Uid}&Uname=${this.Uname}`' exact />
			</q-tabs>
		</q-footer>

	</q-layout>
</template>

<script>
export default {
  name: 'WithFooter',
  props: {
    pageTitle: {
      type: String,
      required: true
    }
  },
  mounted() {
    this.Uid = this.$route.query.Uid;
    this.Uname = this.$route.query.Uname;
  }
}
</script>

<style>
.header-bg {
	background-color: rgb(86, 189, 230);
	overflow: hidden;
}

.header-title {
	font-size: 22px;
}

.footer-bg {
	background-color: white;
	height: 65px;
}

.text-footer {
  color: #2AACDF !important;
}
.bg-footer {
  background: #2AACDF !important;
}

.circle-1 {
	position: absolute;
	width: 190px;
	height: 190px;
	left: 233px;
	top: -115px;
	background: #F8FAFC;
	opacity: 0.3;
	border-radius: 50%;
}

.circle-2 {
	position: absolute;
	width: 190px;
	height: 190px;
	left: -80px;
	top: 49px;
	background: #F8FAFC;
	opacity: 0.3;
	border-radius: 50%;
}

.circle-3 {
	position: absolute;
	width: 25px;
	height: 25px;
	left: 342px;
	top: 101px;
	background: #F8FAFC;
	opacity: 0.3;
	border-radius: 50%;
}

.circle-4 {
	position: absolute;
	width: 25px;
	height: 25px;
	left: 168px;
	top: -13px;
	background: #F8FAFC;
	opacity: 0.3;
	border-radius: 50%;
}
</style>
