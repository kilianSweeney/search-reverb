import { Component, OnChanges } from '@angular/core';
import { ReverbService } from './services/reverb.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private reverb: ReverbService) { }
  title = 'search-reverb';
  data = [];
  filteredData = [];
  filters = {
    body: '',
    neck: ''
  };
  noData = true;
  reverbUrl = 'assets/reverb.json';


  getData = ($event) => {
    if ($event === null || $event.target.value.length > 3){
      this.noData = false;
      this.reverb.http.get(this.reverbUrl).subscribe( (data) => {
        this.data = data.data;
        this.filteredData = this.updateFilteredData();
      });
    }
  }

  updateFilteredData = () => {
    if (this.data.length === 0) { return []; }
    if (this.filters.body === '' && this.filters.neck === '') { return this.data; }
    const filteredData = [];
    this.data.map( (item) => {
      if (this.filters.neck.length > 0 && item.neck === this.filters.neck) {
        if (this.filters.body === '' || this.filters.body.length > 0 && item.body === this.filters.body ) {filteredData.push(item); }
      } else if (this.filters.body.length > 0 && item.body === this.filters.body ) {
        if (this.filters.neck === '' || this.filters.neck.length > 0 && item.neck === this.filters.neck ) {filteredData.push(item); }
      }
    });
    return filteredData;
  }

  setBodyFilter = (value) => {
    this.filters.body = value;
    this.filteredData = this.updateFilteredData();
  }

  setNeckFilter = (value) => {
    this.filters.neck = value;
    this.filteredData = this.updateFilteredData();
  }
}