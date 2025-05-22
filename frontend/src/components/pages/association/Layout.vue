<template>
    <SPageHead
        :background="BackgroundAssociation"
        :title="association.name"
    >
        <strong>{{ association.name }}</strong> {{ $t("components.pages.association.name") }}
        <strong>{{ association.school?.name }}</strong>.<br>
        {{ $t("components.pages.association.region") }}"<strong>{{ region }}</strong>".<br>
        <template v-if="isUserMember">
            <sub><em>{{ $t("components.pages.association.isMember") }}</em></sub>
        </template>
        <template v-else-if="associationStore._id">
            <sub><em>{{ $t("components.pages.association.otherAssociation") }}</em></sub>
        </template>
        <template v-else>
            <SButton
                class="head-button"
                outlined
                @click="joinAssociation"
            >
                {{ $t("components.pages.association.join") }}
            </SButton>
        </template>
    </SPageHead>
    <SBaseLayout>
        <div class="association-layout">
            <SAssociationCard :association="association" />
            <div
                v-if="associationStore._id && association.users?.members"
                class="members"
            >
                <SUserCard
                    v-for="member of association.users.members"
                    :key="member._id"
                    :user="member"
                />
            </div>
        </div>
    </SBaseLayout>
</template>

<script lang="ts" setup>
import { computed, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import SAssociationCard from "@/components/pages/association/SAssociationCard.vue";
import BackgroundAssociation from "@/assets/images/backgrounds/association.png";
import SPageHead from "@/components/template/SPageHead.vue";
import SBaseLayout from "@/components/pages/SBaseLayout.vue";
import * as AssociationService from "@/services/association";
import { Association } from "@/modules";
import SUserCard from "@/components/pages/association/SUserCard.vue";
import SButton from "@/components/design/forms/SButton.vue";
import i18n from "@/locales";


const router = useRouter();
const slug = router.currentRoute.value.params.slug as string;

const associationStore = Association.useStore();

const association = ref<Association.TAssociation>({});
const region = ref("");

association.value = reactive(await AssociationService.get(slug));
region.value = AssociationService.getRegionName(association.value.federation.region);

const isUserMember = computed(() => {
    return associationStore._id && associationStore._id === association.value._id;
});

const joinAssociation = async () => {
    const invitationCode = prompt(i18n.global.t("components.pages.association.inviteCode")) as string;

    await associationStore.join(slug, invitationCode);
    association.value = reactive(await AssociationService.get(slug));

};


</script>

<style scoped lang="scss">

.head-button {
    margin-top: var(--length-margin-xs);
}

.association-layout {
    .invitation {
        margin-top: var(--length-margin-s);
        text-align: center;
    }

    .members {
        margin-top: var(--length-margin-m);
        display: grid;
        gap: var(--length-gap-l);
        width: 100%;
        grid-template-columns: repeat(auto-fill, 384px);
        justify-content: center;
    }
}
</style>
