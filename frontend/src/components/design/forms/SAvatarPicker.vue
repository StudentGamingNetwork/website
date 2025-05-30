<template>
    <div class="avatar-picker">
        <div class="title">
            {{ title }}
        </div>
        <div
            class="picker"
            :title="i18n.global.t('components.design.form.avatarPicker')"
            @click="chooseFile"
        >
            <FontAwesomeIcon
                v-if="!url"
                class="icon"
                :icon="icon"
            />
            <img
                v-else
                alt="avatar"
                class="avatar-image"
                :src="url"
            >
            <input
                ref="fileInput"
                accept="image/png, image/jpeg, image/webp"
                class="avatar-file"
                name="avatar"
                type="file"
                @change="changeFile"
            >
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ComponentPublicInstance, ref } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import i18n from "@/locales";

const { title = "Avatar", icon = ["fas", "user"], url = "" } = defineProps<{title?: string, icon?: Array<string>, url?: string}>();
const emit = defineEmits(["fileChange"]);
    
const fileInput = ref<ComponentPublicInstance<HTMLInputElement>>(null);

const chooseFile = () => {
    fileInput.value.click();
};

const changeFile = () => {
    emit("fileChange", fileInput.value.files?.[0]);
};

     
</script>

<style scoped lang="css">
.avatar-picker {
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
        overflow: hidden;

        .avatar-image {
            object-fit: contain;
            width: 100%;
            height: 100%;
        }

        &:hover {
            border-color: var(--color-content);
        }

        .icon {
            height: 32px;
            width: 32px;
            opacity: 0.2;
        }

        .avatar-file {
            display: none;
        }
    }
}
</style>
