import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Configuration {
  setting1: string;
  setting2: boolean;
  setting3: number;
}

@Injectable({ providedIn: 'root' })
export class ConfigService {
  get(): Observable<Configuration> {
    // of course in real life we would fetch this from the server
    return of({
      setting1: 'human',
      setting2: true,
      setting3: 4
    });
  }
}
