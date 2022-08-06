import React, { useState, ChangeEvent } from "react";
import { TutorialService } from "../services/Tutorial";
import ITutorialData from "../types/Tutorial";

export const AddTutorial: React.FC = () => {
  const initialTutorialState: ITutorialData = {
    id: null,
    title: "",
    description: "",
    published: false
  };

  const [tutorial, setTutorial] = useState<ITutorialData>(initialTutorialState);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setTutorial({ ...tutorial, [name]: value });
  };

  const addTutorial = () => {
    setTutorial(initialTutorialState);
    setSubmitted(false);
  };

  const saveTutorial = () => {
    let data: ITutorialData = {
      title: tutorial.title,
      description: tutorial.description
    };

    TutorialService.create(data)
      .then((response: any) => {
        setTutorial({
          id: response.data.id,
          title: response.data.title,
          description: response.data.description,
          published: response.data.published
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch((e: Error) => console.log(e));
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={addTutorial}>
            Add
          </button>
        </div>
      ) : (
        <>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              required
              value={tutorial.title}
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
              value={tutorial.description}
              onChange={handleInputChange}
              name="description"
            />
          </div>
          <button onClick={saveTutorial} className="btn btn-success">
            Submit
          </button>
        </>
      )}
    </div>
  );
};
