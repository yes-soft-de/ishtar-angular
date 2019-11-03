export class UserConfig {
   public static sourceAPI2 = 'http://dev-ishtar.96.lt/ishtar-backend/public/';
  // public static sourceAPI = '/ishtar-backend/public/';
   public static sourceAPI = 'http://ishtar-art.de/ishtar-backend/public/';


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
  public static userLoginLink = UserConfig.sourceAPI2 + 'connect/google';
  public static userLogoutLink = UserConfig.sourceAPI2 + 'logout';

  public static getClientInteractionsAPI = UserConfig.sourceAPI + 'getClientInteraction';
  public static deleteClientInteractionsAPI = UserConfig.sourceAPI + 'deleteInteraction';
  public static getClientClapAPI = UserConfig.sourceAPI + 'getClientClap';
  public static deleteClientClapAPI = UserConfig.sourceAPI + 'deleteClap';
  public static addInteractionAPI = UserConfig.sourceAPI + 'createInteraction';
  public static getFollowInteractionAPI = UserConfig.sourceAPI + 'getEntityInteraction';
  public static paintingViewsAPI = UserConfig.sourceAPI + 'createInteraction';
  public static createClapAPI = UserConfig.sourceAPI + 'createClap';
  public static getClapAPI = UserConfig.sourceAPI + 'getEntityClap';
  // Comments API
  public static getAllCommentsAPI = UserConfig.sourceAPI + 'getEntityComment';
  public static postNewCommentAPI = UserConfig.sourceAPI + 'createComment';
  public static updateCommentAPI = UserConfig.sourceAPI + 'updateComment';
  public static deleteCommentAPI = UserConfig.sourceAPI + 'deleteComment';
  // Statues API

  public static getAllStatuesAPI = UserConfig.sourceAPI + 'getAllStatue';
  public static getStatueByIdAPI = UserConfig.sourceAPI + 'getStatueById';

 // Artists API
 //public static artistsAPI = UserConfig.sourceAPI + 'artists';    // This route for GET all & POST
 // public static artistAPI = UserConfig.sourceAPI + 'artist';     // this route for GET ById & PUT
 // Painting API
 // public static paintingsAPI = UserConfig.sourceAPI + 'paintings';    // This route for GET all & POST
 // public static paintingAPI  = UserConfig.sourceAPI + 'painting';     // this route for GET ById & PUT

 // Statues API
 // public static statuesAPI = UserConfig.sourceAPI + 'statues';
 // public static statueAPI = UserConfig.sourceAPI + 'statue';

 // Interactions API
 public static interactionsAPI = UserConfig.sourceAPI + 'interactions';

}
