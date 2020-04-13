class WorkerToken extends PIXI.Sprite {

    constructor(texture, pos, status) {
        super(texture);
        this.x = pos.x;
        this.y = pos.y;
        this.visibility = status;
        this.interactive = true;
        this.targetAlpha = 1;
        this.delta = 0;

        this.on('pointerdown',this.toogle);

        this.workerChanger = () => {
            this.alpha += this.delta;
            if (Math.abs(this.targetAlpha - this.alpha) < Math.abs(this.delta)) {
                this.alpha = this.targetAlpha;
                automa.ticker.remove(this.workerChanger);
            }
        }
    }

    toogle() {
        if (this.visibility === true) {
            this.visibility = false
            this.targetAlpha = 0;
            this.delta = -1/global_steps;
        } else {
            this.visibility = true;
            this.targetAlpha = 1;
            this.delta = 1/global_steps;
        }
        automa.ticker.add(this.workerChanger);
    }



}