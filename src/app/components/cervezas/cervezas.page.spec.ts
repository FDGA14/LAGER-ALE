import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CervezasPage } from './cervezas.page';

describe('CervezasPage', () => {
  let component: CervezasPage;
  let fixture: ComponentFixture<CervezasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CervezasPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CervezasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
