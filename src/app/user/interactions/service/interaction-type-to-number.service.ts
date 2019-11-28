import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InteractionTypeToNumberService {

  private interactionsParam: {interactionsType: string, interactionNumber: number}[] = [
    {interactionsType: 'love', interactionNumber: 1},
    {interactionsType: 'follow', interactionNumber: 2},
    {interactionsType: 'view', interactionNumber: 3}
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
