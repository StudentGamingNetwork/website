<template>
    <div class="avatar-picker">
        <div class="title">
            {{ title }}
        </div>
        <div
            class="picker"
            title="Uploader une nouvelle image"
            @click="chooseFile"
        >
            <FontAwesomeIcon
                v-if="!url"
                class="icon"
                :icon="['fas', 'user']"
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

<script lang="ts">
import { ComponentPublicInstance, defineComponent, ref } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

export default defineComponent({
    name: "SAvatarPicker",
    components: { FontAwesomeIcon },
    props: {
        title: {
            default: "Avatar",
            type: String
        },
        url: {
            default: "",
            type: String
        }
    },
    emits: ["fileChange"],
    setup(props, context) {

        const fileInput = ref<ComponentPublicInstance<HTMLInputElement>>(null);

        const chooseFile = () => {
            fileInput.value.click();
        };

        const changeFile = () => {
            context.emit("fileChange", fileInput.value.files[0]);
        };

        return {
            changeFile,
            chooseFile,
            fileInput
        };
    }
});
</script>

<style scoped lang="scss">
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
