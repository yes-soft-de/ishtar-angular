export interface LoveEntity {
  success: boolean;
  value: {
    entity: string;
    id: number;
    interaction: 'like';
    interactionID: number
  }
}
