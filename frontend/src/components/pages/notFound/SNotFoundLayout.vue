<template>
    <div class="not-found">
        <SPageTitle>
            {{ $t("components.pages.notFound.title") }}
        </SPageTitle>
        <SPageDescription>
            <strong>{{ $t("components.pages.notFound.lost1") }}</strong> {{ $t("components.pages.notFound.lost2") }}<br>
            <em><sub>J{{ $t("components.pages.notFound.lost3") }}</sub></em>
        </SPageDescription>
        <div class="cta">
            <SButton
                primary
                @click="$router.push('/')"
            >
                {{ $t("components.pages.notFound.return") }}
            </SButton>
        </div>
    </div>
</template>

<script lang="ts" setup>

import notFoundBackground from "@/assets/images/backgrounds/not-found.png";
import SPageTitle from "@/components/template/SPageTitle.vue";
import SPageDescription from "@/components/template/SPageDescription.vue";
import SButton from "@/components/design/forms/SButton.vue";


const backgroundImage = `url(${ notFoundBackground })`;

</script>

<style scoped lang="scss">
.not-found {
    padding: 128px;
    background-image: v-bind(backgroundImage);
    background-size: cover;
    background-position: 50% 50%;
    min-height: 640px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: var(--length-gap-xl);

    .cta {
        display: flex;
        gap: var(--length-gap-l);
    }
}
</style>
