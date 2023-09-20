import EventEmitter from "../../utils/eventEmitter";
import { shuffle } from "../../utils/utils";
import DataManager from "../dataManager";
import Slot from "./slot";
import * as PIXI from 'pixi.js'

export default class SlotColumn extends PIXI.Container {
    constructor() {
        super()

        this.collumnHeight = DataManager.slotHeight * DataManager.colorsAmount;
        this.speed;
        this.targetSlot;
        this.isStopped = true;
        this._shouldSpin = false;
        this.onStop;

        this._slots = [];

        this._init();
    }

    _init() {
        const colorsSequence = [0, 1, 2, 3, 4];
        shuffle(colorsSequence);
        for (let i = 0; i < DataManager.colorsAmount; i++) {
            const color = Object.values(DataManager.COLOR)[colorsSequence[i]];
            const slot = new Slot(color);
            this.addChild(slot);
            slot.y = i * DataManager.slotHeight;

            this._slots.push(slot);
        }
    }

    _getTargetSymbol(targetSymbol) {
        return this._slots.filter((slot) => slot.color === targetSymbol)[0];
    }

    spin(result, color) {
        this.onStop = new EventEmitter();
        this.isStopped = false;
        this._shouldSpin = true;
        this.targetSlot = color;
        const posIndex = result.findIndex((element) => element === 1);
        this.targetPosition = DataManager.slotHeight * (posIndex + 1);
    }

    stop() {
        this._shouldSpin = false;
    }

    _checkSlotsPosition() {
        for (let i = 0; i < this._slots.length; i++) {
            const slot = this._slots[i];
            if (slot.y >= this.collumnHeight) {
                slot.y = 0;
                const slotToSwap = this._slots.pop();
                this._slots.unshift(slotToSwap);
            }
        }
    }

    getWinSlotPosition() {
        const symbol = this._getTargetSymbol(this.targetSlot);
        const result = {x: this.x, y: symbol.y };
        return result;
    }

    update(dt) {
       if (!this.isStopped) this._checkSlotsPosition();

        if (this._shouldSpin) {
            this._slots.forEach((item) => {
                item.y += this.speed * dt;
            })
        } else if (!this._shouldSpin && this.targetSlot && Math.abs(this._getTargetSymbol(this.targetSlot).y - this.targetPosition) > 3) {
            this._slots.forEach((item) => {
                item.y += this.speed * dt;
            })
        } else {
            this.isStopped = true;
            this.onStop?.emit();
        }
    }

    correctPositions(){
        for (let i = 0; i < this._slots.length; i++){
            const slot = this._slots[i];
            slot.y = i * DataManager.slotHeight;
        }
    }
}