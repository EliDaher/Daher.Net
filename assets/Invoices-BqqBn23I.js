import{s as oe,r,j as e,ab as te,ad as ne,ae as le,u as ce,d as ie,J as se,D as de}from"./index-DnH8tWLc.js";import{l as me}from"./index-Cc5YwMDD.js";import{b as ue,c as he}from"./balance-D9QX3RNX.js";import{P as pe}from"./plus-D0POHz-4.js";import{T as be}from"./trash-2-Zbehdtzr.js";import{P as xe}from"./printer-Dyv-8Z8c.js";import{A as ge}from"./AddBalanceForm-Dwrp6naL.js";/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ye=oe("Save",[["path",{d:"M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",key:"1c8476"}],["path",{d:"M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7",key:"1ydtos"}],["path",{d:"M7 3v4a1 1 0 0 0 1 1h7",key:"t51u73"}]]);function fe({loading:d,internetMatchingRows:a,internetOriginalRows:W,finalTable:q,setFinalTable:H,searchText:_,work:Z,setWork:L,internetTotal:j,setInternetTotal:U}){const[V,x]=r.useState([]),[C,B]=r.useState([]),[M,A]=r.useState(null),T=Date.now(),E=new Date(T),[v,G]=r.useState(["1/26","2/26","3/26","4/26","5/26","6/26","7/26","8/26","9/26","10/26","11/26","12/26","1/27","2/27","3/27","4/27","5/27","6/27","7/27"]);r.useEffect(()=>{a.length>0?(x(a),B(W),L(!1)):(x([]),B([]),L(!1))},[a]);const S=(m,p,D)=>{te.post("https://server-uvnz.onrender.com/update",{row:m,col:p,value:D}).then(R=>{}).catch(R=>{console.error("Error updating data:",R)})};return d?e.jsx("div",{className:"flex items-center justify-center",children:e.jsx("div",{})}):M?e.jsx("div",{className:"m-6 w-full text-red-500",children:M}):e.jsxs("div",{className:"shadow-md shadow-foreground/30 p-4 m-3 border rounded-xl bg-background",dir:"rtl",children:[e.jsxs("div",{className:"flex justify-between items-center",children:[e.jsx("h2",{className:"text-center font-bold text-gray-900 text-xl my-4",children:"فواتير الإنترنت"}),e.jsx("div",{children:e.jsxs("p",{className:"font-bold text-text-950 p-2 rounded-lg shadow shadow-primary-400",children:["انترنت ",j]})})]}),e.jsx("div",{className:"w-full overflow-auto max-h-96 rounded-lg border border-gray-300",children:V.length>0?e.jsxs("table",{className:"w-full text-sm border-collapse",children:[e.jsx("thead",{className:"bg-gray-800 text-white text-center",children:e.jsxs("tr",{className:"max-h-2 leading-none border-xl border-primary-800",children:[e.jsx("th",{className:"border border-gray-600 px-1 py-2",children:"#"}),e.jsx("th",{className:"border border-gray-600 px-4 py-2 bg-gray-800 sticky right-[0px]",children:"رقم الهاتف"}),e.jsx("th",{className:"border border-gray-600 px-4 py-2 bg-gray-800 sticky right-[120px]",children:"اسم المشترك"}),e.jsx("th",{className:"border border-gray-600 px-1 py-2 bg-gray-800 sticky right-[240px]",children:"الشركة"}),e.jsx("th",{className:"border border-gray-600 px-1 py-2",children:"السرعة"}),e.jsx("th",{className:"border border-gray-600 px-1 py-2",children:"تاريخ التسديد"}),e.jsx("th",{className:"border border-gray-600 px-4 py-2 bg-gray-800 sticky right-[288px]",children:"الفاتورة الشهرية"}),e.jsx("th",{className:"border border-gray-600 px-4 py-2 bg-gray-800 sticky right-[400px]",children:"ملاحظات"}),v.map((m,p)=>e.jsxs(e.Fragment,{children:[e.jsx("th",{className:"border border-gray-600 px-4 py-2",children:m}),e.jsx("th",{className:"border border-gray-600 px-4 py-2",children:m}),e.jsx("th",{className:"border border-gray-600 px-4 py-2"})]}))]})}),e.jsx("tbody",{children:V.map((m,p)=>{const D=Object.values(m);return e.jsx("tr",{className:`even:bg-gray-100 transition-all\r
                                        duration-200 [&>*:nth-child(3n+11)>*>*]:w-7 \r
                                        [&>*:nth-child(8)]:bg-yellow-300 \r
                                        [&>*:nth-child(7)]:bg-green-400 \r
                                        hover:bg-primary-100 [&>*:nth-child(8)>*>*]:w-52 \r
                                        [&>*:nth-child(6)>*>*]:w-12 [&>*:nth-child(5)>*>*]:w-12 \r
                                        [&>*:nth-child(4)>*>*]:w-12 [&>*:nth-child(1)>*>*]:w-12\r
                                        [&>*:nth-child(-n+4)]:sticky\r
                                        [&>*:nth-child(7)]:sticky\r
                                        [&>*:nth-child(8)]:sticky\r
                                        [&>*:nth-child(2)]:right-[0px]\r
                                        [&>*:nth-child(3)]:right-[120px]\r
                                        [&>*:nth-child(4)]:right-[248px]\r
                                        [&>*:nth-child(7)]:right-[297px]\r
                                        [&>*:nth-child(8)]:right-[410px]\r
                                        [&>*:nth-child(-n+4)]:bg-background\r
                                        `,"data-key":p,children:Array.from({length:50},(P,n)=>e.jsx("td",{className:"border border-gray-300",children:e.jsxs("div",{className:"flex",children:[e.jsx("input",{type:"text",value:D[n]||"",onChange:F=>{const o=[...V];o[p]={...o[p],[Object.keys(m)[n]||`field_${n}`]:F.target.value},x(o)},className:"p-1 w-32 bg-transparent outline-none text-center"}),e.jsx("button",{onClick:F=>{var X,Q;const o=E.toLocaleDateString("en-US"),c=[...V];if(c[p][n]==o){const l=Object.keys(m)[n]||`field_${n}`,z=Object.keys(m)[n-1]||`field_${n-1}`;c[p]={...c[p],[z]:"",[l]:""},x(c),isNaN(D[n-1])||U(Number(j)-Number(D[n-1]));const y=(X=F.target.closest("tr"))==null?void 0:X.getAttribute("data-key");if(y!=null){const w=C[y];var b=n,i="";S(w,b,i),b=n-1,i="",S(w,b,i)}const g={customerName:m[2],customerNumber:m[1],customerDetails:m[3],invoiceNumber:v[n/3-3],invoiceValue:m[6]};H(w=>w.filter(f=>!(f.customerName===g.customerName&&f.customerNumber===g.customerNumber&&f.customerDetails===g.customerDetails&&f.invoiceNumber===g.invoiceNumber&&f.invoiceValue===g.invoiceValue)))}else{const l=Object.keys(m)[n]||`field_${n}`,z=Object.keys(m)[n-1]||`field_${n-1}`,y=m[6];c[p]={...c[p],[z]:y,[l]:o},x(c),isNaN(D[n-1])||U(Number(j)+Number(y));const g=(Q=F.target.closest("tr"))==null?void 0:Q.getAttribute("data-key");if(g!=null){const f=C[g];var b=n,i=o;S(f,b,i),b=n-1,i=y,S(f,b,i)}const w={category:"internetTotal",customerName:m[2],customerNumber:m[1],customerDetails:m[3],invoiceNumber:v[n/3-3],invoiceValue:m[6]};H([...q,w])}},className:`hover:bg-accent-600 w-4 ${Number(n+1)%3===1&&n>7?"bg-accent-400":"hidden"} ${m[n-1]?"bg-red-400 hover:bg-red-600":""}`,children:"+"})]})},n))},p)})})]}):e.jsx("p",{className:"text-center text-gray-500 py-4",children:"لم يتم العثور على أي فواتير."})})]})}function Ne(d){const a=String(d||"").toLowerCase();return a.includes("ÙƒÙ‡Ø±Ø¨")||a.includes("كهرب")?"elecTotal":a.includes("Ù…ÙŠØ§")||a.includes("ميا")?"waterTotal":a.includes("Ø§Ø±Ø¶")||a.includes("ارضي")||a.includes("أرضي")?"phoneTotal":"otherTotal"}function je({loading:d,elecMatchingRows:a,elecOriginalRows:W,finalTable:q,setFinalTable:H,searchText:_,work:Z,setWork:L,elecTotal:j,phoneTotal:U,waterTotal:V,otherTotal:x,setElecTotal:C,setPhoneTotal:B,setWaterTotal:M,setOtherTotal:A}){const[T,E]=r.useState([]),[v,G]=r.useState([]),[S,m]=r.useState(null),p=Date.now(),D=new Date(p),[R,P]=r.useState(["1","1","1","1","1","1","1","1","1","1","1","1","1"]),n=(o,c,b)=>{te.post("https://server-uvnz.onrender.com/updateElec",{row:o,col:c,value:b}).then(i=>{}).catch(i=>{console.error("Error updating data:",i)})};r.useEffect(()=>{a.length>0?(E(a),G(W),L(!1)):(E([]),G([]),L(!1))},[a]);const F=(o,c)=>{const b=Number(c);if(Number.isFinite(b)){if(o==="phoneTotal"){B(i=>Number(i)+b);return}if(o==="waterTotal"){M(i=>Number(i)+b);return}if(o==="otherTotal"){A(i=>Number(i)+b);return}C(i=>Number(i)+b)}};return d?e.jsx("div",{className:"flex items-center justify-center",children:e.jsx("div",{})}):S?e.jsx("div",{className:"m-6 w-full text-red-500",children:S}):e.jsxs("div",{className:"shadow-md shadow-foreground/30 p-4 m-3 border rounded-xl bg-background",dir:"rtl",children:[e.jsxs("div",{className:"flex justify-between items-center",children:[e.jsx("h2",{className:"text-right font-bold text-text-950 text-xl my-4 mr-2",children:"فواتير الخدمات الحكومية"}),e.jsxs("div",{className:"flex gap-5 items-right",children:[e.jsxs("p",{className:"font-bold text-text-950 p-2 rounded-lg shadow shadow-gray-400",children:["أخرى ",x]}),e.jsxs("p",{className:"font-bold text-text-950 p-2 rounded-lg shadow shadow-orange-400",children:["ارضي ",U]}),e.jsxs("p",{className:"font-bold text-text-950 p-2 rounded-lg shadow shadow-yellow-400",children:["كهرباء ",j]}),e.jsxs("p",{className:"font-bold text-text-950 p-2 rounded-lg shadow shadow-blue-400",children:["مياه ",V]})]})]}),e.jsx("div",{className:"w-full overflow-auto max-h-96 rounded-lg border border-gray-300",children:T.length>0?e.jsxs("table",{className:"w-full text-sm border-collapse",children:[e.jsx("thead",{className:"bg-gray-800 text-white text-center",children:e.jsxs("tr",{className:"max-h-4 leading-none border-xl border-primary-800",children:[e.jsx("th",{className:"border border-gray-600 px-1 sticky right-[0px] z-20 top-0 bg-gray-800",children:"#"}),e.jsx("th",{className:"border border-gray-600 px-2 sticky right-[47px] z-20 top-0 bg-gray-800",children:"نوع الفاتورة"}),e.jsx("th",{className:"border border-gray-600 px-2 sticky right-[165px] z-20 top-0 bg-gray-800"}),e.jsx("th",{className:"border border-gray-600 px-2 sticky right-[292px] z-20 top-0 bg-gray-800",children:"الرقم"}),R.map(o=>e.jsxs(e.Fragment,{children:[e.jsx("th",{className:"border border-gray-600 bg-primary-800"}),e.jsx("th",{className:"border border-gray-600 px-2 py-2 ",children:"الدورة"}),e.jsx("th",{className:"border border-gray-600 px-2 py-2 ",children:"قيمة الفاتورة"}),e.jsx("th",{className:"border border-gray-600 px-2 py-2 ",children:"المبلغ المقبوض"}),e.jsx("th",{className:"border border-gray-600 px-2 py-2 ",children:"تاريخ الدفع"}),e.jsx("th",{className:"border border-gray-600 px-2 py-2 ",children:"ملاحظات"})]}))]})}),e.jsx("tbody",{children:T.map((o,c)=>{const b=Object.values(o),i=Ne(b[1]);return e.jsx("tr",{className:`transition-all duration-200 
                                        ${i==="phoneTotal"?"bg-orange-200/80":""}
                                        ${i==="elecTotal"?"bg-yellow-200/80":""}
                                        ${i==="waterTotal"?"bg-blue-200/80":""}
                                        ${i==="otherTotal"?"bg-gray-200/80":""}
                                        [&>*:nth-child(6n-1)>*:nth-child(1)>*]:w-1 [&>*:nth-child(1)>*>*]:w-12
                                        [&>*:nth-child(6n-1)>*>*]:w-20 [&>*:nth-child(6n-1)]:bg-primary-700 
                                        hover:bg-primary-100 [&>*:nth-child(6n)>*:nth-child(1)>*]:w-14
                                        [&>*:nth-child(-n+4)]:sticky [&>*:nth-child(-n+4)]:z-10
                                        [&>*:nth-child(-n+4)]:bg-background
                                        [&>*:nth-child(-n+4)]:font-bold

                                        [&>*:nth-child(1)]:right-0
                                        [&>*:nth-child(2)]:right-[47px]
                                        [&>*:nth-child(3)]:right-[165px]
                                        [&>*:nth-child(4)]:right-[292px]`,"data-key":c,children:Array.from({length:70},(Q,l)=>e.jsx("td",{className:"border border-gray-300",children:e.jsxs("div",{className:"flex",children:[e.jsx("input",{type:"text",value:b[l]||"",onChange:z=>{const y=[...T];if(y[c]){const g=Object.keys(o)[l]||`field_${l}`;y[c]={...y[c],[g]:z.target.value},E(y)}},className:"p-1 w-32 bg-transparent outline-none text-center"}),e.jsx("button",{onClick:z=>{var t,s;const y=D.toLocaleDateString("en-US"),g=[...T];if(g[c][l]==y){const u=Object.keys(o)[l]||`field_${l}`,h=Object.keys(o)[l-1]||`field_${l-1}`;g[c]={...g[c],[h]:"",[u]:""},E(g),F(i,-Number(b[l-1]));const O=(t=z.target.closest("tr"))==null?void 0:t.getAttribute("data-key");if(O!=null){const k=v[O];var w=l,f="";n(k,w,f),w=l-1,f="",n(k,w,f)}const N={customerName:o[2],customerNumber:o[3],customerDetails:o[1],invoiceNumber:o[l-3],invoiceValue:o[l-2]};H(k=>k.filter(K=>!(K.customerName===N.customerName&&K.customerNumber===N.customerNumber&&K.customerDetails===N.customerDetails&&K.invoiceNumber===N.invoiceNumber&&K.invoiceValue===N.invoiceValue)))}else{const u=Object.keys(o)[l]||`field_${l}`,h=Object.keys(o)[l-1]||`field_${l-1}`,O=o[l-2];g[c]={...g[c],[h]:O,[u]:y},E(g),F(i,O);const N=(s=z.target.closest("tr"))==null?void 0:s.getAttribute("data-key");if(N!=null){const K=v[N];var w=l,f=y;n(K,w,f),w=l-1,f=O,n(K,w,f)}const k={category:i,customerName:o[2],customerNumber:o[3],customerDetails:o[1],invoiceNumber:o[l-3],invoiceValue:o[l-2]};H([...q,k])}},className:`hover:bg-accent-600 w-4 ${l%6===2&&l>4?"bg-accent-500":"hidden"} ${o[l-1]?"bg-red-400 hover:bg-red-600":""}`,children:"+"})]})},l))},c)})})]}):e.jsx("p",{className:"text-center text-gray-500 py-4",children:"لم يتم العثور على أي فواتير."})})]})}function we({finalTable:d}){return e.jsx(e.Fragment,{children:d.length>0?e.jsx("div",{className:"mt-5 text-center",dir:"rtl",children:e.jsxs("table",{className:"w-full text-text-900 shadow shadow-primary-900",children:[e.jsx("thead",{className:"border border-primary-400",children:e.jsxs("tr",{className:"border border-primary-400",children:[e.jsx("th",{className:"w-10 px-2",children:"نوع الفاتورة"}),e.jsx("th",{className:"w-10 px-2",children:"الاسم"}),e.jsx("th",{className:"w-10 px-2",children:"الرقم"}),e.jsx("th",{className:"w-10 px-2",children:"الدورة"}),e.jsx("th",{className:"w-10 px-2",children:"المبلغ"})]})}),e.jsx("tbody",{className:"",children:d.map(a=>e.jsxs("tr",{children:[e.jsx("td",{className:"w-10 py-1 px-2 border-primary-500",children:a.customerDetails}),e.jsx("td",{className:"w-10 py-1 px-2 border-primary-500",children:a.customerName}),e.jsx("td",{className:"w-10 py-1 px-2 border-primary-500",children:a.customerNumber}),e.jsx("td",{className:"w-10 py-1 px-2 border-primary-500",children:a.invoiceNumber}),e.jsx("td",{className:"w-10 py-1 px-2 border-primary-500",children:a.invoiceValue})]}))})]})}):e.jsx(e.Fragment,{})})}const ve=[{label:"حسم 500",category:"internetTotal",value:-500,details:"Discount"},{label:"بخشيش 500",category:"phoneTotal",value:500,details:"زيادة"},{label:"باقة 5",category:"phoneTotal",value:3e3,details:"باقة 5"},{label:"باقة 10",category:"phoneTotal",value:5e3,details:"باقة 10"},{label:"باقة 20",category:"phoneTotal",value:7500,details:"باقة 20"},{label:"باقة 30",category:"phoneTotal",value:1e4,details:"باقة 30"},{label:"باقة 50",category:"phoneTotal",value:14e3,details:"باقة 50"},{label:"باقة 75",category:"phoneTotal",value:17e3,details:"باقة 75"},{label:"باقة 100",category:"phoneTotal",value:23e3,details:"باقة 100"},{label:"باقة 200",category:"phoneTotal",value:42e3,details:"باقة 200"}],Y=[{value:"internetTotal",label:"إنترنت",color:"border-sky-200 bg-sky-50 text-sky-800"},{value:"elecTotal",label:"كهرباء",color:"border-amber-200 bg-amber-50 text-amber-800"},{value:"waterTotal",label:"مياه",color:"border-cyan-200 bg-cyan-50 text-cyan-800"},{value:"phoneTotal",label:"أرضي",color:"border-orange-200 bg-orange-50 text-orange-800"},{value:"otherTotal",label:"أخرى",color:"border-gray-200 bg-gray-50 text-gray-800"}],ae=ve,ee={category:"",value:"",details:""},ke={internetTotal:0,elecTotal:0,waterTotal:0,phoneTotal:0,otherTotal:0};function J(d){return Number(d||0).toLocaleString("en-EG",{minimumFractionDigits:0})}function Te(d){return Number(d.internetTotal||0)+Number(d.elecTotal||0)+Number(d.waterTotal||0)+Number(d.phoneTotal||0)+Number(d.otherTotal||0)}function Se(d){return Y.some(a=>a.value===d)}function De(d){if(Se(d.category))return d.category;const a=String(d.customerDetails||"").toLowerCase();return a.includes("ÙƒÙ‡Ø±Ø¨")||a.includes("كهرب")?"elecTotal":a.includes("Ù…ÙŠØ§")||a.includes("ميا")?"waterTotal":a.includes("Ø§Ø±Ø¶")||a.includes("ارضي")||a.includes("أرضي")?"phoneTotal":"otherTotal"}function Re(d){const a=De(d);return a?{...d,category:a}:d}function Ce({clearAllTables:d,finalTable:a,isOpen:W,onClose:q,onSubmit:H,categoryTotals:_}){const Z=r.useRef(null),L=r.useRef(null),j=r.useRef(!1),[U,V]=r.useState(null),[x,C]=r.useState(ee),[B,M]=r.useState(""),[A,T]=r.useState([]),[E,v]=r.useState(""),[G,S]=r.useState(""),m=JSON.parse(localStorage.getItem("DaherUser")||"{}"),p=r.useMemo(()=>A.reduce((t,s)=>({...t,[s.category]:Number(t[s.category]||0)+Number(s.invoiceValue||0)}),ke),[A]),D=r.useMemo(()=>({internetTotal:Number(_.internetTotal||0)+p.internetTotal,elecTotal:Number(_.elecTotal||0)+p.elecTotal,waterTotal:Number(_.waterTotal||0)+p.waterTotal,phoneTotal:Number(_.phoneTotal||0)+p.phoneTotal,otherTotal:Number(_.otherTotal||0)+p.otherTotal}),[_,p]),R=Te(D),P=r.useMemo(()=>[...a,...A].map(Re),[a,A]),n=r.useMemo(()=>{const t=new Map;return P.forEach((s,u)=>{const h=String(s.customerName||"-"),O=String(s.customerNumber||"-"),N=`${h}::${O}`,k=t.get(N);if(k){k.rows.push(s);return}t.set(N,{key:`${N}::${u}`,customerName:h,customerNumber:O,rows:[s]})}),Array.from(t.values())},[P]),F=Number(x.value),o=!!x.category&&!!x.details.trim()&&Number.isFinite(F)&&F!==0,c=U!==null,b=()=>{T([]),C(ee),M(""),v(""),S("")},i=()=>{c||(j.current=!1,b(),q())},X=async t=>{var s,u;V(t),S("");try{(await ue({amount:R,employee:m.username,details:P,categoryTotals:D})).success&&(b(),d(),H(),q())}catch(h){S(((u=(s=h==null?void 0:h.response)==null?void 0:s.data)==null?void 0:u.message)||(h==null?void 0:h.message)||"تعذر حفظ الفاتورة")}finally{V(null),j.current=!1}},Q=async t=>{t.preventDefault(),await X("save")},l=me.useReactToPrint({contentRef:L,pageStyle:`
  @page {
    size: 80mm auto;
    margin: 0;
  }

  * {
    box-sizing: border-box;
  }

  html, body {
    margin: 0 !important;
    padding: 0 !important;
    width: 80mm !important;
    max-width: 80mm !important;
    overflow: hidden !important;
    font-family: Arial, sans-serif;
    color: black !important;
    background: white !important;
  }

  @media print {
    body {
      width: 80mm !important;
      max-width: 80mm !important;
      margin: 0 !important;
      padding: 0 !important;
      font-size: 12px;
    }

    .receipt-print {
      position: static !important;
      left: auto !important;
      top: auto !important;
      direction: rtl;
      width: 74mm !important;
      max-width: 74mm !important;
      margin: 0 auto !important;
      padding: 3mm 0 4mm !important;
      color: black !important;
      background: white !important;
      font-family: Arial, sans-serif;
      line-height: 1.35;
      overflow: visible !important;
    }

    .receipt-header {
      text-align: center;
      font-size: 13px;
      font-weight: 900;
      margin: 0 0 8px 0;
    }

    .receipt-header span {
      display: block;
      margin-bottom: 2px;
    }

    .receipt-section {
      border-top: 1px dashed black;
      padding-top: 4px;
      margin-top: 5px;
    }

    .receipt-group {
      break-inside: avoid;
      border-bottom: 1px dashed black;
      padding: 4px 0;
    }

    .receipt-customer {
      display: flex;
      justify-content: space-between;
      gap: 5px;
      margin-bottom: 2px;
      font-size: 11px;
      font-weight: 900;
    }

    .receipt-customer span {
      min-width: 0;
      word-break: break-word;
      overflow-wrap: anywhere;
    }

    .receipt-customer-number {
      flex: 0 0 auto;
      text-align: left;
    }

    .receipt-row {
      display: grid;
      grid-template-columns: minmax(0, 1fr) 15mm 18mm;
      align-items: start;
      gap: 3px;
      padding: 1px 0;
      font-size: 10.5px;
      font-weight: 700;
    }

    .receipt-row span {
      min-width: 0;
      word-break: break-word;
      overflow-wrap: anywhere;
    }

    .receipt-cycle,
    .receipt-amount {
      text-align: left;
      white-space: nowrap;
    }

    .receipt-amount {
      font-weight: 900;
    }

    .receipt-total-line {
      display: flex;
      justify-content: space-between;
      gap: 8px;
      padding: 3px 0;
      font-size: 12px;
      font-weight: 900;
    }

    .receipt-grand-total {
      border-top: 2px solid black;
      margin-top: 8px;
      padding-top: 7px;
      font-weight: 900;
      font-size: 19px;
    }

    .no-print {
      display: none !important;
    }
  }
`,onAfterPrint:()=>{j.current}}),z=()=>{c||(j.current=!0,l())},y=()=>{const t=new Date,s={year:"numeric",month:"2-digit",day:"2-digit",weekday:"long",hour:"2-digit",minute:"2-digit",second:"2-digit"};return t.toLocaleDateString("en-GB",s)},g=()=>{const t=Number(x.value),s=x.details.trim(),u=Y.find(h=>h.value===x.category);if(!u||!s||!Number.isFinite(t)||t===0){v("اختر التصنيف وأدخل القيمة والتفاصيل");return}v(""),T(h=>[...h,{id:`${Date.now()}-${h.length}`,category:x.category,customerDetails:u.label,customerName:s,customerNumber:"يدوي",invoiceNumber:"-",invoiceValue:t}]),C(ee)},w=t=>{const s=t.target.value;M(s);const u=ae[Number(s)],h=Number(u==null?void 0:u.value),O=String((u==null?void 0:u.details)||"").trim(),N=Y.find(k=>k.value===(u==null?void 0:u.category));if(!u||!N||!O||!Number.isFinite(h)||h===0){v("اختر التصنيف وأدخل القيمة والتفاصيل"),M("");return}v(""),T(k=>[...k,{id:`${Date.now()}-${k.length}`,category:N.value,customerDetails:N.label,customerName:O,customerNumber:"يدوي",invoiceNumber:"-",invoiceValue:h}]),M("")},f=t=>{T(s=>s.filter(u=>u.id!==t))};return W?ne.createPortal(e.jsx("div",{className:"fixed inset-0 z-[100] flex bg-black/60 sm:items-center sm:justify-center sm:p-2",children:e.jsxs("div",{className:"flex h-[100svh] w-screen flex-col overflow-hidden bg-background shadow-2xl sm:h-[calc(100svh-1rem)] sm:w-[calc(100vw-1rem)] sm:rounded-lg sm:border lg:max-h-[calc(100svh-1rem)] lg:max-w-[1180px]",dir:"rtl",children:[e.jsxs("div",{className:"flex shrink-0 items-center justify-between gap-3 border-b bg-muted/30 px-4 py-3 sm:px-5",children:[e.jsxs("div",{className:"min-w-0",children:[e.jsx("h2",{className:"text-lg font-bold text-foreground sm:text-xl",children:"تأكيد الفواتير"}),e.jsx("p",{className:"hidden text-sm text-muted-foreground sm:block",children:"مراجعة الفاتورة وإضافة أي سطر يدوي قبل الحفظ"})]}),e.jsx("button",{"aria-label":"إغلاق",className:"inline-flex h-9 w-9 items-center justify-center rounded-md border bg-background text-muted-foreground hover:bg-muted disabled:opacity-50",disabled:c,onClick:i,type:"button",children:e.jsx(le,{className:"h-4 w-4"})})]}),e.jsxs("form",{className:"flex min-h-0 flex-1 flex-col overflow-hidden",onSubmit:Q,children:[e.jsx("div",{className:"min-h-0 flex-1 overflow-y-auto p-2 sm:p-3 lg:p-4",children:e.jsxs("div",{className:"grid min-w-0 gap-3 lg:grid-cols-[minmax(0,1fr)_360px]",children:[e.jsxs("div",{className:"order-2 min-w-0 bg-white lg:order-1",children:[e.jsxs("div",{ref:Z,className:"mx-auto max-w-full rounded-md border bg-white p-3 text-gray-950 shadow-sm print:border-0 print:shadow-none sm:p-4 lg:max-w-3xl",children:[e.jsxs("div",{className:"header text-center font-bold",children:[e.jsx("span",{className:"block text-lg",children:"Daher.Net"}),e.jsx("span",{className:"block text-sm",children:y()})]}),e.jsx("div",{className:"mt-4 max-w-full overflow-x-auto text-right",children:P.length>0?e.jsxs("table",{className:"w-full min-w-[560px] border-collapse text-sm",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"border bg-gray-100",children:[e.jsx("th",{className:"px-2 py-2",children:"نوع الفاتورة"}),e.jsx("th",{className:"px-2 py-2",children:"الاسم"}),e.jsx("th",{className:"px-2 py-2",children:"الرقم"}),e.jsx("th",{className:"px-2 py-2",children:"الدورة"}),e.jsx("th",{className:"px-2 py-2",children:"المبلغ"})]})}),e.jsx("tbody",{children:P.map((t,s)=>e.jsxs("tr",{className:"border-b",children:[e.jsx("td",{className:"px-2 py-2",children:t.customerDetails||"-"}),e.jsx("td",{className:"px-2 py-2",children:t.customerName||"-"}),e.jsx("td",{className:"px-2 py-2",children:t.customerNumber||"-"}),e.jsx("td",{className:"px-2 py-2",children:t.invoiceNumber||"-"}),e.jsx("td",{className:"px-2 py-2 font-bold",children:J(t.invoiceValue)})]},`${t.id||t.customerNumber||"row"}-${s}`))})]}):e.jsx("div",{className:"rounded-md border border-dashed p-6 text-center text-sm text-muted-foreground",children:"لا توجد فواتير محددة"})}),e.jsxs("div",{className:"totalValue mt-4 flex items-center justify-between border-t pt-3",children:[e.jsx("span",{children:"المجموع"}),e.jsx("span",{children:J(R)})]})]}),e.jsxs("div",{ref:L,className:"receipt-print fixed left-[-10000px] top-0 bg-white text-gray-950",dir:"rtl",children:[e.jsxs("div",{className:"receipt-header",children:[e.jsx("span",{children:"Daher.Net"}),e.jsx("span",{children:y()})]}),e.jsx("div",{className:"receipt-section",children:n.length>0?n.map(t=>e.jsxs("div",{className:"receipt-group",children:[e.jsxs("div",{className:"receipt-customer",children:[e.jsx("span",{children:t.customerName}),e.jsx("span",{className:"receipt-customer-number",children:t.customerNumber})]}),t.rows.map((s,u)=>e.jsxs("div",{className:"receipt-row",children:[e.jsx("span",{children:s.customerDetails||"-"}),e.jsx("span",{className:"receipt-cycle",children:s.invoiceNumber||"-"}),e.jsx("span",{className:"receipt-amount",children:J(s.invoiceValue)})]},`${s.id||s.invoiceNumber||"print-row"}-${u}`))]},t.key)):e.jsx("div",{className:"receipt-row text-center font-bold",children:"Ù„Ø§ ØªÙˆØ¬Ø¯ ÙÙˆØ§ØªÙŠØ± Ù…Ø­Ø¯Ø¯Ø©"})}),e.jsx("div",{className:"receipt-section",children:Y.map(t=>e.jsxs("div",{className:"receipt-total-line",children:[e.jsx("span",{children:t.label}),e.jsx("span",{children:J(D[t.value])})]},t.value))}),e.jsxs("div",{className:"receipt-total-line receipt-grand-total",children:[e.jsx("span",{children:"المجموع"}),e.jsx("span",{children:J(R)})]})]})]}),e.jsx("aside",{className:"no-print order-1 min-w-0 rounded-md border bg-muted/20 p-3 lg:order-2 lg:p-4",children:e.jsxs("div",{className:"space-y-4",children:[e.jsxs("section",{className:"rounded-md border bg-background p-3 sm:p-4",children:[e.jsx("p",{className:"text-sm font-semibold text-muted-foreground",children:"المجموع النهائي"}),e.jsx("p",{className:"mt-1 text-3xl font-extrabold text-primary",children:J(R)})]}),e.jsxs("section",{className:"space-y-3",children:[e.jsx("h3",{className:"text-sm font-bold",children:"الإجماليات حسب التصنيف"}),e.jsx("div",{className:"grid grid-cols-2 gap-2",children:Y.map(t=>e.jsxs("div",{className:`rounded-md border p-3 ${t.color}`,children:[e.jsx("p",{className:"text-xs font-semibold",children:t.label}),e.jsx("p",{className:"mt-1 text-lg font-extrabold",children:J(D[t.value])})]},t.value))})]}),e.jsxs("section",{className:"space-y-3 rounded-md border bg-background p-3 sm:p-4",children:[e.jsx("h3",{className:"text-sm font-bold",children:"إضافة سطر يدوي"}),e.jsxs("div",{className:"space-y-3",children:[e.jsxs("div",{className:"space-y-1",children:[e.jsx("label",{className:"text-xs font-medium text-muted-foreground",children:"اختصار جاهز"}),e.jsxs("select",{className:"h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm",value:B,onChange:w,children:[e.jsx("option",{value:"",children:"اختر اختصار للإضافة السريعة"}),ae.map((t,s)=>e.jsxs("option",{value:s,children:[t.label," - ",J(t.value)]},`${t.label}-${s}`))]})]}),e.jsxs("div",{className:"space-y-1",children:[e.jsx("label",{className:"text-xs font-medium text-muted-foreground",children:"التصنيف"}),e.jsxs("select",{className:"h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm",value:x.category,onChange:t=>C(s=>({...s,category:t.target.value})),children:[e.jsx("option",{value:"",children:"اختر التصنيف"}),Y.map(t=>e.jsx("option",{value:t.value,children:t.label},t.value))]})]}),e.jsxs("div",{className:"space-y-1",children:[e.jsx("label",{className:"text-xs font-medium text-muted-foreground",children:"القيمة"}),e.jsx("input",{className:"h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm",onChange:t=>C(s=>({...s,value:t.target.value})),placeholder:"0",type:"number",value:x.value})]}),e.jsxs("div",{className:"space-y-1",children:[e.jsx("label",{className:"text-xs font-medium text-muted-foreground",children:"التفاصيل"}),e.jsx("input",{className:"h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm",onChange:t=>C(s=>({...s,details:t.target.value})),placeholder:"مثال: فرق فاتورة",type:"text",value:x.details})]}),E&&e.jsx("p",{className:"text-sm text-destructive",children:E}),e.jsxs("button",{className:"inline-flex h-10 w-full items-center justify-center gap-2 rounded-md bg-primary px-4 text-sm font-bold text-primary-foreground hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50",disabled:!o,onClick:g,type:"button",children:[e.jsx(pe,{className:"h-4 w-4"}),"إضافة السطر"]})]})]}),A.length>0&&e.jsxs("section",{className:"space-y-3",children:[e.jsx("h3",{className:"text-sm font-bold",children:"الأسطر اليدوية"}),e.jsx("div",{className:"space-y-2",children:A.map(t=>e.jsxs("div",{className:"flex items-center gap-3 rounded-md border bg-background p-3",children:[e.jsxs("div",{className:"min-w-0 flex-1",children:[e.jsx("p",{className:"truncate text-sm font-bold",children:t.customerName}),e.jsxs("p",{className:"text-xs text-muted-foreground",children:[t.customerDetails," - ",J(t.invoiceValue)]})]}),e.jsx("button",{"aria-label":"حذف السطر",className:"inline-flex h-8 w-8 items-center justify-center rounded-md bg-destructive text-destructive-foreground hover:bg-destructive/90",onClick:()=>f(t.id),type:"button",children:e.jsx(be,{className:"h-4 w-4"})})]},t.id))})]}),G&&e.jsx("p",{className:"rounded-md border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive",children:G})]})})]})}),e.jsxs("div",{className:"no-print flex shrink-0 flex-wrap gap-2 border-t bg-background p-3 sm:p-4",children:[e.jsxs("button",{className:"inline-flex h-10 min-w-[8rem] flex-1 items-center justify-center gap-2 rounded-md bg-primary px-4 text-sm font-bold text-primary-foreground hover:bg-primary/90 disabled:opacity-60",disabled:c,type:"submit",children:[e.jsx(ye,{className:"h-4 w-4"}),U==="save"?"جاري الحفظ...":"Save"]}),e.jsxs("button",{className:"inline-flex h-10 min-w-[8rem] flex-1 items-center justify-center gap-2 rounded-md bg-accent px-4 text-sm font-bold text-accent-foreground hover:bg-accent/90 disabled:opacity-60",disabled:c,onClick:z,type:"button",children:[e.jsx(xe,{className:"h-4 w-4"}),U==="print"?"جاري الحفظ...":"Print"]}),e.jsx("button",{className:"inline-flex h-10 min-w-[6rem] flex-1 items-center justify-center rounded-md border px-4 text-sm font-bold hover:bg-muted disabled:opacity-60 sm:flex-none",disabled:c,onClick:i,type:"button",children:"Close"})]})]})]})}),document.body):null}function Ae(){const[d,a]=r.useState();r.useEffect(()=>{const $=JSON.parse(localStorage.getItem("DaherUser")||"null");a($)},[]);const[W,q]=r.useState(!1),[H,_]=r.useState(0),[Z,L]=r.useState(""),[j,U]=r.useState({PhNumber:""}),[V,x]=r.useState(!1),[C,B]=r.useState(0),[M,A]=r.useState(0),[T,E]=r.useState(0),[v,G]=r.useState(0),[S,m]=r.useState(0),[p,D]=r.useState(0),[R,P]=r.useState([]),[n,F]=r.useState(0),[o,c]=r.useState(0),[b,i]=r.useState(0),[X,Q]=r.useState(0),[l,z]=r.useState(!1),y=()=>z(!1),g=()=>z(!0),w=()=>y(),[f,t]=r.useState(!1),[s,u]=r.useState("pay"),h=()=>t(!1),O=()=>{h()},[N,k]=r.useState(!1),K=ce();ie({mutationFn:$=>he($),onSuccess:()=>{se.success("تمت إضافة الدفعة."),K.invalidateQueries({queryKey:["balance-table"]}),_(0),L(""),q(!1)},onError:()=>{se.error("حدث خطأ أثناء الإرسال.")}});const I=()=>{B(0),A(0),G(0),E(0),m(0),P([]),c([]),F([]),Q([]),i([])},re=async()=>{if(j!=null&&j.PhNumber){k(!0);try{const $=await te.post("https://server-uvnz.onrender.com/search",j);c($.data.elecOriginalRows),F($.data.elecMatchingRows),Q($.data.internetOriginalRows),i($.data.internetMatchingRows)}catch($){console.error($)}finally{k(!1)}}};return r.useEffect(()=>{D(Number(C)+Number(M)+Number(T)+Number(v)+Number(S))},[C,M,T,v,S]),e.jsxs(e.Fragment,{children:[e.jsx(de,{children:e.jsx("div",{className:"space-y-6",children:e.jsxs("div",{className:"flex-col w-full",children:[e.jsxs("div",{className:"sticky top-0 z-30 py-3 shadow bg-foreground/10 flex flex-wrap justify-center mt-4 select-none",children:[e.jsxs("div",{className:"flex shadow-[0px_0px_4px] shadow-accent-400 mr-5 rounded-lg text-text-950",children:[e.jsx("button",{onClick:()=>{g(),R.length>0},className:"text-center text-lg p-2 border-r rounded-l-lg border-text-950 bg-accent-200 hover:bg-accent-300 text-accent-foreground font-bold",children:"انهاء"}),e.jsx("div",{className:"text-center text-xl p-2 rounded-r-lg",children:p})]}),e.jsx("input",{type:"text",placeholder:"بحث برقم الهاتف",className:"p-2 rounded-l-lg w-60 text-center bg-background text-text-900 shadow-md outline-none border border-primary-500",value:j.PhNumber,onChange:$=>{U({PhNumber:$.target.value})},onKeyDown:$=>{$.key==="Enter"&&($.preventDefault(),x(!0),re(),I())}}),e.jsx("button",{onClick:()=>{x(!0),re(),I()},className:"p-2 rounded-r-lg bg-primary-500 text-white font-bold",children:"بحث"})]}),e.jsxs("div",{className:"bg-foreground/5 p-1",children:[e.jsx(fe,{loading:N,internetOriginalRows:X,internetMatchingRows:b,finalTable:R,setFinalTable:P,searchText:j,work:V,setWork:x,internetTotal:C,setInternetTotal:B}),e.jsx(je,{loading:N,elecOriginalRows:o,elecMatchingRows:n,finalTable:R,setFinalTable:P,searchText:j,work:V,setWork:x,elecTotal:M,setElecTotal:A,phoneTotal:T,setPhoneTotal:E,waterTotal:v,setWaterTotal:G,otherTotal:S,setOtherTotal:m})]}),e.jsx("div",{className:"w-80 m-auto rounded-lg px-6 py-3",children:e.jsx(we,{finalTable:R})}),e.jsx(Ce,{setTotalInvoices:D,clearAllTables:I,TotalInvoices:p,finalTable:R,isOpen:l,onClose:y,onSubmit:w,categoryTotals:{internetTotal:C,elecTotal:M,waterTotal:v,phoneTotal:T,otherTotal:S}})]})})}),e.jsx(ge,{payOrInv:s,isOpen:f,onClose:h,onSubmit:O})]})}export{Ae as default};
