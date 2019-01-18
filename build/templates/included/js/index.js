site.home = (function () {
    initQuotes();
    function initQuotes() {
        var quoteNumber = Math.floor(Math.random() * (quoteCollection.length - 1));
        htmlQuotes(quoteCollection[quoteNumber].quote, quoteCollection[quoteNumber].speaker);
    }
    function htmlQuotes(introQuote, introSpeaker) {
        var introQuoteContainer = document.getElementById('introQuote');
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
    // Load desktop images only when screen size is greater than 720px
    if (window.innerWidth > 720) {
        var template = document.getElementById('skillsTemplate');
        var clone = document.importNode(template.content, true);
        var host = document.getElementById('skillsContainer');
        host.appendChild(clone);
    }
    return {
        showSnacks: function () {
            showSnacks();
        }
    };
})();
