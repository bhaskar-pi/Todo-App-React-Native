import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, Platform, KeyboardAvoidingView, TouchableOpacity, FlatList, SectionList } from "react-native";
import Footer from "../components/Footer";
import { colors } from "../styles/colors";
import { FontAwesome6 } from '@expo/vector-icons';
import CircularProgress from 'react-native-circular-progress-indicator';
import { ActivityIndicator, ProgressBar } from 'react-native-paper';
import Icon from "../components/icons";
import { removeToken } from "../components/utils";
import { getUserDetail as fetchUser } from "../services/users.services";
import { getAllTasks as fetchAllTasks, getTasksByStatus as fetchTaskByStatus } from "../services/tasks.services";

const score ={
    Completed: 1,
    "In Progress": .7,
    "Pending": .4

}
categoryList = {
    Work: 'Work',
    Personal: 'Personal',
    Health: "Health",
    Education: "Education",
    Office: "Office"
}

const Profile = ({ navigation }) => {
    const [name, setName] = useState('')
    const [progressTasks, setProgressTasks] = useState([])
    const [loadingUser, setLoadingUser] = useState(true);
    const [loadingTasks, setLoadingTasks] = useState(true);
    const [allTasks, setAllTasks] = useState([])
    const [workTasks, setWorkTasks] = useState([])
    const [officeTasks, setOfficeTasks] = useState([])
    const [personalTasks, setPersonalTasks] = useState([])
    const [educationTasks, setEducationTasks] = useState([])
    const [healthTasks, setHealthTasks] = useState([])

    const getInProgressTasks = async () => {
        try {
            const response = await fetchTaskByStatus('In Progress');
            if (response.success) {
                setProgressTasks(response.tasks);
            }
        } catch (error) {
            console.error('Error fetching tasks:', error);
        } finally {
            setLoadingTasks(false);
        }
    };

    const getAll = async() => {
        try {
            const response = await fetchAllTasks()
            if (response.success) {
                const tasks = response.tasks;
                // Divide tasks by category
                const workTasks = tasks.filter(task => task.category === categoryList.Work);
                const officeTasks = tasks.filter(task => task.category === categoryList.Office);
                const personalTasks = tasks.filter(task => task.category === categoryList.Personal);
                const educationTasks = tasks.filter(task => task.category === categoryList.Education);
                const healthTasks = tasks.filter(task => task.category === categoryList.Health);
                // Update state
                setAllTasks(tasks);
                setWorkTasks(workTasks);
                setOfficeTasks(officeTasks);
                setPersonalTasks(personalTasks);
                setEducationTasks(educationTasks);
                setHealthTasks(healthTasks);
            }
        } catch (error) {
            console.log("error at getting all tasks", error)
        }
    }

    const getUser = async () => {
        try {
            const response = await fetchUser();
            if (response.success) {
                setName(response.name);
            }
        } catch (error) {
            console.error('Error fetching user:', error);
        } finally {
            setLoadingUser(false);
        }
    };

    useEffect(() => {
        
        getUser();
        getInProgressTasks()
        getAll();
        
       
    }, [navigation]);

    const _handleLogout = async() => {
        await removeToken();
        navigation.navigate('login');
    }

    const UserProfile = () => (
        <View style={[styles.userCard, styles.card]}>
            <View style={styles.userContainer}>
                <Image style={styles.userImage} source={require('../assets/images/cartoonBoy.jpg')} />
                <View style={styles.textContainer}>
                    <Text style={styles.greet}>Hey,</Text>
                    <Text style={styles.name}>{name} {' '} 👋</Text>
                </View>
            </View>
           <TouchableOpacity onPress={_handleLogout}>
                <FontAwesome6 name="power-off" size={22} color={colors.dark} solid />
           </TouchableOpacity>
        </View>
    );

    const TodaysReviewCard = () => (
        <View style={[styles.reviewCard, styles.card]}>
            <Text style={styles.reviewText}>Your today's due task's almost done!</Text>
            <View style={styles.reviewProgress}>
                <CircularProgress
                    value={85}
                    valueSuffix={'%'}
                    radius={40}
                    progressValueColor={'white'}
                    progressValueStyle={{ fontWeight: '500', fontSize: 17 }}
                    maxValue={100}
                    titleColor={colors.white}
                    activeStrokeColor={'#fff'}
                    inActiveStrokeColor={colors.white}
                    inActiveStrokeOpacity={0.3}
                    inActiveStrokeWidth={10}
                    activeStrokeWidth={10}
                />
            </View>
        </View>
    );

    const ProgressStatusCard = ({ task }) => (
        <View style={[styles.inProgressCard, {flexDirection: 'column', justifyContent: 'space-around', alignItems: 'start'}]}>
            <View style={{flexDirection: "row", alignItems: 'center', justifyContent: 'space-between', marginBottom: 5,}}>
                <Text style={styles.category}>{task.category}</Text>
                <Icon category={task.category} size={18} />
            </View>
            <View>
                <Text style={styles.taskName}>{task.description}</Text>
                <ProgressBar
                    progress={task.status === "Completed" ? 1 : 0.6}
                    color={colors.officeD}
                    height={30}
                    style={styles.progressBar}
                />
            </View>
        </View>
    );

    const Header = ({name, number}) => (
        <View style={styles.headerContainer}>
            <Text style={styles.header}>{name}</Text>
            <View style={styles.countContainer}>
                <Text style={styles.count}>{number}</Text>
            </View>
        </View>
    );

    const GetInProgressTasks = () => (
        <View style={styles.card}>
            <Header name="In Progress" number={progressTasks.length} />
            {loadingTasks ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator style={styles.loader} size="large" color={colors.primaryD} />
                </View>
            ) : (
                <FlatList
                    data={progressTasks}
                    renderItem={({ item }) => <ProgressStatusCard task={item} />}
                    keyExtractor={(item) => item.taskId.toString()}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.cardsSlide}
                />
            )}
        </View>
    );

    const GroupTaskCard = ({ group }) => {
        const completedTasksCount = group.tasks.filter(task => task.status === 'Completed').length;
        const totalTasksCount = group.tasks.length;
        const progressPercentage = (completedTasksCount / totalTasksCount) * 100 || 0;
    
        return (
            <View style={styles.groupCard}>
                <View style={styles.groupTaskText}>
                    <Icon category={group.category} bg={true} />
                    <View>
                        <Text style={styles.taskCategoryName}>{group.category} Projects</Text>
                        <Text style={styles.taskgroupCount}>{totalTasksCount} Tasks</Text>
                    </View>
                </View>
                <View style={styles.reviewProgress}>
                    <CircularProgress
                        value={progressPercentage}
                        valueSuffix={'%'}
                        radius={26}
                        progressValueColor={colors.dark}
                        progressValueStyle={{ fontWeight: '500', fontSize: 14 }}
                        maxValue={100}
                        titleColor={colors[group.category.toLowerCase() + 'D']}
                        activeStrokeColor={colors[group.category.toLowerCase() + 'D']}
                        inActiveStrokeColor={colors[group.category.toLowerCase() + 'D']}
                        inActiveStrokeOpacity={0.3}
                        inActiveStrokeWidth={5}
                        activeStrokeWidth={4}
                    />
                </View>
            </View>
        );
    };
    

    const TasksGroups = () => {
        const taskGroups = [
            { category: 'Work', tasks: workTasks },
            { category: 'Office', tasks: officeTasks },
            { category: 'Personal', tasks: personalTasks },
            { category: 'Education', tasks: educationTasks },
            { category: 'Health', tasks: healthTasks }
        ];
    
        const renderGroupTaskCard = ({ item }) => (
            <GroupTaskCard group={item} />
        );
    
        return (
            <FlatList
                data={taskGroups}
                renderItem={renderGroupTaskCard}
                keyExtractor={(item) => item.category}
                ListHeaderComponent={<Header name="Group Tasks" number={taskGroups.reduce((total, group) => total + group.tasks.length, 0)} />}
            />
        );
    };

 

    const ProfileScreen = () => (
        <FlatList
            data={[{ key: 'userProfile' }, { key: 'todaysReview' }, { key: 'inProgressTasks' }, { key: 'taskGroups' }]}
            renderItem={({ item }) => {
                switch (item.key) {
                    case 'userProfile':
                        return <UserProfile />;
                    case 'todaysReview':
                        return <TodaysReviewCard />;
                    case 'inProgressTasks':
                        return <GetInProgressTasks />;
                    case 'taskGroups':
                        return <TasksGroups />;
                    default:
                        return null;
                }
            }}
            keyExtractor={(item) => item.key}
        />
    );
    


    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : null}
            
        >
            <View style={styles.tasksScreen}>
            <ProfileScreen  />
            </View>
            <Footer navigation={navigation} />
           
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    tasksScreen: {
        flex: 1,
        paddingHorizontal: 14,
        paddingTop: 40,
        marginBottom: 50,
    },
    loginscreen: {
        backgroundColor: colors.primaryL
    },
    loginContainer:{
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        marginTop: '50%',
        
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
    },
    loader :{
        // width: 30,
        // borderRadius: 10,
    },

    loginText:{
        fontSize: 30,
        fontWeight: '700',
        marginBottom: 10,
    },
    input:{
        borderWidth: 1,
        borderColor: colors.darkL,
        width: '100%',
        height: 55,
        paddingLeft: 10,
        marginVertical: 10,
        borderRadius: 10,

    },
    card:{
        marginVertical: 10,
    },
    userCard: {
        flexDirection:'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    userContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems:'center',
    },
    userImage: {
        width: 45,
        height: 45,
        borderRadius: 100,
        marginRight: 13,
    },
    textContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    name: {
        color: colors.dark,
        fontSize: 18,
        fontWeight: '800',
        marginLeft: 4,
    },
    greet: {
        color: colors.dark,
        fontSize: 18,
        fontWeight: '400',
    },
    reviewCard:{
        backgroundColor: colors.primaryD,
        color: colors.white,
        borderRadius: 28,
        height: 120,
        flexDirection:'row',
        alignItems: 'center',
    },
    reviewText : {
        width: '73%',
        paddingLeft: 14,
        color: colors.white,
        fontSize: 16.5,
        fontWeight: "500",
    },
    reviewProgress: {
        width: '30%'
    },

    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    header: {
        fontSize: 20,
        fontWeight: '700',
        color: colors.dark,
    },
    countContainer: {
        backgroundColor: colors.primaryL,
        width: 20,
        height: 20,
        flexDirection: 'column',
        textAlign: 'center',
        alignItems: 'center',
        borderRadius: 100,
        marginLeft: 5,
        marginTop: 6,

    },
    count: {
        color: colors.primaryD,
        fontSize: 13,
        fontWeight: '600',
    },
    inProgressCard: {
        backgroundColor: "#ebf5fe",
        height: 130,
        width: 210,
        borderRadius: 20,
        padding: 10,
        flexDirection: 'column',
        alignItems: 'start',
        justifyContent: 'center',
        marginHorizontal: 10,
        shadowColor: colors.dark,
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 3,
        marginBottom: 15,
    },
    category: {
        color: colors.darkL,
        fontSize: 15,
        fontWeight: '400'
    },
    taskName: {
        color: colors.dark,
        fontSize: 17,
        fontWeight: '500'
    },
    progressBar: {
        height: 7,
        borderRadius: 20,
        marginTop: 10,
    },
    groupCard:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 75,
        backgroundColor: '#fff',
        borderRadius: 23,
        marginVertical: 6,
    },
    taskIcon: {
        height: 20,
        width: 20,
    },
    taskCategoryName: {
        color: colors.dark,
        fontSize: 18,
        fontWeight: "500",
    },
    taskgroupCount: {
        color: colors.darkL,
        fontSize: 14,
    },
    groupTaskText:{
        flexDirection: "row",
        alignItems: 'center',
        width: '80%'
    }

    
})

export default Profile