declare module 'next/server' {
  export interface NextRequest extends Request {
    json(): Promise<any>;
  }
  
  export class NextResponse {
    static json(body: any, init?: ResponseInit): NextResponse;
  }
} 