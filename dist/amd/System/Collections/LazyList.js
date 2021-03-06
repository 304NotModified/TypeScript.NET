define(["require","exports","./ReadOnlyCollectionBase","../Exceptions/ArgumentOutOfRangeException","./Enumeration/EnumeratorBase","../../extends","../Integer"],function(t,e,n,r,o,i,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var u=i["default"],a=function(t){function e(e){var n=t.call(this)||this;return n._enumerator=e.getEnumerator(),n._cached=[],n}return u(e,t),e.prototype._onDispose=function(){t.prototype._onDispose.call(this);var e=this._enumerator;this._enumerator=null,e&&e.dispose();var n=this._cached;this._cached=null,n&&(n.length=0)},e.prototype._getCount=function(){this.finish();var t=this._cached;return t?t.length:0},e.prototype._getEnumerator=function(){var t,e=this;return new o.EnumeratorBase(function(){t=0},function(n){e.throwIfDisposed();var r=e._cached;return t<r.length||e.getNext()?n.yieldReturn(r[t++]):n.yieldBreak()})},e.prototype.get=function(t){this.throwIfDisposed(),s.Integer.assertZeroOrGreater(t);for(var e=this._cached;e.length<=t&&this.getNext(););if(t<e.length)return e[t];throw new r.ArgumentOutOfRangeException("index","Greater than total count.")},e.prototype.indexOf=function(t){this.throwIfDisposed();for(var e=this._cached,n=e.indexOf(t);n==-1&&this.getNext(function(r){r==t&&(n=e.length-1)}););return n},e.prototype.contains=function(t){return this.indexOf(t)!=-1},e.prototype.getNext=function(t){var e=this._enumerator;if(!e)return!1;if(e.moveNext()){var n=e.current;return this._cached.push(n),t&&t(n),!0}return e.dispose(),this._enumerator=null,!1},e.prototype.finish=function(){for(;this.getNext(););},e}(n.ReadOnlyCollectionBase);e.LazyList=a});
//# sourceMappingURL=LazyList.js.map