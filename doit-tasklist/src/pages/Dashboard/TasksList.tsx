import { Grid, Box } from "@chakra-ui/react";
import Card from "../../components/Card";
import SearchBox from "../../components/Form/SearchBox";
import { Header } from "../../components/Header";
import CardSkeleton from "../../components/Skeleton/CardSkeleton";

type Task = {
    id: string;
    title: string;
    description: string;
    completed: boolean;
};

interface TasksListProps {
    isLoading: boolean;
    tasks:  Array<Task>;
    handleClick: (task: Task) => void;
};

const TasksList = ({isLoading, tasks, handleClick}: TasksListProps) => {
    
    return(
        <Box>
            <Header />
            <SearchBox />
            <Grid
                templateColumns={[
                    "unset",
                    "unset",
                    "repeat(auto-fill, minmax(420px, 1fr))",
                    "repeat(auto-fill, minmax(420px, 1fr))"
                ]}
                justifyContent={["center", "center", "unset", "unset"]}
                gap={10} 
                w="100%"
                mt={["unset", "unset", "8", "8"]}
                px="8"
            >
                {isLoading ?
                    <CardSkeleton repeatCount={6} /> 
                :
                    tasks.map((task) => <Card onClick={handleClick} task={task} key={task.id} />)}
            </Grid>
        </Box>
    );
};

export default TasksList;