/**
 * The favicon is the first segment of the prompt: the blue powerline arrow
 * with an "m". Rendered with satori so the letter is a path, not text that
 * depends on fonts installed on the visitor's machine.
 */
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

import satori from 'satori';
import sharp from 'sharp';

const BLUE = '#2c8bd2';

async function font() {
  return readFile(join(process.cwd(), 'src/og/fonts/JetBrainsMono-SemiBold.woff'));
}

/** The arrow-shaped segment, drawn into a square canvas of `size` pixels. */
async function segmentSvg(size: number, background?: string): Promise<string> {
  // Proportions of the shape inside the square; the rest stays transparent
  // (or `background`, for the iOS icon, which cannot be transparent).
  const inset = background ? Math.round(size * 0.16) : 0;
  const box = size - inset * 2;
  // A favicon has to fill its square to read at 16 pixels, so the shape takes
  // the full height and the arrow is flatter than the prompt's 45° chevron.
  const height = background ? Math.round(box * 0.78) : box;
  const arrow = Math.round(box * 0.28);
  const body = box - arrow;

  const tree = {
    type: 'div',
    props: {
      style: {
        display: 'flex',
        alignItems: 'center',
        width: size,
        height: size,
        padding: inset,
        backgroundColor: background ?? 'transparent',
      },
      children: {
        type: 'div',
        props: {
          style: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            width: body,
            height,
            backgroundColor: BLUE,
            color: '#000',
            fontFamily: 'Mono',
            fontWeight: 600,
            fontSize: Math.round(height * 0.62),
            lineHeight: 1,
          },
          children: [
            'm',
            {
              type: 'div',
              props: {
                style: {
                  position: 'absolute',
                  right: -arrow,
                  top: 0,
                  width: 0,
                  height: 0,
                  borderTop: `${height / 2}px solid transparent`,
                  borderBottom: `${height / 2}px solid transparent`,
                  borderLeft: `${arrow}px solid ${BLUE}`,
                },
              },
            },
          ],
        },
      },
    },
  };

  return satori(tree as Parameters<typeof satori>[0], {
    width: size,
    height: size,
    fonts: [{ name: 'Mono', data: await font(), weight: 600, style: 'normal' }],
  });
}

export function faviconSvg(): Promise<string> {
  return segmentSvg(64);
}

/** iOS home-screen icon: no transparency, so the arrow sits on white. */
export async function appleTouchIcon(): Promise<Buffer> {
  return sharp(Buffer.from(await segmentSvg(180, '#ffffff')))
    .png()
    .toBuffer();
}

/**
 * favicon.ico for browsers and crawlers that ask for it by name. An ICO file
 * may simply wrap PNG images, so this packs 16, 32 and 48 pixel PNGs into one.
 */
export async function faviconIco(): Promise<Buffer> {
  const svg = Buffer.from(await segmentSvg(64));
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
