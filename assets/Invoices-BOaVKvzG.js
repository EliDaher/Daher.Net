import{s as Ne,r as s,j as e,ab as ne,ad as ue,ae as je,u as we,b as ve,D as ke,B as Te}from"./index-D2A-dXnf.js";import{l as pe}from"./index-DNWB1g5D.js";import{b as Se,c as De}from"./balance-BREAEvmR.js";import{P as Oe}from"./plus-iNHd9Mh9.js";import{T as Re}from"./trash-2-DacxZr_U.js";import{P as he}from"./printer-DDbZwhEY.js";import{A as Ce}from"./AddBalanceForm-C7OBi1w9.js";/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $e=Ne("Save",[["path",{d:"M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",key:"1c8476"}],["path",{d:"M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7",key:"1ydtos"}],["path",{d:"M7 3v4a1 1 0 0 0 1 1h7",key:"t51u73"}]]);function Ae({loading:t,internetMatchingRows:a,internetOriginalRows:v,finalTable:q,setFinalTable:V,searchText:A,work:Y,setWork:z,internetTotal:E,setInternetTotal:F}){const[_,f]=s.useState([]),[M,G]=s.useState([]),[B,L]=s.useState(null),C=Date.now(),k=new Date(C),[T,J]=s.useState(["1/26","2/26","3/26","4/26","5/26","6/26","7/26","8/26","9/26","10/26","11/26","12/26","1/27","2/27","3/27","4/27","5/27","6/27","7/27"]);s.useEffect(()=>{a.length>0?(f(a),G(v),z(!1)):(f([]),G([]),z(!1))},[a]);const $=(h,y,O)=>{ne.post("https://server-uvnz.onrender.com/update",{row:h,col:y,value:O}).then(P=>{}).catch(P=>{console.error("Error updating data:",P)})};return t?e.jsx("div",{className:"flex items-center justify-center",children:e.jsx("div",{})}):B?e.jsx("div",{className:"m-6 w-full text-red-500",children:B}):e.jsxs("div",{className:"shadow-md shadow-foreground/30 p-4 m-3 border rounded-xl bg-background",dir:"rtl",children:[e.jsxs("div",{className:"flex justify-between items-center",children:[e.jsx("h2",{className:"text-center font-bold text-gray-900 text-xl my-4",children:"فواتير الإنترنت"}),e.jsx("div",{children:e.jsxs("p",{className:"font-bold text-text-950 p-2 rounded-lg shadow shadow-primary-400",children:["انترنت ",E]})})]}),e.jsx("div",{className:"w-full overflow-auto max-h-96 rounded-lg border border-gray-300",children:_.length>0?e.jsxs("table",{className:"w-full text-sm border-collapse",children:[e.jsx("thead",{className:"bg-gray-800 text-white text-center",children:e.jsxs("tr",{className:"max-h-2 leading-none border-xl border-primary-800",children:[e.jsx("th",{className:"border border-gray-600 px-1 py-2",children:"#"}),e.jsx("th",{className:"border border-gray-600 px-4 py-2 bg-gray-800 sticky right-[0px]",children:"رقم الهاتف"}),e.jsx("th",{className:"border border-gray-600 px-4 py-2 bg-gray-800 sticky right-[120px]",children:"اسم المشترك"}),e.jsx("th",{className:"border border-gray-600 px-1 py-2 bg-gray-800 sticky right-[240px]",children:"الشركة"}),e.jsx("th",{className:"border border-gray-600 px-1 py-2",children:"السرعة"}),e.jsx("th",{className:"border border-gray-600 px-1 py-2",children:"تاريخ التسديد"}),e.jsx("th",{className:"border border-gray-600 px-4 py-2 bg-gray-800 sticky right-[288px]",children:"الفاتورة الشهرية"}),e.jsx("th",{className:"border border-gray-600 px-4 py-2 bg-gray-800 sticky right-[400px]",children:"ملاحظات"}),T.map((h,y)=>e.jsxs(e.Fragment,{children:[e.jsx("th",{className:"border border-gray-600 px-4 py-2",children:h}),e.jsx("th",{className:"border border-gray-600 px-4 py-2",children:h}),e.jsx("th",{className:"border border-gray-600 px-4 py-2"})]}))]})}),e.jsx("tbody",{children:_.map((h,y)=>{const O=Object.values(h);return e.jsx("tr",{className:`even:bg-gray-100 transition-all\r
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
                                        `,"data-key":y,children:Array.from({length:50},(Q,i)=>e.jsx("td",{className:"border border-gray-300",children:e.jsxs("div",{className:"flex",children:[e.jsx("input",{type:"text",value:O[i]||"",onChange:R=>{const l=[..._];l[y]={...l[y],[Object.keys(h)[i]||`field_${i}`]:R.target.value},f(l)},className:"p-1 w-32 bg-transparent outline-none text-center"}),e.jsx("button",{onClick:R=>{var X,W;const l=k.toLocaleDateString("en-US"),d=[..._];if(d[y][i]==l){const c=Object.keys(h)[i]||`field_${i}`,K=Object.keys(h)[i-1]||`field_${i-1}`;d[y]={...d[y],[K]:"",[c]:""},f(d),isNaN(O[i-1])||F(Number(E)-Number(O[i-1]));const j=(X=R.target.closest("tr"))==null?void 0:X.getAttribute("data-key");if(j!=null){const w=M[j];var g=i,m="";$(w,g,m),g=i-1,m="",$(w,g,m)}const x={customerName:h[2],customerNumber:h[1],customerDetails:h[3],invoiceNumber:T[i/3-3],invoiceValue:h[6]};V(w=>w.filter(p=>!(p.customerName===x.customerName&&p.customerNumber===x.customerNumber&&p.customerDetails===x.customerDetails&&p.invoiceNumber===x.invoiceNumber&&p.invoiceValue===x.invoiceValue)))}else{const c=Object.keys(h)[i]||`field_${i}`,K=Object.keys(h)[i-1]||`field_${i-1}`,j=h[6];d[y]={...d[y],[K]:j,[c]:l},f(d),isNaN(O[i-1])||F(Number(E)+Number(j));const x=(W=R.target.closest("tr"))==null?void 0:W.getAttribute("data-key");if(x!=null){const p=M[x];var g=i,m=l;$(p,g,m),g=i-1,m=j,$(p,g,m)}const w={category:"internetTotal",customerName:h[2],customerNumber:h[1],customerDetails:h[3],invoiceNumber:T[i/3-3],invoiceValue:h[6]};V([...q,w])}},className:`hover:bg-accent-600 w-4 ${Number(i+1)%3===1&&i>7?"bg-accent-400":"hidden"} ${h[i-1]?"bg-red-400 hover:bg-red-600":""}`,children:"+"})]})},i))},y)})})]}):e.jsx("p",{className:"text-center text-gray-500 py-4",children:"لم يتم العثور على أي فواتير."})})]})}function ze(t){const a=String(t||"").toLowerCase();return a.includes("ÙƒÙ‡Ø±Ø¨")||a.includes("كهرب")?"elecTotal":a.includes("Ù…ÙŠØ§")||a.includes("ميا")?"waterTotal":a.includes("Ø§Ø±Ø¶")||a.includes("ارضي")||a.includes("أرضي")?"phoneTotal":"otherTotal"}function Ee({loading:t,elecMatchingRows:a,elecOriginalRows:v,finalTable:q,setFinalTable:V,searchText:A,work:Y,setWork:z,elecTotal:E,phoneTotal:F,waterTotal:_,otherTotal:f,setElecTotal:M,setPhoneTotal:G,setWaterTotal:B,setOtherTotal:L}){const[C,k]=s.useState([]),[T,J]=s.useState([]),[$,h]=s.useState(null),y=Date.now(),O=new Date(y),[P,Q]=s.useState(["1","1","1","1","1","1","1","1","1","1","1","1","1"]),i=(l,d,g)=>{ne.post("https://server-uvnz.onrender.com/updateElec",{row:l,col:d,value:g}).then(m=>{}).catch(m=>{console.error("Error updating data:",m)})};s.useEffect(()=>{a.length>0?(k(a),J(v),z(!1)):(k([]),J([]),z(!1))},[a]);const R=(l,d)=>{const g=Number(d);if(Number.isFinite(g)){if(l==="phoneTotal"){G(m=>Number(m)+g);return}if(l==="waterTotal"){B(m=>Number(m)+g);return}if(l==="otherTotal"){L(m=>Number(m)+g);return}M(m=>Number(m)+g)}};return t?e.jsx("div",{className:"flex items-center justify-center",children:e.jsx("div",{})}):$?e.jsx("div",{className:"m-6 w-full text-red-500",children:$}):e.jsxs("div",{className:"shadow-md shadow-foreground/30 p-4 m-3 border rounded-xl bg-background",dir:"rtl",children:[e.jsxs("div",{className:"flex justify-between items-center",children:[e.jsx("h2",{className:"text-right font-bold text-text-950 text-xl my-4 mr-2",children:"فواتير الخدمات الحكومية"}),e.jsxs("div",{className:"flex gap-5 items-right",children:[e.jsxs("p",{className:"font-bold text-text-950 p-2 rounded-lg shadow shadow-gray-400",children:["أخرى ",f]}),e.jsxs("p",{className:"font-bold text-text-950 p-2 rounded-lg shadow shadow-orange-400",children:["ارضي ",F]}),e.jsxs("p",{className:"font-bold text-text-950 p-2 rounded-lg shadow shadow-yellow-400",children:["كهرباء ",E]}),e.jsxs("p",{className:"font-bold text-text-950 p-2 rounded-lg shadow shadow-blue-400",children:["مياه ",_]})]})]}),e.jsx("div",{className:"w-full overflow-auto max-h-96 rounded-lg border border-gray-300",children:C.length>0?e.jsxs("table",{className:"w-full text-sm border-collapse",children:[e.jsx("thead",{className:"bg-gray-800 text-white text-center",children:e.jsxs("tr",{className:"max-h-4 leading-none border-xl border-primary-800",children:[e.jsx("th",{className:"border border-gray-600 px-1 sticky right-[0px] z-20 top-0 bg-gray-800",children:"#"}),e.jsx("th",{className:"border border-gray-600 px-2 sticky right-[47px] z-20 top-0 bg-gray-800",children:"نوع الفاتورة"}),e.jsx("th",{className:"border border-gray-600 px-2 sticky right-[165px] z-20 top-0 bg-gray-800"}),e.jsx("th",{className:"border border-gray-600 px-2 sticky right-[292px] z-20 top-0 bg-gray-800",children:"الرقم"}),P.map(l=>e.jsxs(e.Fragment,{children:[e.jsx("th",{className:"border border-gray-600 bg-primary-800"}),e.jsx("th",{className:"border border-gray-600 px-2 py-2 ",children:"الدورة"}),e.jsx("th",{className:"border border-gray-600 px-2 py-2 ",children:"قيمة الفاتورة"}),e.jsx("th",{className:"border border-gray-600 px-2 py-2 ",children:"المبلغ المقبوض"}),e.jsx("th",{className:"border border-gray-600 px-2 py-2 ",children:"تاريخ الدفع"}),e.jsx("th",{className:"border border-gray-600 px-2 py-2 ",children:"ملاحظات"})]}))]})}),e.jsx("tbody",{children:C.map((l,d)=>{const g=Object.values(l),m=ze(g[1]);return e.jsx("tr",{className:`transition-all duration-200 
                                        ${m==="phoneTotal"?"bg-orange-200/80":""}
                                        ${m==="elecTotal"?"bg-yellow-200/80":""}
                                        ${m==="waterTotal"?"bg-blue-200/80":""}
                                        ${m==="otherTotal"?"bg-gray-200/80":""}
                                        [&>*:nth-child(6n-1)>*:nth-child(1)>*]:w-1 [&>*:nth-child(1)>*>*]:w-12
                                        [&>*:nth-child(6n-1)>*>*]:w-20 [&>*:nth-child(6n-1)]:bg-primary-700 
                                        hover:bg-primary-100 [&>*:nth-child(6n)>*:nth-child(1)>*]:w-14
                                        [&>*:nth-child(-n+4)]:sticky [&>*:nth-child(-n+4)]:z-10
                                        [&>*:nth-child(-n+4)]:bg-background
                                        [&>*:nth-child(-n+4)]:font-bold

                                        [&>*:nth-child(1)]:right-0
                                        [&>*:nth-child(2)]:right-[47px]
                                        [&>*:nth-child(3)]:right-[165px]
                                        [&>*:nth-child(4)]:right-[292px]`,"data-key":d,children:Array.from({length:70},(W,c)=>e.jsx("td",{className:"border border-gray-300",children:e.jsxs("div",{className:"flex",children:[e.jsx("input",{type:"text",value:g[c]||"",onChange:K=>{const j=[...C];if(j[d]){const x=Object.keys(l)[c]||`field_${c}`;j[d]={...j[d],[x]:K.target.value},k(j)}},className:"p-1 w-32 bg-transparent outline-none text-center"}),e.jsx("button",{onClick:K=>{var r,n;const j=O.toLocaleDateString("en-US"),x=[...C];if(x[d][c]==j){const u=Object.keys(l)[c]||`field_${c}`,b=Object.keys(l)[c-1]||`field_${c-1}`;x[d]={...x[d],[b]:"",[u]:""},k(x),R(m,-Number(g[c-1]));const S=(r=K.target.closest("tr"))==null?void 0:r.getAttribute("data-key");if(S!=null){const D=T[S];var w=c,p="";i(D,w,p),w=c-1,p="",i(D,w,p)}const N={customerName:l[2],customerNumber:l[3],customerDetails:l[1],invoiceNumber:l[c-3],invoiceValue:l[c-2]};V(D=>D.filter(U=>!(U.customerName===N.customerName&&U.customerNumber===N.customerNumber&&U.customerDetails===N.customerDetails&&U.invoiceNumber===N.invoiceNumber&&U.invoiceValue===N.invoiceValue)))}else{const u=Object.keys(l)[c]||`field_${c}`,b=Object.keys(l)[c-1]||`field_${c-1}`,S=l[c-2];x[d]={...x[d],[b]:S,[u]:j},k(x),R(m,S);const N=(n=K.target.closest("tr"))==null?void 0:n.getAttribute("data-key");if(N!=null){const U=T[N];var w=c,p=j;i(U,w,p),w=c-1,p=S,i(U,w,p)}const D={category:m,customerName:l[2],customerNumber:l[3],customerDetails:l[1],invoiceNumber:l[c-3],invoiceValue:l[c-2]};V([...q,D])}},className:`hover:bg-accent-600 w-4 ${c%6===2&&c>4?"bg-accent-500":"hidden"} ${l[c-1]?"bg-red-400 hover:bg-red-600":""}`,children:"+"})]})},c))},d)})})]}):e.jsx("p",{className:"text-center text-gray-500 py-4",children:"لم يتم العثور على أي فواتير."})})]})}function Fe({finalTable:t}){return e.jsx(e.Fragment,{children:t.length>0?e.jsx("div",{className:"mt-5 text-center",dir:"rtl",children:e.jsxs("table",{className:"w-full text-text-900 shadow shadow-primary-900",children:[e.jsx("thead",{className:"border border-primary-400",children:e.jsxs("tr",{className:"border border-primary-400",children:[e.jsx("th",{className:"w-10 px-2",children:"نوع الفاتورة"}),e.jsx("th",{className:"w-10 px-2",children:"الاسم"}),e.jsx("th",{className:"w-10 px-2",children:"الرقم"}),e.jsx("th",{className:"w-10 px-2",children:"الدورة"}),e.jsx("th",{className:"w-10 px-2",children:"المبلغ"})]})}),e.jsx("tbody",{className:"",children:t.map(a=>e.jsxs("tr",{children:[e.jsx("td",{className:"w-10 py-1 px-2 border-primary-500",children:a.customerDetails}),e.jsx("td",{className:"w-10 py-1 px-2 border-primary-500",children:a.customerName}),e.jsx("td",{className:"w-10 py-1 px-2 border-primary-500",children:a.customerNumber}),e.jsx("td",{className:"w-10 py-1 px-2 border-primary-500",children:a.invoiceNumber}),e.jsx("td",{className:"w-10 py-1 px-2 border-primary-500",children:a.invoiceValue})]}))})]})}):e.jsx(e.Fragment,{})})}const Me=[{label:"حسم 500",category:"internetTotal",value:-500,details:"Discount"},{label:"بخشيش 500",category:"phoneTotal",value:500,details:"زيادة"},{label:"باقة 5",category:"phoneTotal",value:3e3,details:"باقة 5"},{label:"باقة 10",category:"phoneTotal",value:5e3,details:"باقة 10"},{label:"باقة 20",category:"phoneTotal",value:7500,details:"باقة 20"},{label:"باقة 30",category:"phoneTotal",value:1e4,details:"باقة 30"},{label:"باقة 50",category:"phoneTotal",value:14e3,details:"باقة 50"},{label:"باقة 75",category:"phoneTotal",value:17e3,details:"باقة 75"},{label:"باقة 100",category:"phoneTotal",value:23e3,details:"باقة 100"},{label:"باقة 200",category:"phoneTotal",value:42e3,details:"باقة 200"}],I=[{value:"internetTotal",label:"إنترنت",color:"border-sky-200 bg-sky-50 text-sky-800"},{value:"elecTotal",label:"كهرباء",color:"border-amber-200 bg-amber-50 text-amber-800"},{value:"waterTotal",label:"مياه",color:"border-cyan-200 bg-cyan-50 text-cyan-800"},{value:"phoneTotal",label:"أرضي",color:"border-orange-200 bg-orange-50 text-orange-800"},{value:"otherTotal",label:"أخرى",color:"border-gray-200 bg-gray-50 text-gray-800"}],ie=Me,re={category:"",value:"",details:""},Pe={internetTotal:0,elecTotal:0,waterTotal:0,phoneTotal:0,otherTotal:0};function H(t){return Number(t||0).toLocaleString("en-EG",{minimumFractionDigits:0})}function Ve(t){return Number(t.internetTotal||0)+Number(t.elecTotal||0)+Number(t.waterTotal||0)+Number(t.phoneTotal||0)+Number(t.otherTotal||0)}function _e(t){return I.some(a=>a.value===t)}function Be(t){if(_e(t.category))return t.category;const a=String(t.customerDetails||"").toLowerCase();return a.includes("ÙƒÙ‡Ø±Ø¨")||a.includes("كهرب")?"elecTotal":a.includes("Ù…ÙŠØ§")||a.includes("ميا")?"waterTotal":a.includes("Ø§Ø±Ø¶")||a.includes("ارضي")||a.includes("أرضي")?"phoneTotal":"otherTotal"}function Le(t){const a=Be(t);return a?{...t,category:a}:t}function Ke({clearAllTables:t,finalTable:a,isOpen:v,onClose:q,onSubmit:V,categoryTotals:A}){const Y=s.useRef(null),z=s.useRef(null),E=s.useRef(!1),[F,_]=s.useState(null),[f,M]=s.useState(re),[G,B]=s.useState(""),[L,C]=s.useState([]),[k,T]=s.useState(""),[J,$]=s.useState(""),h=JSON.parse(localStorage.getItem("DaherUser")||"{}"),y=s.useMemo(()=>L.reduce((r,n)=>({...r,[n.category]:Number(r[n.category]||0)+Number(n.invoiceValue||0)}),Pe),[L]),O=s.useMemo(()=>({internetTotal:Number(A.internetTotal||0)+y.internetTotal,elecTotal:Number(A.elecTotal||0)+y.elecTotal,waterTotal:Number(A.waterTotal||0)+y.waterTotal,phoneTotal:Number(A.phoneTotal||0)+y.phoneTotal,otherTotal:Number(A.otherTotal||0)+y.otherTotal}),[A,y]),P=Ve(O),Q=s.useMemo(()=>[...a,...L].map(Le),[a,L]),i=s.useMemo(()=>{const r=new Map;return Q.forEach((n,u)=>{const b=String(n.customerName||"-"),S=String(n.customerNumber||"-"),N=`${b}::${S}`,D=r.get(N);if(D){D.rows.push(n);return}r.set(N,{key:`${N}::${u}`,customerName:b,customerNumber:S,rows:[n]})}),Array.from(r.values())},[Q]),R=Number(f.value),l=!!f.category&&!!f.details.trim()&&Number.isFinite(R)&&R!==0,d=F!==null,g=()=>{C([]),M(re),B(""),T(""),$("")},m=()=>{d||(E.current=!1,g(),q())},X=async r=>{var n,u;_(r),$("");try{(await Se({amount:P,employee:h.username,details:Q,categoryTotals:O})).success&&(g(),t(),V(),q())}catch(b){$(((u=(n=b==null?void 0:b.response)==null?void 0:n.data)==null?void 0:u.message)||(b==null?void 0:b.message)||"تعذر حفظ الفاتورة")}finally{_(null),E.current=!1}},W=async r=>{r.preventDefault(),await X("save")},c=pe.useReactToPrint({contentRef:z,pageStyle:`
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
`,onAfterPrint:()=>{E.current}}),K=()=>{d||(E.current=!0,c())},j=()=>{const r=new Date,n={year:"numeric",month:"2-digit",day:"2-digit",weekday:"long",hour:"2-digit",minute:"2-digit",second:"2-digit"};return r.toLocaleDateString("en-GB",n)},x=()=>{const r=Number(f.value),n=f.details.trim(),u=I.find(b=>b.value===f.category);if(!u||!n||!Number.isFinite(r)||r===0){T("اختر التصنيف وأدخل القيمة والتفاصيل");return}T(""),C(b=>[...b,{id:`${Date.now()}-${b.length}`,category:f.category,customerDetails:u.label,customerName:n,customerNumber:"يدوي",invoiceNumber:"-",invoiceValue:r}]),M(re)},w=r=>{const n=r.target.value;B(n);const u=ie[Number(n)],b=Number(u==null?void 0:u.value),S=String((u==null?void 0:u.details)||"").trim(),N=I.find(D=>D.value===(u==null?void 0:u.category));if(!u||!N||!S||!Number.isFinite(b)||b===0){T("اختر التصنيف وأدخل القيمة والتفاصيل"),B("");return}T(""),C(D=>[...D,{id:`${Date.now()}-${D.length}`,category:N.value,customerDetails:N.label,customerName:S,customerNumber:"يدوي",invoiceNumber:"-",invoiceValue:b}]),B("")},p=r=>{C(n=>n.filter(u=>u.id!==r))};return v?ue.createPortal(e.jsx("div",{className:"fixed inset-0 z-[100] flex bg-black/60 sm:items-center sm:justify-center sm:p-2",children:e.jsxs("div",{className:"flex h-[100svh] w-screen flex-col overflow-hidden bg-background shadow-2xl sm:h-[calc(100svh-1rem)] sm:w-[calc(100vw-1rem)] sm:rounded-lg sm:border lg:max-h-[calc(100svh-1rem)] lg:max-w-[1180px]",dir:"rtl",children:[e.jsxs("div",{className:"flex shrink-0 items-center justify-between gap-3 border-b bg-muted/30 px-4 py-3 sm:px-5",children:[e.jsxs("div",{className:"min-w-0",children:[e.jsx("h2",{className:"text-lg font-bold text-foreground sm:text-xl",children:"تأكيد الفواتير"}),e.jsx("p",{className:"hidden text-sm text-muted-foreground sm:block",children:"مراجعة الفاتورة وإضافة أي سطر يدوي قبل الحفظ"})]}),e.jsx("button",{"aria-label":"إغلاق",className:"inline-flex h-9 w-9 items-center justify-center rounded-md border bg-background text-muted-foreground hover:bg-muted disabled:opacity-50",disabled:d,onClick:m,type:"button",children:e.jsx(je,{className:"h-4 w-4"})})]}),e.jsxs("form",{className:"flex min-h-0 flex-1 flex-col overflow-hidden",onSubmit:W,children:[e.jsx("div",{className:"min-h-0 flex-1 overflow-y-auto p-2 sm:p-3 lg:p-4",children:e.jsxs("div",{className:"grid min-w-0 gap-3 lg:grid-cols-[minmax(0,1fr)_360px]",children:[e.jsxs("div",{className:"order-2 min-w-0 bg-white lg:order-1",children:[e.jsxs("div",{ref:Y,className:"mx-auto max-w-full rounded-md border bg-white p-3 text-gray-950 shadow-sm print:border-0 print:shadow-none sm:p-4 lg:max-w-3xl",children:[e.jsxs("div",{className:"header text-center font-bold",children:[e.jsx("span",{className:"block text-lg",children:"Daher.Net"}),e.jsx("span",{className:"block text-sm",children:j()})]}),e.jsx("div",{className:"mt-4 max-w-full overflow-x-auto text-right",children:Q.length>0?e.jsxs("table",{className:"w-full min-w-[560px] border-collapse text-sm",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"border bg-gray-100",children:[e.jsx("th",{className:"px-2 py-2",children:"نوع الفاتورة"}),e.jsx("th",{className:"px-2 py-2",children:"الاسم"}),e.jsx("th",{className:"px-2 py-2",children:"الرقم"}),e.jsx("th",{className:"px-2 py-2",children:"الدورة"}),e.jsx("th",{className:"px-2 py-2",children:"المبلغ"})]})}),e.jsx("tbody",{children:Q.map((r,n)=>e.jsxs("tr",{className:"border-b",children:[e.jsx("td",{className:"px-2 py-2",children:r.customerDetails||"-"}),e.jsx("td",{className:"px-2 py-2",children:r.customerName||"-"}),e.jsx("td",{className:"px-2 py-2",children:r.customerNumber||"-"}),e.jsx("td",{className:"px-2 py-2",children:r.invoiceNumber||"-"}),e.jsx("td",{className:"px-2 py-2 font-bold",children:H(r.invoiceValue)})]},`${r.id||r.customerNumber||"row"}-${n}`))})]}):e.jsx("div",{className:"rounded-md border border-dashed p-6 text-center text-sm text-muted-foreground",children:"لا توجد فواتير محددة"})}),e.jsxs("div",{className:"totalValue mt-4 flex items-center justify-between border-t pt-3",children:[e.jsx("span",{children:"المجموع"}),e.jsx("span",{children:H(P)})]})]}),e.jsxs("div",{ref:z,className:"receipt-print fixed left-[-10000px] top-0 bg-white text-gray-950",dir:"rtl",children:[e.jsxs("div",{className:"receipt-header",children:[e.jsx("span",{children:"Daher.Net"}),e.jsx("span",{children:j()})]}),e.jsx("div",{className:"receipt-section",children:i.length>0?i.map(r=>e.jsxs("div",{className:"receipt-group",children:[e.jsxs("div",{className:"receipt-customer",children:[e.jsx("span",{children:r.customerName}),e.jsx("span",{className:"receipt-customer-number",children:r.customerNumber})]}),r.rows.map((n,u)=>e.jsxs("div",{className:"receipt-row",children:[e.jsx("span",{children:n.customerDetails||"-"}),e.jsx("span",{className:"receipt-cycle",children:n.invoiceNumber||"-"}),e.jsx("span",{className:"receipt-amount",children:H(n.invoiceValue)})]},`${n.id||n.invoiceNumber||"print-row"}-${u}`))]},r.key)):e.jsx("div",{className:"receipt-row text-center font-bold",children:"Ù„Ø§ ØªÙˆØ¬Ø¯ ÙÙˆØ§ØªÙŠØ± Ù…Ø­Ø¯Ø¯Ø©"})}),e.jsx("div",{className:"receipt-section",children:I.map(r=>e.jsxs("div",{className:"receipt-total-line",children:[e.jsx("span",{children:r.label}),e.jsx("span",{children:H(O[r.value])})]},r.value))}),e.jsxs("div",{className:"receipt-total-line receipt-grand-total",children:[e.jsx("span",{children:"المجموع"}),e.jsx("span",{children:H(P)})]})]})]}),e.jsx("aside",{className:"no-print order-1 min-w-0 rounded-md border bg-muted/20 p-3 lg:order-2 lg:p-4",children:e.jsxs("div",{className:"space-y-4",children:[e.jsxs("section",{className:"rounded-md border bg-background p-3 sm:p-4",children:[e.jsx("p",{className:"text-sm font-semibold text-muted-foreground",children:"المجموع النهائي"}),e.jsx("p",{className:"mt-1 text-3xl font-extrabold text-primary",children:H(P)})]}),e.jsxs("section",{className:"space-y-3",children:[e.jsx("h3",{className:"text-sm font-bold",children:"الإجماليات حسب التصنيف"}),e.jsx("div",{className:"grid grid-cols-2 gap-2",children:I.map(r=>e.jsxs("div",{className:`rounded-md border p-3 ${r.color}`,children:[e.jsx("p",{className:"text-xs font-semibold",children:r.label}),e.jsx("p",{className:"mt-1 text-lg font-extrabold",children:H(O[r.value])})]},r.value))})]}),e.jsxs("section",{className:"space-y-3 rounded-md border bg-background p-3 sm:p-4",children:[e.jsx("h3",{className:"text-sm font-bold",children:"إضافة سطر يدوي"}),e.jsxs("div",{className:"space-y-3",children:[e.jsxs("div",{className:"space-y-1",children:[e.jsx("label",{className:"text-xs font-medium text-muted-foreground",children:"اختصار جاهز"}),e.jsxs("select",{className:"h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm",value:G,onChange:w,children:[e.jsx("option",{value:"",children:"اختر اختصار للإضافة السريعة"}),ie.map((r,n)=>e.jsxs("option",{value:n,children:[r.label," - ",H(r.value)]},`${r.label}-${n}`))]})]}),e.jsxs("div",{className:"space-y-1",children:[e.jsx("label",{className:"text-xs font-medium text-muted-foreground",children:"التصنيف"}),e.jsxs("select",{className:"h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm",value:f.category,onChange:r=>M(n=>({...n,category:r.target.value})),children:[e.jsx("option",{value:"",children:"اختر التصنيف"}),I.map(r=>e.jsx("option",{value:r.value,children:r.label},r.value))]})]}),e.jsxs("div",{className:"space-y-1",children:[e.jsx("label",{className:"text-xs font-medium text-muted-foreground",children:"القيمة"}),e.jsx("input",{className:"h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm",onChange:r=>M(n=>({...n,value:r.target.value})),placeholder:"0",type:"number",value:f.value})]}),e.jsxs("div",{className:"space-y-1",children:[e.jsx("label",{className:"text-xs font-medium text-muted-foreground",children:"التفاصيل"}),e.jsx("input",{className:"h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm",onChange:r=>M(n=>({...n,details:r.target.value})),placeholder:"مثال: فرق فاتورة",type:"text",value:f.details})]}),k&&e.jsx("p",{className:"text-sm text-destructive",children:k}),e.jsxs("button",{className:"inline-flex h-10 w-full items-center justify-center gap-2 rounded-md bg-primary px-4 text-sm font-bold text-primary-foreground hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50",disabled:!l,onClick:x,type:"button",children:[e.jsx(Oe,{className:"h-4 w-4"}),"إضافة السطر"]})]})]}),L.length>0&&e.jsxs("section",{className:"space-y-3",children:[e.jsx("h3",{className:"text-sm font-bold",children:"الأسطر اليدوية"}),e.jsx("div",{className:"space-y-2",children:L.map(r=>e.jsxs("div",{className:"flex items-center gap-3 rounded-md border bg-background p-3",children:[e.jsxs("div",{className:"min-w-0 flex-1",children:[e.jsx("p",{className:"truncate text-sm font-bold",children:r.customerName}),e.jsxs("p",{className:"text-xs text-muted-foreground",children:[r.customerDetails," - ",H(r.invoiceValue)]})]}),e.jsx("button",{"aria-label":"حذف السطر",className:"inline-flex h-8 w-8 items-center justify-center rounded-md bg-destructive text-destructive-foreground hover:bg-destructive/90",onClick:()=>p(r.id),type:"button",children:e.jsx(Re,{className:"h-4 w-4"})})]},r.id))})]}),J&&e.jsx("p",{className:"rounded-md border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive",children:J})]})})]})}),e.jsxs("div",{className:"no-print flex shrink-0 flex-wrap gap-2 border-t bg-background p-3 sm:p-4",children:[e.jsxs("button",{className:"inline-flex h-10 min-w-[8rem] flex-1 items-center justify-center gap-2 rounded-md bg-primary px-4 text-sm font-bold text-primary-foreground hover:bg-primary/90 disabled:opacity-60",disabled:d,type:"submit",children:[e.jsx($e,{className:"h-4 w-4"}),F==="save"?"جاري الحفظ...":"Save"]}),e.jsxs("button",{className:"inline-flex h-10 min-w-[8rem] flex-1 items-center justify-center gap-2 rounded-md bg-accent px-4 text-sm font-bold text-accent-foreground hover:bg-accent/90 disabled:opacity-60",disabled:d,onClick:K,type:"button",children:[e.jsx(he,{className:"h-4 w-4"}),F==="print"?"جاري الحفظ...":"Print"]}),e.jsx("button",{className:"inline-flex h-10 min-w-[6rem] flex-1 items-center justify-center rounded-md border px-4 text-sm font-bold hover:bg-muted disabled:opacity-60 sm:flex-none",disabled:d,onClick:m,type:"button",children:"Close"})]})]})]})}),document.body):null}const Ge=new Date().toISOString().split("T")[0];function ae(t){return Number(t||0).toLocaleString("en-EG",{minimumFractionDigits:0})}function xe(t){var v;const a=((v=t==null?void 0:t.invoiceData)==null?void 0:v.details)??(t==null?void 0:t.details)??[];return Array.isArray(a)?a:a&&typeof a=="object"?Object.values(a):[]}function ce(t){var a;return Number(((a=t==null?void 0:t.invoiceData)==null?void 0:a.amount)??(t==null?void 0:t.amount)??0)}function be(t){var a;return String(((a=t==null?void 0:t.invoiceData)==null?void 0:a.timestamp)??(t==null?void 0:t.timestamp)??(t==null?void 0:t.createdAt)??(t==null?void 0:t.date)??"-")}function de(t){const a=be(t),v=new Date(a);return Number.isNaN(v.getTime())?a:v.toLocaleString("en-GB")}function se(t){const a=xe(t);return a.length>0?a.map(v=>[v.customerName,v.customerNumber,v.invoiceNumber].filter(Boolean).join(" / ")).filter(Boolean).join("، "):typeof t.details=="string"&&t.details.trim()?t.details:"لا تفاصيل"}function me(t){const a=new Date(be(t)).getTime();return Number.isNaN(a)?0:a}function Ye(){const t=we(),[a,v]=s.useState({PhNumber:""}),[q,V]=s.useState(!1),[A,Y]=s.useState(0),[z,E]=s.useState(0),[F,_]=s.useState(0),[f,M]=s.useState(0),[G,B]=s.useState(0),[L,C]=s.useState(0),[k,T]=s.useState([]),[J,$]=s.useState(0),[h,y]=s.useState(0),[O,P]=s.useState(0),[Q,i]=s.useState(0),R=JSON.parse(localStorage.getItem("DaherUser")),[l,d]=s.useState(!1),g=()=>d(!1),m=()=>d(!0),X=()=>{g(),t.invalidateQueries({queryKey:["invoice-recent-balance-operations"]})},[W,c]=s.useState(!1),[K]=s.useState("pay"),j=()=>c(!1),[x,w]=s.useState(Ge),[p,r]=s.useState(null),n=s.useRef(null),u=()=>{j(),t.invalidateQueries({queryKey:["invoice-recent-balance-operations"]})},[b,S]=s.useState(!1),{data:N,isLoading:D,isFetching:U}=ve({queryKey:["invoice-recent-balance-operations",x],queryFn:()=>De("all",x)}),ee=s.useMemo(()=>[...Array.isArray(N==null?void 0:N.data)?N.data:[]].sort((Z,fe)=>me(fe)-me(Z)),[N]),le=xe(p),ge=pe.useReactToPrint({contentRef:n,pageStyle:`
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

    .balance-operation-print {
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

    .balance-operation-header {
      text-align: center;
      font-size: 13px;
      font-weight: 900;
      margin: 0 0 8px 0;
    }

    .balance-operation-header span {
      display: block;
      margin-bottom: 2px;
    }

    .balance-operation-meta {
      border-top: 1px dashed black;
      border-bottom: 1px dashed black;
      padding: 5px 0;
      margin-bottom: 5px;
      font-size: 11px;
      font-weight: 800;
    }

    .balance-operation-meta div,
    .balance-operation-total {
      display: flex;
      justify-content: space-between;
      gap: 8px;
      padding: 2px 0;
    }

    .balance-operation-row {
      break-inside: avoid;
      border-bottom: 1px dashed black;
      padding: 4px 0;
      font-size: 10.5px;
      font-weight: 700;
    }

    .balance-operation-customer {
      display: flex;
      justify-content: space-between;
      gap: 5px;
      margin-bottom: 2px;
      font-weight: 900;
    }

    .balance-operation-grid {
      display: grid;
      grid-template-columns: minmax(0, 1fr) 16mm 18mm;
      gap: 3px;
    }

    .balance-operation-row span,
    .balance-operation-meta span {
      min-width: 0;
      word-break: break-word;
      overflow-wrap: anywhere;
    }

    .balance-operation-cycle,
    .balance-operation-amount {
      text-align: left;
      white-space: nowrap;
    }

    .balance-operation-amount {
      font-weight: 900;
    }

    .balance-operation-total {
      border-top: 2px solid black;
      margin-top: 8px;
      padding-top: 7px;
      font-weight: 900;
      font-size: 19px;
    }
  }
`,onAfterPrint:()=>r(null)}),ye=o=>{ue.flushSync(()=>{r(o)}),ge()},te=()=>{Y(0),E(0),M(0),_(0),B(0),T([]),y([]),$([]),i([]),P([])},oe=async()=>{if(a!=null&&a.PhNumber){S(!0);try{const o=await ne.post("https://server-uvnz.onrender.com/search",a);y(o.data.elecOriginalRows),$(o.data.elecMatchingRows),i(o.data.internetOriginalRows),P(o.data.internetMatchingRows)}catch(o){console.error(o)}finally{S(!1)}}};return s.useEffect(()=>{C(Number(A)+Number(z)+Number(F)+Number(f)+Number(G))},[A,z,F,f,G]),e.jsxs(e.Fragment,{children:[e.jsx(ke,{children:e.jsxs("div",{className:"space-y-6",children:[e.jsxs("div",{className:"flex-col w-full",children:[e.jsxs("div",{className:"sticky top-0 z-30 py-3 shadow bg-foreground/10 flex flex-wrap justify-center mt-4 select-none",children:[e.jsxs("div",{className:"flex shadow-[0px_0px_4px] shadow-accent-400 mr-5 rounded-lg text-text-950",children:[e.jsx("button",{onClick:()=>{m(),k.length>0},className:"text-center text-lg p-2 border-r rounded-l-lg border-text-950 bg-accent-200 hover:bg-accent-300 text-accent-foreground font-bold",children:"انهاء"}),e.jsx("div",{className:"text-center text-xl p-2 rounded-r-lg",children:L})]}),e.jsx("input",{type:"text",placeholder:"بحث برقم الهاتف",className:"p-2 rounded-l-lg w-60 text-center bg-background text-text-900 shadow-md outline-none border border-primary-500",value:a.PhNumber,onChange:o=>{v({PhNumber:o.target.value})},onKeyDown:o=>{o.key==="Enter"&&(o.preventDefault(),V(!0),oe(),te())}}),e.jsx("button",{onClick:()=>{V(!0),oe(),te()},className:"p-2 rounded-r-lg bg-primary-500 text-white font-bold",children:"بحث"})]}),e.jsxs("div",{className:"bg-foreground/5 p-1",children:[e.jsx(Ae,{loading:b,internetOriginalRows:Q,internetMatchingRows:O,finalTable:k,setFinalTable:T,searchText:a,work:q,setWork:V,internetTotal:A,setInternetTotal:Y}),e.jsx(Ee,{loading:b,elecOriginalRows:h,elecMatchingRows:J,finalTable:k,setFinalTable:T,searchText:a,work:q,setWork:V,elecTotal:z,setElecTotal:E,phoneTotal:F,setPhoneTotal:_,waterTotal:f,setWaterTotal:M,otherTotal:G,setOtherTotal:B})]}),e.jsx("div",{className:"w-80 m-auto rounded-lg px-6 py-3",children:e.jsx(Fe,{finalTable:k})}),e.jsx(Ke,{setTotalInvoices:C,clearAllTables:te,TotalInvoices:L,finalTable:k,isOpen:l,onClose:g,onSubmit:X,categoryTotals:{internetTotal:A,elecTotal:z,waterTotal:f,phoneTotal:F,otherTotal:G}})]}),e.jsxs("section",{className:"rounded-lg border bg-background shadow-sm",dir:"rtl",children:[e.jsxs("div",{className:"flex flex-col gap-3 border-b p-4 sm:flex-row sm:items-center sm:justify-between",children:[e.jsxs("div",{children:[e.jsx("h2",{className:"text-lg font-bold text-foreground",children:"آخر العمليات المضافة إلى الرصيد"}),e.jsxs("p",{className:"mt-1 text-sm text-muted-foreground",children:[x," - ",R.role==="admin"?ee.length:ee.filter(o=>o.employee===R.username).length," عملية"]})]}),e.jsxs("div",{className:"flex flex-col gap-2 sm:flex-row sm:items-center",children:[e.jsx("label",{className:"text-sm font-medium text-muted-foreground",htmlFor:"recentBalanceDate",children:"التاريخ"}),e.jsx("input",{className:"h-10 rounded-md border border-input bg-background px-3 py-2 text-sm",id:"recentBalanceDate",onChange:o=>w(o.target.value),type:"date",value:x})]})]}),e.jsx("div",{className:"overflow-x-auto",children:e.jsxs("table",{className:"min-w-[760px] w-full text-sm text-foreground",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"bg-foreground/10 text-right",children:[e.jsx("th",{className:"px-4 py-3",children:"#"}),e.jsx("th",{className:"px-4 py-3",children:"الموظف"}),e.jsx("th",{className:"px-4 py-3",children:"التفاصيل"}),e.jsx("th",{className:"px-4 py-3",children:"المبلغ"}),e.jsx("th",{className:"px-4 py-3",children:"التاريخ"}),e.jsx("th",{className:"px-4 py-3 text-center",children:"الطباعة"})]})}),e.jsx("tbody",{children:D?e.jsx("tr",{children:e.jsx("td",{className:"px-4 py-8 text-center text-muted-foreground",colSpan:6,children:"جاري التحميل..."})}):ee.length>0?(R.role!=="admin"?ee.filter(o=>o.employee===R.username):ee).map((o,Z)=>e.jsxs("tr",{className:"border-t transition hover:bg-foreground/5",children:[e.jsx("td",{className:"px-4 py-3",children:Z+1}),e.jsx("td",{className:"px-4 py-3 font-medium",children:o.employee||"غير محدد"}),e.jsx("td",{className:"max-w-[420px] px-4 py-3",children:e.jsx("span",{className:"line-clamp-2",title:se(o),children:se(o)})}),e.jsx("td",{className:"px-4 py-3 font-bold text-primary",children:ae(ce(o))}),e.jsx("td",{className:"px-4 py-3 text-muted-foreground",children:de(o)}),e.jsx("td",{className:"px-4 py-3",children:e.jsx("div",{className:"flex justify-center",children:e.jsxs(Te,{disabled:U,onClick:()=>ye(o),size:"sm",type:"button",variant:"outline",children:[e.jsx(he,{className:"h-4 w-4"}),"طباعة"]})})})]},o._id??o.id??Z)):e.jsx("tr",{children:e.jsx("td",{className:"px-4 py-8 text-center text-muted-foreground",colSpan:6,children:"لا توجد عمليات"})})})]})})]}),e.jsxs("div",{ref:n,className:"balance-operation-print fixed left-[-10000px] top-0 bg-white text-gray-950",dir:"rtl",children:[e.jsxs("div",{className:"balance-operation-header",children:[e.jsx("span",{children:"Daher.Net"}),e.jsx("span",{children:de(p)})]}),e.jsx("div",{className:"balance-operation-meta",children:e.jsxs("div",{children:[e.jsx("span",{children:"الموظف"}),e.jsx("span",{children:(p==null?void 0:p.employee)||"غير محدد"})]})}),le.length>0?le.map((o,Z)=>e.jsxs("div",{className:"balance-operation-row",children:[e.jsxs("div",{className:"balance-operation-customer",children:[e.jsx("span",{children:o.customerName||"-"}),e.jsx("span",{children:o.customerNumber||"-"})]}),e.jsxs("div",{className:"balance-operation-grid",children:[e.jsx("span",{children:o.customerDetails||"-"}),e.jsx("span",{className:"balance-operation-cycle",children:o.invoiceNumber||"-"}),e.jsx("span",{className:"balance-operation-amount",children:ae(o.invoiceValue)})]})]},`${o.id||o.invoiceNumber||"detail"}-${Z}`)):e.jsx("div",{className:"balance-operation-row",children:p?se(p):"لا تفاصيل"}),e.jsxs("div",{className:"balance-operation-total",children:[e.jsx("span",{children:"المجموع"}),e.jsx("span",{children:ae(ce(p))})]})]})]})}),e.jsx(Ce,{payOrInv:K,isOpen:W,onClose:j,onSubmit:u})]})}export{Ye as default};
