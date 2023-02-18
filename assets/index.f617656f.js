import{e as re,_ as ae}from"./index.01c5f4c8.js";const ie=Symbol(),Q=Object.getPrototypeOf,q=new WeakMap,le=e=>e&&(q.has(e)?q.get(e):Q(e)===Object.prototype||Q(e)===Array.prototype),ce=e=>le(e)&&e[ie]||null,X=(e,t=!0)=>{q.set(e,t)},K=e=>typeof e=="object"&&e!==null,A=new WeakMap,k=new WeakSet,de=(e=Object.is,t=(n,v)=>new Proxy(n,v),s=n=>K(n)&&!k.has(n)&&(Array.isArray(n)||!(Symbol.iterator in n))&&!(n instanceof WeakMap)&&!(n instanceof WeakSet)&&!(n instanceof Error)&&!(n instanceof Number)&&!(n instanceof Date)&&!(n instanceof String)&&!(n instanceof RegExp)&&!(n instanceof ArrayBuffer),a=n=>{switch(n.status){case"fulfilled":return n.value;case"rejected":throw n.reason;default:throw n}},c=new WeakMap,u=(n,v,y=a)=>{const m=c.get(n);if((m==null?void 0:m[0])===v)return m[1];const p=Array.isArray(n)?[]:Object.create(Object.getPrototypeOf(n));return X(p,!0),c.set(n,[v,p]),Reflect.ownKeys(n).forEach(E=>{const b=Reflect.get(n,E);k.has(b)?(X(b,!1),p[E]=b):b instanceof Promise?Object.defineProperty(p,E,{get(){return y(b)}}):A.has(b)?p[E]=fe(b,y):p[E]=b}),Object.freeze(p)},g=new WeakMap,w=[1,1],J=n=>{if(!K(n))throw new Error("object required");const v=g.get(n);if(v)return v;let y=w[0];const m=new Set,p=(i,r=++w[0])=>{y!==r&&(y=r,m.forEach(o=>o(i,r)))};let E=w[1];const b=(i=++w[1])=>(E!==i&&!m.size&&(E=i,C.forEach(([r])=>{const o=r[1](i);o>y&&(y=o)})),y),x=i=>(r,o)=>{const f=[...r];f[1]=[i,...f[1]],p(f,o)},C=new Map,ne=(i,r)=>{if(({BASE_URL:"/",MODE:"production",DEV:!1,PROD:!0}&&"production")!=="production"&&C.has(i))throw new Error("prop listener already exists");if(m.size){const o=r[3](x(i));C.set(i,[r,o])}else C.set(i,[r])},Z=i=>{var r;const o=C.get(i);o&&(C.delete(i),(r=o[1])==null||r.call(o))},se=i=>(m.add(i),m.size===1&&C.forEach(([o,f],S)=>{if(({BASE_URL:"/",MODE:"production",DEV:!1,PROD:!0}&&"production")!=="production"&&f)throw new Error("remove already exists");const z=o[3](x(S));C.set(S,[o,z])}),()=>{m.delete(i),m.size===0&&C.forEach(([o,f],S)=>{f&&(f(),C.set(S,[o]))})}),V=Array.isArray(n)?[]:Object.create(Object.getPrototypeOf(n)),_=t(V,{deleteProperty(i,r){const o=Reflect.get(i,r);Z(r);const f=Reflect.deleteProperty(i,r);return f&&p(["delete",[r],o]),f},set(i,r,o,f){var S;const z=Reflect.has(i,r),G=Reflect.get(i,r,f);if(z&&e(G,o))return!0;Z(r),K(o)&&(o=ce(o)||o);let R=o;if(!((S=Object.getOwnPropertyDescriptor(i,r))!=null&&S.set))if(o instanceof Promise)o.then(O=>{o.status="fulfilled",o.value=O,p(["resolve",[r],O])}).catch(O=>{o.status="rejected",o.reason=O,p(["reject",[r],O])});else{!A.has(o)&&s(o)&&(R=L(o));const O=!k.has(R)&&A.get(R);O&&ne(r,O)}return Reflect.set(i,r,R,f),p(["set",[r],o,G]),!0}});g.set(n,_);const oe=[V,b,u,se];return A.set(_,oe),Reflect.ownKeys(n).forEach(i=>{const r=Object.getOwnPropertyDescriptor(n,i);r.get||r.set?Object.defineProperty(V,i,r):_[i]=n[i]}),_})=>[J,A,k,e,t,s,a,c,u,g,w],[ue]=de();function L(e={}){return ue(e)}function N(e,t,s){const a=A.get(e);({BASE_URL:"/",MODE:"production",DEV:!1,PROD:!0}&&"production")!=="production"&&!a&&console.warn("Please use proxy object");let c;const u=[],g=a[3];let w=!1;const n=g(v=>{if(u.push(v),s){t(u.splice(0));return}c||(c=Promise.resolve().then(()=>{c=void 0,w&&t(u.splice(0))}))});return w=!0,()=>{w=!1,n()}}function fe(e,t){const s=A.get(e);({BASE_URL:"/",MODE:"production",DEV:!1,PROD:!0}&&"production")!=="production"&&!s&&console.warn("Please use proxy object");const[a,c,u]=s;return u(a,c(),t)}const l=L({selectedChain:void 0,chains:void 0,standaloneChains:void 0,standaloneUri:void 0,address:void 0,profileName:void 0,profileAvatar:void 0,profileLoading:!1,balanceLoading:!1,balance:void 0,isConnected:!1,isStandalone:!1,isCustomDesktop:!1,isCustomMobile:!1,isDataLoaded:!1,isUiLoaded:!1,walletConnectVersion:1}),d={state:l,subscribe(e){return N(l,()=>e(l))},setChains(e){l.chains=e},setStandaloneChains(e){l.standaloneChains=e},setStandaloneUri(e){l.standaloneUri=e},getSelectedChain(){const e=F.client().getNetwork().chain;return e&&(l.selectedChain=e),l.selectedChain},setSelectedChain(e){l.selectedChain=e},setIsStandalone(e){l.isStandalone=e},setIsCustomDesktop(e){l.isCustomDesktop=e},setIsCustomMobile(e){l.isCustomMobile=e},getAccount(){const e=F.client().getAccount();l.address=e.address,l.isConnected=e.isConnected},setAddress(e){l.address=e},setIsConnected(e){l.isConnected=e},setProfileName(e){l.profileName=e},setProfileAvatar(e){l.profileAvatar=e},setProfileLoading(e){l.profileLoading=e},setBalanceLoading(e){l.balanceLoading=e},setBalance(e){l.balance=e},setIsDataLoaded(e){l.isDataLoaded=e},setIsUiLoaded(e){l.isUiLoaded=e},setWalletConnectVersion(e){l.walletConnectVersion=e},resetEnsProfile(){l.profileName=void 0,l.profileAvatar=void 0},resetBalance(){l.balance=void 0},resetAccount(){l.address=void 0,l.isConnected=!1,d.resetEnsProfile(),d.resetBalance()}},D=L({initialized:!1,ethereumClient:void 0}),F={setEthereumClient(e){!D.initialized&&e&&(D.ethereumClient=e,d.setChains(e.chains),D.initialized=!0)},client(){if(D.ethereumClient)return D.ethereumClient;throw new Error("ClientCtrl has no client set")}},I={WALLETCONNECT_DEEPLINK_CHOICE:"WALLETCONNECT_DEEPLINK_CHOICE",isMobile(){return typeof window<"u"?Boolean(window.matchMedia("(pointer:coarse)").matches||/Android|webOS|iPhone|iPad|iPod|BlackBerry|Opera Mini/u.test(navigator.userAgent)):!1},isAndroid(){return I.isMobile()&&navigator.userAgent.toLowerCase().includes("android")},isEmptyObject(e){return Object.getPrototypeOf(e)===Object.prototype&&Object.getOwnPropertyNames(e).length===0&&Object.getOwnPropertySymbols(e).length===0},isHttpUrl(e){return e.startsWith("http://")||e.startsWith("https://")},formatNativeUrl(e,t,s){if(I.isHttpUrl(e))return this.formatUniversalUrl(e,t,s);let a=e;a.includes("://")||(a=e.replaceAll("/","").replaceAll(":",""),a=`${a}://`),this.setWalletConnectDeepLink(a,s);const c=encodeURIComponent(t);return`${a}wc?uri=${c}`},formatUniversalUrl(e,t,s){if(!I.isHttpUrl(e))return this.formatNativeUrl(e,t,s);let a=e;e.endsWith("/")&&(a=e.slice(0,-1)),this.setWalletConnectDeepLink(a,s);const c=encodeURIComponent(t);return`${a}/wc?uri=${c}`},async wait(e){return new Promise(t=>{setTimeout(t,e)})},openHref(e,t="_self"){window.open(e,t,"noreferrer noopener")},setWalletConnectDeepLink(e,t){localStorage.setItem(I.WALLETCONNECT_DEEPLINK_CHOICE,JSON.stringify({href:e,name:t}))},setWalletConnectAndroidDeepLink(e){const[t]=e.split("?");localStorage.setItem(I.WALLETCONNECT_DEEPLINK_CHOICE,JSON.stringify({href:t,name:"Android"}))},removeWalletConnectDeepLink(){localStorage.removeItem(I.WALLETCONNECT_DEEPLINK_CHOICE)},isNull(e){return e===null}};function pe(){return typeof matchMedia<"u"&&matchMedia("(prefers-color-scheme: dark)").matches}const U=L({projectId:"",themeMode:pe()?"dark":"light",themeColor:"default",themeBackground:I.isMobile()?"themeColor":"gradient",themeZIndex:89,mobileWallets:void 0,desktopWallets:void 0,walletImages:void 0,chainImages:void 0,tokenImages:void 0,standaloneChains:void 0,enableStandaloneMode:!1,enableNetworkView:!1,enableAccountView:!0,defaultChain:void 0,explorerAllowList:void 0,explorerDenyList:void 0,termsOfServiceUrl:void 0,privacyPolicyUrl:void 0}),T={state:U,subscribe(e){return N(U,()=>e(U))},setConfig(e){var t,s,a,c;if(d.setStandaloneChains(e.standaloneChains),d.setIsStandalone(Boolean((t=e.standaloneChains)==null?void 0:t.length)||Boolean(e.enableStandaloneMode)),d.setIsCustomMobile(Boolean((s=e.mobileWallets)==null?void 0:s.length)),d.setIsCustomDesktop(Boolean((a=e.desktopWallets)==null?void 0:a.length)),d.setWalletConnectVersion((c=e.walletConnectVersion)!=null?c:1),e.defaultChain)d.setSelectedChain(e.defaultChain);else if(!d.state.isStandalone){const u=F.client().getDefaultChain();d.setSelectedChain(u)}Object.assign(U,e)},setThemeConfig(e){Object.assign(U,e)}},Y="https://explorer-api.walletconnect.com";function he(e){const t=Object.fromEntries(Object.entries(e).filter(([s,a])=>typeof a<"u"&&a!==null&&a!=="").map(([s,a])=>[s,a.toString()]));return new URLSearchParams(t).toString()}const B={async fetchWallets(e,t){const s=he(t),a=`${Y}/v3/wallets?projectId=${e}&${s}`;return(await fetch(a)).json()},formatImageUrl(e,t){return`${Y}/v3/logo/lg/${t}?projectId=${e}`}},P=L({wallets:{listings:[],total:0,page:1},search:{listings:[],total:0,page:1},previewWallets:[],recomendedWallets:[]});function $(){const{projectId:e}=T.state;if(!e)throw new Error("projectId is required to work with explorer api");return e}const Ee={state:P,async getPreviewWallets(e){const{listings:t}=await B.fetchWallets($(),e);return P.previewWallets=Object.values(t),P.previewWallets},async getRecomendedWallets(){const{listings:e}=await B.fetchWallets($(),{page:1,entries:6});P.recomendedWallets=Object.values(e)},async getPaginatedWallets(e){const{page:t,search:s}=e,{listings:a,total:c}=await B.fetchWallets($(),e),u=Object.values(a),g=s?"search":"wallets";return P[g]={listings:[...P[g].listings,...u],total:c,page:t!=null?t:1},{listings:u,total:c}},getImageUrl(e){return B.formatImageUrl($(),e)},resetSearch(){P.search={listings:[],total:0,page:1}}},h=L({history:["ConnectWallet"],view:"ConnectWallet",data:void 0}),M={state:h,subscribe(e){return N(h,()=>e(h))},push(e,t){e!==h.view&&(h.view=e,t&&(h.data=t),h.history.push(e))},replace(e){h.view=e,h.history=[e]},goBack(){if(h.history.length>1){h.history.pop();const[e]=h.history.slice(-1);h.view=e}}},j=L({open:!1}),H={state:j,subscribe(e){return N(j,()=>e(j))},async open(e){return new Promise(t=>{const{isConnected:s,isStandalone:a,isUiLoaded:c,isDataLoaded:u}=d.state,{enableNetworkView:g}=T.state;if(a?(d.setStandaloneUri(e==null?void 0:e.uri),d.setStandaloneChains(e==null?void 0:e.standaloneChains),M.replace("ConnectWallet")):e!=null&&e.route?M.replace(e.route):s?M.replace("Account"):g?M.replace("SelectNetwork"):M.replace("ConnectWallet"),c&&u)j.open=!0,t();else{const w=setInterval(()=>{d.state.isUiLoaded&&d.state.isDataLoaded&&(clearInterval(w),j.open=!0,t())},200)}})},close(){j.open=!1}},W=L({open:!1,message:"",variant:"success"}),Oe={state:W,subscribe(e){return N(W,()=>e(W))},openToast(e,t){W.open=!0,W.message=e,W.variant=t},closeToast(){W.open=!1}};typeof window<"u"&&(window.Buffer||(window.Buffer=re.Buffer),window.global||(window.global=window),window.process||(window.process={env:{}}));var we=Object.defineProperty,ee=Object.getOwnPropertySymbols,me=Object.prototype.hasOwnProperty,ge=Object.prototype.propertyIsEnumerable,te=(e,t,s)=>t in e?we(e,t,{enumerable:!0,configurable:!0,writable:!0,value:s}):e[t]=s,be=(e,t)=>{for(var s in t||(t={}))me.call(t,s)&&te(e,s,t[s]);if(ee)for(var s of ee(t))ge.call(t,s)&&te(e,s,t[s]);return e};class Ce{constructor(t){this.openModal=H.open,this.closeModal=H.close,this.subscribeModal=H.subscribe,this.setTheme=T.setThemeConfig,T.setConfig(be({enableStandaloneMode:!0},t)),this.initUi()}async initUi(){if(typeof window<"u"){await ae(()=>import("./index.fee78e25.js"),["assets/index.fee78e25.js","assets/index.01c5f4c8.js","assets/index.c7edd8e6.css"]);const t=document.createElement("w3m-modal");document.body.insertAdjacentElement("beforeend",t),d.setIsUiLoaded(!0)}}}const Le=Object.freeze(Object.defineProperty({__proto__:null,Web3Modal:Ce},Symbol.toStringTag,{value:"Module"}));export{Ee as A,F as L,Oe as P,T as W,d as a,I as d,M as g,Le as i,H as k};
