import { Component, OnInit } from '@angular/core';
import { News } from '../model/news';
import { NewsService } from '../services/news.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  newsArr: News[];
  constructor(private newsService: NewsService) {}
  ngOnInit(): void {
	  this.newsService.news.subscribe(news => {
      this.newsArr = news;
    });
  }
}
