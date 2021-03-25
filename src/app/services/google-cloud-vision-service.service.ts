import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { environment } from '../../environments/environment';

import { googlecloudvisionapi } from '../../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class GoogleCloudVisionServiceService {

  constructor(public http: HttpClient) { }

  // Setting up to detect logo in an image
  getLabels(base64Image) {
    const body = {
      requests: [
        {
          image: {
            content: base64Image
          },
          features: [
            {
              type: 'TEXT_DETECTION'
            }
          ]
        }
      ]
    };
    return this.http.post('https://vision.googleapis.com/v1/images:annotate?key=' + 'AIzaSyCzG92Wprk1mG1g36KMkztiMuZMImDVnKc', body);
    }
  }
