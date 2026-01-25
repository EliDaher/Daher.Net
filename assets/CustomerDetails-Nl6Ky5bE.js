import{c as G,t as J,r as s,K,i as W,j as e,D as I,s as _,w as L,B as d,C as E,m as Q,n as X,o as Z,p as ee}from"./index-CREXyPpo.js";import{S as Y}from"./skeleton-DZnzOuDf.js";import{b as te,c as ae,e as se,f as ne}from"./wifi-BfBoU_Gu.js";import{D as re,R as le}from"./DetailsInputs-DlKbKGSx.js";import{l as oe}from"./index-B1fTYTzd.js";import{L as ie,A as ce,D as de,d as me}from"./DatePicker-D0RCb5S4.js";import{a as ue}from"./dealer-GdG0IZh-.js";import{A as xe}from"./arrow-left-DDrp1vzN.js";import{P as z}from"./plus-DCgQfUlV.js";/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const fe=G("Printer",[["path",{d:"M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2",key:"143wyd"}],["path",{d:"M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6",key:"1itne7"}],["rect",{x:"6",y:"14",width:"12",height:"8",rx:"1",key:"1ue0tg"}]]);function De(){const m=J().state;s.useEffect(()=>{console.log(m)},[m]);const{id:o}=K(),F=W(),u=JSON.parse(localStorage.getItem("DaherUser")),[a,x]=s.useState(null),[f,M]=s.useState([]),[O,k]=s.useState(!0),[V,R]=s.useState(!0),[y,i]=s.useState(!1),[h,b]=s.useState(""),[v,w]=s.useState(!1),[p,N]=s.useState(),[c,C]=s.useState(0),[g,D]=s.useState(""),[B,S]=s.useState(!1);s.useEffect(()=>{(async()=>{k(!0);const r=await ae(o);r.success&&x(r.data),k(!1)})()},[o]),s.useEffect(()=>{P()},[o]);const P=async()=>{R(!0);const t=await te(o);t.success&&M(t.data),R(!1)},U=()=>{if(!(a!=null&&a.Contact)){alert("لا يوجد رقم هاتف للمشترك");return}if(a.Balance>=0){alert("لا يوجد عليه فواتير");return}const t=a.Contact.replace(/\D/g,""),r=`قيمة فاتورتك الحالية هي: ${a.Balance*-1} دولار.
يرجى التسديد قبل تاريخ 5-1-2026 لضمان استمرار الخدمة دون انقطاع.
شكرًا لثقتك بخدماتنا.`,j=`https://wa.me/${t}?text=${encodeURIComponent(r)}`;window.open(j,"_blank")},$=async t=>{var r,j;t.preventDefault(),S(!0);try{if(!c||!p||!g||!o){alert("يرجى ملء جميع الحقول المطلوبة"),S(!1);return}const l={amount:c,date:p?me(p).format("YYYY-MM-DD"):"",details:g,subscriberID:o,total:Number(a.Balance)||0,dealer:u.role==="dealer"?u.username:void 0};let n;h==="اضافة فاتورة"?n=await se(l):n=u.role==="dealer"?await ue(l):await ne(l),n!=null&&n.message&&n.message.includes("success")?(window.confirm("هل تريد طباعة إيصال؟")&&A(),alert("تمت الإضافة بنجاح"),i(!1),P(),N(null),C(0),D("")):(console.error("API Error Response:",n),alert((n==null?void 0:n.error)||"حدث خطأ أثناء الإرسال، يرجى المحاولة لاحقًا.")),x(h==="اضافة فاتورة"?{...a,Balance:a.Balance-c}:{...a,Balance:a.Balance+c})}catch(l){console.error("Exception in handleSubmit:",l),(j=(r=l==null?void 0:l.response)==null?void 0:r.data)!=null&&j.error?alert("خطأ: "+l.response.data.error):alert("حدث خطأ غير متوقع. يرجى التحقق من الاتصال أو المحاولة لاحقًا.")}finally{S(!1)}},T=s.useRef(),A=oe.useReactToPrint({contentRef:T,pageStyle:`
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
    `,onAfterPrint:()=>{console.log("تمت الطباعة بنجاح!"),i(!1)}}),H=()=>{const t=new Date,r={year:"numeric",month:"numeric",day:"numeric",weekday:"long",hour:"numeric",minute:"numeric",second:"numeric"};return t.toLocaleDateString("en-GB",r)};if(s.useEffect(()=>{y&&v&&A()},[v,y]),O||!a)return e.jsx(I,{children:e.jsx(Y,{className:"h-64 w-full"})});const q=[{key:"amount",label:"الكمية",sortable:!0},{key:"Details",label:"التفاصيل",sortable:!0},{key:"date",label:"الوقت",sortable:!0}];return e.jsxs(I,{children:[e.jsx(_,{isOpen:y,setIsOpen:i,title:h,trigger:e.jsx(e.Fragment,{}),children:e.jsxs("div",{className:"flex flex-row-reverse gap-2",children:[v?e.jsx(e.Fragment,{}):e.jsxs("form",{onSubmit:$,className:"space-y-4 w-2/3",children:[e.jsx(L,{value:c,onChange:t=>C(Number(t.target.value)),type:"number",placeholder:"القيمة بالدولار",required:!0}),e.jsx(ie,{dateAdapter:ce,children:e.jsx(de,{className:"w-full",label:"اختر التاريخ",value:p,onChange:t=>N(t),format:"DD/MM/YYYY"})}),e.jsx(L,{value:g,onChange:t=>D(t.target.value),type:"text",placeholder:"تفاصيل (اختياري)"}),e.jsx("button",{disabled:!!B,type:"submit",className:"w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition",children:B?"جاري حفظ التعديلات ...":"إرسال"})]}),e.jsxs("div",{ref:T,className:"p-4 text-sm",dir:"rtl",children:[e.jsxs("div",{className:"header",children:[e.jsx("h1",{children:"Daher.Net"}),e.jsx("span",{children:H()})]}),e.jsxs("div",{className:"text-right font-bold mb-2",children:[e.jsxs("div",{children:["اسم المشترك: ",(a==null?void 0:a.Name)||"غير معروف"]}),e.jsxs("div",{children:["الرقم: ",a==null?void 0:a.Contact]})]}),e.jsxs("div",{className:"text-right mb-2",children:[e.jsx("div",{className:"font-semibold",children:"التفاصيل:"}),e.jsx("div",{className:"border p-1 rounded",children:g||"بدون ملاحظات"})]}),e.jsx("div",{className:"text-right totalValue mt-4",children:e.jsxs("div",{className:"text-lg font-extrabold border-t pt-2",children:[h=="اضافة دفعة"?"المبلغ المدفوع":"المبلغ المطلوب",": ",c," دولار"]})}),e.jsx("div",{className:"cut mt-4 border-t pt-2 text-center text-xs",children:"-- شكراً لثقتكم بخدماتنا --"})]})]})}),e.jsxs("div",{className:"space-y-6",dir:"rtl",children:[e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsx("h1",{className:"text-3xl font-bold",children:"بيانات المشترك"}),e.jsxs(d,{onClick:()=>F("/users"),variant:"outline",children:[e.jsx(xe,{className:"ml-2 w-4 h-4"})," رجوع"]})]}),e.jsxs(E,{children:[e.jsx(Q,{children:e.jsx(X,{children:"المعلومات الأساسية"})}),e.jsx(Z,{className:"",children:e.jsx(re,{customer:{...a,address:(m==null?void 0:m.address)||""},setCustomer:x})})]}),e.jsxs("div",{className:"flex justify-start gap-2",children:[u.role=="admin"&&e.jsxs(d,{variant:"destructive",onClick:()=>{b("اضافة فاتورة"),w(!1),i(!0)},children:[e.jsx(z,{className:"w-4 h-4 ml-2"})," إضافة فاتورة"]}),e.jsxs(d,{variant:"default",onClick:()=>{b("اضافة دفعة"),w(!1),i(!0)},children:[e.jsx(z,{className:"w-4 h-4 ml-2"})," إضافة دفعة"]}),e.jsx(d,{variant:"outline",onClick:U,children:"واتساب"}),e.jsx(d,{variant:"outline",onClick:P,children:e.jsx(le,{})})]}),e.jsx(E,{className:"overflow-x-auto",children:V?e.jsx(Y,{className:"h-48 w-full"}):(f==null?void 0:f.length)===0?e.jsx("p",{className:"text-muted-foreground text-center",children:"لا توجد معاملات حالياً."}):e.jsx(e.Fragment,{children:e.jsx(ee,{title:"البيان المالي",columns:q,data:f||[],defaultPageSize:5,getRowClassName:t=>t.type!=="payment"?"text-red-500":"text-green-500",renderRowActions:t=>e.jsx(d,{variant:"outline",onClick:()=>{b(t.type==="payment"?"اضافة دفعة":"اضافة فاتورة"),C(t.amount),D(t.Details),N(t.date),w(!0),i(!0)},children:e.jsx(fe,{})})})})})]})]})}export{De as default};
