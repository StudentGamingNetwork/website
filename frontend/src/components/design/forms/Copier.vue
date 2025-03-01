<template>
    <span
        class="copier"
        :title="$t('components.design.forms.copy')"
        @click="copyIntoClipboard"
    >
        <slot />
    </span>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Toast } from "@/modules";
import { EToastType } from "@/modules/toast/store";
import { useI18n } from 'vue-i18n'


export default defineComponent({
    name: "SCopier",
    props: {
        content: {
            required: true,
            type: String
        }
    },
    setup(props) {
        const { t } = useI18n() 
        const toastStore = Toast.useStore();

        const copyIntoClipboard = async () => {
            await navigator.clipboard.writeText(props.content);
            toastStore.add({
                title: t("module.toast.copy.title"),
                message: `${ t("module.toast.copy.message",{content: props.content}) }`,
                type: EToastType.Info
            });
        };

        return {
            copyIntoClipboard
        };
    }
});
</script>

<style scoped lang="scss">
.copier {
    cursor: cell;
}
</style>
