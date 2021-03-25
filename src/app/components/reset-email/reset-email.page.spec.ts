import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ResetEmailPage } from './reset-email.page';

describe('ResetEmailPage', () => {
  let component: ResetEmailPage;
  let fixture: ComponentFixture<ResetEmailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResetEmailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ResetEmailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
