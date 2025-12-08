import{c as re,x as p,r as s,k as K,v as L,j as e,s as I,B as C,i as be,l as F,D as ne,w as ae,z as ve,p as z}from"./index-CrMoN2Dt.js";import{S as M}from"./StatsCard-B5KOPxh5.js";import{C as je}from"./ChartContainer-D9FYspbM.js";import{g as Se,h as De,i as Ne}from"./wifi-CFAe6qyX.js";import{m as Pe}from"./reports-PbFPaQeY.js";import{l as oe}from"./index-d9lq76pT.js";import{L as we,A as Ce,D as ke,d as Me}from"./DatePicker-C1fxM2rP.js";import{F as w}from"./FormInput-CVh-hAfm.js";import{C as Ae}from"./credit-card-8pvkFk-g.js";/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ee=re("Coins",[["circle",{cx:"8",cy:"8",r:"6",key:"3yglwk"}],["path",{d:"M18.09 10.37A6 6 0 1 1 10.34 18",key:"t5s6rm"}],["path",{d:"M7 6h1v4",key:"1obek4"}],["path",{d:"m16.71 13.88.7.71-2.82 2.82",key:"1rbuyh"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const se=re("TrendingUp",[["polyline",{points:"22 7 13.5 15.5 8.5 10.5 2 17",key:"126l90"}],["polyline",{points:"16 7 22 7 22 13",key:"kwv8wd"}]]),Te={async getUsers(){return(await p.get("/users")).data},async getUser(a){return(await p.get(`/users/${a}`)).data},async getPosts(){return(await p.get("/posts")).data},async getPostsByUser(a){return(await p.get(`/posts?userId=${a}`)).data},async getTodos(){return(await p.get("/todos")).data},async getTodosByUser(a){return(await p.get(`/todos?userId=${a}`)).data},async getDashboardStats(){const[a,n,g]=await Promise.all([this.getUsers(),this.getPosts(),this.getTodos()]),c=g.filter(u=>u.completed).length,h=g.filter(u=>!u.completed).length;return{totalUsers:a.length,totalPosts:n.length,completedTodos:c,pendingTodos:h,revenueGrowth:Math.floor(Math.random()*30)+10,userGrowth:Math.floor(Math.random()*20)+5}},async getChartData(){return["Jan","Feb","Mar","Apr","May","Jun"].map((n,g)=>({month:n,revenue:Math.floor(Math.random()*1e4)+5e3,users:Math.floor(Math.random()*500)+200,orders:Math.floor(Math.random()*200)+50}))}};async function Fe(a){try{return(await p.post("/api/exchange/addPending",a)).data}catch(n){return console.error("Error adding payment:",n),{success:!1,error:n}}}async function Le(a){try{return(await p.delete("/api/exchange/deletePending",{data:a})).data}catch(n){return console.error("Error adding payment:",n),{success:!1,error:n}}}async function Be(){try{return(await p.get("/api/exchange/getPending")).data}catch(a){return console.error("Error adding payment:",a),{success:!1,error:a}}}async function Ye(a){try{return(await p.post("/api/exchange/addDone",a)).data}catch(n){return console.error("Error adding payment:",n),{success:!1,error:n}}}function qe({isOpen:a,setIsOpen:n,className:g}){const[c,h]=s.useState(0),[u,v]=s.useState(0),[y,j]=s.useState(""),k=K(),x=L({mutationFn:o=>Fe(o),onSuccess:()=>{k.invalidateQueries({queryKey:["pendingEx"]}),alert("تم الاضافة بمجاح"),D(),n(!1)},onError:()=>{alert("حدث خطأ اثناء الاضافة")}}),S=s.useRef(),D=oe.useReactToPrint({contentRef:S,pageStyle:`
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
        `,onAfterPrint:()=>{console.log("تمت الطباعة بنجاح!"),n(!1)}}),f=()=>{const o=new Date,i={year:"numeric",month:"numeric",day:"numeric",weekday:"long",hour:"numeric",minute:"numeric",second:"numeric"};return o.toLocaleDateString("en-GB",i)};return e.jsx(I,{isOpen:a,setIsOpen:n,title:"تحويل",trigger:e.jsx(e.Fragment,{children:e.jsx(C,{className:g,variant:"accent",children:"تحويل"})}),children:e.jsxs("form",{onSubmit:o=>{o.preventDefault();let i={sypAmount:Number(c),usdAmount:Number(u),details:y};x.mutate(i)},className:"flex flex-col gap-4",children:[e.jsxs("div",{ref:S,children:[e.jsx("span",{children:f()}),e.jsx(w,{id:"SYPAmount",label:"العملة بالليرة السورية",value:c.toString(),type:"number",onChange:o=>{h(Number(o.target.value))}}),e.jsx(w,{id:"USDAmount",label:"العملة بالدولار",value:u.toString(),type:"number",onChange:o=>{v(Number(o.target.value))}}),e.jsx(w,{id:"exchangeDetails",label:"التفاصيل",value:y.toString(),type:"string",onChange:o=>{j(o.target.value)}})]}),e.jsx(C,{type:"submit",variant:"accent",disabled:x.isPending,children:x.isPending?"...":"تأكيد عملية التحويل"})]})})}function Re({isOpen:a,setIsOpen:n,className:g,SYPAmount:c,USDAmount:h,pendingId:u}){const[v,y]=s.useState(0),[j,k]=s.useState(0),[x,S]=s.useState(""),D=K(),f=L({mutationFn:({id:i})=>Le({id:i}),onSuccess:(i,N)=>{D.invalidateQueries({queryKey:["pendingEx"]}),o.mutate(N.dataToDelete)},onError:()=>{alert("حدث خطأ أثناء الحذف")}}),o=L({mutationFn:i=>Ye(i),onSuccess:()=>{D.invalidateQueries({queryKey:["DoneEx"]}),alert("تم الانهاء بمجاح"),n(!1)},onError:()=>{alert("حدث خطأ اثناء الانهاء")}});return e.jsx(I,{isOpen:a,setIsOpen:n,title:"انهاء عملية التحويل",trigger:e.jsx(e.Fragment,{children:e.jsx(C,{className:g,variant:"accent",children:"انهاء عملية التحويل"})}),children:e.jsxs("form",{onSubmit:i=>{i.preventDefault();let N={finalSYP:v,finalUSD:j,sypAmount:Number(c),usdAmount:Number(h),details:x};f.mutate({id:u,dataToDelete:N})},className:"flex flex-col gap-4",children:[e.jsxs("span",{children:["المتوقع ",c," ليرة الى ",h," دولار"]}),e.jsx(w,{id:"finalSYP",label:"العملة بالليرة السورية",value:v.toString(),type:"number",onChange:i=>{y(Number(i.target.value))}}),e.jsx(w,{id:"finalUSD",label:"العملة بالدولار",value:j.toString(),type:"number",onChange:i=>{k(Number(i.target.value))}}),e.jsx(w,{id:"exchangeDetails",label:"التفاصيل",value:x.toString(),type:"string",onChange:i=>{S(i.target.value)}}),e.jsx(C,{type:"submit",variant:"accent",disabled:o.isPending||f.isPending,children:o.isPending||f.isPending?"...":"تأكيد عملية التحويل"})]})})}function Ze(){const a=be(),[n,g]=s.useState(0),[c,h]=s.useState([]),[u,v]=s.useState(0),[y,j]=s.useState(0),[k,x]=s.useState(null),[S,D]=s.useState(!1),[f,o]=s.useState(!1),[i,N]=s.useState(""),[Ue,O]=s.useState(!1),[B,Q]=s.useState(),[A,V]=s.useState(0),[Y,G]=s.useState(""),[We,ze]=s.useState(!1),ie=async()=>{const t=await Se();t!=null&&t.success?h(t.customers):alert((t==null?void 0:t.error)||"فشل جلب البيانات")};s.useEffect(()=>{ie()},[]);const le=s.useMemo(()=>{const t=c.filter(l=>l.Balance<0).reduce((l,b)=>l+Number(b.Balance),0);return Math.abs(t)},[c]),{data:r,isLoading:de}=F({queryKey:["balance-table"],queryFn:Ne});s.useEffect(()=>{var X,Z,ee,te;let t=0;(X=r==null?void 0:r.WifiBalance)==null||X.map(d=>{t+=Number(d.amount)}),(Z=r==null?void 0:r.WifiPayments)==null||Z.map(d=>{t+=Number(d.Amount)}),console.log(r),g(t);const l=new Date,b=l.getFullYear(),J=l.getMonth(),fe=l.getDate(),U=(ee=r==null?void 0:r.WifiPayments)==null?void 0:ee.filter(d=>{const P=new Date(d.Date);return P.getFullYear()===b&&P.getMonth()===J}),W=(te=r==null?void 0:r.WifiPayments)==null?void 0:te.filter(d=>{const P=new Date(d.Date);return P.getFullYear()===b&&P.getMonth()===J&&P.getDate()===fe});let H=0;U==null||U.map(d=>{H+=Number(d.Amount)}),j(H);let _=0;W==null||W.map(d=>{_+=Number(d.Amount)}),v(_)},[r]);const{data:q,isLoading:ce}=F({queryKey:["dashboard-stats"],queryFn:Te.getDashboardStats}),{data:m,isLoading:Ke}=F({queryKey:["pendingEx"],queryFn:Be}),E=s.useMemo(()=>{let t=0,l=0;return m==null||m.pendingList.forEach(b=>{t+=b.sypAmount||0,l+=b.usdAmount||0}),{sypTotal:t,usdTotal:l}},[m]),{data:T,isLoading:Ie}=F({queryKey:["monthlyRevenue"],queryFn:Pe}),ue=[{key:"id",label:"المعرف",sortable:!0,hidden:!0},{key:"sypAmount",label:"السوري",sortable:!0},{key:"usdAmount",label:"دولار",sortable:!0},{key:"details",label:"التفاصيل",sortable:!0},{key:"timestamp",label:"الوقت",sortable:!0}],me=[{key:"amount",label:"الكمية",sortable:!0},{key:"details",label:"التفاصيل",sortable:!0},{key:"timestamp",label:"الوقت",sortable:!0}],pe=[{key:"Amount",label:"الكمية",sortable:!0},{key:"Details",label:"التفاصيل",sortable:!0},{key:"Date",label:"الوقت",sortable:!0}],$=s.useRef(),ge=K(),R=L({mutationFn:De,onSuccess:()=>{alert("✅ تمت إضافة الدفعة."),ge.invalidateQueries({queryKey:["balance-table"]}),Q(null),V(0),G(""),o(!1)},onError:()=>{alert("❌ حدث خطأ أثناء الإرسال.")}}),he=oe.useReactToPrint({contentRef:$,pageStyle:`
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
    `,onAfterPrint:()=>{console.log("تمت الطباعة بنجاح!"),o(!1)}}),ye=()=>{const t=new Date,l={year:"numeric",month:"numeric",day:"numeric",weekday:"long",hour:"numeric",minute:"numeric",second:"numeric"};return t.toLocaleDateString("en-GB",l)};if(ce)return e.jsx(ne,{children:e.jsx("div",{className:"flex items-center justify-center h-64",children:e.jsx("div",{className:"animate-spin rounded-full h-8 w-8 border-b-2 border-primary"})})});const xe=t=>{t.preventDefault(),window.confirm("هل تريد طباعة ايصال ؟")&&he();const l={amount:Number(i==="اضافة دفعة الى الصندوق"?A:-A),date:B?Me(B).format("YYYY-MM-DD"):"",details:Y};R.mutate(l)};return e.jsxs(ne,{children:[e.jsx(I,{isOpen:f,setIsOpen:o,title:i,trigger:e.jsx(e.Fragment,{}),children:e.jsxs("div",{className:"flex flex-row-reverse gap-2",children:[e.jsxs("form",{onSubmit:xe,className:"space-y-4 w-2/3",children:[e.jsx(ae,{value:A,onChange:t=>V(Number(t.target.value)),type:"number",placeholder:"القيمة بالدولار",required:!0}),e.jsx(we,{dateAdapter:Ce,children:e.jsx(ke,{className:"w-full",label:"اختر التاريخ",value:B,onChange:t=>Q(t),format:"DD/MM/YYYY"})}),e.jsx(ae,{value:Y,onChange:t=>G(t.target.value),type:"text",placeholder:"تفاصيل (اختياري)"}),e.jsx("button",{type:"submit",className:"w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition",disabled:R.isPending,children:R.isPending?"جارٍ الإرسال...":"حفظ"})]}),e.jsxs("div",{ref:$,className:"p-4 text-sm",dir:"rtl",children:[e.jsxs("div",{className:"header",children:[e.jsx("h1",{children:"Daher.Net"}),e.jsx("span",{children:ye()})]}),e.jsxs("div",{className:"text-right mb-2",children:[e.jsx("div",{className:"font-semibold",children:"التفاصيل:"}),e.jsx("div",{className:"border p-1 rounded",children:Y||"بدون ملاحظات"})]}),e.jsx("div",{className:"text-right totalValue mt-4",children:e.jsxs("div",{className:"text-lg font-extrabold border-t pt-2",children:[i=="اضافة دفعة"?"المبلغ المدفوع":"المبلغ المطلوب",": ",A," دولار"]})}),e.jsx("div",{className:"cut mt-4 border-t pt-2 text-center text-xs",children:"-- شكراً لثقتكم بخدماتنا --"})]})]})}),e.jsxs("div",{className:"space-y-6",children:[e.jsx("div",{children:e.jsx("h1",{className:"text-3xl font-bold tracking-tight",children:"Balance"})}),de?e.jsx("div",{dir:"rtl",className:"grid gap-4 md:grid-cols-2 lg:grid-cols-4",children:e.jsx("div",{className:"animate-pulse",children:e.jsx(M,{title:"الرصيد الحالي",value:0,description:" . فرق عن الشهر السابق",icon:se,trend:{value:0,isPositive:!0}})})}):e.jsxs("div",{dir:"rtl",className:"grid gap-4 md:grid-cols-2 lg:grid-cols-4",children:[e.jsxs("div",{children:[e.jsx(M,{className:"rounded-b-none",title:"الرصيد الحالي",value:n||0,description:" . فرق عن الشهر السابق",icon:se,trend:{value:n-y||0,isPositive:n-y>0}}),e.jsxs("div",{className:"",children:[e.jsx(C,{onClick:()=>{N("اضافة دفعة الى الصندوق"),O(!1),o(!0)},className:"w-1/2 rounded-l-none rounded-tr-none",children:"اضف دفعة"}),e.jsx(C,{variant:"destructive",onClick:()=>{N("دفع من الصندوق"),O(!1),o(!0)},className:"w-1/2 rounded-r-none rounded-tl-none",children:"دفع من الصندوق"})]})]}),e.jsx(M,{title:"ايرادات هذا الشهر",value:y||0,description:" . اليوم",icon:Ae,trend:{value:u||0,isPositive:!0}}),e.jsx(M,{onClick:()=>{a("/users",{state:"unpaid"})},title:"الديون",value:le||0,description:"",icon:ve,trend:{value:(q==null?void 0:q.userGrowth)||0,isPositive:!0}}),e.jsxs("div",{className:"flex flex-col",children:[e.jsx(M,{className:"rounded-b-none",title:"للتحويل",value:E.sypTotal,description:" . دولار",icon:Ee,trend:{value:(E==null?void 0:E.usdTotal)||0,isPositive:!1}}),e.jsx(qe,{className:"rounded-t-none w-full",isOpen:S,setIsOpen:D})]})]}),e.jsx("div",{className:"grid gap-6 text-center",children:e.jsx(je,{className:"mdL:col-span-2",title:" الحركة المالية ",data:T?Object.entries(T==null?void 0:T.data).map(([t,l])=>({name:t,الفواتير:l.invoices,المدفوعات:l.payments})):[],type:"area",dataKey2:"المدفوعات",dataKey:"الفواتير"})}),e.jsxs("div",{dir:"rtl",className:"grid gap-6 lg:grid-cols-2",children:[e.jsx(z,{title:"الصندوق",description:"",columns:me,data:r!=null&&r.WifiBalance?[...r.WifiBalance].reverse():[]}),e.jsx(z,{title:"الدفعات",description:"دفعات المشتركين",columns:pe,data:r!=null&&r.WifiPayments?[...r.WifiPayments].reverse():[]}),e.jsx("div",{children:e.jsx(z,{title:"دفعات للتحويل",description:"",columns:ue,data:m!=null&&m.pendingList?m==null?void 0:m.pendingList:[],renderRowActions:t=>e.jsx(Re,{isOpen:k===t.id,setIsOpen:l=>x(l?t.id:null),className:"",SYPAmount:t.sypAmount,USDAmount:t.usdAmount,pendingId:t.id})})})]})]})]})}export{Ze as default};
