import { Score } from "./score.model";

export interface Game {
    id: number;
    scores: Score[];
}