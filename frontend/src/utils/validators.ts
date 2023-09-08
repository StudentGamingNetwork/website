export type InputValidator = {
    execute: (value: string) => boolean;
    message: string;
}

export function NotEmpty(): InputValidator {
    return {
        execute(value: string) {
            return value.trim().length > 0;
        },
        message: "Ne peut être vide"
    };
}

export function Slug(): InputValidator {
    return {
        execute(value: string) {
            const charRegex = /^[A-Za-z0-9-_]+$/;
            return charRegex.test(value);
        },
        message: "Seulement des lettres, chiffres ou des tirets"
    };
}

export function OnlyLettersAndNumbers(): InputValidator {
    return {
        execute(value: string) {
            const charRegex = /^[A-Za-z0-9]+$/;
            return charRegex.test(value);
        },
        message: "Seulement des lettres ou des chiffres"
    };
}

export function OnlyLettersAndDashes(): InputValidator {
    return {
        execute(value: string) {
            const charRegex = /^[A-Za-z-]+$/;
            return charRegex.test(value);
        },
        message: "Seulement des lettres ou des tirets"
    };
}

export function Length({ max, min }: {max: number; min: number}): InputValidator {
    return {
        execute(value: string) {
            return value.length >= min && value.length <= max;
        },
        message: `Entre ${ max } et ${ min } caractères`
    };
}

export function Mail(): InputValidator {
    return {
        execute(value: string) {
            const mailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
            return mailRegex.test(value);
        },
        message: `Adresse mail valide`
    };
}

export function Url(): InputValidator {
    return {
        execute(value: string) {
            const urlRegex = /^(https?:\/\/)?.+\..+$/;
            return urlRegex.test(value);
        },
        message: "URL valide"
    };
}

export function Discord(): InputValidator {
    return {
        execute(value: string) {
            const discordRegex = /^[A-Za-z0-9._]+$/;
            return discordRegex.test(value) && value.length >= 2 && value.length <= 32;
        },
        message: "Format d'identifiant Discord"
    };
}
