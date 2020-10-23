(function() { // Enclose scope for debugging purposes

    $("#currentDay").text(moment().format("dddd, MMMM Do"));

    var main = $("main.container");
    for (var i = 9; i < 18; i++) { // Make time blocks
        let block = $(`
            <div class="time-block row">
                <div class="hour col-md-1">
                    <span>` + moment().hour(i).format("hA") + `</span>
                </div>
                <textarea class="description col-md-10"></textarea>
                <button class="saveBtn col-md-1"></button>
            </div>
        `);
        switch (simplify(i - moment().hour())) {
            case -1: $(".description", block).addClass("past"); break;
            case 0: $(".description", block).addClass("present"); break;
            case 1: $(".description", block).addClass("future"); break;
        }
        main.append(block);
    }

    function simplify(n) {
        if (n < 0) {
            return -1;
        }
        else if (n > 0) {
            return 1;
        }
        else {
            return 0;
        }
    }

})();
