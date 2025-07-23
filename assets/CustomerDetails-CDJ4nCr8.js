import{c as q,r as a,j as e,k as W,f as X}from"./index-DfKzFYeD.js";import{D as z}from"./DashboardLayout-8_3ER2p3.js";import{C as V,a as Z,b as _,c as $}from"./card-BUhZdD5c.js";import{B as b}from"./button-DImyTUjy.js";import{S as H}from"./skeleton-B52VVF_9.js";import{I as J}from"./input-Cc2gdusx.js";import{u as ee,b as te,c as ae,d as se,e as re}from"./wifi-LQWNa4dc.js";import{P as ne}from"./PopupForm-D1sdkAIq.js";import{l as le}from"./index-C5WREj-b.js";import{L as oe,A as ie,D as ce,d as de}from"./DatePicker-ydo8joUJ.js";import{D as me}from"./DataTable-D0V7OO-j.js";import{a as ue}from"./axios-KE4dpIQc.js";import{A as pe}from"./arrow-left-CWG0WF7C.js";import{P as U}from"./plus-DOh_zaDn.js";import"./house-D8Tiyqht.js";import"./index-xsH4HHeE.js";/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const he=q("Printer",[["path",{d:"M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2",key:"143wyd"}],["path",{d:"M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6",key:"1itne7"}],["rect",{x:"6",y:"14",width:"12",height:"8",rx:"1",key:"1ue0tg"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const fe=q("RefreshCw",[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",key:"v9h5vc"}],["path",{d:"M21 3v5h-5",key:"1q7to0"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",key:"3uifl3"}],["path",{d:"M8 16H3v5",key:"1cv678"}]]);function xe({customer:s,setCustomer:c}){const[m,n]=a.useState(s),[u,x]=a.useState(!1),N=(r,i)=>{c(p=>{const C={...p,[r]:i};return x(JSON.stringify(C)!==JSON.stringify(m)),C})},w=async()=>{try{const r=await ee(s.id,s);n(s),x(!1),alert("تم حفظ التعديلات!")}catch(r){console.log(r),alert("حدث خطأ أثناء حفظ التعديلات")}},g=r=>({Name:"الاسم",UserName:"اسم المستخدم",Password:"كلمة السر",Balance:"الرصيد",SubscriptionSpeed:"السرعة",MonthlyFee:"قيمة الاشتراك",Contact:"الهاتف",sender:"المرسل",location:"الموقع"})[r]||r;return a.useEffect(()=>{n(s)},[s]),e.jsxs("div",{children:[Object.entries(s).map(([r,i])=>r=="id"?e.jsx(e.Fragment,{}):r=="createdAt"?e.jsxs("p",{className:"flex gap-2 relative group mb-4 items-end",children:[e.jsxs("label",{className:"block font-bold w-36",children:[g(r),":"]}),e.jsx("input",{type:"text",value:new Date(i).toLocaleString("en-GB"),className:"bg-transparent border-b-2 border-transparent focus:border-primary-500 outline-none transition-all w-full"}),e.jsx("span",{className:"absolute bottom-0 right-0 w-full h-[2px] bg-primary-500 scale-x-0 group-hover:scale-x-100 origin-right transition-transform duration-300"})]},r):e.jsxs("p",{className:"flex gap-2 relative group mb-4 items-end",children:[e.jsxs("label",{className:"block font-bold w-36",children:[g(r),":"]}),e.jsx("input",{type:"text",value:i,onChange:p=>N(r,p.target.value),className:"bg-transparent border-b-2 border-transparent focus:border-primary-500 outline-none transition-all w-full"}),e.jsx("span",{className:"absolute bottom-0 right-0 w-full h-[2px] bg-primary-500 scale-x-0 group-hover:scale-x-100 origin-right transition-transform duration-300"})]},r)),u&&e.jsx("button",{onClick:w,className:"mt-4 px-4 py-2 bg-accent-500 text-white rounded hover:bg-accent-600 transition-all",children:"حفظ التعديلات"})]})}async function ge(s){try{return console.log(s),(await ue.post("/api/dealer/addPayment",s)).data}catch(c){return console.error("Error adding payment:",c),{success:!1,error:c}}}function Te(){const{id:s}=W(),c=X(),m=JSON.parse(localStorage.getItem("DaherUser")),[n,u]=a.useState(null),[x,N]=a.useState([]),[w,g]=a.useState(!0),[r,i]=a.useState(!0),[p,C]=a.useState(1),S=8;Math.ceil(x.length/S);const A=x.slice((p-1)*S,p*S),[D,h]=a.useState(!1),[j,P]=a.useState(""),[k,L]=a.useState(!1),[y,I]=a.useState(),[f,M]=a.useState(0),[v,R]=a.useState(""),[E,B]=a.useState(!1);a.useEffect(()=>{(async()=>{g(!0);const d=await ae(s);d.success&&u(d.data),g(!1)})()},[s]),a.useEffect(()=>{T()},[s]);const T=async()=>{i(!0);const t=await te(s);t.success&&N(t.data),i(!1)},G=async t=>{var d,Y;t.preventDefault(),B(!0);try{if(!f||!y||!v||!s){alert("يرجى ملء جميع الحقول المطلوبة"),B(!1);return}const o={amount:f,date:y?de(y).format("YYYY-MM-DD"):"",details:v,subscriberID:s,total:Number(n.Balance)||0,dealer:m.role==="dealer"?m.name:void 0};let l;j==="اضافة فاتورة"?l=await se(o):l=m.role==="dealer"?await ge(o):await re(o),l!=null&&l.message&&l.message.includes("success")?(window.confirm("هل تريد طباعة إيصال؟")&&F(),alert("تمت الإضافة بنجاح"),h(!1),T(),I(null),M(0),R("")):(console.error("API Error Response:",l),alert((l==null?void 0:l.error)||"حدث خطأ أثناء الإرسال، يرجى المحاولة لاحقًا.")),u(j==="اضافة فاتورة"?{...n,Balance:n.Balance-f}:{...n,Balance:n.Balance+f})}catch(o){console.error("Exception in handleSubmit:",o),(Y=(d=o==null?void 0:o.response)==null?void 0:d.data)!=null&&Y.error?alert("خطأ: "+o.response.data.error):alert("حدث خطأ غير متوقع. يرجى التحقق من الاتصال أو المحاولة لاحقًا.")}finally{B(!1)}},O=a.useRef(),F=le.useReactToPrint({contentRef:O,pageStyle:`
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
    `,onAfterPrint:()=>{console.log("تمت الطباعة بنجاح!"),h(!1)}}),K=()=>{const t=new Date,d={year:"numeric",month:"numeric",day:"numeric",weekday:"long",hour:"numeric",minute:"numeric",second:"numeric"};return t.toLocaleDateString("en-GB",d)};if(a.useEffect(()=>{D&&k&&F()},[k,D]),w||!n)return e.jsx(z,{children:e.jsx(H,{className:"h-64 w-full"})});const Q=[{key:"amount",label:"الكمية",sortable:!0},{key:"Details",label:"التفاصيل",sortable:!0},{key:"date",label:"الوقت",sortable:!0}];return e.jsxs(z,{children:[e.jsx(ne,{isOpen:D,setIsOpen:h,title:j,trigger:e.jsx(e.Fragment,{}),children:e.jsxs("div",{className:"flex flex-row-reverse gap-2",children:[k?e.jsx(e.Fragment,{}):e.jsxs("form",{onSubmit:G,className:"space-y-4 w-2/3",children:[e.jsx(J,{value:f,onChange:t=>M(Number(t.target.value)),type:"number",placeholder:"القيمة بالدولار",required:!0}),e.jsx(oe,{dateAdapter:ie,children:e.jsx(ce,{className:"w-full",label:"اختر التاريخ",value:y,onChange:t=>I(t),format:"DD/MM/YYYY"})}),e.jsx(J,{value:v,onChange:t=>R(t.target.value),type:"text",placeholder:"تفاصيل (اختياري)"}),e.jsx("button",{disabled:!!E,type:"submit",className:"w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition",children:E?"جاري حفظ التعديلات ...":"إرسال"})]}),e.jsxs("div",{ref:O,className:"p-4 text-sm",dir:"rtl",children:[e.jsxs("div",{className:"header",children:[e.jsx("h1",{children:"Daher.Net"}),e.jsx("span",{children:K()})]}),e.jsxs("div",{className:"text-right font-bold mb-2",children:[e.jsxs("div",{children:["اسم المشترك: ",(n==null?void 0:n.Name)||"غير معروف"]}),e.jsxs("div",{children:["الرقم: ",n==null?void 0:n.Contact]})]}),e.jsxs("div",{className:"text-right mb-2",children:[e.jsx("div",{className:"font-semibold",children:"التفاصيل:"}),e.jsx("div",{className:"border p-1 rounded",children:v||"بدون ملاحظات"})]}),e.jsx("div",{className:"text-right totalValue mt-4",children:e.jsxs("div",{className:"text-lg font-extrabold border-t pt-2",children:[j=="اضافة دفعة"?"المبلغ المدفوع":"المبلغ المطلوب",": ",f," دولار"]})}),e.jsx("div",{className:"cut mt-4 border-t pt-2 text-center text-xs",children:"-- شكراً لثقتكم بخدماتنا --"})]})]})}),e.jsxs("div",{className:"space-y-6",dir:"rtl",children:[e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsx("h1",{className:"text-3xl font-bold",children:"بيانات المشترك"}),e.jsxs(b,{onClick:()=>c("/users"),variant:"outline",children:[e.jsx(pe,{className:"ml-2 w-4 h-4"})," رجوع"]})]}),e.jsxs(V,{children:[e.jsx(Z,{children:e.jsx(_,{children:"المعلومات الأساسية"})}),e.jsx($,{className:"grid grid-cols-1 md:grid-cols-2 gap-4",children:e.jsx(xe,{customer:n,setCustomer:u})})]}),e.jsxs("div",{className:"flex justify-start gap-2",children:[m.role=="admin"&&e.jsxs(b,{variant:"destructive",onClick:()=>{P("اضافة فاتورة"),L(!1),h(!0)},children:[e.jsx(U,{className:"w-4 h-4 ml-2"})," إضافة فاتورة"]}),e.jsxs(b,{variant:"default",onClick:()=>{P("اضافة دفعة"),L(!1),h(!0)},children:[e.jsx(U,{className:"w-4 h-4 ml-2"})," إضافة دفعة"]}),e.jsx(b,{variant:"outline",onClick:T,children:e.jsx(fe,{})})]}),e.jsx(V,{className:"overflow-x-auto",children:r?e.jsx(H,{className:"h-48 w-full"}):A.length===0?e.jsx("p",{className:"text-muted-foreground text-center",children:"لا توجد معاملات حالياً."}):e.jsx(e.Fragment,{children:e.jsx(me,{title:"البيان المالي",columns:Q,data:A,getRowClassName:t=>t.type!=="payment"?"text-red-500":"text-green-500",renderRowActions:t=>e.jsx(b,{variant:"outline",onClick:()=>{P(t.type==="payment"?"اضافة دفعة":"اضافة فاتورة"),M(t.amount),R(t.Details),I(t.date),L(!0),h(!0)},children:e.jsx(he,{})})})})})]})]})}export{Te as default};
