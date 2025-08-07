export default function stringToColor(str: string) {
  let hash = 0;
  for (let i = 0; i < str.length; i += 1) {
    // eslint-disable-next-line no-bitwise
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  const hue = Math.abs(hash % 360);
  const saturation = 65 + (Math.abs(hash) % 20);
  const lightness = 50 + (Math.abs(hash) % 15);

  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}
