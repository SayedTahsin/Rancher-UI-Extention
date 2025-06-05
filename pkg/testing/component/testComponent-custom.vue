<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useStore } from 'vuex'

const store = useStore()

const userData = computed(() => store.getters['test-extension/userData']);
const loading = computed(() => store.getters['test-extension/isLoading']);

onMounted(()=>{
  store.dispatch('test-extension/fetchMyData')
})

</script>

<template>
  {{ loading }}
  <h1>custom page testing</h1>
  <p v-if="loading">Loading...</p>
  <pre v-else>{{ userData }}</pre>
</template>
