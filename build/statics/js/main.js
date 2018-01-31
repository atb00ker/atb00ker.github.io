var skillsHtmlContainer = document.getElementById('skillsContainer');

function fetchData() {
    var metaDataList = [];
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET","https://docs.google.com/spreadsheets/d/1x_Z_B5rDPbWoJjJK_R_jZwnvMaylVu_Lnp-qYg5xjvs/htmlview", true);
    xhttp.send();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var response = new DOMParser().parseFromString(this.responseText, "text/html");
            metaDataList = response.evaluate("//div[@id='sheets-viewport']/div[@id='0']//table[@class='waffle']/tbody/tr/td//text()",response,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
            for (i=4;i<metaDataList.snapshotLength;i+=4)
                htmlSkillBoxes(metaDataList.snapshotItem(i).nodeValue, metaDataList.snapshotItem(i+1).nodeValue, metaDataList.snapshotItem(i+2).nodeValue, metaDataList.snapshotItem(i+3).nodeValue);
        }
    };
}

function htmlSkillBoxes(skillIcon, skillName, subSkillDesc, subSkillLevel) {
    subSkillDesc = subSkillDesc.split(", ");
    subSkillLevel = subSkillLevel.split(", ");
    var html = "<div class='col-12-sm col-4'><div class='skillsContainerBox'><div class='sub-header-icon'><i class='"+skillIcon+"' aria-hidden='true'></i></div><div class='section-sub-header'>"+skillName+"</div><hr>";
    for(iterator in subSkillDesc) {
    if (subSkillLevel[iterator] == 'Comfortable')
        html += "<div style='color: green' class='col-6'>"+subSkillDesc[iterator]+"</div><div class='col-6' style='color: green'>"+subSkillLevel[iterator]+"</div>";
    else if (subSkillLevel[iterator] == 'Intermediate')
        html += "<div style='color: red' class='col-6'>"+subSkillDesc[iterator]+"</div><div class='col-6' style='color: red'>"+subSkillLevel[iterator]+"</div>";
    else if (subSkillLevel[iterator] == 'Learning')
        html += "<div style='color: blue' class='col-6'>"+subSkillDesc[iterator]+"</div><div class='col-6' style='color: blue'>"+subSkillLevel[iterator]+"</div>";
    }
    html += "</div></div></div>";
    skillsHtmlContainer.innerHTML += html;
}

// toggleHometooltip();
// void toggleHometooltip() {
//     console.log("Nice Day Mate!");
// }
