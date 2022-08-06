import React, { useState, useEffect, ChangeEvent } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { TutorialService } from "../services/Tutorial";
import ITutorialData from "../types/Tutorial";

export const Tutorial: React.FC = () => {
  const { id } = useParams();
  let navigate = useNavigate();

  const initialTutorialState: ITutorialData = {
    id: null,
    title: "",
    description: "",
    published: false
  };

  const [currentTutorial, setCurrentTutorial] = useState<ITutorialData>(
    initialTutorialState
  );
  const [message, setMessage] = useState<string>("");

  const getTutorial = (id: string) => {
    TutorialService.get(id)
      .then((response: any) => {
        setCurrentTutorial(response.data);
        console.log(response.data);
      })
      .catch((e: Error) => console.log(e));
  };

  useEffect(() => {
    if (id) getTutorial(id);
  }, [id]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCurrentTutorial({ ...currentTutorial, [name]: value });
  };
  const publishedState: boolean = currentTutorial.published!;
  const publishedLabel: string = publishedState ? "UnPublish" : "Publish";

  const updatePublished = (status: boolean) => {
    TutorialService.update(currentTutorial.id, currentTutorial)
      .then((response: any) => {
        console.log(response.data);
        setCurrentTutorial({ ...currentTutorial, published: status });
        setMessage("The tutorial was updated successfully!");
      })
      .catch((e: Error) => console.log(e));
  };

  const updateTutorial = () => {
    TutorialService.update(currentTutorial.id, currentTutorial)
      .then((response: any) => {
        console.log(response.data);
        setMessage("The tutorial was updated successfully!");
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const deleteTutorial = () => {
    TutorialService.remove(currentTutorial.id)
      .then((response: any) => {
        console.log(response.data);
        navigate("/tutorials");
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  return (
    <>
      {currentTutorial ? (
        <div className="edit-form">
          <h4>Tutorial</h4>
          <form>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                name="title"
                id="title"
                className="form-control"
                value={currentTutorial.title}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                id="description"
                name="description"
                className="form-control"
                value={currentTutorial.description}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="">
                <strong>Status:</strong>
                {currentTutorial.published ? "Published" : "Pending"}
              </label>
            </div>
          </form>

          <button
            className="badge badge-primary mr-2"
            onClick={() => updatePublished(!{ publishedState })}
          >
            {publishedLabel}
          </button>
          <button className="badge badge-danger mr-2" onClick={deleteTutorial}>
            Delete
          </button>
          <button
            type="submit"
            className="badge badge-success"
            onClick={updateTutorial}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Tutorial...</p>
        </div>
      )}
    </>
  );
};
