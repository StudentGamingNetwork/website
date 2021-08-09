<template>
    <div class="small-dropdown">
        <div
            ref="selector"
            class="selector"
            @click="toggleDeploy"
        >
            <div class="selected">
                {{ options[modelValue] }}
            </div>
            <FontAwesomeIcon
                class="icon"
                :icon="['fas', 'sort']"
            />
        </div>
        <teleport
            v-if="isDeployed"
            to="body"
        >
            <div
                class="options"
                :style="optionsStyle"
            >
                <ul>
                    <li
                        v-for="(name, key) in options"
                        :key="key"
                        :title="name"
                        @click="choose(key)"
                    >
                        {{ name }}
                    </li>
                </ul>
            </div>
        </teleport>
    </div>
</template>

<script lang="ts">
import { ComponentPublicInstance, CSSProperties, defineComponent, PropType, ref } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

export default defineComponent({
    name: "SSmallDropdown",
    components: {
        FontAwesomeIcon
    },
    props: {
        modelValue: {
            required: true,
            type: String
        },
        options: {
            required: true,
            type: Object as PropType<Record<string, string>>
        }
    },
    emits: ["update:modelValue"],
    setup(props, context) {
        const isDeployed = ref(false);
        const selector = ref<ComponentPublicInstance<HTMLInputElement>>(null);
        const optionsStyle = ref<CSSProperties>({});

        const deploy = () => {
            isDeployed.value = true;
            const bounding = selector.value.getBoundingClientRect();
            optionsStyle.value.top = `${ bounding.bottom + window.scrollY }px`;
            optionsStyle.value.left = `${ bounding.left }px`;
            optionsStyle.value.width = `${ bounding.width }px`;
        };

        const retract = () => {
            isDeployed.value = false;
        };

        const toggleDeploy = () => {
            if (isDeployed.value) {
                retract();
            }
            else {
                deploy();
            }
        };

        const choose = (value: string) => {
            context.emit("update:modelValue", value);
            retract();
        };

        return {
            choose,
            isDeployed,
            optionsStyle,
            selector,
            toggleDeploy
        };
    }
});
</script>

<style scoped lang="scss">
.small-dropdown {
    cursor: pointer;
    position: relative;

    .selector {
        padding: 0 var(--length-padding-xs);
        border-radius: var(--lenght-radius-s);
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: var(--length-gap-s);

        .selected {
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
            min-width: 0;
        }

        .icon {
            color: var(--color-content-litest);
        }
    }

    &:hover .selector {
        background: var(--color-background-2);

        .icon {
            color: var(--color-content-liter);
        }
    }
}

.options {
    position: absolute;
    font-size: 0.9rem;
    background: var(--color-background-0);
    border-radius: var(--lenght-radius-s);
    border: 2px solid var(--color-background-2);
    box-sizing: border-box;
    overflow: hidden;

    ul {
        margin: 0;
        padding: 0;

        li {
            list-style: none;
            padding: 0 calc(var(--length-padding-xs) - 2px);
            color: var(--color-content-soft);
            cursor: pointer;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;

            &:hover {
                color: var(--color-content);
                background: var(--color-background-1);
            }
        }
    }
}

</style>
