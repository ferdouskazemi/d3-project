declare module '@observablehq/runtime' {
    export class Inspector {
      static into: any;
      constructor(element: unknown);
  
      pending(...args: unknown[]): unknown;
  
      rejected(...args: unknown[]): unknown;
  
      fulfilled(...args: unknown[]): unknown;
    }
    export class Runtime {
      constructor();
  
      module(
        notebook: unknown,
        handler: (name: string) => Inspector | boolean,
      ): void;
  
      dispose(): void;
    }
  }