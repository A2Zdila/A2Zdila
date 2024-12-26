// UserPanel.js
const UserPanel = ({ userId }) => {
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: ''
  });

  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios.get(`${API_BASE_URL}/users/${userId}`);
      setUserData(response.data);
      setFormData({
        username: response.data.username,
        email: response.data.email
      });
    };
    fetchUser();
  }, [userId]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    await axios.put(`${API_BASE_URL}/users/${userId}`, formData);
    setIsEditing(false);
    const response = await axios.get(`${API_BASE_URL}/users/${userId}`);
    setUserData(response.data);
  };

  if (!userData) return <div>Loading...</div>;

  return (
    <div className="p-6 max-w-xl mx-auto space-y-6">
      {isEditing ? (
        <form onSubmit={handleUpdate} className="space-y-4">
          <input
            type="text"
            value={formData.username}
            onChange={e => setFormData({...formData, username: e.target.value})}
            className="w-full p-2 border rounded"
          />
          <input
            type="email"
            value={formData.email}
            onChange={e => setFormData({...formData, email: e.target.value})}
            className="w-full p-2 border rounded"
          />
          <div className="flex gap-2">
            <button type="submit" className="bg-blue-500 text-white p-2 rounded">Save</button>
            <button onClick={() => setIsEditing(false)} className="bg-gray-200 p-2 rounded">Cancel</button>
          </div>
        </form>
      ) : (
        <>
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">{userData.username}</h2>
              <p className="text-gray-600">{userData.email}</p>
            </div>
            <button onClick={() => setIsEditing(true)} className="text-blue-500">Edit</button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded">
              <p className="text-2xl font-bold">{userData.booksRead}</p>
              <p className="text-sm text-gray-600">Books Read</p>
            </div>
            <div className="p-4 bg-gray-50 rounded">
              <p className="text-2xl font-bold">{userData.reviewsWritten}</p>
              <p className="text-sm text-gray-600">Reviews Written</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

// BookForm.js
const BookForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    publicationYear: '',
    description: '',
    categories: []
  });
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await axios.get(`${API_BASE_URL}/categories`);
      setCategories(response.data);
    };
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${API_BASE_URL}/books`, formData);
      setFormData({
        title: '',
        author: '',
        publicationYear: '',
        description: '',
        categories: []
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Add New Book</h2>
      <input
        type="text"
        placeholder="Title"
        value={formData.title}
        onChange={e => setFormData({...formData, title: e.target.value})}
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="text"
        placeholder="Author"
        value={formData.author}
        onChange={e => setFormData({...formData, author: e.target.value})}
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="number"
        placeholder="Publication Year"
        value={formData.publicationYear}
        onChange={e => setFormData({...formData, publicationYear: e.target.value})}
        className="w-full p-2 border rounded"
        required
      />
      <textarea
        placeholder="Description"
        value={formData.description}
        onChange={e => setFormData({...formData, description: e.target.value})}
        className="w-full p-2 border rounded"
        rows={4}
      />
      <select
        multiple
        value={formData.categories}
        onChange={e => setFormData({...formData, categories: Array.from(e.target.selectedOptions, option => option.value)})}
        className="w-full p-2 border rounded"
      >
        {categories.map(category => (
          <option key={category.id} value={category.id}>{category.name}</option>
        ))}
      </select>
      <button 
        type="submit" 
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
        disabled={loading}
      >
        {loading ? 'Adding...' : 'Add Book'}
      </button>
    </form>
  );
};

export { UserPanel, BookForm };
