import { Injectable } from '@angular/core';
import {
  DeletionResult,
  PaginationInfoDto,
  PaginationOptionsDto,
  WorkspaceCreateDto,
  WorkspaceEntity,
  WorkspacesService,
} from '@stackbox/api-stackbox';
import { ICrudService } from '@stackbox/utils-store-features';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class WorkspacesCrudService implements ICrudService<WorkspaceEntity> {
  constructor(private readonly workspacesService: WorkspacesService) {}

  getPaginationInfo(
    options?: PaginationOptionsDto
  ): Observable<PaginationInfoDto> {
    return this.workspacesService.getWorkspacesListInfo(
      options?.page,
      options?.limit
    );
  }

  getList(options?: PaginationOptionsDto): Observable<WorkspaceEntity[]> {
    return this.workspacesService.getWorkspacesList(
      options?.page,
      options?.limit
    );
  }

  getById(id: string): Observable<WorkspaceEntity> {
    return this.workspacesService.getWorkspaceById(id);
  }

  create(createDto: Partial<WorkspaceEntity>): Observable<WorkspaceEntity> {
    return this.workspacesService.createWorkspace(
      createDto as WorkspaceCreateDto
    );
  }

  update(
    id: string,
    updateDto: Partial<WorkspaceEntity>
  ): Observable<WorkspaceEntity> {
    return this.workspacesService.updateWorkspace(
      id,
      updateDto as WorkspaceCreateDto
    );
  }

  delete(id: string): Observable<DeletionResult> {
    return this.workspacesService.deleteWorkspace(id);
  }
}
