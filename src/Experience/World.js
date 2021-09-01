import * as THREE from 'three'
import Experience from './Experience.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'


export default class World
{
    constructor(_options)
    {
        this.experience = new Experience()
        this.config = this.experience.config
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        
        this.resources.on('groupEnd', (_group) =>
        {
            if(_group.name === 'base')
            {
                this.setRoom()
            }
        })
    }

    setRoom()
    {

        this.room = {}
        this.room.model = this.resources.items.roomModel.scene
        

        this.room.texture = this.resources.items.bakedOne
        this.room.texture.encoding = THREE.sRGBEncoding

        this.room.texture.flipY = false
        this.room.material = new THREE.MeshBasicMaterial( {map: this.room.texture} )

        this.room.model.traverse( (_child) => {
            if(_child instanceof THREE.Mesh){
                _child.material = this.room.material

            }
        } )

        this.room.speakerLight = this.room.model.children.find(child => child.name === 'speakerLight')
        this.room.speakerLight.material = new THREE.MeshBasicMaterial( { color : '#F5EE15' } )

        this.scene.add(this.room.model);

        // const directionalLight = new THREE.DirectionalLight('#ffffff', 3)
        // directionalLight.position.set(5, 5, 5)
        // this.scene.add(directionalLight)
    }

    resize()
    {
    }

    update()
    {
    }

    destroy()
    {
    }
}