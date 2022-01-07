import React from 'react';
import {Box, Typography} from '@mui/material';
import TasksList from '../TasksList';
import {Category, Task} from '../../common/types';


type TupleCatTasks = [Category, Task[]]

type TasksListWrapperProps = {
  categories: Category[];
  tasks: Task[];
  updateTasks: () => void;
}
const TasksListWrapper = (props:TasksListWrapperProps) => {

  const {
    categories,
    tasks,
    updateTasks
  } = props;


  const getTasks = () => {
    if(tasks && categories) {
      const finalTasks:TupleCatTasks[] = categories.map(category => {

        const catTasks = tasks.filter(task => task.id_categoria === category.id);
        return [category, catTasks]
      })
      return finalTasks.map(finalTask => (<Box key={`category_${finalTask[0].id}`} ><TasksList updateTasks={updateTasks} category={finalTask[0]} tasks={finalTask[1]} /></Box>))
    }
  }
  return (
    <Box>
      <Typography variant={'h3'}>
        Suas Tarefas
      </Typography>
      {getTasks()}
    </Box>
  )
}

export default TasksListWrapper;