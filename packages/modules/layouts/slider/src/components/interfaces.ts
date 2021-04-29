export interface Item {
    image?: string,
    title?: string,
    text?: string,
    link?: {
        url?: string,
        text?: string
    },
    data?: any
}

export enum Directions {
    left = 1,
    right = -1,
    top = 0,
    bottom= 0
}