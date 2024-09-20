import * as THREE from 'three';
import { RenderPass } from '/node_modules/three/examples/jsm/postprocessing/RenderPass';
import { RenderPixelatedPass } from '/node_modules/three/examples/jsm/postprocessing/RenderPixelatedPass';
import { EffectComposer } from '/node_modules/three/examples/jsm/postprocessing/EffectComposer';
import { UnrealBloomPass } from '/node_modules/three/examples/jsm/postprocessing/UnrealBloomPass';
import { HalftonePass } from '/node_modules/three/examples/jsm/postprocessing/HalftonePass';
import { SAOPass } from '/node_modules/three/examples/jsm/postprocessing/SAOPass'
import { TrackballControls } from '/node_modules/three/examples/jsm/controls/TrackballControls'
import { FilmPass } from  'three/examples/jsm/postprocessing/FilmPass'

const mouse = new THREE.Vector2();
const target = new THREE.Vector2();
const windowHalf = new THREE.Vector2(window.innerWidth / 2, window.innerHeight / 2);
//const resolution = new THREE.Vector2(window.innerWidth, window.innerHeight);

const aspectRatio = window.innerWidth / window.innerHeight;

const center = new THREE.Vector3(0, 0, 0);
const cameraPosition = new THREE.Vector3(0, 25, 120);
const cameraTarget = center;

const fogcolor = 0x000000;
const scene = new THREE.Scene();
scene.fog = new THREE.Fog(fogcolor, 10, 170);
const camera = new THREE.PerspectiveCamera(150, 1920 / 1080, 0.1, 2000);
//const camera = new THREE.OrthographicCamera(- aspectRatio, aspectRatio, 1, -1, 0.1, 500)
camera.position.copy(cameraPosition);
camera.lookAt(cameraTarget);
camera.zoom = 14;
const renderer = new THREE.WebGLRenderer({
  antialias: true,
  alpha: false,
});
renderer.setClearColor(new THREE.Color(0x000000));
renderer.setSize(window.innerWidth, window.innerHeight);
const controls = new TrackballControls(camera, renderer.domElement);
controls.update();

// Postprocessing
/*const renderPass = new RenderPass(scene, camera);
const pixelatedPass = new RenderPixelatedPass(10, scene, camera);
const unrealBloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 0.1, 0.002, 0.5);
const halftonePass = new HalftonePass(800, 600, {
    shape: 1,
    radius: 0.1,
    rotateR: Math.PI / 4,
    rotateB: Math.PI / 12 * 2,
    rotateG: -Math.PI / 2,
    scatter: 4,
    blending: THREE.NormalBlending,
    greyscale: false,
    disable: false
  });
const saoPass = new SAOPass(scene, camera);
saoPass.params.output = SAOPass.OUTPUT.Default;
saoPass.params.saoBias = 2;
saoPass.params.saoIntensity = 0.0002;
saoPass.params.saoScale = 20;
saoPass.params.saoKernelRadius = 5;
saoPass.params.saoMinResolution = 0;
const composer = new EffectComposer(renderer);
composer.addPass(renderPass);
//composer.addPass(unrealBloomPass);
//composer.addPass(saoPass);
//composer.addPass(halftonePass);
composer.addPass(pixelatedPass);
pixelatedPass.normalEdgeStrength = 0.5;
pixelatedPass.depthEdgeStrength = 0.5;
pixelatedPass.setPixelSize(0.8);*/


const particle = new THREE.Object3D();
scene.add(particle);

const textureLoader = new THREE.TextureLoader();
const normalTexture = textureLoader.load('texture/normalMapMetal2.png');
const logoTexture = textureLoader.load('images/logoGross.png');

var fadeColor;

const geometry = new THREE.SphereBufferGeometry(9, 4, 4);
const material = new THREE.MeshStandardMaterial({
  color: 0x1f1f1f,
  roughness: 0.005,
  metalness: 1.0,
  transparent: true,
  opacity: 0.9,
  normalMap: normalTexture,
});

var splash = 10;
const particleCount = 400;

