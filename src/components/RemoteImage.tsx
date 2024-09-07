import { Image } from "react-native";
import React, { ComponentProps, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

type RemoteImageProps = {
  path?: string | null;
  fallback: string;
} & Omit<ComponentProps<typeof Image>, "source">;

const RemoteImage = ({ path, fallback, ...imageProps }: RemoteImageProps) => {
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    if (!path) {
      // If no path is provided, set fallback image
      setImage(fallback);
      return;
    }

    (async () => {
      setImage(null); // Reset image before loading new one
      const { data, error } = await supabase.storage
        .from("product-images")
        .download(path);

      if (error) {
        console.log("Error downloading image from Supabase:", error);
        // Use fallback if error occurs
        setImage(fallback);
        return;
      }

      if (data) {
        const fr = new FileReader();
        fr.readAsDataURL(data);
        fr.onload = () => {
          setImage(fr.result as string);
        };
      } else {
        // If no data, use the fallback image
        setImage(fallback);
      }
    })();
  }, [path, fallback]);
  // Ensure fallback is used when the image is null or an empty string
  const imageUri = image && image !== "" ? image : fallback;

  return <Image source={{ uri: imageUri }} {...imageProps} />;
};

export default RemoteImage;
