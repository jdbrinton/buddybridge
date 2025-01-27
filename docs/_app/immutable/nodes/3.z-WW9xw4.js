import{d as at}from"../chunks/rLz1QiBz.js";import"../chunks/Bg9kRutz.js";import"../chunks/B5qW4hab.js";import{o as ot,b as Be,h as U,c as ce,a as we,g as a,H as rt,r as Ce,e as pe,j as ee,a9 as ue,f as Ne,i as he,p as nt,Q as Ae,T as Pe,aa as lt,ab as st,P as it,ac as ct,ad as Re,x as $e,ae as ut,a6 as ft,M as dt,a4 as vt,m as gt,af as Ie,ag as pt,ah as mt,ai as bt,w as Oe,N as wt,K as ht,aj as _t,B as yt,ak as kt,S as xt,Y as Z,Z as Y,V as St,s as t,a0 as w,_ as S,$ as x,a1 as B,al as Te}from"../chunks/Dk4whKrY.js";import{s as G}from"../chunks/DephgkkJ.js";import{i as J}from"../chunks/CiS05hJS.js";import{a as Fe,c as Et,b as N,t as V,d as Lt,e as re}from"../chunks/CEbCEDth.js";import{r as se,s as Ct}from"../chunks/Bk0lpE6m.js";import{l as Pt,e as oe}from"../chunks/Bokd9lnF.js";import{i as It}from"../chunks/BcGNVSbJ.js";import{o as Tt}from"../chunks/RxMZ7i34.js";import{C as Ft}from"../chunks/C3AHpkfn.js";function qt(r,n){return n}function Bt(r,n,s,h){for(var d=[],i=n.length,p=0;p<i;p++)st(n[p].e,d,!0);var b=i>0&&d.length===0&&s!==null;if(b){var o=s.parentNode;it(o),o.append(s),h.clear(),Q(r,n[0].prev,n[i-1].next)}ct(d,()=>{for(var e=0;e<i;e++){var E=n[e];b||(h.delete(E.k),Q(r,E.prev,E.next)),Re(E.e,!b)}})}function Nt(r,n,s,h,d,i=null){var p=r,b={flags:n,items:new Map,first:null};{var o=r;p=U?ce($e(o)):o.appendChild(ot())}U&&we();var e=null,E=!1,u=ut(()=>{var _=s();return ft(_)?_:_==null?[]:Ae(_)});Be(()=>{var _=a(u),v=_.length;if(E&&v===0)return;E=v===0;let m=!1;if(U){var $=p.data===rt;$!==(v===0)&&(p=Ce(),ce(p),pe(!1),m=!0)}if(U){for(var j=null,O,g=0;g<v;g++){if(ee.nodeType===8&&ee.data===dt){p=ee,m=!0,pe(!1);break}var C=_[g],X=h(C,g);O=De(ee,b,j,null,C,X,g,d,n,s),b.items.set(X,O),j=O}v>0&&ce(Ce())}if(!U){var K=vt;At(_,b,p,d,n,(K.f&ue)!==0,h,s)}i!==null&&(v===0?e?Ne(e):e=he(()=>i(p)):e!==null&&nt(e,()=>{e=null})),m&&pe(!0),a(u)}),U&&(p=ee)}function At(r,n,s,h,d,i,p,b){var o=r.length,e=n.items,E=n.first,u=E,_,v=null,m=[],$=[],j,O,g,C;for(C=0;C<o;C+=1){if(j=r[C],O=p(j,C),g=e.get(O),g===void 0){var X=u?u.e.nodes_start:s;v=De(X,n,v,v===null?n.first:v.next,j,O,C,h,d,b),e.set(O,v),m=[],$=[],u=v.next;continue}if(Rt(g,j,C),g.e.f&ue&&Ne(g.e),g!==u){if(_!==void 0&&_.has(g)){if(m.length<$.length){var K=$[0],H;v=K.prev;var ne=m[0],M=m[m.length-1];for(H=0;H<m.length;H+=1)qe(m[H],K,s);for(H=0;H<$.length;H+=1)_.delete($[H]);Q(n,ne.prev,M.next),Q(n,v,ne),Q(n,M,K),u=K,v=M,C-=1,m=[],$=[]}else _.delete(g),qe(g,u,s),Q(n,g.prev,g.next),Q(n,g,v===null?n.first:v.next),Q(n,v,g),v=g;continue}for(m=[],$=[];u!==null&&u.k!==O;)(i||!(u.e.f&ue))&&(_??(_=new Set)).add(u),$.push(u),u=u.next;if(u===null)continue;g=u}m.push(g),v=g,u=g.next}if(u!==null||_!==void 0){for(var z=_===void 0?[]:Ae(_);u!==null;)(i||!(u.e.f&ue))&&z.push(u),u=u.next;var te=z.length;if(te>0){var A=o===0?s:null;Bt(n,z,A,e)}}Pe.first=n.first&&n.first.e,Pe.last=v&&v.e}function Rt(r,n,s,h){lt(r.v,n),r.i=s}function De(r,n,s,h,d,i,p,b,o,e){var E=(o&mt)!==0,u=(o&bt)===0,_=E?u?gt(d):Ie(d):d,v=o&pt?Ie(p):p,m={i:v,v:_,k:i,a:null,e:null,prev:s,next:h};try{return m.e=he(()=>b(r,_,v,e),U),m.e.prev=s&&s.e,m.e.next=h&&h.e,s===null?n.first=m:(s.next=m,s.e.next=m.e),h!==null&&(h.prev=m,h.e.prev=m.e),m}finally{}}function qe(r,n,s){for(var h=r.next?r.next.e.nodes_start:s,d=n?n.e.nodes_start:s,i=r.e.nodes_start;i!==h;){var p=Oe(i);d.before(i),i=p}}function Q(r,n,s){n===null?r.first=s:(n.next=s,n.e.next=s&&s.e),s!==null&&(s.prev=n,s.e.prev=n&&n.e)}function $t(r,n,s,h,d){var i=r,p="",b;Be(()=>{if(p===(p=n()??"")){U&&we();return}b!==void 0&&(Re(b),b=void 0),p!==""&&(b=he(()=>{if(U){ee.data;for(var o=we(),e=o;o!==null&&(o.nodeType!==8||o.data!=="");)e=o,o=Oe(o);if(o===null)throw wt(),ht;Fe(ee,e),i=ce(o);return}var E=p+"",u=Et(E);Fe($e(u),u.lastChild),i.before(u)}))})}function ie(r,n,s=n){var h=_t();Pt(r,"input",d=>{var i=d?r.defaultValue:r.value;if(i=me(r)?be(i):i,s(i),h&&i!==(i=n())){var p=r.selectionStart,b=r.selectionEnd;r.value=i??"",b!==null&&(r.selectionStart=p,r.selectionEnd=Math.min(b,r.value.length))}}),(U&&r.defaultValue!==r.value||yt(n)==null&&r.value)&&s(me(r)?be(r.value):r.value),kt(()=>{var d=n();me(r)&&d===be(r.value)||r.type==="date"&&!d&&!r.value||d!==r.value&&(r.value=d??"")})}function me(r){var n=r.type;return n==="number"||n==="range"}function be(r){return r===""?null:+r}const Ot=at,Dt=!0,ia=Object.freeze(Object.defineProperty({__proto__:null,csr:Ot,prerender:Dt},Symbol.toStringTag,{value:"Module"}));var Mt=V(`<p class="mb-2 font-bold text-red-600">Two-Step Verification / Captcha Page Detected</p> <div class="overflow-auto border border-gray-300 bg-gray-50 p-2" style="max-height: 180px;"><p class="text-sm font-bold">Partial DOM snippet:</p> <div><!></div></div> <p class="mt-2 text-sm">Please solve the captcha/two-step prompt in the visible login window. When finished, click
			below:</p> <button class="mt-2 rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600">I've Solved the Two-Step / Captcha</button>`,1),jt=V('<p class="text-green-600">You are logged in to Facebook!</p> <button class="mt-2 rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600">Log out</button> <div class="mt-4"><button class="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:opacity-50"> </button></div>',1),Ht=V('<p class="mt-2 text-red-600"> </p>'),Wt=V('<p class="mt-2 text-gray-600">Logging in, please wait...</p>'),Ut=V('<label class="mt-2 block font-medium">Email or phone <input type="text" class="mt-1 block w-full rounded border-gray-300 focus:border-blue-500 focus:ring-blue-500"></label> <label class="mt-2 block font-medium">Password <input type="password" class="mt-1 block w-full rounded border-gray-300 focus:border-blue-500 focus:ring-blue-500"></label> <!> <!> <button class="mt-2 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:opacity-50"><!></button>',1),Vt=V('<img alt="Friend Photo" width="40" class="svelte-1kpbgjq">'),Yt=V('<tr><td class="svelte-1kpbgjq"></td><td class="svelte-1kpbgjq"> </td><td class="svelte-1kpbgjq"><!></td></tr>'),Kt=V('<p class="text-green-600">You are logged in to Bluesky!</p> <button class="mt-2 rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600">Log out</button>',1),zt=V('<label class="mt-2 block font-medium">Username or email <input type="text" class="mt-1 block w-full rounded border-gray-300 focus:border-blue-500 focus:ring-blue-500"></label> <label class="mt-2 block font-medium">Password <input type="password" class="mt-1 block w-full rounded border-gray-300 focus:border-blue-500 focus:ring-blue-500"></label> <button class="mt-2 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:opacity-50"><!></button>',1),Jt=V('<div class="section-box svelte-1kpbgjq"><h2 class="mb-2 text-lg font-bold">Facebook Login</h2> <!></div> <div class="section-box svelte-1kpbgjq"><h2 class="mb-2 text-lg font-bold">Facebook Friends</h2> <p class="text-sm"> </p> <table class="mt-2 table-auto svelte-1kpbgjq"><thead><tr class="bg-gray-100"><th class="svelte-1kpbgjq">#</th><th class="svelte-1kpbgjq">Name</th><th class="svelte-1kpbgjq">Photo</th></tr></thead><tbody></tbody></table></div> <div class="section-box svelte-1kpbgjq"><h2 class="mb-2 text-lg font-bold">Bluesky Login</h2> <!></div> <div class="section-box svelte-1kpbgjq"><h2 class="mb-2 text-lg font-bold">Debug Logs</h2> <pre class="svelte-1kpbgjq"> </pre></div>',1);function ca(r,n){xt(n,!1);let s=B(""),h=B(""),d=B(!1),i=B(""),p=B(!1),b=B(0),o=null,e=B(""),E=B(0),u=B([]),_=B(!1),v=B(!1),m=B(""),$=B(""),j=B(""),O=B(!1),g=B(0),C=null;Tt(async()=>{Ft.getPlatform();const l=localStorage.getItem("facebookEmailOrPhone"),f=localStorage.getItem("facebookPassword");l&&t(s,l),f&&t(h,f)});function X(l){l==="facebook"?(t(b,5),C=setInterval(()=>{Te(b,-1),a(b)<=0&&C&&clearInterval(C)},1e3)):(t(g,5),C=setInterval(()=>{Te(g,-1),a(g)<=0&&C&&clearInterval(C)},1e3))}async function K(){var l,f;if(t(v,!1),t(m,""),!((f=(l=window.CapacitorCustomPlatform)==null?void 0:l.plugins)!=null&&f.ElectronBrowser)){t(i,"ElectronBrowser plugin not available.");return}if(a(b)>0){t(i,`Please wait ${a(b)}s before trying again.`);return}t(i,""),t(p,!0),t(e,a(e)+`
--- Starting Facebook Login ---
`);try{o&&(t(e,a(e)+`Closing old window: ${o}
`),await window.CapacitorCustomPlatform.plugins.ElectronBrowser.closeWindow(o),o=null),o=await window.CapacitorCustomPlatform.plugins.ElectronBrowser.createWindow({partition:"persist:facebook",show:!0,offscreen:!1}),t(e,a(e)+`Created new offscreen window: ${o}
`),t(e,a(e)+`Loading /friends/list to check if we are already logged in...
`),await te(o,"https://www.facebook.com/friends/list"),await z(o,15e3),await M(2e3);const c=await A(o,"document.title");t(e,a(e)+`Title after /friends/list load: "${c}"
`);const k=await A(o,'document.body && document.body.innerText.includes("Page Not Found")');if(c&&!c.toLowerCase().includes("page not found")&&k===!1)t(e,a(e)+`It appears we are already logged in.
`),t(d,!0);else{t(e,a(e)+`We are not logged in or "Page Not Found". Doing normal login...
`),t(e,a(e)+`Loading main Facebook page...
`),await te(o,"https://www.facebook.com/"),await z(o,15e3),await M(2e3),t(e,a(e)+`Filling login form...
`);const D=`
			try {
			  const emailInput = document.getElementById('email') || document.querySelector('input[name="email"]');
			  const passInput = document.getElementById('pass') || document.querySelector('input[name="pass"]');
			  const loginButton = document.querySelector('button[name="login"]') || document.querySelector('input[name="login"]');
			  if(!emailInput || !passInput || !loginButton) {
				throw new Error('Login elements not found in DOM');
			  }
			  emailInput.value = "${_e(a(s))}";
			  passInput.value = "${_e(a(h))}";
			  loginButton.click();
			  "OK"
			} catch(e) {
			  "ERROR: " + e.message
			}
		  `,y=await A(o,D);t(e,a(e)+`Fill result: ${y}
`),t(e,a(e)+`Waiting 5 seconds after login attempt...
`),await M(5e3);const I=await A(o,"window.location.href");if(t(e,a(e)+`URL after submit: ${I}
`),I.includes("/two_step_verification/authentication/")){t(v,!0),t(m,await A(o,"document.documentElement.innerHTML.slice(0,3000)")),t(e,a(e)+`Two-step/captcha page detected.
`),t(d,!1),t(i,"Two-step verification page shown. Solve it in the window.");return}const F=await A(o,"document.title");if(t(e,a(e)+`Title after login attempt: "${F}"
`),!F.toLowerCase().includes("facebook"))t(d,!1),t(i,"Login failed (title doesn't contain 'Facebook')"),t(e,a(e)+`Login failed based on title.
`);else{t(e,a(e)+`Checking /friends/list for final confirmation...
`),await te(o,"https://www.facebook.com/friends/list"),await z(o,15e3),await M(2e3);const T=await A(o,"document.title"),q=await A(o,'document.body && document.body.innerText.includes("Page Not Found")');t(e,a(e)+`Final /friends/list title: "${T}", pageNotFound: ${q}
`),!T||T.toLowerCase().includes("page not found")||q===!0?(t(e,a(e)+`Friends page not found => fail.
`),t(d,!1),t(i,"Login failed. Page Not Found on friends page.")):(t(e,a(e)+`Successfully logged in!
`),t(d,!0))}}a(d)&&(localStorage.setItem("facebookEmailOrPhone",a(s)),localStorage.setItem("facebookPassword",a(h)),t(e,a(e)+`Saved credentials to localStorage.
`))}catch(c){const k=(c==null?void 0:c.message)??c;t(e,a(e)+`Error during login: ${k}
`),t(i,k||"Error logging in."),t(d,!1)}finally{t(p,!1),t(e,a(e)+`--- End Facebook Login ---
`),X("facebook")}}async function H(){if(t(v,!1),t(m,""),!a(d)){t(e,a(e)+`Cannot scrape: not logged in.
`);return}o||(t(e,a(e)+`No window open; creating a new one for scraping.
`),o=await window.CapacitorCustomPlatform.plugins.ElectronBrowser.createWindow({partition:"persist:facebook",show:!0,offscreen:!1})),t(u,[]),t(E,0),t(_,!0),t(e,a(e)+`
--- Starting friend scrape ---
`);try{await te(o,"https://www.facebook.com/friends/list"),await z(o,15e3),await M(2e3);let l=0,f=0;for(let c=0;c<50;c++){const k=await A(o,`
			(() => {
			  const container = document.querySelector('[aria-label="All friends"]');
			  return container ? container.outerHTML.slice(0,1500) : "No container found";
			})()
		  `);t(e,a(e)+`Pass #\${i+1}, partial container:
\${snippet}
--- end snippet ---
`);const y=await A(o,`
			(() => {
			  const container = document.querySelector('[aria-label="All friends"]');
			  if(!container){
				return { error: "No container found" };
			  }
			  const links = container.querySelectorAll('a[href*="facebook.com/"]');
			  const results = [];
			  links.forEach(link => {
				try {
				  let name = link.innerText.trim();
				  let photo = "";
				  const img = link.querySelector('img');
				  if(img){
					photo = img.getAttribute("src") || "";
				  }
				  if(name && name !== "..."){
					results.push({ name, photo });
				  }
				} catch(e){}
			  });
			  return results;
			})()
		  `);if(y&&Array.isArray(y)){let F=0;for(const T of y)a(u).some(L=>L.name===T.name&&L.photo===T.photo)||(a(u).push(T),F++);t(E,a(u).length),t(e,a(e)+"Pass #${i+1}: ${newlyAdded} new friend(s), total so far=${totalFriends}\n")}else y&&y.error?t(e,a(e)+("Scrape error: "+y.error+"\\n")):t(e,a(e)+"No new results in this pass.\\n");if(a(E)===l){if(f++,f>=2){t(e,a(e)+`No new friends after two consecutive passes => stopping.
`);break}}else f=0;l=a(E);const I=await A(o,`
			(() => {
			  const container = document.querySelector('[aria-label="All friends"]');
			  if(!container) return "No container to scroll";
			  container.scrollTop = container.scrollHeight;
			  return "OK";
			})()
		  `);t(e,a(e)+("Scrolling container => "+I+`
`)),await M(1e3)}t(e,a(e)+"Scrape complete. Found ${totalFriends} total friends.\n")}catch(l){l==null||l.message,t(e,a(e)+"Scrape error: ${msg}\n")}finally{t(_,!1),t(e,a(e)+`--- End friend scrape ---
`)}}async function ne(){var l,f;if(t(v,!1),t(m,""),!((f=(l=window.CapacitorCustomPlatform)==null?void 0:l.plugins)!=null&&f.ElectronBrowser)){t(e,a(e)+`ElectronBrowser plugin not available.
`);return}t(e,a(e)+`Logging out: clearing persist:facebook session data.
`),await window.CapacitorCustomPlatform.plugins.ElectronBrowser.clearSessionData("persist:facebook"),t(d,!1),t(i,""),t(u,[]),t(E,0),o&&(t(e,a(e)+`Closing window: ${o}
`),await window.CapacitorCustomPlatform.plugins.ElectronBrowser.closeWindow(o),o=null),t(e,a(e)+`Logged out.
`)}function M(l){return new Promise(f=>setTimeout(f,l))}async function z(l,f=15e3){const c=Date.now();for(;Date.now()-c<f;){if(await A(l,"document.readyState")==="complete")return;await M(500)}throw new Error("Timeout waiting for page load")}async function te(l,f){t(e,a(e)+`Navigating to: ${f}
`);try{await window.CapacitorCustomPlatform.plugins.ElectronBrowser.loadURL(l,f)}catch(c){const k=(c==null?void 0:c.message)??c;throw t(e,a(e)+`Error loading URL: ${k}
`),c}}async function A(l,f){try{return await window.CapacitorCustomPlatform.plugins.ElectronBrowser.executeJavaScript(l,f)}catch(c){const k=(c==null?void 0:c.message)??c;throw t(e,a(e)+`execSafe error: ${k}
`),c}}function _e(l){return l.replace(/"/g,'\\"')}function Me(){a(g)>0||(t(O,!0),X("bluesky"))}function je(){t(O,!1)}function He(){t(v,!1),t(m,""),t(e,a(e)+`User indicates they solved 2FA/captcha in the external window.
`)}It();var ye=Jt(),fe=Z(ye),We=w(S(fe),2);{var Ue=l=>{var f=Mt(),c=w(Z(f),2),k=w(S(c),2),D=S(k);$t(D,()=>a(m)),x(k),x(c);var y=w(c,4);oe("click",y,He),N(l,f)},Ve=l=>{var f=Lt(),c=Z(f);{var k=y=>{var I=jt(),F=w(Z(I),2),T=w(F,2),q=S(T),L=S(q,!0);x(q),x(T),Y(()=>{q.disabled=a(_),G(L,a(_)?"Scraping...":"Scrape Friends")}),oe("click",F,ne),oe("click",q,H),N(y,I)},D=y=>{var I=Ut(),F=Z(I),T=w(S(F));se(T),x(F);var q=w(F,2),L=w(S(q));se(L),x(q);var R=w(q,2);{var ae=P=>{var W=Ht(),tt=S(W,!0);x(W),Y(()=>G(tt,a(i))),N(P,W)};J(R,P=>{a(i)&&P(ae)})}var Le=w(R,2);{var Xe=P=>{var W=Wt();N(P,W)};J(Le,P=>{a(p)&&P(Xe)})}var le=w(Le,2),Ze=S(le);{var Ge=P=>{var W=re();Y(()=>G(W,`Login (Wait ${a(b)??""}s)`)),N(P,W)},et=P=>{var W=re("Login");N(P,W)};J(Ze,P=>{a(b)>0?P(Ge):P(et,!1)})}x(le),Y(()=>le.disabled=a(b)>0||a(p)),ie(T,()=>a(s),P=>t(s,P)),ie(L,()=>a(h),P=>t(h,P)),oe("click",le,K),N(y,I)};J(c,y=>{a(d)?y(k):y(D,!1)},!0)}N(l,f)};J(We,l=>{a(v)?l(Ue):l(Ve,!1)})}x(fe);var de=w(fe,2),ve=w(S(de),2),Ye=S(ve);x(ve);var ke=w(ve,2),xe=w(S(ke));Nt(xe,5,()=>a(u),qt,(l,f,c)=>{var k=Yt(),D=S(k);D.textContent=c+1;var y=w(D),I=S(y,!0);x(y);var F=w(y),T=S(F);{var q=R=>{var ae=Vt();Y(()=>Ct(ae,"src",a(f).photo)),N(R,ae)},L=R=>{var ae=re("No photo");N(R,ae)};J(T,R=>{a(f).photo?R(q):R(L,!1)})}x(F),x(k),Y(()=>G(I,a(f).name)),N(l,k)}),x(xe),x(ke),x(de);var ge=w(de,2),Ke=w(S(ge),2);{var ze=l=>{var f=Kt(),c=w(Z(f),2);oe("click",c,je),N(l,f)},Je=l=>{var f=zt(),c=Z(f),k=w(S(c));se(k),x(c);var D=w(c,2),y=w(S(D));se(y),x(D);var I=w(D,2),F=S(I);{var T=L=>{var R=re();Y(()=>G(R,`Login (Wait ${a(g)??""}s)`)),N(L,R)},q=L=>{var R=re("Login");N(L,R)};J(F,L=>{a(g)>0?L(T):L(q,!1)})}x(I),Y(()=>I.disabled=a(g)>0),ie(k,()=>a($),L=>t($,L)),ie(y,()=>a(j),L=>t(j,L)),oe("click",I,Me),N(l,f)};J(Ke,l=>{a(O)?l(ze):l(Je,!1)})}x(ge);var Se=w(ge,2),Ee=w(S(Se),2),Qe=S(Ee,!0);x(Ee),x(Se),Y(()=>{G(Ye,`Found ${a(E)??""} friends so far.`),G(Qe,a(e))}),N(r,ye),St()}export{ca as component,ia as universal};
