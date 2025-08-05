import * as THREE from 'three';
import {useEffect,useRef} from 'react';

export default function CubeObject(){

    const mountRef = useRef(null);

    useEffect(()=>{
        const mount = mountRef.current;

        if(!mount){
            return;
        }

        const scene = new THREE.Scene();
        scene.background = new THREE.Color('rgba(54, 126, 236, 1)');

        const camera = new THREE.PerspectiveCamera(
            75,
            mount.clientWidth / mount.clientHeight,
            0.1,
            1000
        );
        // FIXED: Moved the camera back so we can see the objects at the origin.
        camera.position.z = 5;

        const renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true
        })
        
        // FIXED: Corrected the typo from clientWdith to clientWidth.
        renderer.setSize(mount.clientWidth, mount.clientHeight);

        mount.appendChild(renderer.domElement);

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

        const light = new THREE.PointLight('rgba(246, 255, 0, 1)', 150);
        light.position.set(0, 5, 5);
        scene.add(light);
        
        let animationFrameId;

        const animate = ()=>{
            animationFrameId = requestAnimationFrame(animate);
            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;
            circle.rotation.x += 0.01;
            circle.rotation.y += 0.01;
            sphere.rotation.x += 0.1;
            sphere.rotation.y += 0.1;
            // Move the camera slightly to create a dynamic view
            camera.position.x = Math.sin(Date.now() * 0.001) * 5
            camera.position.y = Math.cos(Date.now() * 0.001) * 5;
            camera.position.z = 5; // Keep the camera at a fixed distance
            // make them move right and left
            camera.position.x += Math.sin(Date.now() * 0.001) * 0.1;
            camera.position.y += Math.cos(Date.now() * 0.001) * 0.1;
            camera.lookAt(scene.position); // Ensure the camera always looks at the center of the scene
            renderer.render(scene,camera);
        }

        animate();

        return () => {
            cancelAnimationFrame(animationFrameId);
            // This check is slightly more robust than the original.
            if(renderer.domElement && mount.contains(renderer.domElement)){
                mount.removeChild(renderer.domElement);
            }
            // FIXED: Added renderer.dispose() to prevent GPU memory leaks.
            renderer.dispose();
        }

    },[]);

    return(
        // Using 100vw and 100vh is often more reliable for fullscreen.
        <div ref={mountRef} style={{ width: '100vw', height: '100vh' }}></div>
    )
}