import { Component, OnInit } from '@angular/core';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {
  worldMapEnabled: boolean;
  constructor(private ns: NewsService) {
  }

  ngOnInit() {
    this.worldMapEnabled = false;
    this.ns.news.subscribe(news => {
      if (news.length > 0){
        this.worldMapEnabled = true;
      }
    });
  }

}
