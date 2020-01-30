declare module 'project-name-generator' {
  interface Options {
    alliterative?: boolean;
    number?: boolean;
    words?: number;
  }

  type Result = {
    dashed: string;
    raw: string[];
    spaced: string;
  };

  export default function(options?: Options): Result;
}
