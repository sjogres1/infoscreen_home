// Created by Sauli Sjogren
$(document).ready(function () {
    var date;

schedules();

    function schedules() {
        date = new Date();

        function addZero(l) {
            if (l < 10)(l = "0" + l);
            return l;
        }

            $.getJSON("http://api.reittiopas.fi/hsl/prod/?request=stop&userhash=http://api.reittiopas.fi/hsl/prod/?request=stop&userhash=d021ecb37bc7d4e4f679f686fd387017d5f52af4646d&format=json&code=E1116&format=json&code=E1060", function (data) {
                print_schedule(data);
            });
            $.getJSON("http://api.reittiopas.fi/hsl/prod/?request=stop&userhash=d021ecb37bc7d4e4f679f686fd387017d5f52af4646d&format=json&code=E1058", function (data) {
                print_schedule2(data);
            });



        setTimeout(function () {
            schedules()
        }, 30000);
    }
    
    // Creates table where schedules are shown
     var theader = "<thead>" + "<tr>" + "<th>" + "Line" + "</th>" + "<th>" + "Departure" + "</th>" + "<th>" + "Destination" + "</th>" + "</tr>" + "</thead>";
   




    

    function print_schedule(data) {
        // Prints schedules on the screen
      var i;
      var sche_num1;
        
        $("#mytable").remove();
        var tbl = $("<table/>").attr("id", "mytable");
        $("#schedule1").append(tbl);
        $("#mytable").append(theader);

        if (data[0].departures == null) {
            // If there are no schedules at the time, an empty table will be shown
            for (i = 0; i < 6; i++) {
                var td1 = "<tr><td>" + "</td>";
                var td2 = "<td>" + "</td>";
                var td3 = "<td>" + "</td></tr>";
                $("#mytable").append(td1 + td2 + td3);
            }
        } else {
            if(data[0].departures.length >5) {
                sche_num = 6;
            }
            else{
                sche_num = data[0].departures.length;
            }
            for (i = 0; i < sche_num; i++) {
                var td1 = "<tr><td>" + cleanBusNumber(data[0].departures[i]["code"]) + "</td>";
                var td2 = "<td>" + timeCleaner(data[0].departures[i].time) + "</td>";
                var td3 = "<td>" + searchDestination(data, data[0].departures[i].code) + "</td></tr>";
                $("#mytable").append(td1 + td2 + td3);
                console.log("i is "+ i);
                if (i ==6) {
                    break;
                }
            }
            for (i; i < 6; i++) {
                var td1 = "<tr><td>" + "</td>";
                var td2 = "<td>" + "</td>";
                var td3 = "<td>" + "</td></tr>";
                $("#mytable").append(td1 + td2 + td3);
            }
        }
            
        }
    

    function print_schedule2(data) {
        // does the same thing as print_schedule(data)
        var j;
        var sche_num;
        $("#mytable2").remove();
        var tbl2 = $("<table/>").attr("id", "mytable2");
        $("#schedule2").append(tbl2);
        $("#mytable2").append(theader);

        if (data[0].departures == null) {
            // If there are no schedules at the time, an empty table will be shown
            for (j = 0; j < 6; i++) {
                var td1 = "<tr><td>" + "</td>";
                var td2 = "<td>" + "</td>";
                var td3 = "<td>" + "</td></tr>";
                $("#mytable2").append(td1 + td2 + td3);
            }
        } else {
            if(data[0].departures.length >5) {
                sche_num = 6;
            }
            else{
                sche_num = data[0].departures.length;
            }
            for (j = 0; j < sche_num; j++) {
                var td1 = "<tr><td>" + cleanBusNumber(data[0].departures[j]["code"]) + "</td>";
                var td2 = "<td>" + timeCleaner(data[0].departures[j].time) + "</td>";
                var td3 = "<td>" + searchDestination(data, data[0].departures[j].code) + "</td></tr>";
                $("#mytable2").append(td1 + td2 + td3);
                console.log("j is "+j)
                if (j == 6) {
                    
                    break;
                }

            }
            for (j; j < 6; j++) {
                console
                var td1 = "<tr><td>" + "</td>";
                var td2 = "<td>" + "</td>";
                var td3 = "<td>" + "</td></tr>";
                $("#mytable2").append(td1 + td2 + td3);
            }
        }
    }


    function timeCleaner(time) {
        // add zeros to schedules if they are not shown. For example departure time 23.50 will need this that 0 after 5 is shown
        if (time.toString().length === 3) {
            return "0" + time.toString().slice(0, 1) + " : " + time.toString().slice(1);
        }
        if (time.toString().slice(0, 2) === "24") {
            return "00" + " : " + time.toString().slice(2);
        }
        if (time.toString().slice(0, 2) === "25") {
            return "01" + " : " + time.toString().slice(2);
        }
        return time.toString().slice(0, 2) + " : " + time.toString().slice(2);
    }

    function searchDestination(data, line) {
        // matches buslines and destinations
        var destination;
        $.each(data[0].lines, function (i, value) {
            if (value.search(line) >= 0) {
                destination = value.split(":")[1].split(",")[0];
            }
        });
        return destination;
    }

    function cleanBusNumber(line) {
        // function styles the line number to a normal bus line number
       line = line.split(" ")[0];
        line = line.slice(1);
        if (line[0] === "0") 
            line = line.replace(0, "");

        if(line[0] === "0" && line[1] === "2") {
            line = line.replace(0, "");
            line = line.replace(2, "");
        }
        return line;
    }


});

