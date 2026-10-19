/**
 * Renders a page's social preview: the powerline prompt with a page-specific
 * command, the page's claim set large, and the portrait on the right. Built at
 * build time with satori (layout to SVG) and sharp (SVG to JPEG); nothing here
 * reaches the browser.
 */
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

import satori from 'satori';
import sharp from 'sharp';

const WIDTH = 1200;
const HEIGHT = 630;
const PORTRAIT_WIDTH = 430;

// Resolved from the project root: the build always runs there, while
// import.meta.url would point into the bundled output instead.
const root = process.cwd();
const asset = (...parts: string[]) => readFile(join(root, ...parts));

type Style = Record<string, string | number>;
type Child = Element | string | null | false;
interface Element {
  type: string;
  props: {
    style?: Style;
    src?: string;
    width?: number;
    height?: number;
    children?: Child | Child[];
  };
}

function h(type: string, style: Style, ...children: Child[]): Element {
  const kept = children.filter((child) => child !== null && child !== false);
  return { type, props: { style, children: kept.length === 1 ? kept[0] : kept } };
}

let shared: Promise<{ fonts: Parameters<typeof satori>[1]['fonts']; portrait: string }> | undefined;

/** Fonts and the portrait are the same for every card, so load them once. */
function loadShared() {
  shared ??= (async () => {
    const [hankenRegular, hankenBold, monoRegular, monoSemiBold, portrait] = await Promise.all([
      asset('src/og/fonts/HankenGrotesk-Regular.woff'),
      asset('src/og/fonts/HankenGrotesk-Bold.woff'),
      asset('src/og/fonts/JetBrainsMono-Regular.woff'),
      asset('src/og/fonts/JetBrainsMono-SemiBold.woff'),
      // satori cannot decode WebP, so the portrait is handed over as JPEG.
      asset('public/assets/images/me.webp').then((webp) =>
        sharp(webp)
          .resize(PORTRAIT_WIDTH * 2, HEIGHT * 2, { fit: 'cover', position: 'attention' })
          .jpeg({ quality: 85 })
          .toBuffer(),
      ),
    ]);
    return {
      fonts: [
        { name: 'Hanken', data: hankenRegular, weight: 400 as const, style: 'normal' as const },
        { name: 'Hanken', data: hankenBold, weight: 700 as const, style: 'normal' as const },
        { name: 'Mono', data: monoRegular, weight: 400 as const, style: 'normal' as const },
        { name: 'Mono', data: monoSemiBold, weight: 600 as const, style: 'normal' as const },
      ],
      portrait: `data:image/jpeg;base64,${portrait.toString('base64')}`,
    };
  })();
  return shared;
}

const SEGMENTS: Array<[string, string]> = [
  ['max', '#2c8bd2'],
  ['~', '#ff6059'],
  ['$', '#859916'],
];

function prompt(command: string): Element {
  const height = 40;
  const arrow = height / 2;
  // Laid out right to left, so each segment is painted after the one to its
  // right and its arrow overlaps the next colour instead of hiding under it.
  const segments = h(
    'div',
    { display: 'flex', flexDirection: 'row-reverse', alignItems: 'center', flexShrink: 0 },
    ...[...SEGMENTS].reverse().map(([text, colour], index, all) =>
      h(
        'div',
        {
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          height,
          paddingLeft: index === all.length - 1 ? 10 : 22,
          paddingRight: 8,
          backgroundColor: colour,
          color: '#000',
        },
        text,
        h('div', {
          position: 'absolute',
          right: -arrow,
          top: 0,
          width: 0,
          height: 0,
          borderTop: `${arrow}px solid transparent`,
          borderBottom: `${arrow}px solid transparent`,
          borderLeft: `${arrow}px solid ${colour}`,
        }),
      ),
    ),
  );

  // Short commands sit beside the prompt; the home page's long one gets its own line.
  const inline = command.length <= 22;
  const tokens = command.split(' ');
  const line = h(
    'div',
    {
      display: 'flex',
      alignItems: 'center',
      fontWeight: 400,
      marginLeft: inline ? 34 : 0,
      marginTop: inline ? 0 : 14,
    },
    ...tokens.map((token, index) =>
      h(
        'span',
        { color: token.startsWith('--') ? '#666' : '#000', whiteSpace: 'pre' },
        index ? ` ${token}` : token,
      ),
    ),
    h('div', { width: 13, height: 26, marginLeft: 4, backgroundColor: '#000' }),
  );

  return h(
    'div',
    {
      display: 'flex',
      flexDirection: inline ? 'row' : 'column',
      alignItems: inline ? 'center' : 'flex-start',
      fontFamily: 'Mono',
      fontWeight: 600,
      fontSize: 22,
    },
    segments,
    line,
  );
}

export interface CardContent {
  /** Typed after the prompt, e.g. `whoami`. */
  command: string;
  /** The page's claim, set large. */
  headline: string;
  /** Shown beside the name in the footer. */
  role: string;
}

export async function renderCard({ command, headline, role }: CardContent): Promise<Buffer> {
  const { fonts, portrait } = await loadShared();
  const size = headline.length <= 30 ? 66 : headline.length <= 56 ? 56 : 48;
  // Keep hyphenated compounds such as "KI-Beratung" whole: a word joiner after
  // the hyphen removes the break opportunity, so the line wraps before the word.
  const text = headline.replace(/(\p{L})-(\p{L})/gu, '$1-\u2060$2');

  const tree = h(
    'div',
    {
      display: 'flex',
      width: WIDTH,
      height: HEIGHT,
      backgroundColor: '#fff',
      fontFamily: 'Hanken',
      color: '#000',
    },
    h(
      'div',
      {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: WIDTH - PORTRAIT_WIDTH,
        padding: '64px 56px 56px 72px',
      },
      prompt(command),
      h(
        'div',
        { display: 'flex', fontSize: size, fontWeight: 700, lineHeight: 1.05, letterSpacing: -1.5 },
        text,
      ),
      h(
        'div',
        {
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          borderTop: '2px solid #000',
          paddingTop: 18,
          fontSize: 21,
        },
        h(
          'div',
          { display: 'flex' },
          h('span', { fontWeight: 700 }, 'Max Mayr'),
          h('span', { whiteSpace: 'pre' }, `, ${role}`),
        ),
        h('div', { fontFamily: 'Mono', fontSize: 19, color: '#666' }, 'mayrmax.com'),
      ),
    ),
    {
      type: 'img',
      props: {
        src: portrait,
        width: PORTRAIT_WIDTH,
        height: HEIGHT,
        style: { objectFit: 'cover' },
      },
    },
  );

  const svg = await satori(tree as Parameters<typeof satori>[0], {
    width: WIDTH,
    height: HEIGHT,
    fonts,
  });
  return sharp(Buffer.from(svg)).jpeg({ quality: 88, mozjpeg: true }).toBuffer();
}
