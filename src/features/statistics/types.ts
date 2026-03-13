export type DiagramType = 'pictogram' | 'bar' | 'line' | 'pie' | 'area' | 'scatter' | 'radar' | 'composed';

export interface DataPoint {
    [key: string]: string | number;
}
