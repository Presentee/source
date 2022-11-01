import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createPresentation } from "../slices/presentations";

const AddPresentation = () => {
  const initialPresentationState = {
    id: null,
    title: "",
    description: "",
    published: false
  };
  const [presentation, setPresentation] = useState(initialPresentationState);
  const [submitted, setSubmitted] = useState(false);

  const dispatch = useDispatch();

  const handleInputChange = event => {
    const { name, value } = event.target;
    setPresentation({ ...presentation, [name]: value });
  };

  const savePresentation = () => {
    const { title, description } = presentation;

    dispatch(createPresentation({ title, description }))
      .unwrap()
      .then(data => {
        console.log(data);
        setPresentation({
          id: data.id,
          title: data.title,
          description: data.description,
          published: data.published
        });
        setSubmitted(true);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newPresentation = () => {
    setPresentation(initialPresentationState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newPresentation}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              required
              value={presentation.title || ''}
              onChange={handleInputChange}
              name="title"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              required
              value={presentation.description || ''}
              onChange={handleInputChange}
              name="description"
            />
          </div>

          <button onClick={savePresentation} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddPresentation;