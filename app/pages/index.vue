<template>
  <div class="list-page">
    <div class="search-wrapper">
      <input
        v-model="searchQuery"
        type="search"
        class="search-input"
        placeholder="Rechercher un restaurant..."
        aria-label="Rechercher un restaurant"
      />
    </div>

    <AppError :message="store.error" />

    <div v-if="store.loading" class="loading">Chargement des restaurants…</div>

    <template v-else>
      <div v-if="filteredRestaurants.length === 0" class="empty">
        Aucun restaurant trouvé.
      </div>
      <div v-else class="restaurants-grid">
        <RestaurantCard
          v-for="restaurant in filteredRestaurants"
          :key="restaurant.id"
          :restaurant="restaurant"
          @select="router.push(`/restaurants/${$event}`)"
        />
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { useRestaurantsStore } from '~/stores/restaurants'

const router = useRouter()
const store = useRestaurantsStore()
const searchQuery = ref('')

const filteredRestaurants = computed(() => {
  const q = searchQuery.value.trim().toLowerCase()
  if (!q) return store.restaurants
  return store.restaurants.filter(r =>
    r.name.toLowerCase().includes(q) ||
    r.cuisineType.toLowerCase().includes(q) ||
    r.address.toLowerCase().includes(q)
  )
})

onMounted(() => store.fetchRestaurants())
</script>

<style scoped>
.list-page { display: flex; flex-direction: column; gap: 1rem; }

.search-input {
  width: 100%;
  padding: 0.6rem 1rem;
  background: var(--info);
  border: none;
  border-radius: var(--radius);
  color: #fff;
  font-size: 1rem;
}

.search-input::placeholder { color: rgba(255,255,255,0.7); }

.restaurants-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

.loading, .empty { color: var(--text-muted); padding: 2rem; text-align: center; }

@media (max-width: 768px) {
  .restaurants-grid { grid-template-columns: repeat(2, 1fr); }
}
</style>
