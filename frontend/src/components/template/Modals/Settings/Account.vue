<template>
    <div class="account">
        <SButton
            danger
            outlined
        >
            Supprimer mon compte
        </SButton>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SButton from "@/components/design/Forms/Button.vue";

export default defineComponent({
    name: "SAccount",
    components: { SButton }
});
</script>

<style scoped lang="scss">
.account {
    padding: var(--length-padding-m);
}
</style>
