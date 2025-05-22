<template>
    <div
        class="partner"
        :class="{mirrored, private: !partner.public}"
    >
        <img
            v-if="partner.logo"
            :alt="partner.name"
            class="logo"
            :src="logoUrl"
        >
        <div
            v-else
            class="empty-logo"
        >
            <FontAwesomeIcon
                class="icon"
                :icon="['fas', 'globe']"
            />
        </div>
        <div class="description">
            <div class="title">
                <SSectionTitle>
                    {{ partner.name }}
                </SSectionTitle>
                <FontAwesomeIcon
                    v-if="userStore.hasPartnersRight"
                    class="edit"
                    :icon="['fas', 'edit']"
                    title="Modifier"
                    @click="editPartner"
                />
            </div>
            <p>
                {{ partner.description }}
            </p>
            <div class="networks">
                <a
                    v-if="partner.networks.website"
                    :href="partner.networks.website"
                    target="_blank"
                >
                    <FontAwesomeIcon
                        class="network"
                        :icon="['fas','globe']"
                        title="Site internet"
                    />
                </a>

                <a
                    v-if="partner.networks.facebook"
                    :href="partner.networks.facebook"
                    target="_blank"
                >
                    <FontAwesomeIcon
                        class="network"
                        :icon="['fab','facebook']"
                        title="Facebook"
                    />
                </a>

                <a
                    v-if="partner.networks.twitter"
                    :href="partner.networks.twitter"
                    target="_blank"
                >
                    <FontAwesomeIcon
                        class="network"
                        :icon="['fab','twitter']"
                        title="Twitter"
                    />
                </a>
            </div>
        </div>
        <SCard
            v-if="isEditing"
            class="edit-card"
        >
            <div class="head">
                <SAvatarPicker
                    title="Logo"
                    :url="logoUrl"
                    @file-change="uploadLogo"
                />
                <SInput
                    v-model="partner.name"
                    :modified="partner.name !== modelValue.name"
                    title="Nom du partenaire"
                    @enter="updatePartner"
                />
                <SButton
                    outlined
                    @click="togglePublic"
                >
                    {{ partner.public ? i18n.global.t("components.pages.partners.hide") : i18n.global.t("components.pages.partners.show") }}
                </SButton>
                <SButton
                    danger
                    outlined
                    @click="deletePartner"
                >
                    {{ i18n.global.t("components.pages.partners.delete") }}
                </SButton>
            </div>
            <STextarea
                v-model="partner.description"
                class="textarea"
                :modified="partner.description !== modelValue.description"
                title="Description"
            />
            <div
                v-if="partner.networks"
                class="networks"
            >
                <SInput
                    v-model="partner.networks.website"
                    class="network"
                    :modified="partner.networks.website !== modelValue.networks?.website"
                    :title="$t('components.pages.partners.website')"
                    @enter="updatePartner"
                />
                <SInput
                    v-model="partner.networks.facebook"
                    class="network"
                    :modified="partner.networks.facebook !== modelValue.networks?.facebook"
                    title="Facebook"
                    @enter="updatePartner"
                />
                <SInput
                    v-model="partner.networks.twitter"
                    class="network"
                    :modified="partner.networks.twitter !== modelValue.networks?.twitter"
                    title="Twitter"
                    @enter="updatePartner"
                />
            </div>
            <SButton
                class="button"
                :disabled="!hasChanged"
                primary
                @click="updatePartner"
            >
                {{ $t("components.pages.partners.save") }}
            </SButton>
        </SCard>
    </div>
</template>

<script lang="ts" setup>
import { computed, reactive, ref, watch } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { isMatch, merge } from "lodash";
import SSectionTitle from "@/components/design/SSectionTitle.vue";
import { Partner, Toast, User } from "@/modules";
import SCard from "@/components/design/SCard.vue";
import SAvatarPicker from "@/components/design/forms/SAvatarPicker.vue";
import SInput from "@/components/design/forms/SInput.vue";
import STextarea from "@/components/design/forms/STextarea.vue";
import SButton from "@/components/design/forms/SButton.vue";
import * as PartnerService from "@/services/partner";
import i18n from "@/locales";

