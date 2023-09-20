import * as PIXI from 'pixi.js'
import { numberWithCommas } from '../../utils/utils';
import DataManager from '../dataManager';

export default class Balance extends PIXI.Container {
    constructor() {
        super();

        this.text;

        this._init();
    }

    updateText() {
        this.text.text = numberWithCommas(DataManager.money) + ' $';
    }

    _init() {
        this._initBg();
        this._initText();
        this.updateText();
    }

    _initBg() {
        const bg = new PIXI.Graphics();
        bg.beginFill(0x0a0d0b);
        bg.drawRoundedRect(0, 0, 350, 50, 5);
        this.addChild(bg);
        bg.x -= bg.width / 2;
        bg.y -= bg.height / 2;
    }

    _initText() {
        this.text = new PIXI.Text('111111111111', {
            fontFamily: 'Arial',
            fontSize: 24,
            fill: 0xe8fff0,
            align: 'center',
        });
        this.text.anchor.set(0.5, 0.5)

        this.addChild(this.text);
    }
}