// Font combinations optimized for coupon applications
export const FONT_COMBINATIONS = {
  modern: {
    heading: 'Inter, system-ui, -apple-system, sans-serif',
    body: 'Roboto, system-ui, -apple-system, sans-serif',
    mono: '"Fira Code", "JetBrains Mono", Consolas, monospace'
  },
  classic: {
    heading: '"Playfair Display", Georgia, serif',
    body: '"Source Sans Pro", system-ui, -apple-system, sans-serif',
    mono: 'Monaco, "Lucida Console", monospace'
  },
  minimal: {
    heading: 'Poppins, system-ui, -apple-system, sans-serif',
    body: '"Open Sans", system-ui, -apple-system, sans-serif',
    mono: 'Consolas, "Courier New", monospace'
  },
  elegant: {
    heading: '"Crimson Text", Georgia, serif',
    body: 'Lato, system-ui, -apple-system, sans-serif',
    mono: '"Courier New", Courier, monospace'
  },
  tech: {
    heading: '"JetBrains Mono", "Fira Code", Consolas, monospace',
    body: '"IBM Plex Sans", system-ui, -apple-system, sans-serif',
    mono: '"JetBrains Mono", "Fira Code", Consolas, monospace'
  },
  friendly: {
    heading: 'Nunito, system-ui, -apple-system, sans-serif',
    body: '"Nunito Sans", system-ui, -apple-system, sans-serif',
    mono: '"Source Code Pro", "Fira Code", monospace'
  },
  professional: {
    heading: 'Merriweather, Georgia, serif',
    body: '"PT Sans", system-ui, -apple-system, sans-serif',
    mono: 'Menlo, Monaco, "Lucida Console", monospace'
  },
  creative: {
    heading: 'Montserrat, system-ui, -apple-system, sans-serif',
    body: 'Raleway, system-ui, -apple-system, sans-serif',
    mono: '"SF Mono", Monaco, "Lucida Console", monospace'
  },
  clean: {
    heading: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
    body: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
    mono: 'ui-monospace, "SF Mono", Monaco, monospace'
  },
  bold: {
    heading: 'Oswald, Impact, "Arial Black", sans-serif',
    body: '"Roboto Condensed", system-ui, -apple-system, sans-serif',
    mono: '"Roboto Mono", "Fira Code", monospace'
  }
} as const;

export type FontCombination = keyof typeof FONT_COMBINATIONS;

export function getFontCombination(combination: FontCombination = 'modern') {
  return FONT_COMBINATIONS[combination] || FONT_COMBINATIONS.modern;
}

// Google Fonts URLs for each combination
export const GOOGLE_FONTS_URLS = {
  modern: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Roboto:wght@300;400;500;700&family=Fira+Code:wght@300;400;500&display=swap',
  classic: 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Source+Sans+Pro:wght@300;400;600;700&display=swap',
  minimal: 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Open+Sans:wght@300;400;500;600;700&display=swap',
  elegant: 'https://fonts.googleapis.com/css2?family=Crimson+Text:wght@400;600;700&family=Lato:wght@300;400;700&display=swap',
  tech: 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600&family=IBM+Plex+Sans:wght@300;400;500;600;700&display=swap',
  friendly: 'https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;500;600;700&family=Nunito+Sans:wght@300;400;500;600;700&family=Source+Code+Pro:wght@300;400;500&display=swap',
  professional: 'https://fonts.googleapis.com/css2?family=Merriweather:wght@300;400;700&family=PT+Sans:wght@400;700&display=swap',
  creative: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&family=Raleway:wght@300;400;500;600;700&display=swap',
  clean: '', // Uses system fonts, no Google Fonts needed
  bold: 'https://fonts.googleapis.com/css2?family=Oswald:wght@300;400;500;600;700&family=Roboto+Condensed:wght@300;400;700&family=Roboto+Mono:wght@300;400;500&display=swap'
};

export function getFontUrl(combination: FontCombination = 'modern') {
  return GOOGLE_FONTS_URLS[combination] || GOOGLE_FONTS_URLS.modern;
}