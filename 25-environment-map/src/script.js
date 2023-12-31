import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'
import { EXRLoader } from 'three/addons/loaders/EXRLoader.js'
import { GroundProjectedSkybox } from 'three/addons/objects/GroundProjectedSkybox.js'

/**
 * Base
 */
// Debug
const gui = new dat.GUI()
const global = {}

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Update all materials
 */
const updateAllMaterials = () => {

    scene.traverse((child) => {

        if (child.isMesh && child.material.isMeshStandardMaterial) {

            child.material.envMapIntensity = global.envMapIntensity

            child.castShadow = true
            child.receiveShadow = true
        }
    })
}

/**
 * Loaders
 */
let model = null

const gltfLoader = new GLTFLoader()
const cubeTextureLoader = new THREE.CubeTextureLoader()
const rgbeLoader = new RGBELoader()
const exrLoader = new EXRLoader()
const textureLoader = new THREE.TextureLoader()

gltfLoader.load(
    '/models/FlightHelmet/glTF/FlightHelmet.gltf',
    (gltf) => {

        model = gltf.scene
        model.scale.set(10, 10, 10)
        model.position.x = 4
        scene.add(model)

        updateAllMaterials()
    }
)

gltfLoader.load(
    '/models/hamburger.glb',
    (gltf) =>
    {
        gltf.scene.scale.set(0.4, 0.4, 0.4)
        gltf.scene.position.set(-4, 2.5, 0)
        scene.add(gltf.scene)

        updateAllMaterials()
    }
)

/**
 * Environment map
 */
// Global intensity
global.envMapIntensity = 1
gui
    .add(global, "envMapIntensity")
    .min(0)
    .max(10)
    .step(0.01)
    .onChange(updateAllMaterials)


// LDR cube texture
const environmentMap = cubeTextureLoader.load([
    '/environmentMaps/0/px.png',
    '/environmentMaps/0/nx.png',
    '/environmentMaps/0/py.png',
    '/environmentMaps/0/ny.png',
    '/environmentMaps/0/pz.png',
    '/environmentMaps/0/nz.png'
])
scene.environment = environmentMap
scene.background = environmentMap
scene.backgroundBlurriness = 0
scene.backgroundIntensity = 1
gui
    .add(scene, 'backgroundBlurriness')
    .min(0)
    .max(1)
    .step(0.01)
gui
    .add(scene, 'backgroundIntensity')
    .min(0)
    .max(10)
    .step(0.01)


// HDR (RGBE) equirectangular
// rgbeLoader.load(
//     '/environmentMaps/blender-2k.hdr',
//     (environmentMap) => {

//         environmentMap.mapping = THREE.EquirectangularReflectionMapping

//         scene.background = environmentMap
//         scene.environment = environmentMap
// })

// HDR (EXR) equirectangular
// exrLoader.load('/environmentMaps/nvidiaCanvas-4k.exr', (environmentMap) =>
// {
//     environmentMap.mapping = THREE.EquirectangularReflectionMapping

//     scene.background = environmentMap
//     scene.environment = environmentMap
// })

// LDR equirectangular
// const environmentMap = textureLoader.load('/environmentMaps/blockadesLabsSkybox/anime_art_style_japan_streets_with_cherry_blossom_.jpg')
// environmentMap.mapping = THREE.EquirectangularReflectionMapping
// environmentMap.colorSpace = THREE.SRGBColorSpace
// scene.background = environmentMap
// scene.environment = environmentMap

// Ground projected skybox
// rgbeLoader.load('/environmentMaps/2/2k.hdr', (environmentMap) =>
// {
//     environmentMap.mapping = THREE.EquirectangularReflectionMapping
//     scene.environment = environmentMap

//     const skybox = new GroundProjectedSkybox(environmentMap)
//     skybox.scale.setScalar(50)
//     skybox.radius = 120
//     skybox.height = 11
//     scene.add(skybox)

//     gui.add(skybox, 'radius', 1, 200, 0.1).name('skyboxRadius')
//     gui.add(skybox, 'height', 1, 100, 0.1).name('skyboxHeight')
// })


/**
 * Real time environment map
 */

// // Base environment map
// const environmentMap = textureLoader.load('/environmentMaps/blockadesLabsSkybox/interior_views_cozy_wood_cabin_with_cauldron_and_p.jpg')
// environmentMap.mapping = THREE.EquirectangularReflectionMapping
// environmentMap.colorSpace = THREE.SRGBColorSpace

// scene.background = environmentMap

// // Holy donut
// const holyDonut = new THREE.Mesh(
//     new THREE.TorusGeometry(8, 0.5),
//     new THREE.MeshBasicMaterial({ color: new THREE.Color(10, 4, 2) })
// )
// holyDonut.layers.enable(1)
// holyDonut.position.y = 3.5
// scene.add(holyDonut)

// // Cube render target
// const cubeRenderTarget = new THREE.WebGLCubeRenderTarget(
//     256,
//     {
//         type: THREE.FloatType
//     }
// )
// scene.environment = cubeRenderTarget.texture

// // Cube camera
// const cubeCamera = new THREE.CubeCamera(0.1, 100, cubeRenderTarget)
// cubeCamera.layers.set(1)

/**
 * Floor
 */
