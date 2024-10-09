'use client'; 
import { useEffect } from 'react'; 
import { useRouter } from 'next/navigation';

const Home = () => {
    const router = useRouter();

    useEffect(() => {
        const responses = localStorage.getItem('formData'); // Asegúrate de que aquí el nombre coincida con el nombre en que guardas los datos
        if (responses) {
            router.push('/examples/all'); // Redirige al chat si hay respuestas
        } else {
            router.push('/form'); // Redirige al formulario si no hay respuestas
        }
    }, [router]);

    return null; // No necesitas renderizar nada, ya que redirigirás al usuario
};

export default Home;


