import i18n from "@/locales";

export type InputValidator = {
    execute: (value: string) => boolean;
    message: string;
}

export function NotEmpty(): InputValidator {
    return {
        execute(value: string) {
            return value.trim().length > 0;
        },
        message: i18n.global.t("utils.validators.notEmpty")
    };
}

export function Slug(): InputValidator {
    return {
        execute(value: string) {
            const charRegex = /^[A-Za-z0-9-_]+$/;
            return charRegex.test(value);
        },
        message: i18n.global.t("utils.validators.slug")
    };
}

export function OnlyLettersAndNumbers(): InputValidator {
    return {
        execute(value: string) {
            const charRegex = /^[A-Za-z0-9]+$/;
            return charRegex.test(value);
        },
        message: i18n.global.t("utils.validators.onlyLettersAndNumbers")
    };
}

export function OnlyLettersAndDashes(): InputValidator {
    return {
        execute(value: string) {
            const charRegex = /^[A-Za-z-]+$/;
            return charRegex.test(value);
        },
        message: i18n.global.t("utils.validators.onlyLettersAndDashes")
    };
}

export function Length({ max, min }: {max: number; min: number}): InputValidator {
    return {
        execute(value: string) {
            return value.length >= min && value.length <= max;
        },
        message: i18n.global.t("utils.validators.length", {
            max,
            min
        })
    };
}

export function Mail(): InputValidator {
    return {
        execute(value: string) {
            const mailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
            return mailRegex.test(value);
        },
        message: i18n.global.t("utils.validators.mail")
    };
}

export function Url(): InputValidator {
    return {
        execute(value: string) {
            const urlRegex = /^(https?:\/\/)?.+\..+$/;
            return urlRegex.test(value);
        },
        message: i18n.global.t("utils.validators.url")
    };
}

export function Discord(): InputValidator {
    return {
        execute(value: string) {
            const discordRegex = /^[A-Za-z0-9._]+$/;
            return discordRegex.test(value) && value.length >= 2 && value.length <= 32;
        },
        message: i18n.global.t("utils.validators.discord")
    };
}
