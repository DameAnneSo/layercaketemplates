import "./css/normalize.css";
import "./css/colours.css";
import "./css/fonts.css";
import "./css/theme.css";

import App from "./App.svelte";

const app = new App({
	target: document.body,
	props: {},
});

export default app;