const props = defineProps<{
    mirrored: boolean;
    modelValue: Partner.TPartner;
}>();


const emit = defineEmits(["update"]);
    
const userStore = User.useStore();
const isEditing = ref(false);

const partner = reactive(Partner.makeObject({}));

watch(
    () => props.modelValue,
    async () => {
        merge(partner, props.modelValue);
    }, { deep: true, immediate: true });

async function deletePartner() {
    if (!confirm(`${ i18n.global.t("components.pages.partners.confirm") } "${ partner.name }" ?`)) {
        return;
    }

    const response = await Toast.testRequest(async () => {
        return await PartnerService.remove(partner._id);
    });

    if (response?.success) {
        emit("update");
    }
}

function editPartner() {
    isEditing.value = true;
}

const hasChanged = computed(() => {
    return !isMatch(props.modelValue, partner);
});

const logoUrl = computed(() => {
    if (!partner.logo) {
        return "";
    }

    return PartnerService.getLogoUrl({ id: partner._id, logo: partner.logo });
});

async function uploadLogo (file: File) {
    const response = await Toast.testRequest(async () => {
        return await PartnerService.uploadLogo({ file }, partner._id);
    });

    if (response?.success) {
        partner.logo = response.logo;
    }
}

async function togglePublic() {
    partner.public = !partner.public;
    await updatePartner();
}

async function updatePartner() {
    const response = await Toast.testRequest(async () => {
        return await PartnerService.update(partner);
    });

    if (response?.success) {
        emit("update");
    }
}

</script>

<style scoped lang="scss">
.partner {
    padding: var(--length-padding-m);
    border-radius: var(--lenght-radius-base);
    display: grid;
    column-gap: 96px;
    row-gap: var(--length-gap-m);
    grid-template-columns: 256px 1fr;
    grid-template-areas:
        "logo description"
        "edit edit";

    &.private {
        background: repeating-linear-gradient(
                -45deg,
                var(--color-background-0),
                var(--color-background-0) 32px,
                var(--color-background-1) 32px,
                var(--color-background-1) 64px
        );
    }

    @media (max-width: 1099px) {
        flex-direction: column;
        gap: var(--length-gap-xl);
        align-items: center;
    }

    &.mirrored {
        grid-template-columns: 1fr 256px;
        grid-template-areas:
        "description logo"
        "edit edit";

        @media (max-width: 1099px) {
            flex-direction: column;
        }
    }

    .logo {
        height: 128px;
        width: 256px;
        object-fit: contain;
        grid-area: logo;

        @media (max-width: 1099px) {
            height: 64px;
            width: 128px;
        }
    }

    .empty-logo {
        height: 128px;
        width: 256px;
        display: flex;
        align-items: center;
        justify-content: center;

        .icon {
            color: var(--color-content-litest);
            width: 96px;
            height: 96px;
        }
    }

    .title {
        display: flex;
        align-items: center;
        gap: var(--length-gap-s);

        .edit {
            opacity: 0;
            width: 24px;
            height: 24px;
            cursor: pointer;

            &:hover {
                opacity: 1;
            }
        }
    }

    .description {
        grid-area: description;

        .networks {
            font-size: 1.2rem;
            display: flex;
            gap: var(--length-gap-m);

            .network {
                opacity: 0.5;
                cursor: pointer;

                &:hover {
                    opacity: 1;
                }
            }
        }
    }

    .edit-card {
        grid-area: edit;
        padding: var(--length-padding-m);
        display: flex;
        flex-direction: column;
        gap: var(--length-gap-m);
        align-items: flex-start;

        .head {
            display: flex;
            gap: var(--length-gap-m);
            align-items: flex-end;
        }

        .textarea {
            width: 100%;
        }

        .networks {
            width: 100%;
            display: flex;
            gap: var(--length-gap-m);

            .network {
                flex-shrink: 1;
                flex-grow: 1;
                flex-basis: 1px;
                min-width: 0;
            }
        }
    }

    &:hover {
        .edit {
            opacity: 0.5;
        }
    }
}
</style>
