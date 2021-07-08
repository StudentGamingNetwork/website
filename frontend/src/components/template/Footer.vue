<template>
    <div class="container-footer">
        <img
            src="../../assets/images/sgn/logo.svg"
        >
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
            <fa :icon="['fab','facebook']" />
            <fa :icon="['fab','linkedin']" />
            <fa :icon="['fab','steam']" />
            <fa :icon="['fab','instagram']" />
            <fa :icon="['fab','discord']" />
            <fa :icon="['fab','twitch']" />
            <fa :icon="['fab','twitter']" />
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
fa{
  font-size: 20px;
}
ul{
  list-style: none;
}
.container-footer{
  background-color: var(--color-content);
  color: white;
  bottom: 0;
  position: absolute;
  display: flex;
  justify-content: space-around;
  width: 100%;
  align-items: center;
}
.network{
  display: flex;
  font-size: 2.5rem;
  align-items: center;
  width: 24vw;
  justify-content: space-around;
}
img{
  width: 10%;
}
li{
  cursor: pointer;
  &:hover{
    text-decoration: underline;
  }
}
/* tablette paysage */
@media screen and (max-width: 1280px) {
  .container {

  }
}

/* smartphone paysage */
@media screen and (max-width: 960px) {
  .container {

  }
}
/* smartphone portrait */
@media screen and (max-width: 480px) {
.container-footer{
  display: flex;
  flex-direction: column;
  width: 100%;
}
  .network{
    width: 80%;
  }
  img{
    width: 20%;
  }
  li{
    padding: 0px;
  }
  ul{
    padding: 0px;
  }
}
</style>
