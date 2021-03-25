import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListPublicacionesPage } from './list-publicaciones.page';

describe('ListPublicacionesPage', () => {
  let component: ListPublicacionesPage;
  let fixture: ComponentFixture<ListPublicacionesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListPublicacionesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListPublicacionesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
