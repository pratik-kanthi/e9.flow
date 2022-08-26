<script setup>
import {onMounted, ref} from 'vue';
import Flow from './components/Flow/Flow.vue';

const products = ref(null);
const headers = ref([
	{
		key: 'title'
	},
	{
		key: 'brand'
	},
	{
		key: 'category'
	},
	{
		key: 'price'
	}
])


const productsConfig = ref({
	name: 'products',
	keyField: 'id',
	itemSize: 32,
	showSidebar: true
});


onMounted(async ()=>{
	try{
		const apiData = await fetch('https://dummyjson.com/products');
		const result  = await apiData.json();
		products.value = result.products;
	}catch (e) {
		console.log(e);
	}
});
</script>

<template>
	<div v-if="products" class="h-full flex flex-col">
		<Flow :items="products" :headers="headers" :config="productsConfig">
			<template #content-slot='data'>
				<pre class="h-full">{{data.data.entity}}</pre>
			</template>
		</Flow>
	</div>
</template>
