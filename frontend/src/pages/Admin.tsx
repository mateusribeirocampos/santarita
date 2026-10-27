import { useState } from 'react';
import { Plus, Edit, Trash2, Eye, Calendar, Newspaper, LogOut, User } from 'lucide-react';
import { useEvents } from '../hooks/useEvents';
import { useNews } from '../hooks/useNews';
import { useAuth } from '../contexts/AuthContext';
import { Event, News } from '../types';
import EventForm from '../components/EventForm';
import NewsForm from '../components/NewsForm';
import ConfirmDialog from '../components/ConfirmDialog';
import { apiService } from '../services/api';
import { getSafeImageUrlWithFallback } from '../utils/imageUtils';

const Admin = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<'events' | 'news'>('events');
  const { events, loading: eventsLoading, refetch: refetchEvents } = useEvents({ active: true });
  const { news, loading: newsLoading, refetch: refetchNews } = useNews({ published: false }); // Show all news in admin
  
  // Form states
  const [showEventForm, setShowEventForm] = useState(false);
  const [showNewsForm, setShowNewsForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [editingNews, setEditingNews] = useState<News | null>(null);
  
  // Delete confirmation states
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<{id: string | number, type: 'event' | 'news', title: string} | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const tabs = [
    { id: 'events', label: 'Eventos', icon: Calendar },
    { id: 'news', label: 'Notícias', icon: Newspaper },
  ];

  // Event handlers
  const handleNewEvent = () => {
    setEditingEvent(null);
    setShowEventForm(true);
  };

  const handleEditEvent = (event: Event) => {
    setEditingEvent(event);
    setShowEventForm(true);
  };

  const handleNewNews = () => {
    setEditingNews(null);
    setShowNewsForm(true);
  };

  const handleEditNews = (newsItem: News) => {
    setEditingNews(newsItem);
    setShowNewsForm(true);
  };

  const handleDeleteClick = (id: string | number, type: 'event' | 'news', title: string) => {
    setItemToDelete({ id, type, title });
    setShowDeleteConfirm(true);
  };

  const handleConfirmDelete = async () => {
    if (!itemToDelete) return;

    setDeleteLoading(true);
    try {
      if (itemToDelete.type === 'event') {
        await apiService.deleteEvent(itemToDelete.id.toString());
        refetchEvents();
      } else {
        await apiService.deleteNews(itemToDelete.id.toString());
        refetchNews();
      }

      setShowDeleteConfirm(false);
      setItemToDelete(null);
    } catch (error) {
      console.error('Erro ao deletar:', error);
      alert(`Erro ao deletar ${itemToDelete.type === 'event' ? 'evento' : 'notícia'}`);
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirm(false);
    setItemToDelete(null);
  };

  const handleFormSave = () => {
    if (showEventForm) {
      refetchEvents();
    } else if (showNewsForm) {
      refetchNews();
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="font-serif text-3xl font-semibold text-ink mb-2">Painel Administrativo</h1>
            <p className="text-ink-soft">Gerencie eventos e notícias da igreja</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-ink-soft">
              <User className="h-4 w-4" />
              <span>{user?.email}</span>
              <span className="border border-wine/40 bg-wine-light text-wine px-2 py-1 rounded text-xs font-medium">
                {user?.role === 'admin' ? 'Administrador' : 'Editor'}
              </span>
            </div>
            <button
              onClick={logout}
              className="inline-flex items-center px-3 py-2 border border-line text-sm font-medium text-ink hover:border-wine hover:text-wine transition-colors"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sair
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-line mb-8">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as 'events' | 'news')}
                className={`${
                  activeTab === tab.id
                    ? 'border-wine text-wine'
                    : 'border-transparent text-ink-soft hover:text-ink hover:border-line'
                } whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm flex items-center transition-colors`}
              >
                <Icon className="h-5 w-5 mr-2" />
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Content */}
      {activeTab === 'events' && (
        <div>
          {/* Events Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-serif text-xl font-semibold text-ink">Eventos</h2>
            <button
              onClick={handleNewEvent}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-parchment bg-wine hover:bg-wine-dark transition-colors"
            >
              <Plus className="h-4 w-4 mr-2" />
              Novo Evento
            </button>
          </div>

          {/* Events List */}
          {eventsLoading ? (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-wine"></div>
              <p className="mt-2 text-ink-soft">Carregando eventos...</p>
            </div>
          ) : (
            <div className="border border-line overflow-hidden">
              <ul className="divide-y divide-line">
                {events.length > 0 ? (
                  events.map((event) => (
                    <li key={event.id}>
                      <div className="px-4 py-4 flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="flex-shrink-0">
                            <img
                              className="h-10 w-10 object-cover border border-line"
                              src={getSafeImageUrlWithFallback(event.image)}
                              alt={event.title}
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-ink">{event.title}</div>
                            <div className="text-sm text-ink-soft">
                              {event.date} às {event.time}
                            </div>
                            <div className="text-xs text-wine">{event.type}</div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => window.open(`/eventos/${event.id}`, '_blank')}
                            className="text-ink-soft hover:text-wine"
                            title="Visualizar"
                          >
                            <Eye className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => handleEditEvent(event)}
                            className="text-ink-soft hover:text-gold"
                            title="Editar"
                          >
                            <Edit className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => handleDeleteClick(event.id, 'event', event.title)}
                            className="text-ink-soft hover:text-wine"
                            title="Deletar"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </li>
                  ))
                ) : (
                  <li className="px-4 py-8 text-center text-ink-soft">
                    Nenhum evento encontrado
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>
      )}

      {activeTab === 'news' && (
        <div>
          {/* News Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-serif text-xl font-semibold text-ink">Notícias</h2>
            <button
              onClick={handleNewNews}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-parchment bg-wine hover:bg-wine-dark transition-colors"
            >
              <Plus className="h-4 w-4 mr-2" />
              Nova Notícia
            </button>
          </div>

          {/* News List */}
          {newsLoading ? (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-wine"></div>
              <p className="mt-2 text-ink-soft">Carregando notícias...</p>
            </div>
          ) : (
            <div className="border border-line overflow-hidden">
              <ul className="divide-y divide-line">
                {news.length > 0 ? (
                  news.map((newsItem) => (
                    <li key={newsItem.id}>
                      <div className="px-4 py-4 flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="flex-shrink-0">
                            <img
                              className="h-10 w-10 object-cover border border-line"
                              src={getSafeImageUrlWithFallback(newsItem.image)}
                              alt={newsItem.title}
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-ink">{newsItem.title}</div>
                            <div className="text-sm text-ink-soft">{newsItem.summary}</div>
                            <div className="text-xs text-wine">
                              {typeof newsItem.category === 'string'
                                ? newsItem.category
                                : newsItem.category?.name}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => window.open(`/news/${newsItem.id}`, '_blank')}
                            className="text-ink-soft hover:text-wine"
                            title="Visualizar"
                          >
                            <Eye className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => handleEditNews(newsItem)}
                            className="text-ink-soft hover:text-gold"
                            title="Editar"
                          >
                            <Edit className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => handleDeleteClick(newsItem.id, 'news', newsItem.title)}
                            className="text-ink-soft hover:text-wine"
                            title="Deletar"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </li>
                  ))
                ) : (
                  <li className="px-4 py-8 text-center text-ink-soft">
                    Nenhuma notícia encontrada
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Quick Stats */}
      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-3">
        <div className="border border-line overflow-hidden">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Calendar className="h-6 w-6 text-wine" strokeWidth={1.5} />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-ink-soft truncate">Eventos Ativos</dt>
                  <dd className="font-serif text-lg font-medium text-ink">{events.length}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="border border-line overflow-hidden">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Newspaper className="h-6 w-6 text-wine" strokeWidth={1.5} />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-ink-soft truncate">Notícias Publicadas</dt>
                  <dd className="font-serif text-lg font-medium text-ink">{news.length}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="border border-line overflow-hidden">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Eye className="h-6 w-6 text-wine" strokeWidth={1.5} />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-ink-soft truncate">Visualizações Hoje</dt>
                  <dd className="font-serif text-lg font-medium text-ink">--</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Forms and Dialogs */}
      <EventForm
        isOpen={showEventForm}
        onClose={() => setShowEventForm(false)}
        onSave={handleFormSave}
        event={editingEvent}
      />

      <NewsForm
        isOpen={showNewsForm}
        onClose={() => setShowNewsForm(false)}
        onSave={handleFormSave}
        news={editingNews}
      />

      <ConfirmDialog
        isOpen={showDeleteConfirm}
        title="Confirmar Exclusão"
        message={`Tem certeza que deseja deletar "${itemToDelete?.title}"? Esta ação não pode ser desfeita.`}
        confirmText="Deletar"
        cancelText="Cancelar"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        loading={deleteLoading}
      />
    </div>
  );
};

export default Admin;