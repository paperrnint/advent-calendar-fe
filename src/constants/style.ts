export const ribbonFilter = {
  brown: 'hue-rotate(280deg) saturate(1.0) brightness(0.9)',
  red: 'hue-rotate(280deg) saturate(1.7) brightness(1.0)',
  orange: 'hue-rotate(288deg) saturate(1.9) brightness(1.2)',
  yellow: 'hue-rotate(300deg) saturate(1.6) brightness(1.4)',
  pink: 'hue-rotate(250deg) saturate(1.0) brightness(1.4)',
  lightGreen: 'hue-rotate(320deg) saturate(1.3) brightness(1.2)',
  green: '',
  blue: 'hue-rotate(120deg) saturate(0.7) brightness(1.2)',
  navy: 'hue-rotate(122deg) saturate(0.9) brightness(0.9)',
  violet: 'hue-rotate(191deg) saturate(1.2) brightness(0.8)',
} as const;

export type RibbonColor = keyof typeof ribbonFilter;
