export function isMailValid(mail: string): boolean {
    const mailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
    return mailRegex.test(mail);
}
