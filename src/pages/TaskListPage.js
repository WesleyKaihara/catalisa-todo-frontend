import { Layout,Row,Col,Table,Modal,Button} from "antd";
import axios from "axios";
import {useEffect,useState} from 'react';


const {Content} = Layout;
const {Column} = Table


const TaskListPage = () => {
    const [tasks,setTasks] = useState([])
    const [loading,setLoading] = useState(false)
    const requestTasks = async() => {
        try{
            setLoading(true)
            const response = await axios.get("/tarefas");
            setTasks(response.data);
        }catch(error){
            console.log(error)
            Modal.error({
                title:"Não foi possivel carregar suas tarefas,tente novamente mais tarde"
            });
        }finally{
            setLoading(false);
        }
    }

    useEffect(()=>{
        requestTasks();
    },[]);
    
    const completeTask = async (taskId)=>{
        console.log("clicou",taskId)
        try{
            setLoading(true)
            await axios.put("/tarefas/" + taskId + "/conclusao");
            await requestTasks()
        }catch(error){
            console.log(error)
            Modal.error({
                title:"Não foi possivel concluir a tarefa"
            });
        }finally{
            setLoading(false);
        }
    };

    const renderCompleteTask = (concluida,task) => {
        return (
            <Button 
            onClick={()=>{
                completeTask(task.id);
            }}>
                {concluida?"Sim":"Não"}
            </Button>
        );
    };

    return (
        <Content >
            <Row gutter={[24,24]} justify="center">
                <Col span={23}>  {/*Todos os tamanhos com 23 Col*/}
                    <Table 
                    dataSource={tasks} 
                    pagination={false}
                    loading={loading}
                    > 
                        <Column
                        title="ID"
                        dataIndex="id"
                        key="id"
                        />
                        <Column
                        title="Titulo"
                        dataIndex="titulo"
                        key="titulo"
                        />
                        <Column
                        title="Criada em"
                        dataIndex="data_criacao"
                        key="data_criacao"
                        render={DataCriacao =>{
                            return new Date(DataCriacao).toLocaleString();
                        }}
                        />
                        <Column
                        title="Concluida"
                        dataIndex="concluida"
                        key="concluida"
                        render={renderCompleteTask}
                        />
                    </Table>
                </Col>
            </Row>
        </Content>
    );
}

export default TaskListPage;
