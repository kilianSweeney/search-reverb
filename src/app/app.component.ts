import { Component, OnChanges } from '@angular/core';
import { ReverbService } from './services/reverb.service';
import { HttpHeaders } from '@angular/common/http';

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
    if ($event === null || $event.target.value.length > 3) {
      this.noData = false;
      this.reverb.http.get(this.reverbUrl).subscribe( (data) => {
        this.data = (data as any).data;
        this.filteredData = this.updateFilteredData();
      });
    }
  }

  updateFilteredData = () => {
    const filteredData = this.data.filter((item) => {
      if (this.filters.body === '' && this.filters.neck === '') { return item; }
      return ((this.filters.neck === '' || item.neck === this.filters.neck) ) &&
      ((this.filters.body === '' || item.body === this.filters.body) );
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