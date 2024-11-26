export interface Module {
    id: number;
    name: string;
  }
  
  export interface Action {
    id: number;
    name: string;
    description?: string;
  }
  
  export interface Role {
    id: number;
    name: string;
    description?: string;
  }
  
  export interface User {
    id: number;
    username: string;
    email: string;
  }
  
  export interface ModuleAction {
    moduleId: number;
    actionId: number;
  }
  