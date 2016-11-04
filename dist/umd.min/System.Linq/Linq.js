/*!
 * @author electricessence / https://github.com/electricessence/
 * Original: http://linqjs.codeplex.com/
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
 */
!function(t){if("object"==typeof module&&"object"==typeof module.exports){var e=t(require,exports);void 0!==e&&(module.exports=e)}else"function"==typeof define&&define.amd&&define(["require","exports","../System/Compare","../System/Collections/Array/Compare","../System/Collections/Array/Utility","../System/Collections/Enumeration/Enumerator","../System/Collections/Enumeration/Enumerator","../System/Collections/Enumeration/EmptyEnumerator","../System/Types","../System/Integer","../System/Functions","../System/Collections/Enumeration/ArrayEnumerator","../System/Collections/Enumeration/EnumeratorBase","../System/Collections/Dictionaries/Dictionary","../System/Collections/Queue","../System/Disposable/dispose","../System/Disposable/DisposableBase","../System/Collections/Enumeration/UnsupportedEnumerableException","../System/Disposable/ObjectDisposedException","../System/Collections/Sorting/KeySortedContext","../System/Exceptions/ArgumentNullException","../System/Exceptions/ArgumentOutOfRangeException","../extends","../System/Collections/Array/Utility","../System/Collections/Enumeration/IndexEnumerator"],t)}(function(t,e){"use strict";function n(){return p.EmptyEnumerator}function r(t,e){if(e){if(!e.moveNext())return E.dispose(e),null;t.enqueue(e)}return e}function o(t,e){void 0===e&&(e=null);var n=new N.KeySortedContext(e,t.keySelector,t.order,t.comparer);return t.parent?o(t.parent,n):n}function i(t){if(t)throw new I.ObjectDisposedException("Enumerable")}var u=t("../System/Compare"),s=t("../System/Collections/Array/Compare"),a=t("../System/Collections/Array/Utility"),c=t("../System/Collections/Enumeration/Enumerator"),f=t("../System/Collections/Enumeration/Enumerator"),p=t("../System/Collections/Enumeration/EmptyEnumerator"),l=t("../System/Types"),y=t("../System/Integer"),d=t("../System/Functions"),h=t("../System/Collections/Enumeration/ArrayEnumerator"),m=t("../System/Collections/Enumeration/EnumeratorBase"),v=t("../System/Collections/Dictionaries/Dictionary"),w=t("../System/Collections/Queue"),E=t("../System/Disposable/dispose"),g=t("../System/Disposable/DisposableBase"),x=t("../System/Collections/Enumeration/UnsupportedEnumerableException"),I=t("../System/Disposable/ObjectDisposedException"),N=t("../System/Collections/Sorting/KeySortedContext"),D=t("../System/Exceptions/ArgumentNullException"),B=t("../System/Exceptions/ArgumentOutOfRangeException"),b=t("../extends"),A=t("../System/Collections/Array/Utility"),R=t("../System/Collections/Enumeration/IndexEnumerator"),O=b["default"],_={},S=void 0,k=null,C=function(t){return 0},F=function(t){function e(){t.apply(this,arguments)}return O(e,t),e.prototype.Greater=function(t,e){return t>e?t:e},e.prototype.Lesser=function(t,e){return t<e?t:e},e}(d.Functions),T=new F;Object.freeze(T);var q=function(t){function e(e,n){t.call(this,n),this._enumeratorFactory=e,this._isEndless=!0}return O(e,t),Object.defineProperty(e.prototype,"isEndless",{get:function(){return this._isEndless},enumerable:!0,configurable:!0}),e.prototype.getEnumerator=function(){return this.throwIfDisposed(),this._enumeratorFactory()},e.prototype._onDispose=function(){t.prototype._onDispose.call(this),this._enumeratorFactory=null},e.prototype.asEnumerable=function(){var t=this;return t.throwIfDisposed(),new e(function(){return t.getEnumerator()})},e.prototype.doAction=function(t,e,n){void 0===n&&(n=this.isEndless);var r=this,o=n||void 0,u=!r.throwIfDisposed();return new M(function(){var n,s=0;return new m.EnumeratorBase(function(){i(u),e&&e(),s=0,n=r.getEnumerator()},function(e){for(i(u);n.moveNext();){var r=t(n.current,s++);if(r===!1||0===r)return e.yieldBreak();if(2!==r)return e.yieldReturn(n.current)}return!1},function(){E.dispose(n)},o)},function(){u=!0},o)},e.prototype.force=function(){this.throwIfDisposed(),this.doAction(C).getEnumerator().moveNext()},e.prototype.skip=function(t){var r=this;return r.throwIfDisposed(),isFinite(t)?(y.Integer.assert(t,"count"),this.doAction(function(e,n){return n<t?2:1})):new e(n)},e.prototype.take=function(t){if(!(t>0))return M.empty();var e=this;if(e.throwIfDisposed(),!isFinite(t))throw new B.ArgumentOutOfRangeException("count",t,"Must be finite.");return y.Integer.assert(t,"count"),e.doAction(function(e,n){return n<t},null,!1)},e.prototype.elementAt=function(t){var e=this.elementAtOrDefault(t,_);if(e===_)throw new B.ArgumentOutOfRangeException("index",t,"is greater than or equal to the number of elements in source");return e},e.prototype.elementAtOrDefault=function(t,e){var n=this;n.throwIfDisposed(),y.Integer.assertZeroOrGreater(t,"index");var r=t;return E.using(this.getEnumerator(),function(t){for(var n=0;t.moveNext();){if(n==r)return t.current;n++}return e})},e.prototype.first=function(){var t=this.firstOrDefault(_);if(t===_)throw new Error("first:The sequence is empty.");return t},e.prototype.firstOrDefault=function(t){var e=this;return e.throwIfDisposed(),E.using(this.getEnumerator(),function(e){return e.moveNext()?e.current:t})},e.prototype.single=function(){var t=this;return t.throwIfDisposed(),E.using(this.getEnumerator(),function(t){if(t.moveNext()){var e=t.current;if(!t.moveNext())return e;throw new Error("single:sequence contains more than one element.")}throw new Error("single:The sequence is empty.")})},e.prototype.singleOrDefault=function(t){var e=this;return e.throwIfDisposed(),E.using(this.getEnumerator(),function(e){if(e.moveNext()){var n=e.current;if(!e.moveNext())return n}return t})},e.prototype.any=function(){var t=this;return t.throwIfDisposed(),E.using(this.getEnumerator(),function(t){return t.moveNext()})},e.prototype.isEmpty=function(){return!this.any()},e.prototype.traverseBreadthFirst=function(t,e){void 0===e&&(e=T.Identity);var n=this,r=!n.throwIfDisposed(),o=n._isEndless;return new M(function(){var u,s,a,c=0;return new m.EnumeratorBase(function(){i(r),u=n.getEnumerator(),c=0,s=[],a=0},function(n){for(i(r);;){if(u.moveNext())return s[a++]=u.current,n.yieldReturn(e(u.current,c));if(!a)return n.yieldBreak();var o=M.from(s).selectMany(t);if(!o.any())return n.yieldBreak();c++,s=[],a=0,u.dispose(),u=o.getEnumerator()}},function(){E.dispose(u),s.length=0},o)},function(){r=!0},o)},e.prototype.traverseDepthFirst=function(t,e){void 0===e&&(e=T.Identity);var n=this,r=!n.throwIfDisposed(),o=n._isEndless;return new M(function(){var u,s,a=[];return new m.EnumeratorBase(function(){i(r),u=n.getEnumerator(),s=0},function(n){for(i(r);;){if(u.moveNext()){var o=e(u.current,s);a[s++]=u;var c=M.fromAny(t(u.current));return u=c?c.getEnumerator():p.EmptyEnumerator,n.yieldReturn(o)}if(0==s)return!1;u.dispose(),u=a[--s],a.length=s}},function(){try{E.dispose(u)}finally{E.dispose.these(a)}},o)},function(){r=!0},o)},e.prototype.flatten=function(){var t=this,e=!t.throwIfDisposed(),n=t._isEndless;return new M(function(){var r,o=null;return new m.EnumeratorBase(function(){i(e),r=t.getEnumerator()},function(t){for(i(e);;){if(o){if(o.moveNext())return t.yieldReturn(o.current);o.dispose(),o=null}if(r.moveNext()){var n=r.current,u=!l.Type.isString(n)&&M.fromAny(n);if(u){o=u.selectMany(T.Identity).flatten().getEnumerator();continue}return t.yieldReturn(n)}return t.yieldBreak()}},function(){E.dispose(r,o)},n)},function(){e=!0},n)},e.prototype.pairwise=function(t){var e=this;if(e.throwIfDisposed(),!t)throw new D.ArgumentNullException("selector");var n=e._isEndless;return new M(function(){var r;return new m.EnumeratorBase(function(){i(!t),r=e.getEnumerator(),r.moveNext()},function(e){i(!t);var n=r.current;return r.moveNext()&&e.yieldReturn(t(n,r.current))},function(){E.dispose(r)},n)},function(){t=k},n)},e.prototype.scan=function(t,e){var n=this;if(n.throwIfDisposed(),!t)throw new D.ArgumentNullException("func");var r=e!==S;return new M(function(){var o,u,s;return new m.EnumeratorBase(function(){i(!t),o=n.getEnumerator(),s=!0},function(n){return i(!t),s?(s=!1,r?n.yieldReturn(u=e):o.moveNext()&&n.yieldReturn(u=o.current)):!!o.moveNext()&&n.yieldReturn(u=t(u,o.current))},function(){E.dispose(o)},n._isEndless)},function(){t=k},n._isEndless)},e.prototype.select=function(t){var e=this;if(e.throwIfDisposed(),!t)throw new D.ArgumentNullException("selector");return new M(function(){var n,r=0;return new m.EnumeratorBase(function(){i(!t),r=0,n=e.getEnumerator()},function(e){return i(!t),n.moveNext()?e.yieldReturn(t(n.current,r++)):e.yieldBreak()},function(){E.dispose(n)},e._isEndless)},function(){t=k},e._isEndless)},e.prototype._selectMany=function(t,e){var n=this;if(n.throwIfDisposed(),!t)throw new D.ArgumentNullException("collectionSelector");var r=n._isEndless;return e||(e=function(t,e){return e}),new M(function(){var o,u,s=0;return new m.EnumeratorBase(function(){i(!t),o=n.getEnumerator(),u=S,s=0},function(n){if(i(!t),u===S&&!o.moveNext())return!1;do{if(!u){var r=t(o.current,s++);if(!r)continue;u=c.from(r)}if(u.moveNext())return n.yieldReturn(e(o.current,u.current));u.dispose(),u=null}while(o.moveNext());return!1},function(){E.dispose(o,u),o=k,u=null},r)},function(){t=k},r)},e.prototype.selectMany=function(t,e){return this._selectMany(t,e)},e.prototype._choose=function(t){var e=this,n=!e.throwIfDisposed(),r=e._isEndless;return new M(function(){var o,u=0;return new m.EnumeratorBase(function(){i(n),u=0,o=e.getEnumerator()},function(e){for(i(n);o.moveNext();){var r=t(o.current,u++);if(null!==r&&r!==S)return e.yieldReturn(r)}return!1},function(){E.dispose(o)},r)},function(){n=!0},r)},e.prototype.choose=function(t){return void 0===t&&(t=T.Identity),this._choose(t)},e.prototype.where=function(t){var e=this,n=!e.throwIfDisposed();return new M(function(){var r,o=0;return new m.EnumeratorBase(function(){i(n),o=0,r=e.getEnumerator()},function(e){for(i(n);r.moveNext();){var u=r.current;if(t(u,o++))return e.yieldReturn(u)}return!1},function(){E.dispose(r)},e._isEndless)},function(){n=!0},e._isEndless)},e.prototype.ofType=function(t){var e;switch(t){case Number:e=l.Type.NUMBER;break;case String:e=l.Type.STRING;break;case Boolean:e=l.Type.BOOLEAN;break;case Function:e=l.Type.FUNCTION;break;default:return this.where(function(e){return e instanceof t})}return this.choose().where(function(t){return typeof t===e})},e.prototype.except=function(t,e){var n=this,r=!n.throwIfDisposed(),o=n._isEndless;return new M(function(){var u,s;return new m.EnumeratorBase(function(){i(r),u=n.getEnumerator(),s=new v.Dictionary(e),t&&c.forEach(t,function(t){s.addByKeyValue(t,!0)})},function(t){for(i(r);u.moveNext();){var e=u.current;if(!s.containsKey(e))return s.addByKeyValue(e,!0),t.yieldReturn(e)}return!1},function(){E.dispose(u),s.clear()},o)},function(){r=!0},o)},e.prototype.distinct=function(t){return this.except(k,t)},e.prototype.distinctUntilChanged=function(t){void 0===t&&(t=T.Identity);var e=this,n=!e.throwIfDisposed(),r=e._isEndless;return new M(function(){var o,s,a=!0;return new m.EnumeratorBase(function(){i(n),o=e.getEnumerator()},function(e){for(i(n);o.moveNext();){var r=t(o.current);if(a)a=!1;else if(u.areEqual(s,r))continue;return s=r,e.yieldReturn(o.current)}return!1},function(){E.dispose(o)},r)},function(){n=!0},r)},e.prototype.defaultIfEmpty=function(t){var e=this,n=!e.throwIfDisposed(),r=e._isEndless;return new M(function(){var o,u;return new m.EnumeratorBase(function(){u=!0,i(n),o=e.getEnumerator()},function(e){return i(n),o.moveNext()?(u=!1,e.yieldReturn(o.current)):!!u&&(u=!1,e.yieldReturn(t))},function(){E.dispose(o)},r)},null,r)},e.prototype.zip=function(t,e){var n=this;return n.throwIfDisposed(),new M(function(){var r,o,i=0;return new m.EnumeratorBase(function(){i=0,r=n.getEnumerator(),o=c.from(t)},function(t){return r.moveNext()&&o.moveNext()&&t.yieldReturn(e(r.current,o.current,i++))},function(){E.dispose(r,o)})})},e.prototype.zipMultiple=function(t,e){var n=this;return n.throwIfDisposed(),t.length?new M(function(){var r,o,i,u=0;return new m.EnumeratorBase(function(){r=new w.Queue(t),u=0,o=n.getEnumerator(),i=k},function(t){if(o.moveNext())for(;;){for(;!i;){if(!r.count)return t.yieldBreak();var n=r.dequeue();n&&(i=c.from(n))}if(i.moveNext())return t.yieldReturn(e(o.current,i.current,u++));i.dispose(),i=k}return t.yieldBreak()},function(){E.dispose(o,r)})}):M.empty()},e.prototype.join=function(t,e,n,r,o){void 0===o&&(o=T.Identity);var i=this;return new M(function(){var u,s,a,c=0;return new m.EnumeratorBase(function(){u=i.getEnumerator(),s=M.from(t).toLookup(n,T.Identity,o)},function(t){for(;;){if(a){var n=a[c++];if(n!==S)return t.yieldReturn(r(u.current,n));a=null,c=0}if(!u.moveNext())return t.yieldBreak();var o=e(u.current);a=s.get(o)}},function(){E.dispose(u),a=null,u=k,s=k})})},e.prototype.groupJoin=function(t,e,n,r,o){void 0===o&&(o=T.Identity);var i=this;return new M(function(){var u,s;return new m.EnumeratorBase(function(){u=i.getEnumerator(),s=M.from(t).toLookup(n,T.Identity,o)},function(t){return u.moveNext()&&t.yieldReturn(r(u.current,s.get(e(u.current))))},function(){E.dispose(u),u=k,s=k})})},e.prototype.merge=function(t){var e=this,n=e._isEndless;return t&&0!=t.length?new M(function(){var r,o;return new m.EnumeratorBase(function(){r=e.getEnumerator(),o=new w.Queue(t)},function(t){for(;;){for(;!r&&o.count;)r=c.from(o.dequeue());if(r&&r.moveNext())return t.yieldReturn(r.current);{if(!r)return t.yieldBreak();r.dispose(),r=k}}},function(){E.dispose(r,o)},n)},null,n):e},e.prototype.concat=function(){for(var t=[],e=0;e<arguments.length;e++)t[e-0]=arguments[e];return this.merge(t)},e.prototype.union=function(t,e){void 0===e&&(e=T.Identity);var n=this,r=n._isEndless;return new M(function(){var o,i,u;return new m.EnumeratorBase(function(){o=n.getEnumerator(),u=new v.Dictionary(e)},function(e){var n;if(i===S){for(;o.moveNext();)if(n=o.current,!u.containsKey(n))return u.addByKeyValue(n,null),e.yieldReturn(n);i=c.from(t)}for(;i.moveNext();)if(n=i.current,!u.containsKey(n))return u.addByKeyValue(n,null),e.yieldReturn(n);return!1},function(){E.dispose(o,i)},r)},null,r)},e.prototype.insertAt=function(t,e){y.Integer.assertZeroOrGreater(t,"index");var n=t,r=this;r.throwIfDisposed();var o=r._isEndless;return new M(function(){var t,i,u=0,s=!1;return new m.EnumeratorBase(function(){u=0,t=r.getEnumerator(),i=c.from(e),s=!1},function(e){return u==n&&(s=!0,i.moveNext())?e.yieldReturn(i.current):t.moveNext()?(u++,e.yieldReturn(t.current)):!s&&i.moveNext()&&e.yieldReturn(i.current)},function(){E.dispose(t,i)},o)},null,o)},e.prototype.alternateMultiple=function(t){var e=this,n=e._isEndless;return new M(function(){var r,o,i,u;return new m.EnumeratorBase(function(){u=new h.ArrayEnumerator(M.toArray(t)),i=e.getEnumerator();var n=i.moveNext();o=n?1:0,n&&(r=i.current)},function(t){switch(o){case 0:return t.yieldBreak();case 2:if(u.moveNext())return t.yieldReturn(u.current);u.reset(),o=1}var e=r,n=i.moveNext();return o=n?2:0,n&&(r=i.current),t.yieldReturn(e)},function(){E.dispose(i,u)},n)},null,n)},e.prototype.alternateSingle=function(t){return this.alternateMultiple(M.make(t))},e.prototype.alternate=function(){for(var t=[],e=0;e<arguments.length;e++)t[e-0]=arguments[e];return this.alternateMultiple(t)},e.prototype.catchError=function(t){var e=this,n=!e.throwIfDisposed();return new M(function(){var r;return new m.EnumeratorBase(function(){try{i(n),r=e.getEnumerator()}catch(t){}},function(e){try{if(i(n),r.moveNext())return e.yieldReturn(r.current)}catch(o){t(o)}return!1},function(){E.dispose(r)})})},e.prototype.finallyAction=function(t){var e=this,n=!e.throwIfDisposed();return new M(function(){var r;return new m.EnumeratorBase(function(){i(n),r=e.getEnumerator()},function(t){return i(n),!!r.moveNext()&&t.yieldReturn(r.current)},function(){try{E.dispose(r)}finally{t()}})})},e.prototype.buffer=function(t){if(t<1||!isFinite(t))throw new Error("Invalid buffer size.");y.Integer.assert(t,"size");var e,n=this,r=n._isEndless;return new M(function(){var o;return new m.EnumeratorBase(function(){o=n.getEnumerator()},function(n){var r=a.initialize(t);for(e=0;e<t&&o.moveNext();)r[e++]=o.current;return r.length=e,!!e&&n.yieldReturn(r)},function(){E.dispose(o)},r)},null,r)},e.prototype.share=function(){var t=this;t.throwIfDisposed();var e;return new M(function(){return e||(e=t.getEnumerator())},function(){E.dispose(e)},t._isEndless)},e}(g.DisposableBase);e.InfiniteEnumerable=q;var M=function(t){function e(e,n,r){t.call(this,e,n),this._isEndless=r}return O(e,t),e.prototype.asEnumerable=function(){var t=this;return t.throwIfDisposed(),new e(function(){return t.getEnumerator()})},e.prototype.skipWhile=function(t){return this.throwIfDisposed(),this.doAction(function(e,n){return t(e,n)?2:1})},e.prototype.takeWhile=function(t){if(this.throwIfDisposed(),!t)throw new D.ArgumentNullException("predicate");return this.doAction(function(e,n){return t(e,n)?1:0},null,null)},e.prototype.takeUntil=function(t,e){if(this.throwIfDisposed(),!t)throw new D.ArgumentNullException("predicate");if(!e)return this.doAction(function(e,n){return t(e,n)?0:1},null,null);var n=!1;return this.doAction(function(e,r){return n?0:(n=t(e,r),1)},function(){n=!1},null)},e.prototype.forEach=function(t,e){void 0===e&&(e=1/0);var n=this;n.throwIfDisposed(),f.throwIfEndless(n.isEndless);return e>0?E.using(n.getEnumerator(),function(r){f.throwIfEndless(!isFinite(e)&&!!r.isEndless);for(var o=0;e>o&&n.throwIfDisposed()&&r.moveNext()&&t(r.current,o++)!==!1;);return o}):0},e.prototype.toArray=function(t){return t?this.where(t).toArray():this.copyTo([])},e.prototype.copyTo=function(t,e,n){if(void 0===e&&(e=0),void 0===n&&(n=1/0),this.throwIfDisposed(),!t)throw new D.ArgumentNullException("target");return y.Integer.assertZeroOrGreater(e),c.forEach(this,function(n,r){t[r+e]=n},n),t},e.prototype.toLookup=function(t,e,n){void 0===e&&(e=T.Identity),void 0===n&&(n=T.Identity);var r=new v.Dictionary(n);return this.forEach(function(n,o){var i=t(n,o),u=e(n,o),s=r.getValue(i);s!==S?s.push(u):r.addByKeyValue(i,[u])}),new L(r)},e.prototype.toMap=function(t,e){var n={};return this.forEach(function(r,o){n[t(r,o)]=e(r,o)}),n},e.prototype.toDictionary=function(t,e,n){void 0===n&&(n=T.Identity);var r=new v.Dictionary(n);return this.forEach(function(n,o){return r.addByKeyValue(t(n,o),e(n,o))}),r},e.prototype.toJoinedString=function(t,e){return void 0===t&&(t=""),void 0===e&&(e=T.Identity),this.select(e).toArray().join(t)},e.prototype.takeExceptLast=function(t){void 0===t&&(t=1);var n=this;if(!(t>0))return n;if(!isFinite(t))return e.empty();y.Integer.assert(t,"count");var r=t;return new e(function(){var t,e;return new m.EnumeratorBase(function(){t=n.getEnumerator(),e=new w.Queue},function(n){for(;t.moveNext();)if(e.enqueue(t.current),e.count>r)return n.yieldReturn(e.dequeue());return!1},function(){E.dispose(t,e)})})},e.prototype.skipToLast=function(t){if(!(t>0))return e.empty();var n=this;return isFinite(t)?(y.Integer.assert(t,"count"),n.reverse().take(t).reverse()):n},e.prototype.select=function(e){return t.prototype.select.call(this,e)},e.prototype.selectMany=function(t,e){return this._selectMany(t,e)},e.prototype.choose=function(t){return void 0===t&&(t=T.Identity),this._choose(t)},e.prototype.reverse=function(){var t=this,n=!t.throwIfDisposed();return f.throwIfEndless(t._isEndless),new e(function(){var e,r=0;return new m.EnumeratorBase(function(){i(n),t.throwIfDisposed(),e=t.toArray(),r=e.length},function(t){return!!r&&t.yieldReturn(e[--r])},function(){e.length=0})},function(){n=!0})},e.prototype.shuffle=function(){var t=this,n=!t.throwIfDisposed();return f.throwIfEndless(t._isEndless),new e(function(){var e,r,o;return new m.EnumeratorBase(function(){i(n),e=t.toArray(),r=o=e.length},function(t){if(!o)return t.yieldBreak();var n=y.Integer.random(o),r=e[n];return e[n]=e[--o],e[o]=k,o%32==0&&(e.length=o),t.yieldReturn(r)},function(){e.length=0})},function(){n=!0})},e.prototype.count=function(t){var e=0;return this.forEach(t?function(n,r){t(n,r)&&++e}:function(){++e}),e},e.prototype.all=function(t){if(!t)throw new D.ArgumentNullException("predicate");var e=!0;return this.forEach(function(n,r){if(!t(n,r))return e=!1,!1}),e},e.prototype.every=function(t){return this.all(t)},e.prototype.any=function(e){if(!e)return t.prototype.any.call(this);var n=!1;return this.forEach(function(t,r){return n=e(t,r),!n}),n},e.prototype.some=function(t){return this.any(t)},e.prototype.contains=function(t,e){return e?this.any(function(n){return e(n)===e(t)}):this.any(function(e){return e===t})},e.prototype.indexOf=function(t,e){var n=-1;return this.forEach(e?function(r,o){if(u.areEqual(e(r,o),e(t,o),!0))return n=o,!1}:function(e,r){if(u.areEqual(e,t,!0))return n=r,!1}),n},e.prototype.lastIndexOf=function(t,e){var n=-1;return this.forEach(e?function(r,o){u.areEqual(e(r,o),e(t,o),!0)&&(n=o)}:function(e,r){u.areEqual(e,t,!0)&&(n=r)}),n},e.prototype.intersect=function(t,n){var r=this;if(r.throwIfDisposed(),!t)throw new D.ArgumentNullException("second");var o=r.isEndless;return new e(function(){var e,u,s;return new m.EnumeratorBase(function(){i(!t),e=r.getEnumerator(),u=new v.Dictionary(n),s=new v.Dictionary(n),c.forEach(t,function(t){u.addByKeyValue(t,!0)})},function(t){for(;e.moveNext();){var n=e.current;if(!s.containsKey(n)&&u.containsKey(n))return s.addByKeyValue(n,!0),t.yieldReturn(n)}return t.yieldBreak()},function(){E.dispose(e,u,s)},o)},function(){t=k},o)},e.prototype.sequenceEqual=function(t,e){return void 0===e&&(e=u.areEqual),this.throwIfDisposed(),E.using(this.getEnumerator(),function(n){return E.using(c.from(t),function(t){for(f.throwIfEndless(n.isEndless&&t.isEndless);n.moveNext();)if(!t.moveNext()||!e(n.current,t.current))return!1;return!t.moveNext()})})},e.prototype.ofType=function(e){return this.throwIfDisposed(),t.prototype.ofType.call(this,e)},e.prototype.orderBy=function(t){return void 0===t&&(t=T.Identity),this.throwIfDisposed(),new z(this,t,1)},e.prototype.orderUsing=function(t){return this.throwIfDisposed(),new z(this,null,1,null,t)},e.prototype.orderUsingReversed=function(t){return this.throwIfDisposed(),new z(this,null,(-1),null,t)},e.prototype.orderByDescending=function(t){return void 0===t&&(t=T.Identity),this.throwIfDisposed(),new z(this,t,(-1))},e.prototype.buffer=function(e){return t.prototype.buffer.call(this,e)},e.prototype.groupBy=function(t,n,r){var o=this;return n||(n=T.Identity),new e(function(){return o.toLookup(t,n,r).getEnumerator()})},e.prototype.partitionBy=function(t,n,r,o){void 0===r&&(r=function(t,e){return new j(t,e)}),void 0===o&&(o=T.Identity);var u=this;return n||(n=T.Identity),new e(function(){var e,s,a,c,f;return new m.EnumeratorBase(function(){if(i(!n),e=u.getEnumerator(),e.moveNext()){var r=e.current;s=t(r),a=o(s),c=[n(r)],f=1}else c=null},function(u){if(i(!n),!c)return u.yieldBreak();for(var p,l;(p=e.moveNext())&&(l=e.current,a===o(t(l)));)c[f++]=n(l);var y=r(s,c);return p?(l=e.current,s=t(l),a=o(s),c=[n(l)],f=1):c=null,u.yieldReturn(y)},function(){E.dispose(e),c=null})},function(){n=k})},e.prototype.aggregate=function(t,e){return this.scan(t,e).lastOrDefault()},e.prototype.average=function(t){void 0===t&&(t=l.Type.numberOrNaN);var e=0,n=this.sum(function(n,r){return e++,t(n,r)});return isNaN(n)||!e?NaN:n/e},e.prototype.max=function(){return this.aggregate(T.Greater)},e.prototype.min=function(){return this.aggregate(T.Lesser)},e.prototype.maxBy=function(t){return void 0===t&&(t=T.Identity),this.aggregate(function(e,n){return t(e)>t(n)?e:n})},e.prototype.minBy=function(t){return void 0===t&&(t=T.Identity),this.aggregate(function(e,n){return t(e)<t(n)?e:n})},e.prototype.sum=function(t){void 0===t&&(t=l.Type.numberOrNaN);var e=0,n=0;return this.forEach(function(r,o){var i=t(r,o);return isNaN(i)?(e=NaN,!1):void(isFinite(i)?e+=i:n+=i>0?1:-1)}),isNaN(e)?NaN:n?n*(1/0):e},e.prototype.product=function(t){void 0===t&&(t=l.Type.numberOrNaN);var e=1,n=!1;return this.forEach(function(r,o){n=!0;var i=t(r,o);return isNaN(i)?(e=NaN,!1):0==i?(e=0,!1):void(e*=i)}),n&&isNaN(e)?NaN:e},e.prototype.quotient=function(t){void 0===t&&(t=l.Type.numberOrNaN);var e=0,n=NaN;return this.forEach(function(r,o){var i=t(r,o);if(e++,1===e)n=i;else{if(isNaN(i)||0===i||!isFinite(i))return n=NaN,!1;n/=i}}),1===e&&(n=NaN),n},e.prototype.last=function(){var t=this;t.throwIfDisposed();var e=S,n=!1;if(t.forEach(function(t){n=!0,e=t}),!n)throw new Error("last:No element satisfies the condition.");return e},e.prototype.lastOrDefault=function(t){var e=this;e.throwIfDisposed();var n=S,r=!1;return e.forEach(function(t){r=!0,n=t}),r?n:t},e.prototype.memoize=function(){var t,n,r=this,o=!r.throwIfDisposed();return new e(function(){var e=0;return new m.EnumeratorBase(function(){i(o),n||(n=r.getEnumerator()),t||(t=[]),e=0},function(r){i(o);var u=e++;return u>=t.length?!!n.moveNext()&&r.yieldReturn(t[u]=n.current):r.yieldReturn(t[u])})},function(){o=!0,t&&(t.length=0),t=k,E.dispose(n),n=k})},e}(q);e.Enumerable=M;var K=function(t){function e(e,n){t.call(this,e,n,!1)}return O(e,t),e}(M);e.FiniteEnumerable=K;var M,U=function(t){function e(e){t.call(this,function(){return n.throwIfDisposed(),new h.ArrayEnumerator(function(){return n.throwIfDisposed("The underlying ArrayEnumerable was disposed.","ArrayEnumerator"),n._source})});var n=this;n._disposableObjectName="ArrayEnumerable",n._source=e}return O(e,t),e.prototype._onDispose=function(){t.prototype._onDispose.call(this),this._source=k},Object.defineProperty(e.prototype,"source",{get:function(){return this._source},enumerable:!0,configurable:!0}),e.prototype.toArray=function(){var t=this;return t.throwIfDisposed(),c.toArray(t._source)},e.prototype.asEnumerable=function(){var t=this;return t.throwIfDisposed(),new e(this._source)},e.prototype.forEach=function(t,e){void 0===e&&(e=1/0);var n=this;return n.throwIfDisposed(),c.forEach(n._source,t,e)},e.prototype.any=function(e){var n=this;n.throwIfDisposed();var r=n._source,o=r.length;return!!o&&(!e||t.prototype.any.call(this,e))},e.prototype.count=function(e){var n=this;n.throwIfDisposed();var r=n._source,o=r.length;return o&&(e?t.prototype.count.call(this,e):o)},e.prototype.elementAtOrDefault=function(t,e){var n=this;n.throwIfDisposed(),y.Integer.assertZeroOrGreater(t,"index");var r=n._source;return t<r.length?r[t]:e},e.prototype.last=function(){var e=this;e.throwIfDisposed();var n=e._source,r=n.length;return r?n[r-1]:t.prototype.last.call(this)},e.prototype.lastOrDefault=function(t){var e=this;e.throwIfDisposed();var n=e._source,r=n.length;return r?n[r-1]:t},e.prototype.skip=function(t){var e=this;return e.throwIfDisposed(),t>0?new M(function(){return new h.ArrayEnumerator(function(){return e._source},t)}):e},e.prototype.takeExceptLast=function(t){void 0===t&&(t=1);var e=this;return e.throwIfDisposed(),e.take(e._source.length-t)},e.prototype.skipToLast=function(t){var e=this;if(e.throwIfDisposed(),!(t>0))return M.empty();if(!isFinite(t))return e;var n=e._source?e._source.length:0;return e.skip(n-t)},e.prototype.reverse=function(){var t=this,e=!t.throwIfDisposed();return new M(function(){return t.throwIfDisposed(),new R.IndexEnumerator(function(){var n=t._source;return i(e||!n),{source:n,pointer:n.length-1,length:n.length,step:-1}})},function(){e=!0})},e.prototype.memoize=function(){return this.asEnumerable()},e.prototype.sequenceEqual=function(n,r){return void 0===r&&(r=u.areEqual),l.Type.isArrayLike(n)?s.areEqual(this.source,n,!0,r):n instanceof e?n.sequenceEqual(this.source,r):t.prototype.sequenceEqual.call(this,n,r)},e.prototype.toJoinedString=function(e,n){void 0===e&&(e=""),void 0===n&&(n=T.Identity);var r=this._source;return!n&&Array.isArray(r)?r.join(e):t.prototype.toJoinedString.call(this,e,n)},e}(K),j=function(t){function e(e,n){t.call(this,n),this._groupKey=e}return O(e,t),Object.defineProperty(e.prototype,"key",{get:function(){return this._groupKey},enumerable:!0,configurable:!0}),e}(U),L=function(){function t(t){this._dictionary=t}return Object.defineProperty(t.prototype,"count",{get:function(){return this._dictionary.count},enumerable:!0,configurable:!0}),t.prototype.get=function(t){return this._dictionary.getValue(t)||null},t.prototype.contains=function(t){return this._dictionary.containsKey(t)},t.prototype.getEnumerator=function(){var t,e=this;return new m.EnumeratorBase(function(){t=e._dictionary.getEnumerator()},function(e){if(!t.moveNext())return!1;var n=t.current;return e.yieldReturn(new j(n.key,n.value))},function(){E.dispose(t),t=k})},t}(),z=function(t){function e(e,n,r,o,i){void 0===i&&(i=u.compare),t.call(this,k),this.source=e,this.keySelector=n,this.order=r,this.parent=o,this.comparer=i,f.throwIfEndless(!!e&&!!e.isEndless)}return O(e,t),e.prototype.createOrderedEnumerable=function(t,n){return this.throwIfDisposed(),new e(this.source,t,n,this)},e.prototype.thenBy=function(t){return this.createOrderedEnumerable(t,1)},e.prototype.thenUsing=function(t){return new e(this.source,null,1,this,t)},e.prototype.thenByDescending=function(t){return this.createOrderedEnumerable(t,-1)},e.prototype.thenUsingReversed=function(t){return new e(this.source,null,(-1),this,t)},e.prototype.getEnumerator=function(){var t=this;t.throwIfDisposed();var e,n,r=0;return new m.EnumeratorBase(function(){t.throwIfDisposed(),r=0,e=M.toArray(t.source),n=o(t).generateSortedIndexes(e)},function(o){return t.throwIfDisposed(),r<n.length&&o.yieldReturn(e[n[r++]])},function(){e&&(e.length=0),e=k,n&&(n.length=0),n=k},(!1))},e.prototype._onDispose=function(){var e=this;t.prototype._onDispose.call(this),e.source=k,e.keySelector=k,e.order=k,e.parent=k},e}(K);!function(t){function e(t){var e=o(t);if(!e)throw new x.UnsupportedEnumerableException;return e}function o(e,n){if(l.Type.isObject(e)||l.Type.isString(e)){if(e instanceof t)return e;if(l.Type.isArrayLike(e))return new U(e);if(f.isEnumerable(e))return new t(function(){return e.getEnumerator()},null,e.isEndless)}return n}function u(e){return t.fromAny(e)||t.empty()}function s(e){return e instanceof t?e.toArray():c.toArray(e)}function a(t){return new q(function(){return new m.EnumeratorBase(null,function(e){return i(!t),e.yieldReturn(y.Integer.random.select(t))},(!0))},function(){t.length=0,t=k})}function p(t){var e=t&&t.length;if(!e||!isFinite(e))throw new B.ArgumentOutOfRangeException("length",length);return a(A.copy(t))}function d(){for(var t=[],e=0;e<arguments.length;e++)t[e-0]=arguments[e];if(!t.length)throw new B.ArgumentOutOfRangeException("length",length);return a(t)}function h(t){return new q(function(){var e=0;return new m.EnumeratorBase(function(){e=0},function(n){return i(!t),e>=t.length&&(e=0),n.yieldReturn(t[e++])},(!0))},function(){t.length=0,t=k})}function v(t){var e=t&&t.length;if(!e||!isFinite(e))throw new B.ArgumentOutOfRangeException("length",length);return h(A.copy(t))}function g(){for(var t=[],e=0;e<arguments.length;e++)t[e-0]=arguments[e];if(!t.length)throw new B.ArgumentOutOfRangeException("length",length);return h(t)}function I(){return new K(n)}function N(e,n){return void 0===n&&(n=1/0),n>0?isFinite(n)&&y.Integer.assert(n,"count")?new K(function(){var t=n,r=0;return new m.EnumeratorBase(function(){r=0},function(n){return r++<t&&n.yieldReturn(e)},null,(!1))}):new t(function(){return new m.EnumeratorBase(null,function(t){return t.yieldReturn(e)},(!0))}):t.empty()}function b(t,e){if(!t)throw new D.ArgumentNullException("initializer");return new q(function(){var n;return new m.EnumeratorBase(function(){t&&(n=t())},function(e){return t?e.yieldReturn(n):e.yieldBreak()},function(){n=k,e&&e(n)},(!0))},function(){t=k,e=S})}function R(t){return N(t,1)}function O(t,e,n){if(void 0===n&&(n=1),!isFinite(t))throw new B.ArgumentOutOfRangeException("start",t,"Must be a finite number.");if(!(e>0))return I();if(!n)throw new B.ArgumentOutOfRangeException("step",n,"Must be a valid value");if(!isFinite(n))throw new B.ArgumentOutOfRangeException("step",n,"Must be a finite number.");return y.Integer.assert(e,"count"),new K(function(){var r,o=e,i=0;return new m.EnumeratorBase(function(){i=0,r=t},function(t){var u=i++<o&&t.yieldReturn(r);return u&&i<e&&(r+=n),u},(!1))})}function _(t,e,n){return void 0===n&&(n=1),n=Math.abs(n)*-1,O(t,e,n)}function C(t,e){if(void 0===t&&(t=0),void 0===e&&(e=1),!isFinite(t))throw new B.ArgumentOutOfRangeException("start",t,"Must be a finite number.");
if(!e)throw new B.ArgumentOutOfRangeException("step",e,"Must be a valid value");if(!isFinite(e))throw new B.ArgumentOutOfRangeException("step",e,"Must be a finite number.");return new q(function(){var n;return new m.EnumeratorBase(function(){n=t},function(t){var r=n;return n+=e,t.yieldReturn(r)},(!0))})}function F(t,e){return void 0===t&&(t=0),void 0===e&&(e=1),C(t,-e)}function M(t,e,n){if(void 0===n&&(n=1),isNaN(e)||!isFinite(e))throw new B.ArgumentOutOfRangeException("to",e,"Must be a finite number.");if(n&&!isFinite(n))throw new B.ArgumentOutOfRangeException("step",n,"Must be a finite non-zero number.");return n=Math.abs(n),new K(function(){var r;return new m.EnumeratorBase(function(){r=t},t<e?function(t){var o=r<=e&&t.yieldReturn(r);return o&&(r+=n),o}:function(t){var o=r>=e&&t.yieldReturn(r);return o&&(r-=n),o},(!1))})}function j(t,e,n){if(void 0===n&&(n=""),null===t||t===S)throw new D.ArgumentNullException("input");var r=typeof t;if(r!=l.Type.STRING)throw new Error("Cannot exec RegExp matches of type '"+r+"'.");return e instanceof RegExp&&(n+=e.ignoreCase?"i":"",n+=e.multiline?"m":"",e=e.source),n.indexOf("g")===-1&&(n+="g"),new K(function(){var r;return new m.EnumeratorBase(function(){r=new RegExp(e,n)},function(e){var n=r.exec(t);return null!==n&&e.yieldReturn(n)})})}function L(e,n){if(void 0===n&&(n=1/0),!e)throw new D.ArgumentNullException("factory");return isNaN(n)||n<=0?t.empty():isFinite(n)&&y.Integer.assert(n,"count")?new K(function(){var t=n,r=0;return new m.EnumeratorBase(function(){r=0},function(n){i(!e);var o=r++;return o<t&&n.yieldReturn(e(o))},(!1))},function(){e=k}):new q(function(){var t=0;return new m.EnumeratorBase(function(){t=0},function(n){return i(!e),n.yieldReturn(e(t++))},(!0))},function(){e=k})}function z(t,e,n){if(void 0===n&&(n=!1),!e)throw new D.ArgumentNullException("factory");return new q(function(){var r,o,u=0;return new m.EnumeratorBase(function(){u=0,r=t,o=!n},function(t){i(!e);var n=u++;return o?o=!1:r=e(r,n),t.yieldReturn(r)},(!0))},function(){e=k})}function V(t,e,n){return void 0===n&&(n=1/0),c.forEach(t,e,n)}function G(t,e){return c.map(t,e)}function Q(t){var e=t.takeUntil(function(t){return t==+(1/0)},!0).aggregate(T.Greater);return e===S?NaN:e}function P(t){var e=t.takeUntil(function(t){return t==-(1/0)},!0).aggregate(T.Lesser);return e===S?NaN:e}function J(e){if(!e)throw new D.ArgumentNullException("enumerables");var n=!1;return new t(function(){var t,o,u;return new m.EnumeratorBase(function(){i(n),u=0,t=new w.Queue,o=c.from(e)},function(e){i(n);var u=null;if(o){for(;!u&&o.moveNext();){var s=o.current;u=r(t,s?c.from(s):k)}u||(o=null)}for(;!u&&t.count;)u=r(t,t.dequeue());return u?e.yieldReturn(u.current):e.yieldBreak()},function(){E.dispose.these(t.dump()),E.dispose(o,t),o=null,t=k})},function(){n=!0})}t.from=e,t.fromAny=o,t.fromOrEmpty=u,t.toArray=s,t._choice=a,t.choice=p,t.chooseFrom=d,t.cycle=v,t.cycleThrough=g,t.empty=I,t.repeat=N,t.repeatWithFinalize=b,t.make=R,t.range=O,t.rangeDown=_,t.toInfinity=C,t.toNegativeInfinity=F,t.rangeTo=M,t.matches=j,t.generate=L,t.unfold=z,t.forEach=V,t.map=G,t.max=Q,t.min=P,t.weave=J}(M=e.Enumerable||(e.Enumerable={})),Object.defineProperty(e,"__esModule",{value:!0}),e["default"]=M});
//# sourceMappingURL=Linq.js.map