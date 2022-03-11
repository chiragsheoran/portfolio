import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

function loadGLTF(url, callback, onProgress, onError) {
  const loader = new GLTFLoader();
  loader.load(
    url,
    callback,
    (xhr) => {
      console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
    },
    (error) => {
      console.log("An error happened");
    }
  );
}

export default loadGLTF;
