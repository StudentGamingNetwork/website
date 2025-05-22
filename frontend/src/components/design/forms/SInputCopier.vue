<template>
    <div class="input-copier">
        <div class="title">
            {{ title }}
        </div>
        <div
            class="content"
            :title="$t('components.design.form.copy')"
            @click="copyIntoClipboard"
        >
            <span class="text">{{ content }}</span><FontAwesomeIcon
                class="icon"
                :icon="['fas', 'copy']"
            />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { useI18n } from "vue-i18n";
import { Toast } from "@/modules";
import { EToastType } from "@/modules/toast/store";

const props = defineProps<{title: string, content: string}>();

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

<style scoped lang="scss">
.input-copier {
    position: relative;margin-top: 22px;

    .content {
        height: 36px;
        border-radius: var(--lenght-radius-base);
        border: 2px solid var(--color-content-softer);
        font-weight: 200;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 0;
        box-sizing: border-box;
        width: 320px;
        max-width: 100%;
        gap: var(--length-gap-s);
        padding: calc(var(--length-padding-xs) - 2px) calc(var(--length-padding-m) - 2px);
        background: repeating-linear-gradient(
                -45deg,
                var(--color-background-2),
                var(--color-background-2) 16px,
                var(--color-background-1) 16px,
                var(--color-background-1) 32px
        );
        cursor: cell;
        color: var(--color-content-soft);

        .text {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .icon {
            color: var(--color-content-softer);
        }

        &:hover {
            color: var(--color-content);

            .icon {
                color: var(--color-content-soft);
            }
        }
    }

    .title {
        top: -34px;
        left: 0;
        font-size: 0.8rem;
        position: absolute;
        opacity: 0.5;
        height: 100%;
        display: flex;
        justify-items: center;
        align-items: center;
        pointer-events: none;
        font-weight: 600;
        transition: top var(--duration-fast),
        left var(--duration-fast),
        font-size var(--duration-fast),
        opacity var(--duration-fast);
    }
}
</style>
