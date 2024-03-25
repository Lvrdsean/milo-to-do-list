import { Style } from "@/hooks/useStyles";
import { useEffect, useState } from "react";
import { Platform } from "react-native";

export const useHoverableStyle = (style: Style | undefined) => {
    // state
    const [outerStyle, setOuterStyle] = useState<Style>({});
    const [innerStyle, setInnerStyle] = useState<Style>({});

    // effects
    useEffect(() => {
        if (!style) return;

        let newOuterStyle: Style = {};
        let newInnerStyle: Style = {};

        if (Platform.OS === "web") {
            const hoverableKeys = [
                "alignSelf",
                "margin",
                "marginBottom",
                "marginEnd",
                "marginHorizontal",
                "marginLeft",
                "marginRight",
                "marginStart",
                "marginTop",
                "marginVertical",
            ];

            for (let key in style) {
                if (hoverableKeys.includes(key)) {
                    switch (key) {
                        case "marginEnd":
                            newOuterStyle = {
                                ...newOuterStyle,
                                marginRight: style[
                                    key as keyof Style
                                ] as number,
                            };
                            break;
                        case "marginHorizontal":
                            newOuterStyle = {
                                ...newOuterStyle,
                                marginRight: style[
                                    key as keyof Style
                                ] as number,
                                marginLeft: style[key as keyof Style] as number,
                            };
                            break;
                        case "marginStart":
                            newOuterStyle = {
                                ...newOuterStyle,
                                marginLeft: style[key as keyof Style] as number,
                            };
                            break;
                        case "marginVertical":
                            newOuterStyle = {
                                ...newOuterStyle,
                                marginTop: style[key as keyof Style] as number,
                                marginBottom: style[
                                    key as keyof Style
                                ] as number,
                            };
                            break;
                        default:
                            newOuterStyle = {
                                ...newOuterStyle,
                                [key]: style[key as keyof Style],
                            };
                            break;
                    }
                } else {
                    newInnerStyle = {
                        ...newInnerStyle,
                        [key]: style[key as keyof Style],
                    };
                }
            }
        } else {
            newInnerStyle = style;
        }

        setOuterStyle(newOuterStyle);
        setInnerStyle(newInnerStyle);

        console.log(
            `newOuterStyle: ${JSON.stringify(newOuterStyle)}, newInnerStyle: ${JSON.stringify(newInnerStyle)}`,
        );
    }, [style]);

    return { outerStyle, innerStyle };
};
