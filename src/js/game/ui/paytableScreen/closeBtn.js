import DataManager from "../../dataManager";
import AbstractButton from "../abstractBtn";
import * as PIXI from 'pixi.js'

export default class CloseBtn extends AbstractButton{
    constructor() {
        super();
        this._init();
        this.view;
    }

    _init() {
        const view = this.view = new PIXI.Graphics();
        view.beginFill(DataManager.betPanelColor);
        view.drawRoundedRect(0, 0, 50, 50, 5);
        this.addChild(view);
        view.interactive = true;
        view.x -= view.width / 2;
        view.y -= view.height / 2;

        view.on('pointerdown', () => {
            this.animateClick();
        });

        view.on('pointerup', () => {
            this.animateRelease();
            this.onDown.emit();
        })

        view.on('pointerover', () => {
            view.alpha = 0.5;
        });

        view.on('pointerout', () => {
            view.alpha = 1;
        });

        this.text = new PIXI.Text('X', {
            fontFamily: 'Arial',
            fontSize: 45,
            fill: 0xe8fff0,
            align: 'center',
        });
        this.text.anchor.set(0.5, 0.5)

        this.addChild(this.text);
    }
}