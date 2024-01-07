"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Crud = exports.NotImplementedException = void 0;
class NotImplementedException extends Error {
    constructor() {
        super("Exception not implemented");
    }
}
exports.NotImplementedException = NotImplementedException;
class Crud {
    isConnected() {
        throw new NotImplementedException();
    }
    create(item) {
        throw new NotImplementedException();
    }
    read(query) {
        throw new NotImplementedException();
    }
    update(id, item) {
        throw new NotImplementedException();
    }
    delete(id) {
        throw new NotImplementedException();
    }
}
exports.Crud = Crud;
