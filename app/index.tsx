import { useStyles } from "@/hooks/useStyles";
import { Text, View } from "react-native";
import { Colors } from "@/constants/Colors";

const HomeScreen = () => {
    // styles
    const styles = useStyles({
        container: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: Colors.blue,
        },
        title: {
            main: {
                fontSize: 100,
                color: Colors.white,
            },
            phoneSm: {
                fontSize: 15,
            },
            phone: {
                fontSize: 25,
            },
            tablet: {
                fontSize: 50,
            },
        },
    });

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Expo Router Template</Text>
        </View>
    );
};

export default HomeScreen;
