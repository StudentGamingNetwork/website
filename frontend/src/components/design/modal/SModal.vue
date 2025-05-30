<template>
    <teleport to="body">
        <transition name="fade">
            <div
                v-if="active"
                class="modal-background"
                @click="$emit('close')"
            >
                <SCard
                    class="card"
                    @click.stop
                >
                    <slot />
                    <div
                        class="close"
                        @click="$emit('close')"
                    >
                        <FontAwesomeIcon :icon="['fas','times']" />
                    </div>
                </SCard>
            </div>
        </transition>
    </teleport>
</template>

<script lang="ts" setup>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import SCard from "@/components/design/SCard.vue";

const { active = false } = defineProps<{active: boolean}>();
defineEmits(["close"]);

</script>

<style scoped lang="css">
.modal-background {
    position: fixed;
    z-index: 10;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(4px);
    display: flex;
    justify-content: center;
    align-items: center;

    .card {
        position: relative;

        .close {
            top: 0;
            right: 0;
            position: absolute;
            width: 40px;
            height: 40px;
            font-size: 1.5rem;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;

            svg {
                color: var(--color-content-softer);
            }

            &:hover > svg {
                color: var(--color-content-content);
            }           
        }
    }

    &.fade-enter-from,
    &.fade-leave-to {
        opacity: 0;
    }

}
</style>
