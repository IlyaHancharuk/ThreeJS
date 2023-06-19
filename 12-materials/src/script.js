import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'


/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

/**
 * Textures
*/
const loadingManager = new THREE.LoadingManager()
loadingManager.onStart = () => console.log('loading started')
loadingManager.onLoad = () => console.log('loading finished')
loadingManager.onProgress = () => console.log('loading progressing')
loadingManager.onError = () => console.log('loading error')

const textureLoader = new THREE.TextureLoader(loadingManager)

const doorColorTexture = textureLoader.load('/textures/door/color.jpg')
const doorAlphaTexture = textureLoader.load('/textures/door/alpha.jpg')
const doorAmbientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg')
const doorHeightTexture = textureLoader.load('/textures/door/height.jpg')
const doorNormalTexture = textureLoader.load('/textures/door/normal.jpg')
const doorMetalnessTexture = textureLoader.load('/textures/door/metalness.jpg')
const doorRoughnessTexture = textureLoader.load('/textures/door/roughness.jpg')
const gradientTexture3 = textureLoader.load('/textures/gradients/3.jpg')
const gradientTexture5 = textureLoader.load('/textures/gradients/5.jpg')
const matcapTexture1 = textureLoader.load('/textures/matcaps/1.png')
const matcapTexture2 = textureLoader.load('/textures/matcaps/2.png')
const matcapTexture3 = textureLoader.load('/textures/matcaps/3.png')
const matcapTexture4 = textureLoader.load('/textures/matcaps/4.png')
const matcapTexture5 = textureLoader.load('/textures/matcaps/5.png')
const matcapTexture6 = textureLoader.load('/textures/matcaps/6.png')
const matcapTexture7 = textureLoader.load('/textures/matcaps/7.png')
const matcapTexture8 = textureLoader.load('/textures/matcaps/8.png')

const cubeTextureLoader = new THREE.CubeTextureLoader()
const environmentMapTexture = cubeTextureLoader.load([
    '/textures/environmentMaps/0/px.jpg',
    '/textures/environmentMaps/0/nx.jpg',
    '/textures/environmentMaps/0/py.jpg',
    '/textures/environmentMaps/0/ny.jpg',
    '/textures/environmentMaps/0/pz.jpg',
    '/textures/environmentMaps/0/nz.jpg'
])

// Scene
const scene = new THREE.Scene()

/**
 * Objects
 */
// const material = new THREE.MeshBasicMaterial({
//     map: doorColorTexture,
//     // color: new THREE.Color('red'),
//     // wireframe: true,
//     transparent: true,
//     opacity: 0.5,
//     alphaMap: doorAlphaTexture,
    
// })
// const material = new THREE.MeshNormalMaterial({
//     transparent: true,
//     flatShading: true,
// })
// const material = new THREE.MeshMatcapMaterial()
// material.matcap = matcapTexture8
// const material = new THREE.MeshDepthMaterial()
// const material = new THREE.MeshLambertMaterial()
// const material = new THREE.MeshPhongMaterial()
// material.shininess = 100
// material.specular = new THREE.Color(0x1188ff)
// const material = new THREE.MeshToonMaterial()
// material.gradientMap = gradientTexture5
// gradientTexture5.minFilter = THREE.NearestFilter
// gradientTexture5.magFilter = THREE.NearestFilter
// gradientTexture5.generateMipmaps = false
// const material = new THREE.MeshStandardMaterial()
// // material.metalness = 0.45
// // material.roughness = 0.65
// material.metalnessMap = doorMetalnessTexture
// material.roughnessMap = doorRoughnessTexture
// material.map = doorColorTexture
// material.aoMap = doorAmbientOcclusionTexture
// material.aoMapIntensity = 1
// material.displacementMap = doorHeightTexture
// material.displacementScale = 0.05
// material.normalMap = doorNormalTexture
// material.transparent = true
// material.alphaMap = doorAlphaTexture
const material = new THREE.MeshStandardMaterial()
material.metalness = 0.7
material.roughness = 0.2
material.envMap = environmentMapTexture
material.envMapIntensity = 1


const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 64, 64),
    material
)
const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(1, 1, 100, 100),
    material
)
plane.material.side = THREE.DoubleSide
const torus = new THREE.Mesh(
    new THREE.TorusGeometry(0.3, 0.2, 64, 128),
    material
)
sphere.position.x = -1.5
torus.position.x = 1.5
sphere.geometry.setAttribute('uv2', new THREE.BufferAttribute(sphere.geometry.attributes.uv.array, 2))
plane.geometry.setAttribute('uv2', new THREE.BufferAttribute(plane.geometry.attributes.uv.array, 2))
torus.geometry.setAttribute('uv2', new THREE.BufferAttribute(torus.geometry.attributes.uv.array, 2))
scene.add(sphere, plane, torus)

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(ambientLight)

const pointLight = new THREE.PointLight(0xffffff, 0.5)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)


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
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

const gui = new dat.GUI()
gui.add(material, 'metalness').min(0).max(1).step(0.0001)
gui.add(material, 'roughness').min(0).max(1).step(0.0001)
gui.add(material, 'envMapIntensity').min(0).max(1).step(0.0001)

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

    // Update objects
    sphere.rotation.y = elapsedTime * 0.3
    plane.rotation.y = elapsedTime * 0.3
    torus.rotation.y = elapsedTime * 0.3

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()