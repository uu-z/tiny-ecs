import uuid from "node-uuid"

export default class ECS {
	constructor() {
		this._systems = []
		this._entities = {}
	}

	// create entity with components
	E(components) {
		const id = uuid.v1()
		this._entities[id] = components
		return this
	}

	// create system
	S(name, system) {
		if (system) {
			this._systems.push(system)
		}
		return this
	}

	tick() {
		this._systems.forEach(system => {
			let entities = Object.values(this._entities)

			if (system["update"]) {
				system.update(entities)
			}
			if (system["updateEach"]) {
				entities.forEach(entity => {
					if(system["checkComponents"]){
						let check = system["components"].every((e,i,a)=>{
							return entity[e] !== undefined
						})
						if(check){
							system.updateEach(entity)
						}
					}else{
						system.updateEach(entity)
					}
				})
			}
		})
	}
}