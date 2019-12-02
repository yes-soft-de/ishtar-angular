export class UserConfig {
  // public static sourceAPI = 'http://ishtar-art.de/ishtar-backend/public/';
  public static sourceAPI = 'http://dev-ishtar.96.lt/ishtar-backend/public/';
  // public static sourceAPI = '/ishtar-backend/public/';
  public static localAPI = 'http://localhost:8002/';

  public static diagnoseAPI = 'https://webhook.site/ed0764a6-f85a-4f5f-937d-127d0741832d';

  public static getByAPI = UserConfig.sourceAPI + 'getBy';
  public static PaintingImageAPI = UserConfig.sourceAPI + 'getPaintingImages';
  public static searchAPI = UserConfig.sourceAPI + 'search';

  // public static userProfileAPI = UserConfig.diagnoseAPI;
  public static userLoginLink = UserConfig.sourceAPI + 'connect/google';
  public static userLogoutLink = UserConfig.sourceAPI + 'logout';

  public static CrosHeaderAPI = UserConfig.sourceAPI + 'headers';
  public static userProfileAPI = UserConfig.sourceAPI + 'user';
  public static updateProfileAPI = UserConfig.sourceAPI + 'client';
  public static userRegisterAuthAPI = UserConfig.sourceAPI + 'register';
  public static userLoginAuthAPI = UserConfig.sourceAPI + 'login_check';


  // Create General Uploading API
  public static generalUploadAPI = UserConfig.sourceAPI + 'uploadArtistImage';
  public static paintingUploadAPI = UserConfig.sourceAPI + 'uploadPaintingImage';
  public static clientImageUploadAPI = UserConfig.sourceAPI + 'uploadPaintingImage';

  // Artists API
  public static artistsAPI = UserConfig.sourceAPI + 'artists';     // This route for GET all & POST
  public static artistAPI = UserConfig.sourceAPI + 'artist';      // this route for GET ById & PUT
  // Painting API
  public static paintingsAPI = UserConfig.sourceAPI + 'paintings';    // This route for GET all & POST
  public static paintingAPI = UserConfig.sourceAPI + 'painting';     // this route for GET ById & PUT
  public static paintingByIdAPI = UserConfig.sourceAPI + 'paintingById';
  /* PaintingByApi About:
  * get every thing from painting table dependent on painting column
  * ex : paintingby/artist/2 => fetch all painting for this artist, ex : paintingby/id/2 => fetch painting with id 2
  * */
  public static paintingByAPI = UserConfig.sourceAPI + 'paintingby';

  // Statues API
  public static statuesAPI = UserConfig.sourceAPI + 'statues';
  public static statueAPI = UserConfig.sourceAPI + 'statue';

  // ArtType API
  public static artTypesAPI = UserConfig.sourceAPI + 'arttypes';
  public static artTypeAPI = UserConfig.sourceAPI + 'arttype';

  // Comments API
  public static specialSectionComments = UserConfig.sourceAPI + 'commentsentity';
  public static commentsAPI = UserConfig.sourceAPI + 'comments';
  public static commentAPI = UserConfig.sourceAPI + 'comment';

  // View Follow Love Interactions API
  public static interactionsAPI = UserConfig.sourceAPI + 'interactions';
  public static interactionAPI = UserConfig.sourceAPI + 'interaction';
  public static specificClientInteractions = UserConfig.sourceAPI + 'interactionsclient';
  public static interactionsNumberAPI   = UserConfig.sourceAPI + 'interactionsentity';
  public static mostViewedAPI           = UserConfig.sourceAPI + 'mostviews';

  // Clap Interactions API
  public static clapsAPI = UserConfig.sourceAPI + 'claps';
  public static clapAPI = UserConfig.sourceAPI + 'clap';
  public static specificClientClaps = UserConfig.sourceAPI + 'clapsclient';
  public static specificEntityClaps = UserConfig.sourceAPI + 'clapsentity';


}
