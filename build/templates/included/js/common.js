site.common = (function () {
    document.body.scrollTop = document.documentElement.scrollTop = 0; // Scroll to Top of the page
    function callMoreContactInfo(salt) {
        var snackbarContainer = document.getElementById("snackbar-easter-egg");
        snackbarContainer.className = "show";
        setTimeout(function () { snackbarContainer.className = snackbarContainer.className.replace("show", ""); }, 3000);
        getContactInfo(salt);
    }
    function getContactInfo(salt) {
        var html = '',
            connectContainer = document.getElementById('connect-with-me'),
            connectBtn = document.getElementById("specialContactBtn");
        connectBtn.setAttribute("class", "hidden");
        for (iter in contactCollection) {

            if (contactCollection[iter].salt) {
                if (salt == "CatchEmAll")
                    html += '<a title="' + contactCollection[iter].name + '" href="' + contactCollection[iter].link + '" target="_blank" rel="noopener"><i class="' + contactCollection[iter].icon + '"></i></a>';
            }
            else
                html += '<a title="' + contactCollection[iter].name + '" href="' + contactCollection[iter].link + '" target="_blank"><i class="' + contactCollection[iter].icon + '"></i></a>';
        }
        connectContainer.innerHTML += html;
    }

    return {
        callMoreContactInfo: function (salt) {
            callMoreContactInfo(salt);
        },
        getContactInfo: function (salt) {
            getContactInfo(salt);
        }
    };
})();