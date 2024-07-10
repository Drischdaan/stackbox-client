import { signalStore } from '@ngrx/signals';
import { withEntities } from '@ngrx/signals/entities';
import { WorkspaceEntity } from '@stackbox/api-stackbox';
import { withCrudService } from '@stackbox/utils-store-features';
import { WorkspacesCrudService } from './workspaces.crud-service';

export const WorkspacesStore = signalStore(
  { providedIn: 'root' },
  withEntities<WorkspaceEntity>(),
  withCrudService<WorkspaceEntity>(WorkspacesCrudService)
);

export type WorkspacesStore = InstanceType<typeof WorkspacesStore>;
