<template>
	<div id="app" class="min-h-screen bg-gray-100">
		<router-view />
	</div>
</template>

<script>
export default {
	name: "App",
};
</script>

<style>
html, body, #app {
  height: 100%;
  margin: 0;
  padding: 0;
}
</style>