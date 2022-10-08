import * as THREE from "three";
import { Color, Mesh } from "three";
import { PolarGridCircle } from "./PolarGridCircle";

export const Map = () => {
  const color2: Color = new Color(0x2d3753);
  const color3: Color = new Color(0x3b4569);

  return (
    <group>
      <mesh>
        <planeGeometry args={[1000, 1000, 2, 2]} />
        <meshStandardMaterial
          color={0xffffff}
          transparent={true}
          opacity={0}
        />
      </mesh>
      {range(-1, 2).map((magnitud, index) => {
        const first = index === 0;
        return range(first ? 1 : 3, 21).map((i) => {
          const major = i === 10;
          const r = 10 ** magnitud * i;
          return (
            <PolarGridCircle
              radius={r}
              circleColor={major ? color2 : color3}
              points={36 * 3}
            />
          );
        });
      })}
    </group>
  );
};

export const range = (start: number, end: number) =>
  end <= start ? [] : new Array(end - start).fill(0).map((_, i) => i + start);
