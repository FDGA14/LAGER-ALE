import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { StarService } from 'src/app/services/star.service';

@Component({
  selector: 'app-star-review',
  templateUrl: './star-review.component.html',
  styleUrls: ['./star-review.component.scss'],
})
export class StarReviewComponent implements OnInit {

  @Input() userId;
  @Input() movieId;

  stars: Observable<any>;
  avgRating: Observable<any>;

  constructor(private starService: StarService) { }

  ngOnInit() {
    this.stars = this.starService.getMovieStars(this.movieId);

    this.avgRating = this.stars.pipe(map ((arr) => {
      const ratings = arr.map(v => v.value);
      return ratings.length ? ratings.reduce((total, val) => total + val) / arr.length : 'not reviewed'
    }));
  }

  starHandler(value) {
    this.starService.setStar(this.userId, this.movieId, value)
  }

}
