import{r as s,j as e,O as J,D as Q}from"./index-BmpGxBP1.js";import{l as X}from"./index-BuKd4iyq.js";import{A as Y}from"./AddBalanceForm-C-_feL6v.js";function Z({loading:m,internetMatchingRows:l,internetOriginalRows:K,finalTable:w,setFinalTable:R,searchText:F,work:U,setWork:C,internetTotal:x,setInternetTotal:O}){const[b,y]=s.useState([]),[E,_]=s.useState([]),[c,h]=s.useState(null),v=Date.now(),M=new Date(v),[B,G]=s.useState(["4/25","5/25","6/25","7/25","8/25","9/25","10/25","11/25","12/25","1/26","2/26","3/26","4/26","5/26","6/26"]);s.useEffect(()=>{l.length>0?(y(l),_(K),C(!1)):(y([]),_([]),C(!1))},[l]);const T=(o,u,A)=>{J.post("https://server-uvnz.onrender.com/update",{row:o,col:u,value:A}).then($=>{}).catch($=>{console.error("Error updating data:",$)})};return m?e.jsx("div",{className:"flex items-center justify-center",children:e.jsx("div",{})}):c?e.jsx("div",{className:"m-6 w-full text-red-500",children:c}):e.jsxs("div",{className:"shadow-md shadow-foreground/30 p-4 m-3 border rounded-xl bg-background",dir:"rtl",children:[e.jsxs("div",{className:"flex justify-between items-center",children:[e.jsx("h2",{className:"text-center font-bold text-gray-900 text-xl my-4",children:"فواتير الإنترنت"}),e.jsx("div",{children:e.jsxs("p",{className:"font-bold text-text-950 p-2 rounded-lg shadow shadow-primary-400",children:["انترنت ",x]})})]}),e.jsx("div",{className:"w-full overflow-auto max-h-96 rounded-lg border border-gray-300",children:b.length>0?e.jsxs("table",{className:"w-full text-sm border-collapse",children:[e.jsx("thead",{className:"bg-gray-800 text-white text-center",children:e.jsxs("tr",{className:"max-h-2 leading-none border-xl border-primary-800",children:[e.jsx("th",{className:"border border-gray-600 px-1 py-2",children:"#"}),e.jsx("th",{className:"border border-gray-600 px-4 py-2 bg-gray-800 sticky right-[0px]",children:"رقم الهاتف"}),e.jsx("th",{className:"border border-gray-600 px-4 py-2 bg-gray-800 sticky right-[120px]",children:"اسم المشترك"}),e.jsx("th",{className:"border border-gray-600 px-1 py-2 bg-gray-800 sticky right-[240px]",children:"الشركة"}),e.jsx("th",{className:"border border-gray-600 px-1 py-2",children:"السرعة"}),e.jsx("th",{className:"border border-gray-600 px-1 py-2",children:"تاريخ التسديد"}),e.jsx("th",{className:"border border-gray-600 px-4 py-2 bg-gray-800 sticky right-[288px]",children:"الفاتورة الشهرية"}),e.jsx("th",{className:"border border-gray-600 px-4 py-2 bg-gray-800 sticky right-[400px]",children:"ملاحظات"}),B.map((o,u)=>e.jsxs(e.Fragment,{children:[e.jsx("th",{className:"border border-gray-600 px-4 py-2",children:o}),e.jsx("th",{className:"border border-gray-600 px-4 py-2",children:o}),e.jsx("th",{className:"border border-gray-600 px-4 py-2"})]}))]})}),e.jsx("tbody",{children:b.map((o,u)=>{const A=Object.values(o);return e.jsx("tr",{className:`even:bg-gray-100 transition-all\r
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
                                        `,"data-key":u,children:Array.from({length:50},(n,r)=>e.jsx("td",{className:"border border-gray-300",children:e.jsxs("div",{className:"flex",children:[e.jsx("input",{type:"text",value:A[r]||"",onChange:a=>{const k=[...b];k[u]={...k[u],[Object.keys(o)[r]||`field_${r}`]:a.target.value},y(k)},className:"p-1 w-32 bg-transparent outline-none text-center"}),e.jsx("button",{onClick:a=>{var f,p;const k=M.toLocaleDateString("en-US"),z=[...b];if(z[u][r]==k){const j=Object.keys(o)[r]||`field_${r}`,S=Object.keys(o)[r-1]||`field_${r-1}`;z[u]={...z[u],[S]:"",[j]:""},y(z),isNaN(A[r-1])||O(Number(x)-Number(A[r-1]));const D=(f=a.target.closest("tr"))==null?void 0:f.getAttribute("data-key");if(D!=null){const d=E[D];var t=r,N="";T(d,t,N),t=r-1,N="",T(d,t,N)}const g={customerName:o[2],customerNumber:o[1],customerDetails:o[3],invoiceNumber:B[r/3-3],invoiceValue:o[6]};R(w.filter(d=>!(d.customerName===g.customerName&&d.customerNumber===g.customerNumber&&d.customerDetails===g.customerDetails&&d.invoiceNumber===g.invoiceNumber&&d.invoiceValue===g.invoiceValue)))}else{const j=Object.keys(o)[r]||`field_${r}`,S=Object.keys(o)[r-1]||`field_${r-1}`,D=o[6];z[u]={...z[u],[S]:D,[j]:k},y(z),isNaN(A[r-1])||O(Number(x)+Number(D));const g=(p=a.target.closest("tr"))==null?void 0:p.getAttribute("data-key");if(g!=null){const P=E[g];var t=r,N=k;T(P,t,N),t=r-1,N=D,T(P,t,N)}const d={customerName:o[2],customerNumber:o[1],customerDetails:o[3],invoiceNumber:B[r/3-3],invoiceValue:o[6]};R([...w,d])}},className:`hover:bg-accent-600 w-4 ${Number(r+1)%3===1&&r>7?"bg-accent-400":"hidden"} ${o[r-1]?"bg-red-400 hover:bg-red-600":""}`,children:"+"})]})},r))},u)})})]}):e.jsx("p",{className:"text-center text-gray-500 py-4",children:"لم يتم العثور على أي فواتير."})})]})}function W({loading:m,elecMatchingRows:l,elecOriginalRows:K,finalTable:w,setFinalTable:R,searchText:F,work:U,setWork:C,elecTotal:x,phoneTotal:O,waterTotal:b,setElecTotal:y,setPhoneTotal:E,setWaterTotal:_}){const[c,h]=s.useState([]),[v,M]=s.useState([]),[B,G]=s.useState(null),T=Date.now(),o=new Date(T),[u,A]=s.useState(["1","1","1","1","1","1","1","1","1","1","1"]),$=(n,r,a)=>{J.post("https://server-uvnz.onrender.com/updateElec",{row:n,col:r,value:a}).then(k=>{}).catch(k=>{console.error("Error updating data:",k)})};return s.useEffect(()=>{l.length>0?(h(l),M(K),C(!1)):(h([]),M([]),C(!1))},[l]),m?e.jsx("div",{className:"flex items-center justify-center",children:e.jsx("div",{})}):B?e.jsx("div",{className:"m-6 w-full text-red-500",children:B}):e.jsxs("div",{className:"shadow-md shadow-foreground/30 p-4 m-3 border rounded-xl bg-background",dir:"rtl",children:[e.jsxs("div",{className:"flex justify-between items-center",children:[e.jsx("h2",{className:"text-right font-bold text-text-950 text-xl my-4 mr-2",children:"فواتير الخدمات الحكومية"}),e.jsxs("div",{className:"flex gap-5 items-right",children:[e.jsxs("p",{className:"font-bold text-text-950 p-2 rounded-lg shadow shadow-orange-400",children:["ارضي ",O]}),e.jsxs("p",{className:"font-bold text-text-950 p-2 rounded-lg shadow shadow-yellow-400",children:["كهرباء ",x]}),e.jsxs("p",{className:"font-bold text-text-950 p-2 rounded-lg shadow shadow-blue-400",children:["مياه ",b]})]})]}),e.jsx("div",{className:"w-full overflow-auto max-h-96 rounded-lg border border-gray-300",children:c.length>0?e.jsxs("table",{className:"w-full text-sm border-collapse",children:[e.jsx("thead",{className:"bg-gray-800 text-white text-center",children:e.jsxs("tr",{className:"max-h-4 leading-none border-xl border-primary-800",children:[e.jsx("th",{className:"border border-gray-600 px-1 sticky right-[0px] z-20 top-0 bg-gray-800",children:"#"}),e.jsx("th",{className:"border border-gray-600 px-2 sticky right-[47px] z-20 top-0 bg-gray-800",children:"نوع الفاتورة"}),e.jsx("th",{className:"border border-gray-600 px-2 sticky right-[165px] z-20 top-0 bg-gray-800"}),e.jsx("th",{className:"border border-gray-600 px-2 sticky right-[292px] z-20 top-0 bg-gray-800",children:"الرقم"}),u.map(n=>e.jsxs(e.Fragment,{children:[e.jsx("th",{className:"border border-gray-600 bg-primary-800"}),e.jsx("th",{className:"border border-gray-600 px-2 py-2 ",children:"الدورة"}),e.jsx("th",{className:"border border-gray-600 px-2 py-2 ",children:"قيمة الفاتورة"}),e.jsx("th",{className:"border border-gray-600 px-2 py-2 ",children:"المبلغ المقبوض"}),e.jsx("th",{className:"border border-gray-600 px-2 py-2 ",children:"تاريخ الدفع"}),e.jsx("th",{className:"border border-gray-600 px-2 py-2 ",children:"ملاحظات"})]}))]})}),e.jsx("tbody",{children:c.map((n,r)=>{const a=Object.values(n);return e.jsx("tr",{className:`transition-all duration-200 
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
                                        [&>*:nth-child(4)]:right-[292px]`,"data-key":r,children:Array.from({length:70},(z,t)=>e.jsx("td",{className:"border border-gray-300",children:e.jsxs("div",{className:"flex",children:[e.jsx("input",{type:"text",value:a[t]||"",onChange:N=>{const f=[...c];if(f[r]){const p=Object.keys(n)[t]||`field_${t}`;f[r]={...f[r],[p]:N.target.value},h(f)}},className:"p-1 w-32 bg-transparent outline-none text-center"}),e.jsx("button",{onClick:N=>{var D,g;const f=o.toLocaleDateString("en-US"),p=[...c];if(p[r][t]==f){const d=Object.keys(n)[t]||`field_${t}`,P=Object.keys(n)[t-1]||`field_${t-1}`;p[r]={...p[r],[P]:"",[d]:""},h(p),a[1].includes("ارضي")&&!isNaN(a[t-1])&&E(Number(O)-Number(a[t-1])),a[1].includes("كهربا")&&!isNaN(a[t-1])&&y(Number(x)-Number(a[t-1])),a[1].includes("ميا")&&!isNaN(a[t-1])&&_(Number(b)-Number(a[t-1]));const i=(D=N.target.closest("tr"))==null?void 0:D.getAttribute("data-key");if(i!=null){const V=v[i];var j=t,S="";$(V,j,S),j=t-1,S="",$(V,j,S)}const L={customerName:n[1],customerNumber:n[3],customerDetails:n[2],invoiceNumber:n[t-3],invoiceValue:n[t-2]};R(w.filter(V=>!(V.customerName===L.customerName&&V.customerNumber===L.customerNumber&&V.customerDetails===L.customerDetails&&V.invoiceNumber===L.invoiceNumber&&V.invoiceValue===L.invoiceValue)))}else{const d=Object.keys(n)[t]||`field_${t}`,P=Object.keys(n)[t-1]||`field_${t-1}`,i=n[t-2];p[r]={...p[r],[P]:i,[d]:f},h(p),a[1].includes("ارضي")&&!isNaN(a[t-1])&&E(Number(O)+Number(i)),a[1].includes("كهربا")&&!isNaN(a[t-1])&&y(Number(x)+Number(i)),a[1].includes("ميا")&&!isNaN(a[t-1])&&_(Number(b)+Number(i));const L=(g=N.target.closest("tr"))==null?void 0:g.getAttribute("data-key");if(L!=null){const q=v[L];var j=t,S=f;$(q,j,S),j=t-1,S=i,$(q,j,S)}const V={customerName:n[2],customerNumber:n[3],customerDetails:n[1],invoiceNumber:n[t-3],invoiceValue:n[t-2]};R([...w,V])}},className:`hover:bg-accent-600 w-4 ${t%6===2&&t>4?"bg-accent-500":"hidden"} ${n[t-1]?"bg-red-400 hover:bg-red-600":""}`,children:"+"})]})},t))},r)})})]}):e.jsx("p",{className:"text-center text-gray-500 py-4",children:"لم يتم العثور على أي فواتير."})})]})}function H({finalTable:m}){return e.jsx(e.Fragment,{children:m.length>0?e.jsx("div",{className:"mt-5 text-center",dir:"rtl",children:e.jsxs("table",{className:"w-full text-text-900 shadow shadow-primary-900",children:[e.jsx("thead",{className:"border border-primary-400",children:e.jsxs("tr",{className:"border border-primary-400",children:[e.jsx("th",{className:"w-10 px-2",children:"نوع الفاتورة"}),e.jsx("th",{className:"w-10 px-2",children:"الاسم"}),e.jsx("th",{className:"w-10 px-2",children:"الرقم"}),e.jsx("th",{className:"w-10 px-2",children:"الدورة"}),e.jsx("th",{className:"w-10 px-2",children:"المبلغ"})]})}),e.jsx("tbody",{className:"",children:m.map(l=>e.jsxs("tr",{children:[e.jsx("td",{className:"w-10 py-1 px-2 border-primary-500",children:l.customerDetails}),e.jsx("td",{className:"w-10 py-1 px-2 border-primary-500",children:l.customerName}),e.jsx("td",{className:"w-10 py-1 px-2 border-primary-500",children:l.customerNumber}),e.jsx("td",{className:"w-10 py-1 px-2 border-primary-500",children:l.invoiceNumber}),e.jsx("td",{className:"w-10 py-1 px-2 border-primary-500",children:l.invoiceValue})]}))})]})}):e.jsx(e.Fragment,{})})}function I({clearAllTables:m,TotalInvoices:l,setTotalInvoices:K,finalTable:w,isOpen:R,onClose:F,onSubmit:U}){if(!R)return null;const C=JSON.parse(localStorage.getItem("DaherUser")),[x,O]=s.useState(!1),b=async c=>{var h;c.preventDefault(),O(!0);try{const v={amount:l,employee:C.username,details:{...w}};(await J.post("https://server-uvnz.onrender.com/addInvoice",v)).data.success&&console.log("تمت إضافة الفاتورة بنجاح!")}catch(v){console.error("حدث خطأ أثناء إرسال الفاتورة:",((h=v.response)==null?void 0:h.data)||v.message)}O(!1),m(),U(),F()},y=s.useRef(),E=X.useReactToPrint({contentRef:y,pageStyle:`
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
    `,onAfterPrint:()=>{console.log("تمت الطباعة بنجاح!"),F()}}),_=()=>{const c=new Date,h={year:"numeric",month:"2-digit",day:"2-digit",weekday:"long",hour:"2-digit",minute:"2-digit",second:"2-digit"};return c.toLocaleDateString("en-GB",h)};return e.jsx(e.Fragment,{children:e.jsx("div",{className:"fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-30",children:e.jsxs("div",{className:"bg-white rounded-lg shadow-lg p-6 relative",children:[e.jsx("button",{className:"absolute top-6 left-6 text-gray-500 hover:text-gray-800",onClick:F,children:"✕"}),e.jsx("h2",{className:"text-xl font-bold text-gray-800 mb-4 text-right",children:"تأكيد الفواتير"}),e.jsxs("form",{onSubmit:b,children:[e.jsx("div",{className:"h-96 overflow-y-scroll mb-3 shadow scrollbar-sm",children:e.jsxs("div",{ref:y,children:[e.jsxs("div",{className:"header",children:[e.jsx("span",{children:"Daher.Net"}),e.jsx("span",{children:_()})]}),e.jsx("div",{className:"text-right",children:e.jsx(H,{finalTable:w})}),e.jsx("div",{className:"totalValue",dir:"rtl",children:e.jsxs("h3",{className:"my-3",children:["المجموع :",e.jsx("input",{lang:"en",dir:"ltr",className:"p-1 font-bold text-left",type:"number",min:"0",value:l,onChange:c=>{const h=c.target.value.replace(/[٠-٩]/g,v=>"٠١٢٣٤٥٦٧٨٩".indexOf(v));K(h)}})]})})]})}),e.jsxs("div",{className:"flex justify-start gap-3",children:[e.jsx("button",{disabled:!!x,type:"submit",className:"bg-primary-500 text-white font-bold px-3 py-1 rounded hover:bg-primary-600",children:x?"جاري الحفظ ...":"Save"}),e.jsx("button",{onClick:c=>{c.preventDefault(),E(),b(c)},className:"bg-accent-500 text-white font-bold px-3 py-1 rounded hover:bg-accent-600",children:"Print"}),e.jsx("button",{onClick:F,className:"bg-red-500 text-white font-bold px-3 py-1 rounded hover:bg-red-600",children:"Close"})]})]})]})})})}function se(){const[m,l]=s.useState({PhNumber:""}),[K,w]=s.useState(!1),[R,F]=s.useState(0),[U,C]=s.useState(0),[x,O]=s.useState(0),[b,y]=s.useState(0),[E,_]=s.useState(0),[c,h]=s.useState([]),[v,M]=s.useState(0),[B,G]=s.useState(0),[T,o]=s.useState(0),[u,A]=s.useState(0),[$,n]=s.useState(!1),r=()=>n(!1),a=()=>n(!0),k=()=>r(),[z,t]=s.useState(!1),[N,f]=s.useState("pay"),p=()=>t(!1),j=()=>t(!0),S=()=>{p()},[D,g]=s.useState(!1),d=()=>{F(0),C(0),y(0),O(0),h([]),G([]),M([]),A([]),o([])},P=async()=>{if(m!=null&&m.PhNumber){g(!0);try{const i=await J.post("https://server-uvnz.onrender.com/search",m);G(i.data.elecOriginalRows),M(i.data.elecMatchingRows),A(i.data.internetOriginalRows),o(i.data.internetMatchingRows)}catch(i){console.error(i)}finally{g(!1)}}};return s.useEffect(()=>{_(Number(R)+Number(U)+Number(x)+Number(b))},[R,U,x,b]),e.jsxs(e.Fragment,{children:[e.jsx(Q,{children:e.jsx("div",{className:"space-y-6",children:e.jsxs("div",{className:"flex-col w-full",children:[e.jsxs("div",{className:"sticky top-0 z-30 py-3 shadow bg-foreground/10 flex flex-wrap justify-center mt-4 select-none",children:[e.jsxs("div",{className:"flex gap-3 px-2 mr-10",children:[e.jsx("button",{onClick:()=>{f("pay"),j()},className:"p-2 bg-primary-500 text-white rounded hover:bg-primary-600",children:"قبض"}),e.jsx("button",{onClick:()=>{f("inv"),j()},className:"p-2 bg-red-500 text-white rounded hover:bg-red-600",children:"دفع"})]}),e.jsxs("div",{className:"flex shadow-[0px_0px_4px] shadow-accent-400 mr-5 rounded-lg text-text-950",children:[e.jsx("button",{onClick:()=>{c.length>0&&a()},className:"text-center text-lg p-2 border-r rounded-l-lg border-text-950 bg-accent-200 hover:bg-accent-300 text-accent-foreground font-bold",children:"انهاء"}),e.jsx("div",{className:"text-center text-xl p-2 rounded-r-lg",children:E})]}),e.jsx("input",{type:"text",placeholder:"بحث برقم الهاتف",className:"p-2 rounded-l-lg w-60 text-center bg-background text-text-900 shadow-md outline-none border border-primary-500",value:m.PhNumber,onChange:i=>{l({PhNumber:i.target.value})},onKeyDown:i=>{i.key==="Enter"&&(i.preventDefault(),w(!0),P(),d())}}),e.jsx("button",{onClick:()=>{w(!0),P(),d()},className:"p-2 rounded-r-lg bg-primary-500 text-white font-bold",children:"بحث"})]}),e.jsxs("div",{className:"bg-foreground/5 p-1",children:[e.jsx(Z,{loading:D,internetOriginalRows:u,internetMatchingRows:T,finalTable:c,setFinalTable:h,searchText:m,work:K,setWork:w,internetTotal:R,setInternetTotal:F}),e.jsx(W,{loading:D,elecOriginalRows:B,elecMatchingRows:v,finalTable:c,setFinalTable:h,searchText:m,work:K,setWork:w,elecTotal:U,setElecTotal:C,phoneTotal:x,setPhoneTotal:O,waterTotal:b,setWaterTotal:y})]}),e.jsx("div",{className:"w-80 m-auto rounded-lg px-6 py-3",children:e.jsx(H,{finalTable:c})}),e.jsx(I,{setTotalInvoices:_,clearAllTables:d,TotalInvoices:E,finalTable:c,isOpen:$,onClose:r,onSubmit:k})]})})}),e.jsx(Y,{payOrInv:N,isOpen:z,onClose:p,onSubmit:S})]})}export{se as default};
