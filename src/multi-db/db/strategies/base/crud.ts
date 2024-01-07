export class NotImplementedException extends Error {
    constructor() {
        super("Exception not implemented")
    }
}

export class Crud {
    create(item: unknown){
        throw new NotImplementedException()
    }

    read(query: unknown){
        throw new NotImplementedException()
    }

    update(id: number, item: unknown) {
        throw new NotImplementedException()
    }

    delete(id: number) {
        throw new NotImplementedException()
    }
}