for (let i = 0; i < particleCount; i++) {
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
  particle.add(mesh);
}

 

    let textureGroup = new THREE.Mesh();
    let cubeMaterial = [];
    cubeMaterial.push(new THREE.MeshStandardMaterial({
        color: 0x8f8afe,
        //map: normalTexture,
        roughness: 0.5,
        metalness: 0.5,
        emissive: 0xff0000,
        emissiveIntensity: 3.0,
        fog: true
    }));
    cubeMaterial.push(new THREE.MeshStandardMaterial({
        color: 0x8f8afe,
        //map: normalTexture,
        roughness: 0.5,
        metalness: 0.5,
        emissive: 0xff0000,
        emissiveIntensity: 3.0,
        fog: true
    }));
    cubeMaterial.push(new THREE.MeshStandardMaterial({
        color: 0x8f8afe,
        //map: normalTexture,
        roughness: 0.5,
        metalness: 0.5,
        emissive: 0xff0000,
        emissiveIntensity: 3.0,
        fog: true
    }));
    cubeMaterial.push(new THREE.MeshStandardMaterial({
        color: 0x8f8afe,
        //map: normalTexture,
        roughness: 0.5,
        metalness: 0.5,
        emissive: 0x8f8afe,
        emissiveIntensity: 3.0,
        fog: true
    }));
    cubeMaterial.push(new THREE.MeshStandardMaterial({
        color: 0x8f8afe,
        //map: normalTexture,
        roughness: 0.5,
        metalness: 0.5,
        emissive: 0x8f8afe,
        emissiveIntensity: 3.0,
        fog: true
    }));
    cubeMaterial.push(new THREE.MeshStandardMaterial({
        color: 0x8f8afe,
        //map: normalTexture,
        roughness: 0.5,
        metalness: 0.5,
        emissive: 0x8f8afe,
        emissiveIntensity: 3.0,
        fog: true
    }));





    let cubeGeometry;
    let cubeMesh;

    for (let x = 0; x < 1; x++) {
        for (let y = 0; y < 1; y++) {
            for (let z = 0; z < 1; z++) {
                cubeGeometry = new THREE.BoxBufferGeometry(5, 11, 11);
                cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial);
                //cubeMesh.name = `Mesh${i}`;
                textureGroup.add(cubeMesh);
            }
        }
    }

    /*scene.add(cubeMesh);
    cubeMesh.position.set(0,0,0);
    cubeMesh.rotation.set(Math.PI / 6,Math.PI / 4, 0);*/


    // ### Logos Sprites etc ###
    /*let planeGeo = new THREE.BoxBufferGeometry(20, 20, 0);
    let planeMesh = new THREE.Mesh(planeGeo, cubeMaterial);
    scene.add(planeMesh);
    planeMesh.rotation.set(Math.PI / 3, 0, Math.PI / 4);
    planeMesh.position.set(0, -28, 0);*/


    let logoSprite = new THREE.TextureLoader().load("images/logoGross.png");
    let logoMaterial = new THREE.SpriteMaterial({
        color: 0xffffff,
        map: logoSprite,
        fog: false
    });

  /*
    /*let strichMaterialSchraegLinks = new THREE.SpriteMaterial({
        color: 0xffffff,
        map: strichSprite,
        fog:false,
        rotation:- Math.PI / 4
    })

    let strichMaterialSchraegRechts = new THREE.SpriteMaterial({
        color: 0xffffff,
        map: strichSprite,
        fog: false,
        rotation: Math.PI / 4
    })*/

    
    let logo = new THREE.Sprite(logoMaterial);
    logo.name = "logo";
    logo.scale.set(30, 30, 30);
    logo.position.set(0,0,0);
    scene.add(logo);

   /* let strichUnten = new THREE.Sprite(strichMaterial);
    strichUnten.scale.set(1, 10, 0);
    strichUnten.position.set(0, -50, -50);
    scene.add(strichUnten);

    let strichOben = new THREE.Sprite(strichMaterial);
    strichOben.scale.set(1, 10, 0);
    strichOben.position.set(0, 45, 0);
    scene.add(strichOben);

    let strichRechts = new THREE.Sprite(strichMaterial);
    strichRechts.scale.set(10,1,0);
    strichRechts.position.set(25,0,0);
    scene.add(strichRechts);

    let strichLinks = new THREE.Sprite(strichMaterial);
    strichLinks.scale.set(10,1,0);
    strichLinks.position.set(-25,0,0);
    scene.add(strichLinks);*/

    

    /*let strichSchraegLinks = new THREE.Sprite(strichMaterialSchraegLinks);
    strichSchraegLinks.scale.set(10,1,0);
    strichSchraegLinks.position.set(-17.5, 25, 0);
    scene.add(strichSchraegLinks);

    let strichSchraegRechts = new THREE.Sprite(strichMaterialSchraegRechts);
    strichSchraegRechts.scale.set(10,1,0);
    strichSchraegRechts.position.set(17.5,25, 0);
    scene.add(strichSchraegRechts);*/
  //##############################

    // ##### Audio #####
   const audioContext = new AudioContext();
   const audio = new Audio('audio/MontrealF1.mp3');
   const sourceNode = audioContext.createMediaElementSource(audio);
    const analyserNode = audioContext.createAnalyser();
    const frequencyData = new Float32Array(analyserNode.frequencyBinCount);

   document.addEventListener('click', () => {
    
    sourceNode.connect(analyserNode);
    analyserNode.connect(audioContext.destination);
    audio.play();
    
   }) 

   // ##########################


    //const analyser = new THREE.AudioAnalyser(sound, 256);
    var lightPower = 100;
    const lHsize = 3;

    //türkis
    let pointLightPink = new THREE.PointLight(0x3388aa, lightPower);
    pointLightPink.position.x = 70;
    pointLightPink.position.y = 10;
    pointLightPink.position.z = -5;
    const plHelperPink = new THREE.PointLightHelper(pointLightPink, lHsize);
    //scene.add(plHelperPink);
    //scene.add(pointLightPink);

    //weiß
    let pointLightGreen = new THREE.PointLight(0xffffff, lightPower);
    pointLightGreen.position.x = 20;
    pointLightGreen.position.y = 10;
    pointLightGreen.position.z = 40;
    const plHelperGreen = new THREE.PointLightHelper(pointLightGreen, lHsize);
    //scene.add(plHelperGreen);
    //scene.add(pointLightGreen);

    //
    let pointLightPurple = new THREE.PointLight(0xaa22ff , lightPower);
    pointLightPurple.position.x = -80;
    pointLightPurple.position.y = 20;
    pointLightPurple.position.z = 0;
    const plHelperPurple = new THREE.PointLightHelper(pointLightPurple, lHsize);
    //scene.add(plHelperPurple);
    //scene.add(pointLightPurple);

    /*let pointLightRed = new THREE.PointLight(0x5a26eb, 50);
    pointLightRed.position.x = -20;
    pointLightRed.position.y = 20;
    pointLightRed.position.z = 0;
    scene.add(pointLightRed);*/

    let pointLightWhite = new THREE.PointLight(0xffffff, lightPower);
    pointLightWhite.position.set(0,10,5);
    const pLHelperWhite = new THREE.PointLightHelper(pointLightWhite, lHsize);
    //scene.add(pLHelperWhite);
    //scene.add(pointLightWhite);

    const lightGroup = new THREE.Group();
    lightGroup.add(pointLightGreen);
    lightGroup.add(pointLightPink);
    lightGroup.add(pointLightPurple);
    lightGroup.add(pointLightWhite);
    scene.add(lightGroup);

    let directionalLight = new THREE.DirectionalLight(0xffffff, lightPower);
    scene.add(directionalLight);
    const dLHelper = new THREE.DirectionalLight(directionalLight, lHsize);
    //scene.add(dLHelper);
    directionalLight.lookAt(0,100,20);
    //directionalLight.target(logo);

    var ambientLight = new THREE.AmbientLight(0xffffff);
    scene.add(ambientLight);

    //const composer = new THREE.EffectComposer(renderer);
    //const renderPass = new THREE.RenderPass(scene, camera);

    const renderPass = new RenderPass(scene, camera);
const composer = new EffectComposer(renderer);
const bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.5, 0.4, 0.85);
const filmpass = new FilmPass(0.1, 1,256, false);
bloomPass.threshold = 0.5;
bloomPass.strength = 0.4;
bloomPass.radius = 0.8;
composer.addPass(renderPass);
composer.addPass(bloomPass);
composer.addPass(filmpass);

    // add the output of the renderer to the html element
    document.getElementById("renderCanvas").appendChild(renderer.domElement);
    document.body.appendChild( renderer.domElement );


    

    function renderScene() {
        updateCamera();
        //stats.update();
        particle.rotation.y += 0.001 * Math.random() - 0.005;
        particle.rotation.x += 0.001 * Math.random() + 0.005;
        particle.rotation.z -= 0.001 * Math.random() + 0.005;

        lightGroup.rotation.y -= 0.005;
        lightGroup.rotation.x -= 0.005;
        lightGroup.rotation.z -= 0.005;
        //cubeMesh.rotation.y += 0.003;
        //planeMesh.rotation.z += 0.003;
        //updateGeometryScale();
        logoScale();
        updateRotation();
        //cameraZoomToBeat();      
       // turnAroundToMusPart()
        moveToBeatParticles();
        controls.update();
        //updateCameraPosition()
        //lightPowerToBeat();
        //changeSplash();
       
     
        

        //###########################################################
        //To move the 3D meshes around but its not working in iframes
        /*target.x = (1 - mouse.x) * 0.002;
        target.y = (1 - mouse.y) * 0.002;
        camera.rotation.x += 0.004 * (target.y - camera.rotation.x);
        camera.rotation.y += 0.004 * (target.x - camera.rotation.y);*/
    
        //###########################################################
        requestAnimationFrame(renderScene);
        

        renderer.render(scene, camera);
        composer.render();
    }
    // call the render function
    renderScene();

    function updateCamera() {
        camera.updateProjectionMatrix();
    }

    function onResize(event) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }
    window.addEventListener('resize', onResize, false);

    function updateGeometryScale(){
        analyserNode.getFloatFrequencyData(frequencyData);
        const averageFrequency = frequencyData.reduce((sum, value) =>  sum + value, 0) / frequencyData.length;
        cubeMesh.scale.set((averageFrequency + 80) / 15, (averageFrequency + 80) / 15, (averageFrequency + 80) / 15);
        //planeMesh.scale.set(averageFrequency / 75, averageFrequency / 75, averageFrequency / 75);
    }

    function logoScale(){
        analyserNode.getFloatFrequencyData(frequencyData);
        const averageFrequency = frequencyData.reduce((sum, value) =>  sum + value, 0) / frequencyData.length;
        logo.scale.set((averageFrequency + 5) / 5, (averageFrequency + 5) / 5, (averageFrequency + 5) / 5);
        //planeMesh.scale.set(averageFrequency / 75, averageFrequency / 75, averageFrequency / 75);
    }



    function cameraZoomToBeat(){
        analyserNode.getFloatFrequencyData(frequencyData);
        const averageFrequency = frequencyData.reduce((sum, value) =>  sum + value, 0) / frequencyData.length;
        camera.zoom = -1 * (averageFrequency / 8);
    }

    function lightPowerToBeat(){
        analyserNode.getFloatFrequencyData(frequencyData);
        const averageFrequency = frequencyData.reduce((sum, value) => sum + value, 0) / frequencyData.length;
        lightPower = -10 * (averageFrequency / 7);
        console.log(lightPower);
    }

   /* function changeSplash(){
        analyserNode.getFloatFrequencyData(frequencyData);
        const averageFrequency = frequencyData.reduce((sum, value) => sum + value, 0) / frequencyData.length;
        splash = -5 * (averageFrequency / 5);
        console.log(splash);
    }*/



    function updateCameraPosition(){
        let angle = 100;
        let speed = 10;
        let radius = 360;
        angle += speed;

        const x = center.x + radius * Math.sin(angle);
        const z = center.z + radius * Math.cos(angle);
        const newPosition = new THREE.Vector3(x, cameraPosition.y, z);
        camera.position.copy(newPosition);
        console.log("X: " + x + "Z: " + z);
        camera.lookAt(cameraTarget);

        requestAnimationFrame(updateCameraPosition);
    }

    function updateRotation(){
       
particle.children.forEach((mesh) =>{
        const randomXRotation = THREE.MathUtils.randFloat(-Math.PI, Math.PI);
        const randomYRotation = THREE.MathUtils.randFloat(-Math.PI, Math.PI);
        const randomZRotation = THREE.MathUtils.randFloat(-Math.PI, Math.PI);
        const randomXValue = 0.005 * Math.random() - 0.001;
        const randomYValue = 0.005 * Math.random() + 0.001;
        const randomZValue = 0.005 * Math.random() - 0.001;
        //mesh.rotation.set(randomXRotation, randomYRotation, randomZRotation);
        mesh.rotation.y -= 0.001;
        mesh.rotation.x += 0.001;
        mesh.rotation.z -= 0.001;
        console.log(randomXValue + " _ " + randomYValue + " _ " + randomZValue);
    });
}


