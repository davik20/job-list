import React, { useState, useEffect } from "react";
import AdminLayout from "../../../components/layouts/AdminLayout";
import Button from "../../../components/ui/buttons/Button";
import { toast } from "react-toastify";
import Spinner from "../../../components/ui/spinner/Spinner";


const CreateTags = () => {
  // State variables
  const [tagName, setTagName] = useState("")
  const [tags, setTags] = useState([]);
  const [message, setMessage] = useState(""); 
  const [isLoading, setIsLoading] = useState(false);

  // Fetches all tags from the server on component mount
  useEffect(() => {
    fetchTags();
  }, []);

  // Fetches all tags from server
  const fetchTags = async () => {
    setIsLoading(true);
    const response = await fetch("/api/tags/getTags");
    const data = await response.json();
    setTags(data.data);
    setIsLoading(false);
  };

  // Creates a new tag
  const createTag = async e => {
    e.preventDefault();

    // Validates tag name
    if (tagName.trim() === "") {
      setMessage("Tag name cannot be empty");
      return;
    }

    // Sends a POST request to create a new tag
    const response = await fetch("/api/tags/createTag", {
      method: "POST",
      body: JSON.stringify({ tagName }),
    });

    // Parses the response
    const data = await response.json();

    // Shows success message and fetches all tags if the tag is created successfully
    toast.success("Tag created successfully");
    if (data.message === "success") {
      setTagName("");
      fetchTags();
    }
  };

  // Deletes a tag
  const deleteTag = async id => {
    // Sends a DELETE request to delete a tag
    const response = await fetch("/api/tags/deleteTag", {
      method: "DELETE",
      body: JSON.stringify({ id }),
    });

    // Parses the response
    const data = await response.json();

    // Shows success message and fetches all tags if the tag is deleted successfully
    toast.success("Tag deleted successfully");
    if (data.success) {
      fetchTags();
    }
  };

  // Renders the component
  return (
    <AdminLayout>
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-center">Manage Tags</h1>
        <form onSubmit={createTag} className="w-full max-w-md mx-auto">
          <div className="flex items-center border-b border-teal-500 py-2">
            <input
              className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
              type="text"
              value={tagName}
              onChange={e => setTagName(e.target.value)}
              placeholder="Enter tag name"
            />
            <Button type="submit">Create</Button>
          </div>
        </form>
        {isLoading && <Spinner />}
        <ul className="mt-8">
          {/* Maps over all tags and displays them */}
          {tags.map((tag, index) => (
            <li key={tag.id} className="flex items-center py-2">
              <span className="w-full text-gray-700">{tag.name}</span>
              {/* Button to delete a tag */}
              <Button onClick={() => deleteTag(tag.id)} variant="danger">
                Delete
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </AdminLayout>
  );
};

export default CreateTags;
