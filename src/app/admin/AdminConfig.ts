export class AdminConfig {
  // public static sourceAPI = 'http://ishtar.96.lt/Ishtar/public/';
  public static sourceAPI = 'http://dev-ishtar.96.lt/ishtar-backend/public/';
  // public static sourceAPI =  'http://ishtar-art.de/ishtar-backend/public/';

  // Create General Uploading API
  public static generalUploadAPI = AdminConfig.sourceAPI + 'uploadArtistImage';
  public static paintingUploadAPI = AdminConfig.sourceAPI + 'uploadPaintingImage';
  // Create Uploading Media
  public static addMediaAPI = AdminConfig.sourceAPI + 'createMedia';
  public static allRowSelectedEntityAPI = AdminConfig.sourceAPI + 'getEntityNames';
  // Art Type API
  public static allArtTypeAPI = AdminConfig.sourceAPI + 'getArtTypeList';
  // name API
  public static addArtistAPI = AdminConfig.sourceAPI + 'createArtist';
  public static editArtistAPI = AdminConfig.sourceAPI + 'updateArtist';
  public static deleteArtistAPI = AdminConfig.sourceAPI + 'deleteArtist';
  public static allArtistsAPI = AdminConfig.sourceAPI + 'getArtistsData';
  public static artistAPI = AdminConfig.sourceAPI + 'getArtistById';
  // Painting API
  public static addPaintingAPI = AdminConfig.sourceAPI + 'createPainting';
  public static editPaintingAPI = AdminConfig.sourceAPI + 'updatePainting';
  public static deletePaintingAPI = AdminConfig.sourceAPI + 'deletePainting';
  public static allPaintingsAPI = AdminConfig.sourceAPI + 'getAllPainting';
  public static paintingAPI = AdminConfig.sourceAPI + 'getPaintingById';
  public static fullImagesListAPI = AdminConfig.sourceAPI + 'painting-full-list';
  // Artist And Painting API
  public static artistFeaturedPaintings = 'http://5d402c85c516a90014e89669.mockapi.io/sample_paintings/';
  public static artistPaintingsAPI = AdminConfig.sourceAPI + 'createArtist';
  public static featuredAPI = AdminConfig.sourceAPI + 'featured';
  // client API
  public static addClientAPI = AdminConfig.sourceAPI + 'createClient';
  public static editClientAPI = AdminConfig.sourceAPI + 'updateClient';
  public static deleteClientAPI = AdminConfig.sourceAPI + 'deleteClient';
  public static allClientsAPI = AdminConfig.sourceAPI + 'getAllClient';
  public static clientAPI = AdminConfig.sourceAPI + 'getClientById';
  // Auction API
  public static addAuctionAPI = AdminConfig.sourceAPI + 'createAuction';
  public static allAuctionAPI = AdminConfig.sourceAPI + 'getAllAuction';

  public static userProfileAPI = 'http://K-symfony.96.lt/OAuth2/public/user';
  // public static userProfileAPI = AdminConfig.sourceAPI + 'user';

  // // Create Uploading Media
  // public static addMediaAPI = 'http://ishtar.96.lt/Ishtar/public/createMedia';
  // // Art Type API
  // public static allArtTypeAPI = 'http://ishtar.96.lt/Ishtar/public/getArtTypeList';
  // // name API
  // public static addArtistAPI = 'http://ishtar.96.lt/Ishtar/public/createArtist';
  // public static editArtistAPI = 'http://ishtar.96.lt/Ishtar/public/updateArtist';
  // public static deleteArtistAPI = 'http://ishtar.96.lt/Ishtar/public/deleteArtist';
  // public static allArtistsAPI = 'http://ishtar.96.lt/Ishtar/public/getArtistsData';
  // public static artistAPI = 'http://ishtar.96.lt/Ishtar/public/getArtistById';
  // // Painting API
  // public static addPaintingAPI = 'http://ishtar.96.lt/Ishtar/public/createPainting';
  // public static editPaintingAPI = 'http://ishtar.96.lt/Ishtar/public/updatePainting';
  // public static deletePaintingAPI = 'http://ishtar.96.lt/Ishtar/public/deletePainting';
  // public static allPaintingsAPI = 'http://ishtar.96.lt/Ishtar/public/getAllPainting';
  // public static paintingAPI = 'http://ishtar.96.lt/Ishtar/public/getPaintingById';
  // public static fullImagesListAPI = 'http://ishtar.96.lt/Ishtar/public/painting-full-list';
  // // Artist And Painting API
  // public static artistFeaturedPaintings = 'http://5d402c85c516a90014e89669.mockapi.io/sample_paintings/';
  // public static artistPaintingsAPI = 'http://ishtar.96.lt/Ishtar/public/createArtist';
  // public static featuredAPI = 'http://ishtar.96.lt/Ishtar/public/featured';
  // // client API
  // public static addClientAPI = 'http://ishtar.96.lt/Ishtar/public/createClient';
  // public static editClientAPI = 'http://ishtar.96.lt/Ishtar/public/updateClient';
  // public static deleteClientAPI = 'http://ishtar.96.lt/Ishtar/public/deleteClient';
  // public static allClientsAPI = 'http://ishtar.96.lt/Ishtar/public/getAllClient';
  // public static clientAPI = 'http://ishtar.96.lt/Ishtar/public/getClientById';

}
