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
                // this.setDummy()
                this.setRoom()
            }
        })
    }

    // setDummy()
    // {
    //     const cube = new THREE.Mesh(
    //         new THREE.BoxGeometry(1, 1, 1),
    //         new THREE.MeshBasicMaterial({ map: this.resources.items.lennaTexture })
    //     )
    //     this.scene.add(cube)        
    // }

    setRoom()
    {


        this.room = {}
        this.room.model = this.resources.items.roomModel.scene

        // Draco loader
        const dracoLoader = new DRACOLoader()
        dracoLoader.setDecoderPath('draco/')

        // GLTF loader
        const gltfLoader = new GLTFLoader()
        gltfLoader.setDRACOLoader(dracoLoader)

        /**
         * Models
         */
        gltfLoader.load(
            'assets/myRoomWithDraco.glb',
            (gltf)=>{
                gltf.scene.position.set(1,1,1)
                this.scene.add(gltf.scene)

            }
        )

        const directionalLight = new THREE.DirectionalLight('#ffffff', 3)
        directionalLight.position.set(5, 5, 5)
        this.scene.add(directionalLight)
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