export function decode(cookieString: string): Record<string, string> {
    const cookieArray = cookieString.split(";");
    const cookies = {} as Record<string, string>;

    for (const cookie of cookieArray) {
        const cookieLine = cookie.split("=");
        cookies[cookieLine[0].trim()] = cookieLine[1];
    }

    return cookies;
}
