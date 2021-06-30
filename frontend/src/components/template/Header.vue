<template>
    <div id="header-container">
        <img src="src/static/images/logo.png">
        <ul class="links">
            <li>
                <main-link title="Fédération" />
            </li>
            <li>
                <main-link title="Tournois" />
            </li>
            <li>
                <main-link title="Associations" />
            </li>
        </ul>
        <div class="profil">
            <main-button title="Connexion" />
            <main-button title="Inscription" />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MainButton from "@/components/MainButton.vue";
import MainLink from "@/components/MainLink.vue";


export default defineComponent({
    name: "SHeader",
    components: { MainLink, MainButton }
});
</script>

<style scoped lang="scss">

#header-container{
  display: flex;
  color: #fe8e25;
  justify-content: space-around;
  background-color: hsl(170,50,95);
}
.links{
  display: flex;
  justify-content: space-around;
  align-items: center;
  list-style: none;
  padding-left: 0;
  font-size: 1rem;
  font-weight: 600;

  li{
    padding: 8px 16px;
    cursor: pointer;
    &:hover{
      text-decoration: underline;
    }
  }
}
.nom{
  padding-left: 10vw;
  font-size: large;
}
.nom:hover{
  text-decoration: underline;
}
.profil{
  display: flex;
  gap: 24px;
  align-items: center;
}
</style>
