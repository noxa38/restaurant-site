import { defineStore } from 'pinia'
import type { Reservation, ReservationCreate } from '~/types/api'

export const useReservationsStore = defineStore('reservations', () => {
  const config = useRuntimeConfig()
  const apiBase = config.public.apiBaseUrl as string

  const reservation = ref<Reservation | null>(null)
  const error = ref<string | null>(null)
  const errorField = ref<string | null>(null)
  const loading = ref(false)
  const successMessage = ref<string | null>(null)

  async function createReservation(data: ReservationCreate): Promise<Reservation | null> {
    loading.value = true
    error.value = null
    errorField.value = null
    try {
      reservation.value = await $fetch<Reservation>(`${apiBase}/reservations`, {
        method: 'POST',
        body: data
      })
      return reservation.value
    } catch (e: any) {
      error.value = e.data?.message ?? e.message ?? 'Erreur lors de la réservation'
      errorField.value = e.data?.field ?? null
      return null
    } finally {
      loading.value = false
    }
  }

  async function fetchByToken(token: string) {
    loading.value = true
    error.value = null
    try {
      reservation.value = await $fetch<Reservation>(`${apiBase}/reservations/by-token/${token}`)
    } catch (e: any) {
      error.value = e.data?.message ?? e.message ?? 'Réservation introuvable'
    } finally {
      loading.value = false
    }
  }

  async function cancelReservation(id: string, token: string) {
    loading.value = true
    error.value = null
    successMessage.value = null
    try {
      const result = await $fetch<{ message: string; reservation: Reservation }>(
        `${apiBase}/reservations/${id}/cancel`,
        { method: 'PATCH', body: { token } }
      )
      successMessage.value = result.message
      reservation.value = result.reservation
    } catch (e: any) {
      error.value = e.data?.message ?? e.message ?? "Erreur lors de l'annulation"
    } finally {
      loading.value = false
    }
  }

  return { reservation, error, errorField, loading, successMessage, createReservation, fetchByToken, cancelReservation }
})
