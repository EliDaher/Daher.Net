import{r as s,j as e}from"./index-BDEvpPy0.js";import{a as T}from"./index-xsH4HHeE.js";import{l as Q}from"./index-cwOzQRAo.js";import{D as X}from"./DashboardLayout-CI8m_gX9.js";import"./button-BLetExgu.js";import"./house-B8Ikywws.js";function Y({loading:i,internetMatchingRows:m,internetOriginalRows:_,finalTable:y,setFinalTable:O,searchText:N,work:K,setWork:v,internetTotal:u,setInternetTotal:f}){const[b,p]=s.useState([]),[C,R]=s.useState([]),[c,o]=s.useState(null),g=Date.now(),A=new Date(g),[M,J]=s.useState(["11/24","12/24","1/25","2/25","3/25","4/25","5/25","6/25","7/25","8/25","9/25","10/25","11/25","12/25"]);s.useEffect(()=>{m.length>0?(p(m),R(_),v(!1)):(p([]),R([]),v(!1))},[m]);const q=(n,x,$)=>{T.post("https://server-uvnz.onrender.com/update",{row:n,col:x,value:$}).then(V=>{}).catch(V=>{console.error("Error updating data:",V)})};return i?e.jsx("div",{className:"flex items-center justify-center",children:e.jsx("div",{})}):c?e.jsx("div",{className:"m-6 w-full text-red-500",children:c}):e.jsxs("div",{className:"shadow-md shadow-foreground/30 p-4 m-3 border rounded-xl bg-background",dir:"rtl",children:[e.jsxs("div",{className:"flex justify-between items-center",children:[e.jsx("h2",{className:"text-center font-bold text-gray-900 text-xl my-4",children:"فواتير الإنترنت"}),e.jsx("div",{children:e.jsxs("p",{className:"font-bold text-text-950 p-2 rounded-lg shadow shadow-primary-400",children:["انترنت ",u]})})]}),e.jsx("div",{className:"w-full overflow-auto max-h-96 rounded-lg border border-gray-300",children:b.length>0?e.jsxs("table",{className:"w-full text-sm border-collapse",children:[e.jsx("thead",{className:"bg-gray-800 text-white text-center",children:e.jsxs("tr",{className:"max-h-2 leading-none border-xl border-primary-800",children:[e.jsx("th",{className:"border border-gray-600 px-1 py-2",children:"#"}),e.jsx("th",{className:"border border-gray-600 px-4 py-2 bg-gray-800 sticky right-[0px]",children:"رقم الهاتف"}),e.jsx("th",{className:"border border-gray-600 px-4 py-2 bg-gray-800 sticky right-[120px]",children:"اسم المشترك"}),e.jsx("th",{className:"border border-gray-600 px-1 py-2 bg-gray-800 sticky right-[240px]",children:"الشركة"}),e.jsx("th",{className:"border border-gray-600 px-1 py-2",children:"السرعة"}),e.jsx("th",{className:"border border-gray-600 px-1 py-2",children:"تاريخ التسديد"}),e.jsx("th",{className:"border border-gray-600 px-4 py-2 bg-gray-800 sticky right-[288px]",children:"الفاتورة الشهرية"}),e.jsx("th",{className:"border border-gray-600 px-4 py-2 bg-gray-800 sticky right-[400px]",children:"ملاحظات"}),M.map((n,x)=>e.jsxs(e.Fragment,{children:[e.jsx("th",{className:"border border-gray-600 px-4 py-2",children:n}),e.jsx("th",{className:"border border-gray-600 px-4 py-2",children:n}),e.jsx("th",{className:"border border-gray-600 px-4 py-2"})]}))]})}),e.jsx("tbody",{children:b.map((n,x)=>{const $=Object.values(n);return e.jsx("tr",{className:`even:bg-gray-100 transition-all\r
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
                                        `,"data-key":x,children:Array.from({length:50},(l,r)=>e.jsx("td",{className:"border border-gray-300",children:e.jsxs("div",{className:"flex",children:[e.jsx("input",{type:"text",value:$[r]||"",onChange:a=>{const z=[...b];z[x]={...z[x],[Object.keys(n)[r]||`field_${r}`]:a.target.value},p(z)},className:"p-1 w-32 bg-transparent outline-none text-center"}),e.jsx("button",{onClick:a=>{var S,j;const z=A.toLocaleDateString("en-US"),P=[...b];if(P[x][r]==z){const D=Object.keys(n)[r]||`field_${r}`,E=Object.keys(n)[r-1]||`field_${r-1}`;P[x]={...P[x],[E]:"",[D]:""},p(P),isNaN($[r-1])||f(Number(u)-Number($[r-1]));const F=(S=a.target.closest("tr"))==null?void 0:S.getAttribute("data-key");if(F!=null){const h=C[F];var t=r,k="";q(h,t,k),t=r-1,k="",q(h,t,k)}const w={customerName:n[2],customerNumber:n[1],customerDetails:n[3],invoiceNumber:M[r/3-3],invoiceValue:n[6]};O(y.filter(h=>!(h.customerName===w.customerName&&h.customerNumber===w.customerNumber&&h.customerDetails===w.customerDetails&&h.invoiceNumber===w.invoiceNumber&&h.invoiceValue===w.invoiceValue)))}else{const D=Object.keys(n)[r]||`field_${r}`,E=Object.keys(n)[r-1]||`field_${r-1}`,F=n[6];P[x]={...P[x],[E]:F,[D]:z},p(P),isNaN($[r-1])||f(Number(u)+Number(F));const w=(j=a.target.closest("tr"))==null?void 0:j.getAttribute("data-key");if(w!=null){const B=C[w];var t=r,k=z;q(B,t,k),t=r-1,k=F,q(B,t,k)}const h={customerName:n[2],customerNumber:n[1],customerDetails:n[3],invoiceNumber:M[r/3-3],invoiceValue:n[6]};O([...y,h])}},className:`hover:bg-accent-600 w-4 ${Number(r+1)%3===1&&r>7?"bg-accent-400":"hidden"} ${n[r-1]?"bg-red-400 hover:bg-red-600":""}`,children:"+"})]})},r))},x)})})]}):e.jsx("p",{className:"text-center text-gray-500 py-4",children:"لم يتم العثور على أي فواتير."})})]})}function Z({loading:i,elecMatchingRows:m,elecOriginalRows:_,finalTable:y,setFinalTable:O,searchText:N,work:K,setWork:v,elecTotal:u,phoneTotal:f,waterTotal:b,setElecTotal:p,setPhoneTotal:C,setWaterTotal:R}){const[c,o]=s.useState([]),[g,A]=s.useState([]),[M,J]=s.useState(null),q=Date.now(),n=new Date(q),[x,$]=s.useState(["1","1","1","1","1","1","1","1","1","1","1"]),V=(l,r,a)=>{T.post("https://server-uvnz.onrender.com/updateElec",{row:l,col:r,value:a}).then(z=>{}).catch(z=>{console.error("Error updating data:",z)})};return s.useEffect(()=>{m.length>0?(o(m),A(_),v(!1)):(o([]),A([]),v(!1))},[m]),i?e.jsx("div",{className:"flex items-center justify-center",children:e.jsx("div",{})}):M?e.jsx("div",{className:"m-6 w-full text-red-500",children:M}):e.jsxs("div",{className:"shadow-md shadow-foreground/30 p-4 m-3 border rounded-xl bg-background",dir:"rtl",children:[e.jsxs("div",{className:"flex justify-between items-center",children:[e.jsx("h2",{className:"text-right font-bold text-text-950 text-xl my-4 mr-2",children:"فواتير الخدمات الحكومية"}),e.jsxs("div",{className:"flex gap-5 items-right",children:[e.jsxs("p",{className:"font-bold text-text-950 p-2 rounded-lg shadow shadow-orange-400",children:["ارضي ",f]}),e.jsxs("p",{className:"font-bold text-text-950 p-2 rounded-lg shadow shadow-yellow-400",children:["كهرباء ",u]}),e.jsxs("p",{className:"font-bold text-text-950 p-2 rounded-lg shadow shadow-blue-400",children:["مياه ",b]})]})]}),e.jsx("div",{className:"w-full overflow-auto max-h-96 rounded-lg border border-gray-300",children:c.length>0?e.jsxs("table",{className:"w-full text-sm border-collapse",children:[e.jsx("thead",{className:"bg-gray-800 text-white text-center",children:e.jsxs("tr",{className:"max-h-4 leading-none border-xl border-primary-800",children:[e.jsx("th",{className:"border border-gray-600 px-1 sticky right-[0px] z-20 top-0 bg-gray-800",children:"#"}),e.jsx("th",{className:"border border-gray-600 px-2 sticky right-[47px] z-20 top-0 bg-gray-800",children:"نوع الفاتورة"}),e.jsx("th",{className:"border border-gray-600 px-2 sticky right-[165px] z-20 top-0 bg-gray-800"}),e.jsx("th",{className:"border border-gray-600 px-2 sticky right-[292px] z-20 top-0 bg-gray-800",children:"الرقم"}),x.map(l=>e.jsxs(e.Fragment,{children:[e.jsx("th",{className:"border border-gray-600 bg-primary-800"}),e.jsx("th",{className:"border border-gray-600 px-2 py-2 ",children:"الدورة"}),e.jsx("th",{className:"border border-gray-600 px-2 py-2 ",children:"قيمة الفاتورة"}),e.jsx("th",{className:"border border-gray-600 px-2 py-2 ",children:"المبلغ المقبوض"}),e.jsx("th",{className:"border border-gray-600 px-2 py-2 ",children:"تاريخ الدفع"}),e.jsx("th",{className:"border border-gray-600 px-2 py-2 ",children:"ملاحظات"})]}))]})}),e.jsx("tbody",{children:c.map((l,r)=>{const a=Object.values(l);return e.jsx("tr",{className:`transition-all duration-200 
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
                                        [&>*:nth-child(4)]:right-[292px]`,"data-key":r,children:Array.from({length:70},(P,t)=>e.jsx("td",{className:"border border-gray-300",children:e.jsxs("div",{className:"flex",children:[e.jsx("input",{type:"text",value:a[t]||"",onChange:k=>{const S=[...c];if(S[r]){const j=Object.keys(l)[t]||`field_${t}`;S[r]={...S[r],[j]:k.target.value},o(S)}},className:"p-1 w-32 bg-transparent outline-none text-center"}),e.jsx("button",{onClick:k=>{var F,w;const S=n.toLocaleDateString("en-US"),j=[...c];if(j[r][t]==S){const h=Object.keys(l)[t]||`field_${t}`,B=Object.keys(l)[t-1]||`field_${t-1}`;j[r]={...j[r],[B]:"",[h]:""},o(j),a[1].includes("ارضي")&&!isNaN(a[t-1])&&C(Number(f)-Number(a[t-1])),a[1].includes("كهربا")&&!isNaN(a[t-1])&&p(Number(u)-Number(a[t-1])),a[1].includes("ميا")&&!isNaN(a[t-1])&&R(Number(b)-Number(a[t-1]));const d=(F=k.target.closest("tr"))==null?void 0:F.getAttribute("data-key");if(d!=null){const L=g[d];var D=t,E="";V(L,D,E),D=t-1,E="",V(L,D,E)}const U={customerName:l[1],customerNumber:l[3],customerDetails:l[2],invoiceNumber:l[t-3],invoiceValue:l[t-2]};O(y.filter(L=>!(L.customerName===U.customerName&&L.customerNumber===U.customerNumber&&L.customerDetails===U.customerDetails&&L.invoiceNumber===U.invoiceNumber&&L.invoiceValue===U.invoiceValue)))}else{const h=Object.keys(l)[t]||`field_${t}`,B=Object.keys(l)[t-1]||`field_${t-1}`,d=l[t-2];j[r]={...j[r],[B]:d,[h]:S},o(j),a[1].includes("ارضي")&&!isNaN(a[t-1])&&C(Number(f)+Number(d)),a[1].includes("كهربا")&&!isNaN(a[t-1])&&p(Number(u)+Number(d)),a[1].includes("ميا")&&!isNaN(a[t-1])&&R(Number(b)+Number(d));const U=(w=k.target.closest("tr"))==null?void 0:w.getAttribute("data-key");if(U!=null){const G=g[U];var D=t,E=S;V(G,D,E),D=t-1,E=d,V(G,D,E)}const L={customerName:l[2],customerNumber:l[3],customerDetails:l[1],invoiceNumber:l[t-3],invoiceValue:l[t-2]};O([...y,L])}},className:`hover:bg-accent-600 w-4 ${t%6===2&&t>4?"bg-accent-500":"hidden"} ${l[t-1]?"bg-red-400 hover:bg-red-600":""}`,children:"+"})]})},t))},r)})})]}):e.jsx("p",{className:"text-center text-gray-500 py-4",children:"لم يتم العثور على أي فواتير."})})]})}function H({finalTable:i}){return e.jsx(e.Fragment,{children:i.length>0?e.jsx("div",{className:"mt-5 text-center",dir:"rtl",children:e.jsxs("table",{className:"w-full text-text-900 shadow shadow-primary-900",children:[e.jsx("thead",{className:"border border-primary-400",children:e.jsxs("tr",{className:"border border-primary-400",children:[e.jsx("th",{className:"w-10 px-2",children:"نوع الفاتورة"}),e.jsx("th",{className:"w-10 px-2",children:"الاسم"}),e.jsx("th",{className:"w-10 px-2",children:"الرقم"}),e.jsx("th",{className:"w-10 px-2",children:"الدورة"}),e.jsx("th",{className:"w-10 px-2",children:"المبلغ"})]})}),e.jsx("tbody",{className:"",children:i.map(m=>e.jsxs("tr",{children:[e.jsx("td",{className:"w-10 py-1 px-2 border-primary-500",children:m.customerDetails}),e.jsx("td",{className:"w-10 py-1 px-2 border-primary-500",children:m.customerName}),e.jsx("td",{className:"w-10 py-1 px-2 border-primary-500",children:m.customerNumber}),e.jsx("td",{className:"w-10 py-1 px-2 border-primary-500",children:m.invoiceNumber}),e.jsx("td",{className:"w-10 py-1 px-2 border-primary-500",children:m.invoiceValue})]}))})]})}):e.jsx(e.Fragment,{})})}function W({clearAllTables:i,TotalInvoices:m,setTotalInvoices:_,finalTable:y,isOpen:O,onClose:N,onSubmit:K}){if(!O)return null;const v=JSON.parse(localStorage.getItem("DaherUser")),[u,f]=s.useState(!1),b=async c=>{var o;c.preventDefault(),f(!0);try{const g={amount:m,employee:v.username,details:{...y}};(await T.post("https://server-uvnz.onrender.com/addInvoice",g)).data.success&&console.log("تمت إضافة الفاتورة بنجاح!")}catch(g){console.error("حدث خطأ أثناء إرسال الفاتورة:",((o=g.response)==null?void 0:o.data)||g.message)}f(!1),i(),K(),N()},p=s.useRef(),C=Q.useReactToPrint({contentRef:p,pageStyle:`
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
    `,onAfterPrint:()=>{console.log("تمت الطباعة بنجاح!"),N()}}),R=()=>{const c=new Date,o={year:"numeric",month:"2-digit",day:"2-digit",weekday:"long",hour:"2-digit",minute:"2-digit",second:"2-digit"};return c.toLocaleDateString("en-GB",o)};return e.jsx(e.Fragment,{children:e.jsx("div",{className:"fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-30",children:e.jsxs("div",{className:"bg-white rounded-lg shadow-lg p-6 relative",children:[e.jsx("button",{className:"absolute top-6 left-6 text-gray-500 hover:text-gray-800",onClick:N,children:"✕"}),e.jsx("h2",{className:"text-xl font-bold text-gray-800 mb-4 text-right",children:"تأكيد الفواتير"}),e.jsxs("form",{onSubmit:b,children:[e.jsx("div",{className:"h-96 overflow-y-scroll mb-3 shadow scrollbar-sm",children:e.jsxs("div",{ref:p,children:[e.jsxs("div",{className:"header",children:[e.jsx("span",{children:"Daher.Net"}),e.jsx("span",{children:R()})]}),e.jsx("div",{className:"text-right",children:e.jsx(H,{finalTable:y})}),e.jsx("div",{className:"totalValue",dir:"rtl",children:e.jsxs("h3",{className:"my-3",children:["المجموع :",e.jsx("input",{lang:"en",dir:"ltr",className:"p-1 font-bold text-left",type:"number",min:"0",value:m,onChange:c=>{const o=c.target.value.replace(/[٠-٩]/g,g=>"٠١٢٣٤٥٦٧٨٩".indexOf(g));_(o)}})]})})]})}),e.jsxs("div",{className:"flex justify-start gap-3",children:[e.jsx("button",{disabled:!!u,type:"submit",className:"bg-primary-500 text-white font-bold px-3 py-1 rounded hover:bg-primary-600",children:u?"جاري الحفظ ...":"Save"}),e.jsx("button",{onClick:c=>{c.preventDefault(),C(),b(c)},className:"bg-accent-500 text-white font-bold px-3 py-1 rounded hover:bg-accent-600",children:"Print"}),e.jsx("button",{onClick:N,className:"bg-red-500 text-white font-bold px-3 py-1 rounded hover:bg-red-600",children:"Close"})]})]})]})})})}function I({payOrInv:i,isOpen:m,onClose:_,onSubmit:y,mahal:O=!1}){if(!m)return null;const[N,K]=s.useState(0),[v,u]=s.useState(""),[f,b]=s.useState(""),p=JSON.parse(localStorage.getItem("DaherUser")),[C,R]=s.useState(!1),c=async o=>{var g;o.preventDefault();try{R(!0);const A={amount:i=="pay"?Number(N):Number(-N),employee:O?"mahal":p.username,details:[{customerDetails:f,customerName:i=="pay"?v:p.username,customerNumber:"0",invoiceNumber:"0",invoiceValue:i=="pay"?Number(N):Number(-N)}]};(await T.post("https://server-uvnz.onrender.com/addInvoice",A)).data.success&&alert("تمت إضافة الفاتورة بنجاح!")}catch(A){console.error("حدث خطأ أثناء إرسال الفاتورة:",((g=A.response)==null?void 0:g.data)||A.message),alert("حدث خطأ أثناء إرسال الفاتورة")}R(!1),y(),_()};return e.jsx("div",{className:"fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-30",children:e.jsxs("div",{className:"bg-white rounded-lg shadow-lg p-6 w-96 relative rtl",children:[e.jsx("button",{className:"absolute top-2 left-2 text-gray-500 hover:text-gray-800",onClick:_,children:"✕"}),e.jsx("h2",{className:"text-xl font-bold text-gray-800 mb-4 text-right",children:i=="pay"?"اضافة الى الصندوق":"دفع من الصندوق"}),e.jsxs("form",{onSubmit:c,dir:"rtl",children:[e.jsxs("div",{className:"mb-4",children:[e.jsx("label",{htmlFor:"Amount",className:"mr-1 block text-sm font-medium text-gray-700",children:"اسم المشترك"}),e.jsx("input",{autoFocus:!0,placeholder:"عابر",onBlur:o=>{v||u("عابر")},value:v,onChange:o=>{u(o.target.value)},tabIndex:1,type:"text",id:"Amount",required:!0,className:"focus:outline-primary mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-right"})]}),e.jsxs("div",{className:"mb-4",children:[e.jsx("label",{htmlFor:"Amount",className:"mr-1 block text-sm font-medium text-gray-700",children:"القيمة"}),e.jsx("input",{value:N,onChange:o=>{K(o.target.value)},tabIndex:1,type:"number",id:"Amount",required:!0,className:"focus:outline-primary mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-right"})]}),e.jsxs("div",{className:"mb-4",children:[e.jsx("label",{htmlFor:"Details",className:"mr-1 block text-sm font-medium text-gray-700 text-right",children:"تفاصيل"}),e.jsx("textarea",{value:f,onChange:o=>{b(o.target.value)},tabIndex:2,id:"Details",required:!0,className:"focus:outline-primary mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"})]}),e.jsxs("div",{className:"flex justify-start",children:[e.jsx("button",{disabled:!!C,type:"submit",className:"bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600",children:C?"جاري الحفظ ...":"Save"}),e.jsx("button",{className:"mr-auto bg-red-500 text-white px-4 py-2 rounded-md hover:text-white",onClick:_,children:"Close"})]})]})]})})}function ne(){const[i,m]=s.useState({PhNumber:""}),[_,y]=s.useState(!1),[O,N]=s.useState(0),[K,v]=s.useState(0),[u,f]=s.useState(0),[b,p]=s.useState(0),[C,R]=s.useState(0),[c,o]=s.useState([]),[g,A]=s.useState(0),[M,J]=s.useState(0),[q,n]=s.useState(0),[x,$]=s.useState(0),[V,l]=s.useState(!1),r=()=>l(!1),a=()=>l(!0),z=()=>r(),[P,t]=s.useState(!1),[k,S]=s.useState("pay"),j=()=>t(!1),D=()=>t(!0),E=()=>{j()},[F,w]=s.useState(!1),h=()=>{N(0),v(0),p(0),f(0),o([]),J([]),A([]),$([]),n([])},B=async()=>{if(i!=null&&i.PhNumber){w(!0);try{const d=await T.post("https://server-uvnz.onrender.com/search",i);J(d.data.elecOriginalRows),A(d.data.elecMatchingRows),$(d.data.internetOriginalRows),n(d.data.internetMatchingRows)}catch(d){console.error(d)}finally{w(!1)}}};return s.useEffect(()=>{R(Number(O)+Number(K)+Number(u)+Number(b))},[O,K,u,b]),e.jsxs(e.Fragment,{children:[e.jsx(X,{children:e.jsx("div",{className:"space-y-6",children:e.jsxs("div",{className:"flex-col w-full",children:[e.jsxs("div",{className:"sticky top-0 z-30 py-3 shadow bg-foreground/10 flex flex-wrap justify-center mt-4 select-none",children:[e.jsxs("div",{className:"flex gap-3 px-2 mr-10",children:[e.jsx("button",{onClick:()=>{S("pay"),D()},className:"p-2 bg-primary-500 text-white rounded hover:bg-primary-600",children:"قبض"}),e.jsx("button",{onClick:()=>{S("inv"),D()},className:"p-2 bg-red-500 text-white rounded hover:bg-red-600",children:"دفع"})]}),e.jsxs("div",{className:"flex shadow-[0px_0px_4px] shadow-accent-400 mr-5 rounded-lg text-text-950",children:[e.jsx("button",{onClick:()=>{c.length>0&&a()},className:"text-center text-lg p-2 border-r rounded-l-lg border-text-950 bg-accent-200 hover:bg-accent-300 text-accent-foreground font-bold",children:"انهاء"}),e.jsx("div",{className:"text-center text-xl p-2 rounded-r-lg",children:C})]}),e.jsx("input",{type:"text",placeholder:"بحث برقم الهاتف",className:"p-2 rounded-l-lg w-60 text-center bg-background text-text-900 shadow-md outline-none border border-primary-500",value:i.PhNumber,onChange:d=>{m({PhNumber:d.target.value})},onKeyDown:d=>{d.key==="Enter"&&(d.preventDefault(),y(!0),B(),h())}}),e.jsx("button",{onClick:()=>{y(!0),B(),h()},className:"p-2 rounded-r-lg bg-primary-500 text-white font-bold",children:"بحث"})]}),e.jsxs("div",{className:"bg-foreground/5 p-1",children:[e.jsx(Y,{loading:F,internetOriginalRows:x,internetMatchingRows:q,finalTable:c,setFinalTable:o,searchText:i,work:_,setWork:y,internetTotal:O,setInternetTotal:N}),e.jsx(Z,{loading:F,elecOriginalRows:M,elecMatchingRows:g,finalTable:c,setFinalTable:o,searchText:i,work:_,setWork:y,elecTotal:K,setElecTotal:v,phoneTotal:u,setPhoneTotal:f,waterTotal:b,setWaterTotal:p})]}),e.jsx("div",{className:"w-80 m-auto rounded-lg px-6 py-3",children:e.jsx(H,{finalTable:c})}),e.jsx(W,{setTotalInvoices:R,clearAllTables:h,TotalInvoices:C,finalTable:c,isOpen:V,onClose:r,onSubmit:z})]})})}),e.jsx(I,{payOrInv:k,isOpen:P,onClose:j,onSubmit:E})]})}export{ne as default};
