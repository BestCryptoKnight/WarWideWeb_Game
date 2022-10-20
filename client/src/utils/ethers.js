import { ethers } from "ethers";
function delay(delayTimes) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(2);
        }, delayTimes);
    });
}

function toBigNum(value, d = 18) {
    return ethers.utils.parseUnits(String(value), d);
}

function fromBigNum(value, d = 18) {
    try {
        return parseFloat(ethers.utils.formatUnits(value, d));
    } catch (err) {
        console.log("fromBigNum error", value);
        return "0";
    }
}

const styledAddress = (s = "") => {
    if (s && s.length > 10) return s.slice(0, 4) + "..." + s.slice(-4);
    else return s;
};

function copyToClipboard(textToCopy) {
    // navigator clipboard api needs a secure context (https)
    if (navigator.clipboard && window.isSecureContext) {
        // navigator clipboard api method'
        return navigator.clipboard.writeText(textToCopy);
    } else {
        // text area method
        let textArea = document.createElement("textarea");
        textArea.value = textToCopy;
        // make the textarea out of viewport
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        textArea.style.top = "-999999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        return new Promise((res, rej) => {
            // here the magic happens
            document.execCommand("copy") ? res() : rej();
            textArea.remove();
        });
    }
}

export { delay, toBigNum, fromBigNum, styledAddress, copyToClipboard };