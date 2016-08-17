var exports = module.exports = {};

exports.getDriver = function(driver) {
    return require('./' + driver + '.js');
}

/*
 * funtion that returns ll the proper results for a given driver
 * driver: The driver (the logic to scrape a given web). It should be a String and the driver will be loaded.
 * Searchopts: The parameters for tha scrape. It should be an Array of strings
 *
 * return: a JSON object with the results to be served
 */
exports.getResults = function(driver, searchOpts) {
    //Load driver

    //
}


function ChangeDropDown(dropDown, t, i, r, u) { i || (i = "Todos...");
    $.ajax({ cache: !1, url: "/ws/Dictionary.asmx/" + t, 
    	success: function(t) { $("#" + dropDown).empty();
            $("#" + dropDown).AddOption("0", i);
            $(t).find("anyType").each(function() {
                var t = $(this).find("Key").text(),
                    i = $(this).find("Value").text();
                $("#" + dropDown).AddOption(t, i) });
            r && $("#" + dropDown).val(r);
            typeof u != "undefined" && u() } }) }

function AjaxValue(n, t, i, r) {
    return i == null && (i = "string"), $.ajax({ cache: !1, url: n, data: t, type: r, async: !1, success: function(n) { s = $(n).find(i).text() }, error: function() { s = i == "string" ? "" : -1 } }), s }

function AjaxGetValue(n, t) {
    return AjaxValue(n, "", t, "GET") }

function AjaxPostValue(n, t, i) {
    return AjaxValue(n, t, i, "POST") }

function keyValidate(n, t) {
    var i = document.all ? event.keyCode : n.keyCode;
    return i == 13 ? ($("#" + t).click(), !1) : !0 }

function loadcss(n, t) { $("head").append("<link>");
    var i = $("head").children(":last");
    i.attr({ rel: "stylesheet", type: "text/css", href: n });
    t && i.attr("media", t) }

function loadjs(n, t) { $.ajax({ url: n, success: t, dataType: "script", cache: !0 }) }

function frmtnb(n) {
    var t = String(n),
        r = "";
    if (t.length < 4) return n;
    for (i = 0; i < parseInt(t.length / 3); i++) r = r + "." + t.substring(t.length - 3), t = t.substring(0, t.length - 3);
    return t + r }

function GetCookie(n) {
    var t, i;
    return document.cookie.length > 0 && (t = document.cookie.indexOf(n + "="), t != -1) ? (t = t + n.length + 1, i = document.cookie.indexOf(";", t), i == -1 && (i = document.cookie.length), decodeURIComponent(document.cookie.substring(t, i))) : "" }

function createCookie(n, t, i, r, u) {
    var e = "",
        o = "",
        f;
    i && (f = new Date, f.setTime(f.getTime() + i * 864e5), e = ";expires=" + f.toGMTString());
    r || (r = "/");
    u && (o = ";domain=" + u);
    document.cookie = n + "=" + t + e + o + ";path=" + r }

function getItem(n) {
    return haslocalst ? sessionStorage.getItem(n) ? sessionStorage.getItem(n) : getlocal(n) ? getlocal(n) : "" : GetCookie(n) }

function getlocal(n) {
    var t = localStorage.getItem(n + "_e");
    return t && t < (new Date).getTime() ? (localStorage.removeItem(n), localStorage.removeItem(n + "_e"), "") : localStorage.getItem(n) }

function setItem(n, t, i, r) {
    if (haslocalst) {
        var u = i ? localStorage : sessionStorage;
        i > 0 && (u.removeItem(n + "_e"), u.setItem(n + "_e", (new Date).getTime() + i * 6e4));
        u.removeItem(n);
        u.setItem(n, t) } else createCookie(n, t, i, r) }

function CookieToLS(n) { haslocalst && $.each(n.split(","), function(n, t) { GetCookie(t) && (setItem(t, GetCookie(t), -1), createCookie(t, "", -1)) }) }

function PreLoadImg() { $("*[data-iurl]").each(function() {
        var n = $(this);
        getScrollTop() >= n.offset().top - $(window).height() - 300 && (n.is("img") ? n.attr("src", n.attr("data-iurl")) : n.css("background-image", "url(" + n.attr("data-iurl") + ")"), n.hide(), n.fadeIn("slow"), n.removeAttr("data-iurl")) }) }

function getScrollTop() {
    if (typeof pageYOffset != "undefined") return pageYOffset;
    var t = document.body,
        n = document.documentElement;
    return n = n.clientHeight ? n : t, n.scrollTop }

function displayIsBiggerThanBreakpoint(n) {
    var t = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    return t >= n }

