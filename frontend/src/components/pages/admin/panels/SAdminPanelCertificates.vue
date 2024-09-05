<template>
    <div class="admin-certificates">
        <div
            v-if="isSearching"
            class="loading"
        >
            <FontAwesomeIcon
                class="icon"
                :icon="['fas','spinner']"
                spin
            />
        </div>
        <div
            v-else-if="!user._id"
            class="empty"
        >
            <FontAwesomeIcon
                class="icon"
                :icon="['fas','check']"
            />
            <div class="description">
                Aucun certificat en attente de validation.
            </div>
        </div>
        <template v-else>
            <SAdminUserCard :user="user" />
            <SCard v-if="user.student.certificate">
                <img
                    v-if="certificateType === 'webp'"
                    alt="certificate"
                    class="certificate"
                    :src="certificateUrl"
                >
                <object
                    v-if="certificateType === 'pdf'"
                    class="certificate"
                    :data="certificateUrl"
                    type="application/pdf"
                />
            </SCard>
            <SCard
                v-if="user.student.certificate"
                class="actions"
            >
                <SButton
                    class="button"
                    outlined
                    @click="validate(true)"
                >
                    Valider
                </SButton>
                <SButton
                    class="button"
                    danger
                    outlined
                    @click="validate(false)"
                >
                    Rejeter
                </SButton>
            </SCard>
        </template>
    </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, reactive, ref } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { assign } from "lodash";
import { useRouter } from "vue-router";
import * as AdminService from "@/services/admin";
import { TUser } from "@/modules/user";
import SAdminUserCard from "@/components/pages/admin/panels/SAdminUserCard.vue";
import SCard from "@/components/design/Card.vue";
import * as UserService from "@/services/user";
import SButton from "@/components/design/forms/Button.vue";
import { Toast } from "@/modules";


const isSearching = ref(true);
const user = reactive({} as Partial<TUser>);
const router = useRouter();

onMounted(async () => {
    const userId = router.currentRoute.value.params.id as string;

    if (userId) {
        const userCertificate = await AdminService.userGet({ _id: userId });
        assign(user, userCertificate);
    }
    else {
        const userCertificate = await AdminService.userCertificate({});
        assign(user, userCertificate.user);
    }

    await router.push(`/admin/certificates/${ user._id }`);

    isSearching.value = false;
});

const certificateType = computed(() => {
    const certificate = user.student.certificate;

    if (certificate.endsWith(".webp")) {
        return "webp";
    }

    if (certificate.endsWith(".pdf")) {
        return "pdf";
    }

    return "unknown";
});

const certificateUrl = computed(() => {
    return UserService.getCertificateUrl({ id: user._id, certificate: user.student.certificate });
});

async function validate(validated: boolean) {
    const response = await Toast.testRequest(async () => {
        const status = validated ? "validated" : "rejected";
        return await AdminService.userCertificate({ _id: user._id, status });
    });

    if (response?.success) {
        if (response.user) {
            assign(user, response.user);
        }
        else {
            user._id = "";
        }
        await router.push(`/admin/certificates/${ user._id }`);
    }
}

</script>

<style scoped lang="scss">
.admin-certificates {
    margin-top: var(--length-margin-m);
    display: flex;
    flex-direction: column;
    gap: var(--length-gap-m);

    .empty, .loading {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        gap: var(--length-gap-m);
        margin: var(--length-margin-l) 0;

        .icon {
            width: 64px;
            height: 64px;
            color: var(--color-content-litest);
        }

        .description {
            text-align: center;
            color: var(--color-content-liter);
        }
    }

    .certificate {
        display: block;
        width: 100%;
        object-fit: contain;
        height: 500px;
    }

    .actions {
        padding: var(--length-padding-m);
        display: flex;
        justify-content: space-between;
        gap: var(--length-gap-m);

        .button {
            width: 120px;
        }
    }
}
</style>
