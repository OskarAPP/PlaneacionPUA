import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import aniversarioImg from './Imagenes/60aniversario.png';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await fetch('http://127.0.0.1:8000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ correo: email, pass: password }),
      });
      const data = await response.json();
      if (response.ok && data.user) {
        // Autenticación exitosa
        localStorage.setItem('user', JSON.stringify(data.user));
        navigate('/panelacceso');
      } else {
        setError(data.message || 'Credenciales incorrectas');
      }
    } catch (err) {
      setError('Error de conexión con el servidor');
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('./src/Imagenes/UAC.png')" }}
    >
      <div className="w-screen h-screen flex items-center justify-center p-2">
        <div className="flex flex-col w-full items-center justify-center">
          {/* Formulario con efecto blur */}
          <div className="p-2 sm:p-6 w-full max-w-sm flex items-center justify-center mx-auto">
            <div className="w-full max-w-xs bg-dark/10 backdrop-blur rounded-2xl shadow-2xl p-4 border border-white/60" style={{boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)'}}>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-pastel-navy mb-4 text-center">¡Bienvenido!</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="block text-pastel-navy font-semibold text-sm uppercase tracking-wide">
                    Correo Institucional
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 sm:px-5 sm:py-3 rounded-xl bg-white/70 border border-blue-200 focus:border-pastel-blue-400 focus:ring-2 focus:ring-pastel-blue-300 outline-none transition-all placeholder:text-blue-300"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="usuario@uacam.mx"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-pastel-navy font-semibold text-sm uppercase tracking-wide">
                    Contraseña
                  </label>
                  <input
                    type="password"
                    autoComplete="current-password"
                    className="w-full px-4 py-3 sm:px-5 sm:py-3 rounded-xl bg-white/70 border border-blue-200 focus:border-pastel-blue-400 focus:ring-2 focus:ring-pastel-blue-300 outline-none transition-all"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="••••••••"
                  />
                </div>
                {error && (
                  <div className="text-red-600 font-semibold text-center mb-4" role="alert">{error}</div>
                )}
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-pastel-blue-500 to-pastel-blue-600 text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl hover:from-pastel-blue-600 hover:to-pastel-blue-700 transform hover:-translate-y-0.5 transition-all duration-300"
                >
                  Iniciar Sesión
                </button>
              </form>
              <div className="mt-8 text-center">
                <a href="#" className="text-pastel-blue-700 hover:text-pastel-blue-900 font-medium hover:underline transition-colors">
                  ¿Olvidaste tu contraseña?
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Imagen 60 aniversario en la esquina superior izquierda */}
      <img 
        src={aniversarioImg} 
        alt="60 Aniversario UACAM" 
        className="fixed top-4 left-9 w-32 h-auto z-40 select-none pointer-events-none" 
        style={{minWidth: '100px', minHeight: 'auto'}}
      />
    </div>
  );
}

export default Login;
