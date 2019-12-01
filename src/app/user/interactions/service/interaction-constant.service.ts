import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InteractionConstantService {
  public static INTERACTION_TYPE_LOVE   = 'like';
  public static INTERACTION_TYPE_FOLLOW = 'follow';
  public static INTERACTION_TYPE_VIEW   = 'view';
  public static INTERACTION_TYPE_CLAP   = 'clap';

  private interactionsParam: {interactionsType: string, interactionNumber: number}[] = [
    {interactionsType: InteractionConstantService.INTERACTION_TYPE_LOVE, interactionNumber: 1},
    {interactionsType: InteractionConstantService.INTERACTION_TYPE_FOLLOW, interactionNumber: 2},
    {interactionsType: InteractionConstantService.INTERACTION_TYPE_VIEW, interactionNumber: 3},
    {interactionsType: InteractionConstantService.INTERACTION_TYPE_CLAP, interactionNumber: 4},
  ];
  constructor() {
  }

  convertInteractionsTypeToNumber(interactionsType: string): number {
    for (const param of this.interactionsParam) {
      if (interactionsType.toLocaleLowerCase() === param.interactionsType) {
        return param.interactionNumber;
      }
    }
  }
}
