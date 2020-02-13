import {InteractionConsts} from './interaction-consts';
export class CodeConverter {
  static getInteractionCode(interactionTypeString: string) {
    switch (interactionTypeString.toLowerCase()) {
      case 'like':
        return InteractionConsts.INTERACTION_TYPE_LOVE;
      case 'view':
        return InteractionConsts.INTERACTION_TYPE_VIEW;
      case 'follow':
        return InteractionConsts.INTERACTION_TYPE_FOLLOW;
      default:
        return -1;
    }
  }

  static getEntityCode(entityName: string) {
    switch (entityName.toLowerCase()) {
      case 'painting':
        return InteractionConsts.ENTITY_TYPE_PAINTING;
      case 'artist':
        return InteractionConsts.ENTITY_TYPE_ARTIST;
      case 'art-type':
        return InteractionConsts.ENTITY_TYPE_ART_TYPE;
      case 'arttype':
        return InteractionConsts.ENTITY_TYPE_ART_TYPE;
      case 'auction':
        return InteractionConsts.ENTITY_TYPE_AUCTION;
      case 'Statue':
        return InteractionConsts.ENTITY_TYPE_STATUE;
      default:
        return -1;
    }
  }

  constructor() {
  }
}
