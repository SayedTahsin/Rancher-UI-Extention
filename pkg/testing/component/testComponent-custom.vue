<script setup lang="ts">
import LabeledInput from "../assets/components/Form/LabeledInput/LabeledInput.vue";
import LabeledSelect from "../assets/components/Form/LabeledSelect/LabeledSelect.vue";
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";

const store = useStore();

const userData = computed(() => store.getters["test-extension/userData"]);
const loading = computed(() => store.getters["test-extension/isLoading"]);

onMounted(() => {
  store.dispatch("test-extension/fetchMyData");
});

const name = ref("");
const namespace = ref('')

const options = ref([{label: 'demo', value: 'demo'}, {label: 'default', value: 'default'}])

const selectNamespace = (e: string)=>{
  console.log(e)
}

</script>

<template>
  <h1 class="text-center">custom page testing</h1>
  <div class="row m-20">
    <div class="col span-6">
      <LabeledInput
        ref="nameInput1"
        key="name1"
        v-model:value="name"
        label="NameLabel 1"
        placeholder="Type your name"
        :disabled="false"
        :min-height="30"
        :required="true"
      />
    </div>

     <div
      class="col span-6"
    >
      <LabeledSelect
        v-model:value="namespace"
        :clearable="true"
        :options="options"
        :disabled="false"
        :searchable="true"
        :multiple="false"
        label="NamespaceLabel"
        placeholder="Select Namespace"
        required
        @selecting="selectNamespace"
      />
    </div>
  </div>

  <p v-if="loading">Loading...</p>
  <pre v-else>{{ userData }}</pre>
</template>
