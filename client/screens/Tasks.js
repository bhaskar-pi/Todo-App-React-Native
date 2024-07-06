import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, Modal, TextInput, Button } from "react-native";
import Footer from "../components/Footer";
import { colors } from "../styles/colors";
import { MaterialIcons } from '@expo/vector-icons';
import Icon from "../components/icons";
import { getTasksByStatus as fetchByStatus, getAllTasks as fetchAllTasks, updateTask as handleUpdatingTask, deleteTask as deleteTaskById } from "../services/tasks.services";
import { Dropdown } from "react-native-element-dropdown";
import Toast from "react-native-toast-message";

const buttons = ["All", "In Progress", "Completed", "Pending"];

const categoryOptions = [
    { label: "Work", value: 'Work' },
    { label: "Education", value: 'Education' },
    { label: "Personal", value: 'Personal' },
    { label: "Health", value: 'Health' },
    { label: "Office", value: 'Office' },
];

const priorityOptions = [
    { label: "Low", value: "Low" },
    { label: "Medium", value: "Medium" },
    { label: "High", value: "High" }
];
const statusOptions = [
    { label: "Pending", value: "Pending" },
    { label: "In Progress", value: "In Progress" },
    { label: "Completed", value: "Completed" }
];

const Tasks = ({ navigation }) => {
    const [activeButton, setActiveButton] = useState("All");
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };
    
    const getStatusColors = (status) => {
        const statusColors = {
            "Pending": { light: colors.pendingL, dark: colors.pendingD },
            "Completed": { light: colors.completedL, dark: colors.completedD },
            "In Progress": { light: colors.inProgressL, dark: colors.inProgressD }
        };
        return statusColors[status] || { light: colors.primaryL, dark: colors.primaryD }; // Default colors
    };
    

    useEffect(() => {
        fetchTasks("All");
    }, []);

    const fetchTasks = async (status) => {
        setLoading(true);
        try {
            let response;
            if (status === "All") {
                response = await fetchAllTasks();
            } else {
                response = await fetchByStatus(status);
            }
            setTasks(response.tasks);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching tasks:', error);
            setLoading(false);
        }
    };

    const handleUpdateTask = async () => {
        setLoading(true)
        try {
            
            const response = await handleUpdatingTask(selectedTask);
            if (response.success) {
                fetchTasks(activeButton);
                setModalVisible(false);
                Toast.show({
                    type: 'success',
                    text1: 'Task updated successfully.',
                    swipeable: true,
                })
            }
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Failed updating.',
                swipeable: true,
            })
        }finally{
            setLoading(false)
        }
    };

    const handleDeleteTask = async () => {
        setLoading(true)
        try {
            const response = await deleteTaskById(selectedTask.userTaskId);
            if (response.success) {
                fetchTasks(activeButton);
                setModalVisible(false);
                Toast.show({
                    type: 'success',
                    text1: 'Task deleted successfully.',
                    swipeable: true,
                })
            }
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Failed deleting.',
                swipeable: true,
            })
        }finally{
            setLoading(false)
        }
    };

    const StatusButton = ({ task }) => (
        <TouchableOpacity onPress={() => { setActiveButton(task); fetchTasks(task); }}>
            <View style={[styles.statusButton, activeButton === task && styles.activeButton]}>
                <Text style={[{color: colors.primaryD, fontWeight: '500', fontSize: 15,}, activeButton === task && styles.activeButtonText]}>{task}</Text>
            </View>
        </TouchableOpacity>
    );

    const TaskCard = ({ task }) => {
        const { light, dark } = getStatusColors(task.status);
        return(
            <TouchableOpacity onPress={() => { setSelectedTask(task); setModalVisible(true); }}>
                <View style={[styles.card]}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Text style={{ color: colors.darkL, fontSize: 15 }}>{truncateDescription(task.description, 30)}</Text>
                        <Icon category={task.category} bg={true}/>
                    </View>
                    <Text style={{ fontSize: 17, fontWeight: '600', marginBottom: 7, }}>{task.taskName}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <MaterialIcons name="calendar-month" size={16} color="#aa93ff" />
                            <Text style={{ fontWeight: '500', fontSize: 12.5, color: "#aa93ff", marginHorizontal: 5 }}>
                                {formatDate(task.endDate)}
                            </Text>
                        </View>
                        <Text style={{ fontSize: 12, fontWeight: '500', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 10, backgroundColor: light, color: dark }}>{task.status}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    const truncateDescription = (description, maxLength) => {
        if (description.length <= maxLength) return description;
        return description.substring(0, maxLength) + '...';
    };

    return (
        <>
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <Text style={styles.header}>All Tasks</Text>
                </View>
                <FlatList
                    data={buttons}
                    renderItem={({ item }) => <StatusButton task={item} />}
                    keyExtractor={(item) => item}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.flatListContent}
                />
                {loading ? (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="large" color={colors.primaryD} />
                    </View>
                ) : (
                    <FlatList
                        data={tasks}
                        renderItem={({ item }) => <TaskCard task={item} />}
                        keyExtractor={(item) => item.userTaskId}
                    />
                )}
            </View>
            <Footer navigation={navigation} />
            {selectedTask && (
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalTitle}>Task Details</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Task Name"
                                value={selectedTask.taskName}
                                onChangeText={(text) => setSelectedTask({ ...selectedTask, taskName: text })}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Description"
                                value={selectedTask.description}
                                onChangeText={(text) => setSelectedTask({ ...selectedTask, description: text })}
                                multiline
                            />
                            <Dropdown
                                style={styles.input}
                                placeholder="Category"
                                data={categoryOptions}
                                labelField="label"
                                valueField="value"
                                value={selectedTask.category}
                                onChange={item => setSelectedTask({ ...selectedTask, category: item.value })}
                            />
                            <Dropdown
                                style={styles.input}
                                placeholder="Priority"
                                data={priorityOptions}
                                labelField="label"
                                valueField="value"
                                value={selectedTask.priority}
                                onChange={item => setSelectedTask({ ...selectedTask, priority: item.value })}
                            />
                            <Dropdown
                                style={styles.input}
                                placeholder="Status"
                                data={statusOptions}
                                labelField="label"
                                valueField="value"
                                value={selectedTask.status}
                                onChange={item => setSelectedTask({ ...selectedTask, status: item.value })}
                            />
                            <View style={[styles.modalButtons, {marginVertical: 10}]}>
                                <Button title="Update" onPress={handleUpdateTask} color={colors.primaryD} borderRadius={10} />
                                <Button title="Delete" onPress={handleDeleteTask} color="red" />
                                <Button title="Close" onPress={() => setModalVisible(false)} />
                            </View>
                        </View>
                    </View>
                </Modal>
            )}
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 14,
        paddingTop: 50,
        backgroundColor: '#fff',
        paddingBottom: 60,
    },
    headerContainer: {
        marginBottom: 20,
    },
    header: {
        fontSize: 22,
        fontWeight: '700',
        textAlign: 'center',
    },
    flatListContent: {
        paddingHorizontal: 14,
        height: 65,
    },
    statusButton: {
        paddingHorizontal: 14,
        paddingVertical: 10,
        fontSize: 16,
        fontWeight: '500',
        backgroundColor: colors.primaryL,
        marginHorizontal: 10,
        borderRadius: 10,
        color: colors.primaryD,
    },
    activeButton: {
        backgroundColor: colors.primaryD,
    },
    activeButtonText: {
        color: '#fff',
    },
    card: {
        backgroundColor: "#fff",
        paddingHorizontal: 15,
        paddingVertical: 14,
        height: 130,
        borderRadius: 12,
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderWidth: 2,
        borderColor: colors.primaryL,
        marginBottom: 12,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalView: {
        width: '90%',
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        padding: 10,
        borderWidth: 1,
        borderColor: colors.darkL,
        borderRadius: 10,
        marginBottom: 10,
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
});

export default Tasks;
