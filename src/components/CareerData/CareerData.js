import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/Auth';
import Moment from 'react-moment';
import parse from 'html-react-parser';


const CareerData = (props) => {
    const { currentUser } = useContext(AuthContext);
    const { id,
        postTopicName,
        postLongDetail,
        postTimestamp,
        postLink,
        postLocation,
        postTypeName,
        onClickhandleEdit,
        onClickhandleDelete,
        postIsActiveStatus,
    } = props;


    return (
        <div className={"col-lg-4 session-card " + postTopicName}>
            <div className="card activity-card3 shadow mb-3">
                <div className="card-body">
                    <a className="view-data" data-toggle="modal" data-target={"#" + id}>
                        <h4 className="card-title blog-post-title">{postTopicName}</h4>
                        <h5>Location : {postLocation}</h5>
                        <h5>Type : {postTypeName}</h5>
                        {/* <div className="long-disc py-4">{parse(`${postLongDetail.substring(0,50)}...`)}</div> */}
                    </a>
                </div>
                <div className="view-session d-flex justify-content-between px-3 pb-2">
                    <div className="user-profile-data">
                        {postIsActiveStatus == 1 ? <span className='card-text text-success'>Active</span> : <span className='card-text text-danger'>In Active</span>}<br />
                        <small className="card-text profile-text"><b>Posted By :</b> {currentUser.displayName}</small><br />
                        <small className="card-text profile-text"><b>Posted On :</b> <Moment format="DD MMM YYYY">{postTimestamp}</Moment></small>
                    </div>
                    <div className="like-comment">
                        <a className="edit-btn" title="Edit Post" data-toggle="modal" data-target="#exampleModal" onClick={onClickhandleEdit}><i className="fas fa-pencil-alt"></i></a>
                    </div>
                </div>
                {/* view post modal*/}
                <div className="modal modal-right fade" id={id} tabindex="-1" role="dialog" aria-labelledby={id}>
                    <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title card-title activity-title text-primary" id="exampleModalLabel">Career Data</h5>
                                <div className="d-flex">
                                    <button type="button" className="close btn trash-post" onClick={onClickhandleDelete}>
                                        <span><i className="fas fa-trash"></i></span>
                                    </button>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true"><i className="far fa-times-circle"></i></span>
                                    </button>
                                </div>
                            </div>
                            <div className="modal-body">
                                <div className="container">
                                    <div className="row justify-content-center">
                                        <div className="col-lg-12 col-md-12 text-rigth">
                                            <h4 className="card-title activity-title">{postTopicName}</h4>
                                            <h4>Location : {postLocation}</h4>
                                            <div className="long-disc py-4">{parse(`${postLongDetail}`)}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-sm btn-primary" data-dismiss="modal" aria-label="Close">
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* view post */}
            </div>
        </div>

    );
};

export default CareerData