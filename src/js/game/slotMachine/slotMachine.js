import * as PIXI from 'pixi.js'
import SlotColumn from './slotColumn';
import DataManager from '../dataManager';
import EventEmitter from '../../utils/eventEmitter';
import * as TWEEN from '@tweenjs/tween.js';
import ScreenUtils from '../../utils/ScreenUtils';

export default class SlotMachine extends PIXI.Container {
    constructor() {
        super()
        this._collumns = [];
        this._winLines = [];
        this.onBalanceUpdate = new EventEmitter();

        this._init();
    }

    resize() {
        this.position.x = ScreenUtils.centerX - this.width / 2;
        this.position.y = ScreenUtils.centerY - this.height / 2;
    }

    update(dt) {
        this._collumns.forEach((item => {
            item.update(dt);
        }))
    }

    _destroyWinLines() {
        for (let i = 0; i < this._winLines.length; i++) {
            this._winLines[i].destroy();
        }
        this._winLines = [];
    }

    spin(result) {
        this._destroyWinLines();
        const randomColor = DataManager.COLOR[Object.keys(DataManager.COLOR)[Object.keys(DataManager.COLOR).length * Math.random() << 0]];
        this._collumns.forEach((item, i) => {
            item.spin(result[i], randomColor);
        })
    }

    stop() {
        let stoppedCollumns = 0;
        this._collumns.forEach((item) => {
            item.stop();
            item.onStop.on(() => {
                item.onStop = null;
                stoppedCollumns++;
                this._checkForBalanceUpdate(stoppedCollumns);
            });
        })
    }

    playWinAnimation() {
        for (let i = 0; i < this._collumns.length - 1; i++) {
            const collumn = this._collumns[i];
            const nextCollumn = this._collumns[i + 1];
            const startPosition = collumn.getWinSlotPosition();
            const endPosition = nextCollumn.getWinSlotPosition();

            const line = new PIXI.Graphics()
            line.lineStyle({ width: 10, color: window.gui.lineColor, cap: PIXI.LINE_CAP.ROUND});
            line.position.x = startPosition.x + DataManager.slotHeight / 2;
            line.position.y = startPosition.y + DataManager.slotHeight / 2;
            line.lineTo(endPosition.x - startPosition.x, endPosition.y - startPosition.y);
            this.addChild(line);
            line.scale.set(0, 0);

            this._winLines.push(line);

            new TWEEN.Tween(line.scale)
            .to({ x: 1, y: 1 }, 75)
            .easing(TWEEN.Easing.Linear.None)
            .delay(75 * i)
            .start(); 
        }
    }

    _checkForBalanceUpdate(stoppedCollumns) {
        if (stoppedCollumns === DataManager.colorsAmount) {
            this.onBalanceUpdate.emit();
        }
    }

    _init() {
        this._createSlotsColumns()
        this._createMask();
    }

    _createMask() {
        const mask = new PIXI.Graphics();
        mask.beginFill(0x000000, 0.4);
        mask.drawRect(0, 0, 540, 320);
        mask.y += 110;
        this.addChild(mask)
        this.mask = mask;
    }

    _createSlotsColumns() {
        for (let i = 0; i < 5; i++) {
            const column = new SlotColumn();
            this.addChild(column);
            column.x = DataManager.slotHeight * i
            column.speed = (i + 1) * 1 + 3;

            this._collumns.push(column);
        }
    }
}