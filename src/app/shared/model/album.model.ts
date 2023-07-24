export interface Album {
    id?: string;
    name: string;
    thumbnailUrl: string;
    category?: string[];
    uploadedAt?: Date;
}