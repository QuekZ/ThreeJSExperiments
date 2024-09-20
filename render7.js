import * as THREE from 'three';
import { OrbitControls } from './node_modules/three/examples/jsm/controls/OrbitControls'
import { FlyControls } from './node_modules/three/examples/jsm/controls/FlyControls';
import { FirstPersonControls } from './node_modules/three/examples/jsm/controls/FirstPersonControls';
import { GLTFLoader } from './node_modules/three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from './node_modules/three/examples/jsm/loaders/DRACOLoader'
import { RGBELoader } from './node_modules/three/examples/jsm/loaders/RGBELoader';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
//import { BokehPass } from 'three/examples/jsm/postprocessing/BokehPass'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass'

import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass'
//import { BadTVShader } from '../javascript/BadTVShader'
import { RGBShiftShader } from 'three/examples/jsm/shaders/RGBShiftShader'
//import { StaticShader } from ''
import { FilmPass } from  'three/examples/jsm/postprocessing/FilmPass'
import { RenderPixelatedPass } from '/node_modules/three/examples/jsm/postprocessing/RenderPixelatedPass';
import { HalftonePass } from '/node_modules/three/examples/jsm/postprocessing/HalftonePass';
import { SAOPass } from '/node_modules/three/examples/jsm/postprocessing/SAOPass'
import Stats from 'three/examples/jsm/libs/stats.module.js';

// ### Stats ###
let stats = new Stats();
document.body.appendChild(stats.domElement);
// #############


// ### For Mouse Inputs ###
const mouse = new THREE.Vector2();
const target = new THREE.Vector2();
const windowHalf = new THREE.Vector2(window.innerWidth / 2, window.innerHeight / 2);
//#########################

const aspectRatio = window.innerWidth / window.innerHeight;

// ### For Camera ###
const center = new THREE.Vector3(0, 0, 0);
const cameraPosition = new THREE.Vector3(5, 2, -20);
const cameraTarget = center;
var cameraPositions = [
    new THREE.Vector3(-17.7,4.58,-32.74),
    new THREE.Vector3(-23.74,4.61,-22.03),
    new THREE.Vector3(0.55,15.00,6.96)
];
// ##################

// #### Scene & Camera & Renderer ####
const color = 0x000000;
const scene = new THREE.Scene();
scene.fog = new THREE.Fog(color, 5, 60);
const camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 500);
//const camera = new THREE.OrthographicCamera( -aspectRatio, aspectRatio,1, -1, 0.1, 500);
camera.position.copy(cameraPosition);
camera.lookAt(cameraTarget);
camera.zoom = 1;
const renderer = new THREE.WebGLRenderer({
    antialias: false,
    alpha: false,
});
renderer.setClearColor(new THREE.Color(0x000000));
renderer.setSize(window.innerWidth, window.innerHeight);
//#####################################

// ### Loaders ###
const textureLoader = new THREE.TextureLoader();
const normalTexture = textureLoader.load('texture/normalAlien.jpeg');
const loader = new GLTFLoader();

// Optional: Provide a DRACOLoader instance to decode compressed mesh data
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath( '/examples/jsm/libs/draco/' );
loader.setDRACOLoader( dracoLoader );

// Load a glTF resource
loader.load(
	// resource URL
	'./models/spookyScene.glb',
	// called when the resource is loaded
	function ( gltf ) {

		scene.add( gltf.scene );

		gltf.animations; // Array<THREE.AnimationClip>
		gltf.scene; // THREE.Group
		gltf.scenes; // Array<THREE.Group>
		gltf.cameras; // Array<THREE.Camera>
		gltf.asset; // Object

	},
	// called while loading is progressing
	function ( xhr ) {

		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

	},
	// called when loading has errors
	function ( error ) {

		console.log( 'An error happened' );

	}
);
// ###############

// ### HDR Env ###
const hdrUrl = './HDR/satara_night_no_lamps_1k.hdr'
new RGBELoader().load(hdrUrl, texture => {
  const gen = new THREE.PMREMGenerator(renderer)
  const envMap = gen.fromEquirectangular(texture).texture
  scene.environment = envMap
  scene.background = envMap
  
  texture.dispose()
  gen.dispose()
})


// ##############

// ### Meshes ###

// ############

// ### skybox ###
let skyboxGeo = new THREE.BoxGeometry(100, 100, 100);
let skybox = new THREE.Mesh(skyboxGeo);
//scene.add(skybox);
// ##############

// ### Effect Composer ###
const renderPass = new RenderPass(scene, camera);
const pixelatedPass = new RenderPixelatedPass(10, scene, camera);
const filmpass = new FilmPass(0.2, 1, 256, false);
const unrealBloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 0.1, 0.002, 0.5);
const halftonePass = new HalftonePass(800, 600, {
    shape: 5,
    radius: 2,
    rotateR: Math.PI / 12,
    rotateB: Math.PI / 12 * 2,
    rotateG: -Math.PI / 2,
    scatter: 8,
    blending: THREE.NormalBlending,
    greyscale: false,
    disable: false
  });
const composer = new EffectComposer(renderer);
composer.addPass(renderPass);
//composer.addPass(unrealBloomPass);
//composer.addPass(saoPass);
//composer.addPass(halftonePass);
composer.addPass(pixelatedPass);
//composer.addPass(filmpass);
pixelatedPass.normalEdgeStrength = 0;
pixelatedPass.depthEdgeStrength = 0;
pixelatedPass.setPixelSize(2);
// ########################

// ### Controls ###

// Orbitalcontrols
//const controls = new OrbitControls(camera, renderer.domElement);
//controls.enableDamping = true;
//controls.target.set(0,0,0);

// Flycontrols
const controls = new FlyControls(camera, renderer.domElement);
controls.movementSpeed = 75;
controls.rollSpeed = Math.PI / 2;
controls.autoForward = false;
controls.dragToLook = false;

// Firstperson Controls
//const controls = new FirstPersonControls(camera, renderer.domElement)
//controls.lookSpeed = 0.05;
// ###############

// ### Lights ####
let pointLight = new THREE.PointLight(0x855031, 2.5);
pointLight.position.set(5, 20, 20);
scene.add(pointLight);





let ambientLight = new THREE.AmbientLight(0x787878);
scene.add(ambientLight);
// ##############

// ### Helpers ###
const axesHelper = new THREE.AxesHelper( 150 );
//scene.add( axesHelper );








// ##############

// ### getting the Div for our Canvas ###
//document.appendChild( renderer.domElement );
document.getElementById('renderCanvas').appendChild(renderer.domElement);
// ######################################

function renderScene() {
    updateCamera();
	controls.update(0.0008);
    requestAnimationFrame(renderScene);
    stats.update();
    renderer.render(scene, camera);
	composer.render();
    //camera.rotation.y -= 0.0006;
    //camera.rotation.x -= 0.0035;
    console.log(camera.position);
    console.log(" ");
    console.log( camera.rotation);
}
renderScene();


function updateCamera() {
    camera.updateProjectionMatrix();
}

function switchCameraPosition(camera, cameraPositions, cameraRotations) {
    let index = 0;
    var cameraPositions = [
        //new THREE.Vector3(-17.7,4.58,-32.74),
        new THREE.Vector3(-23.74,4.61,-22.03),
        new THREE.Vector3(6.79, 8.1, -24),
        new THREE.Vector3(8.22,18.0, 32.2),
        new THREE.Vector3(-9.38, 18.62, -21.94),
        new THREE.Vector3(-29.53, 18.7, 7.99),
        new THREE.Vector3(27.9, 7.33, -18.95),
        //new THREE.Vector3(39.45, 14,590, 29.22), 
        new THREE.Vector3(3.57, 1.366, -30.66),
        new THREE.Vector3(27.191, 17.628, 24.99),
        new THREE.Vector3(46.65, 13.75, -9.039),
        new THREE.Vector3(10.65, 36.86, 27.72),
        new THREE.Vector3(-5.45, 2.54, -13.03),
        new THREE.Vector3(-25.103, 26.97, 11.13),
        new THREE.Vector3(36.08, 3.24, -30.03)
        
    ];
    
    var cameraRotations = [
        //new THREE.Euler(-3 , 0.1, 3,1,'XYZ'),
        new THREE.Euler(-0.54 , 0.59, -0.00,'XYZ'),
        new THREE.Euler(-2.71, 0.175, 3.04, 'XYZ'),
        new THREE.Euler(2.990, -1.33, -3.11, 'XYZ'),
        new THREE.Euler(-1.3, 0.69, 1.33, 'XYZ'),
        new THREE.Euler(-0.570, -0.33, -0.155, 'XYZ'),
        new THREE.Euler(-0.20, -0.434, -0.1062, 'XYZ'),
        //new THREE.Euler(2.70, 1.39, -2.944, 'XYZ'),
        new THREE.Euler(0.0304, -0.91, 0.160, 'XYZ'),
        new THREE.Euler(-1.94, 0.107, -3.04, 'XYZ'),
        new THREE.Euler(-0.39, 0.88, 0.41, 'XYZ'),
        new THREE.Euler(-1.95, -0.87, -2.17, 'XYZ'),
        new THREE.Euler(2.45, -0.10, 3.13, 'XYZ'),
        new THREE.Euler(-0.91, -1.20, -0.88, 'XYZ'),
        new THREE.Euler(2.96, 0.453, -3.10, 'XYZ')


    ];

    function switchPosition() {
        const randomIndex = Math.floor(Math.random() * cameraPositions.length);
        camera.position.copy(cameraPositions[randomIndex]);
        camera.rotation.copy(cameraRotations[randomIndex]);
        index = randomIndex;
    }

    switchPosition();
    setInterval(() => {
        let nextIndex = (index + 1) % cameraPositions.length;
        camera.position.copy(cameraPositions[nextIndex]);
        camera.rotation.copy(cameraRotations[nextIndex]);
        index = nextIndex;
    }, 6000);

}
//switchCameraPosition(camera, cameraPosition);



// ### If the Windows gets resized ###
function onResize(event) {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener('resize', onResize, false);
// ###################################