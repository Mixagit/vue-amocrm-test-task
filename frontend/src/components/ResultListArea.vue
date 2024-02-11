<script setup>
import { useEntityStore } from '../store/entityStore'

const entityStore = useEntityStore()

const getEntityTypeName = type => {
	const entityTypes = {
		leads: 'Сделка',
		contacts: 'Контакт',
		companies: 'Компания',
	}
	return entityTypes[type] || type
}
</script>

<template>
	<transition-group name="list" appear>
		<div class="item" v-for="entity in entityStore.entities" :key="entity.id">
			<div class="entity-type">
				{{ getEntityTypeName(entity.type) }}
			</div>
			<div class="entity-id">
				{{ entity.id }}
			</div>
		</div>
	</transition-group>
</template>

<style scoped>
.list {
	display: flex;
	flex-direction: column;
}

.item {
	border: 1px solid #ccc;
	margin: 10px;
	padding: 10px;
	border-radius: 5px;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	transition: box-shadow 0.3s ease;

	&:hover {
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
	}
}

.entity-type {
	font-size: 18px;
	font-weight: bold;
	color: #3498db;
}

.entity-id {
	margin-top: 5px;
	font-size: 14px;
	color: #555;
}

.item-content {
	display: inherit;
}

.list-item {
	display: inline-block;
	margin-right: 10px;
}

.list-enter-active,
.list-leave-active {
	transition: all 0.4s ease;
}

.list-enter-from,
.list-leave-to {
	opacity: 0;
	transform: translateX(130px);
}
</style>
