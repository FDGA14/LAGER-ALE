import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ScansPage } from './scans.page';

describe('ScansPage', () => {
  let component: ScansPage;
  let fixture: ComponentFixture<ScansPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScansPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ScansPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
