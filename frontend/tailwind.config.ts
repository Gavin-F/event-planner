import type { Config } from "tailwindcss";

export default {
	content: [
		"./src/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
		],	  
  theme: {
  	extend: {
  	}
  },
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  plugins: [],
} satisfies Config;
