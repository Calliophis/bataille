export interface InGamePlayer {
    id: string;
    cards: number[];
    activeCard: number | null;
    hasPlayed: boolean;
    score: number;
}