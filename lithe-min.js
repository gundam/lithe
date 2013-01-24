/* @author xiaojue[designsor@gmail.com]
 * @fileoverview lithe module
 */(function(e,t){var n=typeof window!==t&&!!e.navigator&&!!e.document;if(n){var r=e.document,i=e.location,s=function(){},o=Array.prototype,u=Object,a,f,l="utf-8",c=u.prototype.toString,h=r.head||r.getElementsByTagName("head")[0]||r.documentElement,p=navigator.userAgent,d=r.getElementsByTagName("script"),v=d[d.length-1],m=v.getAttribute("data-path")||v.src||v.getAttribute("src"),g=v.getAttribute("data-config"),y=v.getAttribute("data-main"),b=h.getElementsByTagName("base")[0],w=/(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/mg,E=/[^.]\s*require\s*\(\s*["']([^'"\s]+)["']\s*\)/g,S={},x={},T={},N=[],C=function(e,t){if(arguments.length===1)return e;for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n]);return e},k=C({isString:function(e){return c.call(e)==="[object String]"},isFunction:function(e){return c.call(e)==="[object Function]"},isObject:function(e){return e===u(e)},forEach:o.forEach?function(e,t){e.forEach(t)}:function(e,t){for(var n=0;n<e.length;n++)t(e[n],n,e)},filter:o.filter?function(e,t){return e.filter(t)}:function(e,t){var n=[];return k.forEach(e,function(e,r,i){t(e,r,i)&&n.push(e)}),n},map:o.map?function(e,t){return e.map(t)}:function(e,t){var n=[];return k.forEach(e,function(e,r,i){n.push(t(e,r,i))}),n},keys:u.keys?u.keys:function(e){var t=[];for(var n in e)e.hasOwnProperty(n)&&t.push(n);return t},indexOf:o.indexOf?function(e,t){return e.indexOf(t)}:function(e,t){for(var n=0;n<e.length;n++)if(e[n]===t)return n;return-1},unique:function(e){var t={};return k.forEach(e,function(e){t[e]=1}),k.keys(t)},_createNode:function(e,t){var n=r.createElement(e);return t&&(n.charset=t),n},_insertScript:function(e){b?h.insertBefore(e,b):h.appendChild(e)},getScript:function(e,n,r){var i=k._createNode("script",r);i.onload=i.onerror=i.onreadystatechange=function(){/loaded|complete|undefined/.test(i.readyState)&&(i.onload=i.onerror=i.onreadystatechange=null,i.parentNode&&i.parentNode.removeChild(i),i=t,k.isFunction(n)&&n())},i.async="async",i.src=e,k._insertScript(i)},_fetch:function(e,t){if(T[e]){t();return}if(S[e]){x[e].push(t);return}S[e]=!0,x[e]=[t],k.getScript(e,function(){T[e]=!0,delete S[e];var t=x[e];t&&(delete x[e],k.forEach(t,function(e){e()}))},l)},getDependencies:function(e){var t=[];return e.replace(w,"").replace(E,function(e,n){t.push(n)}),k.unique(t)},getPureDependencies:function(e){var t=e.id;return k.filter(e.dependencies,function(e){N.push(t);var n=k.isCircularWaiting(L.cache[e]);return n&&N.push(t),N.pop(),!n})},isCircularWaiting:function(e){if(!e||e.status!==L.status.save)return!1;N.push(e.uri);var t=e.dependencies;if(t.length){if(k.isOverlap(t,N))return!0;for(var n=0;n<t.length;n++)if(k.isCircularWaiting(L.cache[t[n]]))return!0}return N.pop(),!1},isOverlap:function(e,t){var n=e.concat(t);return n.length>k.unique(n).length},runModuleContext:function(e,n){var r;try{r=e(n.require,n.exports,n)}catch(i){throw n.id+":"+i}r!==t&&(n.exports=r)},dirname:function(e){var t=e.match(/[^?]*(?=\/.*$)/);return(t?t[0]:".")+"/"},realpath:function(e){var t=/([^:\/])\/\/+/g;t.lastIndex=0,t.test(e)&&(e=e.replace(t,"$1/"));if(e.indexOf(".")===-1)return e;var n=e.split("/"),r=[],i;for(var s=0;s<n.length;s++){i=n[s];if(i===".."){if(r.length===0)throw new Error("The path is invalid: "+e);r.pop()}else i!=="."&&r.push(i)}return r.join("/")},normalize:function(e){e=k.realpath(e);var t=e.charAt(e.length-1);return t==="/"?e:(t==="#"?e=e.slice(0,-1):e.indexOf("?")===-1&&!/\.(?:js)$/.test(e)&&(e+=".js"),e.indexOf(":80/")>0&&(e=e.replace(":80/","/")),e)},resolve:function(e,t){var n="";return e?(e.indexOf("./")===0||e.indexOf("../")===0?(e.indexOf("./")===0&&(e=e.substring(2)),n=k.dirname(t)+e):e.charAt(0)==="/"&&e.charAt(1)!=="/"?n=k.dirname(t)+e.substring(1):n=k.dirname(t)+"/"+e,k.normalize(n)):n},createUrl:function(e){return k.map(e,function(e){return a&&a.hasOwnProperty(e)&&(e=a[e]),e.indexOf("://")>0||e.indexOf("//")===0?(f&&(e=e+"?"+f),e):(e=k.resolve(e,m),f&&(e=e+"?"+f),e)})}});function L(e){this.id=e,this.status=0,this.dependencies=[],this.exports=null,this.parent=[],this.factory=s}C(L,{cache:{},status:{created:0,save:1,ready:2,compiling:3,compiled:4},define:function(e,t){if(!k.isString(e)||!k.isFunction(t))throw"define failed";e=k.createUrl([e]);var n=k.getDependencies(t.toString()),r=L.cache[e]||(L.cache[e]=new L(e));r.status<L.status.save&&(r.id=e,r.dependencies=k.createUrl(n),r.factory=t,r.status=L.status.save)},use:function(e,t){k.isString(e)&&(e=[e]);var n=k.createUrl(e);L._fetch(n,function(){var e=k.map(n,function(e){return e?L.cache[e]._compile():null});k.isFunction(t)&&t.apply(null,e)})},_fetch:function(e,t){var n=L.status,r=k.filter(e,function(e){return e&&(!L.cache[e]||L.cache[e].status<n.ready)}),i=r.length;if(i===0){t();return}var s=i;for(var o=0;o<i;o++){(function(e){function r(){t=L.cache[e];if(t.status>=n.save){var r=k.getPureDependencies(t);r.length?L._fetch(r,function(){u(t)}):u(t)}else u()}var t=L.cache[e]||(L.cache[e]=new L(e));t.status<L.status.save?k._fetch(e,r):r()})(r[o]);function u(e){(e||{}).status<n.ready&&(e.status=n.ready),--s,s===0&&t()}}}}),C(L.prototype,{_compile:function(){function require(n){var r=L.cache[k.createUrl([n])];return r?r.status===t.compiled?r.exports:(r.parent=e,r._compile()):null}var e=this,t=L.status;if(e.status===t.compiled)return e.exports;if(e.status<t.save)return null;e.status=t.compiling,require.cache=L.cache,e.require=require,e.exports={};var n=e.factory;return k.isFunction(n)&&k.runModuleContext(n,e),e.status=t.compiled,e.exports}}),e.define=L.define,e.lithe=C({use:L.use}),g?L.use(g,function(e){e.hasOwnProperty("alias")&&(a=e.alias),e.hasOwnProperty("base")&&(m=e.base),e.hasOwnProperty("timestamp")&&(f=e.timestamp),L.use(y)}):L.use(y)}else exports.tool=require("./lib/lithe-tool.js"),exports.hfs=require("./lib/lithe-hfs.js")})(this);