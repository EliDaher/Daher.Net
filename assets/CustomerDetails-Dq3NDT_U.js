import{c as U,r as n,k as Q,j as e,t as K,z as W,i as _,D as F,s as X,w as Y,B as j,C as z,m as Z,n as ee,o as te,p as ae}from"./index-DxiOGQiC.js";import{S as V}from"./skeleton-D2PaM28q.js";import{u as se,b as ne,c as re,e as le,f as oe}from"./wifi-rVQ65c8C.js";import{l as ie}from"./index-DGgKguO7.js";import{L as ce,A as de,D as ue,d as me}from"./DatePicker-D8thvMFb.js";import{a as he}from"./dealer-Bzjolvt1.js";import{A as xe}from"./arrow-left-BlCsQpSB.js";import{P as q}from"./plus-DcsFaPOd.js";/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const pe=U("Printer",[["path",{d:"M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2",key:"143wyd"}],["path",{d:"M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6",key:"1itne7"}],["rect",{x:"6",y:"14",width:"12",height:"8",rx:"1",key:"1ue0tg"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const fe=U("RefreshCw",[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",key:"v9h5vc"}],["path",{d:"M21 3v5h-5",key:"1q7to0"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",key:"3uifl3"}],["path",{d:"M8 16H3v5",key:"1cv678"}]]);function ge({customer:i,setCustomer:d}){const[c,y]=n.useState(i),[m,t]=n.useState(!1),h=Q(),x=(s,u)=>{d(p=>{const f={...p,[s]:u};return t(JSON.stringify(f)!==JSON.stringify(c)),f})},D=async()=>{try{const s=await se(i.id,i);y(i),h.invalidateQueries({queryKey:["customers-table"]}),t(!1),alert("تم حفظ التعديلات!")}catch(s){console.log(s),alert("حدث خطأ أثناء حفظ التعديلات")}},v=s=>({Name:"الاسم",UserName:"اسم المستخدم",Password:"كلمة السر",Balance:"الرصيد",SubscriptionSpeed:"السرعة",MonthlyFee:"قيمة الاشتراك",Contact:"الهاتف",sender:"المرسل",location:"الموقع",createdAt:"تاريخ الانشاء",address:"IP الراوتر"})[s]||s;return n.useEffect(()=>{y(i)},[i]),e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-1 w-full",children:[Object.entries(i).map(([s,u])=>s=="id"?e.jsx(e.Fragment,{}):s=="createdAt"?e.jsxs("div",{className:"flex gap-2 relative group mb-4 items-end",children:[e.jsxs("label",{className:"block font-bold w-36",children:[v(s),":"]}),e.jsx("input",{type:"text",value:new Date(u).toLocaleString("en-GB"),className:"bg-transparent border-b-2 border-transparent focus:border-primary-500 outline-none transition-all w-full"}),e.jsx("span",{className:"absolute bottom-0 right-0 w-full h-[2px] bg-primary-500 scale-x-0 group-hover:scale-x-100 origin-right transition-transform duration-300"})]},s):e.jsxs("div",{className:"flex gap-2 relative group mb-4 items-end",children:[e.jsxs("label",{className:"block font-bold w-36",children:[v(s),":"]}),e.jsx("input",{disabled:["address"].includes(s),type:"text",value:u,onChange:p=>x(s,p.target.value),className:"bg-transparent border-b-2 border-transparent focus:border-primary-500 outline-none transition-all w-full"}),e.jsx("span",{className:"absolute bottom-0 right-0 w-full h-[2px] bg-primary-500 scale-x-0 group-hover:scale-x-100 origin-right transition-transform duration-300"})]},s)),m&&e.jsx("button",{onClick:D,className:"mt-4 px-4 py-2 bg-accent-500 text-white rounded hover:bg-accent-600 transition-all",children:"حفظ التعديلات"})]})}function De(){const d=K().state;n.useEffect(()=>{console.log(d)},[d]);const{id:c}=W(),y=_(),m=JSON.parse(localStorage.getItem("DaherUser")),[t,h]=n.useState(null),[x,D]=n.useState([]),[v,s]=n.useState(!0),[u,p]=n.useState(!0),[f,g]=n.useState(!1),[w,P]=n.useState(""),[k,L]=n.useState(!1),[N,B]=n.useState(),[b,R]=n.useState(0),[C,A]=n.useState(""),[T,I]=n.useState(!1);n.useEffect(()=>{(async()=>{s(!0);const l=await re(c);l.success&&h(l.data),s(!1)})()},[c]),n.useEffect(()=>{M()},[c]);const M=async()=>{p(!0);const a=await ne(c);a.success&&D(a.data),p(!1)},H=()=>{if(!(t!=null&&t.Contact)){alert("لا يوجد رقم هاتف للمشترك");return}if(t.Balance>=0){alert("لا يوجد عليه فواتير");return}const a=t.Contact.replace(/\D/g,""),l=`قيمة فاتورتك الحالية هي: ${t.Balance*-1} دولار.
يرجى التسديد قبل تاريخ 5-1-2026 لضمان استمرار الخدمة دون انقطاع.
شكرًا لثقتك بخدماتنا.`,S=`https://wa.me/${a}?text=${encodeURIComponent(l)}`;window.open(S,"_blank")},J=async a=>{var l,S;a.preventDefault(),I(!0);try{if(!b||!N||!C||!c){alert("يرجى ملء جميع الحقول المطلوبة"),I(!1);return}const o={amount:b,date:N?me(N).format("YYYY-MM-DD"):"",details:C,subscriberID:c,total:Number(t.Balance)||0,dealer:m.role==="dealer"?m.username:void 0};let r;w==="اضافة فاتورة"?r=await le(o):r=m.role==="dealer"?await he(o):await oe(o),r!=null&&r.message&&r.message.includes("success")?(window.confirm("هل تريد طباعة إيصال؟")&&O(),alert("تمت الإضافة بنجاح"),g(!1),M(),B(null),R(0),A("")):(console.error("API Error Response:",r),alert((r==null?void 0:r.error)||"حدث خطأ أثناء الإرسال، يرجى المحاولة لاحقًا.")),h(w==="اضافة فاتورة"?{...t,Balance:t.Balance-b}:{...t,Balance:t.Balance+b})}catch(o){console.error("Exception in handleSubmit:",o),(S=(l=o==null?void 0:o.response)==null?void 0:l.data)!=null&&S.error?alert("خطأ: "+o.response.data.error):alert("حدث خطأ غير متوقع. يرجى التحقق من الاتصال أو المحاولة لاحقًا.")}finally{I(!1)}},E=n.useRef(),O=ie.useReactToPrint({contentRef:E,pageStyle:`
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
    `,onAfterPrint:()=>{console.log("تمت الطباعة بنجاح!"),g(!1)}}),$=()=>{const a=new Date,l={year:"numeric",month:"numeric",day:"numeric",weekday:"long",hour:"numeric",minute:"numeric",second:"numeric"};return a.toLocaleDateString("en-GB",l)};if(n.useEffect(()=>{f&&k&&O()},[k,f]),v||!t)return e.jsx(F,{children:e.jsx(V,{className:"h-64 w-full"})});const G=[{key:"amount",label:"الكمية",sortable:!0},{key:"Details",label:"التفاصيل",sortable:!0},{key:"date",label:"الوقت",sortable:!0}];return e.jsxs(F,{children:[e.jsx(X,{isOpen:f,setIsOpen:g,title:w,trigger:e.jsx(e.Fragment,{}),children:e.jsxs("div",{className:"flex flex-row-reverse gap-2",children:[k?e.jsx(e.Fragment,{}):e.jsxs("form",{onSubmit:J,className:"space-y-4 w-2/3",children:[e.jsx(Y,{value:b,onChange:a=>R(Number(a.target.value)),type:"number",placeholder:"القيمة بالدولار",required:!0}),e.jsx(ce,{dateAdapter:de,children:e.jsx(ue,{className:"w-full",label:"اختر التاريخ",value:N,onChange:a=>B(a),format:"DD/MM/YYYY"})}),e.jsx(Y,{value:C,onChange:a=>A(a.target.value),type:"text",placeholder:"تفاصيل (اختياري)"}),e.jsx("button",{disabled:!!T,type:"submit",className:"w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition",children:T?"جاري حفظ التعديلات ...":"إرسال"})]}),e.jsxs("div",{ref:E,className:"p-4 text-sm",dir:"rtl",children:[e.jsxs("div",{className:"header",children:[e.jsx("h1",{children:"Daher.Net"}),e.jsx("span",{children:$()})]}),e.jsxs("div",{className:"text-right font-bold mb-2",children:[e.jsxs("div",{children:["اسم المشترك: ",(t==null?void 0:t.Name)||"غير معروف"]}),e.jsxs("div",{children:["الرقم: ",t==null?void 0:t.Contact]})]}),e.jsxs("div",{className:"text-right mb-2",children:[e.jsx("div",{className:"font-semibold",children:"التفاصيل:"}),e.jsx("div",{className:"border p-1 rounded",children:C||"بدون ملاحظات"})]}),e.jsx("div",{className:"text-right totalValue mt-4",children:e.jsxs("div",{className:"text-lg font-extrabold border-t pt-2",children:[w=="اضافة دفعة"?"المبلغ المدفوع":"المبلغ المطلوب",": ",b," دولار"]})}),e.jsx("div",{className:"cut mt-4 border-t pt-2 text-center text-xs",children:"-- شكراً لثقتكم بخدماتنا --"})]})]})}),e.jsxs("div",{className:"space-y-6",dir:"rtl",children:[e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsx("h1",{className:"text-3xl font-bold",children:"بيانات المشترك"}),e.jsxs(j,{onClick:()=>y("/users"),variant:"outline",children:[e.jsx(xe,{className:"ml-2 w-4 h-4"})," رجوع"]})]}),e.jsxs(z,{children:[e.jsx(Z,{children:e.jsx(ee,{children:"المعلومات الأساسية"})}),e.jsx(te,{className:"",children:e.jsx(ge,{customer:{...t,address:(d==null?void 0:d.address)||""},setCustomer:h})})]}),e.jsxs("div",{className:"flex justify-start gap-2",children:[m.role=="admin"&&e.jsxs(j,{variant:"destructive",onClick:()=>{P("اضافة فاتورة"),L(!1),g(!0)},children:[e.jsx(q,{className:"w-4 h-4 ml-2"})," إضافة فاتورة"]}),e.jsxs(j,{variant:"default",onClick:()=>{P("اضافة دفعة"),L(!1),g(!0)},children:[e.jsx(q,{className:"w-4 h-4 ml-2"})," إضافة دفعة"]}),e.jsx(j,{variant:"outline",onClick:H,children:"واتساب"}),e.jsx(j,{variant:"outline",onClick:M,children:e.jsx(fe,{})})]}),e.jsx(z,{className:"overflow-x-auto",children:u?e.jsx(V,{className:"h-48 w-full"}):(x==null?void 0:x.length)===0?e.jsx("p",{className:"text-muted-foreground text-center",children:"لا توجد معاملات حالياً."}):e.jsx(e.Fragment,{children:e.jsx(ae,{title:"البيان المالي",columns:G,data:x||[],defaultPageSize:5,getRowClassName:a=>a.type!=="payment"?"text-red-500":"text-green-500",renderRowActions:a=>e.jsx(j,{variant:"outline",onClick:()=>{P(a.type==="payment"?"اضافة دفعة":"اضافة فاتورة"),R(a.amount),A(a.Details),B(a.date),L(!0),g(!0)},children:e.jsx(pe,{})})})})})]})]})}export{De as default};
