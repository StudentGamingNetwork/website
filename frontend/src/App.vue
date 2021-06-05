<template>
    <SHeader />
    <SPage>
        test SPAGE
    </SPage>
    <SFooter />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SPage from "@/components/template/Page.vue";
import SHeader from "@/components/template/Header.vue";
import SFooter from "@/components/template/Footer.vue";

export default defineComponent({
    name: "App",
    components: {
        SFooter,
        SHeader,
        SPage
    }
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
