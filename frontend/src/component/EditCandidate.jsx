import React from 'react'

import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { useState, useEffect } from "react";
const EditCandidate = ({ Candidate_id }) => {
   const id  = Candidate_id;
  const [form, setform] = useState({
    Name: "",
    EmailId: "",
    AiRating: "",
    AppliedOn: "",
    Tag: "",
  });


  
    useEffect(() => {
      let handleData = async () => {
        try {
          let data = await fetch(`${import.meta.env.VITE_API_URL}/candidates/${id}`);
          let result = await data.json();
          if (result != null) {
            setform({
              Name: result.Name,
              EmailId: result.EmailId,
              AiRating: result.AiRating,
              AppliedOn: result.AppliedOn.split("T")[0],
              Tag: result.Tag,
            });
          }
        } catch (error) {
          console.log(error);
        }
      };
      if(id) {
        handleData();
      }
    }, [id]);
  
    let handleChange = (e) => {
      setform({
        ...form,
        [e.target.name]: e.target.value,
      });
    };
    let handleSubmit = async (e,close) => {
     e.preventDefault();
      try {
        let data = await fetch(`${import.meta.env.VITE_API_URL}/candidates/${id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
          body: JSON.stringify(form),
        });
        let result = await data.json();
        if (result) {
          alert("Candidate updated successfully");
          setTimeout(() => {
            // Close the popup after a short delay
            close();
          }, 100);
        }
      } catch (error) {
        console.log("Error in adding candidate:", error);
      }
    };

  return (
     <div>
      <Popup
        trigger={
          <button className=" block w-full text-left px-4 py-2 hover:bg-green-100">
            Edit
          </button>
        }
        modal
        nested
      >
        {(close) => (
          <div className="">
           <div className="mt-10 flex flex-col items-center">
        <h1 className="text-center font-bold text-3xl">Edit Candidate</h1>
        <form
          className="h-full w-[60%] mt-5 flex flex-col gap-3 border rounded-md border-slate-400 p-8 mb-4"
          onSubmit={(e) => handleSubmit(e, close)}
        >
          {/* name */}
          <div className="flex flex-col">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="Name"
              className="border px-2 py-1 rounded-md"
              onChange={handleChange}
              value={form.Name}
              required
            />
          </div>
          {/* email */}
          <div className="flex flex-col">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="EmailId"
              className="border px-2 py-1 rounded-md"
              onChange={handleChange}
              value={form.EmailId}
              required
            />
          </div>
          {/* ai rating */}
          <div className="flex flex-col">
            <label htmlFor="ai_rating">AI Rating</label>
            <input
              type="Number"
              id="ai_rating"
              name="AiRating"
              className="border px-2 py-1 rounded-md"
              onChange={handleChange}
              min={1}
              max={100}
              value={form.AiRating}
              required
            />
          </div>
          {/* appied on */}
          <div className="flex flex-col">
            <label htmlFor="applied_on">Applied On</label>
            <input
              type="date"
              id="applied_on"
              name="AppliedOn"
              className="border px-2 py-1 rounded-md"
              onChange={handleChange}
              value={form.AppliedOn}
              required
            />
          </div>
          {/* tag */}
          <div className="flex flex-col">
            <label htmlFor="tag">Tag</label>
            <select
              name="Tag"
              id="tag"
              className="border px-2 py-1 rounded-md"
              onChange={handleChange}
              value={form.Tag}
              required
            >
              <option value="">Select Tag</option>
              <option value="No Tag">No Tag</option>
              <option value="Potencial Fit">Potencial Fit</option>
              <option value="Average Portfolio">Average Portfolio</option>
              <option value="Strong Portfolio">Strong Portfolio</option>
            </select>
          </div>

          <button className="border bg-blue-500 text-white py-1 rounded-sm w-[20%]">Submit</button>
        </form>
      </div>
          </div>
        )}
      </Popup>
    </div>
  )
}

export default EditCandidate
