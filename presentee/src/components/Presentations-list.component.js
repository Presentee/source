import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  retrievePresentations,
  findPresentationsByTitle,
  deleteAllPresentations,
} from "../slices/presentations";
import { Link } from "react-router-dom";

const PresentationsList = () => {
  const [currentPresentation, setCurrentPresentation] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchTitle, setSearchTitle] = useState("");

  const presentations = useSelector(state => state.presentations);
  const dispatch = useDispatch();

  const onChangeSearchTitle = e => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };

  const initFetch = useCallback(() => {
    dispatch(retrievePresentations());
  }, [dispatch])

  useEffect(() => {
    initFetch()
  }, [initFetch])

  const refreshData = () => {
    setCurrentPresentation(null);
    setCurrentIndex(-1);
  };

  const setActivePresentation = (presentation, index) => {
    setCurrentPresentation(presentation);
    setCurrentIndex(index);
  };

  const removeAllPresentations = () => {
    dispatch(deleteAllPresentations())
      .then(response => {
        refreshData();
      })
      .catch(e => {
        console.log(e);
      });
  };

  const findByTitle = () => {
    refreshData();
    dispatch(findPresentationsByTitle({ title: searchTitle }));
  };

  return (
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by title"
            value={searchTitle}
            onChange={onChangeSearchTitle}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByTitle}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <h4>Presentations List</h4>

        <ul className="list-group">
          {presentations &&
            presentations.map((presentation, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActivePresentation(presentation, index)}
                key={index}
              >
                {presentation.title}
              </li>
            ))}
        </ul>

        <button
          className="m-3 btn btn-sm btn-danger"
          onClick={removeAllPresentations}
        >
          Remove All
        </button>
      </div>
      <div className="col-md-6">
        {currentPresentation ? (
          <div>
            <h4>Presentation</h4>
            <div>
              <label>
                <strong>Title:</strong>
              </label>{" "}
              {currentPresentation.title}
            </div>
            <div>
              <label>
                <strong>Description:</strong>
              </label>{" "}
              {currentPresentation.description}
            </div>
            <div>
              <label>
                <strong>Status:</strong>
              </label>{" "}
              {currentPresentation.published ? "Published" : "Pending"}
            </div>

            <Link
              to={"/presentations/" + currentPresentation.id}
              className="badge badge-warning"
            >
              Edit
            </Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Presentation...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PresentationsList;