import "../style.css";

import * as THREE from "three";
import loadGLTF from "./gltfLoader";
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

loadGLTF("../models/scene.gltf", (gltf) => {
  scene.add(gltf.scene);
  gltf.scene.scale.set(30, 30, 30);
  gltf.scene.position.setZ(-8);
  gltf.scene.position.setX(-3);
  gltf.scene.position.setY(-2);
  gltf.scene.rotation.x += -0.5;
  gltf.scene.rotation.y += -0.4;
  gltf.scene.rotation.z += -0.3;
  gltf.animations; // Array<THREE.AnimationClip>
  gltf.scene; // THREE.Group
  gltf.scenes; // Array<THREE.Group>
  gltf.cameras; // Array<THREE.Camera>
  gltf.asset; // Object
});

loadGLTF("../models/arduino/scene.gltf", (gltf) => {
  scene.add(gltf.scene);
  gltf.scene.scale.set(10, 10, 10);
  gltf.scene.position.setZ(-16);
  gltf.scene.position.setX(-15);
  gltf.scene.position.setY(-5);
  gltf.scene.rotation.x += -2.5;
  gltf.scene.position.z += 0.4;
  gltf.scene.rotation.y += 0.9;
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

const spaceTexture = new THREE.TextureLoader().load("../space.jpg");
scene.background = spaceTexture;

// const geometry = new THREE.TorusGeometry(10, 3, 16, 100)
// const material = new THREE.MeshStandardMaterial({ color: 0xFF6347 });
// const torus = new THREE.Mesh(geometry, material);

// scene.add(torus)

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(-2, 2, -20);

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

const chiragTexture = new THREE.TextureLoader().load("../cube.jpg");

const chirag = new THREE.Mesh(
  new THREE.BoxGeometry(10, 10, 10),
  new THREE.MeshStandardMaterial({
    map: chiragTexture,
  })
);

scene.add(chirag);

chirag.position.setZ(30);
chirag.position.setX(-10);

const maskkTexture = new THREE.TextureLoader().load("../maskkmat.jpeg");

const maskk = new THREE.Mesh(
  new THREE.BoxGeometry(6, 6, 6),
  new THREE.MeshStandardMaterial({
    map: maskkTexture,
  })
);

scene.add(maskk);

maskk.position.setZ(-50);
maskk.position.setX(12);

const gunTexture = new THREE.TextureLoader().load("../gunmatt.jpeg");

const gun = new THREE.Mesh(
  new THREE.BoxGeometry(6, 6, 6),
  new THREE.MeshStandardMaterial({
    map: gunTexture,
  })
);

scene.add(gun);

const pythonTexture = new THREE.TextureLoader().load("../pythonmat.png");

const python = new THREE.Mesh(
  new THREE.BoxGeometry(3, 3, 3),
  new THREE.MeshStandardMaterial({
    map: pythonTexture,
  })
);

scene.add(python);

python.position.setZ(-20);
python.position.setX(-23);
python.position.setY(-8);

const jsTexture = new THREE.TextureLoader().load("../jsmat.png");

const js = new THREE.Mesh(
  new THREE.BoxGeometry(2, 2, 2),
  new THREE.MeshStandardMaterial({
    map: jsTexture,
  })
);

scene.add(js);

js.position.setZ(-18);
js.position.setX(-2);
js.position.setY(-6);

const kaliTexture = new THREE.TextureLoader().load("../kalimat.jpg");
const kali = new THREE.Mesh(
  new THREE.BoxGeometry(5, 5, 5),
  new THREE.MeshStandardMaterial({
    map: kaliTexture,
  })
);

scene.add(kali);

kali.position.setZ(-12);
kali.position.setX(-14);
kali.position.setY(5);

gun.position.setZ(-55);
gun.position.setX(13);
gun.position.setY(-8);

function animate() {
  requestAnimationFrame(animate);

  // torus.rotation.x += 0.01;
  // torus.rotation.y += 0.005;
  // torus.rotation.z += 0.01;

  gun.rotation.y += 0.01;
  //gun.rotation.z += 0.002;

  kali.rotation.x += 0.01;
  kali.rotation.z += 0.002;

  python.rotation.z -= 0.01;
  python.rotation.x += 0.01;

  js.rotation.y += 0.01;
  js.rotation.x -= 0.01;

  //maskk.rotation.z += 0.01;
  maskk.rotation.y += 0.01;

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
