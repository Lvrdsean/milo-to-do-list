import { useState } from "react";
import { Dimensions } from "react-native";

const useDimensions = () => {
    const [width, setWidth] = useState<number>(Dimensions.get("window").width);
    const [height, setHeight] = useState<number>(
        Dimensions.get("window").height,
    );

    // event listeners
    Dimensions.addEventListener("change", ({ window }) => {
        setWidth(window.width);
        setHeight(window.height);
    });

    return { width, height };
};

export default useDimensions;
