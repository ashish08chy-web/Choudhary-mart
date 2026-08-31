import { useNavigate, Link } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();

    return (

        <nav>
            <div className="bg-pink-200  shadow-lg p-5 max-w-7xl mx-auto flex justify-between items-center px-5 py-6">
                {/* Logo */}
                <h1 className="animate-fade-in p-4 text-2xl font-bold flex items-center gam-3">
                    <img
                    src="/logo12.jpg"
                    alt="choudhary mart Logo"
                    className="w-10 h-10 object-contain rounded-full bg-white p-1"
                    />
                    Choudhary mart
                </h1>
                
                
                {/* Desktop Menu */}
                <div className="hidden md:flex gap-8 items-center">
                    <Link to="/" className="hover:text-blue-600">Home</Link>
                    <Link to="/productpage" className="hover:text-blue-600">Products</Link>
                    <Link to="/categories" className="hover:text-blue-600">Categories</Link>
                    <a href="#" className="hover:text-blue-600">About</a>
                </div>

                <div>
                    <button
                    onClick={()=> {navigate('/cart')}}
                     className="hover:shadow-xl scale-105 bg-blue-400 text-black-500 px-3 py-3 rounded">
                        My cart
                    </button>
                    
                    <button
                    onClick={()=>{navigate('/login')}} 
                    className="bg-pink-500 text-black px-4 py-3 rounded">
                        Login..
                    </button>

                </div>

            </div>
        </nav>

    );
}

export default Navbar;