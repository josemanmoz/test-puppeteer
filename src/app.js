const pageTodoIst = require('./pages/pageTodoIst');
const pageRandTodoList = require('./pages/pageRandTodoList');

(async() => {
    await pageTodoIst.init('https://todoist.com');
    await pageTodoIst.setLogin('manuel.mozqueda@hotmail.com', 'manuelmozqueda');
    await pageRandTodoList.init('https://randomtodolistgenerator.herokuapp.com/library');
    const arrayTask = await pageRandTodoList.getTasks(5);
    await pageTodoIst.addTask(arrayTask);
    await pageRandTodoList.close();
    await pageTodoIst.close();
})()