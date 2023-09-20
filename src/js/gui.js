import * as dat from 'dat.gui';
import EventEmitter from './utils/eventEmitter';

export default class GUI {
    constructor() {
        const datGuiData = function () {
            this.chanceToWin = 0.5;
            this.multiplierOnWin = 2;
            this.lineColor = 0x800080;
        }
        const datGuiTools = this.data = new datGuiData();
        const gui = new dat.GUI();
        gui.add(datGuiTools, 'chanceToWin', 0, 1);
        gui.add(datGuiTools, 'multiplierOnWin', 1, 10);
        gui.addColor(datGuiTools, 'lineColor');
    }

    get chanceToWin() {
        return this.data.chanceToWin;
    }

    get multiplierOnWin() {
        return this.data.multiplierOnWin;
    }

    get lineColor() {
        return this.data.lineColor;
    }
}