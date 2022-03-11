import "./style.css";

import * as THREE from "three";
import loadGLTF from "./gltfLoader";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});

loadGLTF("./models/scene.gltf", (gltf) => {
  scene.add(gltf.scene);
  gltf.scene.scale.set(25, 25, 25);
  gltf.scene.position.setZ(-20);
  gltf.scene.position.setX(-2);
  gltf.scene.position.setY(-2);
  gltf.scene.rotation.z += 3;
  gltf.animations; // Array<THREE.AnimationClip>
  gltf.scene; // THREE.Group
  gltf.scenes; // Array<THREE.Group>
  gltf.cameras; // Array<THREE.Camera>
  gltf.asset; // Object
});

loadGLTF("./models/arduino/scene.gltf", (gltf) => {
  scene.add(gltf.scene);
  gltf.scene.position.setZ(-40);
  gltf.animations; // Array<THREE.AnimationClip>
  gltf.scene; // THREE.Group
  gltf.scenes; // Array<THREE.Group>
  gltf.cameras; // Array<THREE.Camera>
  gltf.asset; // Object
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
// camera.position.setZ(30);

renderer.render(scene, camera);

const spaceTexture = new THREE.TextureLoader().load("space.jpg");
scene.background = spaceTexture;

// const geometry = new THREE.TorusGeometry(10, 3, 16, 100)
// const material = new THREE.MeshStandardMaterial({ color: 0xFF6347 });
// const torus = new THREE.Mesh(geometry, material);

// scene.add(torus)

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(-2, 1, -20);

const ambientLight = new THREE.AmbientLight(0xffffff);

// const lightHelper = new THREE.PointLightHelper(pointLight)

// scene.add(pointLight, ambientLight, lightHelper)
scene.add(pointLight, ambientLight);

const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));
  star.position.set(x, y, z);
  scene.add(star);
}

const chiragTexture = new THREE.TextureLoader().load("cube.jpg");

const chirag = new THREE.Mesh(
  new THREE.BoxGeometry(10, 10, 10),
  new THREE.MeshStandardMaterial({
    map: chiragTexture,
  })
);

scene.add(chirag);

chirag.position.setZ(30);
chirag.position.setX(-10);

const maskkTexture = new THREE.TextureLoader().load("maskkmat.jpeg");

const maskk = new THREE.Mesh(
  new THREE.BoxGeometry(12, 12, 12),
  new THREE.MeshStandardMaterial({
    map: maskkTexture,
  })
);

scene.add(maskk);

maskk.position.setZ(-55);
maskk.position.setX(15);

const gunTexture = new THREE.TextureLoader().load("gunmatt.jpeg");

const gun = new THREE.Mesh(
  new THREE.BoxGeometry(15, 15, 15),
  new THREE.MeshStandardMaterial({
    map: gunTexture,
  })
);

scene.add(gun);

gun.position.setZ(-20);
gun.position.setX(-15);
gun.position.setY(15);

function animate() {
  requestAnimationFrame(animate);

  // torus.rotation.x += 0.01;
  // torus.rotation.y += 0.005;
  // torus.rotation.z += 0.01;

  gun.rotation.x += 0.01;
  gun.rotation.y += 0.005;

  maskk.rotation.x += 0.01;
  maskk.rotation.y += 0.002;

  chirag.rotation.y += 0.005;
  chirag.rotation.z += 0.001;

  controls.update();
  renderer.render(scene, camera);
}

function moveCamera() {
  let t = document.body.getBoundingClientRect().top;
  console.log(chirag.position.z);
  if (t < 0) {
    camera.position.z = t * 0.04;
    camera.position.x = t * -0.0002;
    camera.rotation.y = t * -0.0002;
  }
  //adddronemovementcoord

  //chirag.position.z += t;
  //chirag.rotation.y += 0.01;
  //chirag.rotation.z += 0.01;
}

document.body.onscroll = moveCamera;

animate();

Array(200).fill().forEach(addStar);
