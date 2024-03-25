import { Style } from "@/hooks/useStyles";
import { SetValue } from "@/types/SetValue";
import { FC } from "react";
import { View, ViewProps } from "react-native";
import Hoverable from "@/components/Hoverable";
import { useHoverableStyle } from "@/hooks/useHoverableStyle";

type HoverableViewProps = {
    setIsHovered: SetValue<boolean>;
    style?: Style;
} & ViewProps;

const HoverableView: FC<HoverableViewProps> = ({
    setIsHovered,
    style = {},
}) => {
    // hooks
    const { outerStyle, innerStyle } = useHoverableStyle(style);

    return (
        <Hoverable style={outerStyle} setIsHovered={setIsHovered}>
            <View style={innerStyle}></View>
        </Hoverable>
    );
};

export default HoverableView;
