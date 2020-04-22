"use strict";

var appContent = $(".app-content"),
    appContentOverlay = $(".app-content-overlay"),
    sideBarLeft = $(".sidebar-left"),
    kioskDetails = $(".kiosk-details"),
    kioskApplication = $(".kiosk-application"),
    kioskNewSideBar = $(".new-kiosk-sidebar"),
    kioskList = $(".kiosk-list"),
    kioskAppList = $(".kiosk-app-list"),
    checkSelectAll = $("#checkSelectAll"),
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

    static OnFormReset() {
        $(".btn-send ").removeClass("hidden");
        $("#btn-reset ").addClass("hidden");
        $('#compose-form').find('input').removeAttr("readonly");
        $('#compose-form').find('textarea').removeAttr("readonly");
    }

    static OnBeginRefreshKioskList() {
        $("#dv-kiosk-list").html(`<div class="text-center pt-2">
                                            <div class="spinner-grow text-primary spinner-border-lg" role="status">
                                                <span class="sr-only">Loading...</span>
                                            </div>
                                        </div><h4 class="text-center pb-2">Loading form please wait...</h4>`);
    }

    static OnErrorRefreshKioskList() {
        $("#dv-kiosk-list").html(`<div class="text-center pt-2">
                                    <i class="livicon-evo" data-options="name: bug.svg;  style: original; strokeColor:#5A8DEE;"></i>
                                </div>
                                <h4 class='text-center p-2 text-danger'>Failed to load kiosk data! </br> <a class="btn btn-warning btn-sm mt-2 glow shadow" href="#">Report this error.</a></h4>`);
        $(".livicon-evo").updateLiviconEvo();
    }

    static OnSuccessRefreshKioskList() {
        $(".livicon-evo").updateLiviconEvo();
        if (checkSelectAll.is(":checked")) {
            $(".list-wrapper").find("input").prop('checked',true).closest(".media").addClass("selected-row-bg");
        }
        else {
            $(".list-wrapper").find("input").prop('checked', "").closest(".media").removeClass("selected-row-bg");
        }
    }

    static OnCheckKioskChange(el) {
        var $this = $(el);
        if ($this.is(":checked")) {
            $this.closest(".media").addClass("selected-row-bg");
        }
        else {
            $this.closest(".media").removeClass("selected-row-bg");
        }
    }

    static OnClickDeleteButton() {
        const selectedKiosk = $(".list-wrapper").find("input:checked");

        const selectedIds = new Array();
        selectedKiosk.each(function (i, a) {
            var txn = a.dataset;
            console.log(parseInt(txn.kioskid));
            selectedIds.push(parseInt(txn.kioskid));
        });
        console.log(selectedIds);
        console.log(selectedIds.toString());
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            type: 'warning',
            confirmButtonClass: 'btn btn-primary ml-1 shadow glow',
            buttonsStyling: false,
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true,
            showLoaderOnConfirm: true,
            cancelButtonClass: "btn btn-danger ml-1 shadow glow",
            preConfirm: () => {
                return fetch(`/kiosk/delete/${selectedIds.toString()}`, {
                    method: 'DELETE'
                })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error(response.statusText);
                        }
                        return response.json();
                    })
                    .catch(error => {
                        Swal.showValidationMessage(
                            `Request failed: ${error}`
                        );
                    });
            },
            allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {
            console.log(result);
            if (result.value) {
                Swal.fire({
                    title: `Successful!`,
                    html: `Selected kiosk/s has been deleted! <br/> ${result.value.ids}`,
                    type: 'success'
                });
                const deletedItems = result.value.ids.split(",");
                for (var i = 0; i < deletedItems.length; i++) {
                    console.log(deletedItems[i]);
                    $(`#kiosk-${deletedItems[i]}`).remove();
                }

                kioskApplication.find(".selectAll input").prop('checked', "");
                const tblRow = $(".kiosk-list .list-wrapper li:visible").length; //here tblRow is table name

                //Check if table has row or not
                if (tblRow === 0) {
                    kioskList.find('.no-results').addClass('show');
                }
                else {
                    if (kioskList.find('.no-results').hasClass('show')) {
                        kioskList.find('.no-results').removeClass('show');
                    }
                }
            }
        });
    }

    static OnCheckSelectAll() {
        if (checkSelectAll.is(":checked")) {
            $(".list-wrapper").find("input").prop('checked',true).closest(".media").addClass("selected-row-bg");
        }
        else {
            $(".list-wrapper").find("input").prop('checked', "").closest(".media").removeClass("selected-row-bg");
        }
    }

    initPage() {
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
                $('#compose-form').find("input").val(""); // input filed reset when resize screen
            }
        });
    }
}

var KioskAjax = (function () {
    return {
        OnBeginSaveKiosk: function () {
            Swal.fire({
                title: "Saving kiosk in progress",
                html: "please wait...",
                allowOutsideClick: false,
                allowEscapeKey: false,
                confirmButtonText: "",
                onBeforeOpen: () => {
                    Swal.showLoading();
                }
            }).then((result) => {
            });
        },
        OnErrorSaveKiosk: function (data, status) {
            console.log(data);
            Swal.fire({
                title: "Error!",
                text: `Failed to save kiosk :${data.responseJSON.kiosk.kioskName}`,
                type: 'error',
                allowOutsideClick: false
            }).then((result) => {
                console.log(result);
            });
        },
        OnSuccessSaveKiosk: function (data, status) {
            Swal.fire({
                title: 'Successful!',
                html: `New kiosk has been saved! </b> ${data.kioskName}`,
                type: 'success',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Configure now',
                cancelButtonText: 'Configure later'
            }).then((result) => {
                if (result.dismiss === Swal.DismissReason.cancel) {
                    Swal.close();
                } else {
                    console.log("redirect");
                }
            });
        },
        OnCompleteSaveKiosk: function (data, status) {
            $('#compose-form').find('input').attr("readonly", true);
            $('#compose-form').find('textarea').attr("readonly", true);
            $(".btn-send").addClass("hidden");
            $("#btn-reset").removeClass("hidden");
            $("#btn-refresh").click();
        }
    };
})();