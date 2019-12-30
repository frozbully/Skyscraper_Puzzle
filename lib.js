function hide() {
	for (var i = 0; i < this.length; i++) {
		this[i].style.display = 'none';
	}
	return this;
}

function show(str) {
	if (str) {
		for (var i = 0; i < this.length; i++) {
			this[i].style.display = str;
		}
	}
	else {
		for (var i = 0; i < this.length; i++) {
			this[i].style.display = 'block';
		}
	}
	return this;
}

function on(event, foo) {
	for (var i = 0; i < this.length; i++) {
		this[i].addEventListener(event, foo);
	}
	return this;
}

function html(newContent) {
	for (var i = 0; i < this.length; i++) {
		this[i].innerHTML = newContent;
	}
	return this;
}

function addText(newContent) {
	for (var i = 0; i < this.length; i++) {
		this[i].textContent += newContent;
	}
	return this;
}

function toggleClass(select) {
	var elem = document.querySelector(select);
}
