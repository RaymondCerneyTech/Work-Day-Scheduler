// assign an empty object to hold tasks
let currentTasks = {};

// function that savesTasks
const saveTasks = function() {
    localStorage.setItem("tasks", JSON.stringify(currentTasks));
}

// Loads tasks according to ID
const loadTasks = function () {
	currentTasks = JSON.parse(localStorage.getItem("tasks"));
	if (!currentTasks) {
		currentTasks = {
			9: "",
			10: "",
			11: "",
			12: "",
			13: "",
			14: "",
			15: "",
			16: "",
			17: "",
		};
	} else {
		$.each(currentTasks, function (id, text) {
			$("#div" + id).text(text);
		});
	}
	manageTime();
};

// Assigns colors using classes
const manageTime = function () {
	$(".description").each(function () {
		let currentHour = parseInt(moment().hour());
		let hourBlock = parseInt($(this).attr("id").replace("div", ""));
		if (currentHour > hourBlock) {
			$(this).removeClass("present");
			$(this).addClass("past");
		} else if (currentHour === hourBlock) {
			$(this).removeClass("future");
			$(this).addClass("present");
		} else if (currentHour < hourBlock) {
			$(this).addClass("future");
		}
	});
	let currentDate = moment().format("dddd, MMM Do");
	$("#currentDay").text(currentDate);
};

// On clicks for saving and and editing tasks
$(".time-block").on("click", "div", function() {
    let id = $(this).attr("id").replace("row", "");
    let divEl = $("#" + id);
    let divClasses = divEl.attr("class");
    let divText = divEl.text();
    let textInput = $("<textarea>").addClass(divClasses).val(divText);
    textInput.attr("id", id);
    divEl.replaceWith(textInput);
    textInput.trigger("focus");
});


$(".time-block").on("click", ".saveBtn", function() {
    let id = $(this).attr("id").replace("btn", "");
    let textEl = $("#div" + id);
    let divText = textEl.val().trim();
    if (!divText) {
        divText = textEl.text().trim();
    };
    let divEl = $("<div>")
        .attr("id", "div" + id)
        .addClass(textEl.attr("class"))
        .text(divText);
    textEl.replaceWith(divEl);
    currentTasks[id] = divText;
    saveTasks();
});
// end of onClicks

manageTime();

//Call this function once a minute
setInterval(function() {
    manageTime();
}, 60000);

// Loads the locally saved tasks
loadTasks();