"use strict";

var appContent = $(".app-content"),
    appContentOverlay = $(".app-content-overlay"),
    sideBarLeft = $(".sidebar-left"),
    kioskDetails = $(".kiosk-details"),
    kioskApplication = $(".kiosk-application"),
    kioskNewSideBar = $(".new-kiosk-sidebar"),
    kioskList = $(".kiosk-list"),
    kioskAppList = $(".kiosk-app-list"),
    checkbox_con = $(".user-action .checkbox-con"),
    $primary = "#5A8DEE";

class KioskController {
    constructor() {

    }

    static OnSuccessGetKioskForm() {

    }

    static OnErrorGetKioskForm() {
        $("#dvKioskForm").html(`<div class="text-center ">
                                    <i class="livicon-evo" data-options="name: bug.svg;  style: original; strokeColor:#5A8DEE; eventOn:grandparent; duration:0.85;"></i>
                                </div>
                                <h4 class='text-center p-2 text-danger'>Failed to load kiosk form! </br> please try again.</h4>`);
        $(".livicon-evo").updateLiviconEvo();
    }

    static OnBeginGetKioskForm() {
        $("#dvKioskForm").html(`<div class="text-center pt-2">
                                            <div class="spinner-grow text-primary spinner-border-lg" role="status">
                                                <span class="sr-only">Loading...</span>
                                            </div>
                                        </div><h4 class="text-center pb-2">Loading form please wait...</h4>`);
        kioskNewSideBar.addClass("show");
        appContentOverlay.addClass("show");
        sideBarLeft.removeClass("show");
    }

    static OnCancelKioskForm() {
        kioskNewSideBar.removeClass("show");
        appContentOverlay.removeClass("show");
        $('#compose-form').find("input").val(""); // input filed reset when close or cancel
    }

    static OnErrorGetKioskDetails() {
        $("#kiosk-details").html(`<div class="text-center pt-2">
                                    <i class="livicon-evo" data-options="name: bug.svg;  style: original; strokeColor:#5A8DEE;"></i>
                                </div>
                                <h4 class='text-center p-2 text-danger'>Failed to load kiosk data! </br> <a class="btn btn-warning btn-sm mt-2 glow shadow" href="#">Report this error.</a></h4>`);
        $(".livicon-evo").updateLiviconEvo();
    }

    static OnBeginGetKioskDetails() {
        $("#kiosk-details").html(`<div class="text-center pt-2">
                                            <div class="spinner-grow text-primary spinner-border-lg" role="status">
                                                <span class="sr-only">Loading...</span>
                                            </div>
                                        </div><h4 class="text-center pb-2">Loading form please wait...</h4>`);
        kioskDetails.toggleClass("show");
    }

    static OnGetKioskGetDetails(id) {
        $(".get-item").attr("data-ajax-url", "/kiosk/details/" + id);
        $(".get-item")[0].click();
        console.log(id);
    }
  
