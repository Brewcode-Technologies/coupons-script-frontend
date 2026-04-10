import { getFontCombination, type FontCombination } from './fontCombinations';

export class FontManager {
  private static instance: FontManager;
  private currentCombination: FontCombination = 'modern';
  private observer: MutationObserver | null = null;

  static getInstance(): FontManager {
    if (!FontManager.instance) {
      FontManager.instance = new FontManager();
    }
    return FontManager.instance;
  }

  initialize() {
    // Start observing DOM changes to apply fonts to new elements
    this.startObserving();
    
    // Apply fonts to existing elements
    this.applyFontsToAllElements();
  }

  setFontCombination(combination: FontCombination) {
    this.currentCombination = combination;
    const fonts = getFontCombination(combination);
    
    // Update CSS variables
    document.documentElement.style.setProperty('--heading-font', fonts.heading);
    document.documentElement.style.setProperty('--body-font', fonts.body);
    document.documentElement.style.setProperty('--mono-font', fonts.mono);
    
    // Apply to all existing elements
    this.applyFontsToAllElements();
    
    console.log('Font combination changed to:', combination, fonts);
  }

  private applyFontsToAllElements() {
    const fonts = getFontCombination(this.currentCombination);
    
    // Apply to body first
    document.body.style.fontFamily = fonts.body;
    
    // Apply to all elements
    this.applyFontsToElements(document.body, fonts);
    
    // Force reflow
    document.body.offsetHeight;
  }

  private applyFontsToElements(container: Element, fonts: { heading: string; body: string; mono: string }) {
    const elements = container.querySelectorAll('*');
    
    elements.forEach(element => {
      const el = element as HTMLElement;
      const tagName = el.tagName.toLowerCase();
      const classList = Array.from(el.classList);
      
      // Skip if element already has inline font-family that's not from our system
      const currentFont = el.style.fontFamily;
      if (currentFont && !this.isOurFont(currentFont)) {
        return;
      }
      
      // Apply heading font
      if (this.isHeadingElement(tagName, classList)) {
        el.style.fontFamily = fonts.heading;
        el.style.setProperty('font-family', fonts.heading, 'important');
      }
      // Apply mono font
      else if (this.isMonoElement(tagName, classList)) {
        el.style.fontFamily = fonts.mono;
        el.style.setProperty('font-family', fonts.mono, 'important');
      }
      // Apply body font
      else {
        el.style.fontFamily = fonts.body;
        el.style.setProperty('font-family', fonts.body, 'important');
      }
    });
  }

  private isHeadingElement(tagName: string, classList: string[]): boolean {
    return ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(tagName) ||
           classList.some(cls => cls.includes('heading') || cls.includes('title') || 
                                cls.startsWith('MuiTypography-h'));
  }

  private isMonoElement(tagName: string, classList: string[]): boolean {
    return ['code', 'pre', 'kbd', 'samp'].includes(tagName) ||
           classList.some(cls => cls.includes('mono') || cls.includes('code') || 
                                cls.includes('font-mono'));
  }

  private isOurFont(fontFamily: string): boolean {
    const ourFonts = ['Inter', 'Roboto', 'Fira Code', 'Playfair Display', 'Source Sans Pro', 
                      'Monaco', 'Poppins', 'Open Sans', 'Consolas', 'Crimson Text', 'Lato',
                      'JetBrains Mono', 'IBM Plex Sans', 'Nunito', 'Nunito Sans', 'Source Code Pro',
                      'Merriweather', 'PT Sans', 'Menlo', 'Montserrat', 'Raleway', 'SF Mono',
                      'Oswald', 'Roboto Condensed', 'Roboto Mono'];
    
    return ourFonts.some(font => fontFamily.includes(font));
  }

  private startObserving() {
    if (this.observer) {
      this.observer.disconnect();
    }

    this.observer = new MutationObserver((mutations) => {
      const fonts = getFontCombination(this.currentCombination);
      
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            this.applyFontsToElements(node as Element, fonts);
          }
        });
      });
    });

    this.observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  destroy() {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
  }
}

// Global font manager instance
export const fontManager = FontManager.getInstance();