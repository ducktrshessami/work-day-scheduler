(function() { // Enclose scope for debugging purposes

    let now = moment(); // Get current date
    let mainEl = $("main.container"); // Get time-block container
    //let interval = setInterval(dynamicRelativity, 1000); // Interval to check event relativity
    let planData = localStorage.getItem("planData") ? JSON.parse(localStorage.getItem("planData")) : {date: now.format("DDD")}; // Get stored data
    /*
    The interval is commented out as it was not requested by the client. It was written anyways
    because it seemed like something someone would want.
    */

    checkDate();
    buildTimeBlocks();
    mainEl.click(handleClick); // Set save event listener

    /*
    Display current date and clear plan for new day
    */
    function checkDate() {
        $("#currentDay").text(now.format("dddd, MMMM Do")); // Set current day

        // Check for new day
        // if (planData.date != now.format("DDD")) {
        //     planData = {date: now.format("DDD")};
        //     update();
        // }
        /*
        This functionality is also commented out but written for the same reasons as the interval
        above.
        */
    }

    /*
    Display business-hour time-blocks
    */
    function buildTimeBlocks() {
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

            description.val(planData["hour" + i]); // Get saved data

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
            mainEl.append(block);

            /*
            One could abuse scope by putting the event listener here and just reference the
            block and description variables inside an arrow function. This could reduce load time
            when saving, but would also increase memory usage I think.
            */
        }
    }

    /*
    */
    function handleClick(event) {
        if (event.target.matches("button")) {
            let hour = event.target.parentElement.getAttribute("data-value");
            update(hour, $(".description", event.target.parentElement).val());
        }
    }

    /*
    */
    function update(hour, data) {
        planData["hour" + hour] = data;
        localStorage.setItem("planData", JSON.stringify(planData));
    }

})();
