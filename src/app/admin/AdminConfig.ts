export class AdminConfig {

  public static sourceAPI               = 'http://dev-ishtar.96.lt/ishtar-backend/public/';
   // public static sourceAPI               = '/ishtar-backend/public/';
  // public static sourceAPI =  'http://ishtar-art.de/ishtar-backend/public/';

  // Create General Uploading API
  public static generalUploadAPI        = AdminConfig.sourceAPI + 'uploadArtistImage';
  public static paintingUploadAPI       = AdminConfig.sourceAPI + 'uploadPaintingImage';
  // Create Uploading Media
  public static addMediaAPI             = AdminConfig.sourceAPI + 'createMedia';
  public static allRowSelectedEntityAPI = AdminConfig.sourceAPI + 'getEntityNames';
  // Art Type API
  // public static allArtTypeAPI           = AdminConfig.sourceAPI + 'getArtTypeList';
  public static artTypesAPI             = AdminConfig.sourceAPI + 'arttypes';
  // Artist API
  // public static addArtistAPI            = AdminConfig.sourceAPI + 'createArtist';
  // public static editArtistAPI           = AdminConfig.sourceAPI + 'updateArtist';
  // public static deleteArtistAPI         = AdminConfig.sourceAPI + 'deleteArtist';
  // public static allArtistsAPI           = AdminConfig.sourceAPI + 'getArtistsData';
  // public static artistAPI               = AdminConfig.sourceAPI + 'getArtistById';
  public static allArtistsAPI           = AdminConfig.sourceAPI + 'artistsdetails';   // This Route FOr GET all artists
  public static artistsAPI              = AdminConfig.sourceAPI + 'artists';    // This route for POST
  public static artistAPI               = AdminConfig.sourceAPI + 'artist';     // this route for GET ById & PUT

  // Painting API
  // public static addPaintingAPI          = AdminConfig.sourceAPI + 'createPainting';
  // public static editPaintingAPI         = AdminConfig.sourceAPI + 'updatePainting';
  // public static deletePaintingAPI       = AdminConfig.sourceAPI + 'deletePainting';
  // public static allPaintingsAPI         = AdminConfig.sourceAPI + 'getAllPainting';
  // public static paintingAPI             = AdminConfig.sourceAPI + 'getPaintingById';
  // public static fullImagesListAPI       = AdminConfig.sourceAPI + 'painting-full-list';
  // public static deletePaintingAPI       = AdminConfig.sourceAPI + 'deletePainting';
  public static paintingsAPI            = AdminConfig.sourceAPI + 'paintings';    // This route for GET all & POST
  public static paintingAPI             = AdminConfig.sourceAPI + 'painting';     // this route for GET ById & PUT

  // client API
   public static addClientAPI            = AdminConfig.sourceAPI + 'createClient';
   public static editClientAPI           = AdminConfig.sourceAPI + 'updateClient';
   public static deleteClientAPI         = AdminConfig.sourceAPI + 'deleteClient';
   public static allClientsAPI           = AdminConfig.sourceAPI + 'getAllClient';
   public static clientsAPI              = AdminConfig.sourceAPI + 'clients';
   public static clientAPI               = AdminConfig.sourceAPI + 'client';

  // Auction API
  // public static addAuctionAPI           = AdminConfig.sourceAPI + 'createAuction';
  // public static allAuctionAPI           = AdminConfig.sourceAPI + 'getAllAuction';
  public static auctionsAPI             = AdminConfig.sourceAPI + 'auctions';
  public static auctionAPI              = AdminConfig.sourceAPI + 'auction';

  // Statue API
  // public static addStatueAPI            = AdminConfig.sourceAPI + 'createStatue';
  // public static editStatueAPI           = AdminConfig.sourceAPI + 'updateStatue';
  // public static deleteStatueAPI         = AdminConfig.sourceAPI + 'deleteStatue';
  // public static allStatuesAPI           = AdminConfig.sourceAPI + 'getAllStatue';
  // public static statueAPI               = AdminConfig.sourceAPI + 'getStatueById';
  // public static deleteStatueAPI         = AdminConfig.sourceAPI + 'deleteStatue';
  public static statuesAPI              = AdminConfig.sourceAPI + 'statues';
  public static statueAPI               = AdminConfig.sourceAPI + 'statue';

  // Comments API
  public static commentsAPI             = AdminConfig.sourceAPI + 'comments';
  public static commentAPI              = AdminConfig.sourceAPI + 'comment';
  public static specialCommentAPI          = AdminConfig.sourceAPI + 'spacialcomment';

  public static interactionsAPI         = AdminConfig.sourceAPI + 'interactions';
  // public static userProfileAPI = 'http://K-symfony.96.lt/OAuth2/public/user';
  // public static userProfileAPI = AdminConfig.sourceAPI + 'user';


}
