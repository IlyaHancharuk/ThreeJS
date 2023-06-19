import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import gsap from 'gsap'
import * as dat from 'lil-gui'


const parameters = {
    color: 0xff0000,
    spin: () => {
        gsap.to(mesh.rotation, { duration: 1, y: mesh.rotation.y + Math.PI * 2 })
    }
}

// const image = new Image()
// const texture = new THREE.Texture(image)
// image.onload = () =>
// {
//     texture.needsUpdate = true
// }
// image.src = '/textures/door/color.jpg'

// const textureLoader = new THREE.TextureLoader()
// const texture = textureLoader.load(
//     '/textures/door/color.jpg',
//     () =>
//     {
//         console.log('loading finished')
//     },
//     () =>
//     {
//         console.log('loading progressing')
//     },
//     () =>
//     {
//         console.log('loading error')
//     }
// )

const loadingManager = new THREE.LoadingManager()
loadingManager.onStart = () =>
{
    console.log('loading started')
}
loadingManager.onLoad = () =>
{
    console.log('loading finished')
}
loadingManager.onProgress = () =>
{
    console.log('loading progressing')
}
loadingManager.onError = () =>
{
    console.log('loading error')
}
const textureLoader = new THREE.TextureLoader(loadingManager)
// const colorTexture = textureLoader.load('/textures/door/color.jpg')
const colorTexture = textureLoader.load('/textures/Stylized_Fur_002_ambientOcclusion.jpg')
// colorTexture.generateMipmaps = false
// colorTexture.minFilter = THREE.NearestFilter
// colorTexture.magFilter = THREE.NearestFilter
// colorTexture.wraps = THREE.RepeatWrapping
// colorTexture.wrapT = THREE.RepeatWrapping
colorTexture.wrapS = THREE.MirroredRepeatWrapping
colorTexture.wrapT = THREE.MirroredRepeatWrapping
// colorTexture.repeat.x = 2
// colorTexture.repeat.y = 3
// colorTexture.offset.x = 0.5
// colorTexture.offset.y = 0.5
// colorTexture.rotation = Math.PI * 0.25
colorTexture.center.x = 0.5
colorTexture.center.y = 0.5
const alphaTexture = textureLoader.load('/textures/door/alpha.jpg')
const heightTexture = textureLoader.load('/textures/door/height.jpg')
const normalTexture = textureLoader.load('/textures/door/normal.jpg')
const ambientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg')
const metalnessTexture = textureLoader.load('/textures/door/metalness.jpg')
const roughnessTexture = textureLoader.load('/textures/door/roughness.jpg')


/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Object
 */
// const geometry = new THREE.BoxGeometry(1, 1, 1)
const geometry = new THREE.SphereGeometry(1, 32, 16)
const material = new THREE.MeshBasicMaterial({ map: colorTexture })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

console.log(geometry.attributes.uv)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 3
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Debug
 */
const gui = new dat.GUI()
gui.add(mesh.position, 'x', -3, 3, 0.1).name('pos x')
gui.add(mesh.position, 'y', -3, 3, 0.1).name('pos y')
gui.add(mesh.position, 'z', -3, 3, 0.1).name('pos z')
gui.add(mesh, 'visible')
gui.add(material, 'wireframe')
gui.addColor(parameters, 'color').onChange(() => {
    material.color.set(parameters.color)
})
gui.add(parameters, 'spin')


/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()


