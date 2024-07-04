export const Fonts = {
  Merriweather:{
    "Merriweather-Black":"Merriweather-Black",
		"Merriweather-BlackItalic":"Merriweather-BlackItalic",
		"Merriweather-Bold":"Merriweather-Bold",
		"Merriweather-BoldItalic":"Merriweather-BoldItalic",
		"Merriweather-Italic":"Merriweather-Italic",
		"Merriweather-Light":"Merriweather-Light",
		"Merriweather-LightItalic":"Merriweather-LightItalic",
		"Merriweather-Regular":"Merriweather-Regular"
  }
} as const;

export type FontName = keyof typeof Fonts;