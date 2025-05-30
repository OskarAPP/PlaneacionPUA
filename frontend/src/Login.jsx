import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('ejemplo@uacam.mx');
  const [password, setPassword] = useState('ejemplo123');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes agregar la lógica de autenticación real
    navigate('/panelacceso');
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('./src/Imagenes/UAC.png')" }}
    >
      <div className="w-screen h-screen flex items-center justify-center p-4">
        <div className="flex flex-col w-full items-center justify-center">
          {/* Formulario con efecto blur */}
          <div className="p-8 sm:p-10 w-full max-w-lg flex items-center justify-center mx-auto">
            <div className="w-full max-w-md bg-white/20 backdrop-blur rounded-3xl shadow-2xl p-8 border border-white/60" style={{boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)'}}>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-pastel-navy mb-6 text-center">¡Bienvenido!</h2>
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
                    className="w-full px-4 py-3 sm:px-5 sm:py-3 rounded-xl bg-white/70 border border-blue-200 focus:border-pastel-blue-400 focus:ring-2 focus:ring-pastel-blue-300 outline-none transition-all"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="••••••••"
                  />
                </div>
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
    </div>
  );
}

export default Login;
