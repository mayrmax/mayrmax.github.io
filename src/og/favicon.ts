/**
 * The mark: an "m" followed by the prompt's green cursor, white on black. It
 * stands beside the name in the navigation and is the favicon. Rendered with
 * satori so the letter is a path, not text that depends on fonts installed on
 * the visitor's machine.
 */
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

import satori from 'satori';
import sharp from 'sharp';

const GREEN = '#859916';

async function font() {
  return readFile(join(process.cwd(), 'src/og/fonts/JetBrainsMono-SemiBold.woff'));
}

/**
 * The mark on a black square of `size` pixels. The favicon has rounded
 * corners; the iOS icon is square, as iOS rounds it itself.
 */
async function markSvg(size: number, rounded = true): Promise<string> {
  // Proportions are those of a 64 pixel tile; the iOS icon draws the mark a
  // little smaller, since iOS crops into the corners.
  const unit = (rounded ? size : size * 0.8) / 64;

  const tree = {
    type: 'div',
    props: {
      style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 5 * unit,
        width: size,
        height: size,
        borderRadius: rounded ? size * 0.125 : 0,
        backgroundColor: '#000',
        color: '#fff',
        fontFamily: 'Mono',
        fontWeight: 600,
        fontSize: 40 * unit,
        lineHeight: 1,
      },
      children: [
        'm',
        {
          type: 'div',
          props: { style: { width: 11 * unit, height: 31 * unit, backgroundColor: GREEN } },
        },
      ],
    },
  };

  return satori(tree as Parameters<typeof satori>[0], {
    width: size,
    height: size,
    fonts: [{ name: 'Mono', data: await font(), weight: 600, style: 'normal' }],
  });
}

export function faviconSvg(): Promise<string> {
  return markSvg(64);
}

/** iOS home-screen icon: square and opaque, iOS adds the rounding. */
export async function appleTouchIcon(): Promise<Buffer> {
  return sharp(Buffer.from(await markSvg(180, false)))
    .png()
    .toBuffer();
}

/**
 * favicon.ico for browsers and crawlers that ask for it by name. An ICO file
 * may simply wrap PNG images, so this packs 16, 32 and 48 pixel PNGs into one.
 */
export async function faviconIco(): Promise<Buffer> {
  const svg = Buffer.from(await markSvg(64));
  const sizes = [16, 32, 48];
  const images = await Promise.all(
    sizes.map((size) => sharp(svg).resize(size, size).png().toBuffer()),
  );

  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(images.length, 4);

  let offset = header.length + images.length * 16;
  const entries = images.map((image, index) => {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(sizes[index], 0); // width
    entry.writeUInt8(sizes[index], 1); // height
    entry.writeUInt8(0, 2); // no palette
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // colour planes
    entry.writeUInt16LE(32, 6); // bits per pixel
    entry.writeUInt32LE(image.length, 8);
    entry.writeUInt32LE(offset, 12);
    offset += image.length;
    return entry;
  });

  return Buffer.concat([header, ...entries, ...images]);
}
