import axios from 'axios'
import Cookies from 'js-cookie'
import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

const apiUrl = import.meta.env.VITE_API

export const useEntityStore = defineStore('entityStore', () => {
	const selectedEntity = ref('')

	const entities = ref([])

	const entitiesInCookies = Cookies.get('entities')

	if (entitiesInCookies) {
		entities.value = JSON.parse(entitiesInCookies)._value
	}

	const createEntity = async entityType => {
		try {
			const response = await axios.post(`${apiUrl}${entityType}`, [{}])
			const createdEntityId = response.data.data
			entities.value.unshift({ id: createdEntityId, type: entityType })
		} catch (error) {
			console.error('Ошибка создания сущности:', error)
		}
	}

	watch(
		() => entities,
		state => {
			Cookies.set('entities', JSON.stringify(state))
		},
		{ deep: true }
	)
	return { selectedEntity, entities, createEntity }
})