    initPage() {
        // To add Perfect Scrollbar
        // ---------------------------
        // left Sidebar
        if ($('.sidebar-menu-list').length > 0) {
            var sidebarMenuList = new PerfectScrollbar(".sidebar-menu-list", {
                wheelPropagation: false
            });
        }

        // list scroll
        if (kioskList.length > 0) {
            var kioskListContent = new PerfectScrollbar(".kiosk-list", {
                wheelPropagation: false
            });
        }

        // detail section
        if ($('.kiosk-scroll-area').length > 0) {
            var kioskScrollArea = new PerfectScrollbar(".kiosk-scroll-area", {
                wheelPropagation: false
            });
        }

        // new dialog scroll
        if (kioskNewSideBar.length > 0) {
            var newKioskSidebar = new PerfectScrollbar(".new-kiosk-sidebar", {
                wheelPropagation: false
            });
        }

        //------------------------------------
        // sidebar-left
        // -----------------------------------

        // Main menu toggle should hide app menu
        $('.menu-toggle').on('click', function (e) {
            appContent.find('.sidebar-left').removeClass('show');
            appContentOverlay.removeClass('show');
            kioskNewSideBar.removeClass('show');
        });

        // Sidebar menu close button on click remove show class form both compose mail sidebar and App content overlay
        kioskApplication.find(".sidebar-close-icon").on('click', function () {
            sideBarLeft.removeClass('show');
            appContentOverlay.removeClass('show');
        });

        // Email Sidebar Toggle button to show email sidebar
        $('.sidebar-toggle').on('click', function (e) {
            e.stopPropagation();
            sideBarLeft.toggleClass('show');
            appContentOverlay.addClass('show');
        });

        // On Ovelay Click remove show class form both sidebarleft and App content Overlay
        appContentOverlay.on('click', function () {
            sideBarLeft.removeClass('show');
            appContentOverlay.removeClass('show');
        });

        // Add class active on click of sidebar list folder and label
        kioskApplication.find(".list-group-messages a,.list-group-labels a").on('click', function () {
            var $this = $(this);
            if (kioskApplication.find('.list-group-messages a,.list-group-labels a').hasClass('active')) {
                kioskApplication.find('.list-group-messages a,.list-group-labels a').removeClass('active');
                $this.addClass("active");
                // live icon change when active state
                $(".list-group-messages a").siblings().find(".livicon-evo").updateLiviconEvo({
                    strokeColor: '#475f7b'
                });
                $this.find(".livicon-evo").updateLiviconEvo({
                    strokeColor: $primary
                });
            }
        });
        // sidebar content's close btn on small screen
        $(".sidebar-close-icon").on('click', function () {
            $('.sidebar-content').removeClass('show');
            appContentOverlay.removeClass('show');
        });


        // on click of go button or inbox btn get back to inbox
        $('.go-back, #inbox-menu').on('click', function (e) {
            e.stopPropagation();
            kioskDetails.removeClass('show');
        });


        // On checkbox click stop propogation
        checkbox_con.on("click", function (e) {
            e.stopPropagation();
        });

        // on checkbox status change add or remove background color class
        checkbox_con.find("input").on('change', function () {
            var $this = $(this);
            if ($this.is(":checked")) {
                $this.closest(".media").addClass("selected-row-bg");
            }
            else {
                $this.closest(".media").removeClass("selected-row-bg");
            }
        });

        // Select all checkbox
        $(document).on("change", ".kiosk-app-list .selectAll input", function () {
            if ($(this).is(":checked")) {
                checkbox_con.find("input").prop('checked', this.checked).closest(".media").addClass("selected-row-bg");
            }
            else {
                checkbox_con.find("input").prop('checked', "").closest(".media").removeClass("selected-row-bg");
            }
        });

        // On click of delete btn, delete all emails & show "no result found"
        kioskApplication.find(".mail-delete").on("click", function () {
            checkbox_con.find("input:checked").closest("li").remove();
            kioskApplication.find(".selectAll input").prop('checked', "");

            var tblRow = $(".kiosk-list .users-list-wrapper li:visible").length; //here tbl_test is table name

            //Check if table has row or not
            if (tblRow === 0) {
                kioskList.find('.no-results').addClass('show');
            }
            else {
                if (kioskList.find('.no-results').hasClass('show')) {
                    kioskList.find('.no-results').removeClass('show');
                }
            }
        });

        // Mark unread mail and remove background color when checkbox unchecked
        kioskApplication.find(".mail-unread").on("click", function () {
            checkbox_con.find("input:checked").closest("li").removeClass("mail-read");
            kioskApplication.find(".user-action .checkbox-con input:checked , .selectAll input").prop('checked', "").closest(".media").removeClass("selected-row-bg");
        });

        // Search Filter
        kioskAppList.find("#kiosk-search").on("keyup", function () {
            var value = $(this).val().toLowerCase();
            $('.media').css('animation', 'none')
            if (value != "") {
                kioskList.find(".users-list-wrapper li").filter(function () {
                    $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
                });
                var tbl_row = $(".kiosk-list .users-list-wrapper li:visible").length; //here tbl_row is table name

                //Check if table has row or not
                if (tbl_row == 0) {
                    kioskList.find('.no-results').addClass('show');
                }
                else {
                    if (kioskList.find('.no-results').hasClass('show')) {
                        kioskList.find('.no-results').removeClass('show');
                    }
                }
            }
            else {
                // If filter box is empty
                kioskList.find(".users-list-wrapper li").show();
                if (kioskList.find('.no-results').hasClass('show')) {
                    kioskList.find('.no-results').removeClass('show');
                }
            }
        });
        // manually hide dropdown menu
        $(".email-detail-head .dropdown-item").on("click", function () {
            $(".dropdown-toggle").dropdown('hide');
        });
        // ------------------------------------------
        // Compose new mail sidebar
        // -------------------------------------------

        // On Click of Close Icon btn, cancel btn and overlay remove show class from compose mail and overlay
        // and reset all form field
        $(".cancel-btn, .app-content-overlay").on('click', function () {
            kioskNewSideBar.removeClass('show');
            appContentOverlay.removeClass('show');
            $('#compose-form').find('input').val(""); // input filed reset when close or cancel
        });

        // stop propogation on dropdown
        $(".information .dropdown-menu a").on("click", function (e) {
            e.stopPropagation();
            $(this).parent().removeClass('show');
        });

        // On screen Resize JS
        // -----------------------------------

        // For app sidebar on small screen
        if ($(window).width() > 768) {
            if (appContentOverlay.hasClass('show')) {
                appContentOverlay.removeClass('show');
            }
        }

        $(window).on("resize", function () {
            // remove show classes from sidebar and overlay if size is > 768
            if ($(window).width() > 768) {
                if (appContentOverlay.hasClass('show')) {
                    sideBarLeft.removeClass('show');
                    appContentOverlay.removeClass('show');
                    kioskNewSideBar.removeClass('show');
                }
                $('#compose-form').find('input').val(""); // input filed reset when resize screen
            }
        });
    }
}

var KioskAjax = (function () {
    return {
        OnBeginSaveKiosk: function () {
            Swal.fire({
                title: 'Saving kiosk in progress',
                html: 'please wait...',
                allowOutsideClick: false,
                allowEscapeKey: false,
                confirmButtonText: "",
                onBeforeOpen: () => {
                    Swal.showLoading()
                }
            }).then((result) => {
            })
        },
        OnErrorSaveKiosk: function (data,status) {
            console.log(data);
            Swal.fire({
                title: 'Error',
                text: 'Failed to save kiosk :)'+status ,
                type: 'error'
            }).then((result) => {
                console.log(status );
            })
        },
        OnSuccessSaveKiosk: function() {


        },
        OnCompleteSaveKiosk : function (data,status) {
            //console.log(data);
            //console.log(status);
            ////console.log(xhr);
            //Swal.fire({
            //    title: 'Error',
            //    text: 'Failed to save kiosk :)' ,
            //    type: 'error'
            //}).then((result) => {
            //})
        }
    };
})();