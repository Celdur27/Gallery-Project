import { Component, Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpProgressEvent, HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/delay';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/concat';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Gallery Application';
}

@Injectable()
export class UploadInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url === "saveUrl") {
      let events: Observable<HttpEvent<any>>[] = [0, 30, 60, 100].map((x) => Observable.of(<HttpProgressEvent>{
        type: HttpEventType.UploadProgress,
        loaded: x,
        total: 100
      }).delay(1000));

      const success = Observable.of(new HttpResponse({ status: 200 })).delay(1000);
      events.push(success);

      return Observable.concat(...events);
    }

    if (req.url === "removeUrl") {
        return Observable.of(new HttpResponse({ status: 200 }));
    }

    return next.handle(req);
  }
}