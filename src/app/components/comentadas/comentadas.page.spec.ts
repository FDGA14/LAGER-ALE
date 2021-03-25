import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ComentadasPage } from './comentadas.page';

describe('ComentadasPage', () => {
  let component: ComentadasPage;
  let fixture: ComponentFixture<ComentadasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComentadasPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ComentadasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
