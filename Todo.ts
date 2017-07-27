//todo: make sure you send reminder email using cloud functions; by going through the entire list
//todo: add another cloud function to see whether any of the scheduled job has met the due date

class Store {
    columnNames:{name:string,displayName:string}[]=[]
    searchResults:Task[]=[];
    currentSortCol:string;
    currentFilter:Filter;
    tasks: Task[];
    filteredTasks: Task[];
    newTask: Task;
    selectedTask:Task;
    scheduledTasks:Schedule[];
}
class Filter {
    dateFilter: number;
    type: Type;
    status: Status;
    priority: Priority;
    tags: string[] = [];
}

const ACTION_SAVE_REMINDER: string = "SAVE_REMINDER"
const ACTION_SAVE_SCHEDULED_TASK: string = "SAVE_SCHEDULED_TASK"
const ACTION_SCHEDULE_TASKS: string = "SCHEDULE_TASKS"
const ACTION_SEARCH_TASKS: string = "SEARCH_TASKS"
const ACTION_LOAD_TASKS: string = "LOAD_TASKS"
const ACTION_NEW_TASK: string = "ADD_TASK"
const ACTION_SAVE_TASK: string = "SAVE_TASK"
const ACTION_FILTER_TASK: string = "FILTER_TASK"
const ACTION_SORT: string = "SORT"
const ACTION_SET_CUSTOM_ORDER: string = "SET_CUSTOM_ORDER"
const ACTION_ROW_SELECT: string = "ROW_SELECT"
const ACTION_ADD_NEW_TASK_TO_LIST: string = "ADD_NEW_TASK_TO_LIST"

class TaskStoreService {
    store: Store;
    updateState(action: Action) {
        switch (action.type) {
            case ACTION_SAVE_REMINDER: {
                //todo: chnages for scheduling
                this.saveSchedule(action.data.task);
                break;
            }
            case ACTION_SAVE_SCHEDULED_TASK: {
                this.saveReminder(action.data.task);
                break;
            }
            case ACTION_SCHEDULE_TASKS: {
                //todo: show modal popup by calling schedule component
                break;
            }
            case ACTION_SEARCH_TASKS: {
                //todo: fire angular service and populate 'searchResults' field
                break;
            }
            case ACTION_LOAD_TASKS: {
                //todo: make service call using angular and get all the data in
                break;
            }
            case ACTION_NEW_TASK: {
                //todo: set newTask, which should enable new task in 'tasklistcomponent'
                break;
            }
            case ACTION_ADD_NEW_TASK_TO_LIST: {
                //todo: add the task to store>tasks
                break;
            }
            case ACTION_SAVE_TASK: {
                this.saveTask(action.data.task)
                break;
            }
            case ACTION_FILTER_TASK: {
                this.filter(action.data.filter)
                break;
            }
            case ACTION_SORT: {
                //todo:save the current sort in the database so that, if user logsout and comes back again you could preserve the order
                this.filter(action.data.filter)
                break;
            }
            case ACTION_SET_CUSTOM_ORDER: {
                //todo:save the current sort in the database so that, if user logsout and comes back again you could preserve the order
                //todo:customsort.task is empty, this would mean its from keyboard , so set customsort.task=current selected row
                this.setCustomOrder(action.data.customSort)
                //todo:save entire 'filteredlist' in the db as 'order' would have changed for all the filtered tasks (can i only save just 'order' field alone?) 
                break;
            }
            case ACTION_ROW_SELECT: {
                //todo: set current 'selected task' as the passed one
                break;
            }
            default: {
                //statements; 
                break;
            }
        }
    }

    saveTask(task:Task){
        //todo: code for saving the task using 'firebase'
    }

    filter(filter:Filter){
        //todo: go through all of the tasks and generate 'filtered tasks'
    }
    sort(sort:Sort){
        //set current sort column under 'store'
        //todo: get the column and sort the entire filtered list based on the column name and 'asc' attribute   
    }
    setCustomOrder(customSort:CustomSort){
        //todo: set 'currentsortcol' as 'custom' as that none of the column would be shown as sorted, this could be done in TaskListComponent 
        //todo:shift position of selected task in  by one position up/down based on direction in 'filtered task' list
        //todo:run through the filterlist and give it a new custom order using 'order' field.

    }
    saveSchedule(task:Task){
        //todo: invoke the cloud function to check whether this one has met the due date, if yes it will get added to the reat time row and will show up in the list
        //todo:save teh schedule using angular fire
        //todo: take out the task from regular list
    }
    saveReminder(task:Task){
        //todo:invoke the cloud function and see whether reminder needs to be fired
        //todo:save reminder using angular fire
    }


}
class Action {
    type: string;
    data: Data;
}

class Data {
    task: Task;
    filter:Filter;
    sort:Sort;
    customSort:CustomSort;
    selectedTask:Task;

}
class Sort{
    columnName:string;
    asc:boolean
}
class CustomSort{
    task:Task;
    up:boolean;
}

class AppComponent {
    //todo: this will hold menu component,searchlist component, taklistcomponent and filter component

}
class FilterComponent {
    //todo: hold all the filters
}

class SearchListComponent{
    //todo: list all the search results with closable icon
}
//to hold all the menus
class MenuComponent {

}

class TaskListComponent {
    //todo: need to accommodate another div for holding task to be added.
    //todo: this will hold all the tasks
    //todo: need to have separate row for column
    //todo: will have to handle column sort
    
}
class TaskComponent {
    //todo: will need to have an additional column for custom sort.; handle up/down for this 
}

class ScheduleTaskComponent{

}

class FirebaseService {
    save(task: Task) {

    }
    update(task: Task) {

    }
    saveAll(taskList: Task[]) {

    }
}



class Task {
    task: string;
    order: number;
    dueDate: Date;
    status: Status;
    type: Type;
    priority: Priority;
    tags: string[] = [];
    reminder:Reminder[]=[];
}
class Reminder{
    email:string;
    time:Date;

}
class Schedule{
    repeatFreq:RepeatFreq;
    dayOfMonth:number;
    month:number;
    dayOfWeek:number;
}

enum RepeatFreq{
    DAY,WEEK,MONTH,YEAR
}
enum Priority {
    HIGH, MEDIUM, LOW
}
enum Status {
    DONE, INPROGRESS, NOTDONE
}
enum Type {
    OFFICIAL, PERSONAL
}

