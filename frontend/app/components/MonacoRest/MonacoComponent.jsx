// MonacoComponent.jsx
import { useEffect, useState } from 'react';
import Editor from '@monaco-editor/react';
import io from 'socket.io-client';
import styles from './loader.module.css';

const socket = io('http://localhost:4000'); 

const MonacoComponent = ({ code, setCode }) => {
  const [editorLoaded, setEditorLoaded] = useState(false);

  const editorOptions = {
    selectOnLineNumbers: true,
    fontSize: 25,
    automaticLayout: true,
    fontFamily: 'YourFont, sans-serif',
  };

  const handleCodeChange = (newCode) => {
    setCode(newCode);
    socket.emit('updateDocument', newCode); 
  };

  const editorStyle = {
    height: '100vh',
  };

  useEffect(() => {
    setEditorLoaded(true);
    socket.on('connect', () => {
      console.log('Connected to Socket.IO server');
    });
  
    socket.on('disconnect', () => {
      console.log('Disconnected from Socket.IO server');
    });


    socket.on('documentUpdated', (updatedCode) => {
      setCode(updatedCode);
    });

    return () => {
      socket.disconnect(); 
    };
  }, []);

  const loadingContent = (
    <div className={styles['loader-container']}>
      <div className={styles.loader}>
        <span className={styles.loaderSpan} dangerouslySetInnerHTML={{ __html: '{' }}></span>
        <span className={styles.loaderSpan} dangerouslySetInnerHTML={{ __html: '}' }}></span>
      </div>
    </div>
  );

  return (
    <div style={editorStyle}>
      {editorLoaded ? (
        <Editor
          language='javascript'
          theme="vs-dark" 
          value={code}
          options={editorOptions}
          onChange={handleCodeChange}
          loading={null}
        />
      ) : (
        loadingContent
      )}
    </div>
  );
};

export default MonacoComponent;
