<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import axios from "axios";
import { useStore } from 'vuex'

const pgList = ref<Array<{metadata: {name: string, namespace: string}, spec: Record<string, any>}>>([]);
const name = ref("");
const namespace = ref("");
const deletionPolicy = ref("Delete");
const accessMode = ref("ReadWriteOnce");
const storage = ref("");
const url = ref("");
const storageClassName = ref("local-path");
const version = ref("16.4");


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

const config = {
    headers: { Authorization: `Bearer dde29c3d1b8c146d6500594ea83be0e13571adae` }
};


const handleSubmit = async () => {
  const apiUrl = url.value || '/k8s/clusters/c-pgb8v/api/v1/namespaces/ace/services/ace-platform-api/proxy'
  try {
    const response = await axios.get(apiUrl,
      config
    );

    console.log(response);
  } catch (error) {
    console.error("Error loading data:", error);
  }
};


const getPgList = async () => {
  // /k8s/clusters/c-pgb8v/api/v1/namespaces/ace/services/ace-platform-api/proxy
  //  "https://10.2.0.144.sslip.io/k8s/clusters/c-ln4df/api/v1/namespaces/ace/services/ace-platform-api/proxy"
  
  try {
    const response = await axios.get(
      "/k8s/clusters/c-pgb8v/api/v1/namespaces/ace/services/ace-platform-api/proxy",
      config);
    const data = response.data;
    pgList.value = data.items;
  } catch (error) {
    console.error("Error loading data:", error);
  }
};

const store = useStore()

const myData = computed(() => store.getters['my-extension/myData']);
const loading = computed(() => store.getters['my-extension/isLoading']);


onMounted(async() => {

  store.dispatch('my-extension/fetchMyData');

  const result = await store.dispatch('management/findAll', { type: 'management.cattle.io.cluster' })
  console.log(result)
  getPgList();
});


const loadData = () => {
  store.dispatch('my-extension/fetchMyData');
};

</script>
<template>
  <div>
    <pre v-for="pg in pgList"
      >{{ pg.metadata?.name }}/{{ pg.metadata?.namespace }}: {{
        `replicas: ${pg.spec.replicas} Storageclass: ${pg.spec?.storage.storageClassName} Version: ${pg.spec.version}`
      }}</pre
    >
  </div>

  <form @submit.prevent="handleSubmit" class="space-y-4">
    <div>
      <label>url</label>
      <input v-model="url" type="text" required />
    </div>
    <!-- <div>
      <label>Name</label>
      <input v-model="name" type="text"  />
    </div>

    <div>
      <label class="block text-sm font-medium">Namespace</label>
      <input v-model="namespace" type="text"  />
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
      <input v-model="storage" type="text"  />
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
    </div> -->

    <button type="submit">Submit</button>

    <!-- <div>
      Payload
      <pre>{{ generatedObject }}</pre>
    </div> -->
  </form>


    <div>
    <button @click="loadData">Load Data</button>
    <div v-if="loading">Loading...</div>
    <pre>{{ myData }}</pre>
  </div>
</template>
