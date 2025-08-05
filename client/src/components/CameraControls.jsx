import * as THREE from 'three';
import {useEffect,useRef} from 'react';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'; 

export default function CameraControls(){

    const mountRef = useRef(null);

    useEffect(()=>{
        const mount = mountRef.current;

        if(!mount){
            return;
        }

        // create a scene

        const scene = new THREE.Scene();

        scene.background = new THREE.Color('rgba(54, 126, 236, 1)');

        // create a camera

        const camera = new THREE.PerspectiveCamera(
            75,
            mount.clientWidth / mount.clientHeight,
            0.1,
            1000
        );

        camera.position.set(0, 2, 5); // Set the camera position

        // create a renderer

        const renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true
        });

        renderer.setSize(mount.clientWidth, mount.clientHeight);

        mount.appendChild(renderer.domElement);

        // create a TraingleGeometry

        const TraingleGeometry = new THREE.BufferGeometry();
        const vertices = new Float32Array([
            0, 1, 0, // Vertex 1
            -1, -1, 0, // Vertex 2
            1, -1, 0 // Vertex 3
        ]);
        TraingleGeometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
        const triangleMaterial = new THREE.MeshStandardMaterial({ color: 'rgba(157, 255, 0, 1)', roughness: 0.5, metalness: 0.8, side: THREE.DoubleSide });
        const triangle = new THREE.Mesh(TraingleGeometry, triangleMaterial);

        triangle.position.set(0, 0, 0); // Center the triangle in the scene

        // Add the triangle to the scene
        scene.add(triangle);

        // FIXED: Corrected the typo from Geomertry to Geometry.
                const cubeGeometry = new THREE.BoxGeometry(1, 1, 1); 
                const circleGeometry = new THREE.CircleGeometry(1, 32);
                const sphereGeometry = new THREE.SphereGeometry(0.8, 32, 32);   
        
         
                const cubeMaterial = new THREE.MeshStandardMaterial({ color: 'rgba(255, 0, 162, 1)', roughness: 0.5, metalness: 0.8, side: THREE.DoubleSide });
                const circleMaterial = new THREE.MeshStandardMaterial({ color: 'rgba(0, 255, 0, 1)', roughness: 0.5, metalness: 0.8, side: THREE.DoubleSide });
                const sphereMaterial = new THREE.MeshStandardMaterial({ color: 'rgba(117, 0, 176, 1)', roughness: 0.5, metalness: 0.8, side: THREE.DoubleSide });
        
                // FIXED: Used the corrected variable name here.
                const cube = new THREE.Mesh(cubeGeometry, cubeMaterial); 
                const circle = new THREE.Mesh(circleGeometry, circleMaterial);
                const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
        
                circle.position.y = 2;
                sphere.position.y = 1;
                sphere.position.x = 2;
                sphere.position.z = 1;
                sphere.rotation.x = Math.PI / 4; // Rotate the sphere for better visibility
        
        
                scene.add(cube);
                scene.add(circle);
                scene.add(sphere);
        

        // Add a light source
        const light = new THREE.PointLight('rgba(255, 255, 255, 1)', 1500);
        light.position.set(10, 10, 10);
        scene.add(light);

        // Add OrbitControls for camera manipulation
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true; // an animation effect

        let animationFrameId;

        const animate = ()=>{
            animationFrameId = requestAnimationFrame(animate);
            triangle.rotation.x += 0.01;
            triangle.rotation.y += 0.01;
            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;
            circle.rotation.x += 0.01;
            circle.rotation.y += 0.01;
            sphere.rotation.x += 0.1;
            sphere.rotation.y += 0.1;
            
            // Update controls
            controls.update();
            renderer.render(scene, camera);
        };

        animate();

        return () => {
            cancelAnimationFrame(animationFrameId);
            controls.dispose();
            if (renderer.domElement && mount.contains(renderer.domElement)) {
                mount.removeChild(renderer.domElement);
            }
            renderer.dispose();
        };
    }, []);

    return (
        <div ref={mountRef} style={{ width: '100vw', height: '100vh' }}></div>
    );
}