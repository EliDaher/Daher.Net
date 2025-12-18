import{c as H,r as s,k as Q,j as e,t as K,y as W,i as X,D as F,s as Z,w as Y,B as j,C as z,m as _,n as $,o as ee,p as te}from"./index-Bd7T95hM.js";import{S as V}from"./skeleton-Bl6aDuAC.js";import{u as ae,b as se,c as re,e as ne,f as le}from"./wifi-DluCF_JQ.js";import{l as oe}from"./index-CVGIkpBf.js";import{L as ie,A as ce,D as de,d as ue}from"./DatePicker-DRFUIany.js";import{a as me}from"./dealer-yMARAgXP.js";import{A as he}from"./arrow-left-CsvK-84d.js";import{P as q}from"./plus-j2OXzeLF.js";/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const xe=H("Printer",[["path",{d:"M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2",key:"143wyd"}],["path",{d:"M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6",key:"1itne7"}],["rect",{x:"6",y:"14",width:"12",height:"8",rx:"1",key:"1ue0tg"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const fe=H("RefreshCw",[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",key:"v9h5vc"}],["path",{d:"M21 3v5h-5",key:"1q7to0"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",key:"3uifl3"}],["path",{d:"M8 16H3v5",key:"1cv678"}]]);function pe({customer:o,setCustomer:c}){const[i,y]=s.useState(o),[m,r]=s.useState(!1),h=Q(),x=(a,d)=>{c(f=>{const p={...f,[a]:d};return r(JSON.stringify(p)!==JSON.stringify(i)),p})},S=async()=>{try{const a=await ae(o.id,o);y(o),h.invalidateQueries({queryKey:["customers-table"]}),r(!1),alert("تم حفظ التعديلات!")}catch(a){console.log(a),alert("حدث خطأ أثناء حفظ التعديلات")}},v=a=>({Name:"الاسم",UserName:"اسم المستخدم",Password:"كلمة السر",Balance:"الرصيد",SubscriptionSpeed:"السرعة",MonthlyFee:"قيمة الاشتراك",Contact:"الهاتف",sender:"المرسل",location:"الموقع",createdAt:"تاريخ الانشاء",address:"IP الراوتر"})[a]||a;return s.useEffect(()=>{y(o)},[o]),e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-1 w-full",children:[Object.entries(o).map(([a,d])=>a=="id"?e.jsx(e.Fragment,{}):a=="createdAt"?e.jsxs("div",{className:"flex gap-2 relative group mb-4 items-end",children:[e.jsxs("label",{className:"block font-bold w-36",children:[v(a),":"]}),e.jsx("input",{type:"text",value:new Date(d).toLocaleString("en-GB"),className:"bg-transparent border-b-2 border-transparent focus:border-primary-500 outline-none transition-all w-full"}),e.jsx("span",{className:"absolute bottom-0 right-0 w-full h-[2px] bg-primary-500 scale-x-0 group-hover:scale-x-100 origin-right transition-transform duration-300"})]},a):e.jsxs("div",{className:"flex gap-2 relative group mb-4 items-end",children:[e.jsxs("label",{className:"block font-bold w-36",children:[v(a),":"]}),e.jsx("input",{disabled:["address"].includes(a),type:"text",value:d,onChange:f=>x(a,f.target.value),className:"bg-transparent border-b-2 border-transparent focus:border-primary-500 outline-none transition-all w-full"}),e.jsx("span",{className:"absolute bottom-0 right-0 w-full h-[2px] bg-primary-500 scale-x-0 group-hover:scale-x-100 origin-right transition-transform duration-300"})]},a)),m&&e.jsx("button",{onClick:S,className:"mt-4 px-4 py-2 bg-accent-500 text-white rounded hover:bg-accent-600 transition-all",children:"حفظ التعديلات"})]})}function Se(){const c=K().state;s.useEffect(()=>{console.log(c)},[c]);const{id:i}=W(),y=X(),m=JSON.parse(localStorage.getItem("DaherUser")),[r,h]=s.useState(null),[x,S]=s.useState([]),[v,a]=s.useState(!0),[d,f]=s.useState(!0),[p,g]=s.useState(!1),[N,D]=s.useState(""),[P,k]=s.useState(!1),[w,L]=s.useState(),[b,R]=s.useState(0),[C,A]=s.useState(""),[M,B]=s.useState(!1);s.useEffect(()=>{(async()=>{a(!0);const u=await re(i);u.success&&h(u.data),a(!1)})()},[i]),s.useEffect(()=>{I()},[i]);const I=async()=>{f(!0);const t=await se(i);t.success&&S(t.data),f(!1)},J=async t=>{var u,O;t.preventDefault(),B(!0);try{if(!b||!w||!C||!i){alert("يرجى ملء جميع الحقول المطلوبة"),B(!1);return}const l={amount:b,date:w?ue(w).format("YYYY-MM-DD"):"",details:C,subscriberID:i,total:Number(r.Balance)||0,dealer:m.role==="dealer"?m.username:void 0};let n;N==="اضافة فاتورة"?n=await ne(l):n=m.role==="dealer"?await me(l):await le(l),n!=null&&n.message&&n.message.includes("success")?(window.confirm("هل تريد طباعة إيصال؟")&&E(),alert("تمت الإضافة بنجاح"),g(!1),I(),L(null),R(0),A("")):(console.error("API Error Response:",n),alert((n==null?void 0:n.error)||"حدث خطأ أثناء الإرسال، يرجى المحاولة لاحقًا.")),h(N==="اضافة فاتورة"?{...r,Balance:r.Balance-b}:{...r,Balance:r.Balance+b})}catch(l){console.error("Exception in handleSubmit:",l),(O=(u=l==null?void 0:l.response)==null?void 0:u.data)!=null&&O.error?alert("خطأ: "+l.response.data.error):alert("حدث خطأ غير متوقع. يرجى التحقق من الاتصال أو المحاولة لاحقًا.")}finally{B(!1)}},T=s.useRef(),E=oe.useReactToPrint({contentRef:T,pageStyle:`
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
    `,onAfterPrint:()=>{console.log("تمت الطباعة بنجاح!"),g(!1)}}),U=()=>{const t=new Date,u={year:"numeric",month:"numeric",day:"numeric",weekday:"long",hour:"numeric",minute:"numeric",second:"numeric"};return t.toLocaleDateString("en-GB",u)};if(s.useEffect(()=>{p&&P&&E()},[P,p]),v||!r)return e.jsx(F,{children:e.jsx(V,{className:"h-64 w-full"})});const G=[{key:"amount",label:"الكمية",sortable:!0},{key:"Details",label:"التفاصيل",sortable:!0},{key:"date",label:"الوقت",sortable:!0}];return e.jsxs(F,{children:[e.jsx(Z,{isOpen:p,setIsOpen:g,title:N,trigger:e.jsx(e.Fragment,{}),children:e.jsxs("div",{className:"flex flex-row-reverse gap-2",children:[P?e.jsx(e.Fragment,{}):e.jsxs("form",{onSubmit:J,className:"space-y-4 w-2/3",children:[e.jsx(Y,{value:b,onChange:t=>R(Number(t.target.value)),type:"number",placeholder:"القيمة بالدولار",required:!0}),e.jsx(ie,{dateAdapter:ce,children:e.jsx(de,{className:"w-full",label:"اختر التاريخ",value:w,onChange:t=>L(t),format:"DD/MM/YYYY"})}),e.jsx(Y,{value:C,onChange:t=>A(t.target.value),type:"text",placeholder:"تفاصيل (اختياري)"}),e.jsx("button",{disabled:!!M,type:"submit",className:"w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition",children:M?"جاري حفظ التعديلات ...":"إرسال"})]}),e.jsxs("div",{ref:T,className:"p-4 text-sm",dir:"rtl",children:[e.jsxs("div",{className:"header",children:[e.jsx("h1",{children:"Daher.Net"}),e.jsx("span",{children:U()})]}),e.jsxs("div",{className:"text-right font-bold mb-2",children:[e.jsxs("div",{children:["اسم المشترك: ",(r==null?void 0:r.Name)||"غير معروف"]}),e.jsxs("div",{children:["الرقم: ",r==null?void 0:r.Contact]})]}),e.jsxs("div",{className:"text-right mb-2",children:[e.jsx("div",{className:"font-semibold",children:"التفاصيل:"}),e.jsx("div",{className:"border p-1 rounded",children:C||"بدون ملاحظات"})]}),e.jsx("div",{className:"text-right totalValue mt-4",children:e.jsxs("div",{className:"text-lg font-extrabold border-t pt-2",children:[N=="اضافة دفعة"?"المبلغ المدفوع":"المبلغ المطلوب",": ",b," دولار"]})}),e.jsx("div",{className:"cut mt-4 border-t pt-2 text-center text-xs",children:"-- شكراً لثقتكم بخدماتنا --"})]})]})}),e.jsxs("div",{className:"space-y-6",dir:"rtl",children:[e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsx("h1",{className:"text-3xl font-bold",children:"بيانات المشترك"}),e.jsxs(j,{onClick:()=>y("/users"),variant:"outline",children:[e.jsx(he,{className:"ml-2 w-4 h-4"})," رجوع"]})]}),e.jsxs(z,{children:[e.jsx(_,{children:e.jsx($,{children:"المعلومات الأساسية"})}),e.jsx(ee,{className:"",children:e.jsx(pe,{customer:{...r,address:(c==null?void 0:c.address)||""},setCustomer:h})})]}),e.jsxs("div",{className:"flex justify-start gap-2",children:[m.role=="admin"&&e.jsxs(j,{variant:"destructive",onClick:()=>{D("اضافة فاتورة"),k(!1),g(!0)},children:[e.jsx(q,{className:"w-4 h-4 ml-2"})," إضافة فاتورة"]}),e.jsxs(j,{variant:"default",onClick:()=>{D("اضافة دفعة"),k(!1),g(!0)},children:[e.jsx(q,{className:"w-4 h-4 ml-2"})," إضافة دفعة"]}),e.jsx(j,{variant:"outline",onClick:I,children:e.jsx(fe,{})})]}),e.jsx(z,{className:"overflow-x-auto",children:d?e.jsx(V,{className:"h-48 w-full"}):(x==null?void 0:x.length)===0?e.jsx("p",{className:"text-muted-foreground text-center",children:"لا توجد معاملات حالياً."}):e.jsx(e.Fragment,{children:e.jsx(te,{title:"البيان المالي",columns:G,data:x||[],defaultPageSize:5,getRowClassName:t=>t.type!=="payment"?"text-red-500":"text-green-500",renderRowActions:t=>e.jsx(j,{variant:"outline",onClick:()=>{D(t.type==="payment"?"اضافة دفعة":"اضافة فاتورة"),R(t.amount),A(t.Details),L(t.date),k(!0),g(!0)},children:e.jsx(xe,{})})})})})]})]})}export{Se as default};
