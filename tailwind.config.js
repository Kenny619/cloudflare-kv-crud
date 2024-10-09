/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {},
	},
	plugins: [require("daisyui")],
	daisyui: {
		themes: [
			{
				mytheme: {
					"base-100": "#1d232a",
					"base-200": "#191e24",
					"base-300": "#15191e",
					"base-400": "#111418",
					"base-500": "#0e1115",
					"base-600": "#0a0d10",
					"base-700": "#07090c",
					"base-800": "#040507",
					"base-900": "#020203",
					primary: "#fefae0",
					secondary: "#dda15e",
					accent: "#bc6c25",
					neutral: "#2a323c",
					info: "#0277BD",
					success: "#558B2F",
					warning: "#EF6C00",
					error: "#D84315",
				},
			},
		],
		darkTheme: "dark", // name of one of the included themes for dark mode
		base: true, // applies background color and foreground color for root element by default
		styled: true, // include daisyUI colors and design decisions for all components
		utils: true, // adds responsive and modifier utility classes
		prefix: "", // prefix for daisyUI classnames ()
		logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
		themeRoot: ":root", // The element that receives theme color CSS variables
	},
};
