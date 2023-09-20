import * as PIXI from 'pixi.js'
import { SpinBtn, STATE } from './spinBtn';
import ScreenUtils from '../../utils/ScreenUtils';
import EventEmitter from '../../utils/eventEmitter';
import Balance from './balance';
import BetPanel from './betPanel/betPanel';
import DataManager from '../dataManager';
import PaytableScreen from './paytableScreen/paytableScreen';
import PaytableBtn from './paytableScreen/paytableBtn';

export default class UI extends PIXI.Container {
    constructor() {
        super()
        this.balance;
        this.betPanel;
        this.spinBtn;
        this.paytableBtn;
        this.paytableScreen;

        this.spinSignal = new EventEmitter();
        this.stopSignal = new EventEmitter();
        this._init();
    }

    updateBalance() {
        this.balance.updateText();
    }

    _init() {
        this._addSpinBtn();
        this._addBalance();
        this._addBetPanel();
        this._addPaytableScreen();
    }

    _addPaytableScreen() {
        const paytableBtn = this.paytableBtn = new PaytableBtn();
        paytableBtn.position.set(ScreenUtils.width * 0.25, ScreenUtils.height * 0.9)
        this.addChild(paytableBtn);

        const paytableScreen = this.paytableScreen = new PaytableScreen();
        this.addChild(paytableScreen);

        paytableBtn.onDown.on(() => {
            paytableScreen.show();
        })
    }

    resize() {
        this.balance.x = ScreenUtils.centerX;
        this.balance.y = ScreenUtils.height * 0.1;
        this.spinBtn.x = ScreenUtils.centerX;
        this.betPanel.y = ScreenUtils.height * 0.9;

        if (ScreenUtils.isPortrait) {
            this.betPanel.x = ScreenUtils.centerX;
            this.paytableBtn.x = ScreenUtils.centerX;
            this.paytableBtn.y = ScreenUtils.height * 0.2;
            this.spinBtn.y = ScreenUtils.height * 0.75;
        } else {
            this.betPanel.x = ScreenUtils.width * 0.75;
            this.paytableBtn.x = ScreenUtils.width * 0.25;
            this.paytableBtn.y = ScreenUtils.height * 0.9;
            this.spinBtn.y = ScreenUtils.height * 0.9;
        }

        this.paytableScreen.resize();
    }

    _addBetPanel() {
        const betPanel = this.betPanel = new BetPanel();
        this.addChild(betPanel);
        betPanel.position.set(ScreenUtils.width * 0.75, ScreenUtils.height * 0.9);
    }

    unlockAllBtns() {
        this.betPanel.unlockBtns();
        this.spinBtn.unlockBtn();
    }

    lockSpinBtn() {
        this.spinBtn.lockBtn();
    }

    _addBalance() {
        const balance = this.balance = new Balance();
        this.addChild(balance);
        balance.position.set(ScreenUtils.centerX, ScreenUtils.height * 0.1);
    }

    _addSpinBtn() {
        const spinBtn = this.spinBtn = new SpinBtn();
        this.addChild(spinBtn)
        spinBtn.position.set(ScreenUtils.centerX, ScreenUtils.height * 0.9);
        spinBtn.onDown.on(() => {
            spinBtn.state === STATE.SPIN ? this.spinSignal.emit() : this.stopSignal.emit();
        });
    }

    lockBetBtns() {
        this.betPanel.lockBtns();
    }
}