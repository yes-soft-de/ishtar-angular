export class AdminConfig {

  // public static sourceAPI               = 'http://dev-ishtar.96.lt/ishtar-backend/public/';
  public static sourceAPI               = '/ishtar-backend/public/';
  // public static sourceAPI =  'http://ishtar-art.de/ishtar-backend/public/';

  // Create General Uploading API
  public static generalUploadAPI        = AdminConfig.sourceAPI + 'uploadArtistImage';
  public static paintingUploadAPI       = AdminConfig.sourceAPI + 'uploadPaintingImage';
  // Create Uploading Media
  public static addMediaAPI             = AdminConfig.sourceAPI + 'createMedia';
  public static allRowSelectedEntityAPI = AdminConfig.sourceAPI + 'getEntityNames';
  // Art Type API
  public static allArtTypeAPI           = AdminConfig.sourceAPI + 'getArtTypeList';
  // name API
  public static addArtistAPI            = AdminConfig.sourceAPI + 'createArtist';
  public static editArtistAPI           = AdminConfig.sourceAPI + 'updateArtist';
  public static deleteArtistAPI         = AdminConfig.sourceAPI + 'deleteArtist';
  public static allArtistsAPI           = AdminConfig.sourceAPI + 'getArtistsData';
  public static artistAPI               = AdminConfig.sourceAPI + 'getArtistById';
  // Painting API
  public static addPaintingAPI          = AdminConfig.sourceAPI + 'createPainting';
  public static editPaintingAPI         = AdminConfig.sourceAPI + 'updatePainting';
  public static deletePaintingAPI       = AdminConfig.sourceAPI + 'deletePainting';
  public static allPaintingsAPI         = AdminConfig.sourceAPI + 'getAllPainting';
  public static paintingAPI             = AdminConfig.sourceAPI + 'getPaintingById';
  public static fullImagesListAPI       = AdminConfig.sourceAPI + 'painting-full-list';
  // client API
  public static addClientAPI            = AdminConfig.sourceAPI + 'createClient';
  public static editClientAPI           = AdminConfig.sourceAPI + 'updateClient';
  public static deleteClientAPI         = AdminConfig.sourceAPI + 'deleteClient';
  public static allClientsAPI           = AdminConfig.sourceAPI + 'getAllClient';
  public static clientAPI               = AdminConfig.sourceAPI + 'getClientById';
  // Auction API
  public static addAuctionAPI           = AdminConfig.sourceAPI + 'createAuction';
  public static allAuctionAPI           = AdminConfig.sourceAPI + 'getAllAuction';
  // Statue API
  public static addStatueAPI            = AdminConfig.sourceAPI + 'createStatue';
  public static editStatueAPI           = AdminConfig.sourceAPI + 'updateStatue';
  public static deleteStatueAPI         = AdminConfig.sourceAPI + 'deleteStatue';
  public static allStatuesAPI           = AdminConfig.sourceAPI + 'getAllStatue';
  public static statueAPI               = AdminConfig.sourceAPI + 'getStatueById';

  public static userProfileAPI = 'http://K-symfony.96.lt/OAuth2/public/user';
  // public static userProfileAPI = AdminConfig.sourceAPI + 'user';


}
