export interface IUser {
    id: number,
    firstname: string;
    lastname: string;
    email: string;
    preview_img?: string;
    city?: string;
    country?: string;
    lang: string;
    status: string;
    role: {
        id: number,
        role: string,
        slug: string,
    }
}