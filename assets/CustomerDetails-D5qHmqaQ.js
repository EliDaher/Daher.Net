import{p as $,t as K,h as Q,x as U,q as H,r as l,i as L,j as e}from"./index-CJDeOR-D.js";import{D as I}from"./DashboardLayout-y2KXrlW2.js";import{C as A,a as G,b as J,c as W}from"./card-CHhuJT8d.js";import{B as c}from"./button-By_xk0nu.js";import{S as R,D as _}from"./DataTable-BowkCNWE.js";import{I as q}from"./input-GrzhRsEd.js";import{b as X,c as Z,e as ee,f as te}from"./wifi-daava5Pu.js";import{D as ae}from"./DetailsInputs-LAndMJXO.js";import{P as se}from"./PopupForm-wiHTllH-.js";import{l as re}from"./index-CL9W90FM.js";import{L as ne,A as le,D as oe,d as ie}from"./DatePicker-CZZnoAAo.js";import{a as ce}from"./dealer-Ca2b6o1e.js";import{A as de}from"./arrow-left-BwcmQWXp.js";import{P as F}from"./plus-BbnKQPWo.js";import"./house-CfMLYBxw.js";/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const me=$("Printer",[["path",{d:"M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2",key:"143wyd"}],["path",{d:"M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6",key:"1itne7"}],["rect",{x:"6",y:"14",width:"12",height:"8",rx:"1",key:"1ue0tg"}]]);function Ie(){const f=K().state,Y=Q(),{id:r}=U(),B=H(),d=JSON.parse(localStorage.getItem("DaherUser")),[g,o]=l.useState(!1),[y,j]=l.useState(""),[b,v]=l.useState(!1),[m,N]=l.useState(),[u,w]=l.useState(0),[x,D]=l.useState(""),[P,C]=l.useState(!1),{data:a,isLoading:E,isError:xe,error:pe}=L({queryKey:["customer",r],queryFn:()=>ee(r),enabled:!!r}),{data:p,isLoading:T}=L({queryKey:["transactions",r],queryFn:()=>te(r),enabled:!!r}),z=()=>{if(!(a!=null&&a.Contact)){alert("لا يوجد رقم هاتف للمشترك");return}if(a.Balance>=0){alert("لا يوجد عليه فواتير");return}const t=a.Contact.replace(/\D/g,""),i=`عزيزي المشترك ${a.Name}، قيمة فاتورتك الحالية هي: ${a.Balance*-1} دولار.
يرجى التسديد قبل تاريخ 5-2-2026 لضمان استمرار الخدمة دون انقطاع.
شكرًا لثقتك بخدماتنا.`,h=`https://wa.me/${t}?text=${encodeURIComponent(i)}`;window.open(h,"_blank")},M=async t=>{var i,h;t.preventDefault(),C(!0);try{if(!u||!m||!x||!r){alert("يرجى ملء جميع الحقول المطلوبة"),C(!1);return}const n={amount:u,date:m?ie(m).format("YYYY-MM-DD"):"",details:x,subscriberID:r,total:Number(a.Balance)||0,dealer:d.role==="dealer"?d.username:void 0,type:"cash"};let s;y==="اضافة فاتورة"?s=await X(n):s=d.role==="dealer"?await ce(n):await Z(n),s!=null&&s.message&&s.message.includes("success")?(window.confirm("هل تريد طباعة إيصال؟")&&S(),alert("تمت الإضافة بنجاح"),o(!1),N(null),w(0),D("")):(console.error("API Error Response:",s),alert((s==null?void 0:s.error)||"حدث خطأ أثناء الإرسال، يرجى المحاولة لاحقًا.")),Y.invalidateQueries({queryKey:["customer",r]})}catch(n){console.error("Exception in handleSubmit:",n),(h=(i=n==null?void 0:n.response)==null?void 0:i.data)!=null&&h.error?alert("خطأ: "+n.response.data.error):alert("حدث خطأ غير متوقع. يرجى التحقق من الاتصال أو المحاولة لاحقًا.")}finally{C(!1)}},k=l.useRef(),S=re.useReactToPrint({contentRef:k,pageStyle:`
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
    `,onAfterPrint:()=>{console.log("تمت الطباعة بنجاح!"),o(!1)}}),O=()=>{const t=new Date,i={year:"numeric",month:"numeric",day:"numeric",weekday:"long",hour:"numeric",minute:"numeric",second:"numeric"};return t.toLocaleDateString("en-GB",i)};if(l.useEffect(()=>{g&&b&&S()},[b,g]),E||!a)return e.jsx(I,{children:e.jsx(R,{className:"h-64 w-full"})});const V=[{key:"amount",label:"الكمية",sortable:!0},{key:"Details",label:"التفاصيل",sortable:!0},{key:"date",label:"الوقت",sortable:!0}];return e.jsxs(I,{children:[e.jsx(se,{isOpen:g,setIsOpen:o,title:y,trigger:e.jsx(e.Fragment,{}),children:e.jsxs("div",{className:"flex flex-row-reverse gap-2",children:[b?e.jsx(e.Fragment,{}):e.jsxs("form",{onSubmit:M,className:"space-y-4 w-2/3",children:[e.jsx(q,{value:u,onChange:t=>w(Number(t.target.value)),type:"number",placeholder:"القيمة بالدولار",required:!0}),e.jsx(ne,{dateAdapter:le,children:e.jsx(oe,{className:"w-full",label:"اختر التاريخ",value:m,onChange:t=>N(t),format:"DD/MM/YYYY"})}),e.jsx(q,{value:x,onChange:t=>D(t.target.value),type:"text",placeholder:"تفاصيل (اختياري)"}),e.jsx("button",{disabled:!!P,type:"submit",className:"w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition",children:P?"جاري حفظ التعديلات ...":"إرسال"})]}),e.jsxs("div",{ref:k,className:"p-4 text-sm",dir:"rtl",children:[e.jsxs("div",{className:"header",children:[e.jsx("h1",{children:"Daher.Net"}),e.jsx("span",{children:O()})]}),e.jsxs("div",{className:"text-right font-bold mb-2",children:[e.jsxs("div",{children:["اسم المشترك: ",(a==null?void 0:a.Name)||"غير معروف"]}),e.jsxs("div",{children:["الرقم: ",a==null?void 0:a.Contact]})]}),e.jsxs("div",{className:"text-right mb-2",children:[e.jsx("div",{className:"font-semibold",children:"التفاصيل:"}),e.jsx("div",{className:"border p-1 rounded",children:x||"بدون ملاحظات"})]}),e.jsx("div",{className:"text-right totalValue mt-4",children:e.jsxs("div",{className:"text-lg font-extrabold border-t pt-2",children:[y=="اضافة دفعة"?"المبلغ المدفوع":"المبلغ المطلوب",": ",u," دولار"]})}),e.jsx("div",{className:"cut mt-4 border-t pt-2 text-center text-xs",children:"-- شكراً لثقتكم بخدماتنا --"})]})]})}),e.jsxs("div",{className:"space-y-6",dir:"rtl",children:[e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsx("h1",{className:"text-3xl font-bold",children:"بيانات المشترك"}),e.jsxs(c,{onClick:()=>B("/users"),variant:"outline",children:[e.jsx(de,{className:"ml-2 w-4 h-4"})," رجوع"]})]}),e.jsxs(A,{children:[e.jsx(G,{children:e.jsx(J,{children:"المعلومات الأساسية"})}),e.jsx(W,{className:"",children:e.jsx(ae,{customer:{...a,address:(f==null?void 0:f.address)||""},setCustomer:()=>{}})})]}),e.jsxs("div",{className:"flex justify-start gap-2",children:[d.role=="admin"&&e.jsxs(c,{variant:"destructive",onClick:()=>{j("اضافة فاتورة"),v(!1),o(!0)},children:[e.jsx(F,{className:"w-4 h-4 ml-2"})," إضافة فاتورة"]}),e.jsxs(c,{variant:"default",onClick:()=>{j("اضافة دفعة"),v(!1),o(!0)},children:[e.jsx(F,{className:"w-4 h-4 ml-2"})," إضافة دفعة"]}),e.jsx(c,{variant:"outline",onClick:z,children:"واتساب"})]}),e.jsx(A,{className:"overflow-x-auto",children:T?e.jsx(R,{className:"h-48 w-full"}):(p==null?void 0:p.length)===0?e.jsx("p",{className:"text-muted-foreground text-center",children:"لا توجد معاملات حالياً."}):e.jsx(e.Fragment,{children:e.jsx(_,{title:"البيان المالي",columns:V,data:p||[],defaultPageSize:5,getRowClassName:t=>t.type!=="payment"?"text-red-500":"text-green-500",renderRowActions:t=>e.jsx(c,{variant:"outline",onClick:()=>{j(t.type==="payment"?"اضافة دفعة":"اضافة فاتورة"),w(t.amount),D(t.Details),N(t.date),v(!0),o(!0)},children:e.jsx(me,{})})})})})]})]})}export{Ie as default};
