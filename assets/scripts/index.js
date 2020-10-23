(function() { // Enclose scope for debugging purposes

    buildPage();

    function buildPage() {
        var now = moment();
        var main = $("main.container");

        $("#currentDay").text(now.format("dddd, MMMM Do")); // Set current day

        // Make time blocks
        for (var i = 9; i < 18; i++) {
            // Create elements
            let block = $("<section class='time-block row' data-value='" + i + "'></section");
            let hour = $(`
                <div class="hour col-md-1">
                    <span>` + moment().hour(i).format("hA") + `</span>
                </div>
            `);
            let description = $("<textarea class='description col-md-10'></textarea>");
            let button = $("<button class='saveBtn col-md-1'></button>");

            description.val(localStorage.getItem("planHour" + i)); // Get saved data

            // Time is relative
            if (i < now.hour()) {
                description.addClass("past");
            }
            else if (i > now.hour()) {
                description.addClass("future");
            }
            else {
                description.addClass("present");
            }
            /*
            At first this if/else tree was a switch statement with a function in the expression.
            The function contained an if/else tree. This seemed redundant.
            */

            // Append elements
            block.append(hour);
            block.append(description);
            block.append(button);
            main.append(block);

            /*
            One could abuse scope by putting the event listener here and just reference the
            block and description variables inside an arrow function.
            */
        }

        main.click(handleClick); // Set save event listener
    }

    function handleClick(event) {
        if (event.target.matches("button")) {
            let hour = event.target.parentElement.getAttribute("data-value");
            localStorage.setItem("planHour" + hour, $(".description", event.target.parentElement).val());
        }
    }

})();
