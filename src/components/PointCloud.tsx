import { useEffect, useRef, useState, useMemo } from "react";
import * as THREE from "three";
import { useLoader } from "@react-three/fiber";
import pointImage from "../assets/point.png";

export const PointCloud = () => {
  const point = useLoader(THREE.TextureLoader, pointImage);
  const count = 100; // number point accross one axis ini akan generate point 10.00 dimana count hanya 100 karena multiply
  const sep = 3;

  let positions = useMemo(() => {
    let positions = [];
    for (let i = 0; i < 10000; i++) {
      const x = THREE.MathUtils.randFloatSpread(200);
      const y = THREE.MathUtils.randFloatSpread(200);
      let z = THREE.MathUtils.randFloatSpread(200);

      z < 0 ? (z = z * -1) : (z = z);

      positions.push(x, y, z);
    }
    return new Float32Array(positions); //merupakan array yang sesuai dengan buffer
  }, [count, sep]); //

  return (
    <points>
      <bufferGeometry attach="geometry">
        <bufferAttribute
          attach="attributes-position" //attribute parameter yang akan dikontrol
          array={positions}
          count={positions.length / 3} //
          itemSize={3} //dikeranakan telah diketahui bahwa tiap arraytype axis akan berisi 3 value pada 1d array
        />
      </bufferGeometry>
      <pointsMaterial
        attach="material"
        color={0x00aaff}
        map={point}
        sizeAttenuation //merupakan parameter yang menscale object berdasarkan perspective camera
        transparent={false}
        alphaTest={0.5} //merupakan thresshold saat rendering untuk mencega bila opacity dibawah value alphatest
        opacity={1.0}
      />
    </points>
  );
};
