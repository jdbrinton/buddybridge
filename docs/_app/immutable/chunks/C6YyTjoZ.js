import{L as c,a as t,h as d,b as v,q as h}from"./BsvKLnKw.js";import{a as g}from"./iVqNW7kI.js";function y(r){if(d){var s=!1,o=()=>{if(!s){if(s=!0,r.hasAttribute("value")){var a=r.value;f(r,"value",null),r.value=a}if(r.hasAttribute("checked")){var e=r.checked;f(r,"checked",null),r.checked=e}}};r.__on_r=o,h(o),g()}}function f(r,s,o,a){var e=r.__attributes??(r.__attributes={});d&&(e[s]=r.getAttribute(s),s==="src"||s==="srcset"||s==="href"&&r.nodeName==="LINK")||e[s]!==(e[s]=o)&&(s==="style"&&"__styles"in r&&(r.__styles={}),s==="loading"&&(r[c]=o),o==null?r.removeAttribute(s):typeof o!="string"&&n(r).includes(s)?r[s]=o:r.setAttribute(s,o))}var i=new Map;function n(r){var s=i.get(r.nodeName);if(s)return s;i.set(r.nodeName,s=[]);for(var o,a=r,e=Element.prototype;e!==a;){o=v(a);for(var _ in o)o[_].set&&s.push(_);a=t(a)}return s}export{y as r,f as s};
