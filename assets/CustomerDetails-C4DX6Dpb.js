import{c as q,r as a,j as e,z as W,i as X,D as z,w as Z,x as V,B as g,C as H,m as _,n as $,o as ee,A as te}from"./index-BgRxtkYi.js";import{S as J}from"./skeleton-ImV4IAuq.js";import{u as ae,b as se,c as re,d as ne,e as le}from"./wifi-30FRJhSg.js";import{l as ie}from"./index-t9ePD9xs.js";import{L as oe,A as ce,D as de,d as ue}from"./DatePicker-h6Fhomyc.js";import{a as me}from"./dealer-Br3bPaqj.js";import{A as he}from"./arrow-left-BTpYWzlv.js";import{P as U}from"./plus-ChqgN25X.js";/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const xe=q("Printer",[["path",{d:"M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2",key:"143wyd"}],["path",{d:"M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6",key:"1itne7"}],["rect",{x:"6",y:"14",width:"12",height:"8",rx:"1",key:"1ue0tg"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const pe=q("RefreshCw",[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",key:"v9h5vc"}],["path",{d:"M21 3v5h-5",key:"1q7to0"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",key:"3uifl3"}],["path",{d:"M8 16H3v5",key:"1cv678"}]]);function fe({customer:n,setCustomer:v}){const[d,r]=a.useState(n),[u,p]=a.useState(!1),N=(s,o)=>{v(m=>{const C={...m,[s]:o};return p(JSON.stringify(C)!==JSON.stringify(d)),C})},w=async()=>{try{const s=await ae(n.id,n);r(n),p(!1),alert("تم حفظ التعديلات!")}catch(s){console.log(s),alert("حدث خطأ أثناء حفظ التعديلات")}},f=s=>({Name:"الاسم",UserName:"اسم المستخدم",Password:"كلمة السر",Balance:"الرصيد",SubscriptionSpeed:"السرعة",MonthlyFee:"قيمة الاشتراك",Contact:"الهاتف",sender:"المرسل",location:"الموقع"})[s]||s;return a.useEffect(()=>{r(n)},[n]),e.jsxs("div",{children:[Object.entries(n).map(([s,o])=>s=="id"?e.jsx(e.Fragment,{}):s=="createdAt"?e.jsxs("p",{className:"flex gap-2 relative group mb-4 items-end",children:[e.jsxs("label",{className:"block font-bold w-36",children:[f(s),":"]}),e.jsx("input",{type:"text",value:new Date(o).toLocaleString("en-GB"),className:"bg-transparent border-b-2 border-transparent focus:border-primary-500 outline-none transition-all w-full"}),e.jsx("span",{className:"absolute bottom-0 right-0 w-full h-[2px] bg-primary-500 scale-x-0 group-hover:scale-x-100 origin-right transition-transform duration-300"})]},s):e.jsxs("p",{className:"flex gap-2 relative group mb-4 items-end",children:[e.jsxs("label",{className:"block font-bold w-36",children:[f(s),":"]}),e.jsx("input",{type:"text",value:o,onChange:m=>N(s,m.target.value),className:"bg-transparent border-b-2 border-transparent focus:border-primary-500 outline-none transition-all w-full"}),e.jsx("span",{className:"absolute bottom-0 right-0 w-full h-[2px] bg-primary-500 scale-x-0 group-hover:scale-x-100 origin-right transition-transform duration-300"})]},s)),u&&e.jsx("button",{onClick:w,className:"mt-4 px-4 py-2 bg-accent-500 text-white rounded hover:bg-accent-600 transition-all",children:"حفظ التعديلات"})]})}function Se(){const{id:n}=W(),v=X(),d=JSON.parse(localStorage.getItem("DaherUser")),[r,u]=a.useState(null),[p,N]=a.useState([]),[w,f]=a.useState(!0),[s,o]=a.useState(!0),[m,C]=a.useState(1),S=8;Math.ceil(p.length/S);const T=p.slice((m-1)*S,m*S),[D,h]=a.useState(!1),[b,P]=a.useState(""),[k,L]=a.useState(!1),[j,M]=a.useState(),[x,R]=a.useState(0),[y,A]=a.useState(""),[E,B]=a.useState(!1);a.useEffect(()=>{(async()=>{f(!0);const c=await re(n);c.success&&u(c.data),f(!1)})()},[n]),a.useEffect(()=>{I()},[n]);const I=async()=>{o(!0);const t=await se(n);t.success&&N(t.data),o(!1)},G=async t=>{var c,Y;t.preventDefault(),B(!0);try{if(!x||!j||!y||!n){alert("يرجى ملء جميع الحقول المطلوبة"),B(!1);return}const i={amount:x,date:j?ue(j).format("YYYY-MM-DD"):"",details:y,subscriberID:n,total:Number(r.Balance)||0,dealer:d.role==="dealer"?d.username:void 0};let l;b==="اضافة فاتورة"?l=await ne(i):l=d.role==="dealer"?await me(i):await le(i),l!=null&&l.message&&l.message.includes("success")?(window.confirm("هل تريد طباعة إيصال؟")&&F(),alert("تمت الإضافة بنجاح"),h(!1),I(),M(null),R(0),A("")):(console.error("API Error Response:",l),alert((l==null?void 0:l.error)||"حدث خطأ أثناء الإرسال، يرجى المحاولة لاحقًا.")),u(b==="اضافة فاتورة"?{...r,Balance:r.Balance-x}:{...r,Balance:r.Balance+x})}catch(i){console.error("Exception in handleSubmit:",i),(Y=(c=i==null?void 0:i.response)==null?void 0:c.data)!=null&&Y.error?alert("خطأ: "+i.response.data.error):alert("حدث خطأ غير متوقع. يرجى التحقق من الاتصال أو المحاولة لاحقًا.")}finally{B(!1)}},O=a.useRef(),F=ie.useReactToPrint({contentRef:O,pageStyle:`
      @page {
        size: 80mm auto;
        margin: 0;
      }

      body {
        font-family: 'Arial', sans-serif;
        font-size: 12px;
        padding: 10px;
        color: black;
        direction: rtl;
      }

      .header {
        text-align: center;
        font-size: 14px;
        font-weight: bold;
        margin-bottom: 10px;
      }

      .totalValue {
        font-size: 18px;
        font-weight: bold;
        text-align: right;
        margin-top: 10px;
      }

      .cut {
        page-break-before: always;
        margin-top: 20px;
        text-align: center;
        font-style: italic;
      }

      div, span, p {
        break-inside: avoid;
      }

      .no-print {
        display: none !important;
      }
    `,onAfterPrint:()=>{console.log("تمت الطباعة بنجاح!"),h(!1)}}),K=()=>{const t=new Date,c={year:"numeric",month:"numeric",day:"numeric",weekday:"long",hour:"numeric",minute:"numeric",second:"numeric"};return t.toLocaleDateString("en-GB",c)};if(a.useEffect(()=>{D&&k&&F()},[k,D]),w||!r)return e.jsx(z,{children:e.jsx(J,{className:"h-64 w-full"})});const Q=[{key:"amount",label:"الكمية",sortable:!0},{key:"Details",label:"التفاصيل",sortable:!0},{key:"date",label:"الوقت",sortable:!0}];return e.jsxs(z,{children:[e.jsx(Z,{isOpen:D,setIsOpen:h,title:b,trigger:e.jsx(e.Fragment,{}),children:e.jsxs("div",{className:"flex flex-row-reverse gap-2",children:[k?e.jsx(e.Fragment,{}):e.jsxs("form",{onSubmit:G,className:"space-y-4 w-2/3",children:[e.jsx(V,{value:x,onChange:t=>R(Number(t.target.value)),type:"number",placeholder:"القيمة بالدولار",required:!0}),e.jsx(oe,{dateAdapter:ce,children:e.jsx(de,{className:"w-full",label:"اختر التاريخ",value:j,onChange:t=>M(t),format:"DD/MM/YYYY"})}),e.jsx(V,{value:y,onChange:t=>A(t.target.value),type:"text",placeholder:"تفاصيل (اختياري)"}),e.jsx("button",{disabled:!!E,type:"submit",className:"w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition",children:E?"جاري حفظ التعديلات ...":"إرسال"})]}),e.jsxs("div",{ref:O,className:"p-4 text-sm",dir:"rtl",children:[e.jsxs("div",{className:"header",children:[e.jsx("h1",{children:"Daher.Net"}),e.jsx("span",{children:K()})]}),e.jsxs("div",{className:"text-right font-bold mb-2",children:[e.jsxs("div",{children:["اسم المشترك: ",(r==null?void 0:r.Name)||"غير معروف"]}),e.jsxs("div",{children:["الرقم: ",r==null?void 0:r.Contact]})]}),e.jsxs("div",{className:"text-right mb-2",children:[e.jsx("div",{className:"font-semibold",children:"التفاصيل:"}),e.jsx("div",{className:"border p-1 rounded",children:y||"بدون ملاحظات"})]}),e.jsx("div",{className:"text-right totalValue mt-4",children:e.jsxs("div",{className:"text-lg font-extrabold border-t pt-2",children:[b=="اضافة دفعة"?"المبلغ المدفوع":"المبلغ المطلوب",": ",x," دولار"]})}),e.jsx("div",{className:"cut mt-4 border-t pt-2 text-center text-xs",children:"-- شكراً لثقتكم بخدماتنا --"})]})]})}),e.jsxs("div",{className:"space-y-6",dir:"rtl",children:[e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsx("h1",{className:"text-3xl font-bold",children:"بيانات المشترك"}),e.jsxs(g,{onClick:()=>v("/users"),variant:"outline",children:[e.jsx(he,{className:"ml-2 w-4 h-4"})," رجوع"]})]}),e.jsxs(H,{children:[e.jsx(_,{children:e.jsx($,{children:"المعلومات الأساسية"})}),e.jsx(ee,{className:"grid grid-cols-1 md:grid-cols-2 gap-4",children:e.jsx(fe,{customer:r,setCustomer:u})})]}),e.jsxs("div",{className:"flex justify-start gap-2",children:[d.role=="admin"&&e.jsxs(g,{variant:"destructive",onClick:()=>{P("اضافة فاتورة"),L(!1),h(!0)},children:[e.jsx(U,{className:"w-4 h-4 ml-2"})," إضافة فاتورة"]}),e.jsxs(g,{variant:"default",onClick:()=>{P("اضافة دفعة"),L(!1),h(!0)},children:[e.jsx(U,{className:"w-4 h-4 ml-2"})," إضافة دفعة"]}),e.jsx(g,{variant:"outline",onClick:I,children:e.jsx(pe,{})})]}),e.jsx(H,{className:"overflow-x-auto",children:s?e.jsx(J,{className:"h-48 w-full"}):T.length===0?e.jsx("p",{className:"text-muted-foreground text-center",children:"لا توجد معاملات حالياً."}):e.jsx(e.Fragment,{children:e.jsx(te,{title:"البيان المالي",columns:Q,data:T,getRowClassName:t=>t.type!=="payment"?"text-red-500":"text-green-500",renderRowActions:t=>e.jsx(g,{variant:"outline",onClick:()=>{P(t.type==="payment"?"اضافة دفعة":"اضافة فاتورة"),R(t.amount),A(t.Details),M(t.date),L(!0),h(!0)},children:e.jsx(xe,{})})})})})]})]})}export{Se as default};
