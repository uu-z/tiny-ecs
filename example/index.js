import ecs from '../index'

const ECS = new ecs()

ECS.S('moveSystem', {
    components: ['position','velocity'],
    checkComponents: true,
    updateEach:(entity)=>{
        console.log(entity)
        entity['position'].x += entity['velocity'].x
        entity['position'].y += entity['velocity'].y
    }
}).S('ForceDamageSystem', {
    components: ['health'],
    checkComponents: true,
    updateEach:(entity)=>{
        entity['health'].hp -= 10
    }
}).S('DeadSystem', {
    components: ['health'],
    checkComponents: true,
    updateEach:(entity)=>{
        if(entity['health'].hp <= 0){
            console.log(entity['name'], 'is dead')
            delete entity['health']
            delete entity['velocity']
        }
    }
})

ECS.E({
    name:'player1',
    health:{
        hp: 50,
    },
    position: {
        x: 0,
        y: 0
    },
    velocity: {
        x: 1,
        y: 1
    }
}).E({
    name: 'player2',
    health:{
        hp: 100
    },
    position: {
        x: 0,
        y: 0
    },
    velocity: {
        x: 100,
        y: 100
    }
})        
   
setInterval(() => {
    ECS.tick()
},1000)
