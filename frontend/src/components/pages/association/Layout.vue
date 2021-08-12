<template>
    <SPageHead
        :background="BackgroundAssociation"
        :title="association.name"
    >
        <strong>{{ association.name }}</strong> est l'association gaming étudiante de <strong>{{ association.school?.name }}</strong>.<br>
        Elle fait partie de la région "<strong>{{ region }}</strong>".<br>
        <template v-if="isUserMember">
            <sub><em>Vous êtes actuellement membre de cette association.</em></sub>
        </template>
        <template v-else>
            <sub><em>Pour rejoindre cette association, demandez le lien d'invitation à son référant.</em></sub>
        </template>
    </SPageHead>
    <SBaseLayout>
        <div class="association-layout">
            <SAssociationCard :association="association" />
            <div
                v-if="association.users?.members"
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

<script lang="ts">
import { computed, defineComponent, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import SAssociationCard from "@/components/pages/association/AssociationCard.vue";
import BackgroundAssociation from "@/assets/images/backgrounds/association.png";
import SPageHead from "@/components/template/PageHead.vue";
import SBaseLayout from "@/components/pages/BaseLayout.vue";
import * as AssociationService from "@/services/association";
import { Association } from "@/modules";
import SCard from "@/components/design/Card.vue";
import SUserCard from "@/components/pages/association/UserCard.vue";

export default defineComponent({
    name: "SAssociationLayout",
    components: { FontAwesomeIcon, SAssociationCard, SBaseLayout, SCard, SPageHead, SUserCard },
    async setup() {
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

        return {
            association,
            BackgroundAssociation,
            isUserMember,
            region
        };
    }
});
</script>

<style scoped lang="scss">
.association-layout {
    .members {
        margin-top: var(--length-margin-l);
        display: grid;
        gap: var(--length-gap-xl);
        width: 100%;
        grid-template-columns: repeat(auto-fill, 256px);
        justify-content: center;
    }
}
</style>
