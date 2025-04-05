import 'next/navigation';

declare module 'next/navigation' {
  export function useParams(): { [key: string]: string | string[] };
  export function useSearchParams(): URLSearchParams;
  export function usePathname(): string;
  export function useRouter(): {
    push: (url: string) => void;
    replace: (url: string) => void;
    back: () => void;
    forward: () => void;
  };
}

declare module 'next/server' {
  export interface NextRequest extends Request {
    json(): Promise<any>;
  }
  
  export class NextResponse {
    static json(body: any, init?: ResponseInit): NextResponse;
  }
} 