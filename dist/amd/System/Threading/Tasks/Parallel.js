/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
 * Originally based upon Parallel.js: https://github.com/adambom/parallel.js/blob/master/lib/parallel.js
 */
define(["require","exports","../../Promises/Promise","../../Types","../Worker","../deferImmediate","../../Environment","../../Disposable/ObjectPool"],function(e,r,n,t,o,i,s,u){"use strict";function a(e,r){r||(r={});for(var n=0,t=Object.keys(e);n<t.length;n++){var o=t[n];void 0===r[o]&&(r[o]=e[o])}return r}function c(e,r,n,t){r&&(e.onmessage=r),n&&(e.onerror=n),t!==f&&e.postMessage(t)}var l,f=void 0,p=typeof self!==t.Type.UNDEFINED?self.URL?self.URL:self.webkitURL:null,h=!(!s.isNodeJS&&!self.Worker),d={evalPath:s.isNodeJS?__dirname+"/eval.js":null,maxConcurrency:s.isNodeJS?e("os").cpus().length:navigator.hardwareConcurrency||4,allowSynchronous:!0,env:{},envNamespace:"env"},v=function(e){function r(r,n){e.call(this,function(e,t){c(r,function(r){e(r.data)},function(e){t(e)},n)},!0)}return __extends(r,e),r}(n.Promise);!function(e){function r(e){var r=a[e];return r||(a[e]=r=new u.ObjectPool(8),r.autoClearTimeout=1e3),r}function n(e){if(e){e.onerror=null,e.onmessage=null;var n=e.__key;n?r(n).add(e):i.deferImmediate(function(){return e.terminate()})}return null}function t(e){return r(e).tryTake()}function s(e,r){var n=new o["default"](r);return n.__key=e,n.dispose=function(){n.onmessage=null,n.onerror=null,n.dispose=null,n.terminate()},n}var a={};e.recycle=n,e.tryGet=t,e.getNew=s}(l||(l={}));var y=function(){function e(e){this.options=a(d,e),this._requiredScripts=[],this._requiredFunctions=[]}return e.maxConcurrency=function(r){return new e({maxConcurrency:r})},e.prototype.getWorkerSource=function(e,r){var n=this._requiredScripts,t=this._requiredFunctions,o="";!s.isNodeJS&&n.length&&(o+='importScripts("'+n.join('","')+'");\r\n');for(var i=0,u=t;i<u.length;i++){var a=u[i],c=a.name,l=a.fn,f=l.toString();o+=c?"var "+c+" = "+f+";":f}r=JSON.stringify(r||{});var p=this.options.envNamespace;return o+(s.isNodeJS?'process.on("message", function(e) {global.'+p+" = "+r+";process.send(JSON.stringify(("+e.toString()+")(JSON.parse(e).data)))})":"self.onmessage = function(e) {var global = {}; global."+p+" = "+r+"';self.postMessage(("+e.toString()+")(e.data))}")},e.prototype.require=function(){for(var e=[],r=0;r<arguments.length;r++)e[r-0]=arguments[r];return this.requireThese(e)},e.prototype.requireThese=function(e){for(var r=0,n=e;r<n.length;r++){var o=n[r];switch(typeof o){case t.Type.STRING:this._requiredScripts.push(o);break;case t.Type.FUNCTION:this._requiredFunctions.push({fn:o});break;case t.Type.OBJECT:this._requiredFunctions.push(o);break;default:throw new TypeError("Invalid type.")}}return this},e.prototype._spawnWorker=function(e,r){var n=this.getWorkerSource(e,r);if(o["default"]===f)return f;var t=l.tryGet(n);if(t)return t;var i=this._requiredScripts,u=this.options.evalPath;if(!u){if(s.isNodeJS)throw new Error("Can't use NodeJD without eval.js!");if(i.length)throw new Error("Can't use required scripts without eval.js!");if(!p)throw new Error("Can't create a blob URL in this browser!")}if(s.isNodeJS||i.length||!p)t=l.getNew(n,u),t.postMessage(n);else if(p){var a=new Blob([n],{type:"text/javascript"}),c=p.createObjectURL(a);t=l.getNew(n,c)}return t},e.prototype.startNew=function(e,r,t){var o=this,i=o._spawnWorker(r,a(o.options.env,t||{}));if(i)return new v(i,e).finallyThis(function(){return l.recycle(i)});if(o.options.allowSynchronous)return new n.Promise(function(n,t){try{n(r(e))}catch(o){t(o)}});throw new Error("Workers do not exist and synchronous operation not allowed!")},e.prototype.pipe=function(e,r,t){this.options.maxConcurrency;return new n.PromiseCollection(e&&e.map(function(e){return new n.Promise(function(e,r){})}))},e.prototype.map=function(e,r,t){var o=this;return e&&e.length?(e=e.slice(),new n.ArrayPromise(function(i,s){var u=[],a=e.length;u.length=a;for(var c,f=r.toString(),p=o.options.maxConcurrency,h=0,d=0,y=function(p){var y=o._spawnWorker(f,t);if(!y){if(!o.options.allowSynchronous)throw new Error("Workers do not exist and synchronous operation not allowed!");return i(n.Promise.all(e.map(function(e){return new n.Promise(function(n,t){try{n(r(e))}catch(o){t(o)}})}))),{value:void 0}}var w=function(){if(c&&(y=l.recycle(y)),y)if(a>h){var r=h++,n=new v(y,e[r]);n.thenSynchronous(function(e){u[r]=e,w()},function(e){c||(c=e,s(e),y=l.recycle(y))}).thenThis(function(){if(d++,d>a)throw Error("Resolved count exceeds data length.");d===a&&i(u)}).finallyThis(function(){return n.dispose()})}else y=l.recycle(y)};w()},w=0;!c&&h<Math.min(a,p);w++){var m=y(w);if("object"==typeof m)return m.value}})):n.ArrayPromise.fulfilled(e&&[])},Object.defineProperty(e,"isSupported",{get:function(){return h},enumerable:!0,configurable:!0}),e.options=function(r){return new e(r)},e.require=function(){for(var r=[],n=0;n<arguments.length;n++)r[n-0]=arguments[n];return(new e).requireThese(r)},e.requireThese=function(r){return(new e).requireThese(r)},e.startNew=function(r,n,t){return(new e).startNew(r,n,t)},e.map=function(r,n,t){return(new e).map(r,n,t)},e}();r.Parallel=y,Object.defineProperty(r,"__esModule",{value:!0}),r["default"]=y});
//# sourceMappingURL=Parallel.js.map
