<template>
    <SModal
        :active="stateStore.modal === 'ownership'"
        @close="stateStore.modalOpen('settings')"
    >
        <SModalContent class="profil">
            <span class="title">
                Entrez l'adresse mail de la personne à qui vous souhaitez transférer la propriété de l'association :
            </span>
            <div class="roles">
                <SInput
                    v-model="input"
                    autocomplete="true"
                    label="Nouveau propriétaire"
                    type="text"
                />
                <SButton
                    class="button"
                    outlined
                    @click="transferOwnershipAssociation()"
                >
                    Confirmer
                </SButton>
            </div>
        </SModalContent>
    </SModal>
</template>


<script setup lang="ts">


import { ref } from "vue";
import SModal from "@/components/design/modal/Modal.vue";
import { Association, State } from "@/modules";
import SModalContent from "@/components/design/modal/Content.vue";
import SInput from "@/components/design/forms/Input.vue";
import SButton from "@/components/design/forms/Button.vue";


const associationStore = Association.useStore();
const stateStore = State.useStore();

const input = ref();

async function transferOwnershipAssociation() {    
    if (confirm("Êtes-vous sûr de vouloir céder l'association ?")) {
        await associationStore.transferOwnership(input.value);
        stateStore.modalOpen("settings");
    }
}
    
</script>

<style scoped lang="scss">
.profil {
    width: min(720px, 100vw);
    height: fit-content;
    display: flex;  
       

    .button:hover {
        background-color: var(--color-background-2);
        color: var(--color-content);
    }

    .roles {
        display: flex;
        flex-direction: row;
        gap: 20px;
        flex-wrap: wrap;  
        align-items: flex-end;
    }
}
</style>
