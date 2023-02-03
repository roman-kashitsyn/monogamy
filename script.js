function isMono(node) {
    switch (node.tagName) {
    case "CODE": return true;
    case "PRE": return true;
    default: return false;
    }
}

function traverse(node) {
    if (!(node instanceof HTMLElement)) return;

    const style = window.getComputedStyle(node, null);
    const fontFamily = style.getPropertyValue('font-family');
    const index = fontFamily.indexOf('monospace') > 0;
    if (index > 0 || index < 0 && isMono(node)) {
        node.style.setProperty('font-family', 'monospace', 'important');
    }

    for (let child of node.childNodes) {
        traverse(child);
    }
}

function fixStyleSheets() {
    for (let css of document.styleSheets) {
        for (let rule of css.cssRules) {
            if (!rule.style || !rule.style.fontFamily) {
                continue;
            }
            if (rule.style.fontFamily.indexOf('monospace') > 0) {
                rule.style.fontFamily = 'monospace';
            }
        }
    }
}

window.addEventListener("load", function () {
    try {
        fixStyleSheets();
    } catch (e) {
        // ignore errors
    }
    traverse(document.body);
});
