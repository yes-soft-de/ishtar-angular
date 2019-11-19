export class CommentGetRequestFactory {

  public static getPaintingCommentRequest(paintingId: string): { painting: string } {
    return {
      painting: paintingId
    };
  }

  public static getArtistCommentRequest(artistId: string): { artist: string } {
    return {
      artist: artistId
    };
  }

  public static getArtTypeCommentRequest(artTypeId: string): { artType: string } {
    return {
      artType: artTypeId
    };
  }

  public static getStatueCommentRequest(statueId: string): { statue: string } {
    return {
      statue: statueId
    };
  }
}
