import { Injectable } from '@angular/core';

@Injectable()
export class MessagesService {
  // Modules
  readonly blog: string = 'Blog';

  add(module: string): string {
    return `${module} added successfully !`
  }
}
