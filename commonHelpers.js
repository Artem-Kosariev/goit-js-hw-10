import"./assets/modulepreload-polyfill-3cfb730f.js";import{f,i as h}from"./assets/vendor-77e16229.js";const c=document.querySelector("#datetime-picker"),s=document.querySelector("button[data-start]"),y=document.querySelector("span[data-days]"),p=document.querySelector("span[data-hours]"),b=document.querySelector("span[data-minutes]"),S=document.querySelector("span[data-seconds]");s.addEventListener("click",M);let u="",d="";const g={enableTime:!0,time_24hr:!0,defaultDate:new Date,minuteIncrement:1,onClose(t){t[0]>Date.now()?(s.removeAttribute("disabled"),u=t[0]):(s.setAttribute("disabled",""),C())}};function D(t){const e=Math.floor(t/864e5),i=Math.floor(t%864e5/36e5),l=Math.floor(t%864e5%36e5/6e4),m=Math.floor(t%864e5%36e5%6e4/1e3);return{days:e,hours:i,minutes:l,seconds:m}}f(c,g);function M(){d=setInterval(T,1e3),s.setAttribute("disabled",""),c.setAttribute("disabled","")}function T(){const t=new Date().getTime(),o=new Date(u).getTime()-t;v(o)}function v(t){const{days:n,hours:o,minutes:r,seconds:a}=D(t);!n&&!o&&!r&&!a&&(clearInterval(d),c.removeAttribute("disabled"));function e(i){return i.toString().padStart(2,"0")}y.textContent=e(n),p.textContent=e(o),b.textContent=e(r),S.textContent=e(a)}function C(){h.error({backgroundColor:"red",message:"Please choose a date in the future",messageColor:"white",messageSize:"20",position:"topRight",close:!0,displayMode:2})}
//# sourceMappingURL=commonHelpers.js.map
