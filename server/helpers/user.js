export const getBaseUrl = httpRequest => {
    return `${httpRequest.protocol}://${httpRequest.get('host')}/api/v1`
}