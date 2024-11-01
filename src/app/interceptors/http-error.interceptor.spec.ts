import { TestBed } from '@angular/core/testing';
import { provideHttpClient, HTTP_INTERCEPTORS, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';

import { HttpErrorInterceptor } from './http-error.interceptor';

describe('HttpErrorInterceptor', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(), // Provides HttpClient
        provideHttpClientTesting(), // Provides HttpClient testing support
        {
          provide: HTTP_INTERCEPTORS,
          useClass: HttpErrorInterceptor, // Registering the interceptor
          multi: true,
        },
      ],
    });

    httpClient = TestBed.inject(HttpClient); // Inject HttpClient
    httpTestingController = TestBed.inject(HttpTestingController); // Inject HttpTestingController
  });

  afterEach(() => {
    // Verify that there are no outstanding requests
    httpTestingController.verify();
  });

  it('should handle a 401 error', () => {
    httpClient.get('/test-url').subscribe({
      next: () => fail('should have failed with a 401 error'),
      error: (error) => {
        expect(error.message).toContain('401 Unauthorized');
      },
    });
    const req = httpTestingController.expectOne('/test-url');
    req.flush('Unauthorized', { status: 401, statusText: 'Unauthorized' });
  });

  it('should handle a 500 error', () => {
    httpClient.get('/test-url').subscribe({
      next: () => fail('should have failed with a 500 error'),
      error: (error) => {
        console.error('Error message:', error.message);
        expect(error.message).toContain('500 Server Error');
      },
    });
    const req = httpTestingController.expectOne('/test-url');
    req.flush('Server error', { status: 500, statusText: 'Server Error' });
  });

  it('should handle an unknown error', () => {
    httpClient.get('/test-url').subscribe({
      next: () => fail('should have failed with an unknown error'),
      error: (error) => {
        console.error('Error message:', error.message);
        expect(error.message).toContain('Unknown Error');
      },
    });
  
    const req = httpTestingController.expectOne('/test-url');
    req.flush('', { status: 0, statusText: 'Unknown Error' });
  });
});
