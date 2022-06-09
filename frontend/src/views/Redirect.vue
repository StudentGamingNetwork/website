<template>
    <SHeader />
    <div class="redirect">
        Redirection en cours...
        <a :href="link">{{ link }}</a>
    </div>
    <SFooter />
</template>

<script lang="ts">
export default {
    name: "Redirect"
};
</script>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import SHeader from "@/components/template/Header.vue";
import SFooter from "@/components/template/Footer.vue";

const router = useRouter();

const redirections: Record<string, string> = {
    "acll": "https://www.helloasso.com/associations/aux-captifs-la-liberation/formulaires/4"
};

const page = ref(router.currentRoute.value.params.page as string);
const link = computed(() => redirections[page.value] || "https://sgnw.fr");

window.location = link.value;

</script>

<style scoped lang="scss">
.redirect {
    height: 320px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    a {
        color: var(--color-primary);
    }
}
</style>
