import{r as d,j as e,L as C,a as c,U as V,R as v,u as L,N as h,O as M}from"./index-f1dbc6ca.js";const E="/assets/logo-icon-7e6ff7aa.svg",q=()=>{var i,g;const[t,a]=d.useState(!1),s=d.useRef(null),r=d.useRef(null);d.useEffect(()=>{const n=({target:o})=>{r.current&&(!t||r.current.contains(o)||s.current.contains(o)||a(!1))};return document.addEventListener("click",n),()=>document.removeEventListener("click",n)}),d.useEffect(()=>{const n=({keyCode:o})=>{!t||o!==27||a(!1)};return document.addEventListener("keydown",n),()=>document.removeEventListener("keydown",n)});const l=()=>{localStorage.clear(),c.setCurrentUser(null)};return e.jsxs("div",{className:"relative",children:[e.jsxs(C,{ref:s,onClick:()=>a(!t),className:"flex items-center gap-4",to:"#",children:[e.jsx("span",{className:"hidden text-right lg:block",children:e.jsxs("span",{className:"block text-sm font-medium text-black dark:text-white",children:[(i=c.currentUser)==null?void 0:i.firstName," ",(g=c.currentUser)==null?void 0:g.lastName]})}),e.jsx("span",{className:"h-12 w-12 rounded-full",children:e.jsx("img",{src:V,alt:"User"})}),e.jsx("svg",{className:`hidden fill-current sm:block ${t?"rotate-180":""}`,width:"12",height:"8",viewBox:"0 0 12 8",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:e.jsx("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M0.410765 0.910734C0.736202 0.585297 1.26384 0.585297 1.58928 0.910734L6.00002 5.32148L10.4108 0.910734C10.7362 0.585297 11.2638 0.585297 11.5893 0.910734C11.9147 1.23617 11.9147 1.76381 11.5893 2.08924L6.58928 7.08924C6.26384 7.41468 5.7362 7.41468 5.41077 7.08924L0.410765 2.08924C0.0853277 1.76381 0.0853277 1.23617 0.410765 0.910734Z",fill:""})})]}),e.jsx("div",{ref:r,onFocus:()=>a(!0),onBlur:()=>a(!1),className:`absolute right-0 mt-4 flex w-62.5 flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark ${t===!0?"block":"hidden"}`,children:e.jsxs("button",{onClick:l,className:"flex items-center gap-3.5 py-4 px-6 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base",children:[e.jsxs("svg",{className:"fill-current",width:"22",height:"22",viewBox:"0 0 22 22",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[e.jsx("path",{d:"M15.5375 0.618744H11.6531C10.7594 0.618744 10.0031 1.37499 10.0031 2.26874V4.64062C10.0031 5.05312 10.3469 5.39687 10.7594 5.39687C11.1719 5.39687 11.55 5.05312 11.55 4.64062V2.23437C11.55 2.16562 11.5844 2.13124 11.6531 2.13124H15.5375C16.3625 2.13124 17.0156 2.78437 17.0156 3.60937V18.3562C17.0156 19.1812 16.3625 19.8344 15.5375 19.8344H11.6531C11.5844 19.8344 11.55 19.8 11.55 19.7312V17.3594C11.55 16.9469 11.2062 16.6031 10.7594 16.6031C10.3125 16.6031 10.0031 16.9469 10.0031 17.3594V19.7312C10.0031 20.625 10.7594 21.3812 11.6531 21.3812H15.5375C17.2219 21.3812 18.5625 20.0062 18.5625 18.3562V3.64374C18.5625 1.95937 17.1875 0.618744 15.5375 0.618744Z",fill:""}),e.jsx("path",{d:"M6.05001 11.7563H12.2031C12.6156 11.7563 12.9594 11.4125 12.9594 11C12.9594 10.5875 12.6156 10.2438 12.2031 10.2438H6.08439L8.21564 8.07813C8.52501 7.76875 8.52501 7.2875 8.21564 6.97812C7.90626 6.66875 7.42501 6.66875 7.11564 6.97812L3.67814 10.4844C3.36876 10.7938 3.36876 11.275 3.67814 11.5844L7.11564 15.0906C7.25314 15.2281 7.45939 15.3312 7.66564 15.3312C7.87189 15.3312 8.04376 15.2625 8.21564 15.125C8.52501 14.8156 8.52501 14.3344 8.21564 14.025L6.05001 11.7563Z",fill:""})]}),"Đăng xuất"]})})]})},O=t=>e.jsx("header",{className:"sticky top-0 z-999 flex w-full bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none",children:e.jsxs("div",{className:"flex flex-grow items-center justify-between py-4 px-4 shadow-2 md:px-6 2xl:px-11",children:[e.jsxs("div",{className:"flex items-center gap-2 sm:gap-4 lg:hidden",children:[e.jsx("button",{"aria-controls":"sidebar",onClick:a=>{a.stopPropagation(),t.setSidebarOpen(!t.sidebarOpen)},className:"z-99999 block rounded-sm border border-stroke bg-white p-1.5 shadow-sm dark:border-strokedark dark:bg-boxdark lg:hidden",children:e.jsxs("span",{className:"relative block h-5.5 w-5.5 cursor-pointer",children:[e.jsxs("span",{className:"du-block absolute right-0 h-full w-full",children:[e.jsx("span",{className:`relative top-0 left-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-[0] duration-200 ease-in-out dark:bg-white ${!t.sidebarOpen&&"!w-full delay-300"}`}),e.jsx("span",{className:`relative top-0 left-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-150 duration-200 ease-in-out dark:bg-white ${!t.sidebarOpen&&"delay-400 !w-full"}`}),e.jsx("span",{className:`relative top-0 left-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-200 duration-200 ease-in-out dark:bg-white ${!t.sidebarOpen&&"!w-full delay-500"}`})]}),e.jsxs("span",{className:"absolute right-0 h-full w-full rotate-45",children:[e.jsx("span",{className:`absolute left-2.5 top-0 block h-full w-0.5 rounded-sm bg-black delay-300 duration-200 ease-in-out dark:bg-white ${!t.sidebarOpen&&"!h-0 !delay-[0]"}`}),e.jsx("span",{className:`delay-400 absolute left-0 top-2.5 block h-0.5 w-full rounded-sm bg-black duration-200 ease-in-out dark:bg-white ${!t.sidebarOpen&&"!h-0 !delay-200"}`})]})]})}),e.jsx(C,{className:"block flex-shrink-0 lg:hidden",to:"/",children:e.jsx("img",{src:E,alt:"Logo"})})]}),e.jsx("div",{className:"hidden sm:block"}),e.jsxs("div",{className:"flex items-center gap-3 2xsm:gap-7",children:[e.jsx("ul",{className:"flex items-center gap-2 2xsm:gap-4"}),e.jsx(q,{})]})]})});var z={color:void 0,size:void 0,className:void 0,style:void 0,attr:void 0},N=v.createContext&&v.createContext(z),m=globalThis&&globalThis.__assign||function(){return m=Object.assign||function(t){for(var a,s=1,r=arguments.length;s<r;s++){a=arguments[s];for(var l in a)Object.prototype.hasOwnProperty.call(a,l)&&(t[l]=a[l])}return t},m.apply(this,arguments)},S=globalThis&&globalThis.__rest||function(t,a){var s={};for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&a.indexOf(r)<0&&(s[r]=t[r]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var l=0,r=Object.getOwnPropertySymbols(t);l<r.length;l++)a.indexOf(r[l])<0&&Object.prototype.propertyIsEnumerable.call(t,r[l])&&(s[r[l]]=t[r[l]]);return s};function H(t){return t&&t.map(function(a,s){return v.createElement(a.tag,m({key:s},a.attr),H(a.child))})}function f(t){return function(a){return v.createElement(B,m({attr:m({},t.attr)},a),H(t.child))}}function B(t){var a=function(s){var r=t.attr,l=t.size,i=t.title,g=S(t,["attr","size","title"]),n=l||s.size||"1em",o;return s.className&&(o=s.className),t.className&&(o=(o?o+" ":"")+t.className),v.createElement("svg",m({stroke:"currentColor",fill:"currentColor",strokeWidth:"0"},s.attr,r,g,{className:o,style:m(m({color:t.color||s.color},s.style),t.style),height:n,width:n,xmlns:"http://www.w3.org/2000/svg"}),i&&v.createElement("title",null,i),t.children)};return N!==void 0?v.createElement(N.Consumer,null,function(s){return a(s)}):a(z)}function $(t){return f({tag:"svg",attr:{viewBox:"0 0 24 24"},child:[{tag:"path",attr:{d:"m20 8-6-6H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM9 19H7v-9h2v9zm4 0h-2v-6h2v6zm4 0h-2v-3h2v3zM14 9h-1V4l5 5h-4z"}}]})(t)}function U(t){return f({tag:"svg",attr:{viewBox:"0 0 24 24"},child:[{tag:"path",attr:{d:"M20 2H8a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zm-6 2.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM19 15H9v-.25C9 12.901 11.254 11 14 11s5 1.901 5 3.75V15z"}},{tag:"path",attr:{d:"M4 8H2v12c0 1.103.897 2 2 2h12v-2H4V8z"}}]})(t)}function R(t){return f({tag:"svg",attr:{viewBox:"0 0 616 512"},child:[{tag:"path",attr:{d:"M602 118.6L537.1 15C531.3 5.7 521 0 510 0H106C95 0 84.7 5.7 78.9 15L14 118.6c-33.5 53.5-3.8 127.9 58.8 136.4 4.5.6 9.1.9 13.7.9 29.6 0 55.8-13 73.8-33.1 18 20.1 44.3 33.1 73.8 33.1 29.6 0 55.8-13 73.8-33.1 18 20.1 44.3 33.1 73.8 33.1 29.6 0 55.8-13 73.8-33.1 18.1 20.1 44.3 33.1 73.8 33.1 4.7 0 9.2-.3 13.7-.9 62.8-8.4 92.6-82.8 59-136.4zM529.5 288c-10 0-19.9-1.5-29.5-3.8V384H116v-99.8c-9.6 2.2-19.5 3.8-29.5 3.8-6 0-12.1-.4-18-1.2-5.6-.8-11.1-2.1-16.4-3.6V480c0 17.7 14.3 32 32 32h448c17.7 0 32-14.3 32-32V283.2c-5.4 1.6-10.8 2.9-16.4 3.6-6.1.8-12.1 1.2-18.2 1.2z"}}]})(t)}function Q(t){return f({tag:"svg",attr:{viewBox:"0 0 24 24"},child:[{tag:"path",attr:{fill:"none",d:"M0 0h24v24H0V0z"}},{tag:"path",attr:{d:"M19 5v2h-4V5h4M9 5v6H5V5h4m10 8v6h-4v-6h4M9 17v2H5v-2h4M21 3h-8v6h8V3zM11 3H3v10h8V3zm10 8h-8v10h8V11zm-10 4H3v6h8v-6z"}}]})(t)}function T(t){return f({tag:"svg",attr:{role:"img",viewBox:"0 0 24 24"},child:[{tag:"title",attr:{},child:[]},{tag:"path",attr:{d:"M15 .75q1.605 0 3.21.176.282.035.815.111.534.076 1.178.211.645.135 1.318.328.674.194 1.225.457.55.264.902.598.352.334.352.744v17.25q0 .41-.352.744-.351.334-.902.598-.55.263-1.225.457-.673.193-1.318.328-.644.135-1.178.217-.533.082-.814.105-1.606.176-3.211.176-1.617 0-3.21-.176-.282-.023-.815-.105-.534-.082-1.178-.217-.645-.135-1.318-.328-.674-.194-1.225-.457-.55-.264-.902-.598Q6 21.035 6 20.625V18H.996q-.41 0-.703-.293T0 17.004V6.996q0-.41.293-.703T.996 6H6V3.375q0-.41.352-.744.351-.334.902-.598.55-.263 1.225-.457.673-.193 1.318-.328.644-.135 1.178-.21.533-.077.814-.112Q13.383.75 15 .75zm0 1.5q-.762 0-1.7.053-.937.052-1.904.181-.966.13-1.88.346-.914.217-1.618.545.727.34 1.635.557.908.216 1.863.34.956.123 1.887.175.932.053 1.717.053t1.717-.053q.931-.052 1.887-.176.955-.123 1.863-.34.908-.216 1.635-.556-.704-.328-1.618-.545-.914-.217-1.88-.346-.967-.129-1.905-.181Q15.762 2.25 15 2.25zM4.723 14.145h2.543l.597 1.793h2.004l-2.87-7.876H5.038l-2.906 7.876h1.992zM22.5 20.379v-3.55q-.773.339-1.729.562-.955.222-1.962.357-1.008.135-1.993.193Q15.832 18 15 18q-.855 0-1.705-.053-.85-.052-1.693-.146-.27.199-.598.199H7.5v2.379q.34.27.914.48.574.211 1.272.364.697.152 1.459.252.761.1 1.482.164.72.064 1.342.088.62.023 1.031.023.41 0 1.031-.023.621-.024 1.342-.088.72-.065 1.482-.164.762-.1 1.46-.252.697-.153 1.27-.364.575-.21.915-.48zm0-5.227v-4.324q-.773.34-1.729.563-.955.222-1.962.357-1.008.135-1.993.193Q15.832 12 15 12q-.75 0-1.5-.041t-1.5-.111v4.5q.75.082 1.5.117t1.5.035q.434 0 1.055-.023.62-.024 1.33-.088.709-.065 1.459-.164.75-.1 1.441-.252.692-.153 1.272-.352.58-.2.943-.469zm0-6V4.828q-.773.34-1.729.563-.955.222-1.962.357-1.008.135-1.993.193Q15.832 6 15 6q-.832 0-1.816-.059-.985-.058-1.993-.193-1.007-.135-1.962-.357-.956-.223-1.729-.563V6h3.504q.41 0 .703.293t.293.703v3.352q.75.082 1.5.117t1.5.035q.434 0 1.055-.023.62-.024 1.33-.088.709-.065 1.459-.164.75-.1 1.441-.252.692-.153 1.266-.352.574-.2.949-.469zm-17.32 3.47l.808-2.45.785 2.45Z"}}]})(t)}function _(t){return f({tag:"svg",attr:{viewBox:"0 0 16 16",fill:"currentColor"},child:[{tag:"path",attr:{fillRule:"evenodd",clipRule:"evenodd",d:"M1.5 1h2v1H2v12h1.5v1h-2l-.5-.5v-13l.5-.5zm6 6h-2L5 6.5v-2l.5-.5h2l.5.5v2l-.5.5zM6 6h1V5H6v1zm7.5 1h-3l-.5-.5v-3l.5-.5h3l.5.5v3l-.5.5zM11 6h2V4h-2v2zm-3.5 6h-2l-.5-.5v-2l.5-.5h2l.5.5v2l-.5.5zM6 11h1v-1H6v1zm7.5 2h-3l-.5-.5v-3l.5-.5h3l.5.5v3l-.5.5zM11 12h2v-2h-2v2zm-1-2H8v1h2v-1zm0-5H8v1h2V5z"}}]})(t)}const D="/assets/logo-162ee3ec.svg";function I(t){return f({tag:"svg",attr:{fill:"currentColor",viewBox:"0 0 16 16"},child:[{tag:"path",attr:{d:"M4 .5a.5.5 0 0 0-1 0V1H2a2 2 0 0 0-2 2v1h16V3a2 2 0 0 0-2-2h-1V.5a.5.5 0 0 0-1 0V1H4V.5zm5.402 9.746c.625 0 1.184-.484 1.184-1.18 0-.832-.527-1.23-1.16-1.23-.586 0-1.168.387-1.168 1.21 0 .817.543 1.2 1.144 1.2z"}},{tag:"path",attr:{d:"M16 14V5H0v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2zm-6.664-1.21c-1.11 0-1.656-.767-1.703-1.407h.683c.043.37.387.82 1.051.82.844 0 1.301-.848 1.305-2.164h-.027c-.153.414-.637.79-1.383.79-.852 0-1.676-.61-1.676-1.77 0-1.137.871-1.809 1.797-1.809 1.172 0 1.953.734 1.953 2.668 0 1.805-.742 2.871-2 2.871zm-2.89-5.435v5.332H5.77V8.079h-.012c-.29.156-.883.52-1.258.777V8.16a12.6 12.6 0 0 1 1.313-.805h.632z"}}]})(t)}const P=({sidebarOpen:t,setSidebarOpen:a})=>{var b,p,k,y,j,w;const s=L(),{pathname:r}=s,l=d.useRef(null),i=d.useRef(null),g=localStorage.getItem("sidebar-expanded"),[n,o]=d.useState(g===null?!1:g==="true");return d.useEffect(()=>{const u=({target:x})=>{!i.current||!l.current||!t||i.current.contains(x)||l.current.contains(x)||a(!1)};return document.addEventListener("click",u),()=>document.removeEventListener("click",u)}),d.useEffect(()=>{const u=({keyCode:x})=>{!t||x!==27||a(!1)};return document.addEventListener("keydown",u),()=>document.removeEventListener("keydown",u)}),d.useEffect(()=>{var u,x;localStorage.setItem("sidebar-expanded",n.toString()),n?(u=document.querySelector("body"))==null||u.classList.add("sidebar-expanded"):(x=document.querySelector("body"))==null||x.classList.remove("sidebar-expanded")},[n]),e.jsxs("aside",{ref:i,className:`absolute left-0 top-0 z-999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${t?"translate-x-0":"-translate-x-full"}`,children:[e.jsxs("div",{className:"flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5",children:[e.jsx(h,{to:"/",children:e.jsx("img",{src:D,alt:"Logo"})}),e.jsx("button",{ref:l,onClick:()=>a(!t),"aria-controls":"sidebar","aria-expanded":t,className:"block lg:hidden",children:e.jsx("svg",{className:"fill-current",width:"20",height:"18",viewBox:"0 0 20 18",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:e.jsx("path",{d:"M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z",fill:""})})})]}),e.jsx("div",{className:"no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear",children:e.jsx("nav",{className:"mt-5 py-4 px-4 lg:mt-9 lg:px-6",children:e.jsx("div",{children:e.jsxs("ul",{className:"mb-6 flex flex-col gap-1.5",children:[e.jsx("li",{children:e.jsxs(h,{to:"/",className:`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${(r==="/"||r.includes("dashboard"))&&"bg-graydark dark:bg-meta-4"}`,children:[e.jsx(Q,{}),"Dashboard"]})}),((b=c.currentUser)==null?void 0:b.permissions.includes("baocao"))&&e.jsx("li",{children:e.jsxs(h,{to:"/report",className:`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${r.includes("report")&&"bg-graydark dark:bg-meta-4"}`,children:[e.jsx($,{}),"Báo cáo viếng thăm CH"]})}),((p=c.currentUser)==null?void 0:p.permissions.includes("lichlamviec"))&&e.jsx("li",{children:e.jsxs(h,{to:"/calendar",className:`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${r.includes("calendar")&&"bg-graydark dark:bg-meta-4"}`,children:[e.jsx(I,{}),"Lịch làm việc"]})}),((k=c.currentUser)==null?void 0:k.permissions.includes("quanlycuahang"))&&e.jsx("li",{children:e.jsxs(h,{to:"/store",className:`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${r.includes("store")&&"bg-graydark dark:bg-meta-4"}`,children:[e.jsx(R,{}),"Quản lý cửa hàng"]})}),((y=c.currentUser)==null?void 0:y.permissions.includes("quanlynhanvien"))&&e.jsx("li",{children:e.jsxs(h,{to:"/users",className:`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${r.includes("users")&&"bg-graydark dark:bg-meta-4"}`,children:[e.jsx(U,{}),"Quản lý nhân viên"]})}),((j=c.currentUser)==null?void 0:j.permissions.includes("nguoidung"))&&e.jsx("li",{children:e.jsxs(h,{to:"/role",className:`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${r.includes("role")&&"bg-graydark dark:bg-meta-4"}`,children:[e.jsx(_,{}),"Nhóm người dùng"]})}),((w=c.currentUser)==null?void 0:w.username.includes("sysadmin"))&&e.jsx("li",{children:e.jsxs(h,{to:"/permission",className:`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${r.includes("permission")&&"bg-graydark dark:bg-meta-4"}`,children:[e.jsx(T,{}),"Quản lý quyền"]})})]})})})})]})},F=()=>{const[t,a]=d.useState(!1);return e.jsx("div",{className:"dark:bg-boxdark-2 dark:text-bodydark",children:e.jsxs("div",{className:"flex h-screen overflow-hidden",children:[e.jsx(P,{sidebarOpen:t,setSidebarOpen:a}),e.jsxs("div",{className:"relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden",children:[e.jsx(O,{sidebarOpen:t,setSidebarOpen:a}),e.jsx("main",{children:e.jsx("div",{className:"mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10",children:e.jsx(M,{})})})]})]})})};export{F as default};