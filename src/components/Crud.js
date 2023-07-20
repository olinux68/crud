
// src/components/Crud.js
import React, { useState, useEffect } from 'react';

const Crud = () => {
  const [articles, setArticles] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editArticleId, setEditArticleId] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/articles')
      .then((response) => response.json())
      .then((data) => setArticles(data));
  }, []);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editMode && editArticleId) {
      // Si on est en mode édition, mettre à jour l'article existant
      const updatedArticle = {
        title: title,
        content: content,
      };

      fetch(`http://localhost:5000/articles/${editArticleId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedArticle),
      })
        .then((response) => response.json())
        .then((data) => {
          // Mettre à jour la liste des articles avec l'article modifié
          const updatedArticles = articles.map((article) =>
            article.id === data.id ? data : article
          );
          setArticles(updatedArticles);
          // Réinitialiser les champs du formulaire
          setTitle('');
          setContent('');
          setEditMode(false);
          setEditArticleId(null);
        })
        .catch((error) => {
          console.error('Erreur lors de la mise à jour de l\'article :', error);
        });
    } else {
      // Si on n'est pas en mode édition, créer un nouvel article
      const newArticle = {
        title: title,
        content: content,
      };

      fetch('http://localhost:5000/articles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newArticle),
      })
        .then((response) => response.json())
        .then((data) => {
          // Mettre à jour la liste des articles avec le nouvel article
          setArticles([...articles, data]);
          // Réinitialiser les champs du formulaire
          setTitle('');
          setContent('');
        })
        .catch((error) => {
          console.error('Erreur lors de l\'ajout de l\'article :', error);
        });
    }
  };

  const handleEdit = (article) => {
    // Mettre à jour les champs du formulaire avec les données de l'article à éditer
    setTitle(article.title);
    setContent(article.content);
    setEditMode(true);
    setEditArticleId(article.id);
  };

  const handleDelete = (articleId) => {
    // Supprimer l'article du serveur JSON
    fetch(`http://localhost:5000/articles/${articleId}`, {
      method: 'DELETE',
    })
      .then(() => {
        // Mettre à jour la liste des articles en supprimant l'article
        const updatedArticles = articles.filter(
          (article) => article.id !== articleId
        );
        setArticles(updatedArticles);
      })
      .catch((error) => {
        console.error('Erreur lors de la suppression de l\'article :', error);
      });
  };

  return (
    <div>
      <h2>Liste des articles</h2>
      <ul>
        {articles.map((article) => (
          <li key={article.id}>
            <strong>{article.title}</strong> - {article.content}
            <button onClick={() => handleEdit(article)}>Modifier</button>
            <button onClick={() => handleDelete(article.id)}>Supprimer</button>
          </li>
        ))}
      </ul>

      <h2>{editMode ? 'Modifier une fiche' : 'Ajouter une fiche'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Titre :</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={handleTitleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="content">Contenu :</label>
          <textarea
            id="content"
            value={content}
            onChange={handleContentChange}
            required
          />
        </div>
        <button type="submit">{editMode ? 'Modifier' : 'Ajouter'}</button>
      </form>
    </div>
  );
};

export default Crud;
