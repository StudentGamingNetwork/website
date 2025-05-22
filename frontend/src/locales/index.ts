import { createI18n } from "vue-i18n";
import { useStorage } from "@vueuse/core";

function loadLocaleMessages() {
    const locales = import.meta.glob("./*/**/*.json", { eager: true });

    const messages = {};

    Object.keys(locales).forEach((key) => {
        
        const matched = key.match(/\.\/([^/]+)\/(.+)\.json$/);
        if (matched) {
            const locale = matched[1]; // Extrait la locale (ex: "fr")
            const namespace = matched[2]; // Extrait le chemin complet après la locale (ex: "components/template")


            if (!messages[locale]) {
                messages[locale] = {};
            }

            const content = locales[key]?.default || locales[key];
            if (content) {
                // Utilisation du namespace pour structurer les messages
                const keys = namespace.split("/");
                let ref = messages[locale];

                keys.forEach((part, index) => {
                    if (!ref[part]) {
                        ref[part] = index === keys.length - 1 ? content : {};
                    }
                    ref = ref[part];
                });
            }
        }

    });
    return messages;
}



const locale = useStorage("locale", "fr", localStorage);

const i18n = createI18n({
    fallbackLocale: "fr",
    legacy: false,
    locale: locale.value,
    messages: loadLocaleMessages()
});


export const langs = [
    { label: "FR", value: "fr" },
    { label: "EN", value: "en" }
];

export default i18n;
