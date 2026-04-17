'use esversion: 6';

var copyBtn = document.getElementById('copyUrlBtn');
var clipboard = new Clipboard('.copyBtn');

function makeRequest(url, method, message, contentType, responseType) {
    return new Promise(function(resolve, reject) {
        var xhr = new XMLHttpRequest();
        // url += appId || '';
        xhr.onreadystatechange = function() {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    resolve(xhr.response);
                } else {
                    reject(Error(xhr.statusText));
                }
            }
        };
        xhr.onprogress = function() {
            // console.log('LOADING', xhr.readyState); // readyState will be 3
        };
        xhr.onerror = function() {
            reject(Error('XMLHttpRequest failed; error code:' + xhr.statusText));
        };
        xhr.open(method, url, true);
        if (contentType !== null && responseType !== null) {
            xhr.setRequestHeader('Accept', contentType);
            xhr.responseType = responseType;
            xhr.send();
        } else {
            xhr.send(message);
        }
    });
}

function topFunction() {
    //console.log("requested height:", hdrHeightPx, "| actual height:", $('body').scrollTop());
    document.body.scrollTop = hdrHeightPx;
    document.documentElement.scrollTop = hdrHeightPx;
}

var hdrHeight = $("#top-hdr").height();
var hdrHeightPx = hdrHeight + 5 + "px";

$("body").css("paddingTop", hdrHeightPx);

$("#rfrshBtn").click(function() {
    window.location.reload(true);
});

$("#rfrshBtn").hover(function(e) {
    $("#rfrshBtnIcn").toggleClass("fa-spin");
});

$('#stateCleanupBtn').click(function(e) {
    var data = JSON.stringify({
        cmd: "stateCleanup",
        value: null
    });
    makeRequest(cmdUrl, 'POST', data, null, null)
        .catch(function(err) {
            console.log(err, 'Diag Command Results!');
        })
        .then(function(resp) {
            if (JSON.parse(resp).data) {
                console.log("diagCmd: Sent Successfully!");
            }
        });
});

$('#updateMethodBtn').click(function(e) {
    var data = JSON.stringify({
        cmd: "runUpdated",
        value: null
    });
    makeRequest(cmdUrl, 'POST', data, null, null)
        .catch(function(err) {
            console.log(err, 'Diag Command Results!');
        })
        .then(function(resp) {
            if (JSON.parse(resp).gotData) {
                console.log("diagCmd: Sent Successfully!");
            }
        });
});

$('#sendInstallDataBtn').click(function(e) {
    var data = JSON.stringify({
        cmd: "sendFirebaseData",
        value: null
    });
    makeRequest(cmdUrl, 'POST', data, null, null)
        .catch(function(err) {
            console.log(err, 'Diag Command Results!');
        })
        .then(function(resp) {
            if (JSON.parse(resp).gotData) {
                console.log("diagCmd: Sent Successfully!");
            }
        });
});

var scrollBtn = document.getElementById("scrollTopBtn");
var scrollTicking = false;
var scrollBtnVisible = false;
window.addEventListener("scroll", function() {
    if (scrollTicking) return;
    scrollTicking = true;
    window.requestAnimationFrame(function() {
        var scrolled = (document.body.scrollTop || document.documentElement.scrollTop) > 20;
        if (scrolled !== scrollBtnVisible && scrollBtn) {
            scrollBtn.style.display = scrolled ? "block" : "none";
            scrollBtnVisible = scrolled;
        }
        scrollTicking = false;
    });
}, { passive: true });


$(function() {
    $("#stateUseCirc").percircle();
});

clipboard.on('success', function(e) {
    console.info('Text:', e.text);
    //console.info('Trigger:', e.trigger);
    e.clearSelection();
});

clipboard.on('error', function(e) {
    //console.error('Action:', e.action);
    //console.error('Trigger:', e.trigger);
});