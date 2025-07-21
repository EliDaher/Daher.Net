import{c as d,j as e,e as a}from"./index-BHksyjCu.js";import{C as l,a as m,b as o,c as f}from"./card-3_EnEgBy.js";/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const j=d("CreditCard",[["rect",{width:"20",height:"14",x:"2",y:"5",rx:"2",key:"ynyp8z"}],["line",{x1:"2",x2:"22",y1:"10",y2:"10",key:"1b3vmo"}]]);function C({title:i,value:r,description:t,icon:c,trend:s,className:x,onClick:n}){return e.jsxs(l,{onClick:n,className:a("stat-card",x),children:[e.jsxs(m,{className:"flex flex-row items-center justify-between space-y-0 pb-2",children:[e.jsx(o,{className:"text-sm font-medium",children:i}),e.jsx(c,{className:"h-5 w-5 text-muted-foreground"})]}),e.jsxs(f,{children:[e.jsx("div",{className:"text-2xl font-bold",children:r}),(t||s)&&e.jsxs("div",{className:"flex items-center space-x-2 text-xs text-muted-foreground",children:[s&&e.jsxs("span",{className:a("inline-flex items-center font-medium",s.isPositive?"text-accent-600":"text-destructive"),children:[s.isPositive?"+":"",s.value]}),t&&e.jsx("span",{children:t})]})]})]})}export{j as C,C as S};
