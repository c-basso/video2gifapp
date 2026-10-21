const fs = require('fs');

let sharp = null;
try {
  sharp = require('sharp');
} catch {
  // sharp ships native binaries per OS/CPU; fall back to header parsing (PNG / WebP / JPEG).
}

/** Width/height from the file header, without native dependencies. */
function readHeaderDimensions(buf) {
  if (buf.slice(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))) {
    return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
  }
  if (buf.toString('ascii', 0, 4) === 'RIFF' && buf.toString('ascii', 8, 12) === 'WEBP') {
    const chunk = buf.toString('ascii', 12, 16);
    if (chunk === 'VP8X') return { width: 1 + buf.readUIntLE(24, 3), height: 1 + buf.readUIntLE(27, 3) };
    if (chunk === 'VP8 ') return { width: buf.readUInt16LE(26) & 0x3fff, height: buf.readUInt16LE(28) & 0x3fff };
    if (chunk === 'VP8L') {
      const bits = buf.readUInt32LE(21);
      return { width: (bits & 0x3fff) + 1, height: ((bits >> 14) & 0x3fff) + 1 };
    }
  }
  if (buf[0] === 0xff && buf[1] === 0xd8) {
    let i = 2;
    while (i < buf.length) {
      const marker = buf[i + 1];
      const len = buf.readUInt16BE(i + 2);
      if (marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker)) {
        return { width: buf.readUInt16BE(i + 7), height: buf.readUInt16BE(i + 5) };
      }
      i += 2 + len;
    }
  }
  return null;
}

/**
 * Read pixel width/height from a local image file.
 * Shared by `build/build.js` and validators — not validation-only.
 *
 * @param {string} imagePath absolute path
 * @returns {Promise<{ width: number, height: number }>}
 */
async function readImageDimensions(imagePath) {
  if (sharp) {
    const meta = await sharp(imagePath).metadata();
    if (meta.width != null && meta.height != null) {
      return { width: meta.width, height: meta.height };
    }
  }
  const dims = readHeaderDimensions(fs.readFileSync(imagePath));
  if (!dims) {
    throw new Error(`could not read dimensions: ${imagePath}`);
  }
  return dims;
}

module.exports = { readImageDimensions };
