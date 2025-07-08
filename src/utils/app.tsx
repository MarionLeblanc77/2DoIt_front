export default function getNbColumns(): number {
  const screenWidth = window.innerWidth;

  if (screenWidth > 1200) return 4;
  if (screenWidth > 768) return 3;
  if (screenWidth > 576) return 2;
  return 1;
}

