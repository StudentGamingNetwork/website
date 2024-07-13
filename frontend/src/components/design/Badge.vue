<template>
  <SButton v-if="active" primary @click="toggle">
    <div class="badge-content">{{ name }}</div>
  </SButton>
  <SButton v-else outlined @click="toggle">
    <div class="badge-content">{{ name }}</div>
  </SButton>
</template>

<script lang="ts">
import { ref, defineExpose } from "vue";
import SButton from "@/components/design/forms/Button.vue";

export default {
  name: "SBadge",
  components: { SButton },
};
</script>

<script setup lang="ts">
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
});

const active = ref(true);
const displayedName = props.name;

const toggle = () => {
  active.value = !active.value;
};

defineExpose({ active, displayedName });
</script>

<style scoped>
.badge-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0 0.5rem;
}
</style>
