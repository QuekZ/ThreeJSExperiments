import * as THREE from 'three'
import Stats from 'three/examples/jsm/libs/stats.module.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls' 
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
//import { BokehPass } from 'three/examples/jsm/postprocessing/BokehPass'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass'
import { FilmPass } from  'three/examples/jsm/postprocessing/FilmPass'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass'
//import { BadTVShader } from '../javascript/BadTVShader'
import { RGBShiftShader } from 'three/examples/jsm/shaders/RGBShiftShader'
//import { StaticShader } from ''

// ### Stats ###
let stats = new Stats();
//document.body.appendChild(stats.domElement);
// #############




// ### For Mouse Inputs ###
const mouse = new THREE.Vector2();
const target = new THREE.Vector2();
const windowHalf = new THREE.Vector2(window.innerWidth / 2, window.innerHeight / 2);
//#########################

const aspectRatio = window.innerWidth / window.innerHeight;

// ### For Camera ### // (16.35, 18.723, 13.93), davor (0,0,30)
const center = new THREE.Vector3(0, 0, 0);
const cameraPosition = [
    new THREE.Vector3(7.8391687, 8.5774, 9.040178),
    new THREE.Vector3(9.7770, 9.0619, 6.24819),
    new THREE.Vector3(6.302, 10.3490, 8.36223),
    new THREE.Vector3(6.3058, 7.8255, 10.78596),
    new THREE.Vector3(6.98069, 6.574356, 12.923426),
    new THREE.Vector3(11.57517, 8.50354, 5.8198),
    new THREE.Vector3(6.2927, 12.79556, 6.069499),
    new THREE.Vector3(12.9386, 6.77954, 7.04155164)
];
const cameraTarget = center;
const cameraDistance = new THREE.Vector3(8.5, 8.5, 8.5);
// ##################

// #### Scene & Camera & Renderer ####
const color = 0x000000;
const scene = new THREE.Scene();
scene.fog = new THREE.Fog(color, 0, 5);
const camera = new THREE.PerspectiveCamera(140, 1920 / 1080, 0.1, 1000);
//const camera = new THREE.OrthographicCamera( -aspectRatio, aspectRatio,1, -1, 0.1, 500);
camera.position.copy(cameraPosition[0]);
camera.lookAt(new THREE.Vector3(6, 8.75, 6));
camera.zoom = 1;
const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: false,
});
renderer.setClearColor(new THREE.Color(0x000000));
renderer.setSize(window.innerWidth, window.innerHeight);
//#####################################

// ### Controls ###
const controls = new OrbitControls(camera, renderer.domElement);
// ################

// ### Loaders ###
const textureLoader = new THREE.TextureLoader();
const normalTexture = textureLoader.load('texture/normalMapMetal6.png');
// ###############

// ### Meshes ###
const cubeGeo = new THREE.BoxGeometry(1,1,1);
const cubeMaterial = new THREE.MeshStandardMaterial({
    color: 0x1a1a1a,
    roughness: 0.2,
    metalness: 1,
    normalMap: normalTexture,
    transparent: true,
    opacity: 1
});

let particleCount = 5;
const particleCubes = new THREE.Object3D();
scene.add(particleCubes);
for(let x = 0; x < particleCount; x++){
    for(let y = 0; y < particleCount;y++){
        for(let z = 0; z < particleCount; z++){
            const mesh = new THREE.Mesh(cubeGeo, cubeMaterial);
            mesh.position.x = x + ( x / 2) * 3;
            mesh.position.y = y + ( y / 2) * 3;
            mesh.position.z = z + ( z / 2) * 3;
            particleCubes.add(mesh);
            console.log(mesh.position);
            mesh.name = `Mesh${x + "" + y + "" + z}`;
            console.log(mesh.name);


        }

    }
    
}
// ############

// ### Logo ###
let logoSprite = new THREE.TextureLoader().load("images/logoGross.png");
let logoMaterial = new THREE.SpriteMaterial({
    color: 0xffffff,
    map: logoSprite,
    fog: false
});

let logo = new THREE.Sprite(logoMaterial);
logo.scale.set(0.5,0.5,0.);
logo.position.set(6, 8.75, 6);
scene.add(logo);
// ############

// ### Audio ####
const audioContext = new AudioContext();

