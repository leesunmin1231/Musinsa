export interface CharacterType {
  name: string;
  aliases: string[];
  title: string;
  books: string[];
  tvSeries: string[];
  gender: string;
  died: string;
  born: string;
  url: string;
}

export interface RenderCharacterList {
  prevPage: CharacterType[];
  allRenderList: CharacterType[];
}

export interface ResponseCharacterList {
  allResponseList: CharacterType[];
  newPage: CharacterType[];
}
export interface PaginationOption {
  startPage: number;
  pageSize: number;
}
