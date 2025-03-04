import { inject, ProviderToken } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import {
  patchState,
  SignalStoreFeature,
  signalStoreFeature,
  type,
  withMethods,
  withState,
} from '@ngrx/signals';
import {
  addEntity,
  EntityId,
  EntityState,
  removeEntity,
  setAllEntities,
  updateEntity,
} from '@ngrx/signals/entities';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import {
  DeletionResult,
  PaginationInfoDto,
  PaginationOptionsDto,
} from '@stackbox/api-stackbox';
import { Observable, pipe, switchMap, tap } from 'rxjs';
import { Empty, Entity, RxMethod } from './models';

export type CrudServiceState = {
  isLoadingList: boolean;
  isLoadingById: boolean;
  isSaving: boolean;
  paginationInfo: PaginationInfoDto;
};

export type CreateDto<Entity> = Partial<Entity>;
export type UpdateDto<Entity> = Partial<Entity>;

export interface IPaginationDto<Entity> {
  meta: PaginationInfoDto;
  items: Entity[];
}

export interface ICrudService<TEntity extends { id: EntityId }> {
  getPaginatedList(
    options?: PaginationOptionsDto
  ): Observable<IPaginationDto<TEntity>>;
  getById(id: string): Observable<TEntity>;
  create(createDto: CreateDto<TEntity>): Observable<TEntity>;
  update(id: string, updateDto: UpdateDto<TEntity>): Observable<TEntity>;
  delete(id: string): Observable<DeletionResult>;
}

export type CrudServiceMethods<EntityType extends Entity> = {
  loadList: RxMethod<PaginationOptionsDto>;
  loadById: RxMethod<string>;
  create: RxMethod<CreateDto<EntityType>>;
  update: RxMethod<{ id: string; updateDto: UpdateDto<EntityType> }>;
  delete: RxMethod<string>;
};

export function withCrudService<EntityType extends Entity>(
  serviceToken: ProviderToken<ICrudService<EntityType>>
): SignalStoreFeature<
  {
    state: EntityState<EntityType>;
    methods: Empty;
    computed: Empty;
  },
  {
    state: CrudServiceState;
    methods: CrudServiceMethods<EntityType>;
    computed: Empty;
  }
> {
  return signalStoreFeature(
    { state: type<EntityState<EntityType>>() },
    withState<CrudServiceState>({
      isLoadingList: false,
      isLoadingById: false,
      isSaving: false,
      paginationInfo: {
        totalItems: 0,
        totalPages: 0,
      },
    }),
    withMethods((state) => {
      const service: ICrudService<EntityType> = inject(serviceToken);
      return {
        loadList: rxMethod<PaginationOptionsDto>(
          pipe(
            tap(() => patchState(state, { isLoadingList: true })),
            switchMap((options) =>
              service.getPaginatedList(options).pipe(
                tapResponse({
                  next: (paginationDto) =>
                    patchState(state, setAllEntities(paginationDto.items), {
                      paginationInfo: paginationDto.meta,
                    }),
                  error: console.error,
                  finalize: () => patchState(state, { isLoadingList: false }),
                })
              )
            )
          )
        ),
        loadById: rxMethod<string>(
          pipe(
            tap(() => patchState(state, { isLoadingById: true })),
            switchMap((id) =>
              service.getById(id).pipe(
                tapResponse({
                  next: (entity) => patchState(state, addEntity(entity)),
                  error: console.error,
                  finalize: () => patchState(state, { isLoadingById: false }),
                })
              )
            )
          )
        ),
        create: rxMethod<CreateDto<EntityType>>(
          pipe(
            tap(() => patchState(state, { isSaving: true })),
            switchMap((createDto) =>
              service.create(createDto).pipe(
                tapResponse({
                  next: (entity) => patchState(state, addEntity(entity)),
                  error: console.error,
                  finalize: () => patchState(state, { isSaving: false }),
                })
              )
            )
          )
        ),
        update: rxMethod<{ id: string; updateDto: UpdateDto<EntityType> }>(
          pipe(
            tap(() => patchState(state, { isSaving: true })),
            switchMap((options) =>
              service.update(options.id, options.updateDto).pipe(
                tapResponse({
                  next: (entity) =>
                    patchState(
                      state,
                      updateEntity({ id: entity.id, changes: entity })
                    ),
                  error: console.error,
                  finalize: () => patchState(state, { isSaving: false }),
                })
              )
            )
          )
        ),
        delete: rxMethod<string>(
          pipe(
            tap(() => patchState(state, { isSaving: true })),
            switchMap((id) =>
              service.delete(id).pipe(
                tapResponse({
                  next: () => patchState(state, removeEntity(id)),
                  error: console.error,
                  finalize: () => patchState(state, { isSaving: false }),
                })
              )
            )
          )
        ),
      };
    })
  );
}
