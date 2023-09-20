import * as PIXI from 'pixi.js'

export default class Paytable extends PIXI.Container {
    constructor(paytable) {
        super();

        this._init(paytable)
    }

    _init(paytable) {
        for (let i = 0; i < paytable.length; i++) {
            const collumn = paytable[i];
            for (let j = 0; j < collumn.length; j++) {
                const color = collumn[j] === 0 ? 0xffffff : 0x00a331;
                const slot = new PIXI.Graphics();
                slot.beginFill(color);
                slot.drawCircle(0, 0, 5);
                slot.position.set(15 * i, 15 * j);
                this.addChild(slot);
            }
        }
    }
}