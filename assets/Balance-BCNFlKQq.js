import{c as re,r as s,g as K,j as e,f as be}from"./index-BKguLu9t.js";import{u as F}from"./useQuery-DygMYzmI.js";import{u as L}from"./useMutation-RcSKqZic.js";import{D as ne,H as ve}from"./DashboardLayout-BFhYKwyU.js";import{S as M}from"./StatsCard-D3EicqlA.js";import{C as je}from"./ChartContainer-CgUrs022.js";import{D as I}from"./DataTable-PDf8GxgZ.js";import{a as d}from"./axios-KE4dpIQc.js";import{g as Se,f as De,h as Pe}from"./wifi-LQWNa4dc.js";import{B as C}from"./button-DpKtpTNt.js";import{P as z}from"./PopupForm-CQRMWIA6.js";import{I as ae}from"./input-PKocyVEo.js";import{l as oe}from"./index-Bi8_HUvt.js";import{L as Ne,A as we,D as Ce,d as ke}from"./DatePicker-Czl-18y8.js";import{F as w}from"./FormInput-aO1UpP7b.js";import{C as Me}from"./credit-card-DxznV4c8.js";import"./house-YyitGq4U.js";import"./card-z6DlzwnM.js";import"./index-xsH4HHeE.js";/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ae=re("Coins",[["circle",{cx:"8",cy:"8",r:"6",key:"3yglwk"}],["path",{d:"M18.09 10.37A6 6 0 1 1 10.34 18",key:"t5s6rm"}],["path",{d:"M7 6h1v4",key:"1obek4"}],["path",{d:"m16.71 13.88.7.71-2.82 2.82",key:"1rbuyh"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const se=re("TrendingUp",[["polyline",{points:"22 7 13.5 15.5 8.5 10.5 2 17",key:"126l90"}],["polyline",{points:"16 7 22 7 22 13",key:"kwv8wd"}]]),Ee={async getUsers(){return(await d.get("/users")).data},async getUser(n){return(await d.get(`/users/${n}`)).data},async getPosts(){return(await d.get("/posts")).data},async getPostsByUser(n){return(await d.get(`/posts?userId=${n}`)).data},async getTodos(){return(await d.get("/todos")).data},async getTodosByUser(n){return(await d.get(`/todos?userId=${n}`)).data},async getDashboardStats(){const[n,a,g]=await Promise.all([this.getUsers(),this.getPosts(),this.getTodos()]),u=g.filter(m=>m.completed).length,h=g.filter(m=>!m.completed).length;return{totalUsers:n.length,totalPosts:a.length,completedTodos:u,pendingTodos:h,revenueGrowth:Math.floor(Math.random()*30)+10,userGrowth:Math.floor(Math.random()*20)+5}},async getChartData(){return["Jan","Feb","Mar","Apr","May","Jun"].map((a,g)=>({month:a,revenue:Math.floor(Math.random()*1e4)+5e3,users:Math.floor(Math.random()*500)+200,orders:Math.floor(Math.random()*200)+50}))}};async function Te(){try{return await(await d.get("/api/reports/monthly-revenue")).data}catch(n){return console.error("Error fetching monthly revenue:",n),{success:!1,error:n}}}async function Fe(n){try{return(await d.post("/api/exchange/addPending",n)).data}catch(a){return console.error("Error adding payment:",a),{success:!1,error:a}}}async function Le(n){try{return(await d.delete("/api/exchange/deletePending",{data:n})).data}catch(a){return console.error("Error adding payment:",a),{success:!1,error:a}}}async function Be(){try{return(await d.get("/api/exchange/getPending")).data}catch(n){return console.error("Error adding payment:",n),{success:!1,error:n}}}async function Ye(n){try{return(await d.post("/api/exchange/addDone",n)).data}catch(a){return console.error("Error adding payment:",a),{success:!1,error:a}}}function qe({isOpen:n,setIsOpen:a,className:g}){const[u,h]=s.useState(0),[m,v]=s.useState(0),[y,j]=s.useState(""),k=K(),f=L({mutationFn:o=>Fe(o),onSuccess:()=>{k.invalidateQueries({queryKey:["pendingEx"]}),alert("تم الاضافة بمجاح"),D(),a(!1)},onError:()=>{alert("حدث خطأ اثناء الاضافة")}}),S=s.useRef(),D=oe.useReactToPrint({contentRef:S,pageStyle:`
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
        `,onAfterPrint:()=>{console.log("تمت الطباعة بنجاح!"),a(!1)}}),x=()=>{const o=new Date,i={year:"numeric",month:"numeric",day:"numeric",weekday:"long",hour:"numeric",minute:"numeric",second:"numeric"};return o.toLocaleDateString("en-GB",i)};return e.jsx(z,{isOpen:n,setIsOpen:a,title:"تحويل",trigger:e.jsx(e.Fragment,{children:e.jsx(C,{className:g,variant:"accent",children:"تحويل"})}),children:e.jsxs("form",{onSubmit:o=>{o.preventDefault();let i={sypAmount:Number(u),usdAmount:Number(m),details:y};f.mutate(i)},className:"flex flex-col gap-4",children:[e.jsxs("div",{ref:S,children:[e.jsx("span",{children:x()}),e.jsx(w,{id:"SYPAmount",label:"العملة بالليرة السورية",value:u.toString(),type:"number",onChange:o=>{h(Number(o.target.value))}}),e.jsx(w,{id:"USDAmount",label:"العملة بالدولار",value:m.toString(),type:"number",onChange:o=>{v(Number(o.target.value))}}),e.jsx(w,{id:"exchangeDetails",label:"التفاصيل",value:y.toString(),type:"string",onChange:o=>{j(o.target.value)}})]}),e.jsx(C,{type:"submit",variant:"accent",disabled:f.isPending,children:f.isPending?"...":"تأكيد عملية التحويل"})]})})}function Re({isOpen:n,setIsOpen:a,className:g,SYPAmount:u,USDAmount:h,pendingId:m}){const[v,y]=s.useState(0),[j,k]=s.useState(0),[f,S]=s.useState(""),D=K(),x=L({mutationFn:({id:i})=>Le({id:i}),onSuccess:(i,P)=>{D.invalidateQueries({queryKey:["pendingEx"]}),o.mutate(P.dataToDelete)},onError:()=>{alert("حدث خطأ أثناء الحذف")}}),o=L({mutationFn:i=>Ye(i),onSuccess:()=>{D.invalidateQueries({queryKey:["DoneEx"]}),alert("تم الانهاء بمجاح"),a(!1)},onError:()=>{alert("حدث خطأ اثناء الانهاء")}});return e.jsx(z,{isOpen:n,setIsOpen:a,title:"انهاء عملية التحويل",trigger:e.jsx(e.Fragment,{children:e.jsx(C,{className:g,variant:"accent",children:"انهاء عملية التحويل"})}),children:e.jsxs("form",{onSubmit:i=>{i.preventDefault();let P={finalSYP:v,finalUSD:j,sypAmount:Number(u),usdAmount:Number(h),details:f};x.mutate({id:m,dataToDelete:P})},className:"flex flex-col gap-4",children:[e.jsxs("span",{children:["المتوقع ",u," ليرة الى ",h," دولار"]}),e.jsx(w,{id:"finalSYP",label:"العملة بالليرة السورية",value:v.toString(),type:"number",onChange:i=>{y(Number(i.target.value))}}),e.jsx(w,{id:"finalUSD",label:"العملة بالدولار",value:j.toString(),type:"number",onChange:i=>{k(Number(i.target.value))}}),e.jsx(w,{id:"exchangeDetails",label:"التفاصيل",value:f.toString(),type:"string",onChange:i=>{S(i.target.value)}}),e.jsx(C,{type:"submit",variant:"accent",disabled:o.isPending||x.isPending,children:o.isPending||x.isPending?"...":"تأكيد عملية التحويل"})]})})}function ct(){const n=be(),[a,g]=s.useState(0),[u,h]=s.useState([]),[m,v]=s.useState(0),[y,j]=s.useState(0),[k,f]=s.useState(null),[S,D]=s.useState(!1),[x,o]=s.useState(!1),[i,P]=s.useState(""),[Ue,O]=s.useState(!1),[B,Q]=s.useState(),[A,V]=s.useState(0),[Y,G]=s.useState(""),[We,Ie]=s.useState(!1),ie=async()=>{const t=await Se();t!=null&&t.success?h(t.customers):alert((t==null?void 0:t.error)||"فشل جلب البيانات")};s.useEffect(()=>{ie()},[]);const le=s.useMemo(()=>{const t=u.filter(l=>l.Balance<0).reduce((l,b)=>l+Number(b.Balance),0);return Math.abs(t)},[u]),{data:r,isLoading:ce}=F({queryKey:["balance-table"],queryFn:Pe});s.useEffect(()=>{var X,Z,ee,te;let t=0;(X=r==null?void 0:r.WifiBalance)==null||X.map(c=>{t+=Number(c.amount)}),(Z=r==null?void 0:r.WifiPayments)==null||Z.map(c=>{t+=Number(c.Amount)}),console.log(r),g(t);const l=new Date,b=l.getFullYear(),H=l.getMonth(),xe=l.getDate(),U=(ee=r==null?void 0:r.WifiPayments)==null?void 0:ee.filter(c=>{const N=new Date(c.Date);return N.getFullYear()===b&&N.getMonth()===H}),W=(te=r==null?void 0:r.WifiPayments)==null?void 0:te.filter(c=>{const N=new Date(c.Date);return N.getFullYear()===b&&N.getMonth()===H&&N.getDate()===xe});let J=0;U==null||U.map(c=>{J+=Number(c.Amount)}),j(J);let _=0;W==null||W.map(c=>{_+=Number(c.Amount)}),v(_)},[r]);const{data:q,isLoading:de}=F({queryKey:["dashboard-stats"],queryFn:Ee.getDashboardStats}),{data:p,isLoading:Ke}=F({queryKey:["pendingEx"],queryFn:Be}),E=s.useMemo(()=>{let t=0,l=0;return p==null||p.pendingList.forEach(b=>{t+=b.sypAmount||0,l+=b.usdAmount||0}),{sypTotal:t,usdTotal:l}},[p]),{data:T,isLoading:ze}=F({queryKey:["monthlyRevenue"],queryFn:Te}),ue=[{key:"id",label:"المعرف",sortable:!0,hidden:!0},{key:"sypAmount",label:"السوري",sortable:!0},{key:"usdAmount",label:"دولار",sortable:!0},{key:"details",label:"التفاصيل",sortable:!0},{key:"timestamp",label:"الوقت",sortable:!0}],me=[{key:"amount",label:"الكمية",sortable:!0},{key:"details",label:"التفاصيل",sortable:!0},{key:"timestamp",label:"الوقت",sortable:!0}],pe=[{key:"Amount",label:"الكمية",sortable:!0},{key:"Details",label:"التفاصيل",sortable:!0},{key:"Date",label:"الوقت",sortable:!0}],$=s.useRef(),ge=K(),R=L({mutationFn:De,onSuccess:()=>{alert("✅ تمت إضافة الدفعة."),ge.invalidateQueries({queryKey:["balance-table"]}),Q(null),V(0),G(""),o(!1)},onError:()=>{alert("❌ حدث خطأ أثناء الإرسال.")}}),he=oe.useReactToPrint({contentRef:$,pageStyle:`
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
    `,onAfterPrint:()=>{console.log("تمت الطباعة بنجاح!"),o(!1)}}),ye=()=>{const t=new Date,l={year:"numeric",month:"numeric",day:"numeric",weekday:"long",hour:"numeric",minute:"numeric",second:"numeric"};return t.toLocaleDateString("en-GB",l)};if(de)return e.jsx(ne,{children:e.jsx("div",{className:"flex items-center justify-center h-64",children:e.jsx("div",{className:"animate-spin rounded-full h-8 w-8 border-b-2 border-primary"})})});const fe=t=>{t.preventDefault(),window.confirm("هل تريد طباعة ايصال ؟")&&he();const l={amount:Number(i==="اضافة دفعة الى الصندوق"?A:-A),date:B?ke(B).format("YYYY-MM-DD"):"",details:Y};R.mutate(l)};return e.jsxs(ne,{children:[e.jsx(z,{isOpen:x,setIsOpen:o,title:i,trigger:e.jsx(e.Fragment,{}),children:e.jsxs("div",{className:"flex flex-row-reverse gap-2",children:[e.jsxs("form",{onSubmit:fe,className:"space-y-4 w-2/3",children:[e.jsx(ae,{value:A,onChange:t=>V(Number(t.target.value)),type:"number",placeholder:"القيمة بالدولار",required:!0}),e.jsx(Ne,{dateAdapter:we,children:e.jsx(Ce,{className:"w-full",label:"اختر التاريخ",value:B,onChange:t=>Q(t),format:"DD/MM/YYYY"})}),e.jsx(ae,{value:Y,onChange:t=>G(t.target.value),type:"text",placeholder:"تفاصيل (اختياري)"}),e.jsx("button",{type:"submit",className:"w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition",disabled:R.isPending,children:R.isPending?"جارٍ الإرسال...":"حفظ"})]}),e.jsxs("div",{ref:$,className:"p-4 text-sm",dir:"rtl",children:[e.jsxs("div",{className:"header",children:[e.jsx("h1",{children:"Daher.Net"}),e.jsx("span",{children:ye()})]}),e.jsxs("div",{className:"text-right mb-2",children:[e.jsx("div",{className:"font-semibold",children:"التفاصيل:"}),e.jsx("div",{className:"border p-1 rounded",children:Y||"بدون ملاحظات"})]}),e.jsx("div",{className:"text-right totalValue mt-4",children:e.jsxs("div",{className:"text-lg font-extrabold border-t pt-2",children:[i=="اضافة دفعة"?"المبلغ المدفوع":"المبلغ المطلوب",": ",A," دولار"]})}),e.jsx("div",{className:"cut mt-4 border-t pt-2 text-center text-xs",children:"-- شكراً لثقتكم بخدماتنا --"})]})]})}),e.jsxs("div",{className:"space-y-6",children:[e.jsx("div",{children:e.jsx("h1",{className:"text-3xl font-bold tracking-tight",children:"Balance"})}),ce?e.jsx("div",{dir:"rtl",className:"grid gap-4 md:grid-cols-2 lg:grid-cols-4",children:e.jsx("div",{className:"animate-pulse",children:e.jsx(M,{title:"الرصيد الحالي",value:0,description:" . فرق عن الشهر السابق",icon:se,trend:{value:0,isPositive:!0}})})}):e.jsxs("div",{dir:"rtl",className:"grid gap-4 md:grid-cols-2 lg:grid-cols-4",children:[e.jsxs("div",{children:[e.jsx(M,{className:"rounded-b-none",title:"الرصيد الحالي",value:a||0,description:" . فرق عن الشهر السابق",icon:se,trend:{value:a-y||0,isPositive:a-y>0}}),e.jsxs("div",{className:"",children:[e.jsx(C,{onClick:()=>{P("اضافة دفعة الى الصندوق"),O(!1),o(!0)},className:"w-1/2 rounded-l-none rounded-tr-none",children:"اضف دفعة"}),e.jsx(C,{variant:"destructive",onClick:()=>{P("دفع من الصندوق"),O(!1),o(!0)},className:"w-1/2 rounded-r-none rounded-tl-none",children:"دفع من الصندوق"})]})]}),e.jsx(M,{title:"ايرادات هذا الشهر",value:y||0,description:" . اليوم",icon:Me,trend:{value:m||0,isPositive:!0}}),e.jsx(M,{onClick:()=>{n("/users",{state:"unpaid"})},title:"الديون",value:le||0,description:"",icon:ve,trend:{value:(q==null?void 0:q.userGrowth)||0,isPositive:!0}}),e.jsxs("div",{className:"flex flex-col",children:[e.jsx(M,{className:"rounded-b-none",title:"للتحويل",value:E.sypTotal,description:" . دولار",icon:Ae,trend:{value:(E==null?void 0:E.usdTotal)||0,isPositive:!1}}),e.jsx(qe,{className:"rounded-t-none w-full",isOpen:S,setIsOpen:D})]})]}),e.jsx("div",{className:"grid gap-6 text-center",children:e.jsx(je,{className:"mdL:col-span-2",title:" الحركة المالية ",data:T?Object.entries(T==null?void 0:T.data).map(([t,l])=>({name:t,الفواتير:l.invoices,المدفوعات:l.payments})):[],type:"area",dataKey2:"المدفوعات",dataKey:"الفواتير"})}),e.jsxs("div",{dir:"rtl",className:"grid gap-6 lg:grid-cols-2",children:[e.jsx(I,{title:"الصندوق",description:"",columns:me,data:r!=null&&r.WifiBalance?[...r.WifiBalance].reverse():[]}),e.jsx(I,{title:"الدفعات",description:"دفعات المشتركين",columns:pe,data:r!=null&&r.WifiPayments?[...r.WifiPayments].reverse():[]}),e.jsx("div",{children:e.jsx(I,{title:"دفعات للتحويل",description:"",columns:ue,data:p!=null&&p.pendingList?p==null?void 0:p.pendingList:[],renderRowActions:t=>e.jsx(Re,{isOpen:k===t.id,setIsOpen:l=>f(l?t.id:null),className:"",SYPAmount:t.sypAmount,USDAmount:t.usdAmount,pendingId:t.id})})})]})]})]})}export{ct as default};
