import React, { useState } from 'react'
import { Form, Button, FloatingLabel, Modal } from 'react-bootstrap';
import { taskUpdateAPI } from '../service/allApi';


const Edit = ({task,getUserTasks}) => {
    const [showModal, setShowModal] = useState(false);

    const [mainTask,setMainTask]=useState({
      id:task._id,taskname: task.taskname,description: task.description,startDate:task.startDate ,endDate:task.endDate,status: task.status,progress: task.progress
    })

    const handleShow = () => {
      setShowModal(true);
      setMainTask({
        id:task._id,taskname: task.taskname,description: task.description,startDate:task.startDate ,endDate:task.endDate,status: task.status,progress: task.progress
      })
    }
    const handleClose = () => {
      setShowModal(false);
      setMainTask({
        id: task._id,taskname: task.taskname,description: task.description,startDate:task.startDate ,endDate:task.endDate,status: task.status,progress: task.progress
      })
    }

    const handleUpdateTask=async()=>{
      
      const {id,taskname,description,startDate,endDate,status}=mainTask
      if(taskname && description && startDate && endDate && status)
      {
        const token = sessionStorage.getItem("token")
        if(token)
        {
          const reqHeader={Authorization:`Bearer ${token}`}
          try
          {
            const result= await taskUpdateAPI(id,mainTask,reqHeader)
            if(result.status==200)
            {
              alert("Task Updated Successfully")
              getUserTasks()
              handleClose()
            }
          }
          catch(err)
          {
            console.log(err);
            
          }
        }
      }
      else
      {
        alert("Please fill all the fields");
      }
    }

  return (
    <>
        
        <Button onClick={handleShow} variant="outline-primary" size="md" className="me-2" >
                    Edit
         </Button>

        {/* Modal for Add Task Form */}
      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Update Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Add Task Form */}
          <Form>
            {/* Task Heading */}
            <FloatingLabel controlId="floatingTaskHeading"  label="Task name" className="mb-3" >
              <Form.Control value={mainTask.taskname} onChange={e=>setMainTask({...mainTask,taskname:e.target.value})} type="text" placeholder="Task Name" />
            </FloatingLabel>

            {/* Task Description */}
            <FloatingLabel  controlId="floatingTaskDescription"  label="Task Description"  className="mb-3">
              <Form.Control value={mainTask.description} onChange={e=>setMainTask({...mainTask,description:e.target.value})}  as="textarea"  placeholder="Task Description"  style={{ height: '100px' }}  />
            </FloatingLabel>

            {/* Start Date */}
            <Form.Group className="mb-3">
              <Form.Label>Start Date</Form.Label>
              <Form.Control value={mainTask.startDate} onChange={e=>setMainTask({...mainTask,startDate:e.target.value})} min={new Date().toISOString().split('T')[0]} type="date" />
            </Form.Group>

            {/* End Date */}
            <Form.Group className="mb-3">
              <Form.Label>End Date</Form.Label>
              <Form.Control value={mainTask.endDate} onChange={e=>setMainTask({...mainTask,endDate:e.target.value})}  min={mainTask.startDate || new Date().toISOString().split('T')[0]} type="date" />
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
            <Button onClick={handleUpdateTask} variant="dark" className="w-100" >
              Update Task
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

    </>
  )
}

export default Edit