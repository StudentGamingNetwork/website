<template>
    <span
        class="copier"
        title="Copier dans le presse-papier"
        @click="copyIntoClipboard"
    >
        <slot />
    </span>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Toast } from "@/modules";
import { EToastType } from "@/modules/toast/store";

export default defineComponent({
    name: "SCopier",
    props: {
        content: {
            required: true,
            type: String
        }
    },
    setup(props) {
        const toastStore = Toast.useStore();

        const copyIntoClipboard = async () => {
            await navigator.clipboard.writeText(props.content);
            toastStore.add({
                title: "Copié",
                message: `"${ props.content }" a été copié dans votre presse-papier.`,
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
