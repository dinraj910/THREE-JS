// Import the entire Three.js library. This gives us access to everything we need
// for 3D graphics, like scenes, cameras, materials, etc.
import * as THREE from 'three';

// Import two essential "Hooks" from React.
// - useEffect: Lets us run "side effects" like setting up our Three.js scene after the component has rendered.
// - useRef: Gives us a way to get a direct reference to a specific DOM element, like a div.
import {useEffect, useRef} from 'react';

// This is our React component, a reusable piece of our UI.
export default function BasicScene(){

    // Create a "ref" using the useRef hook. Think of this as an empty box for now.
    // We will use it to hold a direct pointer to the <div> at the bottom.
    // This is our "anchor" or "mount point" for the Three.js scene.
    const mountRef = useRef(null); 

    // The useEffect hook runs its code *after* React has rendered the component.
    // The empty array `[]` at the end means this effect will only run ONCE,
    // right after the component first mounts (appears on the screen).
    useEffect(() => {
        // --- 1. SETUP ---

        // Get the actual DOM element that our mountRef is pointing to.
        // After the initial render, `mountRef.current` will be the <div> element.
        const mount = mountRef.current;

        // Safety check: If for any reason our div isn't there, stop running the code to prevent errors.
        if (!mount) return;

        // Create the main "Scene". Think of this as a virtual stage or universe
        // that will hold all our objects, cameras, and lights.
        const scene = new THREE.Scene();

        // Adding color

        scene.background = new THREE.Color('rgba(54, 126, 236, 1)'); // A dark gray background color for the scene.

        // Create a "Camera". This is our eye in the 3D world. It determines what we see.
        // `PerspectiveCamera` mimics how the human eye works (things farther away look smaller).
        const camera = new THREE.PerspectiveCamera(
            75, // Field of View (FOV): How wide the camera's view is, in degrees.
            mount.clientWidth / mount.clientHeight, // Aspect Ratio: Should match the container's size to avoid squishing.
            0.1, // Near Clipping Plane: How close an object can be before it's not shown.
            1000 // Far Clipping Plane: How far an object can be before it's not shown.
        );

        // By default, the camera starts at the center (0,0,0). We move it back 5 units
        // along the Z-axis so we can see the objects we place at the center.
        camera.position.z = 5;

        // Create the "Renderer". This is the engine that draws our scene onto the screen.
        // It takes the scene and camera data and renders it to an HTML <canvas> element.
        const renderer = new THREE.WebGLRenderer({ 
            antialias: true, // This makes the edges of objects look smoother.
            alpha: true      // This makes the background of the canvas transparent.
        });

        // Set the size of the renderer's output canvas to match our container div's size.
        renderer.setSize(mount.clientWidth, mount.clientHeight);

        // Add the renderer's <canvas> element to our mount point div. 
        // This is what makes the 3D scene actually appear on the page.
        mount.appendChild(renderer.domElement);

        // --- 2. ADDING OBJECTS AND LIGHTS ---

        // Create a "Geometry". This defines the SHAPE of an object.
        // `BoxGeometry` is a built-in shape for a cube.
        const geometry = new THREE.BoxGeometry();

        // Create a "Material". This defines the APPEARANCE of an object (its color, texture, shininess).
        // `MeshStandardMaterial` is a realistic material that needs light to be visible.
        // The color is a hex string, just like in CSS.
        const material = new THREE.MeshStandardMaterial({ color: 'rgba(255, 0, 162, 1)' }); // A vibrant blue

        // Create a "Mesh". A mesh is the final object, the combination of a shape (Geometry) and an appearance (Material).
        const cube = new THREE.Mesh(geometry, material);

        // Add our newly created cube to the scene.
        scene.add(cube);

        // Create a "Light". Lights are needed to see objects that use realistic materials.
        // `PointLight` is like a single lightbulb, emitting light in all directions from one point.
        const light = new THREE.PointLight('#f6ff00ff', 150); // A bright yellow light with high intensity.

        // Set the position of the light in our 3D space.
        light.position.set(10, 10, 10);

        // Add the light to our scene so it can illuminate our objects.
        scene.add(light);

        // --- 3. ANIMATION LOOP ---

        // This variable will hold the ID of our animation frame request.
        // We need it so we can stop the animation later when the component unmounts.
        let animationFrameId;

        // This is our animation function. It will be called on every single frame.
        const animate = () => {
            // Schedule the `animate` function to be called again on the very next frame.
            // This creates an efficient, smooth loop that is synced with the browser's refresh rate.
            animationFrameId = requestAnimationFrame(animate);

            // Update the object's properties to create motion.
            // Here, we're slightly rotating the cube on its X and Y axes each frame.
            cube.rotation.x += 0.1;
            cube.rotation.y += 0.1;

            // This is the crucial final step: tell the renderer to draw the scene
            // from the camera's point of view. This creates the image you see.
            renderer.render(scene, camera);
        };

        // Call the animate function once to kick off the animation loop.
        animate();

        // --- 4. CLEANUP FUNCTION ---

        // The function returned by useEffect is a "cleanup" function.
        // React will run this automatically when the component is unmounted (removed from the screen).
        // This is CRITICAL for preventing memory leaks!
        return () => {
            // 1. Stop the animation loop. This saves CPU resources.
            cancelAnimationFrame(animationFrameId);

            // 2. Remove the <canvas> element from the DOM.
            // The extra checks make sure the code doesn't crash if something was already removed.
            if (renderer && renderer.domElement && mount?.contains(renderer.domElement)) {
                mount.removeChild(renderer.domElement);
            }

            // 3. Tell Three.js to dispose of the renderer and all its associated
            // WebGL resources (geometries, materials, etc.) from the GPU's memory.
            renderer.dispose();
        };
        
    }, []); // The empty array `[]` ensures this entire setup and cleanup logic runs only once.


    // This is the JSX that React renders to the actual HTML page.
    return(
        // We create a div that will take up the full screen.
        // The `ref={mountRef}` attribute is the magic that connects this specific <div>
        // to our `mountRef` variable created with `useRef()`.
        <div ref={mountRef} style={{width: '100vw', height: '100vh', overflow: 'hidden' }}>
            {/* This div starts empty. Our useEffect hook will populate it with the 3D canvas. */}
        </div>
    )

}