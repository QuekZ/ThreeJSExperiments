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
const cameraPosition = new THREE.Vector3(0, 0, 5);
const cameraTarget = center;
// ##################

// #### Scene & Camera & Renderer ####
const color = 0x000000;
const scene = new THREE.Scene();
scene.fog = new THREE.Fog(color, 60, 200);
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

// ### Loaders ###
const textureLoader = new THREE.TextureLoader();
const normalTexture = textureLoader.load('texture/normalAlien.jpeg');
// ###############

// ### Meshes ###
const sphereGeo = new THREE.SphereGeometry(4, 6, 6);
const sphereMaterial = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    roughness: 0.1,
    metalness: 1,
    transparent: true,
    opacity: 0.9
});
var sphereMesh = new THREE.Mesh(sphereGeo, sphereMaterial);
sphereMesh.position.set(0,0 ,0)
scene.add(sphereMesh);

const planeGeo = new THREE.PlaneGeometry(150, 15);
const planeMaterial = new THREE.MeshStandardMaterial({
    color: 0x666666,
    roughness: 0.06,
    metalness: 1,

});
planeMaterial.opacity = 0.4;
let planeMesh = new THREE.Mesh(planeGeo, planeMaterial);
planeMesh.position.set(0,-7,0);
planeMesh.rotation.x = -Math.PI / 3;
planeMesh.receiveShadow = true;
scene.add(planeMesh);


// ############

// ### Lights ####
let pL = new THREE.PointLight(0xffffff, 10);
pL.position.set(10, 12, 0);
scene.add(pL);
const pLHelper = new THREE.PointLightHelper(pL, 1);
//scene.add( pLHelper);

let pLBlue = new THREE.PointLight(0x3388ff, 250);
pLBlue.position.set(-12,8,0);
scene.add(pLBlue);
const plHelperBlue = new THREE.PointLightHelper(pLBlue, 1);
//scene.add(plHelperBlue);

let pLGreen = new THREE.PointLight(0x11ff66, 50);
pLGreen.position.set(15,-5,0);
scene.add(pLGreen);
const pLHelperGreen = new THREE.PointLightHelper(pLGreen, 1);
//scene.add(pLHelperGreen);

let pLTurq = new THREE.PointLight(0xf5009f, 175);
pLTurq.position.set(-15,-5,0);
scene.add(pLTurq);
const pLHelperTurq = new THREE.PointLightHelper(pLTurq, 1);
//scene.add(pLHelperTurq);  

let spotLight = new THREE.SpotLight( 0xffffff );
spotLight.position.set(0, 50, 0);
spotLight.castShadow = true;
spotLight.shadow.mapSize.width = 1024;
spotLight.shadow.mapSize.height = 1024;

spotLight.shadow.camera.near = 500;
spotLight.shadow.camera.far = 4000;
spotLight.shadow.camera.fov = 30;
spotLight.shadow.focus = 1;
scene.add(spotLight);







let ambientLight = new THREE.AmbientLight(0xffffff);
//scene.add(ambientLight);
// ##############

// ### getting the Div for our Canvas ###
//document.appendChild( renderer.domElement );
document.getElementById('renderCanvas').appendChild(renderer.domElement);
// ######################################

function renderScene() {
    updateCamera();
    requestAnimationFrame(renderScene);
    stats.update();
    //sphereMesh.rotation.y += Math.random() * 0.05;
    //sphereMesh.rotation.y -= Math.random() * 0.03;
    updateRotation();
    renderer.render(scene, camera);
}
renderScene();


function updateCamera() {
    camera.updateProjectionMatrix();
}

function updateRotation(){
       
 
            const randomYValue = 0.5 * Math.random() + 0.1;
            sphereMesh.rotation.y += randomYValue / 50;
            sphereMesh.rotation.x -= randomYValue / 150;
           
        
    }


// ### If the Windows gets resized ###
function onResize(event) {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener('resize', onResize, false);
// ###################################