import{a as e}from"./vendor.b10de661.js";const t=document.querySelector("#editor"),r=document.querySelector("#preview"),n="http://18.191.190.186:8080/proxy/8081",o=document.querySelector("#addressBar");let c=null,a=null;function d(){c&&(c.src=c.src)}function i(e){let t=document.createElement("iframe");return t.setAttribute("src",e),t.setAttribute("allow","clipboard-read; clipboard-write"),t}window.addEventListener("load",(function(){var l;a=i("http://18.191.190.186:8080"),t.appendChild(a),null==(l=document.querySelector("#reload"))||l.addEventListener("click",d),async function(){for(;null==c;)try{await e.get(n)}catch(t){t.response.status<405?(o.innerText=n,c=i(n),r.appendChild(c)):await new Promise((e=>setTimeout(e,1e3)))}}()}));
