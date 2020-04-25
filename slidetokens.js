

class SlideToken extends PIXI.Sprite {

    constructor(texture, startState, positions, transitions) {
        super(texture);

        this.interactive = false;
        this.anchor = {x: .5, y:.5}
        this.x = positions[startState].x;
        this.y = positions[startState].y;

        this.positions = positions;
        this.transitions = transitions;

        this.on('pointerdown',this.advance)
        this.state = startState;

        this.steps = global_steps; // steps per animation

        this.target = {x: 0, y:0};
        this.delta = {x: 0, y:0};


        this.tokenMover = () => {
            this.x += this.delta.x;
            this.y += this.delta.y;
            if (Math.abs(this.target.x - this.x) < Math.abs(this.delta.x) ||
                Math.abs(this.target.y - this.y) < Math.abs(this.delta.y)) {
                this.x = this.target.x;
                this.y = this.target.y;
                automa.ticker.remove(this.tokenMover);
            }
        }
    }

    advance(){
        this.set(this.transitions[this.state]);
    }

    set(value){
        this.state = value;
        this.target = this.positions[this.state];
        this.delta.x = ((this.target.x - this.x) / this.steps);
        this.delta.y = ((this.target.y - this.y) / this.steps);

        automa.ticker.add(this.tokenMover);
    }


}