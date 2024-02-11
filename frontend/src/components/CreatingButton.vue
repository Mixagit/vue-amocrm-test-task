<script setup>
import { ref } from 'vue'
import { useEntityStore } from '../store/entityStore'

const entityStore = useEntityStore()
const isLoading = ref(false)

const handleClick = async () => {
	isLoading.value = true
	try {
		await entityStore.createEntity(entityStore.selectedEntity)
	} catch (error) {
		console.error('Ошибка при создании сущности:', error)
	} finally {
		isLoading.value = false
	}
}
</script>

<template>
	<div>
		<button
			@click="handleClick"
			:class="[
				'create-btn',
				{ 'inactive-btn': !entityStore.selectedEntity, hidden: isLoading },
			]"
		>
			{{ isLoading ? 'Создание...' : 'Создать' }}
		</button>

		<!-- Прелоадер -->
		<div v-if="isLoading" class="loader-container">
			<div class="loader"></div>
		</div>
	</div>
</template>

<style scoped>
.create-btn {
	flex: 1;
	margin: auto;
	border: none;
	padding: 10px;
	border-radius: 4px;
	cursor: pointer;
	transition: background-color 0.3s, transform 0.3s;
	background-color: #4c8bf7;
	color: #f4f7ff;
	font-size: 16px;
	font-weight: bold;
	box-sizing: border-box;
	user-select: none;
}

.create-btn:hover {
	background-color: #284d8e;
	transform: scale(1.02);
}

.inactive-btn {
	background-color: #fcfcfc;
	color: #2e3644;
	border: 1px solid #ddd;
	box-sizing: border-box;
	pointer-events: none;
}

.loader-container {
	flex: 1;
	text-align: center;
}

.loader {
	border: 4px solid #f3f3f3;
	border-top: 4px solid #3498db;
	border-radius: 50%;
	width: 20px;
	height: 20px;
	animation: spin 1s linear infinite;
	margin: 0 auto;
}

@keyframes spin {
	0% {
		transform: rotate(0deg);
	}
	100% {
		transform: rotate(360deg);
	}
}

.hidden {
	display: none;
}
</style>
