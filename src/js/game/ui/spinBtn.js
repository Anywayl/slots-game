import AbstractButton from "./abstractBtn";
import * as PIXI from 'pixi.js'

export const STATE = {
    SPIN: 0,
    STOP: 1
}

export class SpinBtn extends AbstractButton {
    constructor() {
        super();
        this._init();
        this.state = STATE.SPIN;
        this.view;
    }

    _changeState() {
        this.state = this.state === STATE.SPIN ? STATE.STOP : STATE.SPIN;
        this.text.text = this.state === STATE.SPIN ? 'SPIN' : 'STOP';
    }

    _init() {
        const view = this.view = new PIXI.Graphics();
        view.beginFill(0x387c44);
        view.drawRoundedRect(0, 0, 150, 80, 15);
        this.addChild(view);
        view.x -= view.width * 0.5;
        view.y -= view.height * 0.5;
        view.interactive = true;
        view.on('pointerdown', () => {
            this.animateClick();
        });
        view.on('pointerup', () => {
            this.animateRelease();
            this.onDown.emit();
            this._changeState();
        })

        view.on('pointerover', () => {
            view.alpha = 0.5;
        });

        view.on('pointerout', () => {
            view.alpha = 1;
        });

        this.text = new PIXI.Text('SPIN', {
            fontFamily: 'Arial',
            fontSize: 45,
            fill: 0xe8fff0,
            align: 'center',
        });
        this.text.anchor.set(0.5, 0.5)

        this.addChild(this.text);
    }
}