const floorColorTexture = textureLoader.load('/textures/wood_floor_deck_1k/wood_floor_deck_diff_1k.jpg')
floorColorTexture.colorSpace = THREE.SRGBColorSpace
const floorNormalTexture = textureLoader.load('/textures/wood_floor_deck_1k/wood_floor_deck_nor_gl_1k.png')
const floorAORoughnessMetalnessTexture = textureLoader.load('/textures/wood_floor_deck_1k/wood_floor_deck_arm_1k.jpg')

const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(16, 8),
    new THREE.MeshStandardMaterial({
        map: floorColorTexture,
        normalMap: floorNormalTexture,
        aoMap: floorAORoughnessMetalnessTexture,
        roughnessMap: floorAORoughnessMetalnessTexture,
        metalnessMap: floorAORoughnessMetalnessTexture,
    })
)
floor.rotation.x = - (Math.PI * 0.5)
scene.add(floor)


/**
 * Wall
 */
const wallColorTexture = textureLoader.load('/textures/rabdentse_ruins_wall_1k/rabdentse_ruins_wall_diff_1k.jpg')
wallColorTexture.colorSpace = THREE.SRGBColorSpace
const wallNormalTexture = textureLoader.load('/textures/rabdentse_ruins_wall_1k/rabdentse_ruins_wall_nor_gl_1k.png')
const wallAORoughnessMetalnessTexture = textureLoader.load('/textures/rabdentse_ruins_wall_1k/rabdentse_ruins_wall_arm_1k.jpg')

const wall = new THREE.Mesh(
    new THREE.PlaneGeometry(16, 8),
    new THREE.MeshStandardMaterial({
        map: wallColorTexture,
        normalMap: wallNormalTexture,
        aoMap: wallAORoughnessMetalnessTexture,
        roughnessMap: wallAORoughnessMetalnessTexture,
        metalnessMap: wallAORoughnessMetalnessTexture,
    })
)
wall.position.y = 4
wall.position.z = - 4
scene.add(wall)


/**
 * Torus Knot
 */
// const torusKnot = new THREE.Mesh(
//     new THREE.TorusKnotGeometry(1, 0.4, 100, 16),
//     new THREE.MeshStandardMaterial({ roughness: 0, metalness: 1, color: 0xaaaaaa })
// )
// torusKnot.position.x = -4
// torusKnot.position.y = 4
// scene.add(torusKnot)

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
camera.position.set(4, 5, 4)
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.target.y = 3.5
controls.enableDamping = true

/**
 * Light
 */
const ambientLight = new THREE.AmbientLight('#ffffff', 0.5)

const directionalLight = new THREE.DirectionalLight('#ffffff', 2)
directionalLight.castShadow = true
directionalLight.shadow.mapSize.set(512, 512)
directionalLight.shadow.camera.far = 20
directionalLight.shadow.camera.left = - 7
directionalLight.shadow.camera.top = 7
directionalLight.shadow.camera.right = 7
directionalLight.shadow.camera.bottom = - 7
directionalLight.position.set(- 6, 9.75, 3.75)
directionalLight.shadow.normalBias = 0.025
directionalLight.shadow.bias = - 0.005
scene.add(directionalLight)

// Target
directionalLight.target.position.set(0, 4, 0)
directionalLight.target.updateWorldMatrix()

gui.add(directionalLight, 'intensity').min(0).max(10).step(0.001).name('lightIntensity')
gui.add(directionalLight.position, 'x').min(- 10).max(10).step(0.001).name('lightX')
gui.add(directionalLight.position, 'y').min(- 10).max(10).step(0.001).name('lightY')
gui.add(directionalLight.position, 'z').min(- 10).max(10).step(0.001).name('lightZ')
gui.add(directionalLight, 'castShadow')
gui.add(directionalLight.shadow, 'normalBias').min(- 0.05).max(0.05).step(0.001)
gui.add(directionalLight.shadow, 'bias').min(- 0.05).max(0.05).step(0.001)

// Helper
// const directionalLightCameraHelper = new THREE.CameraHelper(directionalLight.shadow.camera)
// scene.add(directionalLightCameraHelper)

/**
 * Renderer
 */
const pixelRatio = Math.min(window.devicePixelRatio, 2)
const renderer = pixelRatio > 1
    ? new THREE.WebGLRenderer({
        canvas: canvas
    })
    : new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true
    })
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(pixelRatio)

// Tone mapping
renderer.toneMapping = THREE.ReinhardToneMapping
renderer.toneMappingExposure = 3
gui.add(renderer, 'toneMapping', {
    No: THREE.NoToneMapping,
    Linear: THREE.LinearToneMapping,
    Reinhard: THREE.ReinhardToneMapping,
    Cineon: THREE.CineonToneMapping,
    ACESFilmic: THREE.ACESFilmicToneMapping
})
gui.add(renderer, 'toneMappingExposure').min(0).max(10).step(0.001)

// Physically accurate lighting
renderer.useLegacyLights = false
gui.add(renderer, 'useLegacyLights')

// Shadows
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap


/**
 * Animate
 */
const clock = new THREE.Clock()
const tick = () =>
{
    // Time
    const elapsedTime = clock.getElapsedTime()

    // if (holyDonut) {
    //     holyDonut.rotation.x = Math.sin(elapsedTime) * 2

    //     cubeCamera.update(renderer, scene)
    // }

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()