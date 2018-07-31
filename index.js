// variable holding the information about pages; add a new page object to the array to add pages

var appPages = 
  [ 
    {navDisplayTitle: "Home", file: "home", iconName: "home",},
    {navDisplayTitle: "UIC Courses", file: "uic-classes", iconName: "info"}
  ];

var courses = {
    "2018" :
        [ { semester: "Fall", 
            course: "IT202", 
            coursePage: "https://docs.google.com/document/d/1uaZ3_kO3nsdGTTvVqjjjMDbgZClNU6huVas8xqhcjXE/edit?usp=sharing",
            comment: "Note that this is the Syllabus from my SPRING 2018 class."},
          { semester: "Fall", 
            course: "CS111", 
            coursePage: "https://www.cs.uic.edu/pub/CS111/CS111Spring2018/syl111s18.pdf",
            comment: "Note that this is the Syllabus from Professor Troy's SPRING 2018 class."},            
        ]
    
}



// you shouldn't need to change things below this line

// variables for commonly referenced components
var drawer, snackbar, dialog;

$(document).ready(function() {

    // create the references to the MCW components
    drawer = $(".mdc-drawer--temporary")[0].MDCTemporaryDrawer;
    snackbar = $(".mdc-snackbar")[0].MDCSnackbar;
    dialog = $(".mdc-dialog")[0].MDCDialog;
    
    // create nav elements based on the appPages variable
    // loop through the set of pages
    $.each(appPages, function(i,v) {
        console.log(v);
        var currentPageObject = v;
        // clone the example
        var navClone = $(".mdc-drawer__content .template").clone();
        var iconClone = navClone.find("i .mdc-list-item__graphic");

        // replace clone elements with page-specific values
        navClone.attr("data-page",v.file);

        navClone.find(".drawer-list-item-text").text(v.navDisplayTitle);
        if (v.hasOwnProperty("iconName")) {
          iconClone.text(v.iconName);
          navClone.find(".drawer-list-item-text").prepend(iconClone);
        }
        navClone.removeClass("template");
        $(".mdc-drawer__content").append(navClone);
    });
    
    
    // open drawer when top nav icon clicked
    $(".mdc-top-app-bar__navigation-icon").on("click", function(e) {
        drawer.open = true;
    });

    // load related page when drawer nav item clicked
    $(".mdc-drawer--temporary .mdc-list-item").on("click", function(e) {
      console.log($(this).attr("data-page"));
      showPage($(this).attr("data-page"));
    });
    
    showPage("home");
  
});

/**
   * Load the specific page content
   * @param {string} pageName - The page to load.
   */
  function showPage(pageName) {
    drawer.open = false;
    $("main").load("./page-content/_loading.html", function() {
      var url = "./page-content/_" + pageName + ".html";
      $("main").load(url, function() {
            window.mdc.autoInit($("main")[0]);
      });
    }); 
  }
