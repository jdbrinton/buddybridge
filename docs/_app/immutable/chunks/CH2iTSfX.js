import{t as x,p as E,d as L,r as v,u as w,v as S,w as q,x as B}from"./BsvKLnKw.js";import{w as O}from"./iVqNW7kI.js";const T=new Set,W=new Set;function m(r,a,i,o={}){function e(t){if(o.capture||D.call(a,t),!t.cancelBubble)return O(()=>i==null?void 0:i.call(this,t))}return r.startsWith("pointer")||r.startsWith("touch")||r==="wheel"?E(()=>{a.addEventListener(r,e,o)}):a.addEventListener(r,e,o),e}function P(r,a,i,o,e){var t={capture:o,passive:e},c=m(r,a,i,t);(a===document.body||a===window||a===document)&&x(()=>{a.removeEventListener(r,c,t)})}function j(r){for(var a=0;a<r.length;a++)T.add(r[a]);for(var i of W)i(r)}function D(r){var h;var a=this,i=a.ownerDocument,o=r.type,e=((h=r.composedPath)==null?void 0:h.call(r))||[],t=e[0]||r.target,c=0,_=r.__root;if(_){var n=e.indexOf(_);if(n!==-1&&(a===document||a===window)){r.__root=a;return}var d=e.indexOf(a);if(d===-1)return;n<=d&&(c=n)}if(t=e[c]||r.target,t!==a){L(r,"currentTarget",{configurable:!0,get(){return t||i}});var g=q,b=B;v(null),w(null);try{for(var u,p=[];t!==null;){var l=t.assignedSlot||t.parentNode||t.host||null;try{var s=t["__"+o];if(s!==void 0&&!t.disabled)if(S(s)){var[y,...k]=s;y.apply(t,[r,...k])}else s.call(t,r)}catch(f){u?p.push(f):u=f}if(r.cancelBubble||l===a||l===null)break;t=l}if(u){for(let f of p)queueMicrotask(()=>{throw f});throw u}}finally{r.__root=a,delete r.currentTarget,v(g),w(b)}}}export{T as a,j as d,P as e,D as h,W as r};
