import"./vendor.fe702e0a.js";const e=document.querySelector("#editor"),t=document.querySelector("#preview"),r="http://3.144.14.133:1234",n=document.querySelector("#addressBar");let o=null,c=null;function d(){o&&(o.src=o.src)}function i(e){let t=document.createElement("iframe");return t.setAttribute("src",e),t.setAttribute("allow","clipboard-read; clipboard-write"),t}window.addEventListener("load",(function(){var l;c=i("http://3.144.14.133:8080"),e.appendChild(c),null==(l=document.querySelector("#reload"))||l.addEventListener("click",d),async function(){for(;null==o;){try{"opaque"==(await fetch(r,{mode:"no-cors"})).type&&(n.innerText=r,o=i(r),t.appendChild(o))}catch(e){}await new Promise((e=>setTimeout(e,1e3)))}}()}));
