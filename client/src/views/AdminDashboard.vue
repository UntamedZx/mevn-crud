<template>
	<div class="container mx-auto mt-10">
		<h1 class="text-3xl">Admin Dashboard</h1>
		<p>Welcome to the admin dashboard</p>
		<button @click="logout" class="bg-red-500 text-white px-4 py-2 rounded">
			Logout
		</button>
	</div>
</template>

<script>
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
	setup() {
		const store = useStore();
		const router = useRouter();

		const logout = () => {
			store.dispatch("logout");
			router.push("/login");
		};

		return { logout };
	},
};
</script>
