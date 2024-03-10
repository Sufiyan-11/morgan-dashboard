import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/Auth';
import Moment from 'react-moment';
import parse from 'html-react-parser';

const TestimonialData = (props) => {
    const { currentUser } = useContext(AuthContext);
    const { id,
        testTopicName,
        testTimestamp,
        testIsActiveStatus,
        onClickhandleEdit
    } = props;
    return (
        <div className={"col-lg-4 session-card " + testTopicName}>
            <div className="card mb-3">
            <iframe width="346" height="200" src={testTopicName} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                <div className="card-body">
                <div className='d-flex justify-content-between'>
                    {testIsActiveStatus == 1 ?  <span className='text-success'>Active</span> : <span className='text-danger'>In Active</span>}
                    <a className="edit-btn" title="Edit Post" data-toggle="modal" data-target="#exampleModal" onClick={onClickhandleEdit}><i className="fas fa-pencil-alt"></i></a>
                </div>
                <div className="user-profile-data">
                    <small className="card-text profile-text"><b>Posted By :</b> {currentUser.displayName}</small><br />
                    <small className="card-text profile-text"><b>Posted On :</b> <Moment format="DD MMM YYYY">{testTimestamp}</Moment></small>
                </div>                   
                </div>
                </div>
        </div>

    )
}

export default TestimonialData