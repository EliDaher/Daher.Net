import{s as ae,r as a,j as e,ab as I,ad as ne,ae as oe,u as le,d as ce,J as te,D as ie}from"./index-C7vTQUvl.js";import{l as de}from"./index-Cgi7kX1h.js";import{b as me,c as ue}from"./balance-Dhdk_OaQ.js";import{P as he}from"./plus-2SdY0vJ0.js";import{T as pe}from"./trash-2-lbgNuAJy.js";import{P as be}from"./printer-C220HEhC.js";import{A as xe}from"./AddBalanceForm-u8_Rr8uk.js";/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ge=ae("Save",[["path",{d:"M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",key:"1c8476"}],["path",{d:"M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7",key:"1ydtos"}],["path",{d:"M7 3v4a1 1 0 0 0 1 1h7",key:"t51u73"}]]);function ye({loading:d,internetMatchingRows:o,internetOriginalRows:X,finalTable:P,setFinalTable:q,searchText:B,work:Z,setWork:_,internetTotal:b,setInternetTotal:V}){const[E,p]=a.useState([]),[w,L]=a.useState([]),[N,v]=a.useState(null),z=Date.now(),U=new Date(z),[f,Q]=a.useState(["10/25","11/25","12/25","1/26","2/26","3/26","4/26","5/26","6/26","7/26","8/26","9/26","10/26","11/26","12/26"]);a.useEffect(()=>{o.length>0?(p(o),L(X),_(!1)):(p([]),L([]),_(!1))},[o]);const F=(m,u,k)=>{I.post("https://server-uvnz.onrender.com/update",{row:m,col:u,value:k}).then(R=>{}).catch(R=>{console.error("Error updating data:",R)})};return d?e.jsx("div",{className:"flex items-center justify-center",children:e.jsx("div",{})}):N?e.jsx("div",{className:"m-6 w-full text-red-500",children:N}):e.jsxs("div",{className:"shadow-md shadow-foreground/30 p-4 m-3 border rounded-xl bg-background",dir:"rtl",children:[e.jsxs("div",{className:"flex justify-between items-center",children:[e.jsx("h2",{className:"text-center font-bold text-gray-900 text-xl my-4",children:"فواتير الإنترنت"}),e.jsx("div",{children:e.jsxs("p",{className:"font-bold text-text-950 p-2 rounded-lg shadow shadow-primary-400",children:["انترنت ",b]})})]}),e.jsx("div",{className:"w-full overflow-auto max-h-96 rounded-lg border border-gray-300",children:E.length>0?e.jsxs("table",{className:"w-full text-sm border-collapse",children:[e.jsx("thead",{className:"bg-gray-800 text-white text-center",children:e.jsxs("tr",{className:"max-h-2 leading-none border-xl border-primary-800",children:[e.jsx("th",{className:"border border-gray-600 px-1 py-2",children:"#"}),e.jsx("th",{className:"border border-gray-600 px-4 py-2 bg-gray-800 sticky right-[0px]",children:"رقم الهاتف"}),e.jsx("th",{className:"border border-gray-600 px-4 py-2 bg-gray-800 sticky right-[120px]",children:"اسم المشترك"}),e.jsx("th",{className:"border border-gray-600 px-1 py-2 bg-gray-800 sticky right-[240px]",children:"الشركة"}),e.jsx("th",{className:"border border-gray-600 px-1 py-2",children:"السرعة"}),e.jsx("th",{className:"border border-gray-600 px-1 py-2",children:"تاريخ التسديد"}),e.jsx("th",{className:"border border-gray-600 px-4 py-2 bg-gray-800 sticky right-[288px]",children:"الفاتورة الشهرية"}),e.jsx("th",{className:"border border-gray-600 px-4 py-2 bg-gray-800 sticky right-[400px]",children:"ملاحظات"}),f.map((m,u)=>e.jsxs(e.Fragment,{children:[e.jsx("th",{className:"border border-gray-600 px-4 py-2",children:m}),e.jsx("th",{className:"border border-gray-600 px-4 py-2",children:m}),e.jsx("th",{className:"border border-gray-600 px-4 py-2"})]}))]})}),e.jsx("tbody",{children:E.map((m,u)=>{const k=Object.values(m);return e.jsx("tr",{className:`even:bg-gray-100 transition-all\r
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
                                        `,"data-key":u,children:Array.from({length:50},(c,n)=>e.jsx("td",{className:"border border-gray-300",children:e.jsxs("div",{className:"flex",children:[e.jsx("input",{type:"text",value:k[n]||"",onChange:i=>{const C=[...E];C[u]={...C[u],[Object.keys(m)[n]||`field_${n}`]:i.target.value},p(C)},className:"p-1 w-32 bg-transparent outline-none text-center"}),e.jsx("button",{onClick:i=>{var S,j;const C=U.toLocaleDateString("en-US"),x=[...E];if(x[u][n]==C){const T=Object.keys(m)[n]||`field_${n}`,O=Object.keys(m)[n-1]||`field_${n-1}`;x[u]={...x[u],[O]:"",[T]:""},p(x),isNaN(k[n-1])||V(Number(b)-Number(k[n-1]));const $=(S=i.target.closest("tr"))==null?void 0:S.getAttribute("data-key");if($!=null){const y=w[$];var s=n,g="";F(y,s,g),s=n-1,g="",F(y,s,g)}const D={customerName:m[2],customerNumber:m[1],customerDetails:m[3],invoiceNumber:f[n/3-3],invoiceValue:m[6]};q(P.filter(y=>!(y.customerName===D.customerName&&y.customerNumber===D.customerNumber&&y.customerDetails===D.customerDetails&&y.invoiceNumber===D.invoiceNumber&&y.invoiceValue===D.invoiceValue)))}else{const T=Object.keys(m)[n]||`field_${n}`,O=Object.keys(m)[n-1]||`field_${n-1}`,$=m[6];x[u]={...x[u],[O]:$,[T]:C},p(x),isNaN(k[n-1])||V(Number(b)+Number($));const D=(j=i.target.closest("tr"))==null?void 0:j.getAttribute("data-key");if(D!=null){const K=w[D];var s=n,g=C;F(K,s,g),s=n-1,g=$,F(K,s,g)}const y={category:"internetTotal",customerName:m[2],customerNumber:m[1],customerDetails:m[3],invoiceNumber:f[n/3-3],invoiceValue:m[6]};q([...P,y])}},className:`hover:bg-accent-600 w-4 ${Number(n+1)%3===1&&n>7?"bg-accent-400":"hidden"} ${m[n-1]?"bg-red-400 hover:bg-red-600":""}`,children:"+"})]})},n))},u)})})]}):e.jsx("p",{className:"text-center text-gray-500 py-4",children:"لم يتم العثور على أي فواتير."})})]})}function re(d){const o=String(d||"").toLowerCase();return o.includes("ÙƒÙ‡Ø±Ø¨")||o.includes("كهرب")?"elecTotal":o.includes("Ù…ÙŠØ§")||o.includes("ميا")?"waterTotal":o.includes("Ø§Ø±Ø¶")||o.includes("ارضي")||o.includes("أرضي")?"phoneTotal":"elecTotal"}function Ne({loading:d,elecMatchingRows:o,elecOriginalRows:X,finalTable:P,setFinalTable:q,searchText:B,work:Z,setWork:_,elecTotal:b,phoneTotal:V,waterTotal:E,setElecTotal:p,setPhoneTotal:w,setWaterTotal:L}){const[N,v]=a.useState([]),[z,U]=a.useState([]),[f,Q]=a.useState(null),F=Date.now(),m=new Date(F),[u,k]=a.useState(["1","1","1","1","1","1","1","1","1","1","1"]),R=(c,n,i)=>{I.post("https://server-uvnz.onrender.com/updateElec",{row:c,col:n,value:i}).then(C=>{}).catch(C=>{console.error("Error updating data:",C)})};return a.useEffect(()=>{o.length>0?(v(o),U(X),_(!1)):(v([]),U([]),_(!1))},[o]),d?e.jsx("div",{className:"flex items-center justify-center",children:e.jsx("div",{})}):f?e.jsx("div",{className:"m-6 w-full text-red-500",children:f}):e.jsxs("div",{className:"shadow-md shadow-foreground/30 p-4 m-3 border rounded-xl bg-background",dir:"rtl",children:[e.jsxs("div",{className:"flex justify-between items-center",children:[e.jsx("h2",{className:"text-right font-bold text-text-950 text-xl my-4 mr-2",children:"فواتير الخدمات الحكومية"}),e.jsxs("div",{className:"flex gap-5 items-right",children:[e.jsxs("p",{className:"font-bold text-text-950 p-2 rounded-lg shadow shadow-orange-400",children:["ارضي ",V]}),e.jsxs("p",{className:"font-bold text-text-950 p-2 rounded-lg shadow shadow-yellow-400",children:["كهرباء ",b]}),e.jsxs("p",{className:"font-bold text-text-950 p-2 rounded-lg shadow shadow-blue-400",children:["مياه ",E]})]})]}),e.jsx("div",{className:"w-full overflow-auto max-h-96 rounded-lg border border-gray-300",children:N.length>0?e.jsxs("table",{className:"w-full text-sm border-collapse",children:[e.jsx("thead",{className:"bg-gray-800 text-white text-center",children:e.jsxs("tr",{className:"max-h-4 leading-none border-xl border-primary-800",children:[e.jsx("th",{className:"border border-gray-600 px-1 sticky right-[0px] z-20 top-0 bg-gray-800",children:"#"}),e.jsx("th",{className:"border border-gray-600 px-2 sticky right-[47px] z-20 top-0 bg-gray-800",children:"نوع الفاتورة"}),e.jsx("th",{className:"border border-gray-600 px-2 sticky right-[165px] z-20 top-0 bg-gray-800"}),e.jsx("th",{className:"border border-gray-600 px-2 sticky right-[292px] z-20 top-0 bg-gray-800",children:"الرقم"}),u.map(c=>e.jsxs(e.Fragment,{children:[e.jsx("th",{className:"border border-gray-600 bg-primary-800"}),e.jsx("th",{className:"border border-gray-600 px-2 py-2 ",children:"الدورة"}),e.jsx("th",{className:"border border-gray-600 px-2 py-2 ",children:"قيمة الفاتورة"}),e.jsx("th",{className:"border border-gray-600 px-2 py-2 ",children:"المبلغ المقبوض"}),e.jsx("th",{className:"border border-gray-600 px-2 py-2 ",children:"تاريخ الدفع"}),e.jsx("th",{className:"border border-gray-600 px-2 py-2 ",children:"ملاحظات"})]}))]})}),e.jsx("tbody",{children:N.map((c,n)=>{const i=Object.values(c);return e.jsx("tr",{className:`transition-all duration-200 
                                        ${i[1].includes("ارضي")?"bg-orange-200/80":""}
                                        ${i[1].includes("كهربا")?"bg-yellow-200/80":""}
                                        ${i[1].includes("ميا")?"bg-blue-200/80":""}
                                        [&>*:nth-child(6n-1)>*:nth-child(1)>*]:w-1 [&>*:nth-child(1)>*>*]:w-12
                                        [&>*:nth-child(6n-1)>*>*]:w-20 [&>*:nth-child(6n-1)]:bg-primary-700 
                                        hover:bg-primary-100 [&>*:nth-child(6n)>*:nth-child(1)>*]:w-14
                                        [&>*:nth-child(-n+4)]:sticky [&>*:nth-child(-n+4)]:z-10
                                        [&>*:nth-child(-n+4)]:bg-background
                                        [&>*:nth-child(-n+4)]:font-bold

                                        [&>*:nth-child(1)]:right-0
                                        [&>*:nth-child(2)]:right-[47px]
                                        [&>*:nth-child(3)]:right-[165px]
                                        [&>*:nth-child(4)]:right-[292px]`,"data-key":n,children:Array.from({length:70},(x,s)=>e.jsx("td",{className:"border border-gray-300",children:e.jsxs("div",{className:"flex",children:[e.jsx("input",{type:"text",value:i[s]||"",onChange:g=>{const S=[...N];if(S[n]){const j=Object.keys(c)[s]||`field_${s}`;S[n]={...S[n],[j]:g.target.value},v(S)}},className:"p-1 w-32 bg-transparent outline-none text-center"}),e.jsx("button",{onClick:g=>{var $,D;const S=m.toLocaleDateString("en-US"),j=[...N];if(j[n][s]==S){const y=Object.keys(c)[s]||`field_${s}`,K=Object.keys(c)[s-1]||`field_${s-1}`;j[n]={...j[n],[K]:"",[y]:""},v(j),i[1].includes("ارضي")&&!isNaN(i[s-1])&&w(Number(V)-Number(i[s-1])),i[1].includes("كهربا")&&!isNaN(i[s-1])&&p(Number(b)-Number(i[s-1])),i[1].includes("ميا")&&!isNaN(i[s-1])&&L(Number(E)-Number(i[s-1]));const t=($=g.target.closest("tr"))==null?void 0:$.getAttribute("data-key");if(t!=null){const l=z[t];var T=s,O="";R(l,T,O),T=s-1,O="",R(l,T,O)}const r={category:re(c[1]),customerName:c[1],customerNumber:c[3],customerDetails:c[2],invoiceNumber:c[s-3],invoiceValue:c[s-2]};q(P.filter(l=>!(l.customerName===r.customerName&&l.customerNumber===r.customerNumber&&l.customerDetails===r.customerDetails&&l.invoiceNumber===r.invoiceNumber&&l.invoiceValue===r.invoiceValue)))}else{const y=Object.keys(c)[s]||`field_${s}`,K=Object.keys(c)[s-1]||`field_${s-1}`,t=c[s-2];j[n]={...j[n],[K]:t,[y]:S},v(j),i[1].includes("ارضي")&&!isNaN(i[s-1])&&w(Number(V)+Number(t)),i[1].includes("كهربا")&&!isNaN(i[s-1])&&p(Number(b)+Number(t)),i[1].includes("ميا")&&!isNaN(i[s-1])&&L(Number(E)+Number(t));const r=(D=g.target.closest("tr"))==null?void 0:D.getAttribute("data-key");if(r!=null){const h=z[r];var T=s,O=S;R(h,T,O),T=s-1,O=t,R(h,T,O)}const l={category:re(c[1]),customerName:c[2],customerNumber:c[3],customerDetails:c[1],invoiceNumber:c[s-3],invoiceValue:c[s-2]};q([...P,l])}},className:`hover:bg-accent-600 w-4 ${s%6===2&&s>4?"bg-accent-500":"hidden"} ${c[s-1]?"bg-red-400 hover:bg-red-600":""}`,children:"+"})]})},s))},n)})})]}):e.jsx("p",{className:"text-center text-gray-500 py-4",children:"لم يتم العثور على أي فواتير."})})]})}function fe({finalTable:d}){return e.jsx(e.Fragment,{children:d.length>0?e.jsx("div",{className:"mt-5 text-center",dir:"rtl",children:e.jsxs("table",{className:"w-full text-text-900 shadow shadow-primary-900",children:[e.jsx("thead",{className:"border border-primary-400",children:e.jsxs("tr",{className:"border border-primary-400",children:[e.jsx("th",{className:"w-10 px-2",children:"نوع الفاتورة"}),e.jsx("th",{className:"w-10 px-2",children:"الاسم"}),e.jsx("th",{className:"w-10 px-2",children:"الرقم"}),e.jsx("th",{className:"w-10 px-2",children:"الدورة"}),e.jsx("th",{className:"w-10 px-2",children:"المبلغ"})]})}),e.jsx("tbody",{className:"",children:d.map(o=>e.jsxs("tr",{children:[e.jsx("td",{className:"w-10 py-1 px-2 border-primary-500",children:o.customerDetails}),e.jsx("td",{className:"w-10 py-1 px-2 border-primary-500",children:o.customerName}),e.jsx("td",{className:"w-10 py-1 px-2 border-primary-500",children:o.customerNumber}),e.jsx("td",{className:"w-10 py-1 px-2 border-primary-500",children:o.invoiceNumber}),e.jsx("td",{className:"w-10 py-1 px-2 border-primary-500",children:o.invoiceValue})]}))})]})}):e.jsx(e.Fragment,{})})}const je=[{label:"حسم 500",category:"internetTotal",value:-500,details:"Discount"},{label:"بخشيش 500",category:"phoneTotal",value:500,details:"زيادة"},{label:"باقة 5",category:"phoneTotal",value:3e3,details:"باقة 5"},{label:"باقة 10",category:"phoneTotal",value:5e3,details:"باقة 10"},{label:"باقة 20",category:"phoneTotal",value:7500,details:"باقة 20"},{label:"باقة 30",category:"phoneTotal",value:1e4,details:"باقة 30"},{label:"باقة 50",category:"phoneTotal",value:14e3,details:"باقة 50"},{label:"باقة 75",category:"phoneTotal",value:17e3,details:"باقة 75"},{label:"باقة 100",category:"phoneTotal",value:23e3,details:"باقة 100"},{label:"باقة 200",category:"phoneTotal",value:42e3,details:"باقة 200"}],Y=[{value:"internetTotal",label:"إنترنت",color:"border-sky-200 bg-sky-50 text-sky-800"},{value:"elecTotal",label:"كهرباء",color:"border-amber-200 bg-amber-50 text-amber-800"},{value:"waterTotal",label:"مياه",color:"border-cyan-200 bg-cyan-50 text-cyan-800"},{value:"phoneTotal",label:"أرضي",color:"border-orange-200 bg-orange-50 text-orange-800"}],se=je,W={category:"",value:"",details:""},we={internetTotal:0,elecTotal:0,waterTotal:0,phoneTotal:0};function J(d){return Number(d||0).toLocaleString("en-EG",{minimumFractionDigits:0})}function ve(d){return Number(d.internetTotal||0)+Number(d.elecTotal||0)+Number(d.waterTotal||0)+Number(d.phoneTotal||0)}function ke(d){return Y.some(o=>o.value===d)}function Se(d){if(ke(d.category))return d.category;const o=String(d.customerDetails||"").toLowerCase();if(o.includes("ÙƒÙ‡Ø±Ø¨")||o.includes("كهرب"))return"elecTotal";if(o.includes("Ù…ÙŠØ§")||o.includes("ميا"))return"waterTotal";if(o.includes("Ø§Ø±Ø¶")||o.includes("ارضي")||o.includes("أرضي"))return"phoneTotal"}function Te(d){const o=Se(d);return o?{...d,category:o}:d}function De({clearAllTables:d,finalTable:o,isOpen:X,onClose:P,onSubmit:q,categoryTotals:B}){const Z=a.useRef(null),_=a.useRef(null),b=a.useRef(!1),[V,E]=a.useState(null),[p,w]=a.useState(W),[L,N]=a.useState(""),[v,z]=a.useState([]),[U,f]=a.useState(""),[Q,F]=a.useState(""),m=JSON.parse(localStorage.getItem("DaherUser")||"{}"),u=a.useMemo(()=>v.reduce((t,r)=>({...t,[r.category]:Number(t[r.category]||0)+Number(r.invoiceValue||0)}),we),[v]),k=a.useMemo(()=>({internetTotal:Number(B.internetTotal||0)+u.internetTotal,elecTotal:Number(B.elecTotal||0)+u.elecTotal,waterTotal:Number(B.waterTotal||0)+u.waterTotal,phoneTotal:Number(B.phoneTotal||0)+u.phoneTotal}),[B,u]),R=ve(k),c=a.useMemo(()=>[...o,...v].map(Te),[o,v]),n=a.useMemo(()=>{const t=new Map;return c.forEach((r,l)=>{const h=String(r.customerName||"-"),H=String(r.customerNumber||"-"),G=`${h}::${H}`,A=t.get(G);if(A){A.rows.push(r);return}t.set(G,{key:`${G}::${l}`,customerName:h,customerNumber:H,rows:[r]})}),Array.from(t.values())},[c]),i=Number(p.value),C=!!p.category&&!!p.details.trim()&&Number.isFinite(i)&&i!==0,x=V!==null,s=()=>{z([]),w(W),N(""),f(""),F("")},g=()=>{x||(b.current=!1,s(),P())},S=async t=>{var r,l;E(t),F("");try{(await me({amount:R,employee:m.username,details:c,categoryTotals:k})).success&&(s(),d(),q(),P())}catch(h){F(((l=(r=h==null?void 0:h.response)==null?void 0:r.data)==null?void 0:l.message)||(h==null?void 0:h.message)||"تعذر حفظ الفاتورة")}finally{E(null),b.current=!1}},j=async t=>{t.preventDefault(),await S("save")},T=de.useReactToPrint({contentRef:_,pageStyle:`
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
`,onAfterPrint:()=>{b.current&&S("print")}}),O=()=>{x||(b.current=!0,T())},$=()=>{const t=new Date,r={year:"numeric",month:"2-digit",day:"2-digit",weekday:"long",hour:"2-digit",minute:"2-digit",second:"2-digit"};return t.toLocaleDateString("en-GB",r)},D=()=>{const t=Number(p.value),r=p.details.trim(),l=Y.find(h=>h.value===p.category);if(!l||!r||!Number.isFinite(t)||t===0){f("اختر التصنيف وأدخل القيمة والتفاصيل");return}f(""),z(h=>[...h,{id:`${Date.now()}-${h.length}`,category:p.category,customerDetails:l.label,customerName:r,customerNumber:"يدوي",invoiceNumber:"-",invoiceValue:t}]),w(W)},y=t=>{const r=t.target.value;N(r);const l=se[Number(r)],h=Number(l==null?void 0:l.value),H=String((l==null?void 0:l.details)||"").trim(),G=Y.find(A=>A.value===(l==null?void 0:l.category));if(!l||!G||!H||!Number.isFinite(h)||h===0){f("اختر التصنيف وأدخل القيمة والتفاصيل"),N("");return}f(""),z(A=>[...A,{id:`${Date.now()}-${A.length}`,category:G.value,customerDetails:G.label,customerName:H,customerNumber:"يدوي",invoiceNumber:"-",invoiceValue:h}]),N("")},K=t=>{z(r=>r.filter(l=>l.id!==t))};return X?ne.createPortal(e.jsx("div",{className:"fixed inset-0 z-[100] flex bg-black/60 sm:items-center sm:justify-center sm:p-2",children:e.jsxs("div",{className:"flex h-[100svh] w-screen flex-col overflow-hidden bg-background shadow-2xl sm:h-[calc(100svh-1rem)] sm:w-[calc(100vw-1rem)] sm:rounded-lg sm:border lg:max-h-[calc(100svh-1rem)] lg:max-w-[1180px]",dir:"rtl",children:[e.jsxs("div",{className:"flex shrink-0 items-center justify-between gap-3 border-b bg-muted/30 px-4 py-3 sm:px-5",children:[e.jsxs("div",{className:"min-w-0",children:[e.jsx("h2",{className:"text-lg font-bold text-foreground sm:text-xl",children:"تأكيد الفواتير"}),e.jsx("p",{className:"hidden text-sm text-muted-foreground sm:block",children:"مراجعة الفاتورة وإضافة أي سطر يدوي قبل الحفظ"})]}),e.jsx("button",{"aria-label":"إغلاق",className:"inline-flex h-9 w-9 items-center justify-center rounded-md border bg-background text-muted-foreground hover:bg-muted disabled:opacity-50",disabled:x,onClick:g,type:"button",children:e.jsx(oe,{className:"h-4 w-4"})})]}),e.jsxs("form",{className:"flex min-h-0 flex-1 flex-col overflow-hidden",onSubmit:j,children:[e.jsx("div",{className:"min-h-0 flex-1 overflow-y-auto p-2 sm:p-3 lg:p-4",children:e.jsxs("div",{className:"grid min-w-0 gap-3 lg:grid-cols-[minmax(0,1fr)_360px]",children:[e.jsxs("div",{className:"order-2 min-w-0 bg-white lg:order-1",children:[e.jsxs("div",{ref:Z,className:"mx-auto max-w-full rounded-md border bg-white p-3 text-gray-950 shadow-sm print:border-0 print:shadow-none sm:p-4 lg:max-w-3xl",children:[e.jsxs("div",{className:"header text-center font-bold",children:[e.jsx("span",{className:"block text-lg",children:"Daher.Net"}),e.jsx("span",{className:"block text-sm",children:$()})]}),e.jsx("div",{className:"mt-4 max-w-full overflow-x-auto text-right",children:c.length>0?e.jsxs("table",{className:"w-full min-w-[560px] border-collapse text-sm",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"border bg-gray-100",children:[e.jsx("th",{className:"px-2 py-2",children:"نوع الفاتورة"}),e.jsx("th",{className:"px-2 py-2",children:"الاسم"}),e.jsx("th",{className:"px-2 py-2",children:"الرقم"}),e.jsx("th",{className:"px-2 py-2",children:"الدورة"}),e.jsx("th",{className:"px-2 py-2",children:"المبلغ"})]})}),e.jsx("tbody",{children:c.map((t,r)=>e.jsxs("tr",{className:"border-b",children:[e.jsx("td",{className:"px-2 py-2",children:t.customerDetails||"-"}),e.jsx("td",{className:"px-2 py-2",children:t.customerName||"-"}),e.jsx("td",{className:"px-2 py-2",children:t.customerNumber||"-"}),e.jsx("td",{className:"px-2 py-2",children:t.invoiceNumber||"-"}),e.jsx("td",{className:"px-2 py-2 font-bold",children:J(t.invoiceValue)})]},`${t.id||t.customerNumber||"row"}-${r}`))})]}):e.jsx("div",{className:"rounded-md border border-dashed p-6 text-center text-sm text-muted-foreground",children:"لا توجد فواتير محددة"})}),e.jsxs("div",{className:"totalValue mt-4 flex items-center justify-between border-t pt-3",children:[e.jsx("span",{children:"المجموع"}),e.jsx("span",{children:J(R)})]})]}),e.jsxs("div",{ref:_,className:"receipt-print fixed left-[-10000px] top-0 bg-white text-gray-950",dir:"rtl",children:[e.jsxs("div",{className:"receipt-header",children:[e.jsx("span",{children:"Daher.Net"}),e.jsx("span",{children:$()})]}),e.jsx("div",{className:"receipt-section",children:n.length>0?n.map(t=>e.jsxs("div",{className:"receipt-group",children:[e.jsxs("div",{className:"receipt-customer",children:[e.jsx("span",{children:t.customerName}),e.jsx("span",{className:"receipt-customer-number",children:t.customerNumber})]}),t.rows.map((r,l)=>e.jsxs("div",{className:"receipt-row",children:[e.jsx("span",{children:r.customerDetails||"-"}),e.jsx("span",{className:"receipt-cycle",children:r.invoiceNumber||"-"}),e.jsx("span",{className:"receipt-amount",children:J(r.invoiceValue)})]},`${r.id||r.invoiceNumber||"print-row"}-${l}`))]},t.key)):e.jsx("div",{className:"receipt-row text-center font-bold",children:"Ù„Ø§ ØªÙˆØ¬Ø¯ ÙÙˆØ§ØªÙŠØ± Ù…Ø­Ø¯Ø¯Ø©"})}),e.jsx("div",{className:"receipt-section",children:Y.map(t=>e.jsxs("div",{className:"receipt-total-line",children:[e.jsx("span",{children:t.label}),e.jsx("span",{children:J(k[t.value])})]},t.value))}),e.jsxs("div",{className:"receipt-total-line receipt-grand-total",children:[e.jsx("span",{children:"المجموع"}),e.jsx("span",{children:J(R)})]})]})]}),e.jsx("aside",{className:"no-print order-1 min-w-0 rounded-md border bg-muted/20 p-3 lg:order-2 lg:p-4",children:e.jsxs("div",{className:"space-y-4",children:[e.jsxs("section",{className:"rounded-md border bg-background p-3 sm:p-4",children:[e.jsx("p",{className:"text-sm font-semibold text-muted-foreground",children:"المجموع النهائي"}),e.jsx("p",{className:"mt-1 text-3xl font-extrabold text-primary",children:J(R)})]}),e.jsxs("section",{className:"space-y-3",children:[e.jsx("h3",{className:"text-sm font-bold",children:"الإجماليات حسب التصنيف"}),e.jsx("div",{className:"grid grid-cols-2 gap-2",children:Y.map(t=>e.jsxs("div",{className:`rounded-md border p-3 ${t.color}`,children:[e.jsx("p",{className:"text-xs font-semibold",children:t.label}),e.jsx("p",{className:"mt-1 text-lg font-extrabold",children:J(k[t.value])})]},t.value))})]}),e.jsxs("section",{className:"space-y-3 rounded-md border bg-background p-3 sm:p-4",children:[e.jsx("h3",{className:"text-sm font-bold",children:"إضافة سطر يدوي"}),e.jsxs("div",{className:"space-y-3",children:[e.jsxs("div",{className:"space-y-1",children:[e.jsx("label",{className:"text-xs font-medium text-muted-foreground",children:"اختصار جاهز"}),e.jsxs("select",{className:"h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm",value:L,onChange:y,children:[e.jsx("option",{value:"",children:"اختر اختصار للإضافة السريعة"}),se.map((t,r)=>e.jsxs("option",{value:r,children:[t.label," - ",J(t.value)]},`${t.label}-${r}`))]})]}),e.jsxs("div",{className:"space-y-1",children:[e.jsx("label",{className:"text-xs font-medium text-muted-foreground",children:"التصنيف"}),e.jsxs("select",{className:"h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm",value:p.category,onChange:t=>w(r=>({...r,category:t.target.value})),children:[e.jsx("option",{value:"",children:"اختر التصنيف"}),Y.map(t=>e.jsx("option",{value:t.value,children:t.label},t.value))]})]}),e.jsxs("div",{className:"space-y-1",children:[e.jsx("label",{className:"text-xs font-medium text-muted-foreground",children:"القيمة"}),e.jsx("input",{className:"h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm",onChange:t=>w(r=>({...r,value:t.target.value})),placeholder:"0",type:"number",value:p.value})]}),e.jsxs("div",{className:"space-y-1",children:[e.jsx("label",{className:"text-xs font-medium text-muted-foreground",children:"التفاصيل"}),e.jsx("input",{className:"h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm",onChange:t=>w(r=>({...r,details:t.target.value})),placeholder:"مثال: فرق فاتورة",type:"text",value:p.details})]}),U&&e.jsx("p",{className:"text-sm text-destructive",children:U}),e.jsxs("button",{className:"inline-flex h-10 w-full items-center justify-center gap-2 rounded-md bg-primary px-4 text-sm font-bold text-primary-foreground hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50",disabled:!C,onClick:D,type:"button",children:[e.jsx(he,{className:"h-4 w-4"}),"إضافة السطر"]})]})]}),v.length>0&&e.jsxs("section",{className:"space-y-3",children:[e.jsx("h3",{className:"text-sm font-bold",children:"الأسطر اليدوية"}),e.jsx("div",{className:"space-y-2",children:v.map(t=>e.jsxs("div",{className:"flex items-center gap-3 rounded-md border bg-background p-3",children:[e.jsxs("div",{className:"min-w-0 flex-1",children:[e.jsx("p",{className:"truncate text-sm font-bold",children:t.customerName}),e.jsxs("p",{className:"text-xs text-muted-foreground",children:[t.customerDetails," - ",J(t.invoiceValue)]})]}),e.jsx("button",{"aria-label":"حذف السطر",className:"inline-flex h-8 w-8 items-center justify-center rounded-md bg-destructive text-destructive-foreground hover:bg-destructive/90",onClick:()=>K(t.id),type:"button",children:e.jsx(pe,{className:"h-4 w-4"})})]},t.id))})]}),Q&&e.jsx("p",{className:"rounded-md border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive",children:Q})]})})]})}),e.jsxs("div",{className:"no-print flex shrink-0 flex-wrap gap-2 border-t bg-background p-3 sm:p-4",children:[e.jsxs("button",{className:"inline-flex h-10 min-w-[8rem] flex-1 items-center justify-center gap-2 rounded-md bg-primary px-4 text-sm font-bold text-primary-foreground hover:bg-primary/90 disabled:opacity-60",disabled:x,type:"submit",children:[e.jsx(ge,{className:"h-4 w-4"}),V==="save"?"جاري الحفظ...":"Save"]}),e.jsxs("button",{className:"inline-flex h-10 min-w-[8rem] flex-1 items-center justify-center gap-2 rounded-md bg-accent px-4 text-sm font-bold text-accent-foreground hover:bg-accent/90 disabled:opacity-60",disabled:x,onClick:O,type:"button",children:[e.jsx(be,{className:"h-4 w-4"}),V==="print"?"جاري الحفظ...":"Print"]}),e.jsx("button",{className:"inline-flex h-10 min-w-[6rem] flex-1 items-center justify-center rounded-md border px-4 text-sm font-bold hover:bg-muted disabled:opacity-60 sm:flex-none",disabled:x,onClick:g,type:"button",children:"Close"})]})]})]})}),document.body):null}function Fe(){const[d,o]=a.useState();a.useEffect(()=>{const M=JSON.parse(localStorage.getItem("DaherUser")||"null");o(M)},[]);const[X,P]=a.useState(!1),[q,B]=a.useState(0),[Z,_]=a.useState(""),[b,V]=a.useState({PhNumber:""}),[E,p]=a.useState(!1),[w,L]=a.useState(0),[N,v]=a.useState(0),[z,U]=a.useState(0),[f,Q]=a.useState(0),[F,m]=a.useState(0),[u,k]=a.useState([]),[R,c]=a.useState(0),[n,i]=a.useState(0),[C,x]=a.useState(0),[s,g]=a.useState(0),[S,j]=a.useState(!1),T=()=>j(!1),O=()=>j(!0),$=()=>T(),[D,y]=a.useState(!1),[K,t]=a.useState("pay"),r=()=>y(!1),l=()=>{r()},[h,H]=a.useState(!1),G=le();ce({mutationFn:M=>ue(M),onSuccess:()=>{te.success("تمت إضافة الدفعة."),G.invalidateQueries({queryKey:["balance-table"]}),B(0),_(""),P(!1)},onError:()=>{te.error("حدث خطأ أثناء الإرسال.")}});const A=()=>{L(0),v(0),Q(0),U(0),k([]),i([]),c([]),g([]),x([])},ee=async()=>{if(b!=null&&b.PhNumber){H(!0);try{const M=await I.post("https://server-uvnz.onrender.com/search",b);i(M.data.elecOriginalRows),c(M.data.elecMatchingRows),g(M.data.internetOriginalRows),x(M.data.internetMatchingRows)}catch(M){console.error(M)}finally{H(!1)}}};return a.useEffect(()=>{m(Number(w)+Number(N)+Number(z)+Number(f))},[w,N,z,f]),e.jsxs(e.Fragment,{children:[e.jsx(ie,{children:e.jsx("div",{className:"space-y-6",children:e.jsxs("div",{className:"flex-col w-full",children:[e.jsxs("div",{className:"sticky top-0 z-30 py-3 shadow bg-foreground/10 flex flex-wrap justify-center mt-4 select-none",children:[e.jsxs("div",{className:"flex shadow-[0px_0px_4px] shadow-accent-400 mr-5 rounded-lg text-text-950",children:[e.jsx("button",{onClick:()=>{O(),u.length>0},className:"text-center text-lg p-2 border-r rounded-l-lg border-text-950 bg-accent-200 hover:bg-accent-300 text-accent-foreground font-bold",children:"انهاء"}),e.jsx("div",{className:"text-center text-xl p-2 rounded-r-lg",children:F})]}),e.jsx("input",{type:"text",placeholder:"بحث برقم الهاتف",className:"p-2 rounded-l-lg w-60 text-center bg-background text-text-900 shadow-md outline-none border border-primary-500",value:b.PhNumber,onChange:M=>{V({PhNumber:M.target.value})},onKeyDown:M=>{M.key==="Enter"&&(M.preventDefault(),p(!0),ee(),A())}}),e.jsx("button",{onClick:()=>{p(!0),ee(),A()},className:"p-2 rounded-r-lg bg-primary-500 text-white font-bold",children:"بحث"})]}),e.jsxs("div",{className:"bg-foreground/5 p-1",children:[e.jsx(ye,{loading:h,internetOriginalRows:s,internetMatchingRows:C,finalTable:u,setFinalTable:k,searchText:b,work:E,setWork:p,internetTotal:w,setInternetTotal:L}),e.jsx(Ne,{loading:h,elecOriginalRows:n,elecMatchingRows:R,finalTable:u,setFinalTable:k,searchText:b,work:E,setWork:p,elecTotal:N,setElecTotal:v,phoneTotal:z,setPhoneTotal:U,waterTotal:f,setWaterTotal:Q})]}),e.jsx("div",{className:"w-80 m-auto rounded-lg px-6 py-3",children:e.jsx(fe,{finalTable:u})}),e.jsx(De,{setTotalInvoices:m,clearAllTables:A,TotalInvoices:F,finalTable:u,isOpen:S,onClose:T,onSubmit:$,categoryTotals:{internetTotal:w,elecTotal:N,waterTotal:f,phoneTotal:z}})]})})}),e.jsx(xe,{payOrInv:K,isOpen:D,onClose:r,onSubmit:l})]})}export{Fe as default};
