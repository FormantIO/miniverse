import { useRef, useEffect, FC } from "react";
import { EllipseCurve, Path, Color } from "three";

interface IPolarGridCircle {
  radius: number;
  circleColor: Color;
  points: number;
}

export const PolarGridCircle: FC<IPolarGridCircle> = ({
  radius,
  circleColor,
  points,
}) => {
  const lineOne = useRef<THREE.Line>();

  const curve = new EllipseCurve(
    0,
    0,
    radius,
    radius,
    0,
    2 * Math.PI,
    false,
    0
  );
  const path = new Path(curve.getPoints(points));

  useEffect(() => {
    if (lineOne.current)
      lineOne.current.geometry.setFromPoints(path.getPoints());
  }, []);
  return (
    <line ref={lineOne}>
      <bufferGeometry />
      <lineBasicMaterial color={circleColor} linewidth={1} />
    </line>
  );
};
