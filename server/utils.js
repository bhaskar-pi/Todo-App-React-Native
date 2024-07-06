
const toCamelCase = (str) => {
    return str.replace(/_([a-z])/g, (match, p1) => p1.toUpperCase());
};

 const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

const convertKeysToCamelCase = (tasks) => {
    return tasks.map(task => {
        const convertedTask = {};
        for (const key in task) {
            if (task.hasOwnProperty(key)) {
                const camelCaseKey = toCamelCase(key);
                convertedTask[camelCaseKey] = task[key];
            }
        }
        return convertedTask;
    });
};

const toSnakeCase = (str) => {
    return str.replace(/([A-Z])/g, (match) => `_${match.toLowerCase()}`);
};

const convertKeysToSnakeCase = (tasks) => {
    return tasks?.map(task => {
        const convertedTask = {};
        for (const key in task) {
            if (task.hasOwnProperty(key)) {
                const snakeCaseKey = toSnakeCase(key);
                convertedTask[snakeCaseKey] = task[key];
            }
        }
        return convertedTask;
    });
};

module.exports = {
    convertKeysToCamelCase,
    convertKeysToSnakeCase,
    formatDate
};
