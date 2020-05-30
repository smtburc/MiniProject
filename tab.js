var tabItems = document.getElementsByClassName('tab-item');
var tabContents = document.getElementsByClassName('tab-content');

function tabClick(index) {
    for (var tabitem of tabItems) {
        tabitem.classList.remove('active');
    }
    for (var tabContent of tabContents) {
        tabContent.classList.remove('active');
    }
    tabItems[index].classList.add('active');
    tabContents[index].classList.add('active');
}

function preInit() {
    tabItems[0].onclick = function () {
        tabClick(0);
    };
    tabItems[1].onclick = function () {
        tabClick(1);
    };
}

preInit();
