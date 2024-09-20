import * as THREE from 'three'
import Stats from 'three/examples/jsm/libs/stats.module.js'

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
const cameraPosition = new THREE.Vector3(0, 0, 100);
const cameraTarget = center;
// ##################

// #### Scene & Camera & Renderer ####
const color = 0x000000;
const scene = new THREE.Scene();
scene.fog = new THREE.Fog(color, 0, 500);
const camera = new THREE.PerspectiveCamera(140, 1920 / 1080, 0.1, 1000);
//const camera = new THREE.OrthographicCamera( -aspectRatio, aspectRatio,1, -1, 0.1, 500);
camera.position.copy(cameraPosition);
camera.lookAt(cameraTarget);
camera.zoom = 1;
const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: false,
});
renderer.setClearColor(new THREE.Color(0x000000));
renderer.setSize(window.innerWidth, window.innerHeight);
//#####################################

// ### Particle ###
const particles = new THREE.Object3D();
scene.add(particles);

// ### Loaders ( Loading Logo Texture ) ###
const textureLoader = new THREE.TextureLoader();
const normalTexture = textureLoader.load('images/logoGross.png');
// ###############

// ### Meshes ( For Particles) ###
const geometry = new THREE.SphereBufferGeometry(5, 2,2);
const material = new THREE.MeshStandardMaterial({
    color: 0x1f1f1f,
    roughness: 0.1,
    metalness: 1.1,
    wireframe: false,  
});

var splash = 150;
const particleCount = 2000;

for (let i = 0; i < particleCount; i++){
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(
        Math.random() - 0.5,
        Math.random() - 0.5,
        Math.random() - 0.5
    ).normalize();
    mesh.position.multiplyScalar(splash + Math.random() * 50);
    mesh.scale.set(Math.random() + 0.5, Math.random() + 0.5, Math.random() + 0.5);
    mesh.name = `Mesh${i}`;
    mesh.lookAt(0, 0, 0);
    particles.add(mesh);
}
// ############

// ### Lights ####

// ### POINTLIGHTS ###
// -#- Weiß -#-
let pointLight = new THREE.PointLight(0xf0f0f0, 1000);
pointLight.position.set(10, 100, 0);
scene.add(pointLight);
// ###############

// ### Türkis/Grünlich ###
let plTuerk = new THREE.PointLight(0x00FF71, 1000);
plTuerk.position.set(20, 10, 0);
scene.add(plTuerk);
const plHelperTuerk = new THREE.PointLightHelper(plTuerk, 1);
//scene.add(plHelperTuerk);
// ##############

// ### Pink ###
let plPink = new THREE.PointLight(0xE800FF, 2000);
plPink.position.set(-50, 50, 0);
scene.add(plPink);
const plHelperPink = new THREE.PointLightHelper(plPink, 1);
//scene.add(plHelperPink);
// ###########

// ### Blaue ###
let plBlue = new THREE.PointLight(0x0070C4, 5000);
plBlue.position.set(0,0,0);
scene.add(plBlue);
const plHelperBlue = new THREE.PointLightHelper(plBlue, 1);
//scene.add(plHelperBlue);
// #############
// ### ### ### ### 


let ambientLight = new THREE.AmbientLight(0x999999);
scene.add(ambientLight);
// ##############

// ### getting the Div for our Canvas ###
//document.appendChild( renderer.domElement );
document.getElementById('renderCanvas').appendChild(renderer.domElement);
// ######################################

function renderScene() {
    updateCamera();
    requestAnimationFrame(renderScene);
    updateRotation();
    updateRotationTwo();
    stats.update();
    renderer.render(scene, camera);
}
renderScene();


function updateCamera() {
    camera.updateProjectionMatrix();
}

function updateRotation(){
    particles.children.forEach((mesh) => {
    const randomXValue = 0.005 * Math.random() - 0.01;
    const randomYValue = 0.005 * Math.random() + 0.01;
    const randomZValue = 0.005 * Math.random() - 0.01;

    mesh.rotation.y -= randomXValue;
    mesh.rotation.x += randomYValue;
    mesh.rotation.z -= randomZValue;
    });
}

function updateRotationTwo(){
    particles.rotation.y += 0.005 * Math.random() - 0.001;
    particles.rotation.x += 0.005 * Math.random() + 0.001;
    particles.rotation.z -= 0.005 * Math.random() + 0.001;
}


// ### If the Windows gets resized ###
function onResize(event) {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener('resize', onResize, false);
// ###################################