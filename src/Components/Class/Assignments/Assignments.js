import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { withRouter } from 'react-router-dom';
import Assignment from '../../Assignment/Assignment'
import AddAssignment from './AddAssignment'


import './Assignments.css';

const Assignments = (props) => {


  const classID = props.match.params.id;
  const [assignments, setAssignments] = useState([]);
  const [adding, toggleAdd] = useState(false);


  useEffect(() => {
    return () => {
      return assignments
    };
  }, [assignments])

  // console.log(props.user.id)

  useEffect(() => {
    if (props.user.id) {
      axios.get(`/api/class/classAssignments?id=${props.user.id}&classid=${classID}`).then((res) => {
        return setAssignments(res.data)
      }).catch(() => console.log('could not get at this time'));
    }
  }, [props.id])



  return (



    props.user.isTeacher ? (
      <div style={{ marginLeft: '100px' }}>
        <button onClick={() => toggleAdd(true)}>New Assignment</button>
        <AddAssignment
          adding={adding}
          toggleAdd={toggleAdd}
          user={props.user}
          classid={classID}        />
        <div>
          {assignments.map(item => {
            return <Assignment key={item.id}
              assignment={item}
              assignments={assignments}
            />
          })}
        </div>
      </div>
    ) : (
        <div style={{ marginLeft: '100px' }}>
          <div>
            {assignments.map(item => {
              return <Assignment key={item.id}
                assignment={item}
                assignments={assignments}
              />
            })}
          </div>
        </div>
      )
  )

}

export default withRouter(Assignments);