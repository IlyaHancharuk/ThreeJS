import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

const PI = Math.PI

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

const BoxButton = document.getElementById('Box')
const PlaneButton = document.getElementById('Plane')
const CircleButton = document.getElementById('Circle')
const ConeButton = document.getElementById('Cone')
const CylinderButton = document.getElementById('Cylinder')
const RingButton = document.getElementById('Ring')
const TorusButton = document.getElementById('Torus')
const TorusKnotButton = document.getElementById('TorusKnot')
const DodecahedronButton = document.getElementById('Dodecahedron')
const OctahedronButton = document.getElementById('Octahedron')
const TetrahedronButton = document.getElementById('Tetrahedron')
const IcosahedronButton = document.getElementById('Icosahedron')
const SphereButton = document.getElementById('Sphere')
const ShapeButton = document.getElementById('Shape')
const TubeButton = document.getElementById('Tube')
const BufferButton = document.getElementById('Buffer')

// Scene
const scene = new THREE.Scene()

/**
 * Object
 */
// const geometry = new THREE.BoxGeometry(1, 1, 1)
// const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
// const mesh = new THREE.Mesh(geometry, material)
// scene.add(mesh)
const box = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true })
)
const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(1, 1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0xffff00, side: THREE.DoubleSide, wireframe: true })
)
const circle = new THREE.Mesh(
    new THREE.CircleGeometry( 1, 32, 0, PI * 2 ),
    new THREE.MeshBasicMaterial( { color: 0xffff00, wireframe: true } )
)
const cone = new THREE.Mesh(
    new THREE.ConeGeometry( 1, 2, 16, 1, false, 0, PI * 2 ),
    new THREE.MeshBasicMaterial( { color: 0xffff00, wireframe: true } )
)
const cylinder = new THREE.Mesh(
    new THREE.CylinderGeometry( 0.5, 0.7, 2, 16, 1, false, 0, PI * 2 ),
    new THREE.MeshBasicMaterial( { color: 0xffff00, wireframe: true } )
)
const ring = new THREE.Mesh(
    new THREE.RingGeometry( 0.5, 0.7, 64, 1, 1, PI * 2 ),
    new THREE.MeshBasicMaterial( { color: 0xffff00, wireframe: true } )
)
const torus = new THREE.Mesh(
    new THREE.TorusGeometry( 0.5, 0.2, 16, 32, PI * 2 ),
    new THREE.MeshBasicMaterial( { color: 0xffff00, wireframe: true } )
)
const torusKnot = new THREE.Mesh(
    new THREE.TorusKnotGeometry( 0.5, 0.2, 64, 16, 2, 3  ),
    new THREE.MeshBasicMaterial( { color: 0xffff00, wireframe: true } )
)
const dodecahedron = new THREE.Mesh(
    new THREE.DodecahedronGeometry(1, 2),
    new THREE.MeshBasicMaterial( { color: 0xffff00, wireframe: true } )
)
const octahedron = new THREE.Mesh(
    new THREE.OctahedronGeometry(1, 2),
    new THREE.MeshBasicMaterial( { color: 0xffff00, wireframe: true } )
)
const tetrahedron = new THREE.Mesh(
    new THREE.TetrahedronGeometry(1, 2),
    new THREE.MeshBasicMaterial( { color: 0xffff00, wireframe: true } )
)
const icosahedron = new THREE.Mesh(
    new THREE.IcosahedronGeometry(1, 1),
    new THREE.MeshBasicMaterial( { color: 0xffff00, wireframe: true } )
)
const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(1, 32, 16, 0, PI * 2, 0, PI ),
    new THREE.MeshBasicMaterial( { color: 0xffff00, wireframe: true } )
)

