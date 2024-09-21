<template>
	<div class="container mx-auto max-w-md mt-10">
		<h1 class="text-3xl mb-4">Login</h1>
		<form @submit.prevent="handleLogin">
			<div class="mb-4">
				<label class="block mb-2">Email</label>
				<input type="email" v-model="email" class="border rounded w-full p-2" />
			</div>
			<div class="mb-4">
				<label class="block mb-2">Password</label>
				<input
					type="password"
					v-model="password"
					class="border rounded w-full p-2" />
			</div>
			<button type="submit" class="bg-blue-500 text-white py-2 px-4 rounded">
				Login
			</button>
			<div v-if="errorMessage" class="text-red-500 mt-2">
				{{ errorMessage }}
			</div>
		</form>
	</div>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
	setup() {
		const email = ref("");
		const password = ref("");
		const store = useStore();
		const router = useRouter();
		const errorMessage = ref("");

		const handleLogin = async () => {
			try {
				await store.dispatch("login", {
					email: email.value,
					password: password.value,
				});
				const role = store.state.user.role;
				if (role === "admin") {
					router.push("/admin-dashboard");
				} else {
					router.push("/user-dashboard");
				}
			} catch (error) {
				console.error("Login failed", error);
				errorMessage.value = error.response.data.message;
			}
		};

		return { email, password, handleLogin, errorMessage };
	},
};
</script>
