import { TestBed } from '@angular/core/testing';

import { UsersDialogService } from './users-dialog.service';

describe('UsersDialogService', () => {
  let service: UsersDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsersDialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
