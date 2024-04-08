import { ImageStyle, TextStyle, ViewStyle, StyleSheet } from "react-native";
import useDimensions from "./useDimensions";
import { useEffect, useState } from "react";
import { Breakpoints } from "@/constants/Breakpoints";
import { useSettings } from "@/context/SettingsProvider";

export type Style = ViewStyle | TextStyle | ImageStyle;

type ResponsiveStyle = {
	main: Style | StyleStates;
	phoneSm?: Style | StyleStates;
	phone?: Style | StyleStates;
	tabletSm?: Style | StyleStates;
	tablet?: Style | StyleStates;
	desktopSm?: Style | StyleStates;
	desktop?: Style | StyleStates;
};

type Styles<T> = { [k in keyof T]: Style };

type StyleStates = {
	regular: Style;
	dark?: Style;
	active?: Style;
	hover?: Style;
};

export enum StyleState {
	Dark = "dark",
	Active = "active",
	Hover = "hover",
}

type ResponsiveNamedStyles<T> = {
	[k in keyof T]: ResponsiveStyle | Style | StyleStates;
};

export type Opts = {
	isDarkTheme?: boolean;
	isActive?: boolean;
	isHovered?: boolean;
	mergeDark?: boolean;
	mergeActive?: boolean;
	mergeHover?: boolean;
	mergePriority?: StyleState[];
};

const defaultOpts = {
	isActive: false,
	isHovered: false,
	mergeDark: true,
	mergeHover: true,
	mergeActive: true,
	mergePriority: [StyleState.Dark, StyleState.Active, StyleState.Hover],
};

export const useStyles = <
	T extends ResponsiveNamedStyles<T> | ResponsiveNamedStyles<any>
>(
	stylesheet: T,
	opts: Opts = {}
): Styles<T> => {
	const { width } = useDimensions();
	const { settings } = useSettings();
	const [styles, setStyles] = useState<Styles<T>>({} as Styles<T>);

	opts = { ...defaultOpts, isDarkTheme: settings.isDarkTheme, ...opts };

	useEffect(() => {
		let newStyles: Styles<T> = {} as Styles<T>;

		for (let key in stylesheet) {
			let style = stylesheet[key];
			if (isResoponsiveStyle(style)) {
				switch (true) {
					case width < Breakpoints.phoneSm:
						if (!style?.phoneSm && style?.phone) {
							newStyles[key] = StyleSheet.flatten([
								getStyle(style.main, opts),
								getStyle(style.phone, opts),
							]);
						} else {
							newStyles[key] = StyleSheet.flatten([
								getStyle(style.main, opts),
								getStyle(style?.phoneSm, opts),
							]);
						}
						break;
					case width < Breakpoints.phone:
						if (!style?.phone && style?.phoneSm) {
							newStyles[key] = StyleSheet.flatten([
								getStyle(style.main, opts),
								getStyle(style?.phoneSm, opts),
							]);
						} else {
							newStyles[key] = StyleSheet.flatten([
								getStyle(style.main, opts),
								getStyle(style?.phone, opts),
							]);
						}
						break;
					case width < Breakpoints.tabletSm:
						if (!style?.tabletSm && style?.tablet) {
							newStyles[key] = StyleSheet.flatten([
								getStyle(style.main, opts),
								getStyle(style.tablet, opts),
							]);
						} else {
							newStyles[key] = StyleSheet.flatten([
								getStyle(style.main, opts),
								getStyle(style?.tabletSm, opts),
							]);
						}
						break;
					case width < Breakpoints.tablet:
						if (!style?.tablet && style?.tabletSm) {
							newStyles[key] = StyleSheet.flatten([
								getStyle(style.main, opts),
								getStyle(style.tabletSm, opts),
							]);
						} else {
							newStyles[key] = StyleSheet.flatten([
								getStyle(style.main, opts),
								getStyle(style?.tablet, opts),
							]);
						}
						break;
					case width < Breakpoints.desktopSm:
						if (!style?.desktopSm && style?.desktop) {
							newStyles[key] = StyleSheet.flatten([
								getStyle(style.main, opts),
								getStyle(style.desktop, opts),
							]);
						} else {
							newStyles[key] = StyleSheet.flatten([
								getStyle(style.main, opts),
								getStyle(style?.desktopSm, opts),
							]);
						}
						break;
					case width < Breakpoints.desktop:
						if (!style?.desktop && style?.desktopSm) {
							newStyles[key] = StyleSheet.flatten([
								getStyle(style.main, opts),
								getStyle(style.desktopSm, opts),
							]);
						} else {
							newStyles[key] = StyleSheet.flatten([
								getStyle(style.main, opts),
								getStyle(style?.desktop, opts),
							]);
						}
						break;
					default:
						newStyles[key] = getStyle(style.main, opts);
						break;
				}
			} else {
				newStyles[key] = getStyle(style, opts);
			}
		}

		setStyles(newStyles);
	}, [width, settings.isDarkTheme, opts.isActive, opts.isHovered]);

	return styles;
};

const isResoponsiveStyle = (obj: any): obj is ResponsiveStyle => {
	return (
		typeof obj === "object" &&
		obj !== null &&
		obj !== undefined &&
		"main" in obj
	);
};

const isStyleStates = (obj: any): obj is StyleStates => {
	return (
		typeof obj === "object" &&
		obj !== null &&
		obj !== undefined &&
		"regular" in obj
	);
};

const getStyle = (
	styleObject: Style | StyleStates | undefined,
	opts: Opts
): Style => {
	if (!styleObject) {
		return {};
	}

	if (isStyleStates(styleObject)) {
		if (!opts.isDarkTheme && !opts.isActive && !opts.isHovered) {
			return styleObject.regular;
		}

		let dark: Style = {};
		let active: Style = {};
		let hover: Style = {};
		let mergeArray: Style[] = [];

		if (opts.isDarkTheme && styleObject?.dark) {
			if (opts.mergeDark) {
				dark = StyleSheet.flatten([
					styleObject.regular,
					styleObject.dark,
				]);
			} else {
				dark = styleObject.dark;
			}
		}

		if (opts.isActive && styleObject?.active) {
			if (opts.mergeActive) {
				active = StyleSheet.flatten([
					styleObject.regular,
					styleObject.active,
				]);
			} else {
				active = styleObject.active;
			}
		}

		if (opts.isHovered && styleObject?.hover) {
			if (opts.mergeHover) {
				hover = StyleSheet.flatten([
					styleObject.regular,
					styleObject.hover,
				]);
			} else {
				hover = styleObject.hover;
			}
		}

		opts.mergePriority?.forEach((styleState) => {
			switch (styleState) {
				case StyleState.Dark:
					mergeArray.push(dark);
					break;
				case StyleState.Active:
					mergeArray.push(active);
					break;
				case StyleState.Hover: {
					mergeArray.push(hover);
				}
			}
		});

		return StyleSheet.flatten(mergeArray);
	}

	return styleObject;
};
