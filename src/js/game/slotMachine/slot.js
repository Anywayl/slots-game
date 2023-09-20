import * as PIXI from 'pixi.js'

export default class Slot extends PIXI.Container {
    constructor(color) {
        super()
        this.color = color;
        this._init();
    }

    _initView() {
        const view = new PIXI.Graphics();
        view.beginFill(this.color);
        view.drawRect(0, 0, 100, 100);
        this.addChild(view);
    }

    _init() {
        this._initView();
    }
}