import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CervezaComponent } from './cerveza.component';

describe('CervezaComponent', () => {
  let component: CervezaComponent;
  let fixture: ComponentFixture<CervezaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CervezaComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CervezaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
