function Snake(){

    //coords memory

    this.x = 0;
    this.y = 0;

    //direction memory

    this.xdir = 1;
    this.ydir = 0;

    //memory for tail

    this.total = 0;
    this.tail = [0];

    //Direction

    this.dir = function(x,y){

        this.xdir = x;
        this.ydir = y;

    }

    //To eat

    this.eat = function(pos){

        let distance = dist(this.x,this.y,pos.x,pos.y);
        

        //check distance between food and head

        if (distance < 1){

            this.total++;
            return true;


        } else {

            return false;

        }

    }

    //death

    this.death = () => {

        for(let i = 0; i < this.tail.length - 1; i++){

            let pos = this.tail[i]
            let distance =dist(this.x,this.y,pos.x,pos.y)

            //checker

            if(distance <= 1 || distance <= 2){

                //alert("A")
                this.total = 0
                this.tail = []
                //window.location.reload(true);
                mode=2;
                deatOn()
                this.x = 0;
                this.y = 0;

            } 
        

        }

}


    //update snake's head

    this.update = function(){

        //loop to create the body of the snake

        for(var i = 0; i< this.tail.length - 1; i++){

            this.tail[i] = this.tail[i+1]

        }
        if (this.total >= 1){

            this.tail[this.total - 1] = createVector(this.x,this.y)

        }
        
        //set snake's actual direction

        this.x = this.x + this.xdir * scl;
        this.y = this.y + this.ydir * scl;

        this.cont = function(e) {

            if(e.keyCode === 80){
        
                this.x = this.x * 0
                this.y = this.y * 0

                console.log('paused')
        
            }
        
        }


        //Constraints for the border

        this.x = constrain(this.x,0,width - scl)
        this.y = constrain(this.y,0,height - scl)

    }

    //paint the snake

    this.show = function(){

        fill(0, 128, 43);

        //draw the tail

        for(let i = 0; i < this.tail.length; i++){

            rect (this.tail[i].x,this.tail[i].y,scl,scl)

        }

        rect(this.x,this.y,scl,scl);

    }

}

//document.write("USERNAME: " + wellcome)
div2.innerHTML = "USERNAME: " + wellcome
