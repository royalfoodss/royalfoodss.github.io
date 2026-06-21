import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.165/build/three.module.js";

import {

vertexShader,

fragmentShader

} from "./shaders.js";

/* ------------------------------
   Scene
------------------------------ */

const scene = new THREE.Scene();

/* ------------------------------
   Camera
------------------------------ */

const camera = new THREE.PerspectiveCamera(

45,

window.innerWidth / window.innerHeight,

0.1,

100

);

camera.position.z = 2.5;
/* ------------------------------
   Renderer
------------------------------ */

const renderer = new THREE.WebGLRenderer({

    alpha:true,
    antialias:true

});

renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));

renderer.setSize(window.innerWidth,window.innerHeight);

/* ------------------------------
   Canvas Position
------------------------------ */

renderer.domElement.style.position="fixed";

renderer.domElement.style.left="0";

renderer.domElement.style.top="0";

renderer.domElement.style.zIndex="0";

renderer.domElement.style.pointerEvents="none";

document.body.appendChild(renderer.domElement);

/* ------------------------------
   Resize
------------------------------ */

window.addEventListener("resize",()=>{

    renderer.setSize(

        window.innerWidth,

        window.innerHeight

    );

    camera.aspect =
        window.innerWidth /
        window.innerHeight;

    camera.updateProjectionMatrix();

});
/* ------------------------------
   Test Plane
------------------------------ */

const geometry = new THREE.PlaneGeometry(
    2,
    2,
    250,
    250
);

const uniforms = {

    uResolution:{
        value:new THREE.Vector2(
            window.innerWidth,
            window.innerHeight
        )
    },

    uMouse:{
        value:new THREE.Vector2(.5,.5)
    },

    uTime:{
        value:0
    }

};

const material = new THREE.ShaderMaterial({

    uniforms,

    vertexShader,

    fragmentShader

});
const plane = new THREE.Mesh(

    geometry,

    material

);

scene.add(plane);

/* ------------------------------
   Animation
------------------------------ */

function animate(){

    requestAnimationFrame(animate);

   uniforms.uTime.value += 0.003;

    renderer.render(scene,camera);

}

animate();

console.log("Gravity Engine Started");
