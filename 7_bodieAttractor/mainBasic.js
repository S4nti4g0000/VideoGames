const hiAttractive = () => {   
    
    // install plugin
    Matter.use(
        'matter-attractors' // PLUGIN_NAME
    ) 
    // module aliases
    let Engine = Matter.Engine,
        Events = Matter.Events,
        Runner = Matter.Runner,
        Render = Matter.Render,
        World = Matter.World,
        Body = Matter.Body,
        Mouse = Matter.Mouse,
        Common = Matter.Common,
        Bodies = Matter.Bodies

    // create engine
    let engine = Engine.create()

    // create renderer
    let render = Render.create({
        element: document.body,
        engine: engine,
        options: {
            width: Math.min(document.documentElement.clientWidth, 1024),
            height: Math.min(document.documentElement.clientHeight, 1024),
            wireframes: false
        }
    })

    // create runner
    let runner = Runner.create()

    Runner.run(runner,engine)
    Render.run(render)

    // create demo scene
    let world = engine.world
    world.gravity.scale = 0

    // create a body with an attractor
    let attractiveBody = Bodies.circle(
        render.options.width / 4,
        render.options.height / 4,
        50, 
        {
            isStatic: true,
            // example of an attractor function that 
            // returns a force vector that applies to bodyB
            plugin:{
                attractors:[
                    function(bodyA, bodyB){
                        return{
                            x:(bodyA.position.x - bodyB.position.x) * 1e-6,
                            y:(bodyA.position.y - bodyB.position.y) * 1e-6,
                        }
                    }
                ]
            }
        }
    )

    World.add(world, [attractiveBody])

    // add some bodies that to be attracted
    for(let i = 0; i < 150; i += 1){
        let body = Bodies.polygon(
            Common.random(0,render.options.width), 
            Common.random(0,render.options.height),
            Common.random(1, 5),
            Common.random() > 0.9 ? Common.random(15, 25) : Common.random(5, 10),
            {
                mass: Common.random(1,3),
                frictionAir: 0,
            }
        )
        World.add(world, body)
    }

    // add mouse control
    let mouse = Mouse.create(render.canvas)

    Events.on(engine, 'afterUpdate',()=>{
        if(!mouse.position.x){
            return
        }
        
        // smoothly move the attractor body towards the mouse
        Body.translate(attractiveBody,{
            x:(mouse.position.x - attractiveBody.position.x) * 0.25,
            y:(mouse.position.y - attractiveBody.position.y) * 0.25
        })
    })

    //smoothly move the attractor body towards the mouse
    Body.translate(attractiveBody)
    
    // return a context for MatterDemo to control
    return {
        engine:engine,
        runner:runner,
        render:render,
        canvas:render.canvas,
        stop:()=>{
            Matter.Render.stop(render)
            Matter.Runner.stop(runner)
        }
    }
}




