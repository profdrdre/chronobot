class Counter extends PIXI.Container {

    constructor(pos, start, limit) {
        super();

        this.limit = limit;
        this.x = pos.x;
        this.y = pos.y;

        this.number = start;

        this.text = new PIXI.Text(this.number.toString(),{fontFamily : 'Arial',stroke: 'white', fontSize: 42, fontWeight : 'bold', fill : 0x433656, align : 'center'});
        this.text.anchor = {x:1, y:.5};
        this.text.position = {x:0, y:0};
        this.addChild(this.text);
    }


    increase(value) {
        if ((this.number + value) <= this.limit) {
            this.number += value;
            this.text.text = this.number.toString();
        }
    }

    decrease(value) {
        if (this.number >= value) {
            this.number -= value;
        }
    }
}

