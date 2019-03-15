import {BehaviorSubject, Observable} from 'rxjs';
import {distinctUntilChanged, shareReplay} from 'rxjs/operators';

export class Model<T> {
  protected readonly state$: BehaviorSubject<T> = new BehaviorSubject(undefined);

  constructor (data?: T) {
    if (data) {
      this.update(data);
    }
  }

  getValue(): T {
    return this.state$.getValue();
  }

  get$(): Observable<T> {
    return this.state$.asObservable().pipe(
      distinctUntilChanged(),
      shareReplay(1)
    );
  }

  update(nextState: T) {
    this.state$.next(nextState);
  }

  clear() {
    this.state$.next(undefined);
  }
}
