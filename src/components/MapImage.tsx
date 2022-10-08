import { Authentication, Device } from "@formant/data-sdk";
import { useDevice } from "@formant/ui-sdk";
import { useEffect, useState } from "react";

const getImage = async (device: Device) => {
  if (await Authentication.waitTilAuthenticated()) {
    const latestTelemetry = await device.getLatestTelemetry();
    const imageUrl = latestTelemetry.filter(
      (_) => _.streamName === "ati.map.image"
    );
    // const url = imageUrl[0].currentValue;
    // console.log(url);

    return imageUrl[0].currentValue.url;
  }
};

const fetchImage = async (url: string): Promise<HTMLImageElement> => {
  const image = new Image();
  image.src = url;
  image.setAttribute("crossOrigin", "");
  await new Promise((resolve) => {
    image.onload = resolve;
  });
  return image;
};

export const MapImage = () => {
  const device = useDevice();

  const [img, setImg] = useState();

  useEffect(() => {
    if (!device) return;
    getImage(device).then((_) => setImg(_));
  }, [device]);

  useEffect(() => {
    if (!img) return;

    const canvas = document.createElement("canvas");
    fetchImage(img).then((_) => {
      canvas.height = _.height;
      canvas.width = _.width;
      console.log(canvas);
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(_, 0, 0);
      }
      const pixelData = ctx?.getImageData(0, 0, _.width, _.height);
      const mapData = [];
      if (pixelData) {
        for (let i = 0; i < pixelData.data.length; i += 4) {
          const r = pixelData.data[i] + 100;
          mapData.push(r);
        }
      }
    });
  }, [img]);
  return null;
};
