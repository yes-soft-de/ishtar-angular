export class LoveResponse {
    success: boolean;
    value: {
        entity: string;
        id: number;
        interaction: 'like';
        interactionID: number
    }
}