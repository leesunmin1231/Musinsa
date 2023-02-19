import { CharacterType } from './CharacterType';

export interface RenderCharacterList {
  prevPage: CharacterType[];
  allRenderList: CharacterType[];
}

export interface ResponseCharacterList {
  allResponseList: CharacterType[];
  newPage: CharacterType[];
}
