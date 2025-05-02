import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export default function ComputerModels({ scale, position }) {
    const computers = useLoader(GLTFLoader, "./src/assets/old_computers/scene.gltf");
    return <primitive scale={scale} position={position} object={computers.scene} />;
}
