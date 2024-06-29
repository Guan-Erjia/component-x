var Q=Object.defineProperty;var U=(e,t,n)=>t in e?Q(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var s=(e,t,n)=>(U(e,typeof t!="symbol"?t+"":t,n),n);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const a of r)if(a.type==="childList")for(const i of a.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&o(i)}).observe(document,{childList:!0,subtree:!0});function n(r){const a={};return r.integrity&&(a.integrity=r.integrity),r.referrerPolicy&&(a.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?a.credentials="include":r.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function o(r){if(r.ep)return;r.ep=!0;const a=n(r);fetch(r.href,a)}})();function d(e,t){const n=document.createElement("template");n.innerHTML=e+t,this.attachShadow({mode:"open"}).appendChild(n.content.cloneNode(!0)),this.root=this.shadowRoot.children[0]}function l(e,t,n){this.dispatchEvent(new CustomEvent(e,{detail:t,bubbles:n}))}class c extends HTMLElement{constructor(){super();s(this,"callbackList");s(this,"attributeList");this.attributeList=new Set,this.callbackList=[]}}s(c,"name"),s(c,"register");function h(e){const t=e.name;e.register=()=>{if(!t)return console.error("未定义组件名称");customElements.get(t)&&console.warn(`自定义元素-- ${t} -- 重复注册！后注册的元素将会覆盖`),customElements.define(t,e)}}var D=Object.defineProperty,W=Object.getOwnPropertyDescriptor,Z=(e,t,n)=>t in e?D(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,tt=(e,t,n,o)=>{for(var r=o>1?void 0:o?W(t,n):t,a=e.length-1,i;a>=0;a--)(i=e[a])&&(r=(o?i(t,n,r):i(r))||r);return o&&r&&D(t,n,r),r},nt=(e,t,n)=>(Z(e,typeof t!="symbol"?t+"":t,n),n);const et=`<div
    class="item"
    style="
      border-top-width: var(--control-line);
      border-left-width: var(--control-line);
      border-top-left-radius: 100%;
    "
  ></div>
  <div
    class="item"
    style="
      border-top-width: var(--control-line);
      border-right-width: var(--control-line);
      border-top-right-radius: 100%;
    "
  ></div>
  <div
    class="item"
    style="
      border-bottom-width: var(--control-line);
      border-left-width: var(--control-line);
      border-bottom-left-radius: 100%;
    "
  ></div>`,rt=`<style>
:host {
  display: inline-flex;
  flex-wrap: wrap;
  width: var(--control-size);
  height: var(--control-size);
  animation: spin 1s linear infinite;
}
@keyframes spin {
  100% {
    transform: rotate(360deg);
    transform-origin: 50% 50%;
  }
}
:host .item {
  width: 50%;
  height: 50%;
  box-sizing: border-box;
  border-color: var(--busy-color);
  border-style: solid;
  border-width: 0;
}

:host([white]) {
  --busy-color: white;
}

:host(:not([white])) {
  --busy-color: var(--default-color);
}</style>`;let u=class extends c{constructor(){super();s(this,"root");d.call(this,et,rt)}static get observedAttributes(){return["aria-setsize"]}attributeChangedCallback(){this.ariaSetSize!==null&&(this.style.height=this.ariaSetSize,this.style.width=this.ariaSetSize)}};nt(u,"name","x-busy");u=tt([h],u);var X=Object.defineProperty,ot=Object.getOwnPropertyDescriptor,at=(e,t,n)=>t in e?X(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,it=(e,t,n,o)=>{for(var r=o>1?void 0:o?ot(t,n):t,a=e.length-1,i;a>=0;a--)(i=e[a])&&(r=(o?i(t,n,r):i(r))||r);return o&&r&&X(t,n,r),r},st=(e,t,n)=>(at(e,typeof t!="symbol"?t+"":t,n),n);const lt=`<slot id="loading" name="loading">
    <x-busy white />
  </slot>
  <slot id="content"></slot>`,ct=`<style>
:host {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  user-select: none;
  cursor: pointer;
  color: white;
  border-color: var(--btn-border-color);
  border-radius: var(--btn-border-radius);
  border-style: var(--btn-border-style);
  border-width: var(--control-line);
  box-shadow: var(--btn-shadow);
  background-color: var(--btn-bg);
  font-size: var(--control-size);
  font-weight: var(--control-weight);
  padding: var(--btn-padding-block) var(--btn-padding-inline);
  opacity: var(--btn-opacity);
}

#loading {
  display: none;
  height: var(--control-size);
  flex-shrink: 0;
  margin-right: var(--btn-loading-gap);
  transform: translateY(-30%);
}

:host([aria-busy]) #loading {
  display: block;
}

:host([round]) {
  --btn-border-radius: var(--control-radius);
}

:host([primary]) {
  --btn-bg: var(--primary-color);
  --btn-hover-bg: var(--primary-hover-color);
  --btn-active-bg: var(--primary-active-color);
}

:host([warning]) {
  --btn-bg: var(--warning-color);
  --btn-hover-bg: var(--warning-hover-color);
  --btn-active-bg: var(--warning-active-color);
}

:host([danger]) {
  --btn-bg: var(--danger-color);
  --btn-hover-bg: var(--danger-hover-color);
  --btn-active-bg: var(--danger-active-color);
}

:host([success]) {
  --btn-bg: var(--success-color);
  --btn-hover-bg: var(--success-hover-color);
  --btn-active-bg: var(--success-active-color);
}

:host(:not([primary]):not([success]):not([danger]):not([warning])) {
  --btn-bg: var(--default-color);
  --btn-hover-bg: var(--default-hover);
  --btn-active-bg: var(--default-active);
}

:host(:not([aria-disabled]):hover) {
  --btn-bg: var(--btn-hover-bg) !important;
}

:host(:not([aria-disabled]):active) {
  --btn-bg: var(--btn-active-bg) !important;
}

:host([aria-disabled]) {
  --btn-opacity: var(--disable-bg-opacity);
  cursor: not-allowed;
}</style>`;let p=class extends c{constructor(){super();s(this,"root");d.call(this,lt,ct)}static get observedAttributes(){return[]}attributeChangedCallback(){this.attributeList=new Set(this.getAttributeNames()),(this.ariaDisabled!==null||this.ariaBusy!==null)&&(this.onclick=null)}};st(p,"name","x-button");p=it([h],p);var M=Object.defineProperty,dt=Object.getOwnPropertyDescriptor,ht=(e,t,n)=>t in e?M(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,ut=(e,t,n,o)=>{for(var r=o>1?void 0:o?dt(t,n):t,a=e.length-1,i;a>=0;a--)(i=e[a])&&(r=(o?i(t,n,r):i(r))||r);return o&&r&&M(t,n,r),r},pt=(e,t,n)=>(ht(e,typeof t!="symbol"?t+"":t,n),n);const vt=`<slot id="loading" name="loading">
    <x-busy />
  </slot>
  <slot id="content"></slot>`,bt=`<style>
:host {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  user-select: none;
  cursor: pointer;
  color: var(--btn-color);
  border-color: var(--btn-color);
  border-radius: var(--btn-border-radius);
  border-style: var(--btn-border-style);
  border-width: var(--control-line);
  box-shadow: var(--btn-shadow);
  background-color: var(--btn-bg-color);
  font-size: var(--control-size);
  font-weight: var(--control-weight);
  padding: var(--btn-padding-block) var(--btn-padding-inline);
  opacity: var(--btn-opacity);
}

#loading {
  display: none;
  height: var(--control-size);
  flex-shrink: 0;
  margin-right: var(--btn-loading-gap);
  transform: translateY(calc(-0.4 * var(--control-size)));
}

:host([aria-busy]) #loading {
  display: block;
}

:host([round]) {
  --btn-border-radius: var(--control-radius);
}

:host([primary]) {
  --btn-color: var(--primary-color);
  --btn-hover-color: var(--primary-hover-color);
  --btn-active-color: var(--primary-active-color);
}

:host([warning]) {
  --btn-color: var(--warning-color);
  --btn-hover-color: var(--warning-hover-color);
  --btn-active-color: var(--warning-active-color);
}

:host([danger]) {
  --btn-color: var(--danger-color);
  --btn-hover-color: var(--danger-hover-color);
  --btn-active-color: var(--danger-active-color);
}

:host([success]) {
  --btn-color: var(--success-color);
  --btn-hover-color: var(--success-hover-color);
  --btn-active-color: var(--success-active-color);
}

:host(:not([primary]):not([success]):not([danger]):not([warning])) {
  --btn-color: var(--default-color);
  --btn-hover-color: var(--default-hover);
  --btn-active-color: var(--default-active);
}

:host(:not([aria-disabled]):hover) {
  --btn-color: var(--btn-hover-color) !important;
}

:host(:not([aria-disabled]):active) {
  --btn-color: var(--btn-active-color) !important;
}

:host([aria-disabled]) {
  --btn-opacity: var(--disable-bg-opacity);
  cursor: not-allowed;
}</style>`;let v=class extends c{constructor(){super();s(this,"root");d.call(this,vt,bt)}static get observedAttributes(){return[]}attributeChangedCallback(){this.attributeList=new Set(this.getAttributeNames()),(this.ariaDisabled!==null||this.ariaBusy!==null)&&(this.onclick=null)}};pt(v,"name","x-button-plain");v=ut([h],v);var S=Object.defineProperty,gt=Object.getOwnPropertyDescriptor,ft=(e,t,n)=>t in e?S(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,_t=(e,t,n,o)=>{for(var r=o>1?void 0:o?gt(t,n):t,a=e.length-1,i;a>=0;a--)(i=e[a])&&(r=(o?i(t,n,r):i(r))||r);return o&&r&&S(t,n,r),r},mt=(e,t,n)=>(ft(e,typeof t!="symbol"?t+"":t,n),n);const xt=`<dialog class="x-dialog">
    <slot class="header" name="header">
      <div class="header-text"></div>
      <svg
        class="header-close"
        fill-rule="evenodd"
        viewBox="64 64 896 896"
        focusable="false"
        data-icon="close"
        width="1em"
        height="1em"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          d="M799.86 166.31c.02 0 .04.02.08.06l57.69 57.7c.04.03.05.05.06.08a.12.12 0 010 .06c0 .03-.02.05-.06.09L569.93 512l287.7 287.7c.04.04.05.06.06.09a.12.12 0 010 .07c0 .02-.02.04-.06.08l-57.7 57.69c-.03.04-.05.05-.07.06a.12.12 0 01-.07 0c-.03 0-.05-.02-.09-.06L512 569.93l-287.7 287.7c-.04.04-.06.05-.09.06a.12.12 0 01-.07 0c-.02 0-.04-.02-.08-.06l-57.69-57.7c-.04-.03-.05-.05-.06-.07a.12.12 0 010-.07c0-.03.02-.05.06-.09L454.07 512l-287.7-287.7c-.04-.04-.05-.06-.06-.09a.12.12 0 010-.07c0-.02.02-.04.06-.08l57.7-57.69c.03-.04.05-.05.07-.06a.12.12 0 01.07 0c.03 0 .05.02.09.06L512 454.07l287.7-287.7c.04-.04.06-.05.09-.06a.12.12 0 01.07 0z"
        ></path>
      </svg>
    </slot>
    <slot class="content"></slot>
    <slot class="footer" name="footer">
      <x-button success class="footer-cancel">取消</x-button>
      <x-button primary round class="footer-ok">确认</x-button>
    </slot>
  </dialog>`,wt=`<style>
.x-dialog::backdrop {
  background: var(--dialog-backdrop-background);
  opacity: var(--dialog-backdrop-opacity);
}

.x-dialog {
  padding: var(--dialog-padding);
  border-width: var(--control-line);
  border-style: var(--dialog-border-style);
  border-color: var(--dialog-border-color);
  border-radius: var(--control-radius);
  background-color: var(--dialog-background);
  width: var(--dialog-width);
}
.x-dialog .header {
  display: flex;
  width: 100%;
  align-items: center;
}
.x-dialog .header-text {
  flex-grow: 1;
  font-size: var(--dialog-title-size);
  font-weight: var(--dialog-title-weight);
  color: var(--dialog-title-color);
}
.x-dialog .header-close {
  flex-shrink: 0;
  cursor: pointer;
  color: var(--dialog-title-color);
  width: var(--dialog-title-size);
  height: var(--dialog-title-size);
}
.x-dialog .content {
  padding-top: var(--dialog-content-gap);
  padding-bottom: var(--dialog-content-gap);
  display: block;
}
.x-dialog .footer {
  width: 100%;
  display: block;
  text-align: right;
}
.x-dialog:-internal-dialog-in-top-layer {
  inset-block-start: calc(-100% + var(--dialog-margin-top));
  transform: translateY(50%);
}

:host([center]) .x-dialog:-internal-dialog-in-top-layer {
  inset-block-start: 0;
  transform: none;
}

:host([filter]) .x-dialog::backdrop {
  backdrop-filter: var(--dialog-filter);
  background: unset;
  opacity: unset;
}</style>`;let b=class extends c{constructor(){super();s(this,"root");s(this,"headerElement");s(this,"headerClose");s(this,"footerOk");s(this,"footerCancel");d.call(this,xt,wt)}static get observedAttributes(){return["aria-haspopup","header","width"]}connectedCallback(){this.root&&(addEventListener("keyup",t=>{t.code==="Escape"&&(this.ariaHasPopup=null)}),this.headerElement=this.root.querySelector(".header-text")??void 0,this.headerClose=this.root.querySelector(".header-close")??void 0,this.footerOk=this.root.querySelector(".footer-ok")??void 0,this.footerCancel=this.root.querySelector(".footer-cancel")??void 0,this.headerClose&&(this.headerClose.onclick=()=>this.ariaHasPopup=null),this.footerOk&&(this.footerOk.onclick=()=>l.call(this,"ok")),this.footerCancel&&(this.footerCancel.onclick=()=>l.call(this,"cancel")))}attributeChangedCallback(t){this.root&&(this.headerElement&&(this.headerElement.innerHTML=this.getAttribute("header")||""),this.root.style.width=this.getAttribute("width")||"",t==="aria-haspopup"&&(this.ariaHasPopup!==null?(this.root.showModal(),l.call(this,"open")):(this.root.close(),l.call(this,"close"))))}};mt(b,"name","x-dialog");b=_t([h],b);var V=Object.defineProperty,Ct=Object.getOwnPropertyDescriptor,Ot=(e,t,n)=>t in e?V(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,yt=(e,t,n,o)=>{for(var r=o>1?void 0:o?Ct(t,n):t,a=e.length-1,i;a>=0;a--)(i=e[a])&&(r=(o?i(t,n,r):i(r))||r);return o&&r&&V(t,n,r),r},Tt=(e,t,n)=>(Ot(e,typeof t!="symbol"?t+"":t,n),n);const Et=`<dialog>
    <slot id="header" name="header">
      <div id="text"></div>
      <svg
        id="close"
        fill-rule="evenodd"
        viewBox="64 64 896 896"
        focusable="false"
        data-icon="close"
        width="1em"
        height="1em"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          d="M799.86 166.31c.02 0 .04.02.08.06l57.69 57.7c.04.03.05.05.06.08a.12.12 0 010 .06c0 .03-.02.05-.06.09L569.93 512l287.7 287.7c.04.04.05.06.06.09a.12.12 0 010 .07c0 .02-.02.04-.06.08l-57.7 57.69c-.03.04-.05.05-.07.06a.12.12 0 01-.07 0c-.03 0-.05-.02-.09-.06L512 569.93l-287.7 287.7c-.04.04-.06.05-.09.06a.12.12 0 01-.07 0c-.02 0-.04-.02-.08-.06l-57.69-57.7c-.04-.03-.05-.05-.06-.07a.12.12 0 010-.07c0-.03.02-.05.06-.09L454.07 512l-287.7-287.7c-.04-.04-.05-.06-.06-.09a.12.12 0 010-.07c0-.02.02-.04.06-.08l57.7-57.69c.03-.04.05-.05.07-.06a.12.12 0 01.07 0c.03 0 .05.02.09.06L512 454.07l287.7-287.7c.04-.04.06-.05.09-.06a.12.12 0 01.07 0z"
        ></path>
      </svg>
    </slot>
    <slot id="content"></slot>
    <slot id="footer" name="footer">
      <x-button success id="cancel">取消</x-button>
      <x-button primary round id="ok">确认</x-button>
    </slot>
  </dialog>`,Pt=`<style>
:host(:not([aria-haspopup])) dialog {
  display: none;
}

dialog::backdrop {
  background: var(--drawer-backdrop-background);
  opacity: var(--drawer-backdrop-opacity);
}

dialog {
  padding: var(--drawer-padding);
  border-width: 0;
  border-style: none;
  background-color: var(--drawer-background);
  width: var(--drawer-width);
  margin-left: 0;
  margin-top: 0;
  margin-bottom: 0;
  height: 100%;
  display: grid;
  grid-template-rows: auto 1fr auto;
  transition: all 1s linear;
}

#header {
  display: flex;
  width: 100%;
  align-items: center;
}

#text {
  flex-grow: 1;
  font-size: var(--drawer-title-size);
  font-weight: var(--drawer-title-weight);
  color: var(--drawer-title-color);
}

#close {
  flex-shrink: 0;
  cursor: pointer;
  color: var(--drawer-title-color);
  width: var(--drawer-title-size);
  height: var(--drawer-title-size);
}

#content {
  padding-top: var(--drawer-content-gap);
  padding-bottom: var(--drawer-content-gap);
  display: block;
}

#footer {
  width: 100%;
  display: block;
  text-align: right;
}

:host([filter]) .x-drawer::backdrop {
  backdrop-filter: var(--drawer-filter);
  background: unset;
  opacity: unset;
}</style>`;let g=class extends c{constructor(){super();s(this,"root");s(this,"headerElement");s(this,"headerClose");s(this,"footerOk");s(this,"footerCancel");d.call(this,Et,Pt)}static get observedAttributes(){return["aria-haspopup","header","width"]}connectedCallback(){this.root&&(addEventListener("keyup",t=>{t.code==="Escape"&&(this.ariaHasPopup=null)}),this.headerElement=this.root.querySelector("#text")??void 0,this.headerClose=this.root.querySelector("#close")??void 0,this.footerOk=this.root.querySelector("#ok")??void 0,this.footerCancel=this.root.querySelector("#calcel")??void 0,this.headerClose&&(this.headerClose.onclick=()=>this.ariaHasPopup=null),this.footerOk&&(this.footerOk.onclick=()=>l.call(this,"ok")),this.footerCancel&&(this.footerCancel.onclick=()=>l.call(this,"cancel")))}attributeChangedCallback(){queueMicrotask(()=>{this.headerElement&&(this.headerElement.innerHTML=this.getAttribute("header")||"")}),this.root&&(this.root.style.width=this.getAttribute("width")||"",this.ariaHasPopup!==null?(this.root.showModal(),l.call(this,"open")):(this.root.close(),l.call(this,"close")))}};Tt(g,"name","x-drawer");g=yt([h],g);var k=Object.defineProperty,$t=Object.getOwnPropertyDescriptor,Lt=(e,t,n)=>t in e?k(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,Nt=(e,t,n,o)=>{for(var r=o>1?void 0:o?$t(t,n):t,a=e.length-1,i;a>=0;a--)(i=e[a])&&(r=(o?i(t,n,r):i(r))||r);return o&&r&&k(t,n,r),r},Dt=(e,t,n)=>(Lt(e,typeof t!="symbol"?t+"":t,n),n);const Xt=`<input class="x-checkbox" type="checkbox" />
  <slot class="x-checkbox-content"></slot>`,Mt=`<style>
:host {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: var(--checkbox-padding-block) var(--checkbox-padding-inline);
  cursor: pointer;
  user-select: none;
  font-weight: var(--control-weight);
}

.x-checkbox {
  margin: 0;
  width: var(--control-size);
  height: var(--control-size);
  flex-shrink: 0;
  cursor: unset;
}

.x-checkbox-content {
  display: inline-block;
  margin-left: var(--checkbox-gap);
  font-size: var(--control-size);
  flex-shrink: 0;
  color: var(--checkbox-color);
}

:host(:not([aria-disabled])) .x-checkbox-content:hover {
  color: var(--checkbox-hover-color);
}
:host(:not([aria-disabled])) .x-checkbox-content:active {
  color: var(--checkbox-active-color);
}

:host([primary]) {
  --checkbox-color: var(--primary-color);
  --checkbox-hover-color: var(--primary-hover-color);
  --checkbox-active-color: var(--primary-active-color);
}

:host([warning]) {
  --checkbox-color: var(--warning-color);
  --checkbox-hover-color: var(--warning-hover-color);
  --checkbox-active-color: var(--warning-active-color);
}

:host([danger]) {
  --checkbox-color: var(--danger-color);
  --checkbox-hover-color: var(--danger-hover-color);
  --checkbox-active-color: var(--danger-active-color);
}

:host([success]) {
  --checkbox-color: var(--success-color);
  --checkbox-hover-color: var(--success-hover-color);
  --checkbox-active-color: var(--success-active-color);
}

:host([aria-disabled]) {
  cursor: not-allowed;
}
:host([aria-disabled]) .x-checkbox-content {
  opacity: var(--disable-bg-opacity);
}</style>`;let f=class extends c{constructor(){super();s(this,"root");d.call(this,Xt,Mt)}static get observedAttributes(){return["aria-checked","aria-disabled","aria-valuetext"]}connectedCallback(){l.call(this,"XCheckboxInit",this,!0),this.onclick=()=>{!this.root||this.ariaDisabled!==null||(this.ariaChecked!==null&&this.ariaChecked!=="mixed"?this.ariaChecked=null:this.ariaChecked="",l.call(this,"XCheckboxChange",this,!0),l.call(this,"change",this.ariaChecked))}}attributeChangedCallback(){this.root&&(this.root.checked=this.ariaChecked!==null,this.root.disabled=this.ariaDisabled!==null,this.root.indeterminate=this.ariaChecked==="mixed")}};Dt(f,"name","x-checkbox");f=Nt([h],f);var z=Object.defineProperty,St=Object.getOwnPropertyDescriptor,Vt=(e,t,n)=>t in e?z(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,kt=(e,t,n,o)=>{for(var r=o>1?void 0:o?St(t,n):t,a=e.length-1,i;a>=0;a--)(i=e[a])&&(r=(o?i(t,n,r):i(r))||r);return o&&r&&z(t,n,r),r},zt=(e,t,n)=>(Vt(e,typeof t!="symbol"?t+"":t,n),n);const It='<slot class="x-checkbox-group"></slot>',Ft=`<style>
.x-checkbox-group {
  display: inline-flex;
}</style>`;let _=class extends c{constructor(){super();s(this,"root");s(this,"childSet");s(this,"value");d.call(this,It,Ft),this.childSet=new Set,this.value=[]}static get observedAttributes(){return["aria-valuetext"]}initListener(t){t.stopPropagation();const n=t.detail;if(!n.ariaValueText)return console.warn("在group模式中，x-checkbox的value属性是必须的");this.childSet.add(n),this.value.includes(n.ariaValueText)&&(n.ariaChecked="")}changeListener(t){t.stopPropagation();const n=t.detail;this.value.includes(n.ariaValueText)?this.value=this.value.filter(o=>o!==n.ariaValueText):this.value.push(n.ariaValueText),this.setAttribute("aria-valuetext",this.value.join(","))}connectedCallback(){this.addEventListener("XCheckboxInit",this.initListener),this.addEventListener("XCheckboxChange",this.changeListener)}disconnectedCallback(){this.removeEventListener("XCheckboxInit",this.initListener),this.removeEventListener("XCheckboxChange",this.changeListener)}attributeChangedCallback(){this.value=(this.ariaValueText||"").split(","),this.childSet.forEach(t=>{this.value.includes(t.ariaValueText||"")?t.ariaChecked="":t.ariaChecked=null}),l.call(this,"change",this.value.join(","))}};zt(_,"name","x-checkbox-group");_=kt([h],_);var I=Object.defineProperty,At=Object.getOwnPropertyDescriptor,Ht=(e,t,n)=>t in e?I(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,Yt=(e,t,n,o)=>{for(var r=o>1?void 0:o?At(t,n):t,a=e.length-1,i;a>=0;a--)(i=e[a])&&(r=(o?i(t,n,r):i(r))||r);return o&&r&&I(t,n,r),r},Bt=(e,t,n)=>(Ht(e,typeof t!="symbol"?t+"":t,n),n);const Rt=`<input class="x-radio" type="radio" />
  <slot class="x-radio-content"></slot>`,qt=`<style>
:host {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: var(--radio-padding-block) var(--radio-padding-inline);
  cursor: pointer;
  user-select: none;
  font-weight: var(--control-weight);
}

.x-radio {
  margin: 0;
  width: var(--control-size);
  height: var(--control-size);
  flex-shrink: 0;
  cursor: unset;
}

.x-radio-content {
  display: inline-block;
  margin-left: var(--radio-gap);
  font-size: var(--control-size);
  flex-shrink: 0;
  color: var(--radio-color);
}

:host(:not([aria-disabled])) .x-radio-content:hover {
  color: var(--radio-hover-color);
}
:host(:not([aria-disabled])) .x-radio-content:active {
  color: var(--radio-active-color);
}

:host([primary]) {
  --radio-color: var(--primary-color);
  --radio-hover-color: var(--primary-hover-color);
  --radio-active-color: var(--primary-active-color);
}

:host([warning]) {
  --radio-color: var(--warning-color);
  --radio-hover-color: var(--warning-hover-color);
  --radio-active-color: var(--warning-active-color);
}

:host([danger]) {
  --radio-color: var(--danger-color);
  --radio-hover-color: var(--danger-hover-color);
  --radio-active-color: var(--danger-active-color);
}

:host([success]) {
  --radio-color: var(--success-color);
  --radio-hover-color: var(--success-hover-color);
  --radio-active-color: var(--success-active-color);
}

:host([aria-disabled]) {
  cursor: not-allowed;
}
:host([aria-disabled]) .x-radio-content {
  opacity: var(--disable-bg-opacity);
}</style>`;let m=class extends c{constructor(){super();s(this,"root");d.call(this,Rt,qt)}static get observedAttributes(){return["aria-checked","aria-disabled","aria-valuetext"]}connectedCallback(){l.call(this,"XRadioInit",this,!0),this.onclick=()=>{this.ariaDisabled!==null||this.ariaChecked!==null||(this.ariaChecked="",l.call(this,"XRadioChange",this,!0),l.call(this,"change",this.ariaValueText))}}attributeChangedCallback(){this.root&&(this.root.checked=this.ariaChecked!==null,this.root.disabled=this.ariaDisabled!==null)}};Bt(m,"name","x-radio");m=Yt([h],m);var F=Object.defineProperty,jt=Object.getOwnPropertyDescriptor,Gt=(e,t,n)=>t in e?F(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,Kt=(e,t,n,o)=>{for(var r=o>1?void 0:o?jt(t,n):t,a=e.length-1,i;a>=0;a--)(i=e[a])&&(r=(o?i(t,n,r):i(r))||r);return o&&r&&F(t,n,r),r},Jt=(e,t,n)=>(Gt(e,typeof t!="symbol"?t+"":t,n),n);const Qt='<slot class="x-radio-group"></slot>',Ut=`<style>
.x-radio-group {
  display: inline-flex;
  align-items: center;
}</style>`;let x=class extends c{constructor(){super();s(this,"childSet");d.call(this,Qt,Ut),this.childSet=new Set}static get observedAttributes(){return["aria-valuetext"]}initListener(t){t.stopPropagation();const n=t.detail;if(!n.ariaValueText)return console.warn("在group模式中，x-radio的 ariaValueText 属性是必须的");if(this.childSet.has(n))return console.warn("在group模式中，x-radio的 ariaValueText 属性有重复");this.childSet.add(n),n.ariaValueText===this.ariaValueText&&(n.ariaChecked="")}changeListener(t){this.ariaValueText=t.detail.ariaValueText,l.call(this,"change",this.ariaValueText)}connectedCallback(){this.addEventListener("XRadioInit",this.initListener),this.addEventListener("XRadioChange",this.changeListener)}disconnectedCallback(){this.removeEventListener("XRadioInit",this.initListener),this.removeEventListener("XRadioChange",this.changeListener)}attributeChangedCallback(){this.childSet.forEach(t=>{t.ariaChecked=this.ariaValueText===t.ariaValueText?"":null})}};Jt(x,"name","x-radio-group");x=Kt([h],x);var A=Object.defineProperty,Wt=Object.getOwnPropertyDescriptor,Zt=(e,t,n)=>t in e?A(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,tn=(e,t,n,o)=>{for(var r=o>1?void 0:o?Wt(t,n):t,a=e.length-1,i;a>=0;a--)(i=e[a])&&(r=(o?i(t,n,r):i(r))||r);return o&&r&&A(t,n,r),r},nn=(e,t,n)=>(Zt(e,typeof t!="symbol"?t+"":t,n),n);const en="<slot></slot>",rn=`<style>
:host {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  user-select: none;
  padding: var(--radio-button-padding-block) var(--radio-button-padding-inline);
  border-width: var(--control-line);
  border-color: var(--radio-button-border-color);
  border-style: solid;
  margin-right: calc(-1 * var(--control-line));
  width: var(--radio-button-width);
  height: var(--radio-button-height);
  font-size: var(--control-size);
  font-weight: var(--control-weight);
  flex-shrink: 0;
}

:host(:last-child) {
  border-top-right-radius: var(--control-radius);
  border-bottom-right-radius: var(--control-radius);
}

:host(:first-child) {
  border-top-left-radius: var(--control-radius);
  border-bottom-left-radius: var(--control-radius);
}

:host([aria-checked]) {
  position: relative;
  border-color: var(--radio-button-color);
  box-shadow: none;
  z-index: 10;
}

:host(:not([plain])[aria-checked]) {
  background-color: var(--radio-button-color);
  color: white !important;
}

:host([plain][aria-checked]) {
  background-color: white;
  color: var(--radio-button-color);
}

:host([aria-disabled]) {
  cursor: not-allowed;
  opacity: var(--disable-bg-opacity);
}</style>`;let w=class extends c{static get observedAttributes(){return[]}constructor(){super(),d.call(this,en,rn)}connectedCallback(){l.call(this,"XRadioInit",this,!0),this.onclick=()=>{this.ariaDisabled!==null||this.ariaChecked!==null||(this.ariaChecked="",l.call(this,"XRadioChange",this,!0),l.call(this,"change",this.ariaValueText))}}};nn(w,"name","x-radio-button");w=tn([h],w);var H=Object.defineProperty,on=Object.getOwnPropertyDescriptor,an=(e,t,n)=>t in e?H(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,sn=(e,t,n,o)=>{for(var r=o>1?void 0:o?on(t,n):t,a=e.length-1,i;a>=0;a--)(i=e[a])&&(r=(o?i(t,n,r):i(r))||r);return o&&r&&H(t,n,r),r},ln=(e,t,n)=>(an(e,typeof t!="symbol"?t+"":t,n),n);const cn=`<slot name="title" id="title"></slot>
  <slot></slot>`,dn=`<style>
:host {
  display: block;
  border-width: var(--control-line);
  border-color: var(--tabs-border-color);
  border-style: var(--tabs-border-style);
  padding: var(--tabs-padding);
  border-radius: var(--control-radius);
  height: fit-content;
}

#title {
  display: block;
  padding-bottom: var(--tabs-title-padding);
  margin-bottom: var(--tabs-title-margin);
  border-bottom: var(--tabs-br);
}</style>`;let C=class extends c{constructor(){super();s(this,"childSet");s(this,"titleSet");d.call(this,cn,dn),this.titleSet=new Set,this.childSet=new Set}static get observedAttributes(){return["aria-valuetext"]}commonInit(t,n){t.stopPropagation();const o=t.detail;(n==="title"?this.titleSet:this.childSet).add(o),o.ariaValueText===this.ariaValueText&&(o.ariaCurrent="")}initItem(t){this.commonInit(t,"item")}initTitle(t){this.commonInit(t,"title")}handleTitleChange(t){t.stopPropagation(),this.ariaValueText=t.detail}connectedCallback(){this.addEventListener("XTabsItemInit",this.initItem),this.addEventListener("XTabsTitleInit",this.initTitle),this.addEventListener("XTabsChange",this.handleTitleChange)}disconnectedCallback(){this.removeEventListener("XTabsItemInit",this.initItem),this.removeEventListener("XTabsTitleInit",this.initTitle),this.removeEventListener("XTabsChange",this.handleTitleChange)}attributeChangedCallback(){this.childSet.forEach(t=>{t.ariaCurrent=t.ariaValueText===this.ariaValueText?"":null}),this.titleSet.forEach(t=>{t.ariaCurrent=t.ariaValueText===this.ariaValueText?"":null}),l.call(this,"change",this.ariaValueText)}};ln(C,"name","x-tabs");C=sn([h],C);var Y=Object.defineProperty,hn=Object.getOwnPropertyDescriptor,un=(e,t,n)=>t in e?Y(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,pn=(e,t,n,o)=>{for(var r=o>1?void 0:o?hn(t,n):t,a=e.length-1,i;a>=0;a--)(i=e[a])&&(r=(o?i(t,n,r):i(r))||r);return o&&r&&Y(t,n,r),r},vn=(e,t,n)=>(un(e,typeof t!="symbol"?t+"":t,n),n);const bn="<slot></slot>",gn=`<style>
:host(:not([aria-current])) {
  display: none;
}</style>`;let O=class extends c{static get observedAttributes(){return[]}constructor(){super(),d.call(this,bn,gn)}connectedCallback(){this.ariaValueText===null&&console.warn("x-tabs-item必须传入 ariaValueText"),l.call(this,"XTabsItemInit",this,!0)}};vn(O,"name","x-tabs-item");O=pn([h],O);var B=Object.defineProperty,fn=Object.getOwnPropertyDescriptor,_n=(e,t,n)=>t in e?B(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,mn=(e,t,n,o)=>{for(var r=o>1?void 0:o?fn(t,n):t,a=e.length-1,i;a>=0;a--)(i=e[a])&&(r=(o?i(t,n,r):i(r))||r);return o&&r&&B(t,n,r),r},xn=(e,t,n)=>(_n(e,typeof t!="symbol"?t+"":t,n),n);const wn="<slot></slot>",Cn=`<style>
:host {
  display: inline-block;
  cursor: pointer;
  padding-bottom: var(--tabs-title-block);
  padding-left: var(--tabs-title-inline);
  padding-right: var(--tabs-title-inline);
  font-size: var(--tab-title-size);
}

:host([aria-current]) {
  border-bottom: var(--tabs-title-active);
}</style>`;let y=class extends c{static get observedAttributes(){return[]}constructor(){super(),d.call(this,wn,Cn)}connectedCallback(){this.ariaValueText===null&&console.warn("x-tabs-title必须传入 ariaValueText"),l.call(this,"XTabsTitleInit",this,!0),this.onclick=()=>l.call(this,"XTabsChange",this.ariaValueText,!0)}};xn(y,"name","x-tabs-title");y=mn([h],y);var R=Object.defineProperty,On=Object.getOwnPropertyDescriptor,yn=(e,t,n)=>t in e?R(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,Tn=(e,t,n,o)=>{for(var r=o>1?void 0:o?On(t,n):t,a=e.length-1,i;a>=0;a--)(i=e[a])&&(r=(o?i(t,n,r):i(r))||r);return o&&r&&R(t,n,r),r},En=(e,t,n)=>(yn(e,typeof t!="symbol"?t+"":t,n),n);const Pn=`<div id="point">
    <x-busy id="loading" />
  </div>`,$n=`<style>
:host {
  position: relative;
  display: inline-block;
  background-color: var(--switch-default-bg);
  padding: var(--control-line) 0;
  border-radius: calc(var(--control-size));
  width: calc(var(--control-size) * 2.5);
  height: var(--control-size);
  cursor: pointer;
  user-select: none;
}

#point {
  width: var(--control-size);
  height: var(--control-size);
  background-color: var(--switch-btn);
  border-radius: 100%;
  position: absolute;
  transition: left 0.1s linear;
  display: flex;
  align-items: center;
}

#loading {
  height: var(--control-size);
  visibility: hidden;
}

:host([aria-busy]) #loading {
  visibility: visible;
}

:host([aria-checked]) {
  background-color: var(--radio-color);
}
:host([aria-checked]) #point {
  left: calc(var(--control-size) * 1.5 - var(--control-line));
}

:host(:not([aria-checked])) #point {
  left: var(--control-line);
}

:host([primary]) {
  --radio-color: var(--primary-color);
}

:host([warning]) {
  --radio-color: var(--warning-color);
}

:host([danger]) {
  --radio-color: var(--danger-color);
}

:host([success]) {
  --radio-color: var(--success-color);
}

:host([aria-disabled]) {
  cursor: not-allowed;
  opacity: var(--disable-bg-opacity);
}</style>`;let T=class extends c{static get observedAttributes(){return[]}constructor(){super(),d.call(this,Pn,$n)}connectedCallback(){this.onclick=()=>{this.ariaDisabled!==null||this.ariaBusy!==null||(this.ariaChecked=this.ariaChecked===null?"":null,l.call(this,"change",this.ariaChecked))}}attributeChangedCallback(){}};En(T,"name","x-switch");T=Tn([h],T);var q=Object.defineProperty,Ln=Object.getOwnPropertyDescriptor,Nn=(e,t,n)=>t in e?q(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,Dn=(e,t,n,o)=>{for(var r=o>1?void 0:o?Ln(t,n):t,a=e.length-1,i;a>=0;a--)(i=e[a])&&(r=(o?i(t,n,r):i(r))||r);return o&&r&&q(t,n,r),r},Xn=(e,t,n)=>(Nn(e,typeof t!="symbol"?t+"":t,n),n);const Mn=`<slot></slot>
  <div class="x-popup-border">
    <div class="x-popup-content">
      <div class="x-popup-arrow">
      </div>
      <slot name="content"></slot>
    </div>
  </div>`,Sn=`<style>
:host {
  position: relative;
  display: inline-block;
}

.x-popup-content {
  padding: var(--popup-padding-block) var(--popup-padding-inline);
  background-color: white;
  display: block;
  box-shadow: 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05);
  position: relative;
  border-radius: var(--control-radius);
  font-size: var(--control-size);
  font-weight: var(--control-weight);
}

.x-popup-border {
  transition-property: all;
  transition-duration: 0s;
  transition-delay: 0.1s;
  display: none;
  position: absolute;
  z-index: 20;
  padding: var(--popup-offset);
}

:host(:hover) .x-popup-border {
  display: block;
}

.x-popup-border:hover {
  display: block;
}

:host([aria-checked]) .x-popup-border {
  display: block;
}

.x-popup-arrow {
  width: var(--popup-arrow-size);
  height: var(--popup-arrow-size);
  background-color: white;
  position: absolute;
}

:host([dark]) .x-popup-content {
  background-color: black;
  color: white;
}
:host([dark]) .x-popup-arrow {
  background-color: black;
}

:host(:not([position])) .x-popup-border {
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
}
:host(:not([position])) .x-popup-arrow {
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 50%) rotate(45deg);
}

:host([position=bottom]) .x-popup-border {
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
}
:host([position=bottom]) .x-popup-arrow {
  top: 0;
  left: 50%;
  transform: translate(-50%, -50%) rotate(45deg);
}

:host([position=left]) .x-popup-border {
  top: 50%;
  right: 100%;
  transform: translateY(-50%);
}
:host([position=left]) .x-popup-arrow {
  right: 0;
  top: 50%;
  transform: translate(50%, -50%) rotate(45deg);
}

:host([position=right]) .x-popup-border {
  top: 50%;
  left: 100%;
  transform: translateY(-50%);
}
:host([position=right]) .x-popup-arrow {
  left: 0;
  top: 50%;
  transform: translate(-50%, -50%) rotate(45deg);
}

:host([position=lt]) .x-popup-border {
  top: calc(-1 * var(--popup-offset));
  right: 100%;
}
:host([position=lt]) .x-popup-arrow {
  right: 0;
  top: 0;
  transform: translate(50%, 100%) rotate(45deg);
}

:host([position=lb]) .x-popup-border {
  bottom: calc(-1 * var(--popup-offset));
  right: 100%;
}
:host([position=lb]) .x-popup-arrow {
  right: 0;
  bottom: 0;
  transform: translate(50%, -100%) rotate(45deg);
}

:host([position=rt]) .x-popup-border {
  top: calc(-1 * var(--popup-offset));
  left: 100%;
}
:host([position=rt]) .x-popup-arrow {
  top: 0;
  left: 0;
  transform: translate(-50%, 100%) rotate(45deg);
}

:host([position=rb]) .x-popup-border {
  bottom: calc(-1 * var(--popup-offset));
  left: 100%;
}
:host([position=rb]) .x-popup-arrow {
  bottom: 0;
  left: 0;
  transform: translate(-50%, -100%) rotate(45deg);
}

:host([position=tl]) .x-popup-border {
  bottom: 100%;
  left: calc(-1 * var(--popup-offset));
}
:host([position=tl]) .x-popup-arrow {
  bottom: 0;
  left: 0;
  transform: translate(100%, 50%) rotate(45deg);
}

:host([position=tr]) .x-popup-border {
  bottom: 100%;
  right: calc(-1 * var(--popup-offset));
}
:host([position=tr]) .x-popup-arrow {
  bottom: 0;
  right: 0;
  transform: translate(-100%, 50%) rotate(45deg);
}

:host([position=bl]) .x-popup-border {
  top: 100%;
  left: calc(-1 * var(--popup-offset));
}
:host([position=bl]) .x-popup-arrow {
  top: 0;
  left: 0;
  transform: translate(100%, -50%) rotate(45deg);
}

:host([position=br]) .x-popup-border {
  top: 100%;
  right: calc(-1 * var(--popup-offset));
}
:host([position=br]) .x-popup-arrow {
  top: 0;
  right: 0;
  transform: translate(-100%, -50%) rotate(45deg);
}

:host([no-arrow]) .x-popup-arrow {
  display: none;
}</style>`;let E=class extends c{static get observedAttributes(){return[]}constructor(){super(),d.call(this,Mn,Sn)}};Xn(E,"name","x-popup");E=Dn([h],E);var j=Object.defineProperty,Vn=Object.getOwnPropertyDescriptor,kn=(e,t,n)=>t in e?j(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,zn=(e,t,n,o)=>{for(var r=o>1?void 0:o?Vn(t,n):t,a=e.length-1,i;a>=0;a--)(i=e[a])&&(r=(o?i(t,n,r):i(r))||r);return o&&r&&j(t,n,r),r},In=(e,t,n)=>(kn(e,typeof t!="symbol"?t+"":t,n),n);const Fn="<slot></slot>",An=`<style>
:host {
  display: block;
  background-color: var(--menu-bg);
  padding: var(--menu-content-block) var(--menu-content-inline);
  height: fit-content;
}</style>`;let P=class extends c{constructor(){super();s(this,"childSet");d.call(this,Fn,An),this.childSet=new Set}static get observedAttributes(){return["aria-valuetext"]}initListener(t){t.stopPropagation();const n=t.detail;if(!n.ariaValueText)return console.warn("x-menu-item 的 ariaValueText 属性是必须的");this.childSet.add(n),n.ariaValueText===this.ariaValueText&&(n.ariaChecked="")}changeListener(t){t.stopPropagation(),this.ariaValueText=t.detail.ariaValueText}connectedCallback(){this.addEventListener("XMenuItemInit",this.initListener),this.addEventListener("XMenuItemChange",this.changeListener)}disconnectedCallback(){this.removeEventListener("XMenuItemInit",this.initListener),this.removeEventListener("XMenuItemChange",this.changeListener)}attributeChangedCallback(){this.childSet.forEach(t=>{t.ariaValueText===this.ariaValueText?t.ariaChecked="":t.ariaChecked=null})}};In(P,"name","x-menu");P=zn([h],P);var G=Object.defineProperty,Hn=Object.getOwnPropertyDescriptor,Yn=(e,t,n)=>t in e?G(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,Bn=(e,t,n,o)=>{for(var r=o>1?void 0:o?Hn(t,n):t,a=e.length-1,i;a>=0;a--)(i=e[a])&&(r=(o?i(t,n,r):i(r))||r);return o&&r&&G(t,n,r),r},Rn=(e,t,n)=>(Yn(e,typeof t!="symbol"?t+"":t,n),n);const qn=`<div class="x-menu-main">
    <div id="label">
      <slot name="prefix">
        <span>😊</span>
      </slot>
      <slot name="text">
        <span id="text"></span>
      </slot>
      <slot name="suffix">
        <span>😆</span>
      </slot>
    </div>
    <slot name="expand" id="arrow">
      <span>></span>
    </slot>
  </div>
  <div id="children">
    <ol>
      <slot></slot>
    </ol>
  </div>`,jn=`<style>
:host {
  display: block;
}

.x-menu-main {
  cursor: pointer;
  display: flex;
  font-size: var(--control-size);
  align-items: center;
  justify-content: space-between;
  padding: var(--menu-padding-block) var(--menu-padding-inline);
  transition: background-color 0.2s linear;
  border-radius: var(--control-radius);
  height: var(--control-size);
}
.x-menu-main #label {
  flex-grow: 1;
}
.x-menu-main:hover {
  background-color: var(--menu-hover-color);
}

:host([aria-checked]) .x-menu-main {
  background-color: var(--menu-active-color);
}

:host([aria-disabled]) .x-menu-main {
  cursor: not-allowed;
  opacity: var(--disable-bg-opacity);
}

#children {
  display: grid;
  grid-template-rows: 0fr;
  overflow: hidden;
  transition: all 0.2s linear;
}
#children > ol {
  min-height: 0;
  margin: 0;
  padding-left: 0;
}

#arrow {
  display: inline-block;
  flex-grow: 0;
  flex-shrink: 0;
  transition: all 0.2s linear;
  font-size: var(--control-size);
}

:host(:not([aria-expanded])) #arrow {
  display: none;
}

:host([aria-haspopup]) #children {
  grid-template-rows: 1fr;
}
:host([aria-haspopup]) #arrow {
  transform: rotate(90deg);
}</style>`;let $=class extends c{constructor(){super();s(this,"textElement");s(this,"root");d.call(this,qn,jn)}static get observedAttributes(){return["aria-label","aria-expanded"]}connectedCallback(){var t;this.textElement=((t=this.shadowRoot)==null?void 0:t.querySelector("#text"))??void 0,l.call(this,"XMenuItemInit",this,!0),this.root&&(this.root.onclick=()=>{this.ariaDisabled===null&&(this.ariaExpanded!==null?this.ariaHasPopup=this.ariaHasPopup===null?"":null:l.call(this,"XMenuItemChange",this,!0))}),this.addEventListener("XMenuItemInit",this.inherentListener)}disconnectedCallback(){this.removeEventListener("XMenuItemInit",this.inherentListener)}inherentListener(t){t.detail.ariaLevel=+t.detail.ariaLevel+1,this.ariaExpanded=""}attributeChangedCallback(){queueMicrotask(()=>{this.root&&(this.root.style.paddingLeft=`calc(var(--menu-padding-inline) + ${this.ariaLevel||0} * var(--menu-gap))`),this.textElement&&(this.textElement.innerHTML=this.ariaLabel||"")})}};Rn($,"name","x-menu-item");$=Bn([h],$);var K=Object.defineProperty,Gn=Object.getOwnPropertyDescriptor,Kn=(e,t,n)=>t in e?K(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,Jn=(e,t,n,o)=>{for(var r=o>1?void 0:o?Gn(t,n):t,a=e.length-1,i;a>=0;a--)(i=e[a])&&(r=(o?i(t,n,r):i(r))||r);return o&&r&&K(t,n,r),r},Qn=(e,t,n)=>(Kn(e,typeof t!="symbol"?t+"":t,n),n);const Un=`<div id="content">
    <slot></slot>
  </div>
  <div id="prev">
    <slot name="prev-icon">
      <div id="prev-icon"></div>
    </slot>
  </div>
  <div id="next">
    <slot name="next-icon">
      <div id="next-icon"></div>
    </slot>
  </div>
  <div id="dots"></div>`,Wn=`<style>
:host {
  display: inline-flex;
  border-radius: var(--control-radius);
  position: relative;
  height: fit-content;
}

#content {
  display: flex;
  height: 100%;
  width: 100%;
}

#prev,
#next {
  position: absolute;
  background-color: var(--carousel-btn-color);
  border-radius: var(--carousel-btn-radius);
  width: var(--carousel-btn-size);
  height: var(--carousel-btn-size);
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
}

#prev-icon,
#next-icon {
  width: var(--carousel-arrow-size);
  height: var(--carousel-arrow-size);
  border-style: solid;
  border-color: var(--carousel-arrow-color);
  border-top-width: var(--carousel-arrow-width);
  border-right-width: var(--carousel-arrow-width);
  border-left-width: 0;
  border-bottom-width: 0;
}

#dots {
  position: absolute;
  display: flex;
  gap: var(--carousel-dot-gap);
  width: var(--carousel-dots-length);
  justify-content: space-between;
}

.dot {
  padding: var(--carousel-dot-block) var(--carousel-dot-inline);
  cursor: pointer;
  flex-grow: 1;
}
.dot > div {
  background-color: var(--carousel-dot-color);
  height: var(--carousel-dot-length);
  border-radius: var(--control-radius);
}
.dot > div:hover {
  background-color: var(--carousel-dot-active);
}

.dot[aria-current] > div {
  background-color: gainsboro;
}

:host(:not([vertical])) #content {
  overflow-x: hidden;
}
:host(:not([vertical])) #prev,
:host(:not([vertical])) #next {
  top: var(--carousel-btn-position);
  transform: translateY(-50%);
}
:host(:not([vertical])) #prev {
  left: var(--carousel-btn-margin);
}
:host(:not([vertical])) #next {
  right: var(--carousel-btn-margin);
}
:host(:not([vertical])) #prev-icon {
  transform: rotate(-135deg);
}
:host(:not([vertical])) #next-icon {
  transform: rotate(45deg);
}
:host(:not([vertical])) #dots {
  bottom: var(--carousel-dot-offset);
  left: 50%;
  transform: translateX(-50%);
}

:host([vertical]) #content {
  overflow-y: hidden;
  flex-direction: column;
}
:host([vertical]) #dots {
  left: var(--carousel-dot-offset);
  top: 50%;
  transform: translateY(-50%);
  flex-direction: column;
  height: var(--carousel-dots-length);
}
:host([vertical]) #prev,
:host([vertical]) #next {
  left: var(--carousel-btn-position);
  transform: translateX(-50%);
}
:host([vertical]) #prev {
  top: var(--carousel-btn-margin);
}
:host([vertical]) #next {
  bottom: var(--carousel-btn-margin);
}
:host([vertical]) #prev-icon {
  transform: rotate(-45deg);
}
:host([vertical]) #next-icon {
  transform: rotate(135deg);
}
:host([vertical]) .dot {
  padding: var(--carousel-dot-inline) var(--carousel-dot-block);
}
:host([vertical]) .dot > div {
  width: var(--carousel-dot-length);
  height: 100%;
}

:host([hide-arrow]) #prev,
:host([hide-arrow]) #next {
  display: none;
}

:host([hide-control]) #dots {
  display: none;
}</style>`;let L=class extends c{constructor(){super();s(this,"itemList");s(this,"curIndex");s(this,"timeout");s(this,"dots");d.call(this,Un,Wn),this.itemList=[],this.curIndex=0,this.timeout=0}static get observedAttributes(){return["aria-valuetext"]}initListener(t){var r;t.stopPropagation();const n=t.detail;if(this.itemList.some(a=>a.ariaValueText===n.ariaValueText))return console.warn("x-carousel-item 的 ariaValueText 属性有重复");this.itemList.push(n);const o=document.createElement("div");o.className="dot",o.innerHTML="<div></div>",o.ariaValueText=n.ariaValueText,n.ariaValueText===this.ariaValueText&&(n.ariaCurrent="",o.ariaCurrent="",n.scrollIntoView()),o.onclick=()=>{clearTimeout(this.timeout),this.ariaValueText=n.ariaValueText},(r=this.dots)==null||r.appendChild(o)}switchIndex(t){clearTimeout(this.timeout);let n=t==="next"?this.curIndex+1:this.curIndex-1;this.itemList.length===n&&(n=0),n<0&&(n=this.itemList.length-1),this.ariaValueText=this.itemList[n].ariaValueText}connectedCallback(){var o,r,a;this.dots=(o=this.shadowRoot)==null?void 0:o.querySelector("#dots"),this.addEventListener("XCarouselItemInit",this.initListener);const t=(r=this.shadowRoot)==null?void 0:r.querySelector("#prev"),n=(a=this.shadowRoot)==null?void 0:a.querySelector("#next");t.onclick=()=>this.switchIndex("prev"),n.onclick=()=>this.switchIndex("next"),this.onmouseover=()=>{this.ariaValueNow!==null&&clearTimeout(this.timeout)},this.onmouseleave=()=>{this.ariaValueNow!==null&&this.attributeChangedCallback()}}disconnectedCallback(){this.removeEventListener("XCarouselItemInit",this.initListener),this.onmouseover=null,this.onmouseleave=null}attributeChangedCallback(){var t;this.ariaValueText&&((t=this.dots)==null||t.childNodes.forEach(n=>{n.ariaCurrent=n.ariaValueText===this.ariaValueText?"":null})),this.itemList.forEach((n,o)=>{n.ariaValueText===this.ariaValueText?(n.ariaCurrent="",n.scrollIntoView({behavior:"smooth"}),this.curIndex=o):n.ariaCurrent=null}),this.ariaValueNow!==null&&(clearTimeout(this.timeout),this.timeout=setTimeout(()=>{this.switchIndex("next")},+this.ariaValueNow))}};Qn(L,"name","x-carousel");L=Jn([h],L);var J=Object.defineProperty,Zn=Object.getOwnPropertyDescriptor,te=(e,t,n)=>t in e?J(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,ne=(e,t,n,o)=>{for(var r=o>1?void 0:o?Zn(t,n):t,a=e.length-1,i;a>=0;a--)(i=e[a])&&(r=(o?i(t,n,r):i(r))||r);return o&&r&&J(t,n,r),r},ee=(e,t,n)=>(te(e,typeof t!="symbol"?t+"":t,n),n);const re='<slot><img id="image" alt="" /></slot>',oe=`<style>
:host {
  width: 100%;
  height: 100%;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex-shrink: 0;
}

#image {
  max-width: var(--carousel-item-size);
  max-height: var(--carousel-item-size);
}</style>`;let N=class extends c{constructor(){super();s(this,"root");d.call(this,re,oe)}static get observedAttributes(){return["aria-placeholder"]}connectedCallback(){this.ariaValueText===null&&console.warn("x-carousel-item必须传入 ariaValueText"),l.call(this,"XCarouselItemInit",this,!0)}attributeChangedCallback(){var t;if(this.ariaPlaceholder){const n=(t=this.root)==null?void 0:t.querySelector("#image");n&&(n.src=this.ariaPlaceholder)}}};ee(N,"name","x-carousel-item");N=ne([h],N);u.register();p.register();v.register();b.register();_.register();f.register();x.register();m.register();w.register();C.register();O.register();y.register();T.register();E.register();P.register();$.register();g.register();L.register();N.register();
