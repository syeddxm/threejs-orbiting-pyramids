// set up scene
var scene = new THREE.Scene();

// set up initial camera
var camera = new THREE.PerspectiveCamera( 25, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.set(0,50,250);
camera.lookAt(0,0,0);

//set up renderer
var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// set up light
var light = new THREE.PointLight( 0x404040, 5 ); // soft white light
light.position.set( 0, 500, 0 );
light.lookAt(0,0,0)

// set up light
var light2 = new THREE.PointLight( 0x404040, 5 ); // soft white light
light.position.set( 0, 5, -5 );
light.lookAt(0,0,0)

/*
    SCENE COMPONENTS
*/

// dxm pyramid
var dxmgeometry = new THREE.ConeGeometry( 10, 10, 4 );
var texture = new THREE.TextureLoader().load( 'images/dxmlogo.png' );
var dxmmaterial = new THREE.MeshBasicMaterial( { color: 'yellow' } );

// set up dxm pyramid faces
for(var i=0; i< dxmgeometry.faces.length;i++){
    dxmgeometry.faceVertexUvs[0][i][0] = new THREE.Vector2(0, 0);
    dxmgeometry.faceVertexUvs[0][i][1] = new THREE.Vector2(1, 0);
    dxmgeometry.faceVertexUvs[0][i][2] = new THREE.Vector2(0.5, 1);
}

// set up dxm logo on pyramid faces
var materials = [
    new THREE.MeshBasicMaterial( { map: texture } ),
    new THREE.MeshBasicMaterial( { map: texture } ),
    new THREE.MeshBasicMaterial( { color: 'black' } )
];

// MESH geometry with materials
var dxm = new THREE.Mesh(dxmgeometry, materials);

var controls = new THREE.OrbitControls( camera, renderer.domElement );
controls.update();

// add items to scene
scene.add( light );
scene.add(dxm);



var cubes = [];
var cubeGroup = new THREE.Group();


var axis = new THREE.Vector3(1,0,0);
var angle = Math.PI / 72;


for(i = 0; i < 2000; i++){
    
    var settings = randomTriangle();
    var geometry = new THREE.ConeGeometry( 1,settings.height,3);
    var material = new THREE.MeshBasicMaterial( { color: settings.color } )
    var cube = new THREE.Mesh( geometry, material );
    cube.position.set(settings.x,settings.y,settings.z);
    cube.rotation.x = settings.rotX;
    cube.rotation.y = settings.rotY;
    cubeGroup.add(cube)
    cubes.push(cube);
}
scene.add( cubeGroup );



var lastScrollTop = window.pageYOffset;

    // Helpers
    axes = new THREE.AxisHelper(50);
    helper = new THREE.GridHelper(1000, 10);
    helper.setColors(0x0000ff, 0x808080);
    scene.add(axes);
    scene.add(helper);

window.addEventListener('scroll', function(e) {
    e.preventDefault();
    console.log(lastScrollTop);
    console.log(window.pageYOffset);

    if(window.pageYOffset > lastScrollTop){
        console.log('down');  
        var from = {
            x : camera.position.x,
            y : camera.position.y,
            z : camera.position.z
        };
        
        var to = {
            x : 0,
            y : -50,
            z : 0
        };

        var tween = new TWEEN.Tween(from)
        .to(to, 2000)
        .easing(TWEEN.Easing.Linear.None)
        .onUpdate(function () {
            console.log('x:'+this.x + "y:" + this.y)
            camera.position.set(this.x, this.y, this.z);
            camera.lookAt(new THREE.Vector3(0, this.y-5, 0));
        })
        .onComplete(function () {
            //camera.lookAt(new THREE.Vector3(0, 0, 0));
        })
        .start();

    } else if (window.pageYOffset < lastScrollTop){
        console.log('up');
        var from = {
            x : camera.position.x,
            y : camera.position.y,
            z : camera.position.z
        };
        
        var to = {
            x : 0,
            y : 50,
            z : 250
        };

        var tween = new TWEEN.Tween(from)
        .to(to, 2000)
        .easing(TWEEN.Easing.Linear.None)
        .onUpdate(function () {
            camera.position.set(this.x, this.y, this.z);
            camera.lookAt(new THREE.Vector3(0, 0, 0));
        })
        .onComplete(function () {
            camera.lookAt(new THREE.Vector3(0, 0, 0));
        })
        .start();
    }
    lastScrollTop = window.pageYOffset;
});

function randomTriangle(){
    var posClr = { 
        radius: Math.floor(Math.random() * (1) + 1),
        height: Math.floor(Math.random() * (1) + 2),
        rotX: Math.floor(Math.random() * (2) - 1),
        rotY: Math.floor(Math.random() * (2) - 1),
        x: Math.floor(Math.random() * (500 + 1) - 250),
        y: Math.floor(Math.random() * (500 + 1) - 250),
        z: Math.floor(Math.random() * (500 + 1) - 250),
        color: randomColor()
    }
    return posClr;
}



function randomColor(){
    var random = Math.floor(Math.random() * (15) + 1);
    switch (random){
        //purple
        case 1:
            return 0xc04495;
            break;
        case 2:
            return 0x8c3071;
            break;
        case 3: 
            return 0x9a459a;
            break;
        // blue
        case 4:
            return 0x4fc6ef;
            break;
        case 5:
            return 0x48adb7;
            break;
        case 6:
            return 0x4cb9d4;
            break;
        case 7:
            return 0x3a8fa5;
            break;
        //yellow
        case 8:
            return 0xf39932;
            break;
        case 9:
            return 0xf07331;
            break;
        case 10:
            return 0xf6b332;
            break;
        case 11:
            return 0xf9b21a;
            break;
        //red
        case 12:
            return 0xda4143;
            break;
        case 13:
            return 0xec4855;
            break;
        case 14:
            return 0xea453b;
            break;
        case 15:
            return 0x8f2832;
            break;
    }

}

var loader = new THREE.GLTFLoader();

loader.load( '../models/scene.gltf', function ( gltf ) {

    gltf.scene.scale.set(5,5,5)
	scene.add( gltf.scene );

}, undefined, function ( error ) {

	console.error( error );

} );

function animate() {
    cubeGroup.rotation.y += 0.005;
    cubeGroup.children.forEach(((cube) =>{ 
        cube.rotation.x += Math.random() * 0.05;
        cube.rotation.y += Math.random() * 0.05  ;
        cube.rotation.z += Math.random() * 0.05;
    }))
    controls.update();

    TWEEN.update();
    requestAnimationFrame( animate );
    renderer.render( scene, camera );

}


animate();