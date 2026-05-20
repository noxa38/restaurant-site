<template>
  <form class="form" @submit.prevent="handleSubmit">
    <h2>Réservation</h2>

    <div class="field" :class="{ error: errorField === 'customerName' }">
      <label for="name">Nom</label>
      <input id="name" v-model="form.customerName" type="text" required />
    </div>

    <div class="row">
      <div class="field" :class="{ error: errorField === 'customerEmail' }">
        <label for="email">Email</label>
        <input id="email" v-model="form.customerEmail" type="email" required />
      </div>
      <div class="field" :class="{ error: errorField === 'customerPhone' }">
        <label for="phone">Téléphone</label>
        <input id="phone" v-model="form.customerPhone" type="tel" required />
      </div>
    </div>

    <div class="field field--narrow" :class="{ error: errorField === 'covers' }">
      <label for="covers">Couverts</label>
      <input id="covers" v-model.number="form.covers" type="number" min="1" max="20" required />
    </div>

    <AppError :message="error" />

    <button type="submit" :disabled="loading">
      {{ loading ? 'Réservation en cours…' : 'Réserver' }}
    </button>
  </form>
</template>

<script setup lang="ts">
import type { ReservationCreate } from '~/types/api'

const props = defineProps<{
  loading: boolean
  error: string | null
  errorField: string | null
  restaurantId: string
  timeSlotId: string
}>()

const emit = defineEmits<{
  submit: [data: ReservationCreate]
}>()

const form = reactive({ customerName: '', customerEmail: '', customerPhone: '', covers: 2 })

function handleSubmit() {
  emit('submit', { ...form, restaurantId: props.restaurantId, timeSlotId: props.timeSlotId })
}
</script>

<style scoped>
.form {
  background: var(--card);
  padding: 1rem;
  border-radius: var(--radius);
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  max-width: 500px;
}

h2 { margin-bottom: 0.25rem; }

.row { display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; }

.field { display: flex; flex-direction: column; gap: 0.25rem; }
.field--narrow { max-width: 150px; }

label { font-size: 0.8rem; color: var(--text-muted); }

input {
  background: var(--card-inner);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  color: var(--text);
  padding: 0.4rem 0.6rem;
}

.error input { border-color: var(--danger); }

button {
  padding: 0.6rem;
  background: var(--primary);
  color: #fff;
  border: none;
  border-radius: var(--radius);
  cursor: pointer;
  font-weight: bold;
  text-transform: uppercase;
}

button:disabled { opacity: 0.6; cursor: not-allowed; }
</style>
