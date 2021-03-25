import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-showclass',
  templateUrl: './showclass.page.html',
  styleUrls: ['./showclass.page.scss'],
})
export class ShowclassPage implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router) { }

  image:any
result:any
feature:any

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params && params.special && params.result && params.feature ) {
      this.image = JSON.parse(params.special);
      this.result = JSON.parse(params.result);
      this.feature = JSON.parse(params.feature);
      }
      switch(this.feature.value){
      case "TEXT_DETECTION":{
      this.result = this.result.responses[0].textAnnotations
      break;
      }
      case "FACE_DETECTION":{
      this.result = this.result.responses
      break;
      }
      case "OBJECT_LOCALIZATION":{
      this.result = this.result.responses[0].localizedObjectAnnotations
      break;
      }
      case "LANDMARK_DETECTION":{
      this.result = this.result.responses[0].landmarkAnnotations
      break;
      }
      case "LOGO_DETECTION":{
      this.result = this.result.responses[0].logoAnnotations
      break;
      }
      case "WEB_DETECTION":{
      this.result = this.result.responses[0].webDetection.webEntities
      break;
      }
      case "SAFE_SEARCH_DETECTION":{
      this.result = this.result.responses
      break;
      }
      case "IMAGE_PROPERTIES":{
      this.result = this.result.responses[0].imagePropertiesAnnotation.dominantColors.colors
      break;
      }
      case "CROP_HINTS":{
      this.result = this.result.responses[0].cropHintsAnnotation.cropHints
      break;
      }
      case "DOCUMENT_TEXT_DETECTION":{
      this.result = this.result = this.result.responses[0].textAnnotations
      break;
      }
      default:{
      this.result = this.result.responses[0].labelAnnotations
      }
      }
      console.log(this.result)
      });
  }

}
