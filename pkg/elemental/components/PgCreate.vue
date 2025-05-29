<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import axios from "axios";
import { useBranding } from "@bytebuilders/ui-modules/src/composables/branding";
const pgList = ref([]);
const name = ref("");
const namespace = ref("");
const deletionPolicy = ref("Delete");
const accessMode = ref("ReadWriteOnce");
const storage = ref("");
const storageClassName = ref("local-path");
const version = ref("16.4");

const { fetchBranding } = useBranding();

const generatedObject = computed(() => ({
  apiVersion: "kubedb.com/v1",
  kind: "Postgres",
  metadata: {
    name: name.value,
    namespace: namespace.value,
  },
  spec: {
    deletionPolicy: deletionPolicy.value,
    storage: {
      accessModes: [accessMode.value],
      resources: {
        requests: {
          storage: storage.value,
        },
      },
      storageClassName: storageClassName.value,
    },
    storageType: "Durable",
    version: version.value,
  },
}));

const handleSubmit = async () => {
  try {
    const response = await axios.post(
      `/k8s/clusters/local/apis/kubedb.com/v1/namespaces/${namespace.value}/postgreses`,
      generatedObject.value
    );

    console.log(response);
  } catch (error) {
    console.error("Error loading data:", error);
  }
};

const getPgList = async () => {
  try {
    const response = await axios.get(
      "/k8s/clusters/local/apis/kubedb.com/v1/postgreses"
    );
    const data = response.data;
    pgList.value = data.items;
  } catch (error) {
    console.error("Error loading data:", error);
  }
};

onMounted(() => {
  getPgList();
});
</script>
<template>
  Existing PG Instances
  <div>
    <pre v-for="pg in pgList"
      >{{ pg.metadata?.name }}/{{ pg.metadata?.namespace }}: {{
        `replicas: ${pg.spec.replicas} Storageclass: ${pg.spec?.storage.storageClassName} Version: ${pg.spec.version}`
      }}</pre
    >
  </div>

  <form @submit.prevent="handleSubmit" class="space-y-4">
    <div>
      <label>Name</label>
      <input v-model="name" type="text" required />
    </div>

    <div>
      <label class="block text-sm font-medium">Namespace</label>
      <input v-model="namespace" type="text" required />
    </div>

    <div>
      <label>Deletion Policy</label>
      <select v-model="deletionPolicy">
        <option value="Delete">Delete</option>
      </select>
    </div>

    <div>
      <label>Access Mode</label>
      <select v-model="accessMode">
        <option value="ReadWriteOnce">ReadWriteOnce</option>
      </select>
    </div>

    <div>
      <label>Storage (e.g., 1Gi)</label>
      <input v-model="storage" type="text" required />
    </div>

    <div>
      <label>Storage Class Name</label>
      <select v-model="storageClassName">
        <option value="local-path">local-path</option>
      </select>
    </div>

    <div>
      <label>Version</label>
      <select v-model="version">
        <option value="16.4">16.4</option>
      </select>
    </div>

    <button type="submit">Submit</button>

    <div>
      Payload
      <pre>{{ generatedObject }}</pre>
    </div>
  </form>
</template>
