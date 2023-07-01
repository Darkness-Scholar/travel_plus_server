"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function HTTPService({ router, method, path, controller }) {
    if (method === 'get') {
        router.get(path, controller);
    }
}
exports.default = HTTPService;
