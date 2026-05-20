<template>
  <div class="card">
    <h2>Ma réservation</h2>

    <div class="info-grid">
      <div class="info-item">
        <span class="label">Client</span>
        <span>{{ reservation.customer.name }}</span>
      </div>
      <div class="info-item">
        <span class="label">Email</span>
        <span>{{ reservation.customer.email }}</span>
      </div>
      <div class="info-item">
        <span class="label">Téléphone</span>
        <span>{{ reservation.customer.phone }}</span>
      </div>
      <div class="info-item">
        <span class="label">Restaurant</span>
        <span>{{ reservation.restaurant.name }}</span>
      </div>
      <div class="info-item">
        <span class="label">Date</span>
        <span>{{ reservation.slot.date }}</span>
      </div>
      <div class="info-item">
        <span class="label">Créneau</span>
        <span>{{ reservation.slot.startTime }} – {{ reservation.slot.endTime }}</span>
      </div>
      <div class="info-item">
        <span class="label">Couverts</span>
        <span>{{ reservation.covers }}</span>
      </div>
      <div class="info-item">
        <span class="label">Statut</span>
        <span class="status" :class="`status-${reservation.status}`">{{ reservation.status }}</span>
      </div>
    </div>

    <div v-if="successMessage" class="success">{{ successMessage }}</div>

    <AppError :message="error" />

    <button
      v-if="reservation.status !== 'cancelled'"
      class="btn-cancel"
      :disabled="loading"
      @click="$emit('cancel')"
    >
      {{ loading ? 'Annulation en cours…' : 'Annuler la réservation' }}
    </button>
  </div>
</template>

<script setup lang="ts">
import type { Reservation } from '~/types/api'

defineProps<{
  reservation: Reservation
  loading: boolean
  error: string | null
  successMessage: string | null
}>()

defineEmits<{ cancel: [] }>()
</script>

<style scoped>
.card {
  background: var(--card);
  padding: 1rem;
  border-radius: var(--radius);
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  max-width: 500px;
}

h2 { margin-bottom: 0.25rem; }

.info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; }

.info-item {
  background: var(--card-inner);
  padding: 0.5rem 0.6rem;
  border-radius: var(--radius);
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.label { font-size: 0.72rem; color: var(--text-muted); text-transform: uppercase; }

.status { font-weight: bold; font-size: 0.85rem; }
.status-confirmed { color: var(--success); }
.status-cancelled { color: var(--danger); }

.success {
  background: var(--success);
  color: #fff;
  padding: 0.6rem 0.75rem;
  border-radius: var(--radius);
}

.btn-cancel {
  padding: 0.6rem;
  background: var(--danger);
  color: #fff;
  border: none;
  border-radius: var(--radius);
  cursor: pointer;
  font-weight: bold;
  text-transform: uppercase;
}

.btn-cancel:disabled { opacity: 0.6; cursor: not-allowed; }
</style>
