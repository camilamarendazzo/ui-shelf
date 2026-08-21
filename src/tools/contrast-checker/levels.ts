import {
  WCAG_AA_LARGE,
  WCAG_AA_NORMAL,
  WCAG_AAA_LARGE,
  WCAG_AAA_NORMAL,
} from "../../lib/contrast";

export interface WcagLevel {
  label: string;
  threshold: number;
}

export const levels: WcagLevel[] = [
  { label: "AA normal", threshold: WCAG_AA_NORMAL },
  { label: "AA large", threshold: WCAG_AA_LARGE },
  { label: "AAA normal", threshold: WCAG_AAA_NORMAL },
  { label: "AAA large", threshold: WCAG_AAA_LARGE },
];
