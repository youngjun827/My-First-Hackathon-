import './style.css'
import * as THREE from 'three';



/**
 * Base
 */




/*
* Scene
*/
const scene = new THREE.Scene();
scene.background = new THREE.Color( 0xFFE8DC);

/*
* Bowl
*/

const points = [];
for ( let i = 0; i < 10; i ++ ) {
	points.push( new THREE.Vector2( Math.sin( i * 0.2 ) * 10 + 5, ( i - 5 ) * 2 ) );
}


const textureLoader = new THREE.TextureLoader();
const normalTexture = textureLoader.load('/normal-map.jpeg');


const bowlGeometry = new THREE.LatheGeometry( points );
const bowlMaterial = new THREE.MeshStandardMaterial( {   
  // color: 0xA47449,
  color: 0x000000,
  // color: 0xFFFFFF,
  metalness: 0.7,
  roughness: 0.2,
  normalMap: normalTexture,
  emissive: 0xA47449,
} );


const lathe = new THREE.Mesh( bowlGeometry, bowlMaterial );
lathe.scale.set(0.2,0.2,0.2)
lathe.position.z = 3

scene.add( lathe );


/*
* Leaf
*/


const leafGeometry = new THREE.CircleGeometry( 1, 21, 5.5, 2.4 );
const leafMaterial = new THREE.MeshBasicMaterial( { color: 0x88ae35 } );
const circle = new THREE.Mesh( leafGeometry, leafMaterial );
circle.position.y = 5
circle.position.x = -0.4


const leafGeometry2 = new THREE.CircleGeometry( 1, 21, 5.5, 2.4 );
const leafMaterial2 = new THREE.MeshBasicMaterial( { color: 0x3a7104 } );
const circle2 = new THREE.Mesh( leafGeometry2, leafMaterial2 );
circle2.position.y = 2.3
circle2.position.x = 1

const leafGeometry3 = new THREE.CircleGeometry( 1, 21, 5.8, 2.4 );
const leafMaterial3 = new THREE.MeshBasicMaterial( { color: 0xbbd06f } );
const circle3 = new THREE.Mesh( leafGeometry3, leafMaterial3 );
circle3.position.y = 1.7
circle3.position.x = -1.7

const leafGeometry4 = new THREE.CircleGeometry( 1, 21, 5.8, 2.4 );
const leafMaterial4 = new THREE.MeshBasicMaterial( { color: 0x6c944c } );
const circle4 = new THREE.Mesh( leafGeometry4, leafMaterial4 );
circle4.position.y = 3.9
circle4.position.x = -1.7

const circle5 = circle3.clone();
circle5.position.set(0, 7, 0);


scene.add( circle, circle2, circle3, circle4, circle5 );


/*
* Unity Symbol
*/

const unityGeometry = new THREE.RingGeometry( 4.3, 5, 32 );
const unityMaterial = new THREE.MeshBasicMaterial( { color: 0x652A0E, side: THREE.DoubleSide } );
const mesh = new THREE.Mesh( unityGeometry, unityMaterial );
mesh.scale.set(0.3, 0.3 ,0.3)
mesh.position.set(-10, 3.5, 3)

const mesh2 = mesh.clone()
mesh2.scale.set(0.3, 0.3 ,0.3)
mesh2.position.set(-11, 2, 3)

const mesh3 = mesh.clone()
mesh3.scale.set(0.3, 0.3 ,0.3)
mesh3.position.set(-9, 2, 3)



const mesh4 = mesh.clone()
mesh4.scale.set(0.3, 0.3 ,0.3)
mesh4.position.set(10, -4, 2)

const mesh5 = mesh.clone()
mesh5.scale.set(0.3, 0.3 ,0.3)
mesh5.position.set(9, -5.5, 2)

const mesh6 = mesh.clone()
mesh6.scale.set(0.3, 0.3 ,0.3)
mesh6.position.set(11, -5.5, 2)


/*
const mesh7 = mesh.clone()
mesh7.scale.set(0.25, 0.25 ,0.25)
mesh7.position.set(-11, -8, 2)

const mesh8 = mesh.clone()
mesh8.scale.set(0.25, 0.25 ,0.25)
mesh8.position.set(-10.25, -9.5, 2)

const mesh9 = mesh.clone()
mesh9.scale.set(0.25, 0.25 ,0.25)
mesh9.position.set(-11.75, -9.5, 2)


const mesh10 = mesh.clone()
mesh10.scale.set(0.25, 0.25 ,0.25)
mesh10.position.set(10, -20, 2)

const mesh11 = mesh.clone()
mesh11.scale.set(0.25, 0.25 ,0.25)
mesh11.position.set(9.25, -21.5, 2)

const mesh12 = mesh.clone()
mesh12.scale.set(0.25, 0.25 ,0.25)
mesh12.position.set(10.75, -21.5, 2)
*/


scene.add( mesh, mesh2, mesh3, mesh4, mesh5, mesh6,/* mesh7, mesh8, mesh9, mesh10, mesh11, mesh12*/);
/*
* Camera
*/
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 5, 1000)
camera.position.setZ(20);


/*
* Renderer
*/
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#main-content')
})

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);


/*
* Light
*/
const pointLight = new THREE.PointLight(0xbf40BF);
pointLight.position.set(5, -28, 5, 5);

const pointLight2 = new THREE.PointLight(0x00ffff);
pointLight2.position.set(5, 5, 5);

scene.add( pointLight2);



/*
* Animation
*/


const animatedMeshes = [lathe]
const animatedMeshes2 = [circle, circle2, circle3, circle4, circle5]
const animatedMeshes3 = [mesh, mesh2, mesh3, mesh4, mesh5, mesh6] 

function animate() {
	requestAnimationFrame( animate );

  animatedMeshes.map(mesh => mesh.rotation.y += 0.005)
  animatedMeshes2.map(mesh => mesh.position.y -= 0.005)
  // animatedMeshes2.map(mesh => mesh.position.z -= 0.00009)
  animatedMeshes3.map(mesh => mesh.rotation.z += 0.05)




	renderer.render( scene, camera );
}
animate();

/*
* Camera
*/

const moveCamera = () => {
  const t = document.body.getBoundingClientRect().top;
  camera.position.z = t * 0.008 + 20;
  camera.position.y = t * 0.008;
  camera.rotation.x = t * 0.00095;
}

document.body.onscroll = moveCamera;