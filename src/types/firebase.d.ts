/// <reference types="@firebase/app-types" />
/// <reference types="@firebase/auth-types" />
/// <reference types="@firebase/firestore-types" />
/// <reference types="@firebase/messaging-types" />
/// <reference types="@firebase/storage-types" />

declare global {
  interface Window {
    FIREBASE_CONFIG: {
      apiKey: string;
      authDomain: string;
      projectId: string;
      storageBucket: string;
      messagingSenderId: string;
      appId: string;
    };
  }
}

declare module 'firebase/messaging' {
  interface MessagingPayload {
    notification?: {
      title?: string;
      body?: string;
      image?: string;
    };
    data?: {
      [key: string]: string;
    };
  }
}

declare module 'firebase/app' {
  export interface FirebaseApp {}
  export function initializeApp(config: any): FirebaseApp;
  export function getApps(): FirebaseApp[];
}

declare module 'firebase/auth' {
  import { FirebaseApp } from 'firebase/app';
  
  export interface User {
    uid: string;
    email: string | null;
    displayName: string | null;
    photoURL: string | null;
  }

  export interface Auth {
    currentUser: User | null;
    signOut(): Promise<void>;
  }

  export class GoogleAuthProvider {
    constructor();
  }

  export class FacebookAuthProvider {
    constructor();
  }

  export function getAuth(app: FirebaseApp): Auth;
  export function signInWithPopup(auth: any, provider: any): Promise<any>;
  export function onAuthStateChanged(auth: any, callback: (user: User | null) => void): () => void;
}

declare module 'firebase/firestore' {
  import { FirebaseApp } from 'firebase/app';

  export interface DocumentData {
    [key: string]: any;
  }

  export interface QuerySnapshot<T = DocumentData> {
    docs: Array<DocumentSnapshot<T>>;
  }

  export interface DocumentSnapshot<T = DocumentData> {
    id: string;
    exists(): boolean;
    data(): T | undefined;
  }

  export function getFirestore(app: FirebaseApp): any;
  export function collection(firestore: any, path: string): any;
  export function doc(firestore: any, path: string, ...pathSegments: string[]): any;
  export function query(query: any, ...queryConstraints: any[]): any;
  export function where(field: string, opStr: string, value: any): any;
  export function orderBy(field: string, directionStr?: 'asc' | 'desc'): any;
  export function limit(limit: number): any;
  export function getDocs(query: any): Promise<QuerySnapshot>;
  export function getDoc(reference: any): Promise<DocumentSnapshot>;
  export function updateDoc(reference: any, data: any): Promise<void>;
  export function onSnapshot(reference: any, callback: (snapshot: any) => void): () => void;
}

declare module 'firebase/storage' {
  import { FirebaseApp } from 'firebase/app';
  export function getStorage(app: FirebaseApp): any;
}

declare module 'firebase/messaging' {
  import { FirebaseApp } from 'firebase/app';
  export function getMessaging(app: FirebaseApp): any;
  export function isSupported(): Promise<boolean>;
}

declare module 'next/navigation' {
  export function useRouter(): {
    push: (url: string) => void;
  };
} 