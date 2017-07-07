var time_left = document.querySelector("#vi-cdown_timeLeft").innerHTML;

function fix_timezone(hour_offset, tag) {
    console.log("using offset of", hour_offset, tag);

    var pattern = /(\w+), (\d):(\d{2})([APM]{2})/
    var existing = document.querySelector(".vi-tm-left span").innerHTML;

    var result = existing.match(pattern);
    console.log("matching result", result);

    var day_of_week = result[1];
    var hour = parseInt(result[2]);
    var minutes = result[3];
    var am_pm = result[4];

    hour += hour_offset;

    if(hour > 12) {
        hour -= 12;
        if(am_pm == 'PM') {
            // time change put us into the next day
            day_of_week = change_dow(day_of_week, 1);
            am_pm = "AM";
        } else if (am_pm == 'AM') {
            // time change switch to PM
            am_pm = "PM";
        }
    }
    new_ending_time = day_of_week + ", " + hour + ":" + minutes + am_pm + " " + tag;
    console.log(new_ending_time);
    //document.querySelector(".vi-tm-left span").innerHTML = new_ending_time;
}

function change_dow(dow, increment) {
    // increment must be either +1 or -1
    days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    this_day = days.indexOf(dow)
    return days[this_day + increment]
}

function pdt_offset() {
    // how many hours we are ahead or behind pacific time
    var offset_hours = new Date().getTimezoneOffset() / 60.0;
    var tag = new Date().toString().match(/\(([A-Za-z\s].*)\)/)[1];
    return [7 - offset_hours, tag]
}

//console.log(change_dow("Thursday", -1));
//console.log(change_dow("Friday", 1));
result = pdt_offset();
fix_timezone(result[0], result[1])
