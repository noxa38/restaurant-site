import { defineStore } from 'pinia'
import type { Restaurant } from '~/types/api'

export const useRestaurantsStore = defineStore('restaurants', () => {
  const config = useRuntimeConfig()
  const apiBase = config.public.apiBaseUrl as string

  const restaurants = ref<Restaurant[]>([])
  const error = ref<string | null>(null)
  const loading = ref(false)

  async function fetchRestaurants() {
    loading.value = true
    error.value = null
    try {
      restaurants.value = await $fetch<Restaurant[]>(`${apiBase}/restaurants`)
    } catch (e: any) {
      error.value = e.data?.message ?? e.message ?? 'Erreur lors du chargement des restaurants'
    } finally {
      loading.value = false
    }
  }

  return { restaurants, error, loading, fetchRestaurants }
})
