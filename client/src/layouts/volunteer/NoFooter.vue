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
	background-color: rgb(86, 189, 230);
	overflow: hidden;
}

.header-title {
	font-size: 22px;
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
