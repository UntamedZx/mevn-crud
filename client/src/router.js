import { createRouter, createWebHistory } from "vue-router";
import Login from "./components/Auth/Login.vue";
import Register from "./components/Auth/Register.vue";
import UserDashboard from "./views/UserDashboard.vue";
import AdminDashboard from "./views/AdminDashboard.vue";
import store from "./store/auth";

const routes = [
	{ path: "/", redirect: "/login" }, // Redirect to login
	{
		path: "/login",
		component: Login,
		meta: {
			requiresGuest: true,
		},
	}, // Add the login route
	{
		path: "/register",
		component: Register,
		meta: {
			requiresGuest: true,
		},
	},
	{
		path: "/user-dashboard",
		component: UserDashboard,
		meta: { requiresAuth: true, role: "user" },
	},
	{
		path: "/admin-dashboard",
		component: AdminDashboard,
		meta: { requiresAuth: true, role: "admin" },
	},
	{ path: "/:pathMatch(.*)*", redirect: "/login" }, // Catch-all route to redirect to login
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

router.beforeEach((to, from, next) => {
	const token = store.state.token;
	const userRole = store.state.user?.role;

	// If route requires authentication and there's no token, redirect to login
	if (to.meta.requiresAuth && !token) {
		return next("/login");
	}

	// If route requires a specific role and the user does not have it, redirect to login
	if (to.meta.requiresAuth && to.meta.role && userRole !== to.meta.role) {
		return next("/login");
	}

	// If route is for guests but the user is logged in, redirect based on role
	if (to.meta.requiresGuest && token) {
		if (userRole === "admin") {
			return next("/admin-dashboard");
		} else if (userRole === "user") {
			return next("/user-dashboard");
		}
	}

	// If none of the conditions match, proceed as normal
	next();
});

export default router;
