export interface Package {
    carrier: string;
    latestStatus: string;
    trackingId: number;
    timestamp: string;
}

export type Carrier = 'inpost' | 'pp' | 'dhl' | 'ups' | 'dpd';
