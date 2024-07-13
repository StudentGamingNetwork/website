<template>
  <SButton primary @click="increment()">
    <div class="sort-content">
      <FontAwesomeIcon v-if="sortCount == 0" :icon="['fas', 'sort-down']" />
      <FontAwesomeIcon v-if="sortCount == 1" :icon="['fas', 'sort']" />
      <FontAwesomeIcon v-if="sortCount == 2" :icon="['fas', 'sort-up']" />
      {{ sort_field }}
    </div>
  </SButton>
</template>

<script lang="ts">
import { ref, watch, defineExpose, Ref } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import SButton from "@/components/design/forms/Button.vue";

export default {
  name: "Sort",
  components: { FontAwesomeIcon, SButton },
};
</script>

<script setup lang="ts">
const props = defineProps({
  sort_field: {
    type: String,
    required: true,
    default: "Région",
  },
});

const sortCount = ref(1);

const increment = () => {
  sortCount.value++;
};

watch(sortCount, (newVal) => {
  sortCount.value = newVal > 2 ? 0 : newVal;
});

defineExpose({ sortCount });
</script>

<style scoped>
.sort-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0 0.5rem;
}
</style>
