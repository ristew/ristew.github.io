var inserts = []
var w1 = $("#w1")
var db = TAFFY()
db.store("todos")

makeElems()

function insertThing() {
	var date = new Date()
	var text_area = $("#words")
	var toinsert = (text_area.val() != "") ? text_area.val() : "nothing"
	toinsert += " <span class='dater'><i>at " + date.toDateString() + "</i></span>"
	while ($.inArray(toinsert, inserts) != -1)
		toinsert = "more " + toinsert
	inserts.unshift(toinsert)
	db.insert({todo: toinsert})
	$(text_area).val("")
	$(text_area).focus()
	makeElems()
	return 
}

function makeInserts() {
	inserts = []
	db().each(function (r) {
		inserts.push(r.todo)
	})
}

function makeElems() {
	makeInserts()
	var base = []
	for (var i = 0; i < inserts.length; i++) {
		base.push("<div class='elemcontainer'><p class='elem'>" + inserts[i] + "</p><button class='elem' type=\"button\" onclick=\"removeThing(" + i + ")\">done</button></div>")
	}
	$(w1).html(base.join("\n"))
}

function removeThing(index) {	
	db({todo:inserts.splice(index, 1)}).remove()
	var text_area = ("#words")
	$(text_area).focus()
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
