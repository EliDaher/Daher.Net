import{c as U,r as a,k as W,j as e,z as X,i as Z,D as z,w as _,x as V,B as f,C as q,m as $,n as ee,o as te,p as ae}from"./index-zn5q1Gwn.js";import{S as H}from"./skeleton-ByFYvGux.js";import{u as se,b as re,c as ne,e as le,f as ie}from"./wifi-yTFtvGkM.js";import{l as oe}from"./index-XH-hI4bZ.js";import{L as ce,A as de,D as ue,d as me}from"./DatePicker-Da6-H4a3.js";import{a as he}from"./dealer-CMgLsJpm.js";import{A as xe}from"./arrow-left-BbRunH_w.js";import{P as J}from"./plus-CcbBfdJD.js";/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const pe=U("Printer",[["path",{d:"M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2",key:"143wyd"}],["path",{d:"M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6",key:"1itne7"}],["rect",{x:"6",y:"14",width:"12",height:"8",rx:"1",key:"1ue0tg"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const fe=U("RefreshCw",[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",key:"v9h5vc"}],["path",{d:"M21 3v5h-5",key:"1q7to0"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",key:"3uifl3"}],["path",{d:"M8 16H3v5",key:"1cv678"}]]);function ge({customer:n,setCustomer:w}){const[d,r]=a.useState(n),[u,p]=a.useState(!1),C=W(),S=(s,o)=>{w(j=>{const m={...j,[s]:o};return p(JSON.stringify(m)!==JSON.stringify(d)),m})},g=async()=>{try{const s=await se(n.id,n);r(n),C.invalidateQueries({queryKey:["customers-table"]}),p(!1),alert("تم حفظ التعديلات!")}catch(s){console.log(s),alert("حدث خطأ أثناء حفظ التعديلات")}},b=s=>({Name:"الاسم",UserName:"اسم المستخدم",Password:"كلمة السر",Balance:"الرصيد",SubscriptionSpeed:"السرعة",MonthlyFee:"قيمة الاشتراك",Contact:"الهاتف",sender:"المرسل",location:"الموقع"})[s]||s;return a.useEffect(()=>{r(n)},[n]),e.jsxs("div",{children:[Object.entries(n).map(([s,o])=>s=="id"?e.jsx(e.Fragment,{}):s=="createdAt"?e.jsxs("p",{className:"flex gap-2 relative group mb-4 items-end",children:[e.jsxs("label",{className:"block font-bold w-36",children:[b(s),":"]}),e.jsx("input",{type:"text",value:new Date(o).toLocaleString("en-GB"),className:"bg-transparent border-b-2 border-transparent focus:border-primary-500 outline-none transition-all w-full"}),e.jsx("span",{className:"absolute bottom-0 right-0 w-full h-[2px] bg-primary-500 scale-x-0 group-hover:scale-x-100 origin-right transition-transform duration-300"})]},s):e.jsxs("p",{className:"flex gap-2 relative group mb-4 items-end",children:[e.jsxs("label",{className:"block font-bold w-36",children:[b(s),":"]}),e.jsx("input",{type:"text",value:o,onChange:j=>S(s,j.target.value),className:"bg-transparent border-b-2 border-transparent focus:border-primary-500 outline-none transition-all w-full"}),e.jsx("span",{className:"absolute bottom-0 right-0 w-full h-[2px] bg-primary-500 scale-x-0 group-hover:scale-x-100 origin-right transition-transform duration-300"})]},s)),u&&e.jsx("button",{onClick:g,className:"mt-4 px-4 py-2 bg-accent-500 text-white rounded hover:bg-accent-600 transition-all",children:"حفظ التعديلات"})]})}function De(){const{id:n}=X(),w=Z(),d=JSON.parse(localStorage.getItem("DaherUser")),[r,u]=a.useState(null),[p,C]=a.useState([]),[S,g]=a.useState(!0),[b,s]=a.useState(!0),[o,j]=a.useState(1),m=8;Math.ceil(p.length/m);const A=p.slice((o-1)*m,o*m),[D,h]=a.useState(!1),[y,P]=a.useState(""),[k,L]=a.useState(!1),[v,M]=a.useState(),[x,R]=a.useState(0),[N,B]=a.useState(""),[E,I]=a.useState(!1);a.useEffect(()=>{(async()=>{g(!0);const c=await ne(n);c.success&&u(c.data),g(!1)})()},[n]),a.useEffect(()=>{T()},[n]);const T=async()=>{s(!0);const t=await re(n);t.success&&C(t.data),s(!1)},G=async t=>{var c,Y;t.preventDefault(),I(!0);try{if(!x||!v||!N||!n){alert("يرجى ملء جميع الحقول المطلوبة"),I(!1);return}const i={amount:x,date:v?me(v).format("YYYY-MM-DD"):"",details:N,subscriberID:n,total:Number(r.Balance)||0,dealer:d.role==="dealer"?d.username:void 0};let l;y==="اضافة فاتورة"?l=await le(i):l=d.role==="dealer"?await he(i):await ie(i),l!=null&&l.message&&l.message.includes("success")?(window.confirm("هل تريد طباعة إيصال؟")&&F(),alert("تمت الإضافة بنجاح"),h(!1),T(),M(null),R(0),B("")):(console.error("API Error Response:",l),alert((l==null?void 0:l.error)||"حدث خطأ أثناء الإرسال، يرجى المحاولة لاحقًا.")),u(y==="اضافة فاتورة"?{...r,Balance:r.Balance-x}:{...r,Balance:r.Balance+x})}catch(i){console.error("Exception in handleSubmit:",i),(Y=(c=i==null?void 0:i.response)==null?void 0:c.data)!=null&&Y.error?alert("خطأ: "+i.response.data.error):alert("حدث خطأ غير متوقع. يرجى التحقق من الاتصال أو المحاولة لاحقًا.")}finally{I(!1)}},O=a.useRef(),F=oe.useReactToPrint({contentRef:O,pageStyle:`
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
    `,onAfterPrint:()=>{console.log("تمت الطباعة بنجاح!"),h(!1)}}),Q=()=>{const t=new Date,c={year:"numeric",month:"numeric",day:"numeric",weekday:"long",hour:"numeric",minute:"numeric",second:"numeric"};return t.toLocaleDateString("en-GB",c)};if(a.useEffect(()=>{D&&k&&F()},[k,D]),S||!r)return e.jsx(z,{children:e.jsx(H,{className:"h-64 w-full"})});const K=[{key:"amount",label:"الكمية",sortable:!0},{key:"Details",label:"التفاصيل",sortable:!0},{key:"date",label:"الوقت",sortable:!0}];return e.jsxs(z,{children:[e.jsx(_,{isOpen:D,setIsOpen:h,title:y,trigger:e.jsx(e.Fragment,{}),children:e.jsxs("div",{className:"flex flex-row-reverse gap-2",children:[k?e.jsx(e.Fragment,{}):e.jsxs("form",{onSubmit:G,className:"space-y-4 w-2/3",children:[e.jsx(V,{value:x,onChange:t=>R(Number(t.target.value)),type:"number",placeholder:"القيمة بالدولار",required:!0}),e.jsx(ce,{dateAdapter:de,children:e.jsx(ue,{className:"w-full",label:"اختر التاريخ",value:v,onChange:t=>M(t),format:"DD/MM/YYYY"})}),e.jsx(V,{value:N,onChange:t=>B(t.target.value),type:"text",placeholder:"تفاصيل (اختياري)"}),e.jsx("button",{disabled:!!E,type:"submit",className:"w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition",children:E?"جاري حفظ التعديلات ...":"إرسال"})]}),e.jsxs("div",{ref:O,className:"p-4 text-sm",dir:"rtl",children:[e.jsxs("div",{className:"header",children:[e.jsx("h1",{children:"Daher.Net"}),e.jsx("span",{children:Q()})]}),e.jsxs("div",{className:"text-right font-bold mb-2",children:[e.jsxs("div",{children:["اسم المشترك: ",(r==null?void 0:r.Name)||"غير معروف"]}),e.jsxs("div",{children:["الرقم: ",r==null?void 0:r.Contact]})]}),e.jsxs("div",{className:"text-right mb-2",children:[e.jsx("div",{className:"font-semibold",children:"التفاصيل:"}),e.jsx("div",{className:"border p-1 rounded",children:N||"بدون ملاحظات"})]}),e.jsx("div",{className:"text-right totalValue mt-4",children:e.jsxs("div",{className:"text-lg font-extrabold border-t pt-2",children:[y=="اضافة دفعة"?"المبلغ المدفوع":"المبلغ المطلوب",": ",x," دولار"]})}),e.jsx("div",{className:"cut mt-4 border-t pt-2 text-center text-xs",children:"-- شكراً لثقتكم بخدماتنا --"})]})]})}),e.jsxs("div",{className:"space-y-6",dir:"rtl",children:[e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsx("h1",{className:"text-3xl font-bold",children:"بيانات المشترك"}),e.jsxs(f,{onClick:()=>w("/users"),variant:"outline",children:[e.jsx(xe,{className:"ml-2 w-4 h-4"})," رجوع"]})]}),e.jsxs(q,{children:[e.jsx($,{children:e.jsx(ee,{children:"المعلومات الأساسية"})}),e.jsx(te,{className:"grid grid-cols-1 md:grid-cols-2 gap-4",children:e.jsx(ge,{customer:r,setCustomer:u})})]}),e.jsxs("div",{className:"flex justify-start gap-2",children:[d.role=="admin"&&e.jsxs(f,{variant:"destructive",onClick:()=>{P("اضافة فاتورة"),L(!1),h(!0)},children:[e.jsx(J,{className:"w-4 h-4 ml-2"})," إضافة فاتورة"]}),e.jsxs(f,{variant:"default",onClick:()=>{P("اضافة دفعة"),L(!1),h(!0)},children:[e.jsx(J,{className:"w-4 h-4 ml-2"})," إضافة دفعة"]}),e.jsx(f,{variant:"outline",onClick:T,children:e.jsx(fe,{})})]}),e.jsx(q,{className:"overflow-x-auto",children:b?e.jsx(H,{className:"h-48 w-full"}):A.length===0?e.jsx("p",{className:"text-muted-foreground text-center",children:"لا توجد معاملات حالياً."}):e.jsx(e.Fragment,{children:e.jsx(ae,{title:"البيان المالي",columns:K,data:A,getRowClassName:t=>t.type!=="payment"?"text-red-500":"text-green-500",renderRowActions:t=>e.jsx(f,{variant:"outline",onClick:()=>{P(t.type==="payment"?"اضافة دفعة":"اضافة فاتورة"),R(t.amount),B(t.Details),M(t.date),L(!0),h(!0)},children:e.jsx(pe,{})})})})})]})]})}export{De as default};
