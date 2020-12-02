let scene, camera, renderer, skyboxGeo, skybox, myReq;

function createMaterialArray() {
  const skyboxImagepaths = ([
    '../img/sky/ft.png',
    '../img/sky/bk.png',
    '../img/sky/up.png',
    '../img/sky/dn.png',
    '../img/sky/rt.png',
    '../img/sky/lf.png'
  ]);
  const materialArray = skyboxImagepaths.map(image => {
    let texture = new THREE.TextureLoader().load(image);

    return new THREE.MeshBasicMaterial({ map: texture, side: THREE.BackSide });
  });
  return materialArray;
}

function init() {

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    55,
    window.innerWidth / window.innerHeight,
    45,
    30000,
  );
  camera.position.set(1200, -250, 2000);

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.domElement.id = 'canvas';
  document.body.appendChild(renderer.domElement);

  const materialArray = createMaterialArray();

  skyboxGeo = new THREE.BoxGeometry(10000, 10000, 10000);
  skybox = new THREE.Mesh(skyboxGeo, materialArray);

  scene.add(skybox);

  window.addEventListener('resize', onWindowResize, false);
  animate();
}
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;

  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {

  skybox.rotation.x += 0.001;
  skybox.rotation.y += 0.001;

  renderer.render(scene, camera);
  myReq = window.requestAnimationFrame(animate);
   
}

init();
