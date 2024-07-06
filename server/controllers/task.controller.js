const { convertKeysToCamelCase, convertKeysToSnakeCase, formatDate } = require("../utils")

// create new task
const createTask = async(request, response) => {
    const {taskName, category, description, startDate, endDate, priority, status} = request.body.data

    try {
        const db = request.myDB
        const userId = request.id

        if (!userId){
            return response.status(401).json({success: false, message: "You're un authorized."})
        }

        const [maxResult] = await db.execute('SELECT MAX(user_task_id) AS max_number FROM tasks WHERE user_id = ?', [userId]);
        const userTaskId = (maxResult[0].max_number || 0) + 1;

        await db.execute(`
            INSERT INTO tasks (user_id, user_task_id, task_name, category, description, start_date, end_date, priority, status)
            VALUES(?, ?, ?, ?, ?,?, ?, ?, ? )
        `, [userId, userTaskId, taskName, category, description, formatDate(startDate), formatDate(endDate), priority, status])

        response.status(201).json({success: true, message: "Task created successfully."})
    } catch (error) {
        console.error("Error creating task:", error);
        response.status(500).json({ success: false, message: "Internal server error" });
    }
}

// get all tasks of user

const getAllTasksOfUser = async(request, response) => {
    const userId = request.id
    const db = request.myDB

    try {
        if (!userId){
            return response.status(401).json({success: false, message: "Session expired"})
        }
        const [results] = await db.execute(`SELECT * FROM tasks WHERE user_id = ?`, [userId])
        
        const formattedResults = convertKeysToCamelCase(results)
        response.status(200).json({success: true, tasks: formattedResults})

    } catch (error) {
        console.log("error at getting all tasks of user", error)
        response.status(500).json({success: false, message: "Internal server error"})
    }

}

// get task by ID
const getTaskById = async(request, response) => {
    const {userTaskId} = request.params
    try {
        const userId = request.id 
        const db = request.myDB

        if (!userId){
            return response.status(401).json({success: false, message: "Session expired."})
        }

        const [results] = await db.execute(`SELECT * FROM tasks WHERE user_task_id = ? AND user_id = ?`, [userTaskId, userId])

        const formattedResults = convertKeysToCamelCase(results)
        response.status(200).json({success: true, tasks: formattedResults})

    } catch (error) {
        console.log("error at getting task by id", error)
        response.status(500).json({success: false,message: "Internal server error"})
    }
}

// get task by category

const getTasksByCategory = async(request, response) => {
    const {category} = request.params
    try {
        const userId = request.id 
        const db = request.myDB

        if (!userId){
            return response.status(401).json({success: false, message: "Session expired."})
        }

        const [results] = await db.execute(`SELECT * FROM tasks WHERE category = ? AND user_id = ?`, [category, userId])

        const formattedResults = convertKeysToCamelCase(results)
        response.status(200).json({success: true, tasks: formattedResults})

    } catch (error) {
        console.log("error at getting task by id", error)
        response.status(500).json({success: false,message: "Internal server error"})
    }
}

// get task by status
const getTasksByStatus = async(request, response) => {
    const {status} = request.body
    try {
        const userId = request.id 
        const db = request.myDB

        if (!userId){
            return response.status(401).json({success: false, message: "Session expired."})
        }

        const [results] = await db.execute(`SELECT * FROM tasks WHERE status = ? AND user_id = ?`, [status, userId])

        const formattedResults = convertKeysToCamelCase(results)

        response.status(200).json({success: true, tasks: formattedResults})

    } catch (error) {
        console.log("error at getting task by id", error)
        response.status(500).json({success: false,message: "Internal server error"})
    }
}

// delete task by ID
const deleteTaskById = async(request, response) => {
    const {userTaskId} = request.params
    try {
        const userId = request.id 
        const db = request.myDB

        if (!userId){
            return response.status(401).json({success: false, message: "Session expired."})
        }

        const [results] = await db.execute(`SELECT * FROM tasks WHERE user_task_id = ? AND user_id = ?`, [userTaskId, userId])
        if (results.length === 0){
            return response.status(404).json({success: false, message: 'Task not found to delete.'})
        }

        await db.execute('DELETE FROM tasks WHERE user_task_id = ? AND user_id = ?', [userTaskId, userId]);
        response.status(200).json({success: true, message: "Task deleted successfully"})

    } catch (error) {
        console.log("error at deleting task by id", error)
        response.status(500).json({success: false,message: "Internal server error"})
    }
}


const updateTask = async(request, response) => {
    const data = request.body.data
    const db = request.myDB
    const userId = request.id

    try {
        if (!userId){
            return response.status(401).json({success: false, message: "Session expired."})
        }

        const [results] = await db.execute('SELECT * FROM tasks WHERE user_task_id = ? AND user_id = ?', [data.userTaskId, userId]);
        if (results.length === 0) {
            return response.status(404).json({success: false, message: "Task not found to update." });
        }

        const formattedStartDate = formatDate(data.startDate);
        const formattedEndDate = formatDate(data.endDate);

        await db.execute(
            `UPDATE tasks SET 
            category= ?, 
            task_name = ?, 
            description = ?, 
            start_date = ?, 
            end_date = ?, 
            priority = ?, 
            status = ? 
            WHERE user_task_id = ? AND user_id = ?`,
            [
                data.category,
                data.taskName,
                data.description,
                formattedStartDate,
                formattedEndDate,
                data.priority,
                data.status,
                data.userTaskId,
                userId
            ]
        );

        response.status(200).json({ success: true, message: "Task updated successfully" });
       
    } catch (error) {
        console.log("Error updating task", error);
        response.status(500).json({ success: false, message: "Internal server error" });
    }
}



module.exports = {createTask, getAllTasksOfUser, getTaskById, deleteTaskById, updateTask, getTasksByCategory, getTasksByStatus}