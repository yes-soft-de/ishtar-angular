export class InteractionConsts {
  public static INTERACTION_TYPE_LOVE = 1;
  public static INTERACTION_TYPE_FOLLOW = 2;
  public static INTERACTION_TYPE_VIEW = 3;

  public static ENTITY_TYPE_PAINTING = 1;
  public static ENTITY_TYPE_ARTIST = 2;
  public static ENTITY_TYPE_ART_TYPE = 3;
  public static ENTITY_TYPE_AUCTION = 4;
  public static ENTITY_TYPE_STATUE = 6;

  public static routingValues: {pageTypeString: string, pageType: string}[] = [
    {pageTypeString: 'painting', pageType: 'getPaintingComments'},
    {pageTypeString: 'art-type', pageType: 'getArtTypeComments'},
    {pageTypeString: 'artist', pageType: 'GetArtistComments'},
    {pageTypeString: 'statue', pageType: 'GetStatueComments'}
  ];
}
