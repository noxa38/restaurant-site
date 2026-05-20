<template>
  <div class="slot-grid-wrapper">
    <div v-if="slots.length === 0" class="no-slots">
      Aucun créneau pour cette date.
    </div>
    <template v-else>
      <div class="legend">
        <span class="legend-free">Disponible</span>
        <span class="legend-nearly">Presque plein</span>
        <span class="legend-full">Complet</span>
      </div>
      <div class="slot-grid">
        <TimeSlotBadge
          v-for="slot in slots"
          :key="slot.id"
          :slot="slot"
          :selected="selectedSlotId === slot.id"
          @select="$emit('select', $event)"
        />
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import type { TimeSlot } from '~/types/api'

defineProps<{
  slots: TimeSlot[]
  selectedSlotId: string | null
}>()

defineEmits<{
  select: [slot: TimeSlot]
}>()
</script>

<style scoped>
.slot-grid-wrapper { display: flex; flex-direction: column; gap: 0.75rem; }

.no-slots { color: var(--text-muted); padding: 1rem; background: var(--card-inner); border-radius: var(--radius); }

.legend { display: flex; gap: 0.5rem; font-size: 0.75rem; }
.legend span { padding: 0.15rem 0.5rem; border-radius: 3px; }
.legend-free { background: var(--success); color: #fff; }
.legend-nearly { background: var(--warning); color: #fff; }
.legend-full { background: #4a1a1a; color: #888; }

.slot-grid { display: flex; flex-wrap: wrap; gap: 0.4rem; }
</style>
