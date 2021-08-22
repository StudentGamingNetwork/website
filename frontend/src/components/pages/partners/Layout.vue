<template>
    <SPageHead
        :background="BackgroundPartners"
        title="Partenaires"
    >
        Nous échangeons notre expertise pour l'organisation d'événements esportifs et la promotion auprès des étudiants avec de nombreuses entités.
        Nous sommes heureux de compter sur leur soutien et leurs compétences.
    </SPageHead>
    <SBaseLayout>
        <div class="partners-layout">
            <div class="partners-list">
                <SPartner
                    v-for="(partner, index) in partners"
                    :key="partner._id"
                    :mirrored="index % 2"
                    :model-value="partner"
                    @update="updatePartners"
                />
            </div>
            <SButton
                v-if="userStore.hasPartnersRight"
                outlined
                @click="addPartner"
            >
                Ajouter un nouveau partenaire
            </SButton>
        </div>
    </SBaseLayout>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import SPartner from "@/components/pages/partners/Partner.vue";
import BackgroundPartners from "@/assets/images/backgrounds/partners.png";
import SPageHead from "@/components/template/PageHead.vue";
import SBaseLayout from "@/components/pages/BaseLayout.vue";
import SButton from "@/components/design/forms/Button.vue";
import { Partner, Toast, User } from "@/modules";
import * as PartnerService from "@/services/partner";

export default defineComponent({
    name: "SPartnersLayout",
    components: { SBaseLayout, SButton, SPageHead, SPartner },
    async setup() {
        const userStore = User.useStore();
        const partners = ref<Array<Partner.TPartner>>([]);

        await updatePartners();

        async function updatePartners() {
            partners.value = await PartnerService.list();
        }

        async function addPartner() {
            const response = await Toast.testRequest(async () => {
                return await PartnerService.create();
            });

            if (response?.success) {
                await updatePartners();
            }
        }

        return {
            addPartner,
            BackgroundPartners,
            partners,
            updatePartners,
            userStore
        };
    }
});
</script>

<style scoped lang="scss">
.partners-layout {
    padding: 64px 0;

    @media (max-width: 1099px) {
        padding: 0;
    }

    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: var(--length-gap-xxl);

    .partners-list {
        width: 1024px;
        max-width: 100%;
        display: flex;
        flex-direction: column;
        gap: 160px;

        @media (max-width: 1099px) {
            gap: 64px;
        }
    }
}
</style>
