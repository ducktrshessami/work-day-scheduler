(function() { // Enclose scope for debugging purposes

    buildPage();

    function buildPage() {
        var now = moment();
        var main = $("main.container");

        $("#currentDay").text(now.format("dddd, MMMM Do")); // Set current day

        for (var i = 9; i < 18; i++) { // Make time blocks
            let block = $(`
                <section class="time-block row">
                    <div class="hour col-md-1">
                        <span>` + moment().hour(i).format("hA") + `</span>
                    </div>
                    <textarea class="description col-md-10"></textarea>
                    <button class="saveBtn col-md-1"></button>
                </section>
            `);
            if (i < now.hour()) { // 
                $(".description", block).addClass("past");
            }
            else if (i > now.hour()) {
                $(".description", block).addClass("future");
            }
            else {
                $(".description", block).addClass("present");
            }
            main.append(block);
        }

        main.click(handleClick); // Set save event listener
    }

    function handleClick(event) {
        if (event.target.matches("button")) {
            console.log($(".description", event.target.parentNode).val());
        }
    }

})();
