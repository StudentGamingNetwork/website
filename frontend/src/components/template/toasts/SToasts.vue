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

<script lang="ts" setup>
import SToast from "@/components/template/toasts/SToast.vue";
import { useStore } from "@/modules/toast";

const toastStore = useStore();

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
