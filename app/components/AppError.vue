<template>
  <div v-if="message" class="error-box" role="alert">
    {{ message }}
  </div>
</template>

<script setup lang="ts">
defineProps<{
  message: string | null
}>()
</script>

<style scoped>
.error-box {
  background: var(--danger);
  color: #fff;
  padding: 0.5rem 0.75rem;
  border-radius: var(--radius);
}
</style>
