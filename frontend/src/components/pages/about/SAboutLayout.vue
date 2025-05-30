<template>
    <SPageHead
        :background="BackgroundAbout"
        :title="i18n.global.t('components.pages.about.title')"
    >
        {{ $t('components.pages.about.head') }}
    </SPageHead>
    <SBaseLayout>
        <div class="about-layout">
            <SSectionTitle>{{ $t("components.pages.about.section1.title") }}</SSectionTitle>
            <br><br>
            <i18n-t
                keypath="components.pages.about.section1.text1"
                tag="p"
            >
                <template #sgn>
                    <strong>Student Gaming Network</strong>
                </template>
            </i18n-t>
            <p>
                {{ $t("components.pages.about.section1.text2") }}
            </p>
            <ul>
                <li>{{ $t("components.pages.about.section1.text3") }}</li>
                <li>{{ $t("components.pages.about.section1.text4") }}</li>
                <li>{{ $t("components.pages.about.section1.text5") }}</li>
            </ul>

            <br><br>
            <SSectionTitle>{{ $t("components.pages.about.section2.title") }}</SSectionTitle>
            <br><br>
            <i18n-t
                keypath="components.pages.about.section2.text1"
                tag="p"
            >
                <template #sgn>
                    <strong>Student Gaming Network</strong>
                </template>
                <template #job>
                    <a
                        href="https://drive.google.com/drive/folders/1jLqGvmcxbGHl4OZaxnl6YaGxdjFTSBis?usp=sharing"
                        target="_blank"
                    >{{ $t("components.pages.about.section2.job") }}</a>
                </template>
            </i18n-t>
            <i18n-t
                keypath="components.pages.about.section2.text2"
                tag="p"
            >
                <template #form>
                    <a
                        href="https://forms.gle/uD9maAE7gnMiqWbv5"
                        target="_blank"
                    >{{ $t("components.pages.about.section2.form") }}</a>
                </template>
            </i18n-t>
        </div>
    </SBaseLayout>
</template>

<script lang="ts" setup>
import BackgroundAbout from "@/assets/images/backgrounds/about.png";
import SPageHead from "@/components/template/SPageHead.vue";
import SBaseLayout from "@/components/pages/SBaseLayout.vue";
import SSectionTitle from "@/components/design/SSectionTitle.vue";
import i18n from "@/locales";
</script>

<style scoped lang="css">
.about-layout {
    max-width: 960px;
    margin: auto;

    strong {
        font-weight: 600;
    }

    a {
        color: var(--color-primary);
        text-decoration: none;

        &:hover {
            text-decoration: underline;
        }
    }
}
</style>
