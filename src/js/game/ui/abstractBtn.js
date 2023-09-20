import * as PIXI from 'pixi.js'
import EventEmitter from '../../utils/eventEmitter';
import * as TWEEN from '@tweenjs/tween.js'

export default class AbstractButton extends PIXI.Container {
    constructor() {
        super();
        this.view;

        this.isLocked = false;

        this.onDown = new EventEmitter();
        this.onUp = new EventEmitter();
    }

    animateClick() {
        new TWEEN.Tween(this.scale)
            .to({ x: this.scale.x - 0.1, y: this.scale.y - 0.1 }, 20)
            .easing(TWEEN.Easing.Back.InOut)
            .start(); 
    }

    animateRelease() {
        new TWEEN.Tween(this.scale)
        .to({ x: this.scale.x + 0.1, y: this.scale.y + 0.1 }, 20)
        .easing(TWEEN.Easing.Back.InOut)
        .start(); 
    }

    lockBtn() {
        this.alpha = 0.25;
        this.isLocked = true;
        this.view.interactive = false;
    }

    unlockBtn() {
        this.alpha = 1;
        this.isLocked = false;
        this.view.interactive = true;
    }

    _init() {

    }
}