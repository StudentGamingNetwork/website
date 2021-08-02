<template>
    <div class="profil-picker">
        <div class="title">
            Image de profil
        </div>
        <div class="picker">
            <FontAwesomeIcon
                class="icon"
                :icon="['fas', 'user']"
            />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

export default defineComponent({
    name: "SProfilPicker",
    components: { FontAwesomeIcon }
});
</script>

<style scoped lang="scss">
.profil-picker {
    display: flex;
    flex-direction: column;
    gap: var(--length-gap-s);

    .title {
        opacity: 0.5;
        font-weight: 600;
        font-size: 0.8rem;
    }

    .picker {
        border: 2px solid var(--color-content-softer);
        width: 64px;
        height: 64px;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;

        &:hover {
            border-color: var(--color-content);
        }

        .icon {
            height: 32px;
            width: 32px;
            opacity: 0.2;
        }
    }
}
</style>
