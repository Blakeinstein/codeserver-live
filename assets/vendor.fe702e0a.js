addEventListener("pointerdown",(function(t){var e,i=t.target,n=i.parentElement;if(n&&t.isPrimary&&0===t.button&&"separator"===i.getAttribute("role")){var r=n.hasAttribute("data-flex-splitter-vertical"),a=n.hasAttribute("data-flex-splitter-horizontal");if(r||a){t.preventDefault();var o=t.pointerId,p=i.previousElementSibling,s=i.nextElementSibling,l=getComputedStyle(n);(-1!==l.flexDirection.indexOf("reverse")?-1:1)*(a&&"rtl"===l.direction?-1:1)==-1&&(p=(e=[s,p])[0],s=e[1]);var h,d=getComputedStyle(p),m=getComputedStyle(s),f=p.getBoundingClientRect();if(r){var v=f.top+t.offsetY,u=p.offsetHeight+s.offsetHeight,x=Math.max(parseInt(d.minHeight,10)||0,u-(parseInt(m.maxHeight,10)||u)),g=Math.min(parseInt(d.maxHeight,10)||u,u-(parseInt(m.minHeight,10)||0));h=function(t){if(t.pointerId===o){var e=Math.round(Math.min(Math.max(t.clientY-v,x),g));p.style.height=e+"px",s.style.height=u-e+"px"}}}else{var c=f.left+t.offsetX,I=p.offsetWidth+s.clientWidth,y=Math.max(parseInt(d.minWidth,10)||0,I-(parseInt(m.maxWidth,10)||I)),E=Math.min(parseInt(d.maxWidth,10)||I,I-(parseInt(m.minWidth,10)||0));h=function(t){if(t.pointerId===o){var e=Math.round(Math.min(Math.max(t.clientX-c,y),E));p.style.width=e+"px",s.style.width=I-e+"px"}}}var M=function(t){t.pointerId===o&&(i.releasePointerCapture(o),i.removeEventListener("pointermove",h),i.removeEventListener("pointerup",M),i.removeEventListener("pointercancel",M))};h(t),p.style.flexShrink=s.style.flexShrink=1,i.addEventListener("pointercancel",M),i.addEventListener("pointerup",M),i.addEventListener("pointermove",h),i.setPointerCapture(o)}}}));