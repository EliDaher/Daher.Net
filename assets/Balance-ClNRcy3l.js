import{c as V,f as ie,r,g as le,j as e}from"./index-C1ctwKm1.js";import{u as M}from"./useQuery-CfLgXW7N.js";import{u as ce}from"./useMutation-Cl9VbvdM.js";import{D as I,H as de}from"./DashboardLayout-CGz-3KeX.js";import{S as g}from"./StatsCard-DnlBKLCI.js";import{C as ue}from"./ChartContainer-CwWBlbtI.js";import{D as K}from"./DataTable-ZBoPgCfS.js";import{a as l}from"./axios-KE4dpIQc.js";import{g as me,f as pe,h as ge}from"./wifi-LQWNa4dc.js";import{B as z}from"./button-HZGTl1VX.js";import{P as he}from"./PopupForm-CRLOogZP.js";import{I as G}from"./input-d75Tn4MJ.js";import{l as ye}from"./index-DlycIy9C.js";import{L as fe,A as xe,D as ve,d as be}from"./DatePicker-DfGaEEaz.js";import{C as je}from"./credit-card-O_mRtxLF.js";import"./house-Cgxta3gk.js";import"./card-aOLl0Vkw.js";import"./index-xsH4HHeE.js";/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const we=V("Coins",[["circle",{cx:"8",cy:"8",r:"6",key:"3yglwk"}],["path",{d:"M18.09 10.37A6 6 0 1 1 10.34 18",key:"t5s6rm"}],["path",{d:"M7 6h1v4",key:"1obek4"}],["path",{d:"m16.71 13.88.7.71-2.82 2.82",key:"1rbuyh"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const O=V("TrendingUp",[["polyline",{points:"22 7 13.5 15.5 8.5 10.5 2 17",key:"126l90"}],["polyline",{points:"16 7 22 7 22 13",key:"kwv8wd"}]]),De={async getUsers(){return(await l.get("/users")).data},async getUser(a){return(await l.get(`/users/${a}`)).data},async getPosts(){return(await l.get("/posts")).data},async getPostsByUser(a){return(await l.get(`/posts?userId=${a}`)).data},async getTodos(){return(await l.get("/todos")).data},async getTodosByUser(a){return(await l.get(`/todos?userId=${a}`)).data},async getDashboardStats(){const[a,o,u]=await Promise.all([this.getUsers(),this.getPosts(),this.getTodos()]),h=u.filter(m=>m.completed).length,v=u.filter(m=>!m.completed).length;return{totalUsers:a.length,totalPosts:o.length,completedTodos:h,pendingTodos:v,revenueGrowth:Math.floor(Math.random()*30)+10,userGrowth:Math.floor(Math.random()*20)+5}},async getChartData(){return["Jan","Feb","Mar","Apr","May","Jun"].map((o,u)=>({month:o,revenue:Math.floor(Math.random()*1e4)+5e3,users:Math.floor(Math.random()*500)+200,orders:Math.floor(Math.random()*200)+50}))}};async function Ne(){try{return await(await l.get("/api/reports/monthly-revenue")).data}catch(a){return console.error("Error fetching monthly revenue:",a),{success:!1,error:a}}}function Qe(){const a=ie(),[o,u]=r.useState(0),[h,v]=r.useState([]),[m,Q]=r.useState(0),[b,$]=r.useState(0),[H,p]=r.useState(!1),[j,k]=r.useState(""),[Pe,S]=r.useState(!1),[w,B]=r.useState(),[y,T]=r.useState(0),[D,L]=r.useState(""),[Ce,Me]=r.useState(!1),J=async()=>{const t=await me();t!=null&&t.success?v(t.customers):alert((t==null?void 0:t.error)||"فشل جلب البيانات")};r.useEffect(()=>{J()},[]);const X=r.useMemo(()=>{const t=h.filter(n=>n.Balance<0).reduce((n,x)=>n+Number(x.Balance),0);return Math.abs(t)},[h]),{data:s,isLoading:Z}=M({queryKey:["balance-table"],queryFn:ge});r.useEffect(()=>{var q,E,U,R;let t=0;(q=s==null?void 0:s.WifiBalance)==null||q.map(i=>{t+=Number(i.amount)}),(E=s==null?void 0:s.WifiPayments)==null||E.map(i=>{t+=Number(i.Amount)}),console.log(s),u(t);const n=new Date,x=n.getFullYear(),A=n.getMonth(),oe=n.getDate(),P=(U=s==null?void 0:s.WifiPayments)==null?void 0:U.filter(i=>{const d=new Date(i.Date);return d.getFullYear()===x&&d.getMonth()===A}),C=(R=s==null?void 0:s.WifiPayments)==null?void 0:R.filter(i=>{const d=new Date(i.Date);return d.getFullYear()===x&&d.getMonth()===A&&d.getDate()===oe});let F=0;P==null||P.map(i=>{F+=Number(i.Amount)}),$(F);let W=0;C==null||C.map(i=>{W+=Number(i.Amount)}),Q(W)},[s]);const{data:c,isLoading:_}=M({queryKey:["dashboard-stats"],queryFn:De.getDashboardStats}),{data:f,isLoading:ke}=M({queryKey:["monthlyRevenue"],queryFn:Ne}),ee=[{key:"amount",label:"الكمية",sortable:!0},{key:"details",label:"التفاصيل",sortable:!0},{key:"timestamp",label:"الوقت",sortable:!0}],te=[{key:"Amount",label:"الكمية",sortable:!0},{key:"Details",label:"التفاصيل",sortable:!0},{key:"Date",label:"الوقت",sortable:!0}],Y=r.useRef(),se=le(),N=ce({mutationFn:pe,onSuccess:()=>{alert("✅ تمت إضافة الدفعة."),se.invalidateQueries({queryKey:["balance-table"]}),B(null),T(0),L(""),p(!1)},onError:()=>{alert("❌ حدث خطأ أثناء الإرسال.")}}),ae=ye.useReactToPrint({contentRef:Y,pageStyle:`
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
    `,onAfterPrint:()=>{console.log("تمت الطباعة بنجاح!"),p(!1)}}),re=()=>{const t=new Date,n={year:"numeric",month:"numeric",day:"numeric",weekday:"long",hour:"numeric",minute:"numeric",second:"numeric"};return t.toLocaleDateString("en-GB",n)};if(_)return e.jsx(I,{children:e.jsx("div",{className:"flex items-center justify-center h-64",children:e.jsx("div",{className:"animate-spin rounded-full h-8 w-8 border-b-2 border-primary"})})});const ne=t=>{t.preventDefault(),window.confirm("هل تريد طباعة ايصال ؟")&&ae();const n={amount:Number(j==="اضافة دفعة الى الصندوق"?y:-y),date:w?be(w).format("YYYY-MM-DD"):"",details:D};N.mutate(n)};return e.jsxs(I,{children:[e.jsx(he,{isOpen:H,setIsOpen:p,title:j,trigger:e.jsx(e.Fragment,{}),children:e.jsxs("div",{className:"flex flex-row-reverse gap-2",children:[e.jsxs("form",{onSubmit:ne,className:"space-y-4 w-2/3",children:[e.jsx(G,{value:y,onChange:t=>T(Number(t.target.value)),type:"number",placeholder:"القيمة بالدولار",required:!0}),e.jsx(fe,{dateAdapter:xe,children:e.jsx(ve,{className:"w-full",label:"اختر التاريخ",value:w,onChange:t=>B(t),format:"DD/MM/YYYY"})}),e.jsx(G,{value:D,onChange:t=>L(t.target.value),type:"text",placeholder:"تفاصيل (اختياري)"}),e.jsx("button",{type:"submit",className:"w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition",disabled:N.isPending,children:N.isPending?"جارٍ الإرسال...":"حفظ"})]}),e.jsxs("div",{ref:Y,className:"p-4 text-sm",dir:"rtl",children:[e.jsxs("div",{className:"header",children:[e.jsx("h1",{children:"Daher.Net"}),e.jsx("span",{children:re()})]}),e.jsxs("div",{className:"text-right mb-2",children:[e.jsx("div",{className:"font-semibold",children:"التفاصيل:"}),e.jsx("div",{className:"border p-1 rounded",children:D||"بدون ملاحظات"})]}),e.jsx("div",{className:"text-right totalValue mt-4",children:e.jsxs("div",{className:"text-lg font-extrabold border-t pt-2",children:[j=="اضافة دفعة"?"المبلغ المدفوع":"المبلغ المطلوب",": ",y," دولار"]})}),e.jsx("div",{className:"cut mt-4 border-t pt-2 text-center text-xs",children:"-- شكراً لثقتكم بخدماتنا --"})]})]})}),e.jsxs("div",{className:"space-y-6",children:[e.jsx("div",{children:e.jsx("h1",{className:"text-3xl font-bold tracking-tight",children:"Balance"})}),Z?e.jsx("div",{dir:"rtl",className:"grid gap-4 md:grid-cols-2 lg:grid-cols-4",children:e.jsx("div",{className:"animate-pulse",children:e.jsx(g,{title:"الرصيد الحالي",value:0,description:" . فرق عن الشهر السابق",icon:O,trend:{value:0,isPositive:!0}})})}):e.jsxs("div",{dir:"rtl",className:"grid gap-4 md:grid-cols-2 lg:grid-cols-4",children:[e.jsxs("div",{children:[e.jsx(g,{className:"rounded-b-none",title:"الرصيد الحالي",value:o||0,description:" . فرق عن الشهر السابق",icon:O,trend:{value:o-b||0,isPositive:o-b>0}}),e.jsxs("div",{className:"",children:[e.jsx(z,{onClick:()=>{k("اضافة دفعة الى الصندوق"),S(!1),p(!0)},className:"w-1/2 rounded-l-none rounded-tr-none",children:"اضف دفعة"}),e.jsx(z,{variant:"destructive",onClick:()=>{k("دفع من الصندوق"),S(!1),p(!0)},className:"w-1/2 rounded-r-none rounded-tl-none",children:"دفع من الصندوق"})]})]}),e.jsx(g,{title:"ايرادات هذا الشهر",value:b||0,description:" . اليوم",icon:je,trend:{value:m||0,isPositive:!0}}),e.jsx(g,{onClick:()=>{a("/users",{state:"unpaid"})},title:"الديون",value:X||0,description:"",icon:de,trend:{value:(c==null?void 0:c.userGrowth)||0,isPositive:!0}}),e.jsx(g,{title:"للتحويل",value:0,description:"",icon:we,trend:{value:(c==null?void 0:c.userGrowth)||0,isPositive:!0}})]}),e.jsx("div",{className:"grid gap-6 text-center",children:e.jsx(ue,{className:"mdL:col-span-2",title:" الحركة المالية ",data:f?Object.entries(f==null?void 0:f.data).map(([t,n])=>({name:t,الفواتير:n.invoices,المدفوعات:n.payments})):[],type:"area",dataKey2:"المدفوعات",dataKey:"الفواتير"})}),e.jsxs("div",{dir:"rtl",className:"grid gap-6 lg:grid-cols-2",children:[e.jsx(K,{title:"الصندوق",description:"",columns:ee,data:s!=null&&s.WifiBalance?[...s.WifiBalance].reverse():[]}),e.jsx(K,{title:"الدفعات",description:"دفعات المشتركين",columns:te,data:s!=null&&s.WifiPayments?[...s.WifiPayments].reverse():[]})]})]})]})}export{Qe as default};
