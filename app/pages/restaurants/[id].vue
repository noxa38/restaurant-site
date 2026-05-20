<template>
  <div>
    <NuxtLink to="/" class="back">← Retour</NuxtLink>

    <div v-if="store.loading && !store.currentRestaurant">Chargement…</div>

    <template v-else-if="store.currentRestaurant">
      <div class="restaurant-info">
        <h1>{{ store.currentRestaurant.name }}</h1>

        <img
          v-if="store.currentRestaurant.imageUrl"
          :src="store.currentRestaurant.imageUrl"
          :alt="store.currentRestaurant.name"
          class="restaurant-img"
        />

        <div class="meta">
          <span>{{ store.currentRestaurant.cuisineType }}</span>
          <span>{{ store.currentRestaurant.address }}</span>
        </div>

        <p class="description">{{ store.currentRestaurant.description }}</p>

        <button v-if="!showSlots" class="btn-reserve" @click="openSlots">
          Réserver
        </button>
      </div>

      <div v-if="showSlots" class="slots-section">
        <h2>Réservation</h2>

        <div class="date-group">
          <label for="date">Date</label>
          <input
            id="date"
            v-model="selectedDate"
            type="date"
            :min="today"
            @change="loadSlots"
          />
        </div>

        <div v-if="store.loading">Chargement des créneaux…</div>
        <TimeSlotGrid
          v-else
          :slots="store.timeSlots"
          :selected-slot-id="selectedSlotId"
          @select="selectedSlotId = $event.id"
        />

        <AppError :message="store.error" />

        <button
          v-if="selectedSlotId"
          class="btn-reserve"
          @click="goToReservation"
        >
          Réserver ce créneau
        </button>
      </div>
    </template>

    <AppError v-else :message="store.error ?? 'Restaurant introuvable'" />
  </div>
</template>

<script setup lang="ts">
import { useRestaurantsStore } from '~/stores/restaurants'

const route = useRoute()
const router = useRouter()
const store = useRestaurantsStore()

const restaurantId = route.params.id as string
const selectedDate = ref('')
const selectedSlotId = ref<string | null>(null)
const showSlots = ref(false)
const today = new Date().toISOString().split('T')[0]

async function openSlots() {
  showSlots.value = true
  selectedDate.value = today
  await loadSlots()
}

async function loadSlots() {
  selectedSlotId.value = null
  await store.fetchTimeSlots(restaurantId, selectedDate.value)
}

function goToReservation() {
  router.push({ path: '/reservation', query: { restaurantId, slotId: selectedSlotId.value } })
}

onMounted(() => store.fetchRestaurant(restaurantId))
</script>

<style scoped>
.back { color: var(--text-muted); text-decoration: none; font-size: 0.9rem; }

.restaurant-info {
  background: var(--card);
  padding: 1rem;
  border-radius: var(--radius);
  margin: 1rem 0;
}

h1 { margin-bottom: 0.75rem; }

.restaurant-img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: var(--radius);
  margin-bottom: 0.75rem;
}

.meta { color: var(--text-muted); font-size: 0.85rem; margin-bottom: 0.5rem; display: flex; gap: 1rem; }

.description { color: var(--text-muted); font-size: 0.9rem; }

.slots-section {
  background: var(--card);
  padding: 1rem;
  border-radius: var(--radius);
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

h2 { margin-bottom: 0.25rem; }

.date-group { display: flex; align-items: center; gap: 0.75rem; }

.date-group label { color: var(--text-muted); font-size: 0.85rem; }

.date-group input {
  background: var(--card-inner);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  color: var(--text);
  padding: 0.4rem 0.6rem;
}

.btn-reserve {
  padding: 0.6rem 1.5rem;
  background: var(--primary);
  color: #fff;
  border: none;
  border-radius: var(--radius);
  cursor: pointer;
  font-weight: bold;
  text-transform: uppercase;
  align-self: flex-start;
}
</style>
