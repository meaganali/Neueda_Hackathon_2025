declare module '@astrajs/collections' {
  export interface AstraClientOptions {
    astraDatabaseId: string;
    astraDatabaseRegion: string;
    applicationToken: string;
  }

  export interface AstraCollection {
    create(document: any): Promise<any>;
    update(id: string, document: any): Promise<any>;
    get(id: string): Promise<any>;
    find(query: any): Promise<{ data: any[] }>;
    delete(id: string): Promise<any>;
  }

  export interface AstraNamespace {
    collection(name: string): AstraCollection;
    createCollection(name: string): Promise<void>;
  }

  export interface AstraClient {
    namespace(name: string): AstraNamespace;
  }

  export function createClient(options: AstraClientOptions): Promise<AstraClient>;
}

declare module '@astrajs/rest' {
  export interface AstraRestClientOptions {
    astraDatabaseId: string;
    astraDatabaseRegion: string;
    applicationToken: string;
  }

  export interface AstraRestClient {
    get(path: string): Promise<any>;
    post(path: string, body: any): Promise<any>;
    put(path: string, body: any): Promise<any>;
    delete(path: string): Promise<any>;
  }

  export function createClient(options: AstraRestClientOptions): Promise<AstraRestClient>;
}
