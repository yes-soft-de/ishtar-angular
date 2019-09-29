export class UserConfig {
  public static sourceAPI = 'http://ishtar.96.lt/Ishtar/public/';
  public static PaintingListAPI = UserConfig.sourceAPI + 'getAllPainting';
  public static PaintingImageAPI = 'http://localhost:8000/getPaintingImages';
  public static PaintingDetailsAPI = UserConfig.sourceAPI + 'getPaintingById';
  public static allArtistListAPI = UserConfig.sourceAPI + 'getAllArtist';
  public static ArtistDetailsAPI = UserConfig.sourceAPI + 'getArtistById';
  public static getByAPI = UserConfig.sourceAPI + 'getBy';
  public static ArtTypeAPI = UserConfig.sourceAPI + 'getArtTypeById';
  public static allArtTypeAPI = UserConfig.sourceAPI + 'getAllArtType';
  public static getInteractionAPI = UserConfig.sourceAPI + 'getInteraction';
  public static postInteractionAPI = UserConfig.sourceAPI + 'getEntityInteraction';
  public static searchAPI = UserConfig.sourceAPI + 'search';
  public static userProfileAPI = 'http://K-symfony.96.lt/OAuth2/public/user';
  public static userLoginLink = 'http://K-symfony.96.lt/OAuth2/public/connect/google';
  public static addInteractionAPI = UserConfig.sourceAPI + 'createInteraction';
  public static getFollowInteractionAPI = UserConfig.sourceAPI + 'getEntityInteraction'; // fetch client that make follow
  public static paintingViewsAPI = 'http://K-symfony.96.lt/OAuth2/public/createInteraction';
  public static getAllCommentsAPI = UserConfig.sourceAPI + 'getEntityComment';
  public static postNewCommentAPI = UserConfig.sourceAPI + 'createComment';
}
