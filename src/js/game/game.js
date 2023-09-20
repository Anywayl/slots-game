import * as PIXI from 'pixi.js'
import SlotMachine from './slotMachine/slotMachine';
import ScreenUtils from '../utils/ScreenUtils';
import UI from './ui/ui';
import * as TWEEN from '@tweenjs/tween.js'
import DataManager from './dataManager';
import Server from './server';

export default class Game extends PIXI.Container {
    constructor() {
        super();
        this.slotMachine;
        this.ui;
        this._init();
    }

    resize() {
        this.slotMachine.resize();
        this.ui.resize();
    }

    _init() {
        const server = new Server();

        const slotMachine = this.slotMachine = new SlotMachine();
        this.addChild(slotMachine);
        slotMachine.position.set(ScreenUtils.centerX - slotMachine.width / 2, ScreenUtils.centerY - slotMachine.height / 2);

        const ui = this.ui = new UI();
        this.addChild(ui);

        let isWin = false;

        ui.spinSignal.on(() => {
            const result = server.spin();
            slotMachine.spin(result.table);
            DataManager.money -= DataManager.currentBet;
            ui.updateBalance();
            isWin = result.isWin;
            ui.lockBetBtns();
        });

        slotMachine.onBalanceUpdate.on(() => {
            if (isWin) {
                DataManager.money += DataManager.currentBet * window.gui.multiplierOnWin;
                ui.updateBalance();
                slotMachine.playWinAnimation();
            }

            ui.unlockAllBtns();
        })

        ui.stopSignal.on(() => {
            ui.lockSpinBtn();
            slotMachine.stop();
        });
    }

    update(dt) {
        TWEEN.update()
        this.slotMachine.update(dt);
    }
}