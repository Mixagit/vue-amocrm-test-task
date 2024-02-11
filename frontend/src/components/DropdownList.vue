<script setup>
import { useEntityStore } from '../store/entityStore'

const entityStore = useEntityStore()
</script>
ф

<template>
	<div class="dropdown-container">
		<label for="selectedEntity" class="label">Выберите сущность:</label>
		<div class="custom-select">
			<select
				v-model="entityStore.selectedEntity"
				id="selectedEntity"
				class="dropdown-select"
				placeholder="Сущность: "
			>
				<option value="">Не выбрано</option>
				<option value="leads">Сделка</option>
				<option value="contacts">Контакт</option>
				<option value="companies">Компания</option>
			</select>
			<div class="select-arrow"></div>
		</div>
	</div>
</template>

<style scoped>
.dropdown-container {
	width: 100%;
	margin-top: 20px;
}

.label {
	font-size: 18px;
	font-weight: bold;
	margin-bottom: 10px;
	display: block;
}

.custom-select {
	position: relative;
	width: 100%;
}

.dropdown-select {
	width: 100%;
	padding: 10px;
	box-sizing: border-box;
	border: 1px solid #3498db;
	border-radius: 4px;
	font-size: 16px;
	background-color: #fff;
	color: #333;
	appearance: none;
	-webkit-appearance: none;
	background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="%233498db"><path d="M7 10l5 5 5-5z" /></svg>');
	background-repeat: no-repeat;
	background-position: right 10px center;
}

.select-arrow {
	position: absolute;
	top: 50%;
	right: 15px;
	transform: translateY(-50%);
	width: 0;
	height: 0;
	border-style: solid;
	border-width: 8px 8px 0 8px;
	border-color: #3498db transparent transparent transparent;
}

option {
	background-color: #fff;
	color: #333;
	padding: 10px;
}
</style>
