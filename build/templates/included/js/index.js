site.home = (function () {
    var introQuoteContainer = document.getElementById('introQuote'),
        skillsContainer = document.getElementById('skillsContainer'),
        expBoxContainer = document.getElementById('expBoxesContainer');
    initQuotes();
    function showSnacks() {
        var snackbarContainer = document.getElementById("snackbar");
        snackbarContainer.className = "show";
        setTimeout(function () { snackbarContainer.className = snackbarContainer.className.replace("show", ""); }, 3000);
    }
    function initQuotes() {
        site.common.fetchJSON(function (result) {
            var quotesData = JSON.parse(result);
            var quoteNumber = Math.floor(Math.random() * (quotesData.quotes.length - 1));
            htmlQuotes(quotesData.quotes[quoteNumber].quote, quotesData.quotes[quoteNumber].speaker);
        }, 'site_quotes.json')
    }
    function initExperience() {
        site.common.fetchJSON(function (result) {
            var expData = JSON.parse(result);
            htmlExperience(expData);
        }, 'site_exp.json')
    }
    function initSkills() {
        site.common.fetchJSON(function (result) {
            var skillsData = JSON.parse(result);
            htmlSkills(skillsData);
        }, 'site_skills.json')
    }
    function htmlQuotes(introQuote, introSpeaker) {
        introQuoteContainer.innerHTML = '';
        if (introSpeaker != 'NULL')
            html = '"' + introQuote + '"<br><div id="introSpeaker">— ' + introSpeaker + '</div>';
        else
            html = '"' + introQuote + '"</div>';
        introQuoteContainer.innerHTML += html;
    }
    function htmlExperience(expData) {
        /*
        <div class='col-8 col-12-sm expBox'>
            <div class='row'>
                <div class='col-3 expBoxImageContainer'>
                    <img class='expBoxImage' src='assets/images/experience/FOSSEE.jpg' title='Experience Image'>
                </div>
                <div class='col-9 col-12-sm expBoxText'>
                    <div class='expBoxIconContainer'>
                    <i class="fab fa-github expBoxIcon" title='Github'></i>
                    <i class="fas fa-link expBoxIcon" title='Link'></i>
                    <i class="fas fa-certificate expBoxIcon" title='Certificate'></i>
                    </div>
                    <div class='expBoxTitle'> Amity ALiAS Web Application</div>
                    <div class='expBoxDate'> May 2018 – July 2018 </div>
                    Elit risus convallis eros pretium quam, arcu purus ridiculus interdum proin, lacus aenean eros conubia nascetur, nisi curabitur semper diam faucibus molestie.
                </div>
            </div>
        </div>
        */
        var html = '';
        for (i = 0; i < expData.experience.length; i++) {
            html = "<div class='col-8 col-12-sm expBox'><div class='row'><div class='col-3 expBoxImageContainer'><img class='expBoxImage' src='" + expData.experience[i].image + "' title='Experience Image'></div><div class='col-9 col-12-sm expBoxText'><div class='expBoxIconContainer'>";
            if (expData.experience[i].github != "NULL")
                html += "<a href='" + expData.experience[i].github + "'><i class='fab fa-github expBoxIcon' title='Github'></i></a>";
            if (expData.experience[i].link != "NULL")
                html += "<a href='" + expData.experience[i].link + "'><i class='fas fa-link expBoxIcon' title='Link'></i></a>";
            if (expData.experience[i].certificate != "NULL")
                html += "<a href='" + expData.experience[i].certificate + "'><i class='fas fa-certificate expBoxIcon' title='Certificate'></i></a>";
            html += "</div><div class='expBoxTitle'>" + expData.experience[i].title + "</div><div class='expBoxDate'> " + expData.experience[i].duration + "</div>" + expData.experience[i].content + "</div></div></div>";
            expBoxContainer.innerHTML = html;
        }
    }
    function htmlSkills(skillsData) {
        /* 
        <br>
        <img class='skillIcon' src='https://codetrace.com/static/images/languages/python.svg' title='Python'>
        */
        var html = '';
        for (i = 0; i < skillsData.skills.length; i++) {
            if (skillsData.skills[i].special)
                html += "<br>";
            html += "<img class='skillIcon' src='" + skillsData.skills[i].image + "' title='" + skillsData.skills[i].title + "'>";
        }
        skillsContainer.innerHTML = html;
    }
    return {
        showSnacks: function () {
            showSnacks();
        }
    };
})();

site.home.showSnacks();
