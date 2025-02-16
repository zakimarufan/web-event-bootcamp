"use client";
import { useState, useEffect, useMemo, useRef } from 'react';
import dynamic from 'next/dynamic';
import Swal from 'sweetalert2';
import { blogService, blogCategoryService } from '@/app/utils/api';
import { PencilIcon, TrashIcon, PlusIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import Modal from '@/app/components/Modal';
import 'react-quill/dist/quill.snow.css';

// Dynamically import React Quill to avoid SSR issues
const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading editor...</p>
});

export default function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [deletingBlog, setDeletingBlog] = useState(null);
  const [editFormData, setEditFormData] = useState({
    title: '',
    content: '',
    image_url: '',
    categories: []
  });
  const [addFormData, setAddFormData] = useState({
    title: '',
    content: '',
    image_url: '',
    categories: []
  });

  // Ref to handle Quill instance
  const quillRef = useRef(null);

  // Memoize Quill modules and formats to prevent unnecessary re-renders
  const quillModules = useMemo(() => ({
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['link', 'image'],
      ['clean']
    ]
  }), []);

  const quillFormats = useMemo(() => [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'list', 'bullet',
    'link', 'image'
  ], []);

  // Fetch blogs and categories
  const fetchBlogs = async () => {
    try {
      const response = await blogService.getAll();
      // Ensure categories is an array for each blog
      const blogsWithCategories = response.data.map(blog => ({
        ...blog,
        categories: Array.isArray(blog.categories) ? blog.categories : []
      }));
      setBlogs(blogsWithCategories);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching blogs:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to fetch blogs'
      });
      setIsLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await blogCategoryService.getAll();
      setCategories(response.data.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    fetchBlogs();
    fetchCategories();
  }, []);

  // Handle add form submission
  const handleAddSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await blogService.create(addFormData);
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Blog added successfully'
      });
      setIsAddModalOpen(false);
      setAddFormData({
        title: '',
        content: '',
        image_url: '',
        categories: []
      });
      fetchBlogs();
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response?.data?.message || 'Failed to add blog'
      });
    }
  };

  // Open edit modal
  const handleEditClick = (blog) => {
    setEditingBlog(blog);
    setEditFormData({
      title: blog.title,
      content: blog.content,
      image_url: blog.image_url,
      categories: blog.categories || [] // Categories are now already an array of IDs
    });
    setIsEditModalOpen(true);
  };

  // Handle edit form submission
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await blogService.update(editingBlog.id, editFormData);
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Blog updated successfully'
      });
      setIsEditModalOpen(false);
      fetchBlogs();
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response?.data?.message || 'Failed to update blog'
      });
    }
  };

  // Open delete modal
  const handleDeleteClick = (blog) => {
    setDeletingBlog(blog);
    setIsDeleteModalOpen(true);
  };

  // Handle delete confirmation
  const handleDeleteConfirm = async () => {
    try {
      await blogService.delete(deletingBlog.id);
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Blog deleted successfully'
      });
      setIsDeleteModalOpen(false);
      setDeletingBlog(null);
      fetchBlogs();
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response?.data?.message || 'Failed to delete blog'
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  // Helper function to get category names for display
  const getCategoryNames = (categoryIds) => {
    // Ensure categoryIds is an array
    const idsArray = Array.isArray(categoryIds) ? categoryIds : [];
    if (idsArray.length === 0) return 'No categories';
    
    return idsArray
      .map(id => {
        const category = categories.find(c => c.id === Number(id));
        return category ? category.name : '';
      })
      .filter(Boolean)
      .join(', ');
  };

  const BlogForm = ({ formData, setFormData, onSubmit, submitText }) => {
    return (
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
              focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
            placeholder="Enter blog title"
            required
          />
        </div>

        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700">
            Content
          </label>
          <div className="mt-1">
            <ReactQuill
              theme="snow"
              value={formData.content}
              onChange={(value) => setFormData({...formData, content: value})}
              modules={quillModules}
              formats={quillFormats}
            />
          </div>
        </div>

        <div>
          <label htmlFor="image_url" className="block text-sm font-medium text-gray-700">
            Image URL
          </label>
          <input
            type="url"
            id="image_url"
            value={formData.image_url}
            onChange={(e) => setFormData({...formData, image_url: e.target.value})}
            className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
              focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
            placeholder="Enter image URL"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Categories
          </label>
          <div className="mt-2 space-y-2">
            {categories.map((category) => (
              <label key={category.id} className="inline-flex items-center mr-4">
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-300 rounded"
                  checked={formData.categories.includes(category.id)}
                  onChange={(e) => {
                    const updatedCategories = e.target.checked
                      ? [...formData.categories, category.id]
                      : formData.categories.filter(id => id !== category.id);
                    setFormData({...formData, categories: updatedCategories});
                  }}
                />
                <span className="ml-2 text-gray-700">{category.name}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => {
              if (submitText === 'Add Blog') {
                setIsAddModalOpen(false);
                setAddFormData({
                  title: '',
                  content: '',
                  image_url: '',
                  categories: []
                });
              } else {
                setIsEditModalOpen(false);
              }
            }}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white bg-orange-500 rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
          >
            {submitText}
          </button>
        </div>
      </form>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Blog Posts</h1>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
        >
          <PlusIcon className="h-5 w-5" />
          Add New Blog
        </button>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Categories</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {blogs.map((blog) => (
              <tr key={blog.id}>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    {blog.image_url && (
                      <img
                        src={blog.image_url}
                        alt={blog.title}
                        className="h-10 w-10 rounded-full object-cover mr-3"
                      />
                    )}
                    <div className="text-sm font-medium text-gray-900">{blog.title}</div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-500">
                    {getCategoryNames(blog.categories)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleEditClick(blog)}
                      className="text-blue-600 hover:text-blue-900 p-1 hover:bg-blue-100 rounded-full transition-colors"
                      title="Edit"
                    >
                      <PencilIcon className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDeleteClick(blog)}
                      className="text-red-600 hover:text-red-900 p-1 hover:bg-red-100 rounded-full transition-colors"
                      title="Delete"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          setAddFormData({
            title: '',
            content: '',
            image_url: '',
            categories: []
          });
        }}
        title="Add New Blog"
      >
        <BlogForm
          formData={addFormData}
          setFormData={setAddFormData}
          onSubmit={handleAddSubmit}
          submitText="Add Blog"
        />
      </Modal>

      {/* Edit Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Blog"
      >
        <BlogForm
          formData={editFormData}
          setFormData={setEditFormData}
          onSubmit={handleEditSubmit}
          submitText="Save Changes"
        />
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setDeletingBlog(null);
        }}
        title="Delete Blog"
      >
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-red-600">
            <ExclamationTriangleIcon className="h-6 w-6" />
            <p className="text-lg font-medium">Confirm Deletion</p>
          </div>
          <p className="text-gray-600">
            Are you sure you want to delete the blog "{deletingBlog?.title}"? This action cannot be undone.
          </p>
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => {
                setIsDeleteModalOpen(false);
                setDeletingBlog(null);
              }}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleDeleteConfirm}
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Delete Blog
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
