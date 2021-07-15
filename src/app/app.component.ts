import { Component, OnInit } from '@angular/core';
import { News } from './model/news';
import { NewsService } from './services/news.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  news: News[];
  constructor(private newsService: NewsService) {}
    ngOnInit(): void {
      this.newsService.news.subscribe(news => {
	      this.news = news;
      });
    }
}
