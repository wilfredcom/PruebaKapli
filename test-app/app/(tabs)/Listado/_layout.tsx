import { Stack } from "expo-router"

const StackLayout = () => {
    return (
        <Stack>
            <Stack.Screen
                name="index"
                options={{
                    headerTitle: "Listado de libros",
                }}
            />
        </Stack>
    )
}

export default StackLayout;