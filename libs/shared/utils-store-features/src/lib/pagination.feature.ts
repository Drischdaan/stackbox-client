import {
  patchState,
  SignalStoreFeature,
  signalStoreFeature,
  type,
  withMethods,
  withState,
} from '@ngrx/signals';
import { EntityState } from '@ngrx/signals/entities';
import { CrudServiceMethods, CrudServiceState } from './crud.feature';
import { Empty, Entity } from './models';

export type PaginationState = {
  page: number;
  limit: number;
};

export type PaginationMethods = {
  nextPage: () => void;
  previousPage: () => void;
  setLimit: (limit: number) => void;
  setPage: (page: number) => void;
};

export function withPagination<EntityType extends Entity>(
  defaultLimit?: number
): SignalStoreFeature<
  {
    state: EntityState<EntityType> & CrudServiceState;
    methods: CrudServiceMethods<EntityType>;
    computed: Empty;
  },
  { state: PaginationState; methods: PaginationMethods; computed: Empty }
> {
  return signalStoreFeature(
    {
      state: type<EntityState<EntityType> & CrudServiceState>(),
      methods: type<CrudServiceMethods<EntityType>>(),
    },
    withState<PaginationState>({
      page: 0,
      limit: defaultLimit ?? 10,
    }),
    withMethods((state) => {
      return {
        nextPage: () => {
          patchState(state, {
            page: Math.min(state.page() + 1, state.listInfo().totalPages),
          });
          state.loadList({ page: state.page(), limit: state.limit() });
        },
        previousPage: () => {
          patchState(state, { page: Math.max(state.page() - 1, 0) });
          state.loadList({ page: state.page(), limit: state.limit() });
        },
        setLimit: (limit: number) => {
          patchState(state, { limit: Math.max(limit, 0) });
          state.loadList({ page: state.page(), limit: state.limit() });
          state.loadListInfo({ page: state.page(), limit: state.limit() });
        },
        setPage: (page: number) => {
          patchState(state, { page: Math.max(page, 0) });
          state.loadList({ page: state.page(), limit: state.limit() });
          state.loadListInfo({ page: state.page(), limit: state.limit() });
        },
      };
    })
  );
}