const x = 0, y = 0;
const heartShape = new THREE.Shape();
heartShape.moveTo( x + 5, y + 5 );
heartShape.bezierCurveTo( x + 5, y + 5, x + 4, y, x, y );
heartShape.bezierCurveTo( x - 6, y, x - 6, y + 7,x - 6, y + 7 );
heartShape.bezierCurveTo( x - 6, y + 11, x - 3, y + 15.4, x + 5, y + 19 );
heartShape.bezierCurveTo( x + 12, y + 15.4, x + 16, y + 11, x + 16, y + 7 );
heartShape.bezierCurveTo( x + 16, y + 7, x + 16, y, x + 10, y );
heartShape.bezierCurveTo( x + 7, y, x + 5, y + 5, x + 5, y + 5 );
const heartMesh = new THREE.Mesh(
    new THREE.ShapeGeometry(heartShape),
    new THREE.MeshBasicMaterial( { color: 0xffff00, wireframe: true } )
)

class CustomSinCurve extends THREE.Curve {

	constructor( scale = 1 ) {
		super();
		this.scale = scale;
	}

	getPoint( t, optionalTarget = new THREE.Vector3() ) {

		const tx = t * 3 - 1.5;
		const ty = Math.sin( 2 * Math.PI * t );
		const tz = 0;

		return optionalTarget.set( tx, ty, tz ).multiplyScalar( this.scale );
	}
}
const path = new CustomSinCurve( 1 );
const tube = new THREE.Mesh(
    new THREE.TubeGeometry( path, 24, 0.3, 12, false ),
    new THREE.MeshBasicMaterial( { color: 0x00ff00, wireframe: true } )
)

BoxButton.onclick = () => {
    scene.clear()
    scene.add(box)
}
PlaneButton.onclick = () => {
    scene.clear()
    scene.add(plane)
}
CircleButton.onclick = () => {
    scene.clear()
    scene.add(circle)
}
ConeButton.onclick = () => {
    scene.clear()
    scene.add(cone)
}
CylinderButton.onclick = () => {
    scene.clear()
    scene.add(cylinder)
}
RingButton.onclick = () => {
    scene.clear()
    scene.add(ring)
}
TorusButton.onclick = () => {
    scene.clear()
    scene.add(torus)
}
TorusKnotButton.onclick = () => {
    scene.clear()
    scene.add(torusKnot)
}
DodecahedronButton.onclick = () => {
    scene.clear()
    scene.add(dodecahedron)
}
OctahedronButton.onclick = () => {
    scene.clear()
    scene.add(octahedron)
}
TetrahedronButton.onclick = () => {
    scene.clear()
    scene.add(tetrahedron)
}
IcosahedronButton.onclick = () => {
    scene.clear()
    scene.add(icosahedron)
}
SphereButton.onclick = () => {
    scene.clear()
    scene.add(sphere)
}
ShapeButton.onclick = () => {
    scene.clear()
    scene.add(heartMesh)
}
TubeButton.onclick = () => {
    scene.clear()
    scene.add(tube)
}
BufferButton.onclick = () => {
    scene.clear()
    const bufferGeometry = new THREE.BufferGeometry()
    // Create a Float32Array containing the vertices position (3 by 3)
    const count = 50
    const positionsArray = new Float32Array(count * 3 * 3)
    for(let i = 0; i < count * 3 * 3; i++)
    {
        positionsArray[i] = (Math.random() - 0.5) * 4
    }
    // Create the attribute and name it 'position'
    const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3)
    bufferGeometry.setAttribute('position', positionsAttribute)
    const buffer = new THREE.Mesh(
        bufferGeometry,
        new THREE.MeshBasicMaterial( { color: 0x00ff00, wireframe: true } )
    )
    scene.add(buffer)
}


/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight - 45
}

window.addEventListener('resize', () => {
    console.log('window has been resized')

    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight - 45

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

window.addEventListener('dblclick', () => {
    console.log('double click')
    const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement

    if (!fullscreenElement) {
        if (canvas.requestFullscreen) {
            canvas.requestFullscreen()
        } else if (canvas.webkitFullscreenElement) {
            canvas.webkitFullscreenElement()
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen()
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen()
        }
    }
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
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

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