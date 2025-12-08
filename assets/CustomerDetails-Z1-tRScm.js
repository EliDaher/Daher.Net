import{c as G,r as a,k as X,j as e,t as Z,y as _,i as $,D as V,s as ee,w as q,B as b,C as H,m as te,n as ae,o as se,p as re}from"./index-Bipx9DSv.js";import{S as J}from"./skeleton-LZg4zv0h.js";import{u as ne,b as le,c as oe,e as ie,f as ce}from"./wifi-CbmGeset.js";import{l as de}from"./index-CBkh7b-j.js";import{L as ue,A as me,D as he,d as pe}from"./DatePicker-30qaWgck.js";import{a as xe}from"./dealer-H0T8ANcN.js";import{A as fe}from"./arrow-left-gwC4ucoG.js";import{P as U}from"./plus-8tY-T3cs.js";/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ge=G("Printer",[["path",{d:"M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2",key:"143wyd"}],["path",{d:"M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6",key:"1itne7"}],["rect",{x:"6",y:"14",width:"12",height:"8",rx:"1",key:"1ue0tg"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const be=G("RefreshCw",[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",key:"v9h5vc"}],["path",{d:"M21 3v5h-5",key:"1q7to0"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",key:"3uifl3"}],["path",{d:"M8 16H3v5",key:"1cv678"}]]);function je({customer:o,setCustomer:f}){const[i,j]=a.useState(o),[u,r]=a.useState(!1),m=X(),y=(s,c)=>{f(h=>{const g={...h,[s]:c};return r(JSON.stringify(g)!==JSON.stringify(i)),g})},S=async()=>{try{const s=await ne(o.id,o);j(o),m.invalidateQueries({queryKey:["customers-table"]}),r(!1),alert("تم حفظ التعديلات!")}catch(s){console.log(s),alert("حدث خطأ أثناء حفظ التعديلات")}},v=s=>({Name:"الاسم",UserName:"اسم المستخدم",Password:"كلمة السر",Balance:"الرصيد",SubscriptionSpeed:"السرعة",MonthlyFee:"قيمة الاشتراك",Contact:"الهاتف",sender:"المرسل",location:"الموقع",address:"IP الراوتر"})[s]||s;return a.useEffect(()=>{j(o)},[o]),e.jsxs("div",{children:[Object.entries(o).map(([s,c])=>s=="id"?e.jsx(e.Fragment,{}):s=="createdAt"?e.jsxs("p",{className:"flex gap-2 relative group mb-4 items-end",children:[e.jsxs("label",{className:"block font-bold w-36",children:[v(s),":"]}),e.jsx("input",{type:"text",value:new Date(c).toLocaleString("en-GB"),className:"bg-transparent border-b-2 border-transparent focus:border-primary-500 outline-none transition-all w-full"}),e.jsx("span",{className:"absolute bottom-0 right-0 w-full h-[2px] bg-primary-500 scale-x-0 group-hover:scale-x-100 origin-right transition-transform duration-300"})]},s):e.jsxs("p",{className:"flex gap-2 relative group mb-4 items-end",children:[e.jsxs("label",{className:"block font-bold w-36",children:[v(s),":"]}),e.jsx("input",{type:"text",value:c,onChange:h=>y(s,h.target.value),className:"bg-transparent border-b-2 border-transparent focus:border-primary-500 outline-none transition-all w-full"}),e.jsx("span",{className:"absolute bottom-0 right-0 w-full h-[2px] bg-primary-500 scale-x-0 group-hover:scale-x-100 origin-right transition-transform duration-300"})]},s)),u&&e.jsx("button",{onClick:S,className:"mt-4 px-4 py-2 bg-accent-500 text-white rounded hover:bg-accent-600 transition-all",children:"حفظ التعديلات"})]})}function Le(){const f=Z().state;a.useEffect(()=>{console.log(f)},[f]);const{id:i}=_(),j=$(),u=JSON.parse(localStorage.getItem("DaherUser")),[r,m]=a.useState(null),[y,S]=a.useState([]),[v,s]=a.useState(!0),[c,h]=a.useState(!0),[g,ye]=a.useState(1),D=8;Math.ceil(y.length/D);const E=y.slice((g-1)*D,g*D),[P,p]=a.useState(!1),[N,k]=a.useState(""),[L,I]=a.useState(!1),[w,M]=a.useState(),[x,R]=a.useState(0),[C,B]=a.useState(""),[O,T]=a.useState(!1);a.useEffect(()=>{(async()=>{s(!0);const d=await oe(i);d.success&&m(d.data),s(!1)})()},[i]),a.useEffect(()=>{A()},[i]);const A=async()=>{h(!0);const t=await le(i);t.success&&S(t.data),h(!1)},Q=async t=>{var d,z;t.preventDefault(),T(!0);try{if(!x||!w||!C||!i){alert("يرجى ملء جميع الحقول المطلوبة"),T(!1);return}const l={amount:x,date:w?pe(w).format("YYYY-MM-DD"):"",details:C,subscriberID:i,total:Number(r.Balance)||0,dealer:u.role==="dealer"?u.username:void 0};let n;N==="اضافة فاتورة"?n=await ie(l):n=u.role==="dealer"?await xe(l):await ce(l),n!=null&&n.message&&n.message.includes("success")?(window.confirm("هل تريد طباعة إيصال؟")&&Y(),alert("تمت الإضافة بنجاح"),p(!1),A(),M(null),R(0),B("")):(console.error("API Error Response:",n),alert((n==null?void 0:n.error)||"حدث خطأ أثناء الإرسال، يرجى المحاولة لاحقًا.")),m(N==="اضافة فاتورة"?{...r,Balance:r.Balance-x}:{...r,Balance:r.Balance+x})}catch(l){console.error("Exception in handleSubmit:",l),(z=(d=l==null?void 0:l.response)==null?void 0:d.data)!=null&&z.error?alert("خطأ: "+l.response.data.error):alert("حدث خطأ غير متوقع. يرجى التحقق من الاتصال أو المحاولة لاحقًا.")}finally{T(!1)}},F=a.useRef(),Y=de.useReactToPrint({contentRef:F,pageStyle:`
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
    `,onAfterPrint:()=>{console.log("تمت الطباعة بنجاح!"),p(!1)}}),K=()=>{const t=new Date,d={year:"numeric",month:"numeric",day:"numeric",weekday:"long",hour:"numeric",minute:"numeric",second:"numeric"};return t.toLocaleDateString("en-GB",d)};if(a.useEffect(()=>{P&&L&&Y()},[L,P]),v||!r)return e.jsx(V,{children:e.jsx(J,{className:"h-64 w-full"})});const W=[{key:"amount",label:"الكمية",sortable:!0},{key:"Details",label:"التفاصيل",sortable:!0},{key:"date",label:"الوقت",sortable:!0}];return e.jsxs(V,{children:[e.jsx(ee,{isOpen:P,setIsOpen:p,title:N,trigger:e.jsx(e.Fragment,{}),children:e.jsxs("div",{className:"flex flex-row-reverse gap-2",children:[L?e.jsx(e.Fragment,{}):e.jsxs("form",{onSubmit:Q,className:"space-y-4 w-2/3",children:[e.jsx(q,{value:x,onChange:t=>R(Number(t.target.value)),type:"number",placeholder:"القيمة بالدولار",required:!0}),e.jsx(ue,{dateAdapter:me,children:e.jsx(he,{className:"w-full",label:"اختر التاريخ",value:w,onChange:t=>M(t),format:"DD/MM/YYYY"})}),e.jsx(q,{value:C,onChange:t=>B(t.target.value),type:"text",placeholder:"تفاصيل (اختياري)"}),e.jsx("button",{disabled:!!O,type:"submit",className:"w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition",children:O?"جاري حفظ التعديلات ...":"إرسال"})]}),e.jsxs("div",{ref:F,className:"p-4 text-sm",dir:"rtl",children:[e.jsxs("div",{className:"header",children:[e.jsx("h1",{children:"Daher.Net"}),e.jsx("span",{children:K()})]}),e.jsxs("div",{className:"text-right font-bold mb-2",children:[e.jsxs("div",{children:["اسم المشترك: ",(r==null?void 0:r.Name)||"غير معروف"]}),e.jsxs("div",{children:["الرقم: ",r==null?void 0:r.Contact]})]}),e.jsxs("div",{className:"text-right mb-2",children:[e.jsx("div",{className:"font-semibold",children:"التفاصيل:"}),e.jsx("div",{className:"border p-1 rounded",children:C||"بدون ملاحظات"})]}),e.jsx("div",{className:"text-right totalValue mt-4",children:e.jsxs("div",{className:"text-lg font-extrabold border-t pt-2",children:[N=="اضافة دفعة"?"المبلغ المدفوع":"المبلغ المطلوب",": ",x," دولار"]})}),e.jsx("div",{className:"cut mt-4 border-t pt-2 text-center text-xs",children:"-- شكراً لثقتكم بخدماتنا --"})]})]})}),e.jsxs("div",{className:"space-y-6",dir:"rtl",children:[e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsx("h1",{className:"text-3xl font-bold",children:"بيانات المشترك"}),e.jsxs(b,{onClick:()=>j("/users"),variant:"outline",children:[e.jsx(fe,{className:"ml-2 w-4 h-4"})," رجوع"]})]}),e.jsxs(H,{children:[e.jsx(te,{children:e.jsx(ae,{children:"المعلومات الأساسية"})}),e.jsx(se,{className:"grid grid-cols-1 md:grid-cols-2 gap-4",children:e.jsx(je,{customer:{...r,address:f.address},setCustomer:m})})]}),e.jsxs("div",{className:"flex justify-start gap-2",children:[u.role=="admin"&&e.jsxs(b,{variant:"destructive",onClick:()=>{k("اضافة فاتورة"),I(!1),p(!0)},children:[e.jsx(U,{className:"w-4 h-4 ml-2"})," إضافة فاتورة"]}),e.jsxs(b,{variant:"default",onClick:()=>{k("اضافة دفعة"),I(!1),p(!0)},children:[e.jsx(U,{className:"w-4 h-4 ml-2"})," إضافة دفعة"]}),e.jsx(b,{variant:"outline",onClick:A,children:e.jsx(be,{})})]}),e.jsx(H,{className:"overflow-x-auto",children:c?e.jsx(J,{className:"h-48 w-full"}):E.length===0?e.jsx("p",{className:"text-muted-foreground text-center",children:"لا توجد معاملات حالياً."}):e.jsx(e.Fragment,{children:e.jsx(re,{title:"البيان المالي",columns:W,data:E,getRowClassName:t=>t.type!=="payment"?"text-red-500":"text-green-500",renderRowActions:t=>e.jsx(b,{variant:"outline",onClick:()=>{k(t.type==="payment"?"اضافة دفعة":"اضافة فاتورة"),R(t.amount),B(t.Details),M(t.date),I(!0),p(!0)},children:e.jsx(ge,{})})})})})]})]})}export{Le as default};
