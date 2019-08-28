import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Sort} from "@angular/material";

@Component({
  selector: 'active-listings',
  templateUrl: './active-listings.component.html',
  styleUrls: ['./active-listings.component.scss']
})
export class ActiveListingsComponent implements OnInit {
  activeListings: ActiveListings[];
  sortedData: ActiveListings[];

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.getActiveListings().subscribe(listings => {
      this.activeListings = listings;
    });
  }

  public getActiveListings(): Observable<any> {
    return this.http.get("../assets/data/active/1566947618435/data.json");
  }

  sortData(sort: Sort) {
    const data = this.activeListings;
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }
    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'Title': return this.compare(a.title, b.title, isAsc);
        case 'Condition': return this.compare(a.condition, b.condition, isAsc);
        case 'Price': return this.compare(a.price, b.price, isAsc);
        case 'Link': return this.compare(a.link, b.link, isAsc);
        default: return 0;
      }
    });
  }
  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
}
