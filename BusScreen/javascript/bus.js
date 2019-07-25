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

        $.getJSON("https://rata.digitraffic.fi/api/v1/live-trains/station/Lpv/Hki?include_nonstopping=false&limit=50", function (data) {
            print_schedule(data);
        });
        $.getJSON("https://rata.digitraffic.fi/api/v1/live-trains/station/Lpv/Hki?include_nonstopping=false&limit=50", function (data) {
            print_schedule2(data);
        });

        /*
        
        // uncomment these two if you want 4 different schedules to the screen
        
        $.getJSON("https://rata.digitraffic.fi/api/v1/live-trains/station/Lpv/Hki?include_nonstopping=false&limit=50", function (data) {
            print_schedule3(data);
        });
        $.getJSON("https://rata.digitraffic.fi/api/v1/live-trains/station/Lpv/Hki?include_nonstopping=false&limit=50", function (data) {
            print_schedule4(data);
        });
        
        */

        /*
        
        // Testing .json files
        
        $.getJSON("BusScreen/javascript/Hki_2_klo11_30.json", function (data) {
            print_schedule(data);
        });

        $.getJSON("BusScreen/javascript/Hki_klo11_30.json", function (data) {
            print_schedule2(data);
        });
        */

        /* 
        $.getJSON("https://rata.digitraffic.fi/api/v1/live-trains/station/Lpv/Hki?include_nonstopping=false&limit=50", function (data) {
             test(data);
         });
         
         */

        /*
        $.getJSON("https://rata.digitraffic.fi/api/v1/live-trains/station/Lpv/Hki?include_nonstopping=false&limit=50", function (data) {
            test2(data);
        });
        */

        /*
        "http://api.reittiopas.fi/hsl/prod/?request=stop&userhash=http://api.reittiopas.fi/hsl/prod/?request=stop&userhash=d021ecb37bc7d4e4f679f686fd387017d5f52af4646d&format=json&code=E1116&format=json&code=E1060
          http://api.reittiopas.fi/hsl/prod/?request=stop&userhash=d021ecb37bc7d4e4f679f686fd387017d5f52af4646d&format=json&code=E1058
        */

        setTimeout(function () {
            schedules();
        }, 60000); //30000
    }

    // Creates table where schedules are shown
    var theader = "<thead>" + "<tr>" + "<th>" + "Line" + "</th>" + "<th>" + "Departure" + "</th>" + "<th>" + "Destination" + "</th>" + "</tr>" + "</thead>";



    function test(data) {
        var a = 0;
        var counter = 0;
        var api_parsed = {};
        var train_time;
        for (t = 0; t < 49; t++) {
            if (data[t].commuterLineID == "A" || data[t].commuterLineID == "L") {

                console.log(data[t].commuterLineID);
                a = data[t];
                api_parsed[counter] = a;
                counter++;

                $.each(a.timeTableRows, function (index, value) {
                    if (value.stationShortCode == "LPV" && value.type == "DEPARTURE") {
                        //console.log(value.commercialTrack);
                        train_time = value.scheduledTime;
                        // Regex code to parse the api output to more readable format
                        train_time = train_time.replace(/(\d{4})-(\d{2}-\d{2})T+/g, "");
                        train_time = train_time.replace(/[[:][0-9][0-9][.][0][0][0][Z]+/g, "");



                    }


                });
                train_time = timeCleaner(train_time);
                console.log(train_time);


            }
        }




    }

    function test2(data) {
        var a = 0;
        var counter = 0;
        var api_parsed = {};
        var train_time;
        for (t = 0; t < 49; t++) {
            if (data[t].commuterLineID == "U" || data[t].commuterLineID == "Y" || data[t].commuterLineID == "E") {

                console.log(data[t].commuterLineID);

                a = data[t];
                api_parsed[counter] = a;
                counter++;

                $.each(a.timeTableRows, function (index, value) {
                    if (value.stationShortCode == "LPV" && value.type == "DEPARTURE") {
                        //console.log(value.commercialTrack);
                        train_time = value.scheduledTime;
                        train_time = train_time.replace(/(\d{4})-(\d{2}-\d{2})T+/g, "");
                        train_time = train_time.replace(/[[:][0-9][0-9][.][0][0][0][Z]+/g, "");



                    }


                });


                train_time = timeCleaner(train_time);
                console.log(train_time);

            }
        }




    }



    function print_schedule(data) {
        // Prints schedules on the screen
        var train_time;
        var i;
        var sche_num1;
        var api_parsed = {};
        var a;

        $("#mytable").remove();
        var tbl = $("<table/>").attr("id", "mytable");
        $("#schedule1").append(tbl);
        $("#mytable").append(theader);
        var counter = 0;
        for (t = 0; t < 49; t++) {
            if (data[t].commuterLineID == "U" || data[t].commuterLineID == "Y" || data[t].commuterLineID == "E") {
                api_parsed[counter] = data[t];
                counter++;

            }
        }

        /*console.log(api_parsed);
        console.log(counter);
        console.log(api_parsed[0].commuterLineID);
       
        console.log(a.timeTableRows);*/
        a = data[t];


        if (api_parsed[0].commuterLineID === null) {
            // If there are no schedules at the time, an empty table will be shown
            for (i = 0; i < 6; i++) {
                var td1 = "<tr><td>" + "</td>";
                var td2 = "<td>" + "</td>";
                var td3 = "<td>" + "</td></tr>";
                $("#mytable").append(td1 + td2 + td3);
            }
        } else {
            if (counter > 5) {
                sche_num1 = 6;
            } else {
                sche_num1 = counter;
            }
            for (i = 0; i < sche_num1; i++) {
                a = api_parsed[i];
                //console.log(a.timeTableRows);
                $.each(a.timeTableRows, function (index, value) {
                    if (value.stationShortCode == "LPV" && value.type == "DEPARTURE") {
                        //console.log(value.commercialTrack);
                        train_time = value.scheduledTime;
                        train_time = train_time.replace(/(\d{4})-(\d{2}-\d{2})T+/g, "");
                        train_time = train_time.replace(/[[:][0-9][0-9][.][0][0][0][Z]+/g, "");
                        train_time = train_time.replace(":", " ")
                        //console.log(train_time);
                        //console.log(value.scheduledTime);

                    }


                });

                var td1 = "<tr><td>" + a.commuterLineID + "</td>";
                var td2 = "<td>" + timeCleaner(train_time) + "</td>";
                var td3 = "<td>" + "Helsinki" + "</td></tr>";
                $("#mytable").append(td1 + td2 + td3);
                if (i == 6)
                    break;
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
        var train_time;
        var sche_num;
        var api_parsed = {};
        var a;

        $("#mytable2").remove();
        var tbl2 = $("<table/>").attr("id", "mytable2");
        $("#schedule2").append(tbl2);
        $("#mytable2").append(theader);

        var counter = 0;
        for (t = 0; t < 49; t++) {
            if (data[t].commuterLineID == "L" || data[t].commuterLineID == "A") {
                api_parsed[counter] = data[t];
                counter++;

            }
        }
        /*console.log("tää on api parsed2");
        console.log(api_parsed);
        console.log("counter: " + counter);
        console.log(api_parsed[0].commuterLineID);
        console.log(a.timeTableRows);*/
        a = data[t];


        if (api_parsed[0].commuterLineID === null) {
            // If there are no schedules at the time, an empty table will be shown
            for (j = 0; j < 6; j++) {
                var td1 = "<tr><td>" + "</td>";
                var td2 = "<td>" + "</td>";
                var td3 = "<td>" + "</td></tr>";
                $("#mytable2").append(td1 + td2 + td3);
            }
        } else {
            if (counter > 5) {
                sche_num1 = 6;
            } else {
                sche_num1 = counter;
            }
            for (j = 0; j < sche_num1; j++) {
                a = api_parsed[j];
                //console.log(a.timeTableRows);
                $.each(a.timeTableRows, function (index, value) {
                    if (value.stationShortCode == "LPV" && value.type == "DEPARTURE") {
                        //console.log(value.commercialTrack);
                        train_time = value.scheduledTime;
                        train_time = train_time.replace(/(\d{4})-(\d{2}-\d{2})T+/g, "");
                        train_time = train_time.replace(/[[:][0-9][0-9][.][0][0][0][Z]+/g, "");
                        train_time = train_time.replace(":", " ")

                        //console.log(value.scheduledTime);
                        // 2018-06-03T04:26:06.000Z
                    }


                });
                //console.log(train_time);
                var td1 = "<tr><td>" + a.commuterLineID + "</td>";
                var td2 = "<td>" + timeCleaner(train_time) + "</td>";
                var td3 = "<td>" + "Helsinki" + "</td></tr>";
                $("#mytable2").append(td1 + td2 + td3);

                if (j == 6)
                    break;


            }
            for (j; j < 6; j++) {
                var td1 = "<tr><td>" + "</td>";
                var td2 = "<td>" + "</td>";
                var td3 = "<td>" + "</td></tr>";
                $("#mytable2").append(td1 + td2 + td3);
            }
        }
    }


    /* function print_schedule3(data) {
         // Prints schedules on the screen
         var k;
         var sche_num3;

         $("#mytable3").remove();
         var tbl = $("<table/>").attr("id", "mytable3");
         $("#schedule3").append(tbl);
         $("#mytable3").append(theader);

         if (data[0].departures === null) {
             // If there are no schedules at the time, an empty table will be shown
             for (k = 0; k < 6; k++) {
                 var td1 = "<tr><td>" + "</td>";
                 var td2 = "<td>" + "</td>";
                 var td3 = "<td>" + "</td></tr>";
                 $("#mytable3").append(td1 + td2 + td3);
             }
         } else {
             if (data[0].departures.length > 5) {
                 sche_num3 = 6;
             } else {
                 sche_num3 = data[0].departures.length;
             }
             for (k = 0; k < sche_num3; k++) {
                 var td1 = "<tr><td>" + cleanBusNumber(data[0].departures[k]["code"]) + "</td>";
                 var td2 = "<td>" + timeCleaner(data[0].departures[k].time) + "</td>";
                 var td3 = "<td>" + searchDestination(data, data[0].departures[k].code) + "</td></tr>";
                 $("#mytable3").append(td1 + td2 + td3);
                 if (k == 6) {
                     break;
                 }
             }
             for (k; k < 6; k++) {
                 var td1 = "<tr><td>" + "</td>";
                 var td2 = "<td>" + "</td>";
                 var td3 = "<td>" + "</td></tr>";
                 $("#mytable3").append(td1 + td2 + td3);
             }
         }

     }

     function print_schedule4(data) {
         // Prints schedules on the screen
         var g;
         var sche_num4;

         $("#mytable4").remove();
         var tbl = $("<table/>").attr("id", "mytable4");
         $("#schedule4").append(tbl);
         $("#mytable4").append(theader);

         if (data[0].departures === null) {
             // If there are no schedules at the time, an empty table will be shown
             for (g = 0; g < 6; g++) {
                 var td1 = "<tr><td>" + "</td>";
                 var td2 = "<td>" + "</td>";
                 var td3 = "<td>" + "</td></tr>";
                 $("#mytable4").append(td1 + td2 + td3);
             }
         } else {
             if (data[0].departures.length > 5) {
                 sche_num4 = 6;
             } else {
                 sche_num4 = data[0].departures.length;
             }
             for (g = 0; g < sche_num4; g++) {
                 var td1 = "<tr><td>" + cleanBusNumber(data[0].departures[g]["code"]) + "</td>";
                 var td2 = "<td>" + timeCleaner(data[0].departures[g].time) + "</td>";
                 var td3 = "<td>" + searchDestination(data, data[0].departures[g].code) + "</td></tr>";
                 $("#mytable4").append(td1 + td2 + td3);

                 if (g == 6) {
                     break;
                 }
             }
             for (g; g < 6; g++) {
                 var td1 = "<tr><td>" + "</td>";
                 var td2 = "<td>" + "</td>";
                 var td3 = "<td>" + "</td></tr>";
                 $("#mytable4").append(td1 + td2 + td3);
             }
         }

     }*/


    function timeCleaner(time) {
        var utc = Number(time.substr(0, 2));
        //console.log(Number(time.substr(0, 2)));
        //console.log(time.substr(2));
        utc = (utc + 3).toString();
        // add zeros to hours if they are not shown. For example departure time 08.50 will need this that 0 after before 8 is shown
        if (utc.length < 2)
            {
               utc = "0" + utc.toString();
            }
        time = utc + time.substr(2);   
        
        
        // add zeros to schedules if they are not shown. For example departure time 23.50 will need this that 0 after 5 is shown
        if (time.length === 3) {
            return "0" + time.slice(0, 1) + " : " + time.toString().slice(1);
        }
        if (time.slice(0, 2) === "24") {
            return "00" + " : " + time.slice(2);
        }
        if (time.toString().slice(0, 2) === "25") {
            return "01" + " : " + time.slice(2);
        }

        if (time.toString().slice(0, 2) === "26") {
            return "02" + " : " + time.slice(2);
        }
        return time.slice(0, 2) + " : " + time.slice(3);
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

    /* function cleanBusNumber(line) {
         // function styles the line number to a normal bus line number
         line = line.split(" ")[0];
         line = line.slice(1);
         if (line[0] === "0")
             line = line.replace(0, "");

         if (line[0] === "0" && line[1] === "2") {
             line = line.replace(0, "");
             line = line.replace(2, "");
         }
         return line;
     }*/


});
