<template>
    <div class="container-footer">
        <div class="reseau">
            Nos réseaux
            <ul>
                <li><fa :icon="['fab','facebook',]" /> </li>
                <li><fa :icon="['fab','linkedin']" /></li>
                <li><fa :icon="['fab','steam']" /></li>
                <li><fa :icon="['fab','instagram']" /></li>
                <li><fa :icon="['fab','discord']" /></li>
                <li><fa :icon="['fab','twitch']" /></li>
                <li><fa :icon="['fab','twitter']" /></li>
            </ul>
        </div>
        <div>
            Nos Partenaires
            <ul>
                <li>Shadow </li>
                <li>Starxium</li>
                <li>GameWaves</li>
                <li>En Voiture Simone</li>
            </ul>
        </div>
        <div>
            A propos
            <ul>
                <li>FAQ</li>
                <li>Contact</li>
                <li>Recrutement</li>
                <li>Galeries</li>
            </ul>
        </div>
    </div>
</template>
 
<script lang="ts">
import { defineComponent } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

export default defineComponent({
    name: "SFooter",
    components: {
        FontAwesomeIcon
    }
});
</script>

<style scoped lang="scss">
.container-footer{
  bottom: 0;
  position: absolute;
  display: flex;
  justify-content: space-around;
  width: 100%;
}
.reseau{
}
</style>
