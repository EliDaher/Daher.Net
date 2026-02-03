import{p as re,v as g,r as s,h as O,j as e,q as be,i as E}from"./index-BKqbcix8.js";import{u as B}from"./useMutation-BYPHhS6B.js";import{D as ne,H as ve}from"./DashboardLayout-DmeblnVr.js";import{S as T}from"./StatsCard-CcM9Fl2p.js";import{C as je}from"./ChartContainer-vk7ORQJH.js";import{D as z}from"./DataTable-CKhOKr2w.js";import{h as De,g as Ne,i as Se}from"./wifi-BI4w-OQc.js";import{m as Pe}from"./reports-CSJQRArc.js";import{B as M}from"./button-DDKBuYHr.js";import{P as Q}from"./PopupForm-Bn1YsRoi.js";import{I as ae}from"./input-CXMDr5A9.js";import{l as oe}from"./index-SaErnyh2.js";import{L as we,A as ke,D as Ce,d as Me}from"./DatePicker-oJs2KMfC.js";import{F as C}from"./FormInput-Bp_gjdMv.js";import{C as Ae}from"./credit-card-DVyAhVeQ.js";import"./house-__urwRk_.js";import"./card-DCSnOKeZ.js";/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ee=re("Coins",[["circle",{cx:"8",cy:"8",r:"6",key:"3yglwk"}],["path",{d:"M18.09 10.37A6 6 0 1 1 10.34 18",key:"t5s6rm"}],["path",{d:"M7 6h1v4",key:"1obek4"}],["path",{d:"m16.71 13.88.7.71-2.82 2.82",key:"1rbuyh"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const se=re("TrendingUp",[["polyline",{points:"22 7 13.5 15.5 8.5 10.5 2 17",key:"126l90"}],["polyline",{points:"16 7 22 7 22 13",key:"kwv8wd"}]]),Te={async getUsers(){return(await g.get("/users")).data},async getUser(a){return(await g.get(`/users/${a}`)).data},async getPosts(){return(await g.get("/posts")).data},async getPostsByUser(a){return(await g.get(`/posts?userId=${a}`)).data},async getTodos(){return(await g.get("/todos")).data},async getTodosByUser(a){return(await g.get(`/todos?userId=${a}`)).data},async getDashboardStats(){const[a,t,y]=await Promise.all([this.getUsers(),this.getPosts(),this.getTodos()]),h=y.filter(d=>d.completed).length,f=y.filter(d=>!d.completed).length;return{totalUsers:a.length,totalPosts:t.length,completedTodos:h,pendingTodos:f,revenueGrowth:Math.floor(Math.random()*30)+10,userGrowth:Math.floor(Math.random()*20)+5}},async getChartData(){return["Jan","Feb","Mar","Apr","May","Jun"].map((t,y)=>({month:t,revenue:Math.floor(Math.random()*1e4)+5e3,users:Math.floor(Math.random()*500)+200,orders:Math.floor(Math.random()*200)+50}))}};async function Fe(a){try{return(await g.post("/api/exchange/addPending",a)).data}catch(t){return console.error("Error adding payment:",t),{success:!1,error:t}}}async function Le(a){try{return(await g.delete("/api/exchange/deletePending",{data:a})).data}catch(t){return console.error("Error adding payment:",t),{success:!1,error:t}}}async function qe(){try{return(await g.get("/api/exchange/getPending")).data}catch(a){return console.error("Error adding payment:",a),{success:!1,error:a}}}async function Be(a){try{return(await g.post("/api/exchange/addDone",a)).data}catch(t){return console.error("Error adding payment:",t),{success:!1,error:t}}}function Ye({isOpen:a,setIsOpen:t,className:y}){const[h,f]=s.useState(0),[d,j]=s.useState(0),[D,N]=s.useState(""),A=O(),b=B({mutationFn:i=>Fe(i),onSuccess:()=>{A.invalidateQueries({queryKey:["pendingEx"]}),alert("تم الاضافة بمجاح"),m(),t(!1)},onError:()=>{alert("حدث خطأ اثناء الاضافة")}}),S=s.useRef(),m=oe.useReactToPrint({contentRef:S,pageStyle:`
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
        `,onAfterPrint:()=>{console.log("تمت الطباعة بنجاح!"),t(!1)}}),x=()=>{const i=new Date,l={year:"numeric",month:"numeric",day:"numeric",weekday:"long",hour:"numeric",minute:"numeric",second:"numeric"};return i.toLocaleDateString("en-GB",l)};return e.jsx(Q,{isOpen:a,setIsOpen:t,title:"تحويل",trigger:e.jsx(e.Fragment,{children:e.jsx(M,{className:y,variant:"accent",children:"تحويل"})}),children:e.jsxs("form",{onSubmit:i=>{i.preventDefault();let l={sypAmount:Number(h),usdAmount:Number(d),details:D};b.mutate(l)},className:"flex flex-col gap-4",children:[e.jsxs("div",{ref:S,children:[e.jsx("span",{children:x()}),e.jsx(C,{id:"SYPAmount",label:"العملة بالليرة السورية",value:h.toString(),type:"number",onChange:i=>{f(Number(i.target.value))}}),e.jsx(C,{id:"USDAmount",label:"العملة بالدولار",value:d.toString(),type:"number",onChange:i=>{j(Number(i.target.value))}}),e.jsx(C,{id:"exchangeDetails",label:"التفاصيل",value:D.toString(),type:"string",onChange:i=>{N(i.target.value)}})]}),e.jsx(M,{type:"submit",variant:"accent",disabled:b.isPending,children:b.isPending?"...":"تأكيد عملية التحويل"})]})})}function Re({isOpen:a,setIsOpen:t,className:y,SYPAmount:h,USDAmount:f,pendingId:d}){const[j,D]=s.useState(0),[N,A]=s.useState(0),[b,S]=s.useState(""),m=O(),x=B({mutationFn:({id:l})=>Le({id:l}),onSuccess:(l,P)=>{m.invalidateQueries({queryKey:["pendingEx"]}),i.mutate(P.dataToDelete)},onError:()=>{alert("حدث خطأ أثناء الحذف")}}),i=B({mutationFn:l=>Be(l),onSuccess:()=>{m.invalidateQueries({queryKey:["DoneEx"]}),alert("تم الانهاء بمجاح"),t(!1)},onError:()=>{alert("حدث خطأ اثناء الانهاء")}});return e.jsx(Q,{isOpen:a,setIsOpen:t,title:"انهاء عملية التحويل",trigger:e.jsx(e.Fragment,{children:e.jsx(M,{className:y,variant:"accent",children:"انهاء عملية التحويل"})}),children:e.jsxs("form",{onSubmit:l=>{l.preventDefault();let P={finalSYP:j,finalUSD:N,sypAmount:Number(h),usdAmount:Number(f),details:b};x.mutate({id:d,dataToDelete:P})},className:"flex flex-col gap-4",children:[e.jsxs("span",{children:["المتوقع ",h," ليرة الى ",f," دولار"]}),e.jsx(C,{id:"finalSYP",label:"العملة بالليرة السورية",value:j.toString(),type:"number",onChange:l=>{D(Number(l.target.value))}}),e.jsx(C,{id:"finalUSD",label:"العملة بالدولار",value:N.toString(),type:"number",onChange:l=>{A(Number(l.target.value))}}),e.jsx(C,{id:"exchangeDetails",label:"التفاصيل",value:b.toString(),type:"string",onChange:l=>{S(l.target.value)}}),e.jsx(M,{type:"submit",variant:"accent",disabled:i.isPending||x.isPending,children:i.isPending||x.isPending?"...":"تأكيد عملية التحويل"})]})})}function st(){const a=be(),[t,y]=s.useState(0),[h,f]=s.useState(0),[d,j]=s.useState(0),[D,N]=s.useState(null),[A,b]=s.useState(!1),[S,m]=s.useState(!1),[x,i]=s.useState(""),[l,P]=s.useState(!1),[Y,V]=s.useState(),[F,G]=s.useState(0),[R,$]=s.useState(""),{data:v,isLoading:ie}=E({queryKey:["customers-table"],queryFn:Ne}),le=s.useMemo(()=>{var o;const n=(o=v==null?void 0:v.filter(c=>(c==null?void 0:c.Balance)<0))==null?void 0:o.reduce((c,w)=>c+Number(w==null?void 0:w.Balance),0);return Math.abs(n)},[v]),{data:r,isLoading:de}=E({queryKey:["balance-table"],queryFn:Se});s.useEffect(()=>{var X,Z,ee,te;let n=0;(X=r==null?void 0:r.WifiBalance)==null||X.map(u=>{n+=Number(u.amount)}),(Z=r==null?void 0:r.WifiPayments)==null||Z.map(u=>{n+=Number(u.Amount)}),y(n);const o=new Date,c=o.getFullYear(),w=o.getMonth(),fe=o.getDate(),K=(ee=r==null?void 0:r.WifiPayments)==null?void 0:ee.filter(u=>{const k=new Date(u.Date);return k.getFullYear()===c&&k.getMonth()===w}),W=(te=r==null?void 0:r.WifiPayments)==null?void 0:te.filter(u=>{const k=new Date(u.Date);return k.getFullYear()===c&&k.getMonth()===w&&k.getDate()===fe});let J=0;K==null||K.map(u=>{J+=Number(u.Amount)}),j(J);let _=0;W==null||W.map(u=>{_+=Number(u.Amount)}),f(_)},[r]);const{data:U,isLoading:ce}=E({queryKey:["dashboard-stats"],queryFn:Te.getDashboardStats}),{data:p,isLoading:Ue}=E({queryKey:["pendingEx"],queryFn:qe}),L=s.useMemo(()=>{let n=0,o=0;return p==null||p.pendingList.forEach(c=>{n+=c.sypAmount||0,o+=c.usdAmount||0}),{sypTotal:n,usdTotal:o}},[p]),{data:q,isLoading:Ie}=E({queryKey:["monthlyRevenue"],queryFn:Pe}),ue=[{key:"id",label:"المعرف",sortable:!0,hidden:!0},{key:"sypAmount",label:"السوري",sortable:!0},{key:"usdAmount",label:"دولار",sortable:!0},{key:"details",label:"التفاصيل",sortable:!0},{key:"timestamp",label:"الوقت",sortable:!0}],me=[{key:"amount",label:"الكمية",sortable:!0},{key:"details",label:"التفاصيل",sortable:!0},{key:"timestamp",label:"الوقت",sortable:!0}],pe=[{key:"Amount",label:"الكمية",sortable:!0},{key:"customerName",label:"اسم الزبون",sortable:!0},{key:"Details",label:"التفاصيل",sortable:!0},{key:"Date",label:"الوقت",sortable:!0}],H=s.useRef(),ge=O(),I=B({mutationFn:De,onSuccess:()=>{alert("✅ تمت إضافة الدفعة."),ge.invalidateQueries({queryKey:["balance-table"]}),V(null),G(0),$(""),m(!1)},onError:()=>{alert("❌ حدث خطأ أثناء الإرسال.")}}),ye=oe.useReactToPrint({contentRef:H,pageStyle:`
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
    `,onAfterPrint:()=>{console.log("تمت الطباعة بنجاح!"),m(!1)}}),he=()=>{const n=new Date,o={year:"numeric",month:"numeric",day:"numeric",weekday:"long",hour:"numeric",minute:"numeric",second:"numeric"};return n.toLocaleDateString("en-GB",o)};if(ce)return e.jsx(ne,{children:e.jsx("div",{className:"flex items-center justify-center h-64",children:e.jsx("div",{className:"animate-spin rounded-full h-8 w-8 border-b-2 border-primary"})})});const xe=n=>{n.preventDefault(),window.confirm("هل تريد طباعة ايصال ؟")&&ye();const o={amount:Number(x==="اضافة دفعة الى الصندوق"?F:-F),date:Y?Me(Y).format("YYYY-MM-DD"):"",details:R};I.mutate(o)};return e.jsxs(ne,{children:[e.jsx(Q,{isOpen:S,setIsOpen:m,title:x,trigger:e.jsx(e.Fragment,{}),children:e.jsxs("div",{className:"flex flex-row-reverse gap-2",children:[e.jsxs("form",{onSubmit:xe,className:"space-y-4 w-2/3",children:[e.jsx(ae,{value:F,onChange:n=>G(Number(n.target.value)),type:"number",placeholder:"القيمة بالدولار",required:!0}),e.jsx(we,{dateAdapter:ke,children:e.jsx(Ce,{className:"w-full",label:"اختر التاريخ",value:Y,onChange:n=>V(n),format:"DD/MM/YYYY"})}),e.jsx(ae,{value:R,onChange:n=>$(n.target.value),type:"text",placeholder:"تفاصيل (اختياري)"}),e.jsx("button",{type:"submit",className:"w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition",disabled:I.isPending,children:I.isPending?"جارٍ الإرسال...":"حفظ"})]}),e.jsxs("div",{ref:H,className:"p-4 text-sm",dir:"rtl",children:[e.jsxs("div",{className:"header",children:[e.jsx("h1",{children:"Daher.Net"}),e.jsx("span",{children:he()})]}),e.jsxs("div",{className:"text-right mb-2",children:[e.jsx("div",{className:"font-semibold",children:"التفاصيل:"}),e.jsx("div",{className:"border p-1 rounded",children:R||"بدون ملاحظات"})]}),e.jsx("div",{className:"text-right totalValue mt-4",children:e.jsxs("div",{className:"text-lg font-extrabold border-t pt-2",children:[x=="اضافة دفعة"?"المبلغ المدفوع":"المبلغ المطلوب",": ",F," دولار"]})}),e.jsx("div",{className:"cut mt-4 border-t pt-2 text-center text-xs",children:"-- شكراً لثقتكم بخدماتنا --"})]})]})}),e.jsxs("div",{className:"space-y-6",children:[e.jsx("div",{children:e.jsx("h1",{className:"text-3xl font-bold tracking-tight",children:"Balance"})}),de?e.jsx("div",{dir:"rtl",className:"grid gap-4 md:grid-cols-2 lg:grid-cols-4",children:e.jsx("div",{className:"animate-pulse",children:e.jsx(T,{title:"الرصيد الحالي",value:0,description:" . فرق عن الشهر السابق",icon:se,trend:{value:0,isPositive:!0}})})}):e.jsxs("div",{dir:"rtl",className:"grid gap-4 md:grid-cols-2 lg:grid-cols-4",children:[e.jsxs("div",{children:[e.jsx(T,{className:"rounded-b-none",title:"الرصيد الحالي",value:t||0,description:" . فرق عن الشهر السابق",icon:se,trend:{value:t-d||0,isPositive:t-d>0}}),e.jsxs("div",{className:"",children:[e.jsx(M,{onClick:()=>{i("اضافة دفعة الى الصندوق"),P(!1),m(!0)},className:"w-1/2 rounded-l-none rounded-tr-none",children:"اضف دفعة"}),e.jsx(M,{variant:"destructive",onClick:()=>{i("دفع من الصندوق"),P(!1),m(!0)},className:"w-1/2 rounded-r-none rounded-tl-none",children:"دفع من الصندوق"})]})]}),e.jsx(T,{title:"ايرادات هذا الشهر",value:d||0,description:" . اليوم",icon:Ae,trend:{value:h||0,isPositive:!0}}),e.jsx(T,{onClick:()=>{a("/users",{state:"unpaid"})},title:"الديون",value:le||0,description:"",icon:ve,trend:{value:(U==null?void 0:U.userGrowth)||0,isPositive:!0},loading:ie}),e.jsxs("div",{className:"flex flex-col",children:[e.jsx(T,{className:"rounded-b-none",title:"للتحويل",value:L.sypTotal,description:" . دولار",icon:Ee,trend:{value:(L==null?void 0:L.usdTotal)||0,isPositive:!1}}),e.jsx(Ye,{className:"rounded-t-none w-full",isOpen:A,setIsOpen:b})]})]}),e.jsx("div",{className:"grid gap-6 text-center",children:e.jsx(je,{className:"mdL:col-span-2",title:" الحركة المالية ",data:q?Object.entries(q==null?void 0:q.data).map(([n,o])=>({name:n,الفواتير:o.invoices,المدفوعات:o.payments})):[],type:"area",dataKey2:"المدفوعات",dataKey:"الفواتير"})}),e.jsxs("div",{dir:"rtl",className:"flex flex-col md:flex-row gap-4",children:[e.jsx(z,{title:"الصندوق",description:"",columns:me,data:r!=null&&r.WifiBalance?[...r.WifiBalance].reverse():[]}),e.jsx(z,{title:"الدفعات",description:"دفعات المشتركين",columns:pe,data:r!=null&&r.WifiPayments?r.WifiPayments.map(n=>{var o;return{...n,customerName:((o=v==null?void 0:v[n.SubscriberID])==null?void 0:o.Name)||"غير معروف"}}).reverse():[]}),e.jsx("div",{children:e.jsx(z,{title:"دفعات للتحويل",description:"",columns:ue,data:p!=null&&p.pendingList?p==null?void 0:p.pendingList:[],renderRowActions:n=>e.jsx(Re,{isOpen:D===n.id,setIsOpen:o=>N(o?n.id:null),className:"",SYPAmount:n.sypAmount,USDAmount:n.usdAmount,pendingId:n.id})})})]})]})]})}export{st as default};
