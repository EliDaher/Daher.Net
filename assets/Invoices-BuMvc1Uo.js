import{r as s,j as e,O as G,k as se,E as ae,D as oe,x as ne,B as I}from"./index-dSGCcv6J.js";import{l as le}from"./index-DZzoSD5T.js";import{A as ce}from"./AddBalanceForm-BIIpAeVY.js";import{F as ee}from"./FormInput-ClphPitL.js";import{b as ie}from"./balance-h3sWdVJz.js";function de({loading:S,internetMatchingRows:d,internetOriginalRows:T,finalTable:R,setFinalTable:V,searchText:K,work:q,setWork:$,internetTotal:h,setInternetTotal:E}){const[y,u]=s.useState([]),[_,z]=s.useState([]),[c,b]=s.useState(null),p=Date.now(),B=new Date(p),[P,J]=s.useState(["4/25","5/25","6/25","7/25","8/25","9/25","10/25","11/25","12/25","1/26","2/26","3/26","4/26","5/26","6/26"]);s.useEffect(()=>{d.length>0?(u(d),z(T),$(!1)):(u([]),z([]),$(!1))},[d]);const L=(o,i,A)=>{G.post("https://server-uvnz.onrender.com/update",{row:o,col:i,value:A}).then(M=>{}).catch(M=>{console.error("Error updating data:",M)})};return S?e.jsx("div",{className:"flex items-center justify-center",children:e.jsx("div",{})}):c?e.jsx("div",{className:"m-6 w-full text-red-500",children:c}):e.jsxs("div",{className:"shadow-md shadow-foreground/30 p-4 m-3 border rounded-xl bg-background",dir:"rtl",children:[e.jsxs("div",{className:"flex justify-between items-center",children:[e.jsx("h2",{className:"text-center font-bold text-gray-900 text-xl my-4",children:"فواتير الإنترنت"}),e.jsx("div",{children:e.jsxs("p",{className:"font-bold text-text-950 p-2 rounded-lg shadow shadow-primary-400",children:["انترنت ",h]})})]}),e.jsx("div",{className:"w-full overflow-auto max-h-96 rounded-lg border border-gray-300",children:y.length>0?e.jsxs("table",{className:"w-full text-sm border-collapse",children:[e.jsx("thead",{className:"bg-gray-800 text-white text-center",children:e.jsxs("tr",{className:"max-h-2 leading-none border-xl border-primary-800",children:[e.jsx("th",{className:"border border-gray-600 px-1 py-2",children:"#"}),e.jsx("th",{className:"border border-gray-600 px-4 py-2 bg-gray-800 sticky right-[0px]",children:"رقم الهاتف"}),e.jsx("th",{className:"border border-gray-600 px-4 py-2 bg-gray-800 sticky right-[120px]",children:"اسم المشترك"}),e.jsx("th",{className:"border border-gray-600 px-1 py-2 bg-gray-800 sticky right-[240px]",children:"الشركة"}),e.jsx("th",{className:"border border-gray-600 px-1 py-2",children:"السرعة"}),e.jsx("th",{className:"border border-gray-600 px-1 py-2",children:"تاريخ التسديد"}),e.jsx("th",{className:"border border-gray-600 px-4 py-2 bg-gray-800 sticky right-[288px]",children:"الفاتورة الشهرية"}),e.jsx("th",{className:"border border-gray-600 px-4 py-2 bg-gray-800 sticky right-[400px]",children:"ملاحظات"}),P.map((o,i)=>e.jsxs(e.Fragment,{children:[e.jsx("th",{className:"border border-gray-600 px-4 py-2",children:o}),e.jsx("th",{className:"border border-gray-600 px-4 py-2",children:o}),e.jsx("th",{className:"border border-gray-600 px-4 py-2"})]}))]})}),e.jsx("tbody",{children:y.map((o,i)=>{const A=Object.values(o);return e.jsx("tr",{className:`even:bg-gray-100 transition-all\r
                                        duration-200 [&>*:nth-child(3n+11)>*>*]:w-7 \r
                                        [&>*:nth-child(8)]:bg-yellow-300 \r
                                        [&>*:nth-child(7)]:bg-green-400 \r
                                        hover:bg-primary-100 [&>*:nth-child(8)>*>*]:w-52 \r
                                        [&>*:nth-child(6)>*>*]:w-12 [&>*:nth-child(5)>*>*]:w-12 \r
                                        [&>*:nth-child(4)>*>*]:w-12 [&>*:nth-child(1)>*>*]:w-12\r
                                        [&>*:nth-child(-n+4)]:sticky\r
                                        [&>*:nth-child(7)]:sticky\r
                                        [&>*:nth-child(8)]:sticky\r
                                        [&>*:nth-child(2)]:right-[0px]\r
                                        [&>*:nth-child(3)]:right-[120px]\r
                                        [&>*:nth-child(4)]:right-[248px]\r
                                        [&>*:nth-child(7)]:right-[297px]\r
                                        [&>*:nth-child(8)]:right-[410px]\r
                                        [&>*:nth-child(-n+4)]:bg-white\r
                                        `,"data-key":i,children:Array.from({length:50},(n,r)=>e.jsx("td",{className:"border border-gray-300",children:e.jsxs("div",{className:"flex",children:[e.jsx("input",{type:"text",value:A[r]||"",onChange:a=>{const j=[...y];j[i]={...j[i],[Object.keys(o)[r]||`field_${r}`]:a.target.value},u(j)},className:"p-1 w-32 bg-transparent outline-none text-center"}),e.jsx("button",{onClick:a=>{var w,x;const j=B.toLocaleDateString("en-US"),F=[...y];if(F[i][r]==j){const N=Object.keys(o)[r]||`field_${r}`,v=Object.keys(o)[r-1]||`field_${r-1}`;F[i]={...F[i],[v]:"",[N]:""},u(F),isNaN(A[r-1])||E(Number(h)-Number(A[r-1]));const D=(w=a.target.closest("tr"))==null?void 0:w.getAttribute("data-key");if(D!=null){const m=_[D];var t=r,g="";L(m,t,g),t=r-1,g="",L(m,t,g)}const f={customerName:o[2],customerNumber:o[1],customerDetails:o[3],invoiceNumber:P[r/3-3],invoiceValue:o[6]};V(R.filter(m=>!(m.customerName===f.customerName&&m.customerNumber===f.customerNumber&&m.customerDetails===f.customerDetails&&m.invoiceNumber===f.invoiceNumber&&m.invoiceValue===f.invoiceValue)))}else{const N=Object.keys(o)[r]||`field_${r}`,v=Object.keys(o)[r-1]||`field_${r-1}`,D=o[6];F[i]={...F[i],[v]:D,[N]:j},u(F),isNaN(A[r-1])||E(Number(h)+Number(D));const f=(x=a.target.closest("tr"))==null?void 0:x.getAttribute("data-key");if(f!=null){const U=_[f];var t=r,g=j;L(U,t,g),t=r-1,g=D,L(U,t,g)}const m={customerName:o[2],customerNumber:o[1],customerDetails:o[3],invoiceNumber:P[r/3-3],invoiceValue:o[6]};V([...R,m])}},className:`hover:bg-accent-600 w-4 ${Number(r+1)%3===1&&r>7?"bg-accent-400":"hidden"} ${o[r-1]?"bg-red-400 hover:bg-red-600":""}`,children:"+"})]})},r))},i)})})]}):e.jsx("p",{className:"text-center text-gray-500 py-4",children:"لم يتم العثور على أي فواتير."})})]})}function he({loading:S,elecMatchingRows:d,elecOriginalRows:T,finalTable:R,setFinalTable:V,searchText:K,work:q,setWork:$,elecTotal:h,phoneTotal:E,waterTotal:y,setElecTotal:u,setPhoneTotal:_,setWaterTotal:z}){const[c,b]=s.useState([]),[p,B]=s.useState([]),[P,J]=s.useState(null),L=Date.now(),o=new Date(L),[i,A]=s.useState(["1","1","1","1","1","1","1","1","1","1","1"]),M=(n,r,a)=>{G.post("https://server-uvnz.onrender.com/updateElec",{row:n,col:r,value:a}).then(j=>{}).catch(j=>{console.error("Error updating data:",j)})};return s.useEffect(()=>{d.length>0?(b(d),B(T),$(!1)):(b([]),B([]),$(!1))},[d]),S?e.jsx("div",{className:"flex items-center justify-center",children:e.jsx("div",{})}):P?e.jsx("div",{className:"m-6 w-full text-red-500",children:P}):e.jsxs("div",{className:"shadow-md shadow-foreground/30 p-4 m-3 border rounded-xl bg-background",dir:"rtl",children:[e.jsxs("div",{className:"flex justify-between items-center",children:[e.jsx("h2",{className:"text-right font-bold text-text-950 text-xl my-4 mr-2",children:"فواتير الخدمات الحكومية"}),e.jsxs("div",{className:"flex gap-5 items-right",children:[e.jsxs("p",{className:"font-bold text-text-950 p-2 rounded-lg shadow shadow-orange-400",children:["ارضي ",E]}),e.jsxs("p",{className:"font-bold text-text-950 p-2 rounded-lg shadow shadow-yellow-400",children:["كهرباء ",h]}),e.jsxs("p",{className:"font-bold text-text-950 p-2 rounded-lg shadow shadow-blue-400",children:["مياه ",y]})]})]}),e.jsx("div",{className:"w-full overflow-auto max-h-96 rounded-lg border border-gray-300",children:c.length>0?e.jsxs("table",{className:"w-full text-sm border-collapse",children:[e.jsx("thead",{className:"bg-gray-800 text-white text-center",children:e.jsxs("tr",{className:"max-h-4 leading-none border-xl border-primary-800",children:[e.jsx("th",{className:"border border-gray-600 px-1 sticky right-[0px] z-20 top-0 bg-gray-800",children:"#"}),e.jsx("th",{className:"border border-gray-600 px-2 sticky right-[47px] z-20 top-0 bg-gray-800",children:"نوع الفاتورة"}),e.jsx("th",{className:"border border-gray-600 px-2 sticky right-[165px] z-20 top-0 bg-gray-800"}),e.jsx("th",{className:"border border-gray-600 px-2 sticky right-[292px] z-20 top-0 bg-gray-800",children:"الرقم"}),i.map(n=>e.jsxs(e.Fragment,{children:[e.jsx("th",{className:"border border-gray-600 bg-primary-800"}),e.jsx("th",{className:"border border-gray-600 px-2 py-2 ",children:"الدورة"}),e.jsx("th",{className:"border border-gray-600 px-2 py-2 ",children:"قيمة الفاتورة"}),e.jsx("th",{className:"border border-gray-600 px-2 py-2 ",children:"المبلغ المقبوض"}),e.jsx("th",{className:"border border-gray-600 px-2 py-2 ",children:"تاريخ الدفع"}),e.jsx("th",{className:"border border-gray-600 px-2 py-2 ",children:"ملاحظات"})]}))]})}),e.jsx("tbody",{children:c.map((n,r)=>{const a=Object.values(n);return e.jsx("tr",{className:`transition-all duration-200 
                                        ${a[1].includes("ارضي")?"bg-orange-200":""}
                                        ${a[1].includes("كهربا")?"bg-yellow-200":""}
                                        ${a[1].includes("ميا")?"bg-blue-200":""}
                                        [&>*:nth-child(6n-1)>*:nth-child(1)>*]:w-1 [&>*:nth-child(1)>*>*]:w-12
                                        [&>*:nth-child(6n-1)>*>*]:w-20 [&>*:nth-child(6n-1)]:bg-primary-700 
                                        hover:bg-primary-100 [&>*:nth-child(6n)>*:nth-child(1)>*]:w-14
                                        [&>*:nth-child(-n+4)]:sticky [&>*:nth-child(-n+4)]:z-10
                                        [&>*:nth-child(-n+4)]:bg-white
                                        [&>*:nth-child(-n+4)]:font-bold

                                        [&>*:nth-child(1)]:right-0
                                        [&>*:nth-child(2)]:right-[47px]
                                        [&>*:nth-child(3)]:right-[165px]
                                        [&>*:nth-child(4)]:right-[292px]`,"data-key":r,children:Array.from({length:70},(F,t)=>e.jsx("td",{className:"border border-gray-300",children:e.jsxs("div",{className:"flex",children:[e.jsx("input",{type:"text",value:a[t]||"",onChange:g=>{const w=[...c];if(w[r]){const x=Object.keys(n)[t]||`field_${t}`;w[r]={...w[r],[x]:g.target.value},b(w)}},className:"p-1 w-32 bg-transparent outline-none text-center"}),e.jsx("button",{onClick:g=>{var D,f;const w=o.toLocaleDateString("en-US"),x=[...c];if(x[r][t]==w){const m=Object.keys(n)[t]||`field_${t}`,U=Object.keys(n)[t-1]||`field_${t-1}`;x[r]={...x[r],[U]:"",[m]:""},b(x),a[1].includes("ارضي")&&!isNaN(a[t-1])&&_(Number(E)-Number(a[t-1])),a[1].includes("كهربا")&&!isNaN(a[t-1])&&u(Number(h)-Number(a[t-1])),a[1].includes("ميا")&&!isNaN(a[t-1])&&z(Number(y)-Number(a[t-1]));const O=(D=g.target.closest("tr"))==null?void 0:D.getAttribute("data-key");if(O!=null){const k=p[O];var N=t,v="";M(k,N,v),N=t-1,v="",M(k,N,v)}const C={customerName:n[1],customerNumber:n[3],customerDetails:n[2],invoiceNumber:n[t-3],invoiceValue:n[t-2]};V(R.filter(k=>!(k.customerName===C.customerName&&k.customerNumber===C.customerNumber&&k.customerDetails===C.customerDetails&&k.invoiceNumber===C.invoiceNumber&&k.invoiceValue===C.invoiceValue)))}else{const m=Object.keys(n)[t]||`field_${t}`,U=Object.keys(n)[t-1]||`field_${t-1}`,O=n[t-2];x[r]={...x[r],[U]:O,[m]:w},b(x),a[1].includes("ارضي")&&!isNaN(a[t-1])&&_(Number(E)+Number(O)),a[1].includes("كهربا")&&!isNaN(a[t-1])&&u(Number(h)+Number(O)),a[1].includes("ميا")&&!isNaN(a[t-1])&&z(Number(y)+Number(O));const C=(f=g.target.closest("tr"))==null?void 0:f.getAttribute("data-key");if(C!=null){const Q=p[C];var N=t,v=w;M(Q,N,v),N=t-1,v=O,M(Q,N,v)}const k={customerName:n[2],customerNumber:n[3],customerDetails:n[1],invoiceNumber:n[t-3],invoiceValue:n[t-2]};V([...R,k])}},className:`hover:bg-accent-600 w-4 ${t%6===2&&t>4?"bg-accent-500":"hidden"} ${n[t-1]?"bg-red-400 hover:bg-red-600":""}`,children:"+"})]})},t))},r)})})]}):e.jsx("p",{className:"text-center text-gray-500 py-4",children:"لم يتم العثور على أي فواتير."})})]})}function te({finalTable:S}){return e.jsx(e.Fragment,{children:S.length>0?e.jsx("div",{className:"mt-5 text-center",dir:"rtl",children:e.jsxs("table",{className:"w-full text-text-900 shadow shadow-primary-900",children:[e.jsx("thead",{className:"border border-primary-400",children:e.jsxs("tr",{className:"border border-primary-400",children:[e.jsx("th",{className:"w-10 px-2",children:"نوع الفاتورة"}),e.jsx("th",{className:"w-10 px-2",children:"الاسم"}),e.jsx("th",{className:"w-10 px-2",children:"الرقم"}),e.jsx("th",{className:"w-10 px-2",children:"الدورة"}),e.jsx("th",{className:"w-10 px-2",children:"المبلغ"})]})}),e.jsx("tbody",{className:"",children:S.map(d=>e.jsxs("tr",{children:[e.jsx("td",{className:"w-10 py-1 px-2 border-primary-500",children:d.customerDetails}),e.jsx("td",{className:"w-10 py-1 px-2 border-primary-500",children:d.customerName}),e.jsx("td",{className:"w-10 py-1 px-2 border-primary-500",children:d.customerNumber}),e.jsx("td",{className:"w-10 py-1 px-2 border-primary-500",children:d.invoiceNumber}),e.jsx("td",{className:"w-10 py-1 px-2 border-primary-500",children:d.invoiceValue})]}))})]})}):e.jsx(e.Fragment,{})})}function me({clearAllTables:S,TotalInvoices:d,setTotalInvoices:T,finalTable:R,isOpen:V,onClose:K,onSubmit:q}){if(!V)return null;const $=JSON.parse(localStorage.getItem("DaherUser")),[h,E]=s.useState(!1),y=async c=>{var b;c.preventDefault(),E(!0);try{const p={amount:d,employee:$.username,details:{...R}};(await G.post("https://server-uvnz.onrender.com/addInvoice",p)).data.success&&console.log("تمت إضافة الفاتورة بنجاح!")}catch(p){console.error("حدث خطأ أثناء إرسال الفاتورة:",((b=p.response)==null?void 0:b.data)||p.message)}E(!1),S(),q(),K()},u=s.useRef(),_=le.useReactToPrint({contentRef:u,pageStyle:`
      @page {
        size: 80mm auto; /* ضبط عرض الورقة والطول تلقائي */
        margin: 0; /* إزالة الهوامش */
      }

      body {
        font-family: Arial, sans-serif;
      }

      td, th {
        border: 1px solid black;
        padding: 1px;
        font-weight: bold;
        word-wrap: break-word;
        overflow-wrap: break-word;
        white-space: normal; /* السماح بلف النص داخل الخلية */
        text-align: center;
        max-width: 65px; /* تحديد عرض ثابت للخلايا */
        width: 65px; /* التأكد من بقاء الخلايا ضمن الحجم المطلوب */
        height: auto; /* السماح للارتفاع بالتكيف مع المحتوى */
      }
      .no-print {
        display: none; /* إخفاء العناصر غير المرغوبة أثناء الطباعة */
      }

      .totalValue{
        font-weight: bold;
        font-size: 24px;
      }

      @media print {
        body, table, th, td {
          color: black !important;
        }

        body {
          width: 80mm;
          height: auto; /* السماح للطباعة بتحديد الطول حسب المحتوى */
          margin: 0;
          padding-bottom: 20px; /* إضافة 20px هامش سفلي */
          display: flex;
          flex-direction: column;
          align-items: center; /* توسيط المحتوى */
          justify-content: flex-start;
          font-family: Arial, sans-serif; /* استخدام خط واضح */
          font-size: 14px; /* زيادة حجم الخط */
        }

        .header {
          text-align: center;
          font-size: 16px;
          margin-bottom: 10px;
          margin-top: 10px;
          font-weight: 900;
        }

        .header span {
          display: block;
          margin-bottom: 2px;
        }

        table {
          width: 100%;
          border-collapse: collapse;
        }

        td, th {
          border: 1px solid black;
          padding: 2px;
          font-weight: bold;
          word-wrap: break-word;
          overflow-wrap: break-word;
          white-space: normal; /* السماح بلف النص داخل الخلية */
          text-align: center;
          max-width: 65px; /* تحديد عرض ثابت للخلايا */
          width: 65px; /* التأكد من بقاء الخلايا ضمن الحجم المطلوب */
          height: auto; /* السماح للارتفاع بالتكيف مع المحتوى */
        }

        .total {
          font-weight: bold;
        }

        .totalValue{
          font-weight: bold;
          font-size: 24px;
        }

        /* إضافة قطع الورقة بناءً على المحتوى */
        .cut {
          page-break-before: always; /* قطع الصفحة عند هذه النقطة */
        }
      }
    `,onAfterPrint:()=>{console.log("تمت الطباعة بنجاح!"),K()}}),z=()=>{const c=new Date,b={year:"numeric",month:"2-digit",day:"2-digit",weekday:"long",hour:"2-digit",minute:"2-digit",second:"2-digit"};return c.toLocaleDateString("en-GB",b)};return e.jsx(e.Fragment,{children:e.jsx("div",{className:"fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-30",children:e.jsxs("div",{className:"bg-white rounded-lg shadow-lg p-6 relative",children:[e.jsx("button",{className:"absolute top-6 left-6 text-gray-500 hover:text-gray-800",onClick:K,children:"✕"}),e.jsx("h2",{className:"text-xl font-bold text-gray-800 mb-4 text-right",children:"تأكيد الفواتير"}),e.jsxs("form",{onSubmit:y,children:[e.jsx("div",{className:"h-96 overflow-y-scroll mb-3 shadow scrollbar-sm",children:e.jsxs("div",{ref:u,children:[e.jsxs("div",{className:"header",children:[e.jsx("span",{children:"Daher.Net"}),e.jsx("span",{children:z()})]}),e.jsx("div",{className:"text-right",children:e.jsx(te,{finalTable:R})}),e.jsx("div",{className:"totalValue",dir:"rtl",children:e.jsxs("h3",{className:"my-3",children:["المجموع :",e.jsx("input",{lang:"en",dir:"ltr",className:"p-1 font-bold text-left",type:"number",min:"0",value:d,onChange:c=>{const b=c.target.value.replace(/[٠-٩]/g,p=>"٠١٢٣٤٥٦٧٨٩".indexOf(p));T(b)}})]})})]})}),e.jsxs("div",{className:"flex justify-start gap-3",children:[e.jsx("button",{disabled:!!h,type:"submit",className:"bg-primary-500 text-white font-bold px-3 py-1 rounded hover:bg-primary-600",children:h?"جاري الحفظ ...":"Save"}),e.jsx("button",{onClick:c=>{c.preventDefault(),_(),y(c)},className:"bg-accent-500 text-white font-bold px-3 py-1 rounded hover:bg-accent-600",children:"Print"}),e.jsx("button",{onClick:K,className:"bg-red-500 text-white font-bold px-3 py-1 rounded hover:bg-red-600",children:"Close"})]})]})]})})})}function ye(){const[S,d]=s.useState();s.useEffect(()=>{const l=JSON.parse(localStorage.getItem("DaherUser")||"null");d(l)},[]);const[T,R]=s.useState(!1),[V,K]=s.useState(0),[q,$]=s.useState(""),[h,E]=s.useState({PhNumber:""}),[y,u]=s.useState(!1),[_,z]=s.useState(0),[c,b]=s.useState(0),[p,B]=s.useState(0),[P,J]=s.useState(0),[L,o]=s.useState(0),[i,A]=s.useState([]),[M,n]=s.useState(0),[r,a]=s.useState(0),[j,F]=s.useState(0),[t,g]=s.useState(0),[w,x]=s.useState(!1),N=()=>x(!1),v=()=>x(!0),D=()=>N(),[f,m]=s.useState(!1),[U,O]=s.useState("pay"),C=()=>m(!1),k=()=>m(!0),Q=()=>{C()},[X,Y]=s.useState(!1),re=se(),Z=ae({mutationFn:l=>ie(l),onSuccess:()=>{alert("✅ تمت إضافة الدفعة."),re.invalidateQueries({queryKey:["balance-table"]}),K(0),$(""),R(!1)},onError:()=>{alert("❌ حدث خطأ أثناء الإرسال.")}}),H=()=>{z(0),b(0),J(0),B(0),A([]),a([]),n([]),g([]),F([])},W=async()=>{if(h!=null&&h.PhNumber){Y(!0);try{const l=await G.post("https://server-uvnz.onrender.com/search",h);a(l.data.elecOriginalRows),n(l.data.elecMatchingRows),g(l.data.internetOriginalRows),F(l.data.internetMatchingRows)}catch(l){console.error(l)}finally{Y(!1)}}};return s.useEffect(()=>{o(Number(_)+Number(c)+Number(p)+Number(P))},[_,c,p,P]),e.jsxs(e.Fragment,{children:[e.jsx(oe,{children:e.jsx("div",{className:"space-y-6",children:e.jsxs("div",{className:"flex-col w-full",children:[e.jsxs("div",{className:"sticky top-0 z-30 py-3 shadow bg-foreground/10 flex flex-wrap justify-center mt-4 select-none",children:[e.jsxs("div",{className:"flex gap-3 px-2 mr-10",children:[e.jsx("button",{onClick:()=>{O("pay"),k()},className:"p-2 bg-primary-500 text-white rounded hover:bg-primary-600",children:"قبض"}),e.jsx("button",{onClick:()=>{O("inv"),k()},className:"p-2 bg-red-500 text-white rounded hover:bg-red-600",children:"دفع"}),e.jsx(ne,{isOpen:T,setIsOpen:R,trigger:e.jsx(I,{children:"اضافة دفعة مفاضلة"}),title:"دفع مفاضلة",children:e.jsxs("form",{className:"space-y-4",onSubmit:l=>{l.preventDefault(),Z.mutate({value:V,note:q,Date:new Date().toISOString().split("T")[0],employee:S==null?void 0:S.username})},children:[e.jsx(ee,{id:"mofValue",value:V.toString(),onChange:l=>{K(Number(l.target.value))},label:"قيمة الدفعة"}),e.jsx(ee,{id:"mofNote",value:q,onChange:l=>{$(l.target.value)},label:"ملاحظات"}),e.jsx(I,{className:"w-full",type:"submit",disabled:Z.isPending,children:"تأكيد"})]})})]}),e.jsxs("div",{className:"flex shadow-[0px_0px_4px] shadow-accent-400 mr-5 rounded-lg text-text-950",children:[e.jsx("button",{onClick:()=>{i.length>0&&v()},className:"text-center text-lg p-2 border-r rounded-l-lg border-text-950 bg-accent-200 hover:bg-accent-300 text-accent-foreground font-bold",children:"انهاء"}),e.jsx("div",{className:"text-center text-xl p-2 rounded-r-lg",children:L})]}),e.jsx("input",{type:"text",placeholder:"بحث برقم الهاتف",className:"p-2 rounded-l-lg w-60 text-center bg-background text-text-900 shadow-md outline-none border border-primary-500",value:h.PhNumber,onChange:l=>{E({PhNumber:l.target.value})},onKeyDown:l=>{l.key==="Enter"&&(l.preventDefault(),u(!0),W(),H())}}),e.jsx("button",{onClick:()=>{u(!0),W(),H()},className:"p-2 rounded-r-lg bg-primary-500 text-white font-bold",children:"بحث"})]}),e.jsxs("div",{className:"bg-foreground/5 p-1",children:[e.jsx(de,{loading:X,internetOriginalRows:t,internetMatchingRows:j,finalTable:i,setFinalTable:A,searchText:h,work:y,setWork:u,internetTotal:_,setInternetTotal:z}),e.jsx(he,{loading:X,elecOriginalRows:r,elecMatchingRows:M,finalTable:i,setFinalTable:A,searchText:h,work:y,setWork:u,elecTotal:c,setElecTotal:b,phoneTotal:p,setPhoneTotal:B,waterTotal:P,setWaterTotal:J})]}),e.jsx("div",{className:"w-80 m-auto rounded-lg px-6 py-3",children:e.jsx(te,{finalTable:i})}),e.jsx(me,{setTotalInvoices:o,clearAllTables:H,TotalInvoices:L,finalTable:i,isOpen:w,onClose:N,onSubmit:D})]})})}),e.jsx(ce,{payOrInv:U,isOpen:f,onClose:C,onSubmit:Q})]})}export{ye as default};
