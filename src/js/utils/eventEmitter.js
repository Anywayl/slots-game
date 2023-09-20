export default class EventEmitter {
    constructor() {
        this.cb = [];
    }

    emit() {
        for (let i = 0; i < this.cb.length; i++) {
            this.cb[i]();
        }
    }

    on(cb) {
        this.cb.push(cb);
    }
}