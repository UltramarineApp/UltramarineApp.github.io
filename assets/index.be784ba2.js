import{e as ce,_ as de}from"./index.1c39ec41.js";const fe=Symbol(),x=Object.getPrototypeOf,X=new WeakMap,ue=e=>e&&(X.has(e)?X.get(e):x(e)===Object.prototype||x(e)===Array.prototype),pe=e=>ue(e)&&e[fe]||null,ee=(e,t=!0)=>{X.set(e,t)},F=e=>typeof e=="object"&&e!==null,A=new WeakMap,T=new WeakSet,he=(e=Object.is,t=(o,C)=>new Proxy(o,C),n=o=>F(o)&&!T.has(o)&&(Array.isArray(o)||!(Symbol.iterator in o))&&!(o instanceof WeakMap)&&!(o instanceof WeakSet)&&!(o instanceof Error)&&!(o instanceof Number)&&!(o instanceof Date)&&!(o instanceof String)&&!(o instanceof RegExp)&&!(o instanceof ArrayBuffer),r=o=>{switch(o.status){case"fulfilled":return o.value;case"rejected":throw o.reason;default:throw o}},c=new WeakMap,d=(o,C,O=r)=>{const g=c.get(o);if((g==null?void 0:g[0])===C)return g[1];const y=Array.isArray(o)?[]:Object.create(Object.getPrototypeOf(o));return ee(y,!0),c.set(o,[C,y]),Reflect.ownKeys(o).forEach(D=>{if(Object.getOwnPropertyDescriptor(y,D))return;const v=Reflect.get(o,D),I={value:v,enumerable:!0,configurable:!0};if(T.has(v))ee(v,!1);else if(v instanceof Promise)delete I.value,I.get=()=>O(v);else if(A.has(v)){const[w,q]=A.get(v);I.value=d(w,q(),O)}Object.defineProperty(y,D,I)}),y},b=new WeakMap,m=[1,1],H=o=>{if(!F(o))throw new Error("object required");const C=b.get(o);if(C)return C;let O=m[0];const g=new Set,y=(i,a=++m[0])=>{O!==a&&(O=a,g.forEach(s=>s(i,a)))};let D=m[1];const v=(i=++m[1])=>(D!==i&&!g.size&&(D=i,w.forEach(([a])=>{const s=a[1](i);s>O&&(O=s)})),O),I=i=>(a,s)=>{const p=[...a];p[1]=[i,...p[1]],y(p,s)},w=new Map,q=(i,a)=>{if(({BASE_URL:"/",MODE:"production",DEV:!1,PROD:!0}&&"production")!=="production"&&w.has(i))throw new Error("prop listener already exists");if(g.size){const s=a[3](I(i));w.set(i,[a,s])}else w.set(i,[a])},Z=i=>{var a;const s=w.get(i);s&&(w.delete(i),(a=s[1])==null||a.call(s))},ie=i=>(g.add(i),g.size===1&&w.forEach(([s,p],N)=>{if(({BASE_URL:"/",MODE:"production",DEV:!1,PROD:!0}&&"production")!=="production"&&p)throw new Error("remove already exists");const _=s[3](I(N));w.set(N,[s,_])}),()=>{g.delete(i),g.size===0&&w.forEach(([s,p],N)=>{p&&(p(),w.set(N,[s]))})}),J=Array.isArray(o)?[]:Object.create(Object.getPrototypeOf(o)),k=t(J,{deleteProperty(i,a){const s=Reflect.get(i,a);Z(a);const p=Reflect.deleteProperty(i,a);return p&&y(["delete",[a],s]),p},set(i,a,s,p){const N=Reflect.has(i,a),_=Reflect.get(i,a,p);if(N&&(e(_,s)||b.has(s)&&e(_,b.get(s))))return!0;Z(a),F(s)&&(s=pe(s)||s);let $=s;if(s instanceof Promise)s.then(E=>{s.status="fulfilled",s.value=E,y(["resolve",[a],E])}).catch(E=>{s.status="rejected",s.reason=E,y(["reject",[a],E])});else{!A.has(s)&&n(s)&&($=H(s));const E=!T.has($)&&A.get($);E&&q(a,E)}return Reflect.set(i,a,$,p),y(["set",[a],s,_]),!0}});b.set(o,k);const le=[J,v,d,ie];return A.set(k,le),Reflect.ownKeys(o).forEach(i=>{const a=Object.getOwnPropertyDescriptor(o,i);"value"in a&&(k[i]=o[i],delete a.value,delete a.writable),Object.defineProperty(J,i,a)}),k})=>[H,A,T,e,t,n,r,c,d,b,m],[be]=he();function W(e={}){return be(e)}function M(e,t,n){const r=A.get(e);({BASE_URL:"/",MODE:"production",DEV:!1,PROD:!0}&&"production")!=="production"&&!r&&console.warn("Please use proxy object");let c;const d=[],b=r[3];let m=!1;const o=b(C=>{if(d.push(C),n){t(d.splice(0));return}c||(c=Promise.resolve().then(()=>{c=void 0,m&&t(d.splice(0))}))});return m=!0,()=>{m=!1,o()}}let G;const S={ethereumClient:void 0,setEthereumClient(e){G=e},client(){if(G)return G;throw new Error("ClientCtrl has no client set")}},l=W({address:void 0,profileName:void 0,profileAvatar:void 0,profileLoading:!1,balanceLoading:!1,balance:void 0,isConnected:!1}),we={state:l,subscribe(e){return M(l,()=>e(l))},getAccount(){const e=S.client().getAccount();l.address=e.address,l.isConnected=e.isConnected},async fetchProfile(e,t){try{l.profileLoading=!0;const n=t!=null?t:l.address,{id:r}=S.client().getDefaultChain();if(n&&r===1){const[c,d]=await Promise.all([S.client().fetchEnsName({address:n,chainId:1}),S.client().fetchEnsAvatar({address:n,chainId:1})]);d&&await e(d),l.profileName=c,l.profileAvatar=d}}finally{l.profileLoading=!1}},async fetchBalance(e){try{l.balanceLoading=!0;const t=e!=null?e:l.address;if(t){const n=await S.client().fetchBalance({address:t});l.balance={amount:n.formatted,symbol:n.symbol}}}finally{l.balanceLoading=!1}},setAddress(e){l.address=e},setIsConnected(e){l.isConnected=e},resetBalance(){l.balance=void 0},resetAccount(){l.address=void 0,l.isConnected=!1,l.profileName=void 0,l.profileAvatar=void 0,l.balance=void 0}},L={WALLETCONNECT_DEEPLINK_CHOICE:"WALLETCONNECT_DEEPLINK_CHOICE",W3M_VERSION:"W3M_VERSION",isMobile(){return typeof window<"u"?!!(window.matchMedia("(pointer:coarse)").matches||/Android|webOS|iPhone|iPad|iPod|BlackBerry|Opera Mini/u.test(navigator.userAgent)):!1},isAndroid(){return L.isMobile()&&navigator.userAgent.toLowerCase().includes("android")},isEmptyObject(e){return Object.getPrototypeOf(e)===Object.prototype&&Object.getOwnPropertyNames(e).length===0&&Object.getOwnPropertySymbols(e).length===0},isHttpUrl(e){return e.startsWith("http://")||e.startsWith("https://")},formatNativeUrl(e,t,n){if(L.isHttpUrl(e))return this.formatUniversalUrl(e,t,n);let r=e;r.includes("://")||(r=e.replaceAll("/","").replaceAll(":",""),r=`${r}://`),this.setWalletConnectDeepLink(r,n);const c=encodeURIComponent(t);return`${r}wc?uri=${c}`},formatUniversalUrl(e,t,n){if(!L.isHttpUrl(e))return this.formatNativeUrl(e,t,n);let r=e;e.endsWith("/")&&(r=e.slice(0,-1)),this.setWalletConnectDeepLink(r,n);const c=encodeURIComponent(t);return`${r}/wc?uri=${c}`},async wait(e){return new Promise(t=>{setTimeout(t,e)})},openHref(e,t){window.open(e,t,"noreferrer noopener")},setWalletConnectDeepLink(e,t){localStorage.setItem(L.WALLETCONNECT_DEEPLINK_CHOICE,JSON.stringify({href:e,name:t}))},setWalletConnectAndroidDeepLink(e){const[t]=e.split("?");localStorage.setItem(L.WALLETCONNECT_DEEPLINK_CHOICE,JSON.stringify({href:t,name:"Android"}))},removeWalletConnectDeepLink(){localStorage.removeItem(L.WALLETCONNECT_DEEPLINK_CHOICE)},isNull(e){return e===null},setWeb3ModalVersionInStorage(){typeof localStorage<"u"&&localStorage.setItem(L.W3M_VERSION,"2.2.2")}},f=W({selectedChain:void 0,chains:void 0,standaloneChains:void 0,standaloneUri:void 0,isStandalone:!1,isCustomDesktop:!1,isCustomMobile:!1,isDataLoaded:!1,isUiLoaded:!1,walletConnectVersion:1}),u={state:f,subscribe(e){return M(f,()=>e(f))},setChains(e){f.chains=e},setStandaloneChains(e){f.standaloneChains=e},setStandaloneUri(e){f.standaloneUri=e},getSelectedChain(){const e=S.client().getNetwork().chain;return e&&(f.selectedChain=e),f.selectedChain},setSelectedChain(e){f.selectedChain=e},setIsStandalone(e){f.isStandalone=e},setIsCustomDesktop(e){f.isCustomDesktop=e},setIsCustomMobile(e){f.isCustomMobile=e},setIsDataLoaded(e){f.isDataLoaded=e},setIsUiLoaded(e){f.isUiLoaded=e},setWalletConnectVersion(e){f.walletConnectVersion=e}},B=W({projectId:"",mobileWallets:void 0,desktopWallets:void 0,walletImages:void 0,chainImages:void 0,tokenImages:void 0,standaloneChains:void 0,enableStandaloneMode:!1,enableNetworkView:!1,enableAccountView:!0,enableExplorer:!0,defaultChain:void 0,explorerAllowList:void 0,explorerDenyList:void 0,termsOfServiceUrl:void 0,privacyPolicyUrl:void 0}),Y={state:B,subscribe(e){return M(B,()=>e(B))},setConfig(e){var t,n,r,c;if(u.setStandaloneChains(e.standaloneChains),u.setIsStandalone(!!((t=e.standaloneChains)!=null&&t.length)||!!e.enableStandaloneMode),u.setIsCustomMobile(!!((n=e.mobileWallets)!=null&&n.length)),u.setIsCustomDesktop(!!((r=e.desktopWallets)!=null&&r.length)),u.setWalletConnectVersion((c=e.walletConnectVersion)!=null?c:1),!u.state.isStandalone){const d=S.client().getDefaultChain();u.setSelectedChain(d),u.setChains(S.client().chains)}e.defaultChain&&u.setSelectedChain(e.defaultChain),L.setWeb3ModalVersionInStorage(),Object.assign(B,e)}},te="https://explorer-api.walletconnect.com";function me(e){const t=Object.fromEntries(Object.entries(e).filter(([n,r])=>typeof r<"u"&&r!==null&&r!=="").map(([n,r])=>[n,r.toString()]));return new URLSearchParams(t).toString()}const K={async fetchWallets(e,t){const n=me(t),r=`${te}/v3/wallets?projectId=${e}&${n}`;return(await fetch(r)).json()},formatImageUrl(e,t){return`${te}/v3/logo/lg/${t}?projectId=${e}`}},P=W({wallets:{listings:[],total:0,page:1},search:{listings:[],total:0,page:1},previewWallets:[],recomendedWallets:[]});function z(){const{projectId:e}=Y.state;if(!e)throw new Error("projectId is required to work with explorer api");return e}const Ae={state:P,async getPreviewWallets(e){const{listings:t}=await K.fetchWallets(z(),e);return P.previewWallets=Object.values(t),P.previewWallets},async getRecomendedWallets(){const{listings:e}=await K.fetchWallets(z(),{page:1,entries:6});P.recomendedWallets=Object.values(e)},async getPaginatedWallets(e){const{page:t,search:n}=e,{listings:r,total:c}=await K.fetchWallets(z(),e),d=Object.values(r),b=n?"search":"wallets";return P[b]={listings:[...P[b].listings,...d],total:c,page:t!=null?t:1},{listings:d,total:c}},getImageUrl(e){return K.formatImageUrl(z(),e)},resetSearch(){P.search={listings:[],total:0,page:1}}},h=W({history:["ConnectWallet"],view:"ConnectWallet",data:void 0}),R={state:h,subscribe(e){return M(h,()=>e(h))},push(e,t){e!==h.view&&(h.view=e,t&&(h.data=t),h.history.push(e))},replace(e){h.view=e,h.history=[e]},goBack(){if(h.history.length>1){h.history.pop();const[e]=h.history.slice(-1);h.view=e}}},U=W({open:!1}),Q={state:U,subscribe(e){return M(U,()=>e(U))},async open(e){return new Promise(t=>{const{isStandalone:n,isUiLoaded:r,isDataLoaded:c}=u.state,{isConnected:d}=we.state,{enableNetworkView:b}=Y.state;if(n?(u.setStandaloneUri(e==null?void 0:e.uri),u.setStandaloneChains(e==null?void 0:e.standaloneChains),R.replace("ConnectWallet")):e!=null&&e.route?R.replace(e.route):d?R.replace("Account"):b?R.replace("SelectNetwork"):R.replace("ConnectWallet"),r&&c)U.open=!0,t();else{const m=setInterval(()=>{u.state.isUiLoaded&&u.state.isDataLoaded&&(clearInterval(m),U.open=!0,t())},200)}})},close(){U.open=!1}};var ge=Object.defineProperty,ne=Object.getOwnPropertySymbols,ye=Object.prototype.hasOwnProperty,Ce=Object.prototype.propertyIsEnumerable,se=(e,t,n)=>t in e?ge(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,ve=(e,t)=>{for(var n in t||(t={}))ye.call(t,n)&&se(e,n,t[n]);if(ne)for(var n of ne(t))Ce.call(t,n)&&se(e,n,t[n]);return e};function Oe(){return typeof matchMedia<"u"&&matchMedia("(prefers-color-scheme: dark)").matches}const V=W({themeMode:Oe()?"dark":"light"}),oe={state:V,subscribe(e){return M(V,()=>e(V))},setThemeConfig(e){const{themeMode:t,themeVariables:n}=e;t&&(V.themeMode=t),n&&(V.themeVariables=ve({},n))}},j=W({open:!1,message:"",variant:"success"}),Me={state:j,subscribe(e){return M(j,()=>e(j))},openToast(e,t){j.open=!0,j.message=e,j.variant=t},closeToast(){j.open=!1}};typeof window<"u"&&(window.Buffer||(window.Buffer=ce.Buffer),window.global||(window.global=window),window.process||(window.process={env:{}}));var Ee=Object.defineProperty,ae=Object.getOwnPropertySymbols,Le=Object.prototype.hasOwnProperty,Se=Object.prototype.propertyIsEnumerable,re=(e,t,n)=>t in e?Ee(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,We=(e,t)=>{for(var n in t||(t={}))Le.call(t,n)&&re(e,n,t[n]);if(ae)for(var n of ae(t))Se.call(t,n)&&re(e,n,t[n]);return e};class Ie{constructor(t){this.openModal=Q.open,this.closeModal=Q.close,this.subscribeModal=Q.subscribe,this.setTheme=oe.setThemeConfig,oe.setThemeConfig(t),Y.setConfig(We({enableStandaloneMode:!0},t)),this.initUi()}async initUi(){if(typeof window<"u"){await de(()=>import("./index.b53c9c7a.js"),["assets/index.b53c9c7a.js","assets/index.1c39ec41.js","assets/index.c7edd8e6.css"]);const t=document.createElement("w3m-modal");document.body.insertAdjacentElement("beforeend",t),u.setIsUiLoaded(!0)}}}const De=Object.freeze(Object.defineProperty({__proto__:null,Web3Modal:Ie},Symbol.toStringTag,{value:"Module"}));export{we as A,oe as B,Me as H,Y as S,Ae as _,De as a,L as d,R as g,u as i,S as p,Q as x};
