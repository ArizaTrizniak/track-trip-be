export interface Point {
    id: string;
    x: number;
    y: number;
    color?: string;
    label?: string;
}

export interface Road {
    startId: string;
    endId: string;
    color?: string;
    lineWidth?: number;
}

export interface DrawingModel {
    width: number;
    height: number;
    backgroundColor?: string;
    backgroundId?: string;
    points: Point[];
    roads: Road[];
}
