<template>
	<div class="container mx-auto max-w-md mt-10">
		<h1 class="text-3xl mb-4">Register</h1>
		<form @submit.prevent="handleRegister">
			<div class="mb-4">
				<label class="block mb-2">Name</label>
				<input type="text" v-model="name" class="border rounded w-full p-2" />
			</div>
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
			<div class="mb-4">
				<label class="block mb-2">Role</label>
				<select v-model="role" class="border rounded w-full p-2">
					<option value="user">User</option>
					<option value="admin">Admin</option>
				</select>
			</div>
			<button type="submit" class="bg-blue-500 text-white py-2 px-2 rounded">
				Register
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
		const name = ref("");
		const email = ref("");
		const password = ref("");
		const role = ref("user");
		const errorMessage = ref("");
		const store = useStore();
		const router = useRouter();

		const handleRegister = async () => {
			try {
				await store.dispatch("register", {
					name: name.value,
					email: email.value,
					password: password.value,
					role: role.value,
				});
				const userRole = store.state.user.role;
				if (userRole === "admin") {
					router.push("/admin-dashboard");
				} else {
					router.push("/user-dashboard");
				}
			} catch (error) {
				console.error(error.response.data.message);
				errorMessage.value = error.response.data.message;
			}
		};

		return { name, email, password, role, handleRegister, errorMessage };
	},
};
</script>
