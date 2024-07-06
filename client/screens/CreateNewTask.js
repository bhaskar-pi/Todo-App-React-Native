import React, { useEffect, useState } from "react";
import { View, ScrollView, Text, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import Footer from "../components/Footer";
import { colors } from "../styles/colors";
import { Dropdown } from 'react-native-element-dropdown';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Fontisto } from '@expo/vector-icons';
import { CustomButton } from "../components/CustomButton";
import { createTask as createNewTask } from "../services/tasks.services";
import { ActivityIndicator } from "react-native-paper";
import Toast from 'react-native-toast-message';

const data = [
    { label: "Work", value: 'Work' },
    { label: "Education", value: 'Education' },
    { label: "Personal", value: 'Personal' },
    { label: "Health", value: 'Health' },
    { label: "Office", value: 'Office' },
];

const CreateNewTask = ({ navigation }) => {
    const [isFocus, setIsFocus] = useState(false);
    const [category, setCategory] = useState('');
    const [taskName, setTaskName] = useState('');
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [startShow, setStartShow] = useState(false);
    const [endShow, setEndShow] = useState(false);
    const [loading, setLoading] = useState(false)

    const _handleCreateNewTask = async () => {
        if (!category || !taskName || !description || !startDate || !endDate) {
            return  Toast.show({
                type: 'error',
                text1: 'Missing task details.',
                swipeable: true,
              });;
        }

        try {
            setLoading(true)
            const response = await createNewTask({
                category,
                taskName,
                startDate,
                endDate,
                description,
                status: 'Pending',
                priority: "Medium",
            });
            if (response.success){
                Toast.show({
                    type: 'success',
                    text1: 'Task created successfully.',
                    swipeable: true,
                  });
                setEndDate(new Date())
                setCategory('')
                setStartDate(new Date())
                setTaskName('')
                setDescription('')
            }
        } catch (error) {
            // throw error;
        } finally {
            setLoading(false)
        }
    };

    return (
        <>
            <ScrollView>
                {
                    loading ? (
                        <View style={[styles.createNewScreen, {marginTop:300}]}>
                    <ActivityIndicator size='large' color={colors.primaryD} />
                </View>
                    ) : (
                        <View style={styles.createNewScreen}>
                        <Text style={styles.header}>Create Task</Text>
                        <View style={styles.inputContainer}>
                            <Text style={styles.labelText}>Select Category</Text>
                            <Dropdown
                                style={[styles.dropdown, isFocus ? { borderColor: colors.primaryD, borderWidth: 1 } : { borderColor: colors.darkL }]}
                                placeholderStyle={styles.placeholderStyle}
                                selectedTextStyle={styles.selectedTextStyle}
                                iconStyle={styles.iconStyle}
                                data={data}
                                maxHeight={400}
                                labelField="label"
                                valueField="value"
                                placeholder={'Select Category'}
                                value={category}
                                onFocus={() => setIsFocus(true)}
                                onBlur={() => setIsFocus(false)}
                                onChange={item => {
                                    setCategory(item.value);
                                    setIsFocus(false);
                                }}
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <Text style={styles.labelText}>Task Name</Text>
                            <TextInput
                                style={styles.inputText}
                                placeholder="Enter Task Name"
                                placeholderTextColor={colors.darkL}
                                onChangeText={setTaskName}
                                value={taskName}
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <Text style={styles.labelText}>Description about Task</Text>
                            <TextInput
                                style={[styles.inputText, { height: 100, textAlignVertical: 'top' }]}
                                placeholder="Write a Description"
                                placeholderTextColor={colors.darkL}
                                onChangeText={setDescription}
                                value={description}
                                multiline
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <Text style={styles.labelText}>Pick Start Date</Text>
                            <TouchableOpacity style={styles.dateContainer} onPress={() => setStartShow(true)}>
                                <Fontisto name="date" size={24} color={colors.darkL} />
                                <Text style={{ fontSize: 16, color: colors.dark }}>{startDate.toDateString()}</Text>
                            </TouchableOpacity>
                            {startShow && (
                                <DateTimePicker
                                    value={startDate}
                                    mode="date"
                                    display="default"
                                    onChange={(event, selectedDate) => {
                                        setStartDate(selectedDate);
                                        setStartShow(false);
                                    }}
                                />
                            )}
                        </View>
                        <View style={styles.inputContainer}>
                            <Text style={styles.labelText}>Pick Due Date</Text>
                            <TouchableOpacity style={styles.dateContainer} onPress={() => setEndShow(true)}>
                                <Fontisto name="date" size={24} color={colors.darkL} />
                                <Text style={{ fontSize: 16, color: colors.dark }}>{endDate.toDateString()}</Text>
                            </TouchableOpacity>
                            {endShow && (
                                <DateTimePicker
                                    value={endDate}
                                    mode="date"
                                    display="default"
                                    onChange={(event, selectedDate) => {
                                        setEndDate(selectedDate);
                                        setEndShow(false);
                                    }}
                                />
                            )}
                        </View>
                        <View style={styles.customButtonContainer}>
                            <CustomButton title='Create a Task' onPress={_handleCreateNewTask} />
                        </View>
                    </View>
                    )
                }
                
            </ScrollView>
            <Footer navigation={navigation} />
        </>
    );
};

const styles = StyleSheet.create({
    createNewScreen: {
        flex: 1,
        paddingHorizontal: 16,
        paddingTop: 50,
    },
    header: {
        fontSize: 24,
        fontWeight: '700',
        textAlign: 'center',
        marginBottom: 20,
        color: colors.dark,
    },
    labelText: {
        marginBottom: 8,
        fontSize: 16,
        color: colors.darkL,
    },
    inputContainer: {
        marginVertical: 10,
    },
    inputText: {
        borderColor: colors.darkL,
        width: '100%',
        height: 50,
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 12,
        fontSize: 16,
        color: colors.dark,
    },
    dateContainer: {
        width: '100%',
        height: 50,
        borderColor: colors.darkL,
        borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 8,
        paddingHorizontal: 12,
        justifyContent: 'space-between',
    },
    dropdown: {
        height: 50,
        borderWidth: 1,
        borderColor: colors.darkL,
        borderRadius: 8,
        paddingHorizontal: 8,
    },
    placeholderStyle: {
        fontSize: 16,
        color: colors.darkL,
    },
    selectedTextStyle: {
        fontSize: 16,
        color: colors.dark,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    customButtonContainer: {
        marginVertical: 20,
    },
});

export default CreateNewTask;
