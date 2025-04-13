import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            const res = await axios.post("http://localhost:5000/api/auth/register", formData);
            alert(res.data.message);
            navigate("/login"); // Redirect to login after successful registration
        } catch (error) {
            setError(error.response?.data?.message || "Registration failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-5">
            <h2>Register</h2>
            {error && <p className="text-danger">{error}</p>}
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    name="name" 
                    placeholder="Name" 
                    className="form-control mb-2" 
                    value={formData.name} 
                    onChange={handleChange} 
                    required 
                />
                <input 
                    type="email" 
                    name="email" 
                    placeholder="Email" 
                    className="form-control mb-2" 
                    value={formData.email} 
                    onChange={handleChange} 
                    required 
                />
                <input 
                    type="password" 
                    name="password" 
                    placeholder="Password" 
                    className="form-control mb-2" 
                    value={formData.password} 
                    onChange={handleChange} 
                    required 
                />
                <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? "Registering..." : "Register"}
                </button>
            </form>
            <p className="mt-2">
                Already have an account? <a href="/login">Login</a>
            </p>
        </div>
    );
};

export default Register;
