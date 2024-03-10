import React, { useState, useEffect, useContext } from 'react';
import firebase from '../../config/Fire';
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import { AuthContext } from '../../context/Auth';
import $ from 'jquery';
import Loader from "../../common/Loader/Loader";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import TestimonailData from '../../components/TestimonialData/TestimonialData';

function Testimonails() {
    const [showModal, setShowModal] = useState(false);

    const { currentUser } = useContext(AuthContext);

    const [testPosition, setTestPosition] = useState("");
    const [testTopic, setTestTopic] = useState("");
    const [testLongDescription, setTestLongDescription] = useState("");
    const [testIsActive, setTestIsActive] = useState("");
    const [formComplete, setFormComplete] = useState(false);
    const [formIncompleteError, setFormIncompleteError] = useState(false);

    const [testPositionNo, setTestPositionNo] = useState("");
    const [testTopicName, setTestTopicName] = useState("");
    const [testLongDetail, setTestLongDetail] = useState("");
    const [testIsActiveStatus, setTestIsActiveStatus] = useState("");
    const [testTimestamp, setTestTimestamp] = useState("");

    const [testData, setTestData] = useState("");
    const [isTestAdded, setIsTestAdded] = useState(false);
    const [isTestEdited, setIsTestEdited] = useState(false);
    const [isTestDelete, setIsTestDelete] = useState(false);

    const [editLink, setEditLink] = useState("");
    const [editLocation, setEditLocation] = useState("");

    const [file, setFile] = useState(null);

    const [editDetails, setEditDetails] = useState(false);

    const [testId, setTestId] = useState("");

    const testTopics = React.useRef();
    const testPositions = React.useRef();

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setIsTestAdded(false);
        setIsTestEdited(false);
        setIsTestDelete(false);
        getTestData();
        // filterStatus();
    }, [isTestAdded, isTestEdited, isTestDelete]);

    function handleChange(e) {
        setFile(e.target.files[0]);
    }

    function handleUpload(e) {
        e.preventDefault();
        var today = new Date();
        var time = today.getHours() + "_" + today.getMinutes() + "_" + today.getSeconds();
    }

    const getTestData = () => {
        // Axios
        // .get(`https://software-bazaar-default-rtdb.firebaseio.com/testimonails.json`)
        firebase.database().ref(`test`).get()
            .then((response) => {
                // setTestData(response.data)
                setTimeout(setTestData(response.val()), 5000);
                setLoading(false);
            })
            .catch((error) => console.log(error));
    };

    const handleAddTestData = (e) => {
        //   check if all input is taken
        if (testPositions.current.value.length === 0 || testTopics.current.value.length === 0) {
            setFormComplete(false);
            setFormIncompleteError(true);
        } else {
            if (editDetails) {
                // Axios
                // .put(`https://educaretech-dashboard-default-rtdb.firebaseio.com/SessionData/${postId}.json`,
                firebase.database().ref(`test/${testId}`).set(
                    {
                        testPositionNo: testPositionNo === "" ? testPosition : testPositionNo,
                        testTopicName: testTopicName === "" ? testTopic : testTopicName,
                        testIsActiveStatus: testIsActiveStatus === "" ? testIsActive : testIsActiveStatus,
                        testusername: currentUser.displayName,
                        testuserprofile: currentUser.photoURL,
                        testTimestamp: new Date().toUTCString(),
                    }
                )
                    .then((response) => {
                        alert("Career edited succesfully");
                        window.location.reload();
                        setIsTestEdited(true);
                    })
                    .catch((error) => console.log("Error in editDetails" + error));
            }
            //  if user wants to add a new card
            else {
                // if user wants to edit then put request is used
                // Axios
                // .post(`https://educaretech-dashboard-default-rtdb.firebaseio.com/SessionData.json`,
                firebase.database().ref('test/').push(
                    {
                        testPositionNo: testPosition,
                        testTopicName: testTopic,
                        testIsActiveStatus: testIsActive,
                        testusername: currentUser.displayName,
                        testuserprofile: currentUser.photoURL,
                        testTimestamp: new Date().toUTCString(),

                    }
                )
                    .then((response) => {
                        alert("Career added succesfully");
                        // swal("succesful!", "test added succesfully!", "success");
                        window.location.reload();
                        setIsTestAdded(true);
                    })
                    .catch((error) => console.log("Error" + error));
            }

            setShowModal(false);

            setTestPositionNo("");
            setTestTopicName("");
            setTestIsActiveStatus("");
            setTestTimestamp("");
            setEditLocation("");
        }
    };

    const handleEdit = (
        testTopic,
        testPosition,
        testIsActive,
        testId,
        e
    ) => {
        setShowModal(true);
        setEditDetails(true);

        setTestTopic(testTopic);
        setTestPosition(testPosition);
        setTestIsActive(testIsActive);
        setTestId(testId);
    };

    // handles archive on card archive click
    const handleDelete = (testId, e) => {
        if (window.confirm("Are you sure you want to delete the Career?")) {
            // Axios
            // .delete(`https://educaretech-dashboard-default-rtdb.firebaseio.com/SessionData/${testId}.json`)
            firebase.database().ref(`test/${testId}`).remove()
                .then((response) => {
                    alert("testimonial deleted succesfully");
                    window.location.reload();
                    setIsTestDelete(true);
                })
                .catch((error) => console.log("Error" + error));
        }
    };

    $(document).ready(function () {
        $('#search-input').keyup(function () {
            // Search text
            var text = $(this).val();
            // Hide all content className element
            $('.session-card').hide();
            // Search and show
            $('.session-card:contains("' + text + '")').show();
        });
    });


    const modalCloseHandler = () => { setShowModal(false); setEditDetails(false); };

    let modalContent = showModal ?

        (
            <>
                <div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" data-backdrop="static">
                    <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">{editDetails ? "Edit Testimonial" : "Add Testimonial"}</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={modalCloseHandler}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={handleUpload}>
                                    <div className="form-group">
                                        {formIncompleteError ? <p style={{ color: 'red' }}>Kindly complete the form before adding Column</p> : null}
                                    </div>
                                    <div className="form-group">
                                        <label for="topic">Testimonial video url</label>
                                        <input type="text" className="form-control" id="topic"
                                            defaultValue={editDetails ? testTopic : ""}
                                            ref={testTopics}
                                            onChange={(event) => setTestTopic(event.target.value)}
                                            placeholder="Enter Topic Name" />
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group col-md-6">
                                            <label for="session">position</label>
                                            <input type="text" className="form-control" id="session"
                                                defaultValue={editDetails ? testPosition : ""}
                                                ref={testPositions}
                                                onChange={(event) => setTestPosition(event.target.value)}
                                                placeholder="Enter session" />
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label for="status">Status</label>
                                            <select id="status" className="form-control"
                                                defaultValue={editDetails ? testIsActive : ""}
                                                onChange={(event) => setTestIsActive(event.target.value)}>
                                                <option selected>Select Session Status</option>
                                                <option value="0">In-Active</option>
                                                <option value="1">Active</option>
                                            </select>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" disabled={formComplete} onClick={handleAddTestData} className="btn btn-sm btn-primary">Post</button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
        : null;

    return (
        <>
            <Navbar />
            <div className="wrapper d-flex align-items-stretch">
                <Sidebar />

                <div className="container-fluid main bg-light py-5">
                    <div className="row justify-content-center">
                        <div className="col-lg-11">

                            <div className="add-teacher-profile pb-3">
                                <div className="d-flex justify-content-between">
                                    <div className="title">
                                        <h2 id="teach_profile">Testimonails</h2>
                                        {/* <p>International Early Years Programs from Zero to Six. At Home and Online</p> */}
                                    </div>
                                    <div className="add-post-button">
                                        <button onClick={() => setShowModal(true)} className="btn btn-dark btn-sm" data-toggle="modal" data-target="#exampleModal"><i className="fas fa-plus"></i></button>
                                    </div>
                                </div>
                                <div className="m-content">
                                    {modalContent}
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group col-md-11">
                                    <label for="inputEmail4">Search based on Testimonails Name</label>
                                    <input type="text" className="form-control" placeholder="search data" id="search-input" />
                                </div>
                                <div className="form-group col-md-1 reset-btn">
                                    <button className="btn btn-primary btn-sm" onClick={() => window.location.reload()}>Reset</button>
                                </div>
                            </div>

                            <div className="view-post">
                                {/* <div className="post-datas">
                        <div className="card-deck"> */}
                                {loading ? (
                                    <Loader></Loader>
                                ) : (
                                    <div className="row" id="session-data">

                                        {testData ?
                                            Object.entries(testData).sort((a, b) => a[1].testPositionNo - b[1].testPositionNo).map((item) => (

                                                <TestimonailData key={item[0]}
                                                    id={item[0]}
                                                    testTopicName={item[1].testTopicName}
                                                    testTimestamp={item[1].testTimestamp}
                                                    testIsActiveStatus={item[1].testIsActiveStatus}
                                                    onClickhandleDelete={(e) => handleDelete(item[0], e)}
                                                    onClickhandleEdit={(e) =>
                                                        handleEdit(
                                                            item[1].testTopicName,
                                                            item[1].testPositionNo,
                                                            item[1].testIsActiveStatus,
                                                            item[0],
                                                            e
                                                        )}
                                                />
                                            )) :
                                            <div className="row justify-content-center pt-4">
                                                <div className="col-lg-12">
                                                    <div className="noprogramAdded text-center bg-white border shadow p-5">
                                                        <h2 className="noTaskAdded">Coming Soon</h2>
                                                        <span>We'll notify you as soon as something becomes available.</span>
                                                    </div>
                                                </div>
                                            </div>
                                        }
                                    </div>
                                )}
                            </div>



                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Testimonails