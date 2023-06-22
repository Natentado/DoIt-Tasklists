import { Box, Grid } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Card from "../../components/Card";
import SearchBox from "../../components/Form/SearchBox";
import { Header } from "../../components/Header";
import { useAuth } from "../../contexts/AuthContext";
import { useTasks } from "../../contexts/TasksContext";

export const Dashboard = () => {

    const [ isLoading, setIsLoading ] = useState(true);

    const { user, accessToken } = useAuth();
    const { tasks, loadTasks } = useTasks();

    useEffect(() => {
        loadTasks(user.id, accessToken)
        .then((_) => setIsLoading(false));
    }, []);
    
    return (
        <Box>
            <Header />
            <SearchBox />
            <Grid w="100%" templateColumns="repeat(auto-fill, minmax(420px, 1fr))" gap={10} mt="8" px="8">
                {tasks.map((task, i) => <Card task={task} key={i} />)}
            </Grid>
        </Box>
    )
};