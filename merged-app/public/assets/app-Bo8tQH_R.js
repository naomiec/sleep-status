(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function e(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(i){if(i.ep)return;i.ep=!0;const r=e(i);fetch(i.href,r)}})();(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))e(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const r of i.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&e(r)}).observe(document,{childList:!0,subtree:!0});function t(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function e(s){if(s.ep)return;s.ep=!0;const i=t(s);fetch(s.href,i)}})();/**
* @license
* Copyright 2019 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/const T=globalThis,D=T.ShadowRoot&&(T.ShadyCSS===void 0||T.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,z=Symbol(),B=new WeakMap;let st=class{constructor(n,t,e){if(this._$cssResult$=!0,e!==z)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=n,this.t=t}get styleSheet(){let n=this.o;const t=this.t;if(D&&n===void 0){const e=t!==void 0&&t.length===1;e&&(n=B.get(t)),n===void 0&&((this.o=n=new CSSStyleSheet).replaceSync(this.cssText),e&&B.set(t,n))}return n}toString(){return this.cssText}};const ut=n=>new st(typeof n=="string"?n:n+"",void 0,z),it=(n,...t)=>{const e=n.length===1?n[0]:t.reduce((s,i,r)=>s+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+n[r+1],n[0]);return new st(e,n,z)},pt=(n,t)=>{if(D)n.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const e of t){const s=document.createElement("style"),i=T.litNonce;i!==void 0&&s.setAttribute("nonce",i),s.textContent=e.cssText,n.appendChild(s)}},V=D?n=>n:n=>n instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return ut(e)})(n):n;/**
* @license
* Copyright 2017 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/const{is:ft,defineProperty:$t,getOwnPropertyDescriptor:_t,getOwnPropertyNames:mt,getOwnPropertySymbols:gt,getPrototypeOf:vt}=Object,A=globalThis,W=A.trustedTypes,yt=W?W.emptyScript:"",q=A.reactiveElementPolyfillSupport,w=(n,t)=>n,N={toAttribute(n,t){switch(t){case Boolean:n=n?yt:null;break;case Object:case Array:n=n==null?n:JSON.stringify(n)}return n},fromAttribute(n,t){let e=n;switch(t){case Boolean:e=n!==null;break;case Number:e=n===null?null:Number(n);break;case Object:case Array:try{e=JSON.parse(n)}catch{e=null}}return e}},I=(n,t)=>!ft(n,t),K={attribute:!0,type:String,converter:N,reflect:!1,hasChanged:I};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),A.litPropertyMetadata??(A.litPropertyMetadata=new WeakMap);class v extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??(this.l=[])).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=K){if(e.state&&(e.attribute=!1),this._$Ei(),this.elementProperties.set(t,e),!e.noAccessor){const s=Symbol(),i=this.getPropertyDescriptor(t,s,e);i!==void 0&&$t(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){const{get:i,set:r}=_t(this.prototype,t)??{get(){return this[e]},set(o){this[e]=o}};return{get(){return i==null?void 0:i.call(this)},set(o){const a=i==null?void 0:i.call(this);r.call(this,o),this.requestUpdate(t,a,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??K}static _$Ei(){if(this.hasOwnProperty(w("elementProperties")))return;const t=vt(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(w("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(w("properties"))){const e=this.properties,s=[...mt(e),...gt(e)];for(const i of s)this.createProperty(i,e[i])}const t=this[Symbol.metadata];if(t!==null){const e=litPropertyMetadata.get(t);if(e!==void 0)for(const[s,i]of e)this.elementProperties.set(s,i)}this._$Eh=new Map;for(const[e,s]of this.elementProperties){const i=this._$Eu(e,s);i!==void 0&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const i of s)e.unshift(V(i))}else t!==void 0&&e.push(V(t));return e}static _$Eu(t,e){const s=e.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var t;this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),(t=this.constructor.l)==null||t.forEach(e=>e(this))}addController(t){var e;(this._$EO??(this._$EO=new Set)).add(t),this.renderRoot!==void 0&&this.isConnected&&((e=t.hostConnected)==null||e.call(t))}removeController(t){var e;(e=this._$EO)==null||e.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return pt(t,this.constructor.elementStyles),t}connectedCallback(){var t;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(t=this._$EO)==null||t.forEach(e=>{var s;return(s=e.hostConnected)==null?void 0:s.call(e)})}enableUpdating(t){}disconnectedCallback(){var t;(t=this._$EO)==null||t.forEach(e=>{var s;return(s=e.hostDisconnected)==null?void 0:s.call(e)})}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$EC(t,e){var s;const i=this.constructor.elementProperties.get(t),r=this.constructor._$Eu(t,i);if(r!==void 0&&i.reflect===!0){const o=(((s=i.converter)==null?void 0:s.toAttribute)!==void 0?i.converter:N).toAttribute(e,i.type);this._$Em=t,o==null?this.removeAttribute(r):this.setAttribute(r,o),this._$Em=null}}_$AK(t,e){var s;const i=this.constructor,r=i._$Eh.get(t);if(r!==void 0&&this._$Em!==r){const o=i.getPropertyOptions(r),a=typeof o.converter=="function"?{fromAttribute:o.converter}:((s=o.converter)==null?void 0:s.fromAttribute)!==void 0?o.converter:N;this._$Em=r,this[r]=a.fromAttribute(e,o.type),this._$Em=null}}requestUpdate(t,e,s){if(t!==void 0){if(s??(s=this.constructor.getPropertyOptions(t)),!(s.hasChanged??I)(this[t],e))return;this.P(t,e,s)}this.isUpdatePending===!1&&(this._$ES=this._$ET())}P(t,e,s){this._$AL.has(t)||this._$AL.set(t,e),s.reflect===!0&&this._$Em!==t&&(this._$Ej??(this._$Ej=new Set)).add(t)}async _$ET(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[r,o]of this._$Ep)this[r]=o;this._$Ep=void 0}const i=this.constructor.elementProperties;if(i.size>0)for(const[r,o]of i)o.wrapped!==!0||this._$AL.has(r)||this[r]===void 0||this.P(r,this[r],o)}let e=!1;const s=this._$AL;try{e=this.shouldUpdate(s),e?(this.willUpdate(s),(t=this._$EO)==null||t.forEach(i=>{var r;return(r=i.hostUpdate)==null?void 0:r.call(i)}),this.update(s)):this._$EU()}catch(i){throw e=!1,this._$EU(),i}e&&this._$AE(s)}willUpdate(t){}_$AE(t){var e;(e=this._$EO)==null||e.forEach(s=>{var i;return(i=s.hostUpdated)==null?void 0:i.call(s)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EU(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Ej&&(this._$Ej=this._$Ej.forEach(e=>this._$EC(e,this[e]))),this._$EU()}updated(t){}firstUpdated(t){}}v.elementStyles=[],v.shadowRootOptions={mode:"open"},v[w("elementProperties")]=new Map,v[w("finalized")]=new Map,q==null||q({ReactiveElement:v}),(A.reactiveElementVersions??(A.reactiveElementVersions=[])).push("2.0.4");/**
* @license
* Copyright 2017 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/const H=globalThis,M=H.trustedTypes,J=M?M.createPolicy("lit-html",{createHTML:n=>n}):void 0,nt="$lit$",$=`lit$${(Math.random()+"").slice(9)}$`,ot="?"+$,At=`<${ot}>`,g=document,P=()=>g.createComment(""),C=n=>n===null||typeof n!="object"&&typeof n!="function",rt=Array.isArray,bt=n=>rt(n)||typeof(n==null?void 0:n[Symbol.iterator])=="function",L=`[ 	
\f\r]`,S=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Z=/-->/g,F=/>/g,_=RegExp(`>|${L}(?:([^\\s"'>=/]+)(${L}*=${L}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),G=/'/g,Q=/"/g,lt=/^(?:script|style|textarea|title)$/i,Et=n=>(t,...e)=>({_$litType$:n,strings:t,values:e}),at=Et(1),b=Symbol.for("lit-noChange"),d=Symbol.for("lit-nothing"),X=new WeakMap,m=g.createTreeWalker(g,129);function ht(n,t){if(!Array.isArray(n)||!n.hasOwnProperty("raw"))throw Error("invalid template strings array");return J!==void 0?J.createHTML(t):t}const St=(n,t)=>{const e=n.length-1,s=[];let i,r=t===2?"<svg>":"",o=S;for(let a=0;a<e;a++){const l=n[a];let c,u,h=-1,p=0;for(;p<l.length&&(o.lastIndex=p,u=o.exec(l),u!==null);)p=o.lastIndex,o===S?u[1]==="!--"?o=Z:u[1]!==void 0?o=F:u[2]!==void 0?(lt.test(u[2])&&(i=RegExp("</"+u[2],"g")),o=_):u[3]!==void 0&&(o=_):o===_?u[0]===">"?(o=i??S,h=-1):u[1]===void 0?h=-2:(h=o.lastIndex-u[2].length,c=u[1],o=u[3]===void 0?_:u[3]==='"'?Q:G):o===Q||o===G?o=_:o===Z||o===F?o=S:(o=_,i=void 0);const f=o===_&&n[a+1].startsWith("/>")?" ":"";r+=o===S?l+At:h>=0?(s.push(c),l.slice(0,h)+nt+l.slice(h)+$+f):l+$+(h===-2?a:f)}return[ht(n,r+(n[e]||"<?>")+(t===2?"</svg>":"")),s]};class x{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let r=0,o=0;const a=t.length-1,l=this.parts,[c,u]=St(t,e);if(this.el=x.createElement(c,s),m.currentNode=this.el.content,e===2){const h=this.el.content.firstChild;h.replaceWith(...h.childNodes)}for(;(i=m.nextNode())!==null&&l.length<a;){if(i.nodeType===1){if(i.hasAttributes())for(const h of i.getAttributeNames())if(h.endsWith(nt)){const p=u[o++],f=i.getAttribute(h).split($),U=/([.?@])?(.*)/.exec(p);l.push({type:1,index:r,name:U[2],strings:f,ctor:U[1]==="."?Pt:U[1]==="?"?Ct:U[1]==="@"?xt:k}),i.removeAttribute(h)}else h.startsWith($)&&(l.push({type:6,index:r}),i.removeAttribute(h));if(lt.test(i.tagName)){const h=i.textContent.split($),p=h.length-1;if(p>0){i.textContent=M?M.emptyScript:"";for(let f=0;f<p;f++)i.append(h[f],P()),m.nextNode(),l.push({type:2,index:++r});i.append(h[p],P())}}}else if(i.nodeType===8)if(i.data===ot)l.push({type:2,index:r});else{let h=-1;for(;(h=i.data.indexOf($,h+1))!==-1;)l.push({type:7,index:r}),h+=$.length-1}r++}}static createElement(t,e){const s=g.createElement("template");return s.innerHTML=t,s}}function E(n,t,e=n,s){var i,r;if(t===b)return t;let o=s!==void 0?(i=e._$Co)==null?void 0:i[s]:e._$Cl;const a=C(t)?void 0:t._$litDirective$;return(o==null?void 0:o.constructor)!==a&&((r=o==null?void 0:o._$AO)==null||r.call(o,!1),a===void 0?o=void 0:(o=new a(n),o._$AT(n,e,s)),s!==void 0?(e._$Co??(e._$Co=[]))[s]=o:e._$Cl=o),o!==void 0&&(t=E(n,o._$AS(n,t.values),o,s)),t}class wt{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:s}=this._$AD,i=((t==null?void 0:t.creationScope)??g).importNode(e,!0);m.currentNode=i;let r=m.nextNode(),o=0,a=0,l=s[0];for(;l!==void 0;){if(o===l.index){let c;l.type===2?c=new O(r,r.nextSibling,this,t):l.type===1?c=new l.ctor(r,l.name,l.strings,this,t):l.type===6&&(c=new Ot(r,this,t)),this._$AV.push(c),l=s[++a]}o!==(l==null?void 0:l.index)&&(r=m.nextNode(),o++)}return m.currentNode=g,i}p(t){let e=0;for(const s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}}class O{get _$AU(){var t;return((t=this._$AM)==null?void 0:t._$AU)??this._$Cv}constructor(t,e,s,i){this.type=2,this._$AH=d,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cv=(i==null?void 0:i.isConnected)??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return e!==void 0&&(t==null?void 0:t.nodeType)===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=E(this,t,e),C(t)?t===d||t==null||t===""?(this._$AH!==d&&this._$AR(),this._$AH=d):t!==this._$AH&&t!==b&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):bt(t)?this.k(t):this._(t)}S(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.S(t))}_(t){this._$AH!==d&&C(this._$AH)?this._$AA.nextSibling.data=t:this.T(g.createTextNode(t)),this._$AH=t}$(t){var e;const{values:s,_$litType$:i}=t,r=typeof i=="number"?this._$AC(t):(i.el===void 0&&(i.el=x.createElement(ht(i.h,i.h[0]),this.options)),i);if(((e=this._$AH)==null?void 0:e._$AD)===r)this._$AH.p(s);else{const o=new wt(r,this),a=o.u(this.options);o.p(s),this.T(a),this._$AH=o}}_$AC(t){let e=X.get(t.strings);return e===void 0&&X.set(t.strings,e=new x(t)),e}k(t){rt(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let s,i=0;for(const r of t)i===e.length?e.push(s=new O(this.S(P()),this.S(P()),this,this.options)):s=e[i],s._$AI(r),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){var s;for((s=this._$AP)==null?void 0:s.call(this,!1,!0,e);t&&t!==this._$AB;){const i=t.nextSibling;t.remove(),t=i}}setConnected(t){var e;this._$AM===void 0&&(this._$Cv=t,(e=this._$AP)==null||e.call(this,t))}}class k{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,i,r){this.type=1,this._$AH=d,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=r,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=d}_$AI(t,e=this,s,i){const r=this.strings;let o=!1;if(r===void 0)t=E(this,t,e,0),o=!C(t)||t!==this._$AH&&t!==b,o&&(this._$AH=t);else{const a=t;let l,c;for(t=r[0],l=0;l<r.length-1;l++)c=E(this,a[s+l],e,l),c===b&&(c=this._$AH[l]),o||(o=!C(c)||c!==this._$AH[l]),c===d?t=d:t!==d&&(t+=(c??"")+r[l+1]),this._$AH[l]=c}o&&!i&&this.j(t)}j(t){t===d?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class Pt extends k{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===d?void 0:t}}class Ct extends k{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==d)}}class xt extends k{constructor(t,e,s,i,r){super(t,e,s,i,r),this.type=5}_$AI(t,e=this){if((t=E(this,t,e,0)??d)===b)return;const s=this._$AH,i=t===d&&s!==d||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,r=t!==d&&(s===d||i);i&&this.element.removeEventListener(this.name,this,s),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e;typeof this._$AH=="function"?this._$AH.call(((e=this.options)==null?void 0:e.host)??this.element,t):this._$AH.handleEvent(t)}}class Ot{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){E(this,t)}}const Y=H.litHtmlPolyfillSupport;Y==null||Y(x,O),(H.litHtmlVersions??(H.litHtmlVersions=[])).push("3.1.2");const Ut=(n,t,e)=>{const s=(e==null?void 0:e.renderBefore)??t;let i=s._$litPart$;if(i===void 0){const r=(e==null?void 0:e.renderBefore)??null;s._$litPart$=i=new O(t.insertBefore(P(),r),r,void 0,e??{})}return i._$AI(n),i};/**
* @license
* Copyright 2017 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/class y extends v{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t;const e=super.createRenderRoot();return(t=this.renderOptions).renderBefore??(t.renderBefore=e.firstChild),e}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Ut(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),(t=this._$Do)==null||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._$Do)==null||t.setConnected(!1)}render(){return b}}var tt;y._$litElement$=!0,y.finalized=!0,(tt=globalThis.litElementHydrateSupport)==null||tt.call(globalThis,{LitElement:y});const et=globalThis.litElementPolyfillSupport;et==null||et({LitElement:y});(globalThis.litElementVersions??(globalThis.litElementVersions=[])).push("4.0.4");/**
* @license
* Copyright 2017 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/const ct=n=>(t,e)=>{e!==void 0?e.addInitializer(()=>{customElements.define(n,t)}):customElements.define(n,t)};/**
* @license
* Copyright 2017 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/const Tt={attribute:!0,type:String,converter:N,reflect:!1,hasChanged:I},Nt=(n=Tt,t,e)=>{const{kind:s,metadata:i}=e;let r=globalThis.litPropertyMetadata.get(i);if(r===void 0&&globalThis.litPropertyMetadata.set(i,r=new Map),r.set(e.name,n),s==="accessor"){const{name:o}=e;return{set(a){const l=t.get.call(this);t.set.call(this,a),this.requestUpdate(o,l,n)},init(a){return a!==void 0&&this.P(o,void 0,n),a}}}if(s==="setter"){const{name:o}=e;return function(a){const l=this[o];t.call(this,a),this.requestUpdate(o,l,n)}}throw Error("Unsupported decorator location: "+s)};function Ht(n){return(t,e)=>typeof e=="object"?Nt(n,t,e):((s,i,r)=>{const o=i.hasOwnProperty(r);return i.constructor.createProperty(r,o?{...s,wrapped:!0}:s),o?Object.getOwnPropertyDescriptor(i,r):void 0})(n,t,e)}var Mt=Object.defineProperty,Rt=Object.getOwnPropertyDescriptor,dt=(n,t,e,s)=>{for(var i=s>1?void 0:s?Rt(t,e):t,r=n.length-1,o;r>=0;r--)(o=n[r])&&(i=(s?o(t,e,i):o(i))||i);return s&&i&&Mt(t,e,i),i};let R=class extends y{constructor(){super(...arguments),this.open=!1}render(){return at`
      <input
        type="checkbox"
        id="is-shown"
        @change=${this._handleChange}
        .checked=${this.open}
      />
      <label for="is-shown">
        <slot></slot>
      </label>
    `}_handleChange(n){const t=n.target;this._toggle(t==null?void 0:t.checked)}_toggle(n){this.open=n,this._toggleClickAway(n)}_toggleClickAway(n){const t=e=>{this.open&&!this.contains(e.target)&&(this._toggle(!1),document.removeEventListener("click",t))};n&&setTimeout(()=>document.addEventListener("click",t),0)}};R.styles=it`
    :host {
      display: inline-block;
      position: relative;
    }

    #is-shown {
      display: none;
    }

    label {
      cursor: pointer;
    }

    slot[name="menu"] {
      display: none;
      position: absolute;
      top: 100%;
      left: 0;
      border: 1px solid;
      background: white;
    }

    #is-shown:checked ~ slot[name="menu"] {
      display: block;
    }

    /* CSS for slotted elements and default slot content */

    ::slotted(ul[slot="menu"]),
    slot[name="menu"] > ul {
      margin: 0;
      padding: 0.25em;
      list-style: none;
      white-space: nowrap;
    }
  `;dt([Ht({reflect:!0,type:Boolean})],R.prototype,"open",2);R=dt([ct("drop-down")],R);var kt=Object.defineProperty,Lt=Object.getOwnPropertyDescriptor,jt=(n,t,e,s)=>{for(var i=s>1?void 0:s?Lt(t,e):t,r=n.length-1,o;r>=0;r--)(o=n[r])&&(i=(s?o(t,e,i):o(i))||i);return s&&i&&kt(t,e,i),i};let j=class extends y{render(){return at`
      <a href="profile_page.html">Profile Page</a>`}};j.styles=it`
    :host {
      display: block;
      padding: 16px;
    }
    a {
      display: block;
      margin-bottom: 8px;
      color: var(--text-color-header);
      text-decoration: none;
      white-space: nowrap;
      text-align: right;
    }
  `;j=jt([ct("user-panel")],j);
