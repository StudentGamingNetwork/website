<template>
    <SPageHead
        :background="BackgroundPartners"
        :title="$t('components.pages.partners.title')"
    >
        {{ $t('components.pages.partners.head') }}
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
                {{ $t('components.pages.partners.add') }}
            </SButton>
        </div>
    </SBaseLayout>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import SPartner from "@/components/pages/partners/SPartner.vue";
import BackgroundPartners from "@/assets/images/backgrounds/partners.png";
import SPageHead from "@/components/template/SPageHead.vue";
import SBaseLayout from "@/components/pages/SBaseLayout.vue";
import SButton from "@/components/design/forms/SButton.vue";
import { Partner, Toast, User } from "@/modules";
import * as PartnerService from "@/services/partner";

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


</script>

<style scoped lang="css">
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
