var inserts = []
var w1 = $("#w1")

function insertThing() {
	var text_area = $("#words")
	var toinsert = (text_area.val() != "") ? text_area.val() : "none"
	
	inserts.push(toinsert)
	$(text_area).val("")
	$(text_area).focus()
	makeElems()
	return 
}

function makeElems() {
	var base = []
	for (var i = 0; i < inserts.length; i++) {
		base.push("<div class='elemcontainer'><p class='elem'>" + inserts[i] + "</p><button class='elem' type=\"button\" onclick=\"removeThing(" + i + ")\">done</button></div>")
	}
	$(w1).html(base.join("\n"))
}

function removeThing(index) {	
	inserts.splice(index, 1)
	makeElems()
}

$(document).keydown(function (e) {
	console.log("key " + e.which + " pressed\n")
	switch (e.which) {
		case 13:
		insertThing()
		e.preventDefault()
		break
		case 27:
		if (inserts.length > 0)
			removeThing(inserts.length - 1)
		e.preventDefault()
		break
		default:
		return
	}
})
