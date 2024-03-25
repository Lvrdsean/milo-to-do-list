import Hoverable from "@/components/Hoverable";
import { useHoverableStyle } from "@/hooks/useHoverableStyle";
import { Style, useStyles } from "@/hooks/useStyles";
import { Href, Link } from "expo-router";
import { FC, useState } from "react";

type HoverableLinkProps = {
    href: Href<string>;
    text: string;
    style?: Style;
};

const HoverableLink: FC<HoverableLinkProps> = ({ href, text, style }) => {
    // state
    const [isHovered, setIsHovered] = useState<boolean>(false);

    // hooks
    const { outerStyle, innerStyle } = useHoverableStyle(style);

    // styles
    const styles = useStyles(
        {
            link: {
                regular: {
                    backgroundColor: "blue",
                    paddingHorizontal: 20,
                    paddingVertical: 10,
                    borderRadius: 10,
                    color: "white",
                    fontSize: 50,
                    transition: "all 0.3s",
                },
                hover: {
                    backgroundColor: "black",
                },
            },
        },
        { isHovered },
    );

    return (
        <Hoverable style={outerStyle} setIsHovered={setIsHovered}>
            <Link style={[styles.link, innerStyle]} href={href}>
                {text}
            </Link>
        </Hoverable>
    );
};

export default HoverableLink;
