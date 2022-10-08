import { useState, useRef, FC, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Mesh, Object3D, AxesHelper } from "three";
import "./App.css";
import { Map } from "./components/Map";
import { CameraController } from "./utils/CameraController";
import { PointCloud } from "./components/PointCloud";
import {
  App as FormantApp,
  Authentication,
  ModuleData,
  Fleet,
} from "@formant/data-sdk";
import { MapImage } from "./components/MapImage";
interface IBox {
  pos: number;
}

const Box: FC<IBox> = ({ pos }) => {
  const mesh = useRef<Mesh>();
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);
  // Rotate mesh every frame, this is outside of React without overhead

  useFrame(() => {
    if (mesh.current === undefined) return;
    mesh.current.rotation.x += pos;
  });

  return (
    <mesh
      ref={mesh}
      scale={active ? 1.5 : 1}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}
    >
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
    </mesh>
  );
};

function App() {
  const [pos, setPose] = useState(0);

  useEffect(() => {
    // FormantApp.addModuleDataListener(handleData);
    handleData();
  }, [Authentication.token]);

  const handleData = async () => {
    console.log("here")
    if (await Authentication.waitTilAuthenticated()) {
      console.log("this")
      const devices = await Fleet.getOnlineDevices();
      console.log(devices);
    }
    // const streams = _.streams;
    // const pointcloudStream = Object.values(streams).filter(
    //   (_) => _.type === "point cloud"
    // );
    // const data = pointcloudStream[0].data;

    // if (data === undefined || data.length === 0) return;
    // const latestData = data[0].points.at(-1);
    // if (latestData === undefined) return;
    // const url = await fetch(latestData[1].url);
    // console.log(url.body);
  };

  return (
    <div className="App">
      <button onClick={() => setPose(0.01)}>HERE</button>
      <button onClick={() => setPose(0)}>stop</button>
      <Canvas className="main-canvas">
        <CameraController />
        <pointLight
          distance={0}
          decay={0}
          intensity={0.3 * 2.8}
          color={"#18d2ff"}
          position={[1000, 1000, 1000]}
        />
        <pointLight
          distance={0}
          decay={0}
          intensity={0.7 * 2.8}
          color={"#ea719d"}
          position={[-1000, -1000, 1000]}
        />
        <hemisphereLight
          intensity={0.5 * 2.8}
          groundColor={"#282f45"}
          color={"#f8f9fc"}
        />
        {/* <Box pos={pos} /> */}
        <primitive object={new AxesHelper(10)} />
        <PointCloud />
        <Map />
        <MapImage />
      </Canvas>
    </div>
  );
}

export default App;
