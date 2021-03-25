import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FindUsersPage } from './find-users.page';

describe('FindUsersPage', () => {
  let component: FindUsersPage;
  let fixture: ComponentFixture<FindUsersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FindUsersPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FindUsersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
