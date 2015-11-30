// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=392286
(function () {
    "use strict";

    var app = WinJS.Application;
    var activation = Windows.ApplicationModel.Activation;

    app.onactivated = function (args) {
        if (args.detail.kind === activation.ActivationKind.launch) {
            if (args.detail.previousExecutionState !== activation.ApplicationExecutionState.terminated) {
                // TODO: This application has been newly launched. Initialize
                // your application here.
            } else {
                // TODO: This application has been reactivated from suspension.
                // Restore application state here.
            }
            args.setPromise(WinJS.UI.processAll());

            // Code start

            // Myth Start
            var myth = ["Only women with a family history of breast cancer are at risk.", "Wearing an underwire bra increases your risk of getting breast cance", "Most breast lumps are cancerous.", "Exposing a tumor to air during surgery causes cancer to spread.", "Breast implants can raise your cancer risk.", "All women have a 1-in-8 chance of getting breast cancer.", "Wearing antiperspirant increases your risk of getting breast cancer.", "Small-breasted women have less chance of getting breast cancer.", "Breast cancer always comes in the form of a lump.", "You can't get breast cancer after a mastectomy.", "Your father's family history of breast cancer doesn't affect your risk.", "Caffeine causes breast cancer.", "Women with lumpy breasts have a higher risk of developing breast cancer.", "Annual mammograms increase your risk of cancer.", "Needle biopsies can disturb cancer cells and cause them to spread.", "After heart disease, breast cancer is the leading killer of women.", "If your mammography report is negative, there is nothing else to worry about.", "Hair straighteners cause breast cancer in African-American women.", "Overweight women have the same breast cancer risk as other women.", "Fertility treatments increase the risk of getting breast cancer.", "Living near power lines can cause breast cancer.", "Having an abortion raises your risk of getting breast cancer.", "Breast cancer is preventable."];
            var i = Math.floor(Math.random() * 23);
            document.getElementById('mythbar').innerHTML = "Myth: "+myth[i];


            // Myth End




            
            var Status = document.getElementById('content');
            var MapStatus = document.getElementById('contentMap');
            MapStatus.style.display = "none";
           


            var nav = null;

            function requestPosition() {
                if (nav == null) {
                    nav = window.navigator;
                }

                var geoloc = nav.geolocation;
                if (geoloc != null) {
                    geoloc.getCurrentPosition(successCallback, errorCallback);
                }

            }

            function successCallback(position) {
                document.getElementById("Map").src = "ms-appx-web:///geo.html?Lat="+position.coords.latitude+"&Lng="+position.coords.longitude;

            }

            function errorCallback(error) {
                var strMessage = "";

                // Check for known errors
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        strMessage = "Access to your location is turned off. " +
                            "Change your settings to turn it back on.";
                        break;
                    case error.POSITION_UNAVAILABLE:
                        strMessage = "Data from location services is " +
                            "currently unavailable.";
                        break;
                    case error.TIMEOUT:
                        strMessage = "Location could not be determined " +
                            "within a specified timeout period.";
                        break;
                    default:
                        break;
                }
                var statusElement=document.getElementById("status");
                statusElement.innerHTML = strMessage;
                statusElement.style.display = "";

            }


           var toggleClick = document.getElementById('toggler');
            toggleClick.addEventListener("click", toggleContent, false);
            function toggleContent() {
                if (Status.style.display == "none") {
                    MapStatus.style.display = "none";
                    Status.style.display = "";
                } else {
                    MapStatus.style.display = "";
                    Status.style.display = "none";
                    requestPosition();

                }
            }
            

            var submitButton = document.getElementById('submitted');
            submitButton.addEventListener("click", sendData, false);
            function sendData() {
                // Reset the output data
                var outputArea = document.getElementById('content');
                //XHR 
                WinJS.xhr({ url: "http://127.0.0.1/cancer/test.php?p1=" + p1.value + "&p2=" + p2.value + "&p3=" + p3.value + "&p4=" + p4.value + "&p5=" + p5.value + "&p6=" + p6.value + "&p7=" + p7.value + "&p8=" + p8.value + "&p9=" + p9.value, headers: { "Cache-Control": "no-cache", "If-Modified-Since": "Mon, 27 Mar 1972 00:00:00 GMT" } }).then(showData, showError, showProgress);
                function showData(result) {
                    requestPosition();
                    WinJS.Utilities.setInnerHTMLUnsafe(outputArea, "<div class=\"bubble\">" + result.response + " Hospitals around you:</div> <iframe id=\"Map\" src=\"ms-appx-web:///geo.html?Lat=17.9842&Lng=73.53358\" style=\"width:100%;height:60%; margin-top:2% \"></iframe>");
                 }
                function showProgress() {
                    outputArea.innerHTML = "<div style=\"text-align:center; \"><br><br><br><br>Processing the data....<progress class=\"win-ring win-large\" /></div>";
                }
                function showError() {
                    outputArea.innerHTML = "Error :'(";

                }
            }

            var inputAgain = "";
            inputAgain += "Clump Thickeness:";
            inputAgain += "            <select id=\"p1\">";
            inputAgain += "                <option value=\"1\">Cells are fully mono-layered<\/option>";
            inputAgain += "                <option value=\"2\">10% of Cells are multi-layered<\/option>";
            inputAgain += "                <option value=\"3\">20% of Cells are multi-layered<\/option>";
            inputAgain += "                <option value=\"4\">35% of Cells are multi-layered<\/option>";
            inputAgain += "                <option value=\"5\">Less than 50% of Cells are multi-layered<\/option>";
            inputAgain += "                <option value=\"6\">More than 50% of Cells are multi-layered<\/option>";
            inputAgain += "                <option value=\"7\">65% of Cells are multi-layered<\/option>";
            inputAgain += "                <option value=\"8\">80% of Cells are multi-layered<\/option>";
            inputAgain += "                <option value=\"9\">90% of Cells are multi-layered<\/option>";
            inputAgain += "                <option value=\"10\">Cells are mostly multi-layered<\/option>";
            inputAgain += "            <\/select>";
            inputAgain += "            <br>Uniformity of Cell Size:";
            inputAgain += "            <select id=\"p2\">";
            inputAgain += "                <option value=\"1\">Cells are completely uniform<\/option>";
            inputAgain += "                <option value=\"2\">10% of Cells are non-uniform<\/option>";
            inputAgain += "                <option value=\"3\">20% of Cells are non-uniform<\/option>";
            inputAgain += "                <option value=\"4\">35% of Cells are non-uniform<\/option>";
            inputAgain += "                <option value=\"5\">Less than 50% of Cells are non-uniform<\/option>";
            inputAgain += "                <option value=\"6\">More than 50% of Cells are non-uniform<\/option>";
            inputAgain += "                <option value=\"7\">65% of Cells are non-uniform<\/option>";
            inputAgain += "                <option value=\"8\">80% of Cells are non-uniform<\/option>";
            inputAgain += "                <option value=\"9\">90% of Cells are non-uniform<\/option>";
            inputAgain += "                <option value=\"10\">Cells are mostly non-uniform<\/option>";
            inputAgain += "            <\/select>";
            inputAgain += "            <br>Uniformity of Cell Shape:";
            inputAgain += "            <select id=\"p3\">";
            inputAgain += "                <option value=\"1\">Cells are completely uniform<\/option>";
            inputAgain += "                <option value=\"2\">10% of Cells are non-uniform<\/option>";
            inputAgain += "                <option value=\"3\">20% of Cells are non-uniform<\/option>";
            inputAgain += "                <option value=\"4\">35% of Cells are non-uniform<\/option>";
            inputAgain += "                <option value=\"5\">Less than 50% of Cells are non-uniform<\/option>";
            inputAgain += "                <option value=\"6\">More than 50% of Cells are non-uniform<\/option>";
            inputAgain += "                <option value=\"7\">65% of Cells are non-uniform<\/option>";
            inputAgain += "                <option value=\"8\">80% of Cells are non-uniform<\/option>";
            inputAgain += "                <option value=\"9\">90% of Cells are non-uniform<\/option>";
            inputAgain += "                <option value=\"10\">Cells are mostly non-uniform<\/option>";
            inputAgain += "            <\/select>";
            inputAgain += "            <br>Marginal Adhesion:";
            inputAgain += "            <select id=\"p4\">";
            inputAgain += "                <option value=\"1\">Cells completely stick together<\/option>";
            inputAgain += "                <option value=\"2\">10% of cells do not stick together<\/option>";
            inputAgain += "                <option value=\"3\">20% of cells do not stick together<\/option>";
            inputAgain += "                <option value=\"4\">35% of cells do not stick together<\/option>";
            inputAgain += "                <option value=\"5\">Less than 50% of cells do not stick together<\/option>";
            inputAgain += "                <option value=\"6\">More than 50% of cells do not stick together<\/option>";
            inputAgain += "                <option value=\"7\">65% of cells do not stick together<\/option>";
            inputAgain += "                <option value=\"8\">80% of cells do not stick together<\/option>";
            inputAgain += "                <option value=\"9\">90% of cells do not stick together<\/option>";
            inputAgain += "                <option value=\"10\">Most cells do not stick together<\/option>";
            inputAgain += "            <\/select>";
            inputAgain += "            <br>Single Epithelial Cell Size:";
            inputAgain += "            <select id=\"p5\">";
            inputAgain += "                <option value=\"1\">Epithelial Cell Size is completely normal<\/option>";
            inputAgain += "                <option value=\"2\">10% of Epithelial Cells are abnormal<\/option>";
            inputAgain += "                <option value=\"3\">20% of Epithelial Cells are abnormal<\/option>";
            inputAgain += "                <option value=\"4\">35% of Epithelial Cells are abnormal<\/option>";
            inputAgain += "                <option value=\"5\">Less than 50% of Epithelial Cells are abnormal<\/option>";
            inputAgain += "                <option value=\"6\">More than 50% of Epithelial Cells are abnormal<\/option>";
            inputAgain += "                <option value=\"7\">65% of Epithelial Cells are abnormal<\/option>";
            inputAgain += "                <option value=\"8\">80% of Epithelial Cells are abnormal<\/option>";
            inputAgain += "                <option value=\"9\">90% of Epithelial Cells are abnormal<\/option>";
            inputAgain += "                <option value=\"10\">Most Epithelial Cells are abnormal<\/option>";
            inputAgain += "            <\/select>";
            inputAgain += "            <br>Bare nuclei:";
            inputAgain += "            <select id=\"p6\">";
            inputAgain += "                <option value=\"1\">Nuclei are not surrounded by cytoplasm<\/option>";
            inputAgain += "                <option value=\"2\">10% of Nuclei are surrounded by cytoplasm<\/option>";
            inputAgain += "                <option value=\"3\">20% of Nuclei are surrounded by cytoplasm<\/option>";
            inputAgain += "                <option value=\"4\">35% of Nuclei are surrounded by cytoplasm<\/option>";
            inputAgain += "                <option value=\"5\">Less than 50% of Nuclei are surrounded by cytoplasm<\/option>";
            inputAgain += "                <option value=\"6\">More than 50% of Nuclei are surrounded by cytoplasm<\/option>";
            inputAgain += "                <option value=\"7\">65% of Nuclei are surrounded by cytoplasm<\/option>";
            inputAgain += "                <option value=\"8\">80% of Nuclei are surrounded by cytoplasm<\/option>";
            inputAgain += "                <option value=\"9\">90% of Nuclei are surrounded by cytoplasm<\/option>";
            inputAgain += "                <option value=\"10\">Most Nuclei are surrounded by cytoplasm<\/option>";
            inputAgain += "            <\/select>";
            inputAgain += "            <br>Bland Chromatin:";
            inputAgain += "            <select id=\"p7\">";
            inputAgain += "                <option value=\"1\">Chromatin texture is completely uniform<\/option>";
            inputAgain += "                <option value=\"2\">10% of Chromatin texture is non-uniform<\/option>";
            inputAgain += "                <option value=\"3\">20% of Chromatin texture is non-uniform<\/option>";
            inputAgain += "                <option value=\"4\">35% of Chromatin texture is non-uniform<\/option>";
            inputAgain += "                <option value=\"5\">Less than 50% of Chromatin texture is non-uniform<\/option>";
            inputAgain += "                <option value=\"6\">More than 50% of Chromatin texture is non-uniform<\/option>";
            inputAgain += "                <option value=\"7\">65% of Chromatin texture is non-uniform<\/option>";
            inputAgain += "                <option value=\"8\">80% of Chromatin texture is non-uniform<\/option>";
            inputAgain += "                <option value=\"9\">90% of Chromatin texture is non-uniform<\/option>";
            inputAgain += "                <option value=\"10\">Most Chromatin texture is non-uniform<\/option>";
            inputAgain += "            <\/select>";
            inputAgain += "            <br>Normal Nucleoli:";
            inputAgain += "            <select id=\"p8\">";
            inputAgain += "                <option value=\"1\">Nucleoli are normal in size and count<\/option>";
            inputAgain += "                <option value=\"2\">10% of Nucleoli are abnormal<\/option>";
            inputAgain += "                <option value=\"3\">20% of Nucleoli are abnormal<\/option>";
            inputAgain += "                <option value=\"4\">35% of Nucleoli are abnormal<\/option>";
            inputAgain += "                <option value=\"5\">Less than 50% of Nucleoli are abnormal<\/option>";
            inputAgain += "                <option value=\"6\">More than 50% of Nucleoli are abnormal<\/option>";
            inputAgain += "                <option value=\"7\">65% of Nucleoli are abnormal<\/option>";
            inputAgain += "                <option value=\"8\">80% of Nucleoli are abnormal<\/option>";
            inputAgain += "                <option value=\"9\">90% of Nucleoli are abnormal<\/option>";
            inputAgain += "                <option value=\"10\">Most Nucleoli are abnormal<\/option>";
            inputAgain += "            <\/select>";
            inputAgain += "            <br>Mitoses:";
            inputAgain += "            <select id=\"p9\">";
            inputAgain += "                <option value=\"1\">Mitotic activity is normal<\/option>";
            inputAgain += "                <option value=\"2\">10% of Mitotic activity is abnormal<\/option>";
            inputAgain += "                <option value=\"3\">20% of Mitotic activity is abnormal<\/option>";
            inputAgain += "                <option value=\"4\">35% of Mitotic activity is abnormal<\/option>";
            inputAgain += "                <option value=\"5\">Less than 50% of Mitotic activity is abnormal<\/option>";
            inputAgain += "                <option value=\"6\">More than 50% of Mitotic activity is abnormal<\/option>";
            inputAgain += "                <option value=\"7\">65% of Mitotic activity is abnormal<\/option>";
            inputAgain += "                <option value=\"8\">80% of Mitotic activity is abnormal<\/option>";
            inputAgain += "                <option value=\"9\">90% of Mitotic activity is abnormal<\/option>";
            inputAgain += "                <option value=\"10\">Most Mitotic activity is abnormal<\/option>";
            inputAgain += "            <\/select>";
            inputAgain += "            <button id=\"submitted\">Analyse<\/button>";
            inputAgain += "            <!--Output Start -->";
            inputAgain += "            <div id=\"output\"><\/div>";
            inputAgain += "            <!--Output End -->";




// Code End
        }
    };

    app.oncheckpoint = function (args) {
        // TODO: This application is about to be suspended. Save any state
        // that needs to persist across suspensions here. You might use the
        // WinJS.Application.sessionState object, which is automatically
        // saved and restored across suspension. If you need to complete an
        // asynchronous operation before your application is suspended, call
        // args.setPromise().
    };

    app.start();
})();