<template>
    <div class="certificate-picker">
        <div
            class="picker"
            title="Uploader un certificat"
            @click="chooseFile"
        >
            <FontAwesomeIcon
                class="icon"
                :icon="['fas', 'upload']"
            />
            {{ title }}...
        </div>
        <input
            ref="fileInput"
            accept="image/png, image/jpeg, image/webp, application/pdf"
            class="certificate-file"
            name="certificate"
            type="file"
            @change="changeFile"
        >
        <div
            v-if="url"
            class="document"
        >
            <FontAwesomeIcon
                class="icon"
                :icon="['fas', 'id-card']"
            />
        </div>
    </div>
</template>

<script lang="ts">
import { ComponentPublicInstance, defineComponent, ref } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { User } from "@/modules";

export default defineComponent({
    name: "SCertificatePicker",
    components: { FontAwesomeIcon },
    props: {
        title: {
            default: "Certificat étudiant",
            type: String
        },
        url: {
            default: "",
            type: String
        }
    },
    emits: ["fileChange"],
    setup(props, context) {
        const userStore = User.useStore();
        const fileInput = ref<ComponentPublicInstance<HTMLInputElement>>(null);

        const chooseFile = () => {
            fileInput.value.click();
        };

        const changeFile = () => {
            context.emit("fileChange", fileInput.value.files?.[0]);
        };

        return {
            changeFile,
            chooseFile,
            fileInput,
            userStore
        };
    }
});
</script>

<style scoped lang="scss">
.certificate-picker {
    display: flex;
    align-items: center;
    width: 320px;
    box-sizing: border-box;
    padding: 0 calc(var(--length-padding-m) - 2px);
    border-radius: var(--lenght-radius-base);
    border: 2px solid var(--color-content-softer);

    .picker {
        flex-grow: 1;
        font-size: 0.9rem;
        line-height: 32px;
        font-weight: 600;
        cursor: pointer;
        color: var(--color-content-liter);

        &:hover {
            color: var(--color-content);
        }

        .icon {
            font-size: 16px;
            padding-right: var(--length-padding-xs);
        }
    }

    .certificate-file {
        display: none;
    }

    .document {
        display: flex;
        align-items: center;
        color: var(--color-content-liter);
        cursor: pointer;

        .icon {
            font-size: 16px;
        }

        &:hover {

            color: var(--color-content);
        }
    }
}
</style>
