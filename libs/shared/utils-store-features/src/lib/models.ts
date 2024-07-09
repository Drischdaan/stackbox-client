import { Signal } from '@angular/core';
import { EntityId } from '@ngrx/signals/entities';
import { Observable, Unsubscribable } from 'rxjs';

// eslint-disable-next-line @typescript-eslint/ban-types
export type Empty = {};

export type RxMethodInput<Input> = Input | Observable<Input> | Signal<Input>;
export type RxMethod<Input> = ((
  input: RxMethodInput<Input>
) => Unsubscribable) &
  Unsubscribable;

export type Entity = { id: EntityId };
