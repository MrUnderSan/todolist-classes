export type ErrorType = {
    "statusCode": number,
    "messages": string[],
    "error": string
}

export type ResponseType<D = {}> = {
    data: D
    fieldsErrors?: string[]
    messages: string[]
    resultCode: number
}