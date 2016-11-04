/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
 */
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", "../../Types", "../../Disposable/DisposableBase", "../../Disposable/ObjectPool", "./IteratorResult", "../../../extends"], factory);
    }
})(function (require, exports) {
    "use strict";
    var Types_1 = require("../../Types");
    var DisposableBase_1 = require("../../Disposable/DisposableBase");
    var ObjectPool_1 = require("../../Disposable/ObjectPool");
    var IteratorResult_1 = require("./IteratorResult");
    var extends_1 = require("../../../extends");
    var __extends = extends_1.default;
    var VOID0 = void 0;
    var yielderPool;
    function yielder(recycle) {
        if (!yielderPool)
            yielderPool
                = new ObjectPool_1.ObjectPool(40, function () { return new Yielder(); }, function (y) { return y.yieldBreak(); });
        if (!recycle)
            return yielderPool.take();
        yielderPool.add(recycle);
    }
    var Yielder = (function () {
        function Yielder() {
            this._current = VOID0;
            this._index = NaN;
        }
        Object.defineProperty(Yielder.prototype, "current", {
            get: function () { return this._current; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Yielder.prototype, "index", {
            get: function () { return this._index; },
            enumerable: true,
            configurable: true
        });
        Yielder.prototype.yieldReturn = function (value) {
            this._current = value;
            if (isNaN(this._index))
                this._index = 0;
            else
                this._index++;
            return true;
        };
        Yielder.prototype.yieldBreak = function () {
            this._current = VOID0;
            this._index = NaN;
            return false;
        };
        Yielder.prototype.dispose = function () {
            this.yieldBreak();
        };
        return Yielder;
    }());
    var EnumeratorState;
    (function (EnumeratorState) {
        EnumeratorState[EnumeratorState["Before"] = 0] = "Before";
        EnumeratorState[EnumeratorState["Running"] = 1] = "Running";
        EnumeratorState[EnumeratorState["Completed"] = 2] = "Completed";
        EnumeratorState[EnumeratorState["Faulted"] = 3] = "Faulted";
        EnumeratorState[EnumeratorState["Interrupted"] = 4] = "Interrupted";
        EnumeratorState[EnumeratorState["Disposed"] = 5] = "Disposed";
    })(EnumeratorState || (EnumeratorState = {}));
    var EnumeratorBase = (function (_super) {
        __extends(EnumeratorBase, _super);
        function EnumeratorBase(_initializer, _tryGetNext, disposer, isEndless) {
            _super.call(this);
            this._initializer = _initializer;
            this._tryGetNext = _tryGetNext;
            this.reset();
            if (Types_1.Type.isBoolean(isEndless))
                this._isEndless = isEndless;
            else if (Types_1.Type.isBoolean(disposer))
                this._isEndless = disposer;
            if (Types_1.Type.isFunction(disposer))
                this._disposer = disposer;
        }
        Object.defineProperty(EnumeratorBase.prototype, "current", {
            get: function () {
                var y = this._yielder;
                return y && y.current;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EnumeratorBase.prototype, "index", {
            get: function () {
                var y = this._yielder;
                return y && y.index;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EnumeratorBase.prototype, "isEndless", {
            get: function () {
                return this._isEndless;
            },
            enumerable: true,
            configurable: true
        });
        EnumeratorBase.prototype.reset = function () {
            var _ = this;
            _.throwIfDisposed();
            var y = _._yielder;
            _._yielder = null;
            _._state = EnumeratorState.Before;
            if (y)
                yielder(y);
        };
        EnumeratorBase.prototype._assertBadState = function () {
            var _ = this;
            switch (_._state) {
                case EnumeratorState.Faulted:
                    _.throwIfDisposed("This enumerator caused a fault and was disposed.");
                    break;
                case EnumeratorState.Disposed:
                    _.throwIfDisposed("This enumerator was manually disposed.");
                    break;
            }
        };
        EnumeratorBase.prototype.moveNext = function () {
            var _ = this;
            _._assertBadState();
            try {
                switch (_._state) {
                    case EnumeratorState.Before:
                        _._yielder = _._yielder || yielder();
                        _._state = EnumeratorState.Running;
                        var initializer = _._initializer;
                        if (initializer)
                            initializer();
                    case EnumeratorState.Running:
                        if (_._tryGetNext(_._yielder)) {
                            return true;
                        }
                        else {
                            this.dispose();
                            _._state = EnumeratorState.Completed;
                            return false;
                        }
                    default:
                        return false;
                }
            }
            catch (e) {
                this.dispose();
                _._state = EnumeratorState.Faulted;
                throw e;
            }
        };
        EnumeratorBase.prototype.nextValue = function () {
            return this.moveNext()
                ? this.current
                : VOID0;
        };
        EnumeratorBase.prototype.next = function () {
            return this.moveNext()
                ? new IteratorResult_1.IteratorResult(this.current, this.index)
                : IteratorResult_1.IteratorResult.Done;
        };
        EnumeratorBase.prototype.end = function () {
            this._ensureDisposeState(EnumeratorState.Interrupted);
        };
        EnumeratorBase.prototype['return'] = function (value) {
            var _ = this;
            _._assertBadState();
            try {
                return value === VOID0 || _._state === EnumeratorState.Completed || _._state === EnumeratorState.Interrupted
                    ? IteratorResult_1.IteratorResult.Done
                    : new IteratorResult_1.IteratorResult(value, VOID0, true);
            }
            finally {
                _.end();
            }
        };
        EnumeratorBase.prototype._ensureDisposeState = function (state) {
            var _ = this;
            if (!_.wasDisposed) {
                _.dispose();
                _._state = state;
            }
        };
        EnumeratorBase.prototype._onDispose = function () {
            var _ = this;
            _._isEndless = false;
            var disposer = _._disposer;
            _._initializer = null;
            _._disposer = null;
            var y = _._yielder;
            _._yielder = null;
            this._state = EnumeratorState.Disposed;
            if (y)
                yielder(y);
            if (disposer)
                disposer();
        };
        return EnumeratorBase;
    }(DisposableBase_1.DisposableBase));
    exports.EnumeratorBase = EnumeratorBase;
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = EnumeratorBase;
});
//# sourceMappingURL=EnumeratorBase.js.map