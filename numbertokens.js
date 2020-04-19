const size_normal=1,
    size_left=2,
    size_right=3;


class State {

    constructor(name, pos){
        this.name = name;
        this.position = pos ;

        this.next=this;
        this.tokens = new Set();
    }

    setNext(followingState){
        this.next=followingState;
    }

    addToken(token){
        this.tokens.add(token);
    }

    removeToken(token){
        this.tokens.delete(token)
    }

    resolve(){
        if (this.tokens.size === 1) {
            let firstToken = this.tokens.values().next().value;
            if (firstToken.size !== size_normal){
                firstToken.resize(size_normal)
            }
        }
        if (this.tokens.size === 2) {
            const it = this.tokens.values();
            let firstToken = it.next().value;
            let secondToken = it.next().value;
            firstToken.resize(size_left);
            secondToken.resize(size_right);
        }
        if (this.tokens.size === 3) {
            const it = this.tokens.values();
            let firstToken = it.next().value;
            let secondToken = it.next().value;
            let thirdToken = it.next().value;
            if (firstToken.name>secondToken.name && firstToken.name>thirdToken.name){
                firstToken.advance();
            }
            else if (secondToken.name>firstToken.name && secondToken.name>thirdToken.name){
                secondToken.advance();
            }
            else {
                thirdToken.advance();
            }
        }
    }

}


class Token extends PIXI.Container {


    constructor(name, texture, startState ) {
        super()
        this.name = name;
        this.image = new PIXI.Sprite(texture);
        this.state = startState;
        this.state.addToken(this);


        this.interactive = false;
        this.image.anchor = {x: .5, y:.5}
        this.x = this.state.position.x;
        this.y = this.state.position.y;

        this.addChild(this.image)

        this.on('pointerdown',this.advance)
        this.state = startState;
        this.steps = global_steps; // steps per animation
        this.size = size_normal;

        this.target = {x: 0, y:0};
        this.delta = {x: 0, y:0};
        this.imgtarget = {x: 0, y:0, scale :1};
        this.imgdelta = {x: 0, y:0, scale :0};


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

        this.tokenResizer = () => {
            this.image.x += this.imgdelta.x;
            this.image.y += this.imgdelta.y;
            this.image.scale.x += this.imgdelta.scale;
            this.image.scale.y += this.imgdelta.scale;
            //console.log("tick");
            if (Math.abs(this.imgtarget.x - this.image.x) < Math.abs(this.imgdelta.x) ||
                Math.abs(this.imgtarget.y - this.image.y) < Math.abs(this.imgdelta.y)) {
                this.image.x = this.imgtarget.x;
                this.image.y = this.imgtarget.y;
                this.image.scale.x = this.imgtarget.scale;
                this.image.scale.y = this.imgtarget.scale;
                automa.ticker.remove(this.tokenResizer);
            }
        }



    }

    resize(size){
        if (size===size_left && this.size!==size_left){
            this.imgtarget.x = -22;
            this.imgtarget.y = -22;
            this.imgtarget.scale = .7;
        }
        else if (size===size_right && this.size!==size_right){
            this.imgtarget.x = 22;
            this.imgtarget.y = 22;
            this.imgtarget.scale = .7;
        }
        else if (size===size_normal && this.size!==size_normal){
            this.imgtarget.x = 0;
            this.imgtarget.y = 0;
            this.imgtarget.scale = 1;
        }

        this.size = size;

        this.imgdelta.x = ((this.imgtarget.x - this.image.x) / this.steps);
        this.imgdelta.y = ((this.imgtarget.y - this.image.y) / this.steps);
        this.imgdelta.scale = ((this.imgtarget.scale - this.image.scale.x) / this.steps);

        automa.ticker.add(this.tokenResizer);

    }

    advance(){
        this.state.removeToken(this);
        this.state.resolve();
        this.state = this.state.next;
        this.state.addToken(this);
        this.state.resolve();
        this.target = this.state.position;
        this.delta.x = ((this.target.x - this.x) / this.steps);
        this.delta.y = ((this.target.y - this.y) / this.steps);

        automa.ticker.add(this.tokenMover);

    }
}