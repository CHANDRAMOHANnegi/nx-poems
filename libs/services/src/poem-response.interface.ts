import { Poem } from '@poems-app/models';

export interface PoemResponse {
  title: string;
  author: string;
  lines: string[];
  linecount: string;
  similarity?: number;
}

export function mapPoemResponseToPoem(response: PoemResponse): Poem {
  return {
    title: response.title,
    author: response.author,
    lines: response.lines,
    lineCount: parseInt(response.linecount, 10),
  };
}
