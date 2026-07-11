export interface WcagLevel {
  label: string;
  threshold: number;
}

export const levels: WcagLevel[] = [
  { label: "AA normal", threshold: 4.5 },
  { label: "AA large", threshold: 3 },
  { label: "AAA normal", threshold: 7 },
  { label: "AAA large", threshold: 4.5 },
];
