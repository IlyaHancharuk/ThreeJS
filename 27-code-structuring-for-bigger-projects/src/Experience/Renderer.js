import Experience from './Experience.js'
import * as THREE from 'three'

export default class Renderer {
    constructor() {
        this.experience = new Experience()
        this.canvas = this.experience.canvas
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.camera = this.experience.camera
        this.pixelRatio = this.sizes.pixelRatio

        this.setInstance()
    }

    setInstance() {
        this.instance = this.pixelRatio > 1
            ? new THREE.WebGLRenderer({
                canvas: this.canvas
            })
            : new THREE.WebGLRenderer({
                canvas: this.canvas,
                antialias: true
            })
        this.instance.useLegacyLights = false
        this.instance.physicallyCorrectLights = true
        this.instance.toneMapping = THREE.CineonToneMapping
        this.instance.toneMappingExposure = 1.75
        this.instance.shadowMap.enabled = true
        this.instance.shadowMap.type = THREE.PCFSoftShadowMap
        this.instance.setSize(this.sizes.width, this.sizes.height)
        this.instance.setPixelRatio(Math.min(this.pixelRatio, 2))
    }

    resize() {
        this.instance.setSize(this.sizes.width, this.sizes.height)
        this.instance.setPixelRatio(Math.min(this.pixelRatio, 2))
    }

    update() {
        this.instance.render(this.scene, this.camera.instance)
    }
}