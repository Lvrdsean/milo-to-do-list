import { Style } from "@/hooks/useStyles";
import { SetValue } from "@/types/SetValue";
import { ReactElement, FC, CSSProperties } from "react";
import { Platform } from "react-native";

type HoverableProps = {
    setIsHovered: SetValue<boolean>;
    children: ReactElement;
    style?: Style;
};

const Hovarable: FC<HoverableProps> = ({
    setIsHovered,
    children,
    style = {},
}) => {
    if (Platform.OS !== "web") {
        return <>{children}</>;
    }

    return (
        <div
            style={style as CSSProperties}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {children}
        </div>
    );
};

export default Hovarable;
