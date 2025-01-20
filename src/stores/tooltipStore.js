import { writable, readable } from "svelte/store"; 

export const tooltipDatum  = writable(undefined);

export const mousePosition = readable({x:0, y:0}, (set) => {
	document.body.addEventListener("mousemove", move);
	
	function move(event) {
		set({	
			x: event.clientX,
			y: event.clientY + window.scrollY,
		});
	}
	
	return () => {
		document.body.removeEventListener("mousemove", move);
	}
})
