exports.copy = function(){
    var r = document.createRange();
    r.selectNode(document.querySelector("#copy_sloka"));
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(r);
    document.execCommand('copy');
    window.getSelection().removeAllRanges();
    alert("Quote Copied to Clipboard");
}