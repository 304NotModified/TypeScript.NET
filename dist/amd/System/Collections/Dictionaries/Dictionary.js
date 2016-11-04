/*!
 * @author electricessence / https://github.com/electricessence/
 * Original: http://linqjs.codeplex.com/
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
 */
define(["require","exports","../../Compare","../../Types","../../Functions","../Enumeration/EnumeratorBase","../LinkedNodeList","../../Disposable/ObjectPool","./DictionaryBase","../../../extends"],function(e,t,r,n,o,u,i,s,a,l){"use strict";function c(e){return y||(y=new s.ObjectPool(20,function(){return new i.LinkedNodeList},function(e){return e.clear()})),e?void y.add(e):y.take()}function f(e,t){return Object.prototype.hasOwnProperty.call(e,t)}function p(e){return null===e?_:e===v?n.Type.UNDEFINED:n.Type.hasMemberOfType(e,k,n.Type.FUNCTION)?e.getHashCode():typeof e.toString==n.Type.FUNCTION?e.toString():Object.prototype.toString.call(e)}var y,d=l["default"],v=void 0,h=function(){function e(e,t,r,n){this.key=e,this.value=t,this.previous=r,this.next=n}return e}(),_="null",k="getHashCode",g=function(e){function t(t){void 0===t&&(t=o.Functions.Identity),e.call(this),this._keyComparer=t,this._entries=c(),this._buckets={}}return d(t,e),t.prototype._onDispose=function(){e.prototype._onDispose.call(this),this._entries=null,this._buckets=null},t.prototype.getCount=function(){return this._entries&&this._entries.unsafeCount||0},t.prototype._getBucket=function(e,t){if(null===e||e===v||!t&&!this.getCount())return null;var r=this._buckets,n=f(r,e)?r[e]:v;return t&&!n&&(r[e]=n=c()),n||null},t.prototype._getBucketEntry=function(e,t,r){if(null===e||e===v||!this.getCount())return null;var n=this,o=n._keyComparer,u=o(e);return r||(r=n._getBucket(t||p(u))),r&&r.find(function(e){return o(e.key)===u})},t.prototype._getEntry=function(e){var t=this._getBucketEntry(e);return t&&t.value},t.prototype.getValue=function(e){var t=this._getEntry(e);return t?t.value:v},t.prototype._setValueInternal=function(e,t){var n=this,o=n._buckets,u=n._entries,i=n._keyComparer,s=i(e),a=p(s),l=n._getBucket(a),f=l&&n._getBucketEntry(e,a,l);if(f){var y=l;if(t!==v){var d=f.value.value;return f.value.value=t,!r.areEqual(t,d)}var _=y.removeNode(f),k=u.removeNode(f.value);if(_&&!y.count&&(delete o[a],c(y),l=null),_!==k)throw"Entries and buckets are out of sync.";if(_)return!0}else if(t!==v){if(l||(l=n._getBucket(a,!0)),!l)throw new Error('"'+a+'" cannot be added to lookup table.');var g=new h(e,t);return u.addNode(g),l.addNode(new h(e,g)),!0}return!1},t.prototype._clearInternal=function(){var e=this,t=e._buckets;for(var r in t)if(t.hasOwnProperty(r)){var n=t[r];delete t[r],c(n)}return e._entries.clear()},t.prototype.getEnumerator=function(){var e=this;e.throwIfDisposed();var t,r;return new u.EnumeratorBase(function(){e.throwIfDisposed(),t=e._version,r=e._entries.first},function(n){if(r){e.throwIfDisposed(),e.assertVersion(t);var o={key:r.key,value:r.value};return r=r.next||null,n.yieldReturn(o)}return n.yieldBreak()})},t.prototype.getKeys=function(){for(var e=this,t=[],r=e._entries&&e._entries.first;r;)t.push(r.key),r=r.next;return t},t.prototype.getValues=function(){for(var e=this,t=[],r=e._entries&&e._entries.first;r;)t.push(r.value),r=r.next;return t},t}(a["default"]);t.Dictionary=g,Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=g});
//# sourceMappingURL=Dictionary.js.map