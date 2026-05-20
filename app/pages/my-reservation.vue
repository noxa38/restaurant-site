<template>
  <div>
    <NuxtLink to="/" class="back">← Retour à la liste</NuxtLink>

    <div v-if="!token" style="margin-top: 1rem;">
      <AppError message="Aucun token dans l'URL. Utilisez ?token=votre-token" />
    </div>

    <div v-else-if="store.loading && !store.reservation" style="margin-top: 1rem;">
      Chargement…
    </div>

    <ReservationCard
      v-else-if="store.reservation"
      :reservation="store.reservation"
      :loading="store.loading"
      :error="store.error"
      :success-message="store.successMessage"
      @cancel="handleCancel"
    />

    <div v-else style="margin-top: 1rem;">
      <AppError :message="store.error ?? 'Réservation introuvable'" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useReservationsStore } from '~/stores/reservations'

const route = useRoute()
const store = useReservationsStore()

const token = route.query.token as string | undefined

onMounted(async () => {
  if (token) await store.fetchByToken(token)
})

async function handleCancel() {
  if (!store.reservation) return
  await store.cancelReservation(store.reservation.id, store.reservation.token)
}
</script>

<style scoped>
.back { color: var(--text-muted); text-decoration: none; font-size: 0.9rem; }
</style>
