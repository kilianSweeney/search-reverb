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
    console.log('hello!!!');
    this.reverb.http.post('https://app.close.com/hackwithus/d316a83d0deb6b64/', {
      first_name : 'Kilian',
      last_name : 'Sweeney',
      email : 'kilian_sweeney@yahoo.com',
      phone : '312-498-1820',
      cover_letter : 'Good Afternoon! I\'m a full stack developer who has spent the past ten years ' +
      'focusing on front end technologies and soft skills. I just spent five years helping to plan, build' +
      'and ship a saas solution in the event management market place. I\m a great javascript developer and' +
      'I\'m also handy with design skills and tools like Adobe Creative Suite. I look forward to hearing more' +
      'about your opportunity!',
      urls : 'My Porfolio: http://3tons.org/kiliansweeney/, My Github Profile: https://github.com/kilianSweeney' +
      'My Linkedin Porfile: https://www.linkedin.com/in/kilian-sweeney-273b9118/'
    },
    {
      headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
      'Content-Type': 'application/json'
      }
}).subscribe(
      response => console.log(response),
      err => console.log(err)
    );
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