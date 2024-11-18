import React, { useEffect, useState } from 'react'
import { Table, Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Add from '../components/Add'
import Edit from '../components/Edit';
import Header from '../components/Header';
import { taskDeleteAPI, userTasksAPI } from '../service/allApi';


const TaskList = () => {
  const [username, setUsername] = useState("")
  const [userTasks, setUserTasks] = useState([])


  useEffect(() => {
    if (sessionStorage.getItem("user")) {
      setUsername(JSON.parse(sessionStorage.getItem("user")).username.split(" ")[0])
    }
    else {
      setUsername("")
    }
  }, [])

  useEffect(()=>{
    getUserTasks()
  },[])
  const getUserTasks = async () => {
    const token = sessionStorage.getItem("token")
    if (token) {
      const reqHeader = {
        "Authorization": `Bearer ${token}`
      }
      try {
        const result = await userTasksAPI(reqHeader)
        // console.log(result);
        if (result.status == 200) {
          setUserTasks(result.data)
        }
      }
      catch (err) {
        console.log(err);

      }
    }
  }
  const deleteTasks=async(id)=>{
    const token = sessionStorage.getItem("token")
    if(token)
    {
      const reqHeader={Authorization:`Bearer ${token}`}
      try
      {
        await taskDeleteAPI(id,reqHeader)
        getUserTasks()
      }
      catch(err)
      {
        console.log(err);
      }

    }
   
  }
  return (
    <>
      <Header insideTasklist={true}/>
      <div style={{ minHeight: '90vh', width: '100%', }} className="bg-light">
        <Container className="py-5">
          {/* Header Section */}
          <Row className="align-items-center mb-4">
            <Col>
              <h2 className="text-dark display-5">Welcome <span className='text-danger'>{username}</span></h2>
              <p className="text-muted">Keep track of all your tasks in one place</p>
            </Col>
            <Col className="text-end">
              <Add getUserTasks={getUserTasks} />
            </Col>
          </Row>

          {/* Task Table */}
          <Table bordered hover responsive className="shadow-sm">
            <thead style={{ backgroundColor: '#198754', color: '#ffffff' }}>
              <tr>
                <th>Task Heading</th>
                <th>Description</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Status</th>
                <th>Progress</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {
                userTasks.length > 0 ?
                  userTasks?.map(task => (
                    <tr key={task?._id}>
                      <td>{task?.taskname}</td>
                      <td>{task?.description}</td>
                      <td>{task?.startDate}</td>
                      <td>{task?.endDate}</td>
                      <td>
                        <span className="badge bg-warning text-dark">{task?.status}</span>
                      </td>
                      <td>
                        <span >{task?.progress}</span>
                      </td>
                      <td>
                        <Edit task={task} getUserTasks={getUserTasks} />
                        <Button onClick={()=>deleteTasks(task?._id)} variant="outline-danger" size="md">
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))
                  :
                  <div className='text-center text-danger mt-5'>No tasks available</div>
              }

            </tbody>
          </Table>
        </Container>
      </div>
    </>
  )
}

export default TaskList