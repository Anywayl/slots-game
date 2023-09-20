export default class ScreenUtils {
    static width;
    static height;
    static centerX;
    static centerY;
    static isPortrait = true;
    static resize() {
        ScreenUtils.width = window.innerWidth;
        ScreenUtils.height = window.innerHeight;

        ScreenUtils.centerX = ScreenUtils.width / 2;
        ScreenUtils.centerY = ScreenUtils.height / 2;

        this.isPortrait = this.width < this.height ? true : false;
    }

}