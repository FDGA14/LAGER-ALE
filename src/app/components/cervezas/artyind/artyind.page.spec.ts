import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ArtyindPage } from './artyind.page';

describe('ArtyindPage', () => {
  let component: ArtyindPage;
  let fixture: ComponentFixture<ArtyindPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArtyindPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ArtyindPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
