class Counter extends PIXI.Container {

    constructor(pos, start, limit) {
        super();

        this.rectangle = new PIXI.Graphics().beginFill(0xFF0000)
            .drawRect(-70,-22,70,44)
            .endFill();

        this.addChild(this.rectangle);
        this.mask = this.rectangle;

        this.limit = limit;
        this.x = pos.x;
        this.y = pos.y;

        this.number = start;

        this.text = new PIXI.Text(this.number.toString(),{fontFamily : 'Arial',stroke: 'white', fontSize: 42, fontWeight : 'bold', fill : 0x433656, align : 'center'});
        this.text.anchor = {x:1, y:.5};
        this.text.position = {x:0, y:0};
        this.addChild(this.text);

        this.row = [];
        this.steps = global_steps;
        this.target = 0;

        this.tokenMover = () => {
            this.row.forEach( number => number.y += this.delta);
            if (Math.abs( this.row[this.row.length-1].y) < Math.abs(this.delta)) {
                this.text = this.row.pop();
                this.row.forEach(number => this.removeChild(number));
                automa.ticker.remove(this.tokenMover);
            }
        }


    }


    increase(value) {
        if ((this.number + value) >= this.limit) value = this.limit - this.number;

        this.row = [this.text];
        for (let i = 1; i <= value; i++ ){
            const rotText = new PIXI.Text((this.number + i).toString(),{fontFamily : 'Arial',stroke: 'white', fontSize: 42, fontWeight : 'bold', fill : 0x433656, align : 'center'});
            rotText.anchor = {x:1, y:.5};
            rotText.position = {x:0, y:i * -37};
            this.addChild(rotText);
            this.row.push(rotText);
        }

        this.steps = global_steps * value / 3;
        this.delta = (37* value / this.steps);
        automa.ticker.add(this.tokenMover);

        this.number += value;
    }

    decrease(value) {
        if ((this.number - value) < 0 ) value = this.number;

        this.row = [this.text];
        for (let i = 1; i <= value; i++ ){
            const rotText = new PIXI.Text((this.number - i).toString(),{fontFamily : 'Arial',stroke: 'white', fontSize: 42, fontWeight : 'bold', fill : 0x433656, align : 'center'});
            rotText.anchor = {x:1, y:.5};
            rotText.position = {x:0, y:i * 37};
            this.addChild(rotText);
            this.row.push(rotText);
        }
        this.steps = global_steps * value / 3;
        this.delta = (-37*value / this.steps);
        automa.ticker.add(this.tokenMover);

        this.number -= value;
    }

    set(value) {
        if (this.limit >= value) {
            this.number = value;
        }
        this.text.text = Math.floor(this.number).toString();
    }
}

