var elems = []
var elem = 0;
elems.push($("#base"))
function insertThing() {
	var text_area = $("#words")
	var toinsert = (text_area.val() != "") ? text_area.val() : "none"
	elem++
	var inhtml = "<div><p>" + toinsert + "</p><button type=\"button\" onclick=\"removeThing(" + elem + ")\">done</button></div>"
	console.log(inhtml);
	var newelem = $(inhtml)
	elems[elems.length - 1].after($(newelem))
	elems[elem] = newelem
	$(text_area).val("")
	$(text_area).focus()
	return newelem
}
function removeThing(index) {
	if (index > 0) 
		$(elems.splice(index, 1).pop().remove())
}

function render() {
	var laste = elems[0]
	for (var e in elems) {
		if e != laste
			e.insertAfter(laste)
		laste = e
	}
}

$(document).keydown(function (e) {
	console.log("key " + e.which + " pressed\n")
	switch (e.which) {
		case 13:
		insertThing()
		e.preventDefault()
		break
		default:
		return
	}
})
