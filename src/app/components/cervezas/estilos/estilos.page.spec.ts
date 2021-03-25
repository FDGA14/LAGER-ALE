import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EstilosPage } from './estilos.page';

describe('EstilosPage', () => {
  let component: EstilosPage;
  let fixture: ComponentFixture<EstilosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstilosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EstilosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
