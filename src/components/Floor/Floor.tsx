import { useTexture } from "@react-three/drei";
import React from "react";

export default function Floor() {
    const [colorMap, displacementMap, normalMap, roughnessMap, aoMap] = useTexture([
        "/src/assets/textures/Tiles106_2K-JPG_Color.jpg",
        "/src/assets/textures/Tiles106_2K-JPG_Displacement.jpg",
        "/src/assets/textures/Tiles106_2K-JPG_NormalGL.jpg",
        "/src/assets/textures/Tiles106_2K-JPG_Roughness.jpg",
        "/src/assets/textures/Tiles106_2K-JPG_AmbientOcclusion.jpg",
    ]);
    return (
        <mesh scale={1} rotation={[-1.6, 0, 0]} position={[0, -3, -3]}>
            <planeGeometry args={[40, 20, 100, 100]}></planeGeometry>
            <meshStandardMaterial
                displacementScale={0}
                map={colorMap}
                displacementMap={displacementMap}
                normalMap={normalMap}
                roughnessMap={roughnessMap}
                aoMap={aoMap}
            ></meshStandardMaterial>
        </mesh>
    );
}
