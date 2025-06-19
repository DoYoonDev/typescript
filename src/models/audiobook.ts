import { RemoveTypeShow } from "./show";

export interface SimplifiedAudiobook extends RemoveTypeShow {
  authors?: {
    name?: string;
  }[];
  narrators: {
    name?: string;
  }[];
  edition?: string;
  type: "audiobook";
}