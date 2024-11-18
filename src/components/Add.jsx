import React, { useState } from 'react'
import { Form, Button, FloatingLabel, Modal } from 'react-bootstrap';
import { addTaskAPI } from '../service/allApi';



const Add = ({getUserTasks}) => {

  const [showModal, setShowModal] = useState(false);

  const [mainTask,setMainTask]=useState({
    taskname:"",description:"",startDate:"",endDate:"",status:"",progress:""
  })

// console.log(mainTask);


  const handleShow = () => setShowModal(true);
  const handleClose = () => {
    setShowModal(false);
    setMainTask({taskname:"",description:"",startDate:"",endDate:"",status:"",progress:""})
  }

  const handleAddTask=async()=>{
    const {taskname,description,startDate,endDate,status}=mainTask
    if(taskname && description && startDate && endDate && status)
    {
        const token = sessionStorage.getItem("token")
        if(token)
        {
          const reqHeader={Authorization:`Bearer ${token}`}
          try
          {
            const result= await addTaskAPI(mainTask,reqHeader)
            if(result.status==200)
            {
              alert("Task Added Successfully")
              getUserTasks()
              handleClose()
            }
            else
            {
              alert(result.response.data)
            }
          }
          catch(err)
          {
            console.log(err);
            
          }
        }
        else
        {
          alert("Authentication failed...token Missing!!!")
        }
    }
    else
    {
      alert("Task cannot be empty...Please fill form!!!");
    }
  }

  return (
    <>
      
      <Button variant="success" size="lg" onClick={handleShow} >
        + Add New Task
      </Button>

      {/* Modal for Add Task Form */}
      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add New Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Add Task Form */}
          <Form>
            {/* Task Heading */}
            <FloatingLabel controlId="floatingTaskHeading" label="Task Heading" className="mb-3" >
              <Form.Control value={mainTask.taskname} onChange={e=>setMainTask({...mainTask,taskname:e.target.value})} type="text" placeholder="Task Name" />
            </FloatingLabel>

            {/* Task Description */}
            <FloatingLabel controlId="floatingTaskDescription" label="Task Description" className="mb-3">
              <Form.Control value={mainTask.description} onChange={e=>setMainTask({...mainTask,description:e.target.value})} as="textarea" placeholder="Task Description" style={{ height: '100px' }} />
            </FloatingLabel>

            {/* Start Date */}
            <Form.Group className="mb-3">
              <Form.Label>Start Date</Form.Label>
              <Form.Control value={mainTask.startDate} onChange={e=>setMainTask({...mainTask,startDate:e.target.value})} type="date" min={new Date().toISOString().split('T')[0]} />
            </Form.Group>

            {/* End Date */}
            <Form.Group className="mb-3">
              <Form.Label>End Date</Form.Label>
              <Form.Control value={mainTask.endDate} onChange={e=>setMainTask({...mainTask,endDate:e.target.value})} type="date"  min={mainTask.startDate || new Date().toISOString().split('T')[0]} />
            </Form.Group>

            {/* Status */}
            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select value={mainTask.status} onChange={e=>setMainTask({...mainTask,status:e.target.value})}>
                <option value="" disabled>Select Task Status</option>
                <option value="Not Started">Not Started</option>
                <option value="Started">Started</option>
                <option value="Half Completed">Half Completed</option>
                <option value="Completed">Completed</option>
              </Form.Select>
            </Form.Group>



            {/* Submit Button */}
            <Button onClick={handleAddTask} variant="dark" className="w-100">
              Add Task
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default Add