let t=null;const o={buttonStart:document.querySelector("button[data-start]"),buttonStop:document.querySelector("button[data-stop]")};o.buttonStart.addEventListener("click",(function(n){t=setInterval((()=>{document.body.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16)}`}),1e3),o.buttonStart.disabled=!0,o.buttonStop.disabled=!1})),o.buttonStop.addEventListener("click",(function(n){clearInterval(t),o.buttonStop.disabled=!0,o.buttonStart.disabled=!1}));
//# sourceMappingURL=01-color-switcher.344cd631.js.map
