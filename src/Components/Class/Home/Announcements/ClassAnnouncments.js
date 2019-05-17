import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment'


const ClassAnnouncements = (props) => {

  const classID = props.match.params.id;
  const [announcements, setAnnouncements] = useState('');

  useEffect(() => {
    return () => {
      return announcements
    };
  }, [announcements])

  useEffect(() => {
    axios.get(`/api/class/getAnnouncements?classid=${classID}`).then(res => {
      setAnnouncements(res.data);
    }).catch(() => console.log('could not get at this time'));
  }, []);

  function showAnnouncements() {
    if (announcements) {
      
      return announcements.map(announcement => {
        announcement.date = moment(announcement.date).format('M-D-YYYY')
        return (
          <div key={announcement.id} className="class-home-announcement">
          <h3>{announcement.info}</h3>
          <p>{announcement.date}</p>
          </div>
        )
      })
    }
  }
  
  return (

props.user.isTeacher ? (

    <div className="class-home-info-box">
      <h1 className="class-home-box-title">Announcements</h1>
      <button>New Announcement</button>
      <div>
        {showAnnouncements()}
      </div>
    </div>
) : (
  <div className="class-home-info-box">
      <h1 className="class-home-box-title">Announcements</h1>
      <div>
        {showAnnouncements()}
      </div>
    </div>
)
  )

}

export default withRouter(ClassAnnouncements);