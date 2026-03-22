// from https://github.com/ShaigroRB/tools/blob/main/tools/colors.html#L147

type RGBColor = {
  r: number
  g: number
  b: number
}

function gmlToRGB(gml: number): RGBColor {
  const r = gml % 256
  const g = Math.floor(gml / 256) % 256
  const b = Math.floor(gml / 65536)
  return { r, g, b }
}
function rgbToGML({ r, g, b }: RGBColor) {
  return r + g * 256 + b * 65536
}

function hexToRGB(hex: string): RGBColor {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return { r, g, b }
}
function hexToGML(hex: string) {
  const rgb = hexToRGB(hex)
  return rgbToGML(rgb)
}

function rgbToString({ r, g, b }: RGBColor) {
  return `rgb(${r}, ${g}, ${b})`
}

function rgbToHex({ r, g, b }: RGBColor) {
  return `#${r.toString(16).padStart(2, '0')}${g
    .toString(16)
    .padStart(2, '0')}${b.toString(16).padStart(2, '0')}`
}

export function gmlToHex(gml: number) {
  return rgbToHex(gmlToRGB(gml))
}
