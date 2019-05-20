export = index;
declare class index {
  // Circular reference from index
  static Strategy: any;
  constructor(options: any, verify: any);
  name: any;
  authenticate(req: any): any;
}
