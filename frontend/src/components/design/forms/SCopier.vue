<template>
    <span
        class="copier"
        :title="$t('components.design.form.copy')"
        @click="copyIntoClipboard"
    >
        <slot />
    </span>
</template>

<script lang="ts" setup>
import { useI18n } from "vue-i18n";
import { Toast } from "@/modules";
import { EToastType } from "@/modules/toast/store";

const props = defineProps<{
    content: string;
}>();
   
const { t } = useI18n(); 
const toastStore = Toast.useStore();

const copyIntoClipboard = async () => {
    await navigator.clipboard.writeText(props.content);
    toastStore.add({
        title: t("utils.toast.copy.title"),
        message: `${ t("utils.toast.copy.message",{ content: props.content }) }`,
        type: EToastType.Info
    });
};

</script>

<style scoped lang="css">
.copier {
    cursor: cell;
}
</style>
