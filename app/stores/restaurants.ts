import { defineStore } from 'pinia'
import type { Restaurant, TimeSlot } from '~/types/api'

export const useRestaurantsStore = defineStore('restaurants', () => {
  const config = useRuntimeConfig()
  const apiBase = config.public.apiBaseUrl as string

  const restaurants = ref<Restaurant[]>([])
  const currentRestaurant = ref<Restaurant | null>(null)
  const timeSlots = ref<TimeSlot[]>([])
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

  async function fetchRestaurant(id: string) {
    loading.value = true
    error.value = null
    currentRestaurant.value = null
    try {
      currentRestaurant.value = await $fetch<Restaurant>(`${apiBase}/restaurants/${id}`)
    } catch (e: any) {
      error.value = e.data?.message ?? e.message ?? 'Restaurant introuvable'
    } finally {
      loading.value = false
    }
  }

  async function fetchTimeSlots(restaurantId: string, date: string) {
    loading.value = true
    error.value = null
    timeSlots.value = []
    try {
      timeSlots.value = await $fetch<TimeSlot[]>(`${apiBase}/restaurants/${restaurantId}/slots`, {
        query: { date }
      })
    } catch (e: any) {
      error.value = e.data?.message ?? e.message ?? 'Erreur lors du chargement des créneaux'
    } finally {
      loading.value = false
    }
  }

  return { restaurants, currentRestaurant, timeSlots, error, loading, fetchRestaurants, fetchRestaurant, fetchTimeSlots }
})
