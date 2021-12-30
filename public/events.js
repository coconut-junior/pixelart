const resolution = 64;
var clicking = false;
color = "red";
hoverColor = "teal";
leaveColor = "white";

console.log('loaded painterrrr');

document.addEventListener("mousedown", function hover() {
	clicking = true;
});
document.addEventListener("mouseup", function hover() {
	clicking = false;
});

for (i = 0;i<resolution*resolution;++i) {
	const p = document.createElement("div");
	p.style.backgroundColor = leaveColor;
	p.classList.add("pixel");
	p.addEventListener("click", function hover(){
		p.style.backgroundColor = hoverColor;
	});
	p.addEventListener("mouseover", function hover(){
		if (clicking) {
			p.style.backgroundColor = hoverColor;
		}
	});
	
	document.querySelector(".canvas").append(p);
}

async function open() {
	const response = await fetch('/api');
	const data = await response.json();
	
	
	pixels = data[0]['pixels'];
	console.log(pixels);
	
	var elems = document.querySelectorAll('.pixel');
	for (i = 0;i<elems.length;++i) {
		console.log(pixels[i]);
		elems[i].style.backgroundColor = pixels[i];
	}
}

function save() {
	console.log('saved canvas!');
	pixels = document.querySelectorAll(".pixel");
	colors = [];
	for (i = 0;i < pixels.length;++i) {
		colors.push(pixels[i].style.backgroundColor);
	}
	const options = {
		method: 'POST',
		headers: {
			'Content-Type':'application/JSON'
		},
		body: JSON.stringify(colors)
	};
	fetch('/api',options);
}

open();