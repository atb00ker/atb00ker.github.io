site.timeline = (function () {
    var metaData,
        globalTimelinePageCount,
        lastPage,
        firstPage,
        loadTimelineFor,
        paginationContainer = document.getElementById('paginationContainer'),
        timelineContainer = document.getElementById('timeline');

    // Needs Improvement
    initTimelinePage();
    function initTimelinePage() {
        site.common.fetchJSON(function (result) {
            metaData = JSON.parse(result);
            globalTimelinePageCount = metaData.meta.length - 1;
            paginationContainer.innerHTML = '';
            var html = prevTimelinePage();
            if (firstPage)
                html = '<li id="backwards" class="page-item disabled"> \
                <a class="page-link" title="Start"><i class="pagination-icon fas fa-angle-double-left"></i></a> \
                </li>' + html;
            else
                html = '<li id="backwards" class="page-item"> \
                <a class="page-link" onclick="site.timeline.setTimelinePage(false);" title="Backwards"><i class="pagination-icon fas fa-angle-double-left"></i></a> \
                </li>' + html;
            html += '<li id="forwards" id="Page" class="page-item disabled"><a class="page-link" title="End"><i class="pagination-icon fas fa-angle-double-right"></i></a></li>';
            paginationContainer.innerHTML += html;
            loadTimeline(loadTimelineFor);
        }, 'site.json')
    }
    function prevTimelinePage() {
        if (lastPage) {
            lastPage = false;
            prevTimelinePage();
        }
        loadTimelineFor = metaData.meta[globalTimelinePageCount].link;
        var listItems = '';
        for (i = 0; i < 3; i++) {
            listItems = '<li class="page-item"> \
            <a class="page-link" onclick="site.timeline.loadTimeline(\''+ metaData.meta[globalTimelinePageCount].link + '\')">' + metaData.meta[globalTimelinePageCount].tag + '</a></li>' + listItems;
            if (globalTimelinePageCount == 0) {
                globalTimelinePageCount = i;
                firstPage = true;
                break;
            }
            globalTimelinePageCount--;
        }
        return listItems;
    }
    function nextTimelinePage() {
        firstPage = false;
        var listItems = '';
        for (i = 0; i < 3; i++) {
            globalTimelinePageCount++;
            listItems += '<li class="page-item"> \
            <a class="page-link" onclick="site.timeline.loadTimeline(\''+ metaData.meta[globalTimelinePageCount].link + '\')">' + metaData.meta[globalTimelinePageCount].tag + '</a></li>';
        }
        loadTimelineFor = metaData.meta[globalTimelinePageCount].link;
        if (globalTimelinePageCount == metaData.meta.length - 1)
            lastPage = true;
        return listItems;
    }
    function setTimelinePage(is_next) {
        var html;
        paginationContainer.innerHTML = '';
        if (is_next)
            html = nextTimelinePage();
        else
            html = prevTimelinePage();

        if (firstPage)
            html = '<li id="backwards" class="page-item disabled"> \
                <a class="page-link" title="Start"><i class="pagination-icon fas fa-angle-double-left"></i></a> \
                </li>' + html;
        else
            html = '<li id="backwards" class="page-item"> \
                <a class="page-link" onclick="site.timeline.setTimelinePage(false);" title="Backwards"><i class="pagination-icon fas fa-angle-double-left"></i></a> \
                </li>' + html;

        if (lastPage)
            html += '<li id="forwards" id="Page" class="page-item disabled"><a class="page-link" title="End">';
        else
            html += '<li id="forwards" class="page-item"> \
        <a class="page-link" onclick="site.timeline.setTimelinePage(true);" title="Forward">';
        html += '<i class="pagination-icon fas fa-angle-double-right"></i></a></li>';

        paginationContainer.innerHTML += html;
        loadTimeline(loadTimelineFor);
    }
    // Needs Improvement End
    function loadTimeline(link) {
        timelineContainer.innerHTML = '';
        site.common.fetchJSON(function (result) {
            var timelineData = JSON.parse(result);
            htmlTimeline(timelineData);
        }, link)
    }
    function htmlTimeline(timelineData) {
        var html = '';
        for (item in timelineData.entries) {
            html += '<div class="entry">';
            if (timelineData.entries[item].special)
                html += '<div class="title">' + timelineData.entries[item].title + '</div>';
            else
                html += '<div class="title big">' + timelineData.entries[item].title + '</div>';
            html += '<div class="body"><p>' + timelineData.entries[item].content + '</p></div></div>';
        }
        timelineContainer.innerHTML = html;
    }
    return {
        setTimelinePage: function (is_next) {
            setTimelinePage(is_next);
        },
        loadTimeline: function (link) {
            loadTimeline(link);
        }
    };
})();
