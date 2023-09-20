import * as PIXI from 'pixi.js'
import ScreenUtils from '../../../utils/ScreenUtils';
import DataManager from '../../dataManager';
import Paytable from './paytable';
import CloseBtn from './closeBtn';

export default class PaytableScreen extends PIXI.Container {
    constructor() {
        super();
        this.overlay;
        this.bg;
        this.closeBtn

        this._init();
        this.visible = false;
    }

    _init() {
        this._initOverlay();
        this._initBg();
        this._initPaytables();
        this._initLabel();
        this._initCloseBtn();
    }

    _initCloseBtn() {
        const closeBtn = this.closeBtn = new CloseBtn();
        this.addChild(closeBtn);
        closeBtn.position.set(ScreenUtils.width * 0.95, ScreenUtils.height * 0.05)
        closeBtn.onDown.on(() => {
            this.hide();
        })
    }

    show() {
        this.visible = true;
    }

    hide() {
        this.visible = false;
    }

    resize() {
        this.closeBtn.x = ScreenUtils.width * 0.95;
        this.closeBtn.y = ScreenUtils.height * 0.05;

        this.bg.x = ScreenUtils.centerX - this.bg.width / 2;
        this.bg.y =  ScreenUtils.centerY - this.bg.height / 2;

        this.overlay.width = ScreenUtils.width;
        this.overlay.height = ScreenUtils.height
    }

    _initLabel() {
        const text = new PIXI.Text('PAYTABLES', {
            fontFamily: 'Arial',
            fontSize: 45,
            fill: 0x000000,
            align: 'center',
        });
        text.anchor.set(0.5, 0.5)
        text.position.set(this.bg.width / 2, this.bg.height * 0.12)

        this.bg.addChild(text);
    }

    _initPaytables() {
        let rowCount = 0;
        let collumnCount = 0;
        for (let i = 0; i < DataManager.paytables.length; i++) {
            const paytable = new Paytable(DataManager.paytables[i]);
            this.bg.addChild(paytable)
            paytable.position.set(115 * collumnCount + paytable.width / 2, rowCount * 100 + paytable.height / 2 + 110);
            collumnCount++;
            if (collumnCount > 4) {
                collumnCount = 0;
            }
            if ((i + 1) % 5 === 0 && i !== 0) {
                rowCount++
            }
        }
    }

    _initBg() {
        const bg = this.bg = new PIXI.Graphics();
        bg.beginFill(0xbfbfbf);
        bg.drawRoundedRect(0, 0, 600, 500, 15);
        this.addChild(bg)
        bg.position.set(ScreenUtils.centerX - bg.width / 2, ScreenUtils.centerY - bg.height / 2);
    }

    _initOverlay() {
        const overlay = this.overlay = new PIXI.Graphics();
        overlay.beginFill(0x000000, 0.56);
        overlay.drawRect(0, 0, 10, 10);
        overlay.width = ScreenUtils.width;
        overlay.height = ScreenUtils.height
        this.addChild(overlay)

        overlay.interactive = true;
    }
}