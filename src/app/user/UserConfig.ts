export class UserConfig {
  public static sourceAPI = 'http://ishtar.96.lt/Ishtar/public/';


  public static PaintingListAPI = UserConfig.sourceAPI + 'getAllPainting';
  public static PaintingImageAPI = 'http://localhost:8000/getPaintingImages';
  public static PaintingDetailsAPI =  UserConfig.sourceAPI + 'getPaintingById';
  public static ArtistListAPI = 'http://ishtar-art.de/ishtar-backend/public/getAllArtist';
  public static ArtistDetailsAPI = 'http://ishtar-art.de/ishtar-backend/public/getArtistById';
  public static getByAPI = 'http://ishtar-art.de/ishtar-backend/public/getBy';
  public static ArtTypeAPI = 'http://ishtar-art.de/ishtar-backend/public/getArtTypeById';
  public static allArtTypeAPI = 'http://ishtar-art.de/ishtar-backend/public/getAllArtType';
  public static getInteractionAPI =  UserConfig.sourceAPI + 'getInteraction';
  public static postInteractionAPI =  UserConfig.sourceAPI + 'createInteraction';
  public static searchAPI = 'http://ishtar-art.de/ishtar-backend/public/search';
  public static userProfileAPI = 'http://K-symfony.96.lt/OAuth2/public/user';
  public static userLoginLink = 'http://K-symfony.96.lt/OAuth2/public/connect/google';
  public static userLogoutLink = 'http://k-symfony.96.lt/logout';
  public static addInteractionAPI = 'http://ishtar-art.de/ishtar-backend/public/createInteraction';
  public static getFollowInteractionAPI = 'http://ishtar-art.de/ishtar-backend/public/getEntityInteraction';
  public static paintingViewsAPI = 'http://K-symfony.96.lt/OAuth2/public/createInteraction';

  public static getAllCommentsAPI = UserConfig.sourceAPI + 'getEntityComment';
  public static postNewCommentAPI = UserConfig.sourceAPI + 'createComment';
  public static updateCommentAPI = UserConfig.sourceAPI + 'updateComment';
  public static deleteCommentAPI = UserConfig.sourceAPI + 'deleteComment';
}
