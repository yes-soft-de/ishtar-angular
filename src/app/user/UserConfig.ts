export class UserConfig {
  public static sourceAPI = 'http://ishtar.96.lt/Ishtar/public/';
  // public static sourceAPI = 'http://ishtar-art.de/ishtar-backend/public/';

  public static PaintingListAPI = UserConfig.sourceAPI + 'getAllPainting';
  public static PaintingImageAPI = UserConfig.sourceAPI + 'getPaintingImages';
  public static PaintingDetailsAPI = UserConfig.sourceAPI + 'getPaintingById';
  public static ArtistListAPI = UserConfig.sourceAPI + 'getAllArtist';
  public static ArtistDetailsAPI = UserConfig.sourceAPI + 'getArtistById';
  public static getByAPI = UserConfig.sourceAPI + 'getBy';
  public static ArtTypeAPI = UserConfig.sourceAPI + 'getArtTypeById';
  public static allArtTypeAPI = UserConfig.sourceAPI + 'getAllArtType';
  public static getInteractionAPI = UserConfig.sourceAPI + 'getInteraction';
  public static postInteractionAPI = UserConfig.sourceAPI + 'createInteraction';
  public static searchAPI = UserConfig.sourceAPI + 'search';
  public static userProfileAPI = UserConfig.sourceAPI + 'user';
  public static userLoginLink = UserConfig.sourceAPI + 'connect/google';
  public static userLogoutLink = UserConfig.sourceAPI + 'logout';

  public static addInteractionAPI = UserConfig.sourceAPI + 'createInteraction';
  public static getFollowInteractionAPI = UserConfig.sourceAPI + 'getEntityInteraction';
  public static paintingViewsAPI = UserConfig.sourceAPI + 'createInteraction';
  public static createClapAPI = UserConfig.sourceAPI + 'createClap';
  public static getClapAPI = UserConfig.sourceAPI + 'getEntityClap';

  public static getAllCommentsAPI = UserConfig.sourceAPI + 'getEntityComment';
  public static postNewCommentAPI = UserConfig.sourceAPI + 'createComment';
  public static updateCommentAPI = UserConfig.sourceAPI + 'updateComment';
  public static deleteCommentAPI = UserConfig.sourceAPI + 'deleteComment';
}
