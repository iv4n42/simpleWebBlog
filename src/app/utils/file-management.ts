export function base64ToBlob(base64Data: string, contentType: string) {
    const byteChars: string = atob(base64Data),
        byteNumbers = new Array(byteChars.length);

    for (let i = 0; i < byteChars.length; i++)
        byteNumbers[i] = byteChars.charCodeAt(i);

    const byteArray = new Uint8Array(byteNumbers);

    return new Blob([byteArray], {
        type: contentType,
    });
}
