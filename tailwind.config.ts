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
			disabledOpacity: "0.3", // opacity-[0.3]
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
		themes:{
			"light":{
				extend: "dark",
				colors: {
						background: "#fffefe",
						foreground: "#020817",
						primary: {
							50: '#fef1f7',
							100: '#fee5f2',
							200: '#ffcbe7',
							300: '#ffa1d1',
							400: '#ff7aba',
							500: '#fa3a91',
							600: '#ea186c',
							700: '#cc0a53',
							800: '#a80c44',
							900: '#8c0f3c',
						  DEFAULT: "#fa3a91",
						  foreground: "#ffffff",
						},
						secondary:{
							50: '#eef8ff',
							100: '#d9eeff',
							200: '#bce3ff',
							300: '#8ed2ff',
							400: '#59b8ff',
							500: '#3298ff',
							600: '#247ef5',
							700: '#1462e1',
							800: '#174fb6',
							900: '#142b57',
							DEFAULT: "#3298ff",
						  	foreground: "#ffffff",
						},
						focus: "#8ed2ff",
					  },
			}
		}
	}
  )],
} satisfies Config;
