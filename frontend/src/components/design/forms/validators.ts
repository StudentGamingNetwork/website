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

export function OnlyLettersAndNumbers(): InputValidator {
    return {
        execute(value: string) {
            const regexLetters = /^[A-Za-z0-9]+$/;
            return regexLetters.test(value);
        },
        message: "Seulement des lettres ou des chiffres"
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
