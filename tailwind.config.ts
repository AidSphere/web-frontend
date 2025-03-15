import type { Config } from "tailwindcss";
import { heroui } from "@heroui/react";

export default {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	"./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			background: 'var(--background)',
  			foreground: 'var(--foreground)',
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate"), heroui(
	{
		layout: {
			disabledOpacity: "0.5", // opacity-[0.3]
			radius: {
				small: 'calc(var(--radius) - 4px)',
				medium: 'calc(var(--radius) - 2px)',
				large: 'var(--radius)',
			},
			borderWidth: {
			  small: "1px", // border-small
			  medium: "1px", // border-medium
			  large: "2px", // border-large
			},
			fontSize: {
				tiny: "0.75rem", // text-tiny
				small: "0.875rem", // text-small
				medium: "1rem", // text-medium
				large: "1.728rem", // text-large
			  },
			  lineHeight: {
				tiny: "1rem", // text-tiny
				small: "1.25rem", // text-small
				medium: "1.5rem", // text-medium
				large: "1.75rem", // text-large
			  },
		  },
		  themes: {
			"light": {
			  colors: {
				default: {
				  50: "#fafafa",
				  100: "#f4f4f4",
				  200: "#ededed",
				  300: "#e6e6e6",
				  400: "#e0e0e0",
				  500: "#d9d9d9",
				  600: "#b3b3b3",
				  700: "#8d8d8d",
				  800: "#676767",
				  900: "#414141",
				  foreground: "#000",
				  DEFAULT: "#d9d9d9"
				},
				primary: {
				  50: "#fee6f1",
				  100: "#fec4de",
				  200: "#fda1cb",
				  300: "#fc7fb8",
				  400: "#fb5ca4",
				  500: "#fa3a91",
				  600: "#ce3078",
				  700: "#a3265e",
				  800: "#771c45",
				  900: "#4b112c",
				  foreground: "#000",
				  DEFAULT: "#fa3a91"
				},
				secondary: {
				  50: "#dfedfd",
				  100: "#b3d4fa",
				  200: "#86bbf7",
				  300: "#59a1f4",
				  400: "#2d88f1",
				  500: "#006fee",
				  600: "#005cc4",
				  700: "#00489b",
				  800: "#003571",
				  900: "#002147",
				  foreground: "#fff",
				  DEFAULT: "#006fee"
				},
				success: {
				  50: "#e2f8ec",
				  100: "#b9efd1",
				  200: "#91e5b5",
				  300: "#68dc9a",
				  400: "#40d27f",
				  500: "#17c964",
				  600: "#13a653",
				  700: "#0f8341",
				  800: "#0b5f30",
				  900: "#073c1e",
				  foreground: "#000",
				  DEFAULT: "#17c964"
				},
				warning: {
				  50: "#fef4e4",
				  100: "#fce4bd",
				  200: "#fad497",
				  300: "#f9c571",
				  400: "#f7b54a",
				  500: "#f5a524",
				  600: "#ca881e",
				  700: "#9f6b17",
				  800: "#744e11",
				  900: "#4a320b",
				  foreground: "#000",
				  DEFAULT: "#f5a524"
				},
				danger: {
				  50: "#fee1eb",
				  100: "#fbb8cf",
				  200: "#f98eb3",
				  300: "#f76598",
				  400: "#f53b7c",
				  500: "#f31260",
				  600: "#c80f4f",
				  700: "#9e0c3e",
				  800: "#73092e",
				  900: "#49051d",
				  foreground: "#000",
				  DEFAULT: "#f31260"
				},
				background: "#ffffff",
				foreground: "#040404",
				content1: {
				  DEFAULT: "#fe7272",
				  foreground: "#000"
				},
				content2: {
				  DEFAULT: "#57eeff",
				  foreground: "#000"
				},
				content3: {
				  DEFAULT: "#e4e4e7",
				  foreground: "#000"
				},
				content4: {
				  DEFAULT: "#d4d4d8",
				  foreground: "#000"
				},
				focus: "#006FEE",
				overlay: "#000000"
			  }
			},
			"dark": {
			  colors: {
				default: {
				  50: "#e7e7e8",
				  100: "#c5c5c8",
				  200: "#a4a4a7",
				  300: "#828287",
				  400: "#616166",
				  500: "#3f3f46",
				  600: "#34343a",
				  700: "#29292e",
				  800: "#1e1e21",
				  900: "#131315",
				  foreground: "#fff",
				  DEFAULT: "#3f3f46"
				},
				"primary": {
				  50: "#fee6f1",
				  100: "#fec4de",
				  200: "#fda1cb",
				  300: "#fc7fb8",
				  400: "#fb5ca4",
				  500: "#fa3a91",
				  600: "#ce3078",
				  700: "#a3265e",
				  800: "#771c45",
				  900: "#4b112c",
				  foreground: "#000",
				  DEFAULT: "#fa3a91"
				},
				"secondary": {
				  50: "#dfedfd",
				  100: "#b3d4fa",
				  200: "#86bbf7",
				  300: "#59a1f4",
				  400: "#2d88f1",
				  500: "#006fee",
				  600: "#005cc4",
				  700: "#00489b",
				  800: "#003571",
				  900: "#002147",
				  foreground: "#fff",
				  DEFAULT: "#006fee"
				},
				"success": {
				  50: "#e2f8ec",
				  100: "#b9efd1",
				  200: "#91e5b5",
				  300: "#68dc9a",
				  400: "#40d27f",
				  500: "#17c964",
				  600: "#13a653",
				  700: "#0f8341",
				  800: "#0b5f30",
				  900: "#073c1e",
				  foreground: "#000",
				  DEFAULT: "#17c964"
				},
				warning: {
				  50: "#fef4e4",
				  100: "#fce4bd",
				  200: "#fad497",
				  300: "#f9c571",
				  400: "#f7b54a",
				  500: "#f5a524",
				  600: "#ca881e",
				  700: "#9f6b17",
				  800: "#744e11",
				  900: "#4a320b",
				  foreground: "#000",
				  DEFAULT: "#f5a524"
				},
				danger: {
				  50: "#fee1eb",
				  100: "#fbb8cf",
				  200: "#f98eb3",
				  300: "#f76598",
				  400: "#f53b7c",
				  500: "#f31260",
				  600: "#c80f4f",
				  700: "#9e0c3e",
				  800: "#73092e",
				  900: "#49051d",
				  foreground: "#000",
				  DEFAULT: "#f31260"
				},
				background: "#000000",
				foreground: "#ffffff",
				content1: {
				  DEFAULT: "#18181b",
				  foreground: "#fff"
				},
				content2: {
				  DEFAULT: "#27272a",
				  foreground: "#fff"
				},
				content3: {
				  DEFAULT: "#3f3f46",
				  foreground: "#fff"
				},
				content4: {
				  DEFAULT: "#52525b",
				  foreground: "#fff"
				},
				focus: "#006FEE",
				overlay: "#ffffff"
			  }
			}
		  },
	}
  )],
} satisfies Config;


