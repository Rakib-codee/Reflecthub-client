import { useEffect, useState, useContext } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { Link } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import { FaLock, FaSearch, FaUser } from "react-icons/fa";

const Lessons = () => {
    const [lessons, setLessons] = useState([]);
    const [displayLessons, setDisplayLessons] = useState([]); // Used for filtering
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('');
    const [loading, setLoading] = useState(true);
    
    const axiosPublic = useAxiosPublic();
    const { user } = useContext(AuthContext);

    // TODO: Later we will fetch real Premium status from DB. 
    // For now, we assume user is NOT Premium to test the Lock feature.
    const isPremiumUser = false; 

    useEffect(() => {
        axiosPublic.get('/lessons')
            .then(res => {
                setLessons(res.data);
                setDisplayLessons(res.data);
                setLoading(false);
            })
    }, [axiosPublic]);

    // Handle Search
    const handleSearch = (e) => {
        e.preventDefault();
        const filtered = lessons.filter(lesson => 
            lesson.title.toLowerCase().includes(search.toLowerCase())
        );
        setDisplayLessons(filtered);
    }

    // Handle Filter
    const handleFilter = (e) => {
        const val = e.target.value;
        setCategory(val);
        if(val === 'All') {
            setDisplayLessons(lessons);
        } else {
            const filtered = lessons.filter(lesson => lesson.category === val);
            setDisplayLessons(filtered);
        }
    }

    if (loading) return <div className="text-center mt-20"><span className="loading loading-bars loading-lg text-primary"></span></div>;

    return (
        <div className="max-w-screen-2xl mx-auto px-4 py-10">
            
            {/* Header & Filter Section */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
                <h2 className="text-3xl font-bold text-gray-800">Explore Community Wisdom</h2>
                
                <div className="flex gap-4">
                    {/* Search */}
                    <form onSubmit={handleSearch} className="join">
                        <input 
                            type="text" 
                            placeholder="Search titles..." 
                            className="input input-bordered join-item" 
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <button className="btn btn-primary join-item text-white"><FaSearch /></button>
                    </form>

                    {/* Filter */}
                    <select onChange={handleFilter} className="select select-bordered">
                        <option value="All">All Categories</option>
                        <option value="Personal Growth">Personal Growth</option>
                        <option value="Career">Career</option>
                        <option value="Relationships">Relationships</option>
                        <option value="Mindset">Mindset</option>
                    </select>
                </div>
            </div>

            {/* Lessons Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayLessons.map(lesson => (
                    <div key={lesson._id} className={`card bg-base-100 shadow-xl border ${lesson.access === 'Premium' ? 'border-yellow-400' : 'border-gray-100'}`}>
                        
                        {/* Card Image */}
                        <figure className="h-48 relative overflow-hidden bg-gray-100">
                            {lesson.photoURL ? (
                                <img src={lesson.photoURL} alt={lesson.title} className="w-full h-full object-cover" />
                            ) : (
                                <div className="flex items-center justify-center w-full h-full bg-purple-100 text-primary text-4xl">
                                    <FaUser />
                                </div>
                            )}
                            
                            {/* Premium Badge */}
                            {lesson.access === 'Premium' && (
                                <div className="absolute top-2 right-2 bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1 shadow">
                                    <FaLock size={10} /> Premium
                                </div>
                            )}
                        </figure>

                        <div className="card-body">
                            <h2 className="card-title text-primary">
                                {lesson.title}
                            </h2>
                            <div className="flex gap-2 text-xs mb-2">
                                <span className="badge badge-outline">{lesson.category}</span>
                                <span className="badge badge-ghost opacity-75">{lesson.tone}</span>
                            </div>
                            
                            <p className="text-sm text-gray-600">
                                {lesson.author?.name ? `By ${lesson.author.name}` : 'Anonymous'}
                            </p>

                            <div className="card-actions justify-end mt-4">
                                {/* Access Logic: 
                                    If Lesson is Free -> Show Button
                                    If Lesson is Premium AND User is Premium -> Show Button
                                    If Lesson is Premium AND User is NOT Premium -> Show Upgrade 
                                */}
                                {lesson.access === 'Free' || isPremiumUser ? (
                                    <Link to={`/lessons/${lesson._id}`} className="btn btn-primary btn-sm text-white rounded-full px-6">
                                        Read More
                                    </Link>
                                ) : (
                                    <button disabled className="btn btn-disabled btn-sm rounded-full bg-gray-200">
                                        <FaLock /> Locked
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            
            {displayLessons.length === 0 && <p className="text-center text-gray-400 mt-10">No lessons found.</p>}

        </div>
    );
};

export default Lessons;