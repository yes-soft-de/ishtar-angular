export class AdminConfig {
  // Art Type API
  public static allArtTypeAPI = 'http://localhost:1337/localhost:8000/getAllArtType';
  // artist API
  public static addArtistAPI = 'http://localhost:1337/localhost:8000/createArtist';
  public static editArtistAPI = 'http://localhost:1337/localhost:8000/updateArtist';
  public static deleteArtistAPI = 'http://localhost:1337/127.0.0.1:8000/deleteArtist';
  public static allArtistsAPI = 'http://localhost:1337/127.0.0.1:8000/getArtistsData';
  public static artistAPI = 'http://localhost:1337/localhost:8000/getArtistById';
  // Painting API
  public static addPaintingAPI = 'http://localhost:1337/localhost:8000/createPainting';
  public static editPaintingAPI = 'http://localhost:1337/localhost:8000/updatePainting';
  public static deletePaintingAPI = 'http://localhost:1337/localhost:8000/deletePainting';
  public static allPaintingsAPI = 'http://localhost:1337/localhost:8000/getAllPainting';
  public static paintingAPI = 'http://localhost:1337/localhost:8000/getPaintingById';
  public static fullImagesListAPI = 'http://localhost:3000/painting-full-list';
  // Artist And Painting API
  public static artistFeaturedPaintings = 'http://5d402c85c516a90014e89669.mockapi.io/sample_paintings/';
  public static artistPaintingsAPI = 'http://localhost:8000/paintings/createArtist';
  public static featuredAPI = 'http://localhost:3000/featured';
  // client API
  public static addClientAPI = 'http://localhost:1337/localhost:8000/createClient';
  public static editClientAPI = 'http://localhost:1337/localhost:8000/updateClient';
  public static deleteClientAPI = 'http://localhost:1337/127.0.0.1:8000/deleteClient';
  public static allClientsAPI = 'http://localhost:3200/getAllClient';
  public static clientAPI = 'http://localhost:1337/localhost:8000/getClientById';

}
