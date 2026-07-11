import{s as ae,r as a,j as e,ab as I,ad as ne,ae as oe,u as le,d as ce,J as te,D as ie}from"./index-B7uxOWRq.js";import{l as de}from"./index-Cx8bD9tv.js";import{b as me,c as ue}from"./balance-B9FK2SYR.js";import{P as he}from"./plus-CLVtSZal.js";import{T as pe}from"./trash-2-BV48QWL4.js";import{P as be}from"./printer-CehlniJc.js";import{A as xe}from"./AddBalanceForm-_6I6hsJL.js";/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ge=ae("Save",[["path",{d:"M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",key:"1c8476"}],["path",{d:"M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7",key:"1ydtos"}],["path",{d:"M7 3v4a1 1 0 0 0 1 1h7",key:"t51u73"}]]);function ye({loading:m,internetMatchingRows:o,internetOriginalRows:X,finalTable:J,setFinalTable:q,searchText:K,work:Z,setWork:_,internetTotal:b,setInternetTotal:A}){const[E,p]=a.useState([]),[j,L]=a.useState([]),[y,w]=a.useState(null),z=Date.now(),U=new Date(z),[N,Q]=a.useState(["10/25","11/25","12/25","1/26","2/26","3/26","4/26","5/26","6/26","7/26","8/26","9/26","10/26","11/26","12/26","1/27","2/27","3/27","4/27","5/27","6/27","7/27"]);a.useEffect(()=>{o.length>0?(p(o),L(X),_(!1)):(p([]),L([]),_(!1))},[o]);const V=(u,h,v)=>{I.post("https://server-uvnz.onrender.com/update",{row:u,col:h,value:v}).then(D=>{}).catch(D=>{console.error("Error updating data:",D)})};return m?e.jsx("div",{className:"flex items-center justify-center",children:e.jsx("div",{})}):y?e.jsx("div",{className:"m-6 w-full text-red-500",children:y}):e.jsxs("div",{className:"shadow-md shadow-foreground/30 p-4 m-3 border rounded-xl bg-background",dir:"rtl",children:[e.jsxs("div",{className:"flex justify-between items-center",children:[e.jsx("h2",{className:"text-center font-bold text-gray-900 text-xl my-4",children:"فواتير الإنترنت"}),e.jsx("div",{children:e.jsxs("p",{className:"font-bold text-text-950 p-2 rounded-lg shadow shadow-primary-400",children:["انترنت ",b]})})]}),e.jsx("div",{className:"w-full overflow-auto max-h-96 rounded-lg border border-gray-300",children:E.length>0?e.jsxs("table",{className:"w-full text-sm border-collapse",children:[e.jsx("thead",{className:"bg-gray-800 text-white text-center",children:e.jsxs("tr",{className:"max-h-2 leading-none border-xl border-primary-800",children:[e.jsx("th",{className:"border border-gray-600 px-1 py-2",children:"#"}),e.jsx("th",{className:"border border-gray-600 px-4 py-2 bg-gray-800 sticky right-[0px]",children:"رقم الهاتف"}),e.jsx("th",{className:"border border-gray-600 px-4 py-2 bg-gray-800 sticky right-[120px]",children:"اسم المشترك"}),e.jsx("th",{className:"border border-gray-600 px-1 py-2 bg-gray-800 sticky right-[240px]",children:"الشركة"}),e.jsx("th",{className:"border border-gray-600 px-1 py-2",children:"السرعة"}),e.jsx("th",{className:"border border-gray-600 px-1 py-2",children:"تاريخ التسديد"}),e.jsx("th",{className:"border border-gray-600 px-4 py-2 bg-gray-800 sticky right-[288px]",children:"الفاتورة الشهرية"}),e.jsx("th",{className:"border border-gray-600 px-4 py-2 bg-gray-800 sticky right-[400px]",children:"ملاحظات"}),N.map((u,h)=>e.jsxs(e.Fragment,{children:[e.jsx("th",{className:"border border-gray-600 px-4 py-2",children:u}),e.jsx("th",{className:"border border-gray-600 px-4 py-2",children:u}),e.jsx("th",{className:"border border-gray-600 px-4 py-2"})]}))]})}),e.jsx("tbody",{children:E.map((u,h)=>{const v=Object.values(u);return e.jsx("tr",{className:`even:bg-gray-100 transition-all\r
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
                                        `,"data-key":h,children:Array.from({length:50},(l,n)=>e.jsx("td",{className:"border border-gray-300",children:e.jsxs("div",{className:"flex",children:[e.jsx("input",{type:"text",value:v[n]||"",onChange:c=>{const R=[...E];R[h]={...R[h],[Object.keys(u)[n]||`field_${n}`]:c.target.value},p(R)},className:"p-1 w-32 bg-transparent outline-none text-center"}),e.jsx("button",{onClick:c=>{var C,f;const R=U.toLocaleDateString("en-US"),x=[...E];if(x[h][n]==R){const k=Object.keys(u)[n]||`field_${n}`,O=Object.keys(u)[n-1]||`field_${n-1}`;x[h]={...x[h],[O]:"",[k]:""},p(x),isNaN(v[n-1])||A(Number(b)-Number(v[n-1]));const $=(C=c.target.closest("tr"))==null?void 0:C.getAttribute("data-key");if($!=null){const F=j[$];var s=n,g="";V(F,s,g),s=n-1,g="",V(F,s,g)}const S={customerName:u[2],customerNumber:u[1],customerDetails:u[3],invoiceNumber:N[n/3-3],invoiceValue:u[6]};q(F=>F.filter(T=>!(T.customerName===S.customerName&&T.customerNumber===S.customerNumber&&T.customerDetails===S.customerDetails&&T.invoiceNumber===S.invoiceNumber&&T.invoiceValue===S.invoiceValue)))}else{const k=Object.keys(u)[n]||`field_${n}`,O=Object.keys(u)[n-1]||`field_${n-1}`,$=u[6];x[h]={...x[h],[O]:$,[k]:R},p(x),isNaN(v[n-1])||A(Number(b)+Number($));const S=(f=c.target.closest("tr"))==null?void 0:f.getAttribute("data-key");if(S!=null){const T=j[S];var s=n,g=R;V(T,s,g),s=n-1,g=$,V(T,s,g)}const F={category:"internetTotal",customerName:u[2],customerNumber:u[1],customerDetails:u[3],invoiceNumber:N[n/3-3],invoiceValue:u[6]};q([...J,F])}},className:`hover:bg-accent-600 w-4 ${Number(n+1)%3===1&&n>7?"bg-accent-400":"hidden"} ${u[n-1]?"bg-red-400 hover:bg-red-600":""}`,children:"+"})]})},n))},h)})})]}):e.jsx("p",{className:"text-center text-gray-500 py-4",children:"لم يتم العثور على أي فواتير."})})]})}function re(m){const o=String(m||"").toLowerCase();return o.includes("ÙƒÙ‡Ø±Ø¨")||o.includes("كهرب")?"elecTotal":o.includes("Ù…ÙŠØ§")||o.includes("ميا")?"waterTotal":o.includes("Ø§Ø±Ø¶")||o.includes("ارضي")||o.includes("أرضي")?"phoneTotal":"elecTotal"}function Ne({loading:m,elecMatchingRows:o,elecOriginalRows:X,finalTable:J,setFinalTable:q,searchText:K,work:Z,setWork:_,elecTotal:b,phoneTotal:A,waterTotal:E,setElecTotal:p,setPhoneTotal:j,setWaterTotal:L}){const[y,w]=a.useState([]),[z,U]=a.useState([]),[N,Q]=a.useState(null),V=Date.now(),u=new Date(V),[h,v]=a.useState(["1","1","1","1","1","1","1","1","1","1","1"]),D=(l,n,c)=>{I.post("https://server-uvnz.onrender.com/updateElec",{row:l,col:n,value:c}).then(R=>{}).catch(R=>{console.error("Error updating data:",R)})};return a.useEffect(()=>{o.length>0?(w(o),U(X),_(!1)):(w([]),U([]),_(!1))},[o]),m?e.jsx("div",{className:"flex items-center justify-center",children:e.jsx("div",{})}):N?e.jsx("div",{className:"m-6 w-full text-red-500",children:N}):e.jsxs("div",{className:"shadow-md shadow-foreground/30 p-4 m-3 border rounded-xl bg-background",dir:"rtl",children:[e.jsxs("div",{className:"flex justify-between items-center",children:[e.jsx("h2",{className:"text-right font-bold text-text-950 text-xl my-4 mr-2",children:"فواتير الخدمات الحكومية"}),e.jsxs("div",{className:"flex gap-5 items-right",children:[e.jsxs("p",{className:"font-bold text-text-950 p-2 rounded-lg shadow shadow-orange-400",children:["ارضي ",A]}),e.jsxs("p",{className:"font-bold text-text-950 p-2 rounded-lg shadow shadow-yellow-400",children:["كهرباء ",b]}),e.jsxs("p",{className:"font-bold text-text-950 p-2 rounded-lg shadow shadow-blue-400",children:["مياه ",E]})]})]}),e.jsx("div",{className:"w-full overflow-auto max-h-96 rounded-lg border border-gray-300",children:y.length>0?e.jsxs("table",{className:"w-full text-sm border-collapse",children:[e.jsx("thead",{className:"bg-gray-800 text-white text-center",children:e.jsxs("tr",{className:"max-h-4 leading-none border-xl border-primary-800",children:[e.jsx("th",{className:"border border-gray-600 px-1 sticky right-[0px] z-20 top-0 bg-gray-800",children:"#"}),e.jsx("th",{className:"border border-gray-600 px-2 sticky right-[47px] z-20 top-0 bg-gray-800",children:"نوع الفاتورة"}),e.jsx("th",{className:"border border-gray-600 px-2 sticky right-[165px] z-20 top-0 bg-gray-800"}),e.jsx("th",{className:"border border-gray-600 px-2 sticky right-[292px] z-20 top-0 bg-gray-800",children:"الرقم"}),h.map(l=>e.jsxs(e.Fragment,{children:[e.jsx("th",{className:"border border-gray-600 bg-primary-800"}),e.jsx("th",{className:"border border-gray-600 px-2 py-2 ",children:"الدورة"}),e.jsx("th",{className:"border border-gray-600 px-2 py-2 ",children:"قيمة الفاتورة"}),e.jsx("th",{className:"border border-gray-600 px-2 py-2 ",children:"المبلغ المقبوض"}),e.jsx("th",{className:"border border-gray-600 px-2 py-2 ",children:"تاريخ الدفع"}),e.jsx("th",{className:"border border-gray-600 px-2 py-2 ",children:"ملاحظات"})]}))]})}),e.jsx("tbody",{children:y.map((l,n)=>{const c=Object.values(l);return e.jsx("tr",{className:`transition-all duration-200 
                                        ${c[1].includes("ارضي")?"bg-orange-200/80":""}
                                        ${c[1].includes("كهربا")?"bg-yellow-200/80":""}
                                        ${c[1].includes("ميا")?"bg-blue-200/80":""}
                                        [&>*:nth-child(6n-1)>*:nth-child(1)>*]:w-1 [&>*:nth-child(1)>*>*]:w-12
                                        [&>*:nth-child(6n-1)>*>*]:w-20 [&>*:nth-child(6n-1)]:bg-primary-700 
                                        hover:bg-primary-100 [&>*:nth-child(6n)>*:nth-child(1)>*]:w-14
                                        [&>*:nth-child(-n+4)]:sticky [&>*:nth-child(-n+4)]:z-10
                                        [&>*:nth-child(-n+4)]:bg-background
                                        [&>*:nth-child(-n+4)]:font-bold

                                        [&>*:nth-child(1)]:right-0
                                        [&>*:nth-child(2)]:right-[47px]
                                        [&>*:nth-child(3)]:right-[165px]
                                        [&>*:nth-child(4)]:right-[292px]`,"data-key":n,children:Array.from({length:70},(x,s)=>e.jsx("td",{className:"border border-gray-300",children:e.jsxs("div",{className:"flex",children:[e.jsx("input",{type:"text",value:c[s]||"",onChange:g=>{const C=[...y];if(C[n]){const f=Object.keys(l)[s]||`field_${s}`;C[n]={...C[n],[f]:g.target.value},w(C)}},className:"p-1 w-32 bg-transparent outline-none text-center"}),e.jsx("button",{onClick:g=>{var $,S;const C=u.toLocaleDateString("en-US"),f=[...y];if(f[n][s]==C){const F=Object.keys(l)[s]||`field_${s}`,T=Object.keys(l)[s-1]||`field_${s-1}`;f[n]={...f[n],[T]:"",[F]:""},w(f),c[1].includes("ارضي")&&!isNaN(c[s-1])&&j(Number(A)-Number(c[s-1])),c[1].includes("كهربا")&&!isNaN(c[s-1])&&p(Number(b)-Number(c[s-1])),c[1].includes("ميا")&&!isNaN(c[s-1])&&L(Number(E)-Number(c[s-1]));const t=($=g.target.closest("tr"))==null?void 0:$.getAttribute("data-key");if(t!=null){const i=z[t];var k=s,O="";D(i,k,O),k=s-1,O="",D(i,k,O)}const r={category:re(l[1]),customerName:l[2],customerNumber:l[3],customerDetails:l[1],invoiceNumber:l[s-3],invoiceValue:l[s-2]};q(i=>i.filter(d=>!(d.customerName===r.customerName&&d.customerNumber===r.customerNumber&&d.customerDetails===r.customerDetails&&d.invoiceNumber===r.invoiceNumber&&d.invoiceValue===r.invoiceValue)))}else{const F=Object.keys(l)[s]||`field_${s}`,T=Object.keys(l)[s-1]||`field_${s-1}`,t=l[s-2];f[n]={...f[n],[T]:t,[F]:C},w(f),c[1].includes("ارضي")&&!isNaN(c[s-1])&&j(Number(A)+Number(t)),c[1].includes("كهربا")&&!isNaN(c[s-1])&&p(Number(b)+Number(t)),c[1].includes("ميا")&&!isNaN(c[s-1])&&L(Number(E)+Number(t));const r=(S=g.target.closest("tr"))==null?void 0:S.getAttribute("data-key");if(r!=null){const d=z[r];var k=s,O=C;D(d,k,O),k=s-1,O=t,D(d,k,O)}const i={category:re(l[1]),customerName:l[2],customerNumber:l[3],customerDetails:l[1],invoiceNumber:l[s-3],invoiceValue:l[s-2]};q([...J,i])}},className:`hover:bg-accent-600 w-4 ${s%6===2&&s>4?"bg-accent-500":"hidden"} ${l[s-1]?"bg-red-400 hover:bg-red-600":""}`,children:"+"})]})},s))},n)})})]}):e.jsx("p",{className:"text-center text-gray-500 py-4",children:"لم يتم العثور على أي فواتير."})})]})}function fe({finalTable:m}){return e.jsx(e.Fragment,{children:m.length>0?e.jsx("div",{className:"mt-5 text-center",dir:"rtl",children:e.jsxs("table",{className:"w-full text-text-900 shadow shadow-primary-900",children:[e.jsx("thead",{className:"border border-primary-400",children:e.jsxs("tr",{className:"border border-primary-400",children:[e.jsx("th",{className:"w-10 px-2",children:"نوع الفاتورة"}),e.jsx("th",{className:"w-10 px-2",children:"الاسم"}),e.jsx("th",{className:"w-10 px-2",children:"الرقم"}),e.jsx("th",{className:"w-10 px-2",children:"الدورة"}),e.jsx("th",{className:"w-10 px-2",children:"المبلغ"})]})}),e.jsx("tbody",{className:"",children:m.map(o=>e.jsxs("tr",{children:[e.jsx("td",{className:"w-10 py-1 px-2 border-primary-500",children:o.customerDetails}),e.jsx("td",{className:"w-10 py-1 px-2 border-primary-500",children:o.customerName}),e.jsx("td",{className:"w-10 py-1 px-2 border-primary-500",children:o.customerNumber}),e.jsx("td",{className:"w-10 py-1 px-2 border-primary-500",children:o.invoiceNumber}),e.jsx("td",{className:"w-10 py-1 px-2 border-primary-500",children:o.invoiceValue})]}))})]})}):e.jsx(e.Fragment,{})})}const je=[{label:"حسم 500",category:"internetTotal",value:-500,details:"Discount"},{label:"بخشيش 500",category:"phoneTotal",value:500,details:"زيادة"},{label:"باقة 5",category:"phoneTotal",value:3e3,details:"باقة 5"},{label:"باقة 10",category:"phoneTotal",value:5e3,details:"باقة 10"},{label:"باقة 20",category:"phoneTotal",value:7500,details:"باقة 20"},{label:"باقة 30",category:"phoneTotal",value:1e4,details:"باقة 30"},{label:"باقة 50",category:"phoneTotal",value:14e3,details:"باقة 50"},{label:"باقة 75",category:"phoneTotal",value:17e3,details:"باقة 75"},{label:"باقة 100",category:"phoneTotal",value:23e3,details:"باقة 100"},{label:"باقة 200",category:"phoneTotal",value:42e3,details:"باقة 200"}],Y=[{value:"internetTotal",label:"إنترنت",color:"border-sky-200 bg-sky-50 text-sky-800"},{value:"elecTotal",label:"كهرباء",color:"border-amber-200 bg-amber-50 text-amber-800"},{value:"waterTotal",label:"مياه",color:"border-cyan-200 bg-cyan-50 text-cyan-800"},{value:"phoneTotal",label:"أرضي",color:"border-orange-200 bg-orange-50 text-orange-800"}],se=je,W={category:"",value:"",details:""},we={internetTotal:0,elecTotal:0,waterTotal:0,phoneTotal:0};function G(m){return Number(m||0).toLocaleString("en-EG",{minimumFractionDigits:0})}function ve(m){return Number(m.internetTotal||0)+Number(m.elecTotal||0)+Number(m.waterTotal||0)+Number(m.phoneTotal||0)}function ke(m){return Y.some(o=>o.value===m)}function Se(m){if(ke(m.category))return m.category;const o=String(m.customerDetails||"").toLowerCase();if(o.includes("ÙƒÙ‡Ø±Ø¨")||o.includes("كهرب"))return"elecTotal";if(o.includes("Ù…ÙŠØ§")||o.includes("ميا"))return"waterTotal";if(o.includes("Ø§Ø±Ø¶")||o.includes("ارضي")||o.includes("أرضي"))return"phoneTotal"}function Te(m){const o=Se(m);return o?{...m,category:o}:m}function De({clearAllTables:m,finalTable:o,isOpen:X,onClose:J,onSubmit:q,categoryTotals:K}){const Z=a.useRef(null),_=a.useRef(null),b=a.useRef(!1),[A,E]=a.useState(null),[p,j]=a.useState(W),[L,y]=a.useState(""),[w,z]=a.useState([]),[U,N]=a.useState(""),[Q,V]=a.useState(""),u=JSON.parse(localStorage.getItem("DaherUser")||"{}"),h=a.useMemo(()=>w.reduce((t,r)=>({...t,[r.category]:Number(t[r.category]||0)+Number(r.invoiceValue||0)}),we),[w]),v=a.useMemo(()=>({internetTotal:Number(K.internetTotal||0)+h.internetTotal,elecTotal:Number(K.elecTotal||0)+h.elecTotal,waterTotal:Number(K.waterTotal||0)+h.waterTotal,phoneTotal:Number(K.phoneTotal||0)+h.phoneTotal}),[K,h]),D=ve(v),l=a.useMemo(()=>[...o,...w].map(Te),[o,w]),n=a.useMemo(()=>{const t=new Map;return l.forEach((r,i)=>{const d=String(r.customerName||"-"),H=String(r.customerNumber||"-"),B=`${d}::${H}`,P=t.get(B);if(P){P.rows.push(r);return}t.set(B,{key:`${B}::${i}`,customerName:d,customerNumber:H,rows:[r]})}),Array.from(t.values())},[l]),c=Number(p.value),R=!!p.category&&!!p.details.trim()&&Number.isFinite(c)&&c!==0,x=A!==null,s=()=>{z([]),j(W),y(""),N(""),V("")},g=()=>{x||(b.current=!1,s(),J())},C=async t=>{var r,i;E(t),V("");try{(await me({amount:D,employee:u.username,details:l,categoryTotals:v})).success&&(s(),m(),q(),J())}catch(d){V(((i=(r=d==null?void 0:d.response)==null?void 0:r.data)==null?void 0:i.message)||(d==null?void 0:d.message)||"تعذر حفظ الفاتورة")}finally{E(null),b.current=!1}},f=async t=>{t.preventDefault(),await C("save")},k=de.useReactToPrint({contentRef:_,pageStyle:`
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
`,onAfterPrint:()=>{b.current}}),O=()=>{x||(b.current=!0,k())},$=()=>{const t=new Date,r={year:"numeric",month:"2-digit",day:"2-digit",weekday:"long",hour:"2-digit",minute:"2-digit",second:"2-digit"};return t.toLocaleDateString("en-GB",r)},S=()=>{const t=Number(p.value),r=p.details.trim(),i=Y.find(d=>d.value===p.category);if(!i||!r||!Number.isFinite(t)||t===0){N("اختر التصنيف وأدخل القيمة والتفاصيل");return}N(""),z(d=>[...d,{id:`${Date.now()}-${d.length}`,category:p.category,customerDetails:i.label,customerName:r,customerNumber:"يدوي",invoiceNumber:"-",invoiceValue:t}]),j(W)},F=t=>{const r=t.target.value;y(r);const i=se[Number(r)],d=Number(i==null?void 0:i.value),H=String((i==null?void 0:i.details)||"").trim(),B=Y.find(P=>P.value===(i==null?void 0:i.category));if(!i||!B||!H||!Number.isFinite(d)||d===0){N("اختر التصنيف وأدخل القيمة والتفاصيل"),y("");return}N(""),z(P=>[...P,{id:`${Date.now()}-${P.length}`,category:B.value,customerDetails:B.label,customerName:H,customerNumber:"يدوي",invoiceNumber:"-",invoiceValue:d}]),y("")},T=t=>{z(r=>r.filter(i=>i.id!==t))};return X?ne.createPortal(e.jsx("div",{className:"fixed inset-0 z-[100] flex bg-black/60 sm:items-center sm:justify-center sm:p-2",children:e.jsxs("div",{className:"flex h-[100svh] w-screen flex-col overflow-hidden bg-background shadow-2xl sm:h-[calc(100svh-1rem)] sm:w-[calc(100vw-1rem)] sm:rounded-lg sm:border lg:max-h-[calc(100svh-1rem)] lg:max-w-[1180px]",dir:"rtl",children:[e.jsxs("div",{className:"flex shrink-0 items-center justify-between gap-3 border-b bg-muted/30 px-4 py-3 sm:px-5",children:[e.jsxs("div",{className:"min-w-0",children:[e.jsx("h2",{className:"text-lg font-bold text-foreground sm:text-xl",children:"تأكيد الفواتير"}),e.jsx("p",{className:"hidden text-sm text-muted-foreground sm:block",children:"مراجعة الفاتورة وإضافة أي سطر يدوي قبل الحفظ"})]}),e.jsx("button",{"aria-label":"إغلاق",className:"inline-flex h-9 w-9 items-center justify-center rounded-md border bg-background text-muted-foreground hover:bg-muted disabled:opacity-50",disabled:x,onClick:g,type:"button",children:e.jsx(oe,{className:"h-4 w-4"})})]}),e.jsxs("form",{className:"flex min-h-0 flex-1 flex-col overflow-hidden",onSubmit:f,children:[e.jsx("div",{className:"min-h-0 flex-1 overflow-y-auto p-2 sm:p-3 lg:p-4",children:e.jsxs("div",{className:"grid min-w-0 gap-3 lg:grid-cols-[minmax(0,1fr)_360px]",children:[e.jsxs("div",{className:"order-2 min-w-0 bg-white lg:order-1",children:[e.jsxs("div",{ref:Z,className:"mx-auto max-w-full rounded-md border bg-white p-3 text-gray-950 shadow-sm print:border-0 print:shadow-none sm:p-4 lg:max-w-3xl",children:[e.jsxs("div",{className:"header text-center font-bold",children:[e.jsx("span",{className:"block text-lg",children:"Daher.Net"}),e.jsx("span",{className:"block text-sm",children:$()})]}),e.jsx("div",{className:"mt-4 max-w-full overflow-x-auto text-right",children:l.length>0?e.jsxs("table",{className:"w-full min-w-[560px] border-collapse text-sm",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"border bg-gray-100",children:[e.jsx("th",{className:"px-2 py-2",children:"نوع الفاتورة"}),e.jsx("th",{className:"px-2 py-2",children:"الاسم"}),e.jsx("th",{className:"px-2 py-2",children:"الرقم"}),e.jsx("th",{className:"px-2 py-2",children:"الدورة"}),e.jsx("th",{className:"px-2 py-2",children:"المبلغ"})]})}),e.jsx("tbody",{children:l.map((t,r)=>e.jsxs("tr",{className:"border-b",children:[e.jsx("td",{className:"px-2 py-2",children:t.customerDetails||"-"}),e.jsx("td",{className:"px-2 py-2",children:t.customerName||"-"}),e.jsx("td",{className:"px-2 py-2",children:t.customerNumber||"-"}),e.jsx("td",{className:"px-2 py-2",children:t.invoiceNumber||"-"}),e.jsx("td",{className:"px-2 py-2 font-bold",children:G(t.invoiceValue)})]},`${t.id||t.customerNumber||"row"}-${r}`))})]}):e.jsx("div",{className:"rounded-md border border-dashed p-6 text-center text-sm text-muted-foreground",children:"لا توجد فواتير محددة"})}),e.jsxs("div",{className:"totalValue mt-4 flex items-center justify-between border-t pt-3",children:[e.jsx("span",{children:"المجموع"}),e.jsx("span",{children:G(D)})]})]}),e.jsxs("div",{ref:_,className:"receipt-print fixed left-[-10000px] top-0 bg-white text-gray-950",dir:"rtl",children:[e.jsxs("div",{className:"receipt-header",children:[e.jsx("span",{children:"Daher.Net"}),e.jsx("span",{children:$()})]}),e.jsx("div",{className:"receipt-section",children:n.length>0?n.map(t=>e.jsxs("div",{className:"receipt-group",children:[e.jsxs("div",{className:"receipt-customer",children:[e.jsx("span",{children:t.customerName}),e.jsx("span",{className:"receipt-customer-number",children:t.customerNumber})]}),t.rows.map((r,i)=>e.jsxs("div",{className:"receipt-row",children:[e.jsx("span",{children:r.customerDetails||"-"}),e.jsx("span",{className:"receipt-cycle",children:r.invoiceNumber||"-"}),e.jsx("span",{className:"receipt-amount",children:G(r.invoiceValue)})]},`${r.id||r.invoiceNumber||"print-row"}-${i}`))]},t.key)):e.jsx("div",{className:"receipt-row text-center font-bold",children:"Ù„Ø§ ØªÙˆØ¬Ø¯ ÙÙˆØ§ØªÙŠØ± Ù…Ø­Ø¯Ø¯Ø©"})}),e.jsx("div",{className:"receipt-section",children:Y.map(t=>e.jsxs("div",{className:"receipt-total-line",children:[e.jsx("span",{children:t.label}),e.jsx("span",{children:G(v[t.value])})]},t.value))}),e.jsxs("div",{className:"receipt-total-line receipt-grand-total",children:[e.jsx("span",{children:"المجموع"}),e.jsx("span",{children:G(D)})]})]})]}),e.jsx("aside",{className:"no-print order-1 min-w-0 rounded-md border bg-muted/20 p-3 lg:order-2 lg:p-4",children:e.jsxs("div",{className:"space-y-4",children:[e.jsxs("section",{className:"rounded-md border bg-background p-3 sm:p-4",children:[e.jsx("p",{className:"text-sm font-semibold text-muted-foreground",children:"المجموع النهائي"}),e.jsx("p",{className:"mt-1 text-3xl font-extrabold text-primary",children:G(D)})]}),e.jsxs("section",{className:"space-y-3",children:[e.jsx("h3",{className:"text-sm font-bold",children:"الإجماليات حسب التصنيف"}),e.jsx("div",{className:"grid grid-cols-2 gap-2",children:Y.map(t=>e.jsxs("div",{className:`rounded-md border p-3 ${t.color}`,children:[e.jsx("p",{className:"text-xs font-semibold",children:t.label}),e.jsx("p",{className:"mt-1 text-lg font-extrabold",children:G(v[t.value])})]},t.value))})]}),e.jsxs("section",{className:"space-y-3 rounded-md border bg-background p-3 sm:p-4",children:[e.jsx("h3",{className:"text-sm font-bold",children:"إضافة سطر يدوي"}),e.jsxs("div",{className:"space-y-3",children:[e.jsxs("div",{className:"space-y-1",children:[e.jsx("label",{className:"text-xs font-medium text-muted-foreground",children:"اختصار جاهز"}),e.jsxs("select",{className:"h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm",value:L,onChange:F,children:[e.jsx("option",{value:"",children:"اختر اختصار للإضافة السريعة"}),se.map((t,r)=>e.jsxs("option",{value:r,children:[t.label," - ",G(t.value)]},`${t.label}-${r}`))]})]}),e.jsxs("div",{className:"space-y-1",children:[e.jsx("label",{className:"text-xs font-medium text-muted-foreground",children:"التصنيف"}),e.jsxs("select",{className:"h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm",value:p.category,onChange:t=>j(r=>({...r,category:t.target.value})),children:[e.jsx("option",{value:"",children:"اختر التصنيف"}),Y.map(t=>e.jsx("option",{value:t.value,children:t.label},t.value))]})]}),e.jsxs("div",{className:"space-y-1",children:[e.jsx("label",{className:"text-xs font-medium text-muted-foreground",children:"القيمة"}),e.jsx("input",{className:"h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm",onChange:t=>j(r=>({...r,value:t.target.value})),placeholder:"0",type:"number",value:p.value})]}),e.jsxs("div",{className:"space-y-1",children:[e.jsx("label",{className:"text-xs font-medium text-muted-foreground",children:"التفاصيل"}),e.jsx("input",{className:"h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm",onChange:t=>j(r=>({...r,details:t.target.value})),placeholder:"مثال: فرق فاتورة",type:"text",value:p.details})]}),U&&e.jsx("p",{className:"text-sm text-destructive",children:U}),e.jsxs("button",{className:"inline-flex h-10 w-full items-center justify-center gap-2 rounded-md bg-primary px-4 text-sm font-bold text-primary-foreground hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50",disabled:!R,onClick:S,type:"button",children:[e.jsx(he,{className:"h-4 w-4"}),"إضافة السطر"]})]})]}),w.length>0&&e.jsxs("section",{className:"space-y-3",children:[e.jsx("h3",{className:"text-sm font-bold",children:"الأسطر اليدوية"}),e.jsx("div",{className:"space-y-2",children:w.map(t=>e.jsxs("div",{className:"flex items-center gap-3 rounded-md border bg-background p-3",children:[e.jsxs("div",{className:"min-w-0 flex-1",children:[e.jsx("p",{className:"truncate text-sm font-bold",children:t.customerName}),e.jsxs("p",{className:"text-xs text-muted-foreground",children:[t.customerDetails," - ",G(t.invoiceValue)]})]}),e.jsx("button",{"aria-label":"حذف السطر",className:"inline-flex h-8 w-8 items-center justify-center rounded-md bg-destructive text-destructive-foreground hover:bg-destructive/90",onClick:()=>T(t.id),type:"button",children:e.jsx(pe,{className:"h-4 w-4"})})]},t.id))})]}),Q&&e.jsx("p",{className:"rounded-md border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive",children:Q})]})})]})}),e.jsxs("div",{className:"no-print flex shrink-0 flex-wrap gap-2 border-t bg-background p-3 sm:p-4",children:[e.jsxs("button",{className:"inline-flex h-10 min-w-[8rem] flex-1 items-center justify-center gap-2 rounded-md bg-primary px-4 text-sm font-bold text-primary-foreground hover:bg-primary/90 disabled:opacity-60",disabled:x,type:"submit",children:[e.jsx(ge,{className:"h-4 w-4"}),A==="save"?"جاري الحفظ...":"Save"]}),e.jsxs("button",{className:"inline-flex h-10 min-w-[8rem] flex-1 items-center justify-center gap-2 rounded-md bg-accent px-4 text-sm font-bold text-accent-foreground hover:bg-accent/90 disabled:opacity-60",disabled:x,onClick:O,type:"button",children:[e.jsx(be,{className:"h-4 w-4"}),A==="print"?"جاري الحفظ...":"Print"]}),e.jsx("button",{className:"inline-flex h-10 min-w-[6rem] flex-1 items-center justify-center rounded-md border px-4 text-sm font-bold hover:bg-muted disabled:opacity-60 sm:flex-none",disabled:x,onClick:g,type:"button",children:"Close"})]})]})]})}),document.body):null}function Fe(){const[m,o]=a.useState();a.useEffect(()=>{const M=JSON.parse(localStorage.getItem("DaherUser")||"null");o(M)},[]);const[X,J]=a.useState(!1),[q,K]=a.useState(0),[Z,_]=a.useState(""),[b,A]=a.useState({PhNumber:""}),[E,p]=a.useState(!1),[j,L]=a.useState(0),[y,w]=a.useState(0),[z,U]=a.useState(0),[N,Q]=a.useState(0),[V,u]=a.useState(0),[h,v]=a.useState([]),[D,l]=a.useState(0),[n,c]=a.useState(0),[R,x]=a.useState(0),[s,g]=a.useState(0),[C,f]=a.useState(!1),k=()=>f(!1),O=()=>f(!0),$=()=>k(),[S,F]=a.useState(!1),[T,t]=a.useState("pay"),r=()=>F(!1),i=()=>{r()},[d,H]=a.useState(!1),B=le();ce({mutationFn:M=>ue(M),onSuccess:()=>{te.success("تمت إضافة الدفعة."),B.invalidateQueries({queryKey:["balance-table"]}),K(0),_(""),J(!1)},onError:()=>{te.error("حدث خطأ أثناء الإرسال.")}});const P=()=>{L(0),w(0),Q(0),U(0),v([]),c([]),l([]),g([]),x([])},ee=async()=>{if(b!=null&&b.PhNumber){H(!0);try{const M=await I.post("https://server-uvnz.onrender.com/search",b);c(M.data.elecOriginalRows),l(M.data.elecMatchingRows),g(M.data.internetOriginalRows),x(M.data.internetMatchingRows)}catch(M){console.error(M)}finally{H(!1)}}};return a.useEffect(()=>{u(Number(j)+Number(y)+Number(z)+Number(N))},[j,y,z,N]),e.jsxs(e.Fragment,{children:[e.jsx(ie,{children:e.jsx("div",{className:"space-y-6",children:e.jsxs("div",{className:"flex-col w-full",children:[e.jsxs("div",{className:"sticky top-0 z-30 py-3 shadow bg-foreground/10 flex flex-wrap justify-center mt-4 select-none",children:[e.jsxs("div",{className:"flex shadow-[0px_0px_4px] shadow-accent-400 mr-5 rounded-lg text-text-950",children:[e.jsx("button",{onClick:()=>{O(),h.length>0},className:"text-center text-lg p-2 border-r rounded-l-lg border-text-950 bg-accent-200 hover:bg-accent-300 text-accent-foreground font-bold",children:"انهاء"}),e.jsx("div",{className:"text-center text-xl p-2 rounded-r-lg",children:V})]}),e.jsx("input",{type:"text",placeholder:"بحث برقم الهاتف",className:"p-2 rounded-l-lg w-60 text-center bg-background text-text-900 shadow-md outline-none border border-primary-500",value:b.PhNumber,onChange:M=>{A({PhNumber:M.target.value})},onKeyDown:M=>{M.key==="Enter"&&(M.preventDefault(),p(!0),ee(),P())}}),e.jsx("button",{onClick:()=>{p(!0),ee(),P()},className:"p-2 rounded-r-lg bg-primary-500 text-white font-bold",children:"بحث"})]}),e.jsxs("div",{className:"bg-foreground/5 p-1",children:[e.jsx(ye,{loading:d,internetOriginalRows:s,internetMatchingRows:R,finalTable:h,setFinalTable:v,searchText:b,work:E,setWork:p,internetTotal:j,setInternetTotal:L}),e.jsx(Ne,{loading:d,elecOriginalRows:n,elecMatchingRows:D,finalTable:h,setFinalTable:v,searchText:b,work:E,setWork:p,elecTotal:y,setElecTotal:w,phoneTotal:z,setPhoneTotal:U,waterTotal:N,setWaterTotal:Q})]}),e.jsx("div",{className:"w-80 m-auto rounded-lg px-6 py-3",children:e.jsx(fe,{finalTable:h})}),e.jsx(De,{setTotalInvoices:u,clearAllTables:P,TotalInvoices:V,finalTable:h,isOpen:C,onClose:k,onSubmit:$,categoryTotals:{internetTotal:j,elecTotal:y,waterTotal:N,phoneTotal:z}})]})})}),e.jsx(xe,{payOrInv:T,isOpen:S,onClose:r,onSubmit:i})]})}export{Fe as default};
