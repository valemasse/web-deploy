import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../auth/AuthContext';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import './Pruebas.css';

export default function Pruebas() {
  const [dataTest, setDataTest] = useState([]);
  const [subjectId, setSubjectId] = useState('');
  const [testName, setTestName] = useState('');
  const [newContentName, setNewContentName] = useState('');
  const { token } = useContext(AuthContext);
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const currentPath = window.location.pathname;
    const pathSegments = currentPath.split('/');
    const currentSubjectId = pathSegments[pathSegments.length - 2];
    setSubjectId(currentSubjectId);
    if (token) {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.sub;
      setUserId(userId);
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/tests/users/${userId}/subjects/${subjectId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(async (response) => {
        const testsWithContents = await Promise.all(
          response.data.map(async (test) => {
            const contentResponse = await axios.get(
              `${import.meta.env.VITE_BACKEND_URL}/contents/users/${userId}/subjects/${subjectId}/test/${test.id}`, {
                headers: {
                  'Authorization': `Bearer ${token}`
                }
              }
            );
            return { ...test, contenidos: contentResponse.data };
          })
        );
        setDataTest(testsWithContents);
      })
      .catch((error) => {
        console.error('Error al obtener tests:', error);
      });
    }
  }, [token, subjectId]);

  const handleCreationContent = (testId) => {
    const contentData = {
      test_id: testId,
      name: newContentName,
      progress: 0,
    };

    axios.post(`${import.meta.env.VITE_BACKEND_URL}/contents/users/${userId}/subjects/${subjectId}/test/${testId}`, contentData, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then((response) => {
        console.log('Contenido creado con éxito', response);
        const updatedDataTest = dataTest.map(test => {
          if (test.id === testId) {
            return { ...test, contenidos: [...test.contenidos, response.data] };
          }
          return test;
        });
        setDataTest(updatedDataTest);
        setNewContentName('');
      })
      .catch((error) => {
        console.error('Creación de contenido fallida:', error);
      });
  };

  const handleInputChange = (event) => {
    setTestName(event.target.value);
    setNewContentName(event.target.value);
  };

  const handleDeleteTest = async (testId) => {
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/tests/users/${userId}/subjects/${subjectId}/${testId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setDataTest(prevData => prevData.filter(test => test.id !== testId));
    } catch (error) {
      console.error('Error al eliminar la prueba:', error);
    }
  };

  const handleDeleteContent = async (contentId, testId) => {
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/contents/users/${userId}/subjects/${subjectId}/tests/${testId}/${contentId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }); 
      setDataTest(prevData => prevData.filter(test => test.contenidos.id !== contentId));
    } catch (error) {
      console.error('Error al eliminar el contenido:', error);
    }
  };

  return (
    <>
      <h2>Pruebas</h2>
      <div className="pruebas-container">
        {dataTest.map((test) => (
          <div key={test.id} className="pruebas">
            <h3>
              {test.name} 
              <button onClick={() => handleDeleteTest(test.id)}>Eliminar</button>
            </h3>
            <p>{test.description}</p>
            <p>Fecha: {test.date}</p>
            <p>Prioridad: {test.priority}</p>
            <p>Progreso: {test.progress}</p>
            <a href={`/edicion/prueba/${subjectId}/${test.id}`}>Editar</a>
            <h2>Contenidos</h2>
            <ul>
              {test.contenidos.map((contenido) => (
                <li key={contenido.id}>{contenido.name} {contenido.progress} <button onClick={() => handleDeleteContent(contenido.id, test.id)}>Eliminar</button> </li>
              ))}
              <li>
                <input
                  type="text"
                  placeholder="Agrega un contenido"
                  className="pruebas-text-input"
                  value={testName}
                  onChange={handleInputChange}
                />
                <button
                  onClick={() => handleCreationContent(test.id)}
                  className="pruebas-button"
                >
                  +
                </button>
              </li>
            </ul>
          </div>
        ))}
      </div>
    </>
  );
}


