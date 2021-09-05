import * as THREE from 'three'
import Experience from './Experience.js'

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
            if(_child instanceof THREE.Mesh ){
                _child.material = this.room.material
            }
        } )

      
        /**
         * * Emission lights
         */
        this.room.speakerLight = this.room.model.children.find(child => child.name === 'speakerLight')
        this.room.speakerLight.material = new THREE.MeshBasicMaterial( { color : '#F5EE15' } )

        this.room.dogLampLight = this.room.model.children.find(child => child.name === 'dogLampLight')
        this.room.dogLampLight.material = new THREE.MeshBasicMaterial( { color : '#FBC597' } )

        this.room.frontDeskLight = this.room.model.children.find(child => child.name === 'frontDeskLight')
        this.room.frontDeskLight.material = new THREE.MeshBasicMaterial( { color : '#3969E3' } ) 

        this.room.sideTableLightOne = this.room.model.children.find(child => child.name === 'sideTableLightOne')
        this.room.sideTableLightOne.material = new THREE.MeshBasicMaterial( { color : '#E979FF' } )

        this.room.sideTableLightTwo = this.room.model.children.find(child => child.name === 'sideTableLightTwo')
        this.room.sideTableLightTwo.material = new THREE.MeshBasicMaterial( { color : '#37B6FF' } )

        this.room.skateLight = this.room.model.children.find(child => child.name === 'skateLight')
        this.room.skateLight.material = new THREE.MeshBasicMaterial( { color : '#434EFF' } )

        this.room.carLight = this.room.model.children.find(child => child.name === 'carLight')
        this.room.carLight.material = new THREE.MeshBasicMaterial( { color : '#3E5AFB' } )

        this.room.deskLight = this.room.model.children.find(child => child.name === 'deskLight')
        this.room.deskLight.material = new THREE.MeshBasicMaterial( { color : '#FFF6B3' } )

        this.room.lampLight = this.room.model.children.find(child => child.name === 'lampLight')
        this.room.lampLight.material = new THREE.MeshBasicMaterial( { color : '#FFE2B5' } )

        this.room.wrapperLightOne = this.room.model.children.find(child => child.name === 'wrapperLightOne')
        this.room.wrapperLightOne.material = new THREE.MeshBasicMaterial( { color : '#B980C3' } )

        this.room.wrapperLightTwo = this.room.model.children.find(child => child.name === 'wrapperLightTwo')
        this.room.wrapperLightTwo.material = new THREE.MeshBasicMaterial( { color : '#B980C3' } )

   
        this.scene.add(this.room.model);
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