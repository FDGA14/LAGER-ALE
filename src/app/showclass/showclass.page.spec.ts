import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ShowclassPage } from './showclass.page';

describe('ShowclassPage', () => {
  let component: ShowclassPage;
  let fixture: ComponentFixture<ShowclassPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowclassPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ShowclassPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
