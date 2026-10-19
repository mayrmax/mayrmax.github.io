/**
 * Inline SVG path data, so the site ships no icon font or icon library.
 *
 * From Lucide (ISC), drawn on a 24x24 viewBox. Rendered by Icon.astro.
 */
export interface IconDefinition {
  body: string;
  /** Filled brand marks vs. stroked interface marks. */
  stroke: boolean;
}

export const icons = {
  moon: {
    body: '<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>',
    stroke: true,
  },
  sun: {
    body: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>',
    stroke: true,
  },
  menu: {
    body: '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 5h16M4 12h16M4 19h16"/>',
    stroke: true,
  },
} as const satisfies Record<string, IconDefinition>;

export type IconName = keyof typeof icons;
