import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams, useNavigate } from 'react-router-dom';
import { updatePresentation, deletePresentation } from "../slices/presentations";
import PresentationDataService from "../services/presentation.service";

const Presentation = (props) => {
  const { id }= useParams();
  let navigate = useNavigate();

  const initialPresentationState = {
    id: null,
    title: "",
    description: "",
    published: false
  };
  const [currentPresentation, setCurrentPresentation] = useState(initialPresentationState);
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  const getPresentation = id => {
    PresentationDataService.get(id)
      .then(response => {
        setCurrentPresentation(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    if (id)
      getPresentation(id);
  }, [id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentPresentation({ ...currentPresentation, [name]: value });
  };

  const updateStatus = status => {
    const data = {
      id: currentPresentation.id,
      title: currentPresentation.title,
      description: currentPresentation.description,
      published: status
    };

    dispatch(updatePresentation({ id: currentPresentation.id, data }))
      .unwrap()
      .then(response => {
        console.log(response);
        setCurrentPresentation({ ...currentPresentation, published: status });
        setMessage("The status was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const updateContent = () => {
    dispatch(updatePresentation({ id: currentPresentation.id, data: currentPresentation }))
      .unwrap()
      .then(response => {
        console.log(response);
        setMessage("The tutorial was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const removePresentation = () => {
    dispatch(deletePresentation({ id: currentPresentation.id }))
      .unwrap()
      .then(() => {
        navigate("/presentations");
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentPresentation ? (
        <div className="edit-form">
          <h4>Presentation</h4>
          <form>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={currentPresentation.title}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                name="description"
                value={currentPresentation.description}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>
                <strong>Status:</strong>
              </label>
              {currentPresentation.published ? "Published" : "Pending"}
            </div>
          </form>

          {currentPresentation.published ? (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updateStatus(false)}
            >
              UnPublish
            </button>
          ) : (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updateStatus(true)}
            >
              Publish
            </button>
          )}

          <button className="badge badge-danger mr-2" onClick={removePresentation}>
            Delete
          </button>

          <button
            type="submit"
            className="badge badge-success"
            onClick={updateContent}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Presentation...</p>
        </div>
      )}
    </div>
  );
};

export default Presentation;