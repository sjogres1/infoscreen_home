$(document).ready(function () {

    var g = 1;
    var imageUrl;

    function showEvents() {
         /* if (g > 8 || g < 0) {
            g = 0;
        }
	g = g + 1;
	 */
       // imageUrl = "BusScreen/pics/pic" + g + ".jpg";
         imageUrl = "BusScreen/pics/pic9.jpg";
	 $("body").css("background-image", "url(" + imageUrl + ")");
        /* setTimeout(function () {
            showEvents()
        }, 180000);
	*/	
    }
    showEvents();

});
