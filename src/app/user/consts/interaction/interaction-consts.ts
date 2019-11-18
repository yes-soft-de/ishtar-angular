export class InteractionConsts {
  public static INTERACTION_TYPE_LOVE = 1;
  public static INTERACTION_TYPE_FOLLOW = 2;
  public static INTERACTION_TYPE_VIEW = 3;

  public static ENTITY_TYPE_PAINTING = 1;
  public static ENTITY_TYPE_ARTIST = 2;
  public static ENTITY_TYPE_ART_TYPE = 3;
  public static ENTITY_TYPE_AUCTION = 4;
  public static ENTITY_TYPE_STATUE = 6;

  public static routingValues = [
    {route: 'painting', apiKey: InteractionConsts.ENTITY_TYPE_PAINTING},
    {route: 'art-type', apiKey: InteractionConsts.ENTITY_TYPE_ART_TYPE},
    {route: 'artist', apiKey: InteractionConsts.ENTITY_TYPE_ARTIST},
    {route: 'statue', apiKey: InteractionConsts.ENTITY_TYPE_STATUE}
  ];
}
