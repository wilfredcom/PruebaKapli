import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export default function TablePosts({ posts }: any) {


    return (
        <View style={styles.container}>
            <View style={styles.tableHeader}>
                <Text style={styles.headerText}>Post ID</Text>
                <Text style={styles.headerText}>Titulo</Text>
                <Text style={styles.headerText}>Nombre Colaborador</Text>
            </View>
            <View style={styles.tableBody}>
                {posts.map((post: any) => (
                    <View key={post.post_id} style={styles.tableRow}>
                        <Text style={styles.cellText}>{post.post_id}</Text>
                        <Text style={styles.cellText}>{post.titulo}</Text>
                        <Text style={styles.cellText}>{post.nombre_colaborador}</Text>
                    </View>
                ))}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "50%",
        borderWidth: 1,
        borderColor: "black",
        borderRadius: 5,
        padding: 5,
    },
    tableHeader: {
        flexDirection: "row",
        backgroundColor: "lightgray",
        borderBottomWidth: 1,
        borderBottomColor: "black",
        paddingVertical: 5,
    },
    headerText: {
        flex: 1,
        fontWeight: "bold",
        textAlign: "center",
    },
    tableBody: {
        flex: 1,
    },
    tableRow: {
        flexDirection: "row",
        borderBottomWidth: 1,
        borderBottomColor: "black",
        paddingVertical: 5,
    },
    cellText: {
        flex: 1,
        textAlign: "center",
    },
});
