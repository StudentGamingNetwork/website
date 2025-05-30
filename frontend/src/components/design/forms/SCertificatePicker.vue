<template>
    <div class="certificate-picker">
        <div
            class="picker"
            :title="i18n.global.t('components.design.form.certificatePicker')"
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
            :name="i18n.global.t('common.certificate')"
            type="file"
            @change="changeFile"
        >
        <div
            v-if="url"
            class="document"
        >
            <a
                :href="url"
                target="_blank"
            >
                <FontAwesomeIcon
                    class="icon"
                    :icon="['fas', 'id-card']"
                />
            </a>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ComponentPublicInstance, ref } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import i18n from "@/locales";

const { title = i18n.global.t("components.design.form.studentCertificate"), url = "" } = defineProps<{title?: string, url?: string}>();
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
.certificate-picker {
    display: flex;
    align-items: center;
    width: 320px;
    max-width: 100%;
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