function ShowLoggedHeader() {
    var t = $("body"),
        n, i;
    name_placeholder = $('[data-login="name"]');
    avatar_placeholder = $('[data-login="avatar"]');
    email_placeholder = $('[data-login="email"]');
    GetCookie("LogUser") != "" ? GetCookie("UserData") != "" ? (n = $.parseJSON(decodeURIComponent(GetCookie("UserData"))), t.addClass("is--logged"), name_placeholder.html("<b>" + n.name + "<\/b>"), avatar_placeholder.attr("src", n.avatar == null ? "/Images/ico-user.jpg" : n.avatar), email_placeholder.html("<b>" + n.email + "<\/b>"), $("#divLogControl").css("display", "none")) : (i = $.parseJSON(decodeURIComponent(GetCookie("LogUser"))), $.ajax({ url: "/ws/signupin.asmx/GetLoggedUserData", data: { userid: i.userId, token: encodeURI(i.token) }, type: "GET", success: function(n) { createCookie("UserData", encodeURIComponent(n), 1, "", ".coches.net");
            var i = $.parseJSON(n);
            t.addClass("is--logged");
            name_placeholder.html("<b>" + i.name + "<\/b>");
            avatar_placeholder.attr("src", i.avatar == null ? "/Images/ico-user.jpg" : i.avatar);
            email_placeholder.html("<b>" + i.email + "<\/b>");
            $("#divLogControl").css("display", "none") }, error: function() { t.removeClass("is--logged") } })) : t.removeClass("is--logged") }

function bindToggleDropdownBubbleNav() {
    if (displayIsBiggerThanBreakpoint(mq_desktop)) { $(document).on("click", '[data-dropbubble-nav="open"] > .nav_btn', function(n) { n.preventDefault() });
        $(document).on("mouseenter", '[data-dropbubble-nav="open"]', function() { $(this).addClass("drop-bubble--visible") });
        $(document).on("mouseleave", '[data-dropbubble-nav="open"]', function() { $(this).removeClass("drop-bubble--visible") }) } else $(document).off("click", '[data-dropbubble-nav="open"] > .nav_btn'), $(document).off("mouseenter mouseleave", '[data-dropbubble-nav="open"]') }
var haslocalst = function() {
        var n = new Date,
            t, i;
        try {
            return (t = localStorage).setItem(n, n), i = t.getItem(n) == n, t.removeItem(n), i && t } catch (r) {} }(),
    mq_desktop;
jQuery.fn.extend({ AddOption: function(n, t) {
        return this.append('<option value="' + n + '">' + t + "<\/option>") } });
String.prototype.toNumberFormatted = function() {
    return frmtnb(this) };
Number.prototype.toNumberFormatted = function() {
    return frmtnb(this) };
$(".menu > li").hover(function() { $(this).find("ul").show() }, function() { $(this).find("ul").hide() });
$(".down").hover(function() { $(this).addClass("selected") }, function() { $(".selected").removeClass("selected") });
$(".menu").on("touchstart", "li.down>a", function() { noclick = 1 });
$("li.down>a").click(function() {
    if (noclick == 1) return !1;
    noclick = 0 });
$(".hidactiva").val() && ($(".v1 .menu #" + $(".hidactiva").val()).addClass("activa"), $(".v2 .menu ." + $(".hidactiva").val()).addClass("activa"));
$(document).ready(function() {
    var n, t;
    PreLoadImg();
    $(window).scroll(function() { PreLoadImg() });
    CookieToLS("pag,SearchFilters,VO_SearchCount,VN_SearchCount");
    n = GetCookie("ctinfo");
    n && $.each(n.split("&"), function(n, t) {
        var i = t.split("=");
        $("." + i[0].toLowerCase() + "_auto").val(i[1]) });
    n = $(".cfg_set").val();
    n && createCookie("cfg", n);
    GetCookie("yc") || $(".hid_yc").length != 0 || (t = $("<div>", { id: "yc" }).load("/nochange/html/policitycookies.html"), $("body").append(t));
    $(".go-top").click(function(n) { $("html,body").animate({ scrollTop: $(".publi-top").offset().top }, 500);
        n.preventDefault() }) });
jQuery.support.placeholder = function() {
    var n = document.createElement("input");
    return "placeholder" in n }();
mq_desktop = 768;
$(function() { $(document).on("click touch", '[data-navslide="open"]', function(n) { $("body").addClass("is--nav-slide-open");
        n.preventDefault() });
    $(document).on("click touch", '[data-navslide="close"]', function(n) { $("body").removeClass("is--nav-slide-open");
        n.preventDefault() }) });
$(window).load(function() { ShowLoggedHeader();
    displayIsBiggerThanBreakpoint(mq_desktop) && bindToggleDropdownBubbleNav() });
$(window).resize(function() { bindToggleDropdownBubbleNav() });
