import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ReverbService {
  constructor(public http: HttpClient) {}
}
