export function isUrl(url: string) {
    return url.startsWith("http://")
        || url.startsWith("https://");
}