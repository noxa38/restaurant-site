<template>
  <div>
    <NuxtLink :to="`/restaurants/${restaurantId}`" class="back">← Retour</NuxtLink>

    <div v-if="!restaurantId || !slotId" style="margin-top: 1rem;">
      <AppError message="Paramètres manquants." />
    </div>

    <ReservationForm
      v-else
      :loading="store.loading"
      :error="store.error"
      :error-field="store.errorField"
      :restaurant-id="restaurantId"
      :time-slot-id="slotId"
      @submit="handleSubmit"
    />
  </div>
</template>

<script setup lang="ts">
import { useReservationsStore } from '~/stores/reservations'
import type { ReservationCreate } from '~/types/api'

const route = useRoute()
const router = useRouter()
const store = useReservationsStore()

const restaurantId = route.query.restaurantId as string
const slotId = route.query.slotId as string

async function handleSubmit(data: ReservationCreate) {
  const reservation = await store.createReservation(data)
  if (reservation) {
    router.push(`/my-reservation?token=${reservation.token}`)
  }
}
</script>

<style scoped>
.back { color: var(--text-muted); text-decoration: none; font-size: 0.9rem; }

div { margin-top: 1rem; }
</style>
