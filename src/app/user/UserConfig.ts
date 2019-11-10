export class UserConfig {
  //public static sourceAPI = '/ishtar-backend/public/';
  //  public static sourceAPI = 'http://ishtar-art.de/ishtar-backend/public/';
  public static sourceAPI = 'http://dev-ishtar.96.lt/ishtar-backend/public/';

  public static localAPI = 'http://localhost:8002/';

  public static getByAPI = UserConfig.sourceAPI + 'getBy';
  public static PaintingImageAPI = UserConfig.sourceAPI + 'getPaintingImages';
  public static searchAPI = UserConfig.sourceAPI + 'search';
  public static userProfileAPI = UserConfig.sourceAPI + 'user';
  public static userLoginLink = UserConfig.sourceAPI + 'connect/google';
  public static userLogoutLink = UserConfig.sourceAPI + 'logout';

  public static CrosHeaderAPI = UserConfig.localAPI + 'headers';
  public static updateProfileAPI = UserConfig.localAPI + 'client';
  public static userRegisterAuthAPI = UserConfig.localAPI + 'register';
  public static userLoginAuthAPI = UserConfig.localAPI + 'login_check';
  public static userRegisterAuthAPI = UserConfig.localAPI + 'register';
  public static CrosHeaderAPI = UserConfig.localAPI + 'headers';

  // Artists API
  public static artistsAPI              = UserConfig.sourceAPI + 'artists';     // This route for GET all & POST
  public static artistAPI               = UserConfig.sourceAPI + 'artist';      // this route for GET ById & PUT
  // Painting API
  public static paintingsAPI            = UserConfig.sourceAPI + 'paintings';    // This route for GET all & POST
  public static paintingAPI             = UserConfig.sourceAPI + 'painting';     // this route for GET ById & PUT
  /* PaintingByApi About:
  * get every thing from painting table dependent on painting column
  * ex : paintingby/artist/2 => fetch all painting for this artist, ex : paintingby/id/2 => fetch painting with id 2
  * */
  public static paintingByAPI           = UserConfig.sourceAPI + 'paintingby';

  // Statues API
  public static statuesAPI              = UserConfig.sourceAPI + 'statues';
  public static statueAPI               = UserConfig.sourceAPI + 'statue';

  // ArtType API
  public static artTypesAPI             = UserConfig.sourceAPI + 'arttypes';
  public static artTypeAPI              = UserConfig.sourceAPI + 'arttype';

  // Comments API
  public static specialSectionComments  = UserConfig.sourceAPI + 'commentsentity';
  public static commentsAPI             = UserConfig.sourceAPI + 'comments';
  public static commentAPI              = UserConfig.sourceAPI + 'comment';

  // View Follow Love Interactions API
  public static interactionsAPI         = UserConfig.sourceAPI + 'interactions';
  public static interactionAPI          = UserConfig.sourceAPI + 'interaction';
  public static specificClientInteractions = UserConfig.sourceAPI + 'interactionsclient';
  public static interactionsNumberAPI   = UserConfig.sourceAPI + 'interactionsentity';

  // Clap Interactions API
  public static clapsAPI                = UserConfig.sourceAPI + 'claps';
  public static clapAPI                 = UserConfig.sourceAPI + 'clap';
  public static specificClientClaps     = UserConfig.sourceAPI + 'clapsclient';
  public static specificEntityClaps     = UserConfig.sourceAPI + 'clapsentity';



  /*
public static PaintingListAPI = UserConfig.sourceAPI + 'getAllPainting';
public static PaintingDetailsAPI = UserConfig.sourceAPI + 'getPaintingById';
public static ArtistListAPI = UserConfig.sourceAPI + 'getAllArtist';
public static ArtistDetailsAPI = UserConfig.sourceAPI + 'getArtistById';
public static ArtTypeAPI = UserConfig.sourceAPI + 'getArtTypeById';
public static allArtTypeAPI = UserConfig.sourceAPI + 'getAllArtType';
public static getInteractionAPI = UserConfig.sourceAPI + 'getInteraction';
public static postInteractionAPI = UserConfig.sourceAPI + 'createInteraction';
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
*/
}
