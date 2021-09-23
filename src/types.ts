export interface LoaderOptions {
  sourceMap?: boolean;
}

export interface SourceMap {
  version: number;
  sources: string[];
  mappings: string;
  file?: string;
  sourceRoot?: string;
  sourcesContent?: string[];
  names?: string[];
}

export interface AdditionalData {
  [index: string]: any;
  webpackAST: object;
}
