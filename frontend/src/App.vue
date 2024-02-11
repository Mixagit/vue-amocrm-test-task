<script setup>
import CreatingButton from './components/CreatingButton.vue'
import DropdownList from './components/DropdownList.vue'
import ResultListArea from './components/ResultListArea.vue'
</script>

<template>
	<div class="window">
		<DropdownList class="dropdown-list" />
		<CreatingButton class="creating-button" />
		<ResultListArea />
	</div>
</template>

<style scoped>
.window {
	display: flex;
	flex-direction: column;
	border: 1px solid #ddd;
	border-radius: 15px;
	margin: auto;
	padding: 20px;
	max-width: 600px;
	width: 100%;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
	background-color: #fff;
}

.dropdown-list,
.creating-button {
	margin-bottom: 15px;
}

@media (max-width: 600px) {
	.window {
		max-width: 100%;
		padding: 15px;
	}
}
</style>
