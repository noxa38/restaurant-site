<template>
  <button
    class="slot-badge"
    :class="[`slot-${slot.status}`, { selected: selected }]"
    :disabled="slot.status === 'full'"
    @click="$emit('select', slot)"
  >
    <span>{{ slot.startTime }}</span>
    <span class="slot-end">{{ slot.endTime }}</span>
  </button>
</template>

<script setup lang="ts">
import type { TimeSlot } from '~/types/api'

defineProps<{
  slot: TimeSlot
  selected: boolean
}>()

defineEmits<{
  select: [slot: TimeSlot]
}>()
</script>

<style scoped>
.slot-badge {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.4rem 0.6rem;
  border: 2px solid transparent;
  border-radius: var(--radius);
  cursor: pointer;
  font-weight: bold;
  min-width: 75px;
}

.slot-end {
  font-size: 0.75rem;
  color: var(--text-muted);
}
.slot-badge:disabled { cursor: not-allowed; }
.slot-free { background: var(--success); color: #fff; }
.slot-nearly_full { background: var(--warning); color: #fff; }
.slot-full { background: #4a1a1a; color: #888; cursor: not-allowed; }

.selected { border-color: #fff; }
</style>
