<template>
    <SCard class="association-card">
        <img
            v-if="association.logo"
            alt="association logo"
            class="logo"
            :src="logoUrl"
        >
        <div
            v-else
            class="empty-logo"
        >
            <FontAwesomeIcon
                class="icon"
                :icon="['fas', 'users']"
            />
        </div>
        <div class="head">
            <span
                v-if="association.tag"
                class="tag"
            >{{ association.tag }}</span>
            <h2>{{ association.name }}</h2>
        </div>
        <div class="school">
            <ul>
                <li>
                    <FontAwesomeIcon
                        class="icon"
                        :icon="['fas', 'school']"
                    /> {{ association.school.name }}
                </li>
                <li>
                    <FontAwesomeIcon
                        class="icon"
                        :icon="['fas', 'map-marker']"
                    /> {{ association.school.address }}
                </li>
                <li>
                    <FontAwesomeIcon
                        class="icon"
                        :icon="['fas', 'user-graduate']"
                    /> {{ association.school.studentsNumber }} étudiants
                </li>
            </ul>
        </div>
        <div
            v-if="association.users?.owner"
            class="owner"
        >
            <ul>
                <li>
                    <FontAwesomeIcon
                        class="icon"
                        :icon="['fas', 'user']"
                    /> {{ association.users.owner.name }}
                </li>
                <li>
                    <FontAwesomeIcon
                        class="icon"
                        :icon="['fas', 'envelope']"
                    /> {{ association.users.owner.mail }}
                </li>
                <li v-if="association.users.owner.platforms?.discord">
                    <FontAwesomeIcon
                        class="icon"
                        :icon="['fab', 'discord']"
                    /> {{ association.users.owner.platforms.discord }}
                </li>
            </ul>
        </div>
    </SCard>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { Association } from "@/modules";
import * as AssociationService from "@/services/association";
import SCard from "@/components/design/Card.vue";

export default defineComponent({
    name: "SAssociationCard",
    components: { FontAwesomeIcon, SCard },
    props: {
        association: {
            required: true,
            type: Object as PropType<Association.TAssociation>
        }
    },
    setup(props) {
        const logoUrl = computed(() => {
            return AssociationService.getLogoUrl({ id: props.association._id, logo: props.association.logo });
        });

        return {
            logoUrl
        };
    }
});
</script>

<style scoped lang="scss">
.association-card {
    max-width: 960px;
    margin: auto;
    display: grid;
    column-gap: var(--length-gap-l);
    grid-template-columns: 192px 1fr 1fr;
    grid-template-areas:
        "logo head head"
        "logo school owner";

    .logo {
        grid-area: logo;
        width: 192px;
        height: 192px;
        object-fit: contain;
    }

    .empty-logo {
        grid-area: logo;
        width: 192px;
        height: 192px;
        display: flex;
        align-items: center;
        justify-content: center;

        .icon {
            color: var(--color-content-litest);
            width: 96px;
            height: 96px;
        }
    }

    .head {
        grid-area: head;
        display: inline-flex;
        align-items: center;
        gap: var(--length-gap-s);
        padding: var(--length-padding-m) 0;

        h2 {
            font-size: 2rem;
            font-weight: 600;
            margin: 0;
            padding: 0;

            background: var(--gradient);
            display: inline-block;
            color: transparent;
            -webkit-background-clip: text;
            text-shadow: 0 0 16px var(--color-primary-lite);
        }

        .tag {
            font-size: 1.5rem;
            font-weight: 600;

            &::before {
                content: "["
            }
            &::after {
                content: "]"
            }
        }
    }

    .school {
        grid-area: school;
    }

    .owner {
        grid-area: owner;
    }

    .school ul, .owner ul {
        margin: 0;
        padding: 0;

        li {
            list-style: none;
            color: var(--color-content-softer);

            .icon {
                width: 16px;
                height: 16px;
            }

            .copier:hover {
                color: var(--color-primary-lite);
            }
        }
    }
}
</style>
