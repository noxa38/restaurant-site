<template>
  <div class="restaurant-card">
    <div class="card-image">
      <img
        v-if="restaurant.imageUrl"
        :src="restaurant.imageUrl"
        :alt="restaurant.name"
      />
      <div v-else class="img-placeholder">IMG</div>
    </div>

    <div class="card-body">
      <h3 class="card-name">{{ restaurant.name }}</h3>
      <div class="card-meta">{{ restaurant.cuisineType }} — {{ restaurant.address }}</div>
      <p class="card-description">{{ restaurant.description }}</p>
    </div>

    <div class="card-footer">
      <button class="btn-reserve" @click="$emit('select', restaurant.id)">
        réserver
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Restaurant } from '~/types/api'

defineProps<{
  restaurant: Restaurant
}>()

defineEmits<{
  select: [id: string]
}>()
</script>

<style scoped>
.restaurant-card {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.card-image {
  width: 100%;
  height: 140px;
  background: var(--card-inner);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.img-placeholder { color: var(--text-muted); }

.card-body {
  padding: 0.75rem;
  flex: 1;
}

.card-name { font-weight: bold; margin-bottom: 0.25rem; }

.card-meta {
  font-size: 0.8rem;
  color: var(--text-muted);
  margin-bottom: 0.4rem;
}

.card-description {
  font-size: 0.8rem;
  color: var(--text-muted);
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.card-footer { padding: 0.75rem; }

.btn-reserve {
  width: 100%;
  padding: 0.5rem;
  background: var(--primary);
  color: #fff;
  border: none;
  border-radius: var(--radius);
  cursor: pointer;
  font-weight: bold;
  text-transform: uppercase;
}
</style>
