(function () {
    var html,
        introQuoteContainer = document.getElementById('introQuote');
    document.body.scrollTop = document.documentElement.scrollTop = 0; // Scroll to Top of the page
    fetchData();

    function fetchData() {
        var metaDataList = [];
        var xhttp = new XMLHttpRequest();
        xhttp.open("GET", "https://docs.google.com/spreadsheets/d/1x_Z_B5rDPbWoJjJK_R_jZwnvMaylVu_Lnp-qYg5xjvs/htmlview", true);
        xhttp.send();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var response = new DOMParser().parseFromString(this.responseText, "text/html");
                metaDataList = response.evaluate("//div[@id='sheets-viewport']/div[@id='0']//table[@class='waffle']/tbody/tr/td//text()", response, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
                for (i = 4; i < metaDataList.snapshotLength; i += 4)
                    htmlSkillBoxes(metaDataList.snapshotItem(i).nodeValue, metaDataList.snapshotItem(i + 1).nodeValue, metaDataList.snapshotItem(i + 2).nodeValue, metaDataList.snapshotItem(i + 3).nodeValue);
                metaDataList = response.evaluate("//div[@id='sheets-viewport']/div[@id='64538848']//table[@class='waffle']/tbody/tr/td//text()", response, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
                do { random = Math.floor(Math.random() * metaDataList.snapshotLength); } while (random < 3);
                if (random % 2 == 0)
                    htmlQuotes(metaDataList.snapshotItem(random).nodeValue, metaDataList.snapshotItem(random + 1).nodeValue);
                else
                    htmlQuotes(metaDataList.snapshotItem(random - 1).nodeValue, metaDataList.snapshotItem(random).nodeValue);
            }
        };
    }

    function htmlQuotes(introQuote, introSpeaker) {
        introQuoteContainer.innerHTML = '';
        if (introSpeaker != 'NULL')
            html = '"' + introQuote + '"<br><div id="introSpeaker">— ' + introSpeaker + '</div>';
        else
            html = '"' + introQuote + '"</div>';
        introQuoteContainer.innerHTML += html;
    }

    showSnacks();
    function showSnacks() {
        var snackbarContainer = document.getElementById("snackbar");
        snackbarContainer.className = "show";
        setTimeout(function () { snackbarContainer.className = snackbarContainer.className.replace("show", ""); }, 3000);
    }

    function callMoreContactInfo(salt) {
        var metaDataList = [],
            secret_html,
            connectContainer = document.getElementById('connect-with-me'),
            connectBtn = document.getElementById("specialContactBtn"),
            snackbarContainer = document.getElementById("snackbar-easter-egg");
        snackbarContainer.className = "show";
        setTimeout(function () { snackbarContainer.className = snackbarContainer.className.replace("show", ""); }, 3000);
        var xhttp = new XMLHttpRequest();
        xhttp.open("GET", "https://docs.google.com/spreadsheets/d/1x_Z_B5rDPbWoJjJK_R_jZwnvMaylVu_Lnp-qYg5xjvs/htmlview", true);
        xhttp.send();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                connectBtn.setAttribute("class", "hidden");
                var response = new DOMParser().parseFromString(this.responseText, "text/html");
                metaDataList = response.evaluate("//div[@id='sheets-viewport']/div[@id='487708423']//table[@class='waffle']/tbody/tr/td//text()", response, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
                for (i = 3; i < metaDataList.snapshotLength; i += 3) {
                    secret_html = '<a title="' + metaDataList.snapshotItem(i + 1).nodeValue + '" href="' + metaDataList.snapshotItem(i + 2).nodeValue + '" target="_blank"><i class="' + metaDataList.snapshotItem(i).nodeValue + '"></i></a>';
                    connectContainer.innerHTML += secret_html;
                }
                if (salt === 'GodMode') {
                    metaDataList = response.evaluate("//div[@id='sheets-viewport']/div[@id='1823901818']//table[@class='waffle']/tbody/tr/td//text()", response, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
                    for (i = 3; i < metaDataList.snapshotLength; i += 3) {
                        secret_html = '<a title="' + metaDataList.snapshotItem(i + 1).nodeValue + '" href="' + metaDataList.snapshotItem(i + 2).nodeValue + '" target="_blank"><i class="' + metaDataList.snapshotItem(i).nodeValue + '"></i></a>';
                        connectContainer.innerHTML += secret_html;
                    }
                }
            }
        };
    }
})();