// Zappelfische Particles ...
/*function turnAroundToMusPart(){
    particle.children.forEach((mesh) =>{
        analyserNode.getFloatFrequencyData(frequencyData);
    const averageFrequency = frequencyData.reduce((sum, value) =>  sum + value, 0) / frequencyData.length;
    mesh.rotation.set((0.1 * averageFrequency) / 20 * Math.random(),(0.1 *  averageFrequency) / 20 * Math.random(), (0.1 * averageFrequency) / 20 * Math.random());
    console.log(averageFrequency / 2 * Math.random());
    console.log("Average Frequency: " + averageFrequency)
    })
}*/



    // Particles sclaing to music frequencies ....
    function moveToBeatParticles(){
        particle.children.forEach((mesh) =>{
            analyserNode.getFloatFrequencyData(frequencyData);
        const averageFrequency = frequencyData.reduce((sum, value) =>  sum + value, 0) / frequencyData.length;
        mesh.scale.set((averageFrequency + 100) / 45, (averageFrequency + 100) / 45, (averageFrequency + 100) / 45);
        })
    }



   /* function updateVariable() {
        const frequencyData = analyser.getFrequencyData();
        const lowerBand = 0;
        const upperBand = 500;
        const bandData = frequencyData.slice(lowerBand, upperBand);

        const amplitudeSum = bandData.reduce((acc, val) => acc + val);
        const averageAmplitude = amplitudeSum / bandData.length;

        splash = averageAmplitude / 2;
        console.log(splash);
    }*/

   /* function onMouseMove(event) {
        mouse.x = (event.clientX - windowHalf.x);
        mouse.y = (event.clientY - windowHalf.x);
    }
    window.addEventListener("mousemove", onMouseMove);*/