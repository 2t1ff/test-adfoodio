import { createMuiTheme } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";

// Create a theme instance.
const theme = createMuiTheme({
	palette: {
		primary: {
			main: "#556cd6",
		},
		secondary: {
			main: "#000",
		},
		error: {
			main: red.A400,
		},
		background: {
			default: "#fff",
		},
		text: {
      primary: "#fff",
      secondary: "#000"
		},
	},
	typography: {
    allVariants: {
    },
    h3: {
      fontFamily: 'Montserrat Alternates'
    },
    h5: {
      fontFamily: 'Montserrat Alternates'
    }
	},
});

export default theme;
