import DataManager from "./dataManager";

export default class Server {
    constructor() {
        this._init();
    }

    spin() {
        const isWin = Math.random() > window.gui.chanceToWin;
        const randomTable = DataManager.paytables[Math.floor(Math.random() * DataManager.paytables.length)];
        if (isWin) {
            return {table: randomTable, isWin: true};
        } else {
            const result = [...randomTable];
            result[Math.floor(Math.random() * result.length)] = [0, 0, 0];
            return {table: result, isWin: false};
        }
    }

    _init() {

    }
}