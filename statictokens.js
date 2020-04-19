class StaticToken extends PIXI.Sprite {

    constructor(texture, pos, status, counter, limit) {
        super(texture);

        this.limit = limit;


        this.x = pos.x;
        this.y = pos.y;
        this.counter = counter;
        this.number = status;
        this.interactive = false;
        if (this.number === 0) this.alpha=0;
        this.targetAlpha = 0;
        this.delta = 0;

        this.text = new PIXI.Text(this.number.toString(),{fontFamily : 'Arial',stroke: 'black', strokeThickness:5, fontSize: 32, fontWeight : 'bolder', fill : 0xffffff, align : 'center'});
        this.text.anchor = {x:.5, y:.5};
        //this.text.visible = counter;


        this.addChild(this.text);

        this.on('pointerdown',this.add);

        this.tokenChanger = () => {
            this.alpha += this.delta;
            if (Math.abs(this.targetAlpha - this.alpha) < Math.abs(this.delta)) {
                this.alpha = this.targetAlpha;
                automa.ticker.remove(this.tokenChanger);
            }
        }
    }

    toogle() {
        if (this.number === 0) {
            this.targetAlpha = 0;
            this.delta = -1/global_steps;
        } else {
            this.targetAlpha = 1;
            this.delta = 1/global_steps;
        }
        automa.ticker.add(this.tokenChanger);
    }

    add() {
        if (this.number !== this.limit) {
            this.number += 1;
            if (this.number === 1) this.toogle();
            this.text.text = this.number.toString();
            this.text.visible = (this.number > 0) && this.counter;
        }
    }

    remove() {
        if (this.number > 0) {
            this.number -= 1;
            this.text.text = this.number.toString();
            if (this.number === 0) {
                this.toogle();
                this.text.visible = false;
            }
        }
    }

   set(value) {
        if ( this.number*value===0 && this.number!==value)
        {
            this.number = value;
            this.toogle();
        }
        else this.number = value;
        this.text.visible = (this.number > 0) && this.counter;
        this.text.text=this.number.toString();
    }

}


class WorkerToken extends StaticToken {

    constructor(texture, pos, status) {
        super(texture,pos,status, true, 25);

        this.text.x = 40;
        this.text.y = 95;


        this.tokenChanger = () => {
            this.alpha += this.delta;
            if (Math.abs(this.targetAlpha - this.alpha) < Math.abs(this.delta)) {
                this.alpha = this.targetAlpha;
                automa.ticker.remove(this.tokenChanger);
                this.parent.validateWorkers();
            }
        }
    }
}

class ResourceToken extends StaticToken {

    constructor(texture, pos, status) {
        super(texture,pos,status, true, 25);

        this.text.x = 30;
        this.text.y = 67;



        this.tokenChanger = () => {
            this.alpha += this.delta;
            if (Math.abs(this.targetAlpha - this.alpha) < Math.abs(this.delta)) {
                this.alpha = this.targetAlpha;
                automa.ticker.remove(this.tokenChanger);
                this.parent.validateResources();
            }
        }
    }
}

class ParadoxToken extends StaticToken {

    constructor(texture, pos, status) {
        super(texture,pos,status, true, 25);

        this.counter = false;



        this.tokenChanger = () => {
            this.alpha += this.delta;
            if (Math.abs(this.targetAlpha - this.alpha) < Math.abs(this.delta)) {
                this.alpha = this.targetAlpha;
                automa.ticker.remove(this.tokenChanger);
                this.parent.validateParadoxes();
            }
        }
    }
}

