<script setup>
import VRuntimeTemplate from 'vue3-runtime-template';

defineProps({
	option: {
		type: Object,
		default() {
			return [];
		},
	},
	template: {
		type: String,
		default() {
			return null;
		},
	},
});
</script>

<template>
	<v-runtime-template :template="template"></v-runtime-template>
</template>
