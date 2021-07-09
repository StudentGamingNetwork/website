<template>
    <div
        class="page-head"
        :style="headStyle"
    >
        <SPageTitle class="title">
            {{ title }}
        </SPageTitle>
        <div class="description">
            <slot />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SPageTitle from "@/components/template/PageTitle.vue";

export default defineComponent({
    name: "SPageHead",
    components: { SPageTitle },
    props: {
        title: {
            required: true,
            type: String
        },
        background: {
            required: true,
            type: String
        }
    },
    setup(props) {
        return {
            headStyle: {
                backgroundImage: `url(${ props.background })`
            }
        };
    }
});
</script>

<style scoped lang="scss">
.page-head {
    height: 320px;
    padding: 64px 128px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: var(--length-gap-xl);
}

.description {
    font-size: 1.2rem;
    opacity: 0.75;
    max-width: 800px;
    text-shadow: 0 4px 4px var(--color-background-0);

    strong {
        font-weight: 600;
    }
}
</style>
