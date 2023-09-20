import * as PIXI from 'pixi.js'
import { numberWithCommas } from '../../../utils/utils';
import DataManager from '../../dataManager';
import BetBtn from './betBtn';

export default class BetPanel extends PIXI.Container {
    constructor() {
        super();
        this.text;
        this._betIncBtn;
        this._betDecrBtn;
        this._init();
    }

    _init() {
        this._initBetBg();
        this._initBetIncreaseBtn();
        this._initBetDecreaseBtn();
        this._updateText();
    }

    _initBetIncreaseBtn() {
        const betIncreaseBtn = this._betIncBtn = new BetBtn();
        this.addChild(betIncreaseBtn);
        betIncreaseBtn.x = 130;
        betIncreaseBtn.onDown.on(() => {
            if (DataManager.currentBet + 100 <= DataManager.money){
                DataManager.currentBet += 100;
                this._updateText();
            }
        });
    }

    _initBetDecreaseBtn() {
        const betDecreaseBtn = this._betDecrBtn = new BetBtn(false);
        this.addChild(betDecreaseBtn);
        betDecreaseBtn.x = -130;
        betDecreaseBtn.onDown.on(() => {
            if (DataManager.currentBet - 100 > 0){
                DataManager.currentBet -= 100;
                this._updateText();
            }
        });
    }

    unlockBtns() {
        this._betIncBtn.unlockBtn();
        this._betDecrBtn.unlockBtn();
    }

    _updateText(){
        this.text.text = numberWithCommas(DataManager.currentBet) + ' $';
    }

    _initBetBg() {
        const bg = new PIXI.Graphics();
        bg.beginFill(DataManager.betPanelColor);
        bg.drawRoundedRect(0, 0, 200, 50, 5);
        this.addChild(bg);
        bg.x -= bg.width / 2;
        bg.y -= bg.height / 2;

        this.text = new PIXI.Text('100', {
            fontFamily: 'Arial',
            fontSize: 24,
            fill: 0xe8fff0,
            align: 'center',
        });
        this.text.anchor.set(0.5)

        this.addChild(this.text);
    }

    lockBtns() {
        this._betIncBtn.lockBtn();
        this._betDecrBtn.lockBtn();
    }
}