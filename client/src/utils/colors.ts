export const COLOR_MAP: Record<string, string> = {
  'Azul Claro': '#8FB2D7',
  'Azul Médio': '#567A9F',
  'Azul Escuro': '#2A3C52',
  'Jeans Tradicional': '#3D5A80',
  'Off-White': '#F8F6F0',
  'Branco': '#FFFFFF',
  'Preto': '#1F1F1F',
  'Bege': '#DFD3C3',
  'Areia': '#D9CDB8',
  'Terracota': '#A95843',
  'Verde Militar': '#526048',
  'Caramelo': '#B87A46',
  'Cinza Mescla': '#A0A0A0',
  'Chumbo': '#3A3D40',
  'Lavanda': '#C8B6DB',
  'Rosa Seco': '#C59B9B',
};

export function getColorHex(colorName: string): string {
  return COLOR_MAP[colorName] || '#CCCCCC';
}
