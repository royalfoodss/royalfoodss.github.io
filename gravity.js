import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.165/build/three.module.js";

/* ------------------------------
   Scene
------------------------------ */

const scene = new THREE.Scene();

/* ------------------------------
   Camera
------------------------------ */

const camera = new THREE.OrthographicCamera(
    -1,
     1,
     1,
    -1,
     0,
     1
);

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

});

/* ------------------------------
   Test Plane
------------------------------ */

const geometry = new THREE.PlaneGeometry(2,2);

const material = new THREE.MeshBasicMaterial({

    color:0x000000

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

    renderer.render(scene,camera);

}

animate();

console.log("Gravity Engine Started");