const audio = new Audio('audio/onYourWay.mp3');
const sourceNode = audioContext.createMediaElementSource(audio);
 const analyserNode = audioContext.createAnalyser();
 const frequencyData = new Float32Array(analyserNode.frequencyBinCount);

document.addEventListener('click', () => {
 sourceNode.connect(analyserNode);
 analyserNode.connect(audioContext.destination);
 audio.play();
})
// #############

// ### Lights ####
let pointLight = new THREE.PointLight(0xf70276, 200);
pointLight.position.set(11.35, 25, 13.5);
scene.add(pointLight);
const sphereSize = 1;
const pointLighthelper = new THREE.PointLightHelper(pointLight, sphereSize);
//scene.add(pointLighthelper);

let pointLight2 = new THREE.PointLight(0x2284fb, 200);
pointLight2.position.set(9, 25, 5);
scene.add(pointLight2);
const pointLighthelper2 = new THREE.PointLightHelper(pointLight2, sphereSize);
//scene.add(pointLighthelper2);

let ambientLight = new THREE.AmbientLight(0x999999);
scene.add(ambientLight);
// ##############

// ### Effect Composer ###
const renderPass = new RenderPass(scene, camera);
const composer = new EffectComposer(renderer);
const bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.5, 0.4, 0.85);
const filmpass = new FilmPass(0.1, 1,256, false);
bloomPass.threshold = 0;
bloomPass.strength = 2;
bloomPass.radius = 1.5;
composer.addPass(renderPass);
composer.addPass(bloomPass);
composer.addPass(filmpass);
// ########################

// ### getting the Div for our Canvas ###
//document.appendChild( renderer.domElement );
document.getElementById('renderCanvas').appendChild(renderer.domElement);
// ######################################

function renderScene() {
    updateCamera();
    console.log(camera.position);
    particleScale();
    cameraZoomToBeat();
    requestAnimationFrame(renderScene);
    //stats.update();
    camera.position.y -= 0.0035;
    camera.position.x -= 0.0035;
    //switchCameraPosition(camera, cameraPosition);
    controls.update()
    renderer.render(scene, camera);
    composer.render();
}
renderScene();


function updateCamera() {
    camera.updateProjectionMatrix();
}



function particleScale(){
    particleCubes.children.forEach((mesh) =>{
        let selectedCube = particleCubes.getObjectByName("Mesh" + (Math.floor(Math.random() * 5)) + Math.floor(Math.random() * 5) + Math.floor(Math.random() * 5) );
       analyserNode.getFloatFrequencyData(frequencyData);
       const averageFrequency = frequencyData.reduce((sum, value) =>  sum + value, 0) / frequencyData.length;
       selectedCube.scale.set((averageFrequency / 90), (averageFrequency / 90), (averageFrequency / 90));
       //mesh.rotation.x += Math.floor(Math.random());
       //console.log(Math.floor(Math.random() * 5));
       //console.log("Mesh"+(Math.floor(Math.random() * 5))+(Math.floor(Math.random() * 5))+(Math.floor(Math.random() * 5)));
    })
}

function cameraZoomToBeat(){
    analyserNode.getFloatFrequencyData(frequencyData);
    const averageFrequency = frequencyData.reduce((sum, value) =>  sum + value, 0) / frequencyData.length;
    camera.zoom = -2 * (averageFrequency/ 100);
}

function switchCameraPosition(camera, position){
    let index = 0;

    function switchPosition() {
        const randomIndex = Math.floor(Math.random() * cameraPosition.length);
        camera.position.copy(position[randomIndex]);
        camera.lookAt(logo);
        index = randomIndex;
    }

    switchPosition();
    setInterval(() => {
        let nextIndex = (index + 1) % cameraPosition.length;
        camera.position.copy(cameraPosition[nextIndex]);
        camera.lookAt(logo);
        index = nextIndex;
    }, 5000);
}
switchCameraPosition(camera, cameraPosition);

/* ### For blinking rec red dot ###
let dot = document.getElementById('dot');
let interval = setInterval(function(){
    if(dot.style.visibility === "visible")
    dot.style.visibility = 'hidden';
    else
        dot.style.visibility = 'visible';
}, 1000);
*/


// ### If the Windows gets resized ###
function onResize(event) {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener('resize', onResize, false);
// ###################################