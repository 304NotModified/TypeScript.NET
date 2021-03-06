(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var NAME = 'Exception';
    /**
     * Represents errors that occur during application execution.
     */
    var Exception = (function () {
        /**
         * Initializes a new instance of the Exception class with a specified error message and optionally a reference to the inner exception that is the cause of this exception.
         * @param message
         * @param innerException
         * @param beforeSealing This delegate is used to allow actions to occur just before this constructor finishes.  Since some compilers do not allow the use of 'this' before super.
         */
        function Exception(message, innerException, beforeSealing) {
            this.message = message;
            var _ = this;
            this.name = _.getName();
            this.data = {};
            if (innerException)
                _.data['innerException'] = innerException;
            /* Originally intended to use 'get' accessors for properties,
             * But debuggers don't display these readily yet.
             * Object.freeze has to be used carefully, but will prevent overriding values at runtime.
             */
            if (beforeSealing)
                beforeSealing(_);
            // Node has a .stack, let's use it...
            try {
                var stack = eval("new Error()").stack;
                stack = stack
                    && stack
                        .replace(/^Error\n/, '')
                        .replace(/(.|\n)+\s+at new.+/, '')
                    || '';
                this.stack = _.toStringWithoutBrackets() + stack;
            }
            catch (ex) { }
            Object.freeze(_);
        }
        /**
         * A string representation of the error type.
         * The default is 'Error'.
         */
        Exception.prototype.getName = function () { return NAME; };
        /**
         * The string representation of the Exception instance.
         */
        Exception.prototype.toString = function () {
            return "[" + this.toStringWithoutBrackets() + "]";
        };
        Exception.prototype.toStringWithoutBrackets = function () {
            var _ = this;
            var m = _.message;
            return _.name + (m ? (': ' + m) : '');
        };
        /**
         * Clears the data object.
         */
        Exception.prototype.dispose = function () {
            var data = this.data;
            for (var k in data) {
                if (data.hasOwnProperty(k))
                    delete data[k];
            }
        };
        return Exception;
    }());
    exports.Exception = Exception;
    exports.default = Exception;
});
//# sourceMappingURL=Exception.js.map