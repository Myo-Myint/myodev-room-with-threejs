import * as THREE from 'three'
import Experience from './Experience'

export default class Navigation
{
    constructor()
    {
        this.experience = new Experience()
        this.camera = this.experience.camera
        this.config = this.experience.config
        this.time = this.experience.time

        this.setView()
    }

    setView()
    {
        this.view = {}

        this.view.spherical = {}
        this.view.spherical.value = new THREE.Spherical(25, Math.PI * 0.35,  Math.PI * 0.25)
        this.view.spherical.smoothed = this.view.spherical.value.clone()
        this.view.spherical.smoothing = 0.005

        this.view.target = new THREE.Vector3(0, 1.8, 0)

        this.view.drag = {}
        this.view.drag.delta = {}
        this.view.drag.delta.x = 0
        this.view.drag.delta.y = 0
        this.view.drag.previousDelta = {}
        this.view.drag.previousDelta.x = 0
        this.view.drag.previousDelta.y = 0
        this.view.drag.sensitivity = 1

        // if(this.config.width <= 1000){
        //     this.view.drag.sensitivity = 1.4
        // }else{
        //     this.view.drag.sensitivity = 1
        // }

        // console.log(this.view.drag.sensitivity);

        /**
         * * Methods
         */
        this.view.down = (_x, _y) =>
        {
            this.view.drag.previousDelta.x = _x
            this.view.drag.previousDelta.y = _y
        } 

        this.view.move = (_x, _y) =>
        {
            this.view.drag.delta.x = _x - this.view.drag.previousDelta.x
            this.view.drag.delta.y = _y - this.view.drag.previousDelta.y

            this.view.drag.previousDelta.x = _x
            this.view.drag.previousDelta.y = _y
        }

        this.view.up = () => 
        {

        }

        /**
         * * Catch Events
         */
        this.view.onMouseDown = (_event) => 
        {
            this.view.down(_event.clientX, _event.clientY)

            window.addEventListener('mouseup',this.view.onMouseUp)
            window.addEventListener('mousemove',this.view.onMouseMove)
        }

        this.view.onMouseUp = () => 
        {
            window.removeEventListener('mouseup', this.view.onMouseUp)
            window.removeEventListener('mousemove', this.view.onMouseMove)
        }

        this.view.onMouseMove = (_event) => 
        {
            this.view.move(_event.clientX, _event.clientY)
        }

        window.addEventListener('mousedown', this.view.onMouseDown)
    
    }
    

    update()
    {
        /**
         * * Update View
         */
        this.view.spherical.value.theta -= this.view.drag.delta.x * this.view.drag.sensitivity / this.config.smallestSide
        this.view.spherical.value.phi -= this.view.drag.delta.y * this.view.drag.sensitivity / this.config.smallestSide

        this.view.drag.delta.x = 0
        this.view.drag.delta.y = 0

        this.view.spherical.smoothed.phi += (this.view.spherical.value.phi - this.view.spherical.smoothed.phi) * this.view.spherical.smoothing * this.time.delta
        this.view.spherical.smoothed.theta += (this.view.spherical.value.theta - this.view.spherical.smoothed.theta) * this.view.spherical.smoothing * this.time.delta

        const viewPosition = new THREE.Vector3()
        viewPosition.setFromSpherical(this.view.spherical.smoothed)

        this.camera.modes.default.instance.position.copy(viewPosition)
        this.camera.modes.default.instance.lookAt(this.view.target)

    }
}