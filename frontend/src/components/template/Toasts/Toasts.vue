<template>
    <div class="toasts">
        <div class="toasts-container">
            <transition-group name="toast">
                <SToast
                    v-for="toast in toastStore.toasts"
                    :key="toast.id"
                    :type="toast.type"
                    @close="toast.close"
                >
                    <h2>{{ toast.title }}</h2>
                    {{ toast.message }}
                </SToast>
            </transition-group>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SToast from "@/components/template/Toasts/Toast.vue";
import { useStore } from "@/modules/toast";

export default defineComponent({
    name: "SToasts",
    components: { SToast },
    setup() {
        const toastStore = useStore();

        return { toastStore };
    }
});
</script>

<style scoped lang="scss">
.toasts {
    position: fixed;
    z-index: 100;
    inset: 0;
    pointer-events: none;

    .toasts-container {
        display: flex;
        flex-direction: column-reverse;
        position: absolute;
        bottom: 0;
        right: 0;
        padding: var(--length-padding-m);
        gap: var(--length-gap-m);

        .toast-enter-active,
        .toast-leave-active {
            transition: all var(--duration-medium);
        }
        .toast-enter-from,
        .toast-leave-to {
            opacity: 0;
            transform: translateY(8px);
        }
    }
}
</style>
