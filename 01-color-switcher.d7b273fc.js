const t=document.querySelector("[data-start]"),e=document.querySelector("[data-stop]"),o=document.querySelector("body");let r=null;function a(){const t=`#${Math.floor(16777215*Math.random()).toString(16)}`;o.style.backgroundColor=t}t.addEventListener("click",(t=>{a(),r=setInterval(a,1e3),t.target.disabled=!0})),e.addEventListener("click",(()=>{clearInterval(r),t.disabled=!1}));
//# sourceMappingURL=01-color-switcher.d7b273fc.js.map