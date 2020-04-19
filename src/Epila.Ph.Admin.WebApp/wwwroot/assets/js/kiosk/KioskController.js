"use strict";

var appContent = $(".app-content"),
    appContentOverlay = $(".app-content-overlay"),
    sideBarLeft = $(".sidebar-left"),
    kioskDetails = $(".kiosk-details"),
    email_application = $(".kiosk-application"),
    kioskNewSideBar = $(".new-kiosk-sidebar"),
    kioskList = $(".kiosk-list"),
    email_app_list = $(".kiosk-app-list"),
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

    initPage() {
        // To add Perfect Scrollbar
        // ---------------------------

        // Email left Sidebar
        if ($('.sidebar-menu-list').length > 0) {
            var sidebarMenuList = new PerfectScrollbar(".sidebar-menu-list", {
                wheelPropagation: false
            });
        }

        // User list scroll
        if (kioskList.length > 0) {
            var kioskList = new PerfectScrollbar(".kiosk-list", {
                wheelPropagation: false
            });
        }

        // Email detail section
        if ($('.kiosk-scroll-area').length > 0) {
            var kioskScrollArea = new PerfectScrollbar(".kiosk-scroll-area", {
                wheelPropagation: false
            });
        }

        // new email dialog scroll
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
        email_application.find(".sidebar-close-icon").on('click', function () {
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
        email_application.find(".list-group-messages a,.list-group-labels a").on('click', function () {
            var $this = $(this);
            if (email_application.find('.list-group-messages a,.list-group-labels a').hasClass('active')) {
                email_application.find('.list-group-messages a,.list-group-labels a').removeClass('active');
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

        // -------------------------------
        // Content Right
        // -------------------------------

        // on click show class from Email details
        email_app_list.find('.kiosk-list li').on('click', function () {
            var data = $(this)[0].dataset;
            console.log($(this));
            var id = data.kioskid;
            $.ajaxPrefilter(function (options) {
                options.async = true;
            });
            $.ajax({
                url: `/kiosk/details/${id}`,
                dataType: "html",
                beforeSend: function () {
                    console.log("loading...");
                    $("#kiosk-details").html(`<div class="text-center pt-2">
                                            <div class="spinner-grow text-primary spinner-border-lg" role="status">
                                                <span class="sr-only">Loading...</span>
                                            </div>
                                        </div><h4 class="text-center pb-2">Loading ${data.kioskname} details, please wait...</h4>`);
                },
                complete: function () {
                    console.log("complete request");
                },
                success: function (html) {
                    $("#kioskDetailHeader").text(data.kioskname);
                    $("#kiosk-details").html("loading --");
                    $("#kiosk-details").html(html);
                },
                error: function (jqXhr, textStatus, errorThrown) {
                    console.log(jqXhr);
                    $("#kiosk-details").html(`<p class="font-large-1 text-center p-2 text-danger" > <i class="bx bx-error font-large-1"></i>  Failed to get from resource!</p>`);
                }
            });
            kioskDetails.toggleClass('show');
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
        email_application.find(".mail-delete").on("click", function () {
            checkbox_con.find("input:checked").closest("li").remove();
            email_application.find(".selectAll input").prop('checked', "");

            var tblRow = $(".kiosk-list .users-list-wrapper li:visible").length; //here tbl_test is table name

            //Check if table has row or not
            if (tblRow == 0) {
                kioskList.find('.no-results').addClass('show');
            }
            else {
                if (kioskList.find('.no-results').hasClass('show')) {
                    kioskList.find('.no-results').removeClass('show');
                }
            }
        });

        // Mark unread mail and remove background color when checkbox unchecked
        email_application.find(".mail-unread").on("click", function () {
            checkbox_con.find("input:checked").closest("li").removeClass("mail-read");
            email_application.find(".user-action .checkbox-con input:checked , .selectAll input").prop('checked', "").closest(".media").removeClass("selected-row-bg");
        });

        // Search Filter
        email_app_list.find("#email-search").on("keyup", function () {
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