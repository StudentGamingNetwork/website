<template>
    <div id="header-container">
        <img src="src/static/images/logo.png">
        <ul class="links">
            <li>
                Fédération
            </li>
            <li>
                Tournois
            </li>
            <li>
                Associations
            </li>
        </ul>
        <div class="profil">
            <button>Connexion</button>
            <button> Inscription</button>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { NButton } from "naive-ui";


export default defineComponent({
    name: "SHeader"
});
</script>

<style scoped lang="scss">
#header-container{
  display: flex;
  color: #fe8e25;
  justify-content: space-around;
}
.links{
  display: flex;
  justify-content: space-around;
  align-items: center;
  list-style: none;
  padding-left: 0;

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
  gap: 16px;
  align-items: center;
  button{
    height: 32px;
  }
}
</style>
