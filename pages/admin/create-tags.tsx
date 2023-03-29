import React, { useState, useEffect } from 'react';

const CreateTag: React.FC = () => {
  const [tagName, setTagName] = useState('');
  const [tags, setTags] = useState<string[]>([]);

  useEffect(() => {
    // Fetch existing tags from the API when the component is mounted
    fetchTags();
  }, []);

  const fetchTags = async () => {
    const response = await fetch('/api/getTags');
    const { data } = await response.json();
    setTags(data.map((tag) => tag.name));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch('/api/createTag', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ tagName }),
    });

    if (response.ok) {
      const { tag } = await response.json();
      console.log('Tag created:', tag);
      setTagName('');
      setTags((prevTags) => [...prevTags, tag.name]);
    } else {
      const { error } = await response.json();
      console.error('Error creating tag:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="bg-white p-4 rounded-md shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-center">Create a Tag</h2>
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <input
              type="text"
              placeholder="Tag name"
              value={tagName}
              onChange={(e) => setTagName(e.target.value)}
              className="p-2 rounded-md border border-gray-300"
            />
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md"
            >
              Add Tag
            </button>
          </form>
          <div className="mt-4">
            <h3 className="text-xl font-semibold mb-2">Created Tags:</h3>
            <ul className="list-disc pl-5">
              {tags.map((tag, index) => (
                <li key={index}>{tag}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTag;
