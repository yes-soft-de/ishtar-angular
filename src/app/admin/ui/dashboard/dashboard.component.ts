import {Component, OnDestroy, OnInit} from '@angular/core';
import {ArtistService} from '../../service/artist/artist.service';
import {PhotosListService} from '../../service/PhotosList/photos-list.service';
import {AuctionService} from '../../service/auction/auction.service';
import {AuctionList} from '../../entity/auction/auction-list';
import {forkJoin, Subscription} from 'rxjs';
import {StatueService} from '../../service/statue/statue.service';
import {StatueInterface} from '../../entity/statue/statue.interface';
import {ArtistInterface} from '../../entity/artist/artist-interface';
import {PaintingInterface} from '../../entity/painting/painting-interface';
import {CommentService} from '../../service/comment/comment.service';
import {CommentInterface} from '../../entity/comment/comment-interface';
import {InteractionsService} from '../../service/interactions/interactions.service';
import {ActivatedRoute} from '@angular/router';
import {ClientService} from '../../service/client/client.service';
import {InteractionInterface} from '../../entity/interactions/interaction-interface';
import {ClientInterface} from '../../entity/client/client-interface';
import {Client} from '../../entity/client/client';
import {PaintingListItem} from '../../entity/painting-full-list/painting-list-item';
import {FeaturedPaintingsService} from '../../service/featured/featured-paintings.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  artists: ArtistInterface[];
  paintings: PaintingInterface[];
  auctions: AuctionList[];
  // statues: {0: StatueInterface, price: string}[];
  statues: StatueInterface[];
  comments: CommentInterface[];

  featuredImages: PaintingListItem[];

  interactions: InteractionInterface[];
  clients: Client[];
  latestArtistNumber = 5;
  latestPaintingNumber = 5;
  latestStatueNumber = 5;
  latestCommentNumber = 5;
  latestAuctionNumber = 5;
  latestClientsNumber = 5;
  combinedObservable: Subscription;

  constructor(private artist: ArtistService,
              private photosListService: PhotosListService,
              private auctionService: AuctionService,
              private commentService: CommentService,
              private featuredService: FeaturedPaintingsService,
              private statueService: StatueService,
              private interactionsService: InteractionsService,
              private clientService: ClientService) {
  }

  ngOnInit() {
    const allArtistObs = this.artist.getAllArtists();              // fetch all Artists
    const allPaintingObs = this.photosListService.getAllPainting();  // fetch all Paintings
    const allStatueObs = this.statueService.getAllStatues();       // fetch all Statues
    const allCommentsObs = this.commentService.getAllComments();     // fetch all Comments
    const allInteractions = this.interactionsService.getAllInteractions(); // fetch all Interactions Number
    const allClients = this.clientService.getAllClients();       // fetch all Client
    const allFeatured = this.featuredService.getFeaturedPaintings();
    const combinedObs = forkJoin(allArtistObs, allPaintingObs, allStatueObs,
      allCommentsObs, allInteractions, allClients, allFeatured);  // combined all
    this.combinedObservable = combinedObs.subscribe((data: any) => {
      this.artists = data[0].Data.reverse();
      this.paintings = data[1].Data.reverse();
      this.statues = data[2].Data.reverse();
      this.comments = data[3].Data.reverse();
      this.interactions = data[4].Data.reverse();
      this.clients = data[5].Data.reverse();
      this.featuredImages = data[6].Data.reverse();
      console.log('dashboard', data, this.statues);
    });
  }

  ngOnDestroy() {
    this.combinedObservable.unsubscribe();
  }

}
