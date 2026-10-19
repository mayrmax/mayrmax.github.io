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
  menu: {
    body: '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 5h16M4 12h16M4 19h16"/>',
    stroke: true,
  },
} as const satisfies Record<string, IconDefinition>;

export type IconName = keyof typeof icons;
