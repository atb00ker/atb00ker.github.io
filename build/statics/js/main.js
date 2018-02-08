var html,
    skillsHtmlContainer = document.getElementById('skillsContainer'),
    introQuoteContainer = document.getElementById('introQuote'),
    projectsContainer = document.getElementById('projectsContainer');
document.body.scrollTop = document.documentElement.scrollTop = 0; // Scroll to Top of the page
fetchData();
function fetchData() {
    var metaDataList = [];
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET","https://docs.google.com/spreadsheets/d/1x_Z_B5rDPbWoJjJK_R_jZwnvMaylVu_Lnp-qYg5xjvs/htmlview", true);
    xhttp.send();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var response = new DOMParser().parseFromString(this.responseText, "text/html");
            metaDataList = response.evaluate("//div[@id='sheets-viewport']/div[@id='0']//table[@class='waffle']/tbody/tr/td//text()",response,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
            // Null the containers
                skillsHtmlContainer.innerHTML = '';
            for (i=4;i<metaDataList.snapshotLength;i+=4)
                htmlSkillBoxes(metaDataList.snapshotItem(i).nodeValue, metaDataList.snapshotItem(i+1).nodeValue, metaDataList.snapshotItem(i+2).nodeValue, metaDataList.snapshotItem(i+3).nodeValue);
            metaDataList = response.evaluate("//div[@id='sheets-viewport']/div[@id='64538848']//table[@class='waffle']/tbody/tr/td//text()",response,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
            do {
                random = Math.floor(Math.random() * metaDataList.snapshotLength);
            } while(random < 3);
            if(random % 2 == 0)
                htmlQuotes(metaDataList.snapshotItem(random).nodeValue, metaDataList.snapshotItem(random+1).nodeValue);
            else
                htmlQuotes(metaDataList.snapshotItem(random-1).nodeValue, metaDataList.snapshotItem(random).nodeValue);
            metaDataList = response.evaluate("//div[@id='sheets-viewport']/div[@id='1172547448']//table[@class='waffle']/tbody/tr/td//text()",response,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
            projectsContainer.innerHTML = '';
            for (i=5;i<metaDataList.snapshotLength;i+=5)
                htmlProjectBoxes(metaDataList.snapshotItem(i).nodeValue, metaDataList.snapshotItem(i+1).nodeValue, metaDataList.snapshotItem(i+2).nodeValue, metaDataList.snapshotItem(i+3).nodeValue, metaDataList.snapshotItem(i+4).nodeValue);

        }
    };
}

function htmlProjectBoxes(link, icon, title, body, longBody) {
    if(window.innerWidth > 1100)
        html = "<div id='projectBoxWrapper' class='col-4 col-12-sm'><div class='projectBox'><a href='" + link + "'><div class='projectBoxImage'><div class='projectBoxName'><i class='"+ icon +"'></i> "+ title +"</div></div></a><div class='projectBoxDesc'>"+ body +"</div><div class='projectBoxLongDesc'>" + longBody + "</div></div></div>";
    else
        html = "<div id='projectBoxWrapper' class='col-6 col-12-sm'><div class='projectBox'><a href='" + link + "'><div class='projectBoxImage'><div class='projectBoxName'><i class='"+ icon +"'></i> "+ title +"</div></div></a><div class='projectBoxDesc'>"+ body +"</div><div class='projectBoxLongDesc'>" + longBody + "</div></div></div>";
    projectsContainer.innerHTML += html;
}

function htmlSkillBoxes(skillIcon, skillName, subSkillDesc, subSkillLevel) {
    subSkillDesc = subSkillDesc.split(", ");
    subSkillLevel = subSkillLevel.split(", ");
    html = "<div class='col-12-sm col-4'><div class='skillsContainerBox'><div class='sub-header-icon'><i class='"+skillIcon+"' aria-hidden='true'></i></div><div class='section-sub-header'>"+skillName+"</div><hr>";
    for(iterator in subSkillDesc) {
    if (subSkillLevel[iterator] == 'Comfortable')
        html += "<div class='col-6  col-6-sm color-comfortable'>"+subSkillDesc[iterator]+"</div><div class='col-6  col-6-sm color-comfortable'>"+subSkillLevel[iterator]+"</div>";
    else if (subSkillLevel[iterator] == 'Intermediate')
        html += "<div class='col-6  col-6-sm color-intermediate'>"+subSkillDesc[iterator]+"</div><div class='col-6  col-6-sm color-intermediate'>"+subSkillLevel[iterator]+"</div>";
    else if (subSkillLevel[iterator] == 'Learning')
        html += "<div class='col-6  col-6-sm color-learning'>"+subSkillDesc[iterator]+"</div><div class='col-6  col-6-sm color-learning'>"+subSkillLevel[iterator]+"</div>";
    }
    html += "</div></div></div>";
    skillsHtmlContainer.innerHTML += html;
}

function htmlQuotes(introQuote, introSpeaker) {
    introQuoteContainer.innerHTML = '';
    if (introSpeaker != 'NULL')
        html = '"'+introQuote+'"<br><div id="introSpeaker">— '+introSpeaker+'</div>';
    else
        html = '"'+introQuote+'"</div>';
    introQuoteContainer.innerHTML += html;
}

showSnacks();
function showSnacks() {
    var snackbarContainer = document.getElementById("snackbar");
    snackbarContainer.className = "show";
    setTimeout(function(){ snackbarContainer.className = snackbarContainer.className.replace("show", ""); }, 3000);
}

function toggleSkillSectionSize(elementWrapper, elementToResize, boxSize) {
    var sectionWrapper = document.getElementById(elementWrapper);
    var buttonToResize = document.getElementById(elementToResize);
    if (sectionWrapper.style.height != "100%") {
        buttonToResize.innerHTML = 'Less';
        sectionWrapper.style.height = "100%";
    } else {
        sectionWrapper.style.height = boxSize;
        buttonToResize.innerHTML = 'More';
    }
}

// <div class='row'>
//     <div id='extraSkills'>
//         <div class='extraProjects'> something </div>
//         <div class='extraProjects'> something </div>
//     </div>
// </div>
