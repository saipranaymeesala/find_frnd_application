import { title } from 'process';
import { RequsetService } from './requset-service';
import { Title } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { ClientRequest } from 'http';

describe('RequsetService', () => {
  it('should create an instance', () => {
    expect(new RequsetService()).toBeTruthy();
  });
});
