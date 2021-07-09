<template>
    <footer>
        <SLogo
            class="logo"
            white
        />
        <div>
            <ul>
                <li>FAQ</li>
                <li>Contact</li>
                <li>Recrutement</li>
                <li>Galeries</li>
            </ul>
        </div>
        <div>
            <ul>
                <li>Shadow </li>
                <li>Starxium</li>
                <li>GameWaves</li>
                <li>En Voiture Simone</li>
            </ul>
        </div>
        <div class="network">
            <FontAwesomeIcon :icon="['fab','facebook']" />
            <FontAwesomeIcon :icon="['fab','linkedin']" />
            <FontAwesomeIcon :icon="['fab','steam']" />
            <FontAwesomeIcon :icon="['fab','instagram']" />
            <FontAwesomeIcon :icon="['fab','discord']" />
            <FontAwesomeIcon :icon="['fab','twitch']" />
            <FontAwesomeIcon :icon="['fab','twitter']" />
        </div>
    </footer>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import SLogo from "@/components/template/Logo.vue";

export default defineComponent({
    name: "SFooter",
    components: {
        FontAwesomeIcon,
        SLogo
    }
});
</script>

<style scoped lang="scss">
footer {
    background: var(--color-background-1);
}
</style>
