
'use client';

import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CreateReviewData } from '../../../shared/api/reviewsApi';
import { useCasinoReview } from '../hooks/useCasinoReview';

interface CasinoReviewFormProps {
  casinoId?: number;
  casinoName?: string;
  onSuccess?: () => void;
}

interface FormData {
  userName: string;
  userEmail: string;
  Rating: number;
  Comment: string;
}

interface FormErrors {
  userName?: string;
  userEmail?: string;
  Rating?: string;
  Comment?: string;
}

export const CasinoReviewForm: React.FC<CasinoReviewFormProps> = ({ 
  casinoId, 
  casinoName = 'Casino',
  onSuccess 
}) => {
  const { t } = useTranslation();
  const { submitReview, isSubmitting, error, success, resetForm } = useCasinoReview();
  
  const [formData, setFormData] = useState<FormData>({
    userName: '',
    userEmail: '',
    Rating: 0,
    Comment: ''
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  // Валидация формы
  const validateForm = (): FormErrors => {
    const newErrors: FormErrors = {};

    // Валидация имени пользователя
    if (!formData.userName.trim()) {
      newErrors.userName = t('reviews.form.userName.required');
    } else if (formData.userName.trim().length < 2) {
      newErrors.userName = t('reviews.form.userName.minLength');
    } else if (formData.userName.trim().length > 50) {
      newErrors.userName = t('reviews.form.userName.maxLength');
    }

    // Валидация email (опциональное поле)
    if (formData.userEmail.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.userEmail)) {
      newErrors.userEmail = t('reviews.form.userEmail.invalid');
    }

    // Валидация рейтинга
    if (formData.Rating < 1 || formData.Rating > 5) {
      newErrors.Rating = t('reviews.form.rating.required');
    }

    // Валидация комментария
    if (!formData.Comment.trim()) {
      newErrors.Comment = t('reviews.form.comment.required');
    } else if (formData.Comment.trim().length < 10) {
      newErrors.Comment = t('reviews.form.comment.minLength');
    } else if (formData.Comment.trim().length > 1000) {
      newErrors.Comment = t('reviews.form.comment.maxLength');
    }

    return newErrors;
  };

  // Обновление ошибок при изменении данных
  useEffect(() => {
    const validate = () => {
      const newErrors: FormErrors = {};

      // Валидация имени пользователя
      if (!formData.userName.trim()) {
        newErrors.userName = t('reviews.form.userName.required');
      } else if (formData.userName.trim().length < 2) {
        newErrors.userName = t('reviews.form.userName.minLength');
      } else if (formData.userName.trim().length > 50) {
        newErrors.userName = t('reviews.form.userName.maxLength');
      }

      // Валидация email (опциональное поле)
      if (formData.userEmail.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.userEmail)) {
        newErrors.userEmail = t('reviews.form.userEmail.invalid');
      }

      // Валидация рейтинга
      if (formData.Rating < 1 || formData.Rating > 5) {
        newErrors.Rating = t('reviews.form.rating.required');
      }

      // Валидация комментария
      if (!formData.Comment.trim()) {
        newErrors.Comment = t('reviews.form.comment.required');
      } else if (formData.Comment.trim().length < 10) {
        newErrors.Comment = t('reviews.form.comment.minLength');
      } else if (formData.Comment.trim().length > 1000) {
        newErrors.Comment = t('reviews.form.comment.maxLength');
      }

      return newErrors;
    };

    if (Object.keys(touched).length > 0) {
      setErrors(validate());
    }
  }, [formData, touched, t]);

  const handleInputChange = (field: keyof FormData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  const handleStarClick = (rating: number) => {
    handleInputChange('Rating', rating);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    setErrors(newErrors);
    setTouched({ userName: true, userEmail: true, Rating: true, Comment: true });
    
    if (Object.keys(newErrors).length === 0) {
      const reviewData: CreateReviewData = {
        userName: formData.userName.trim(),
        userEmail: formData.userEmail.trim() || undefined,
        Rating: formData.Rating,
        Comment: formData.Comment.trim(),
        online_casino: casinoId
      };
      
      await submitReview(reviewData);
    }
  };

  const handleReset = () => {
    setFormData({
      userName: '',
      userEmail: '',
      Rating: 0,
      Comment: ''
    });
    setErrors({});
    setTouched({});
    resetForm();
  };

  // Обработка успешной отправки
  useEffect(() => {
    const resetFormAndNotify = () => {
      setFormData({
        userName: '',
        userEmail: '',
        Rating: 0,
        Comment: ''
      });
      setErrors({});
      setTouched({});
      resetForm();
      if (onSuccess) {
        onSuccess();
      }
    };

    if (success) {
      resetFormAndNotify();
    }
  }, [success, onSuccess, resetForm]);

  const StarRating = () => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => handleStarClick(star)}
            className={`w-8 h-8 transition-colors duration-200 ${
              star <= formData.Rating 
                ? 'text-yellow-400 hover:text-yellow-500' 
                : 'text-gray-300 hover:text-yellow-300'
            }`}
          >
            <svg 
              fill="currentColor" 
              viewBox="0 0 20 20" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </button>
        ))}
        <span className="ml-2 text-sm text-brand-light-gray">
          {formData.Rating > 0 ? t('reviews.form.rating.display', { rating: formData.Rating }) : t('reviews.form.rating.placeholder')}
        </span>
      </div>
    );
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-brand-medium rounded-lg shadow-lg overflow-hidden">
      {/* Заголовок формы */}
      <div className="bg-brand-dark px-6 py-4 border-b border-brand-gray">
        <h2 className="text-xl font-semibold text-brand-light-gray">
          {t('reviews.form.title', { casinoName })}
        </h2>
        <p className="text-sm text-gray-400 mt-1">
          {t('reviews.form.subtitle')}
        </p>
      </div>

      {/* Основная форма */}
      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        {/* Сообщения об успехе/ошибке */}
        {success && (
          <div className="bg-green-600 bg-opacity-20 border border-green-500 rounded-md p-4">
            <p className="text-green-400 text-sm">
              {t('reviews.form.messages.success')}
            </p>
          </div>
        )}
        
        {error && (
          <div className="bg-brand-accent-red bg-opacity-20 border border-brand-accent-red rounded-md p-4">
            <p className="text-brand-accent-red text-sm">
              {t('reviews.form.messages.error', { error })}
            </p>
          </div>
        )}

        {/* Поля формы */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Имя пользователя */}
          <div>
            <label htmlFor="userName" className="block text-sm font-medium text-brand-light-gray mb-2">
              {t('reviews.form.userName.label')}
            </label>
            <input
              type="text"
              id="userName"
              value={formData.userName}
              onChange={(e) => handleInputChange('userName', e.target.value)}
              className={`w-full px-4 py-3 bg-brand-dark border rounded-md text-brand-light-gray placeholder-gray-400 focus:outline-none focus:ring-2 transition-colors ${
                errors.userName && touched.userName
                  ? 'border-brand-accent-red focus:ring-brand-accent-red'
                  : 'border-brand-gray focus:ring-blue-500 focus:border-blue-500'
              }`}
              placeholder={t('reviews.form.userName.placeholder')}
              disabled={isSubmitting}
            />
            {errors.userName && touched.userName && (
              <p className="text-brand-accent-red text-xs mt-1">{errors.userName}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="userEmail" className="block text-sm font-medium text-brand-light-gray mb-2">
              {t('reviews.form.userEmail.label')}
            </label>
            <input
              type="email"
              id="userEmail"
              value={formData.userEmail}
              onChange={(e) => handleInputChange('userEmail', e.target.value)}
              className={`w-full px-4 py-3 bg-brand-dark border rounded-md text-brand-light-gray placeholder-gray-400 focus:outline-none focus:ring-2 transition-colors ${
                errors.userEmail && touched.userEmail
                  ? 'border-brand-accent-red focus:ring-brand-accent-red'
                  : 'border-brand-gray focus:ring-blue-500 focus:border-blue-500'
              }`}
              placeholder={t('reviews.form.userEmail.placeholder')}
              disabled={isSubmitting}
            />
            {errors.userEmail && touched.userEmail && (
              <p className="text-brand-accent-red text-xs mt-1">{errors.userEmail}</p>
            )}
          </div>
        </div>

        {/* Рейтинг */}
        <div>
          <label className="block text-sm font-medium text-brand-light-gray mb-3">
            {t('reviews.form.rating.label')}
          </label>
          <StarRating />
          {errors.Rating && touched.Rating && (
            <p className="text-brand-accent-red text-xs mt-2">{errors.Rating}</p>
          )}
        </div>

        {/* Комментарий */}
        <div>
          <label htmlFor="comment" className="block text-sm font-medium text-brand-light-gray mb-2">
            {t('reviews.form.comment.label')}
          </label>
          <textarea
            id="comment"
            rows={4}
            value={formData.Comment}
            onChange={(e) => handleInputChange('Comment', e.target.value)}
            className={`w-full px-4 py-3 bg-brand-dark border rounded-md text-brand-light-gray placeholder-gray-400 focus:outline-none focus:ring-2 transition-colors resize-none ${
              errors.Comment && touched.Comment
                ? 'border-brand-accent-red focus:ring-brand-accent-red'
                : 'border-brand-gray focus:ring-blue-500 focus:border-blue-500'
            }`}
            placeholder={t('reviews.form.comment.placeholder')}
            disabled={isSubmitting}
          />
          <div className="flex justify-between mt-1">
            {errors.Comment && touched.Comment && (
              <p className="text-brand-accent-red text-xs">{errors.Comment}</p>
            )}
            <p className="text-xs text-gray-400 ml-auto">
              {t('reviews.form.comment.counter', { current: formData.Comment.length })}
            </p>
          </div>
        </div>

        {/* Кнопки */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`flex-1 px-6 py-3 rounded-md font-medium transition-all duration-200 ${
              isSubmitting
                ? 'bg-gray-600 text-gray-300 cursor-not-allowed'
                : 'bg-brand-accent-red hover:bg-red-700 text-white hover:shadow-lg transform hover:-translate-y-0.5'
            }`}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                {t('reviews.form.buttons.submitting')}
              </span>
            ) : (
              t('reviews.form.buttons.submit')
            )}
          </button>
          
          <button
            type="button"
            onClick={handleReset}
            disabled={isSubmitting}
            className="px-6 py-3 border border-brand-gray text-brand-light-gray rounded-md hover:bg-brand-gray transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {t('reviews.form.buttons.clear')}
          </button>
        </div>
      </form>

      {/* Информация */}
      <div className="bg-brand-dark px-6 py-4 border-t border-brand-gray">
        <p className="text-xs text-gray-400">
          {t('reviews.form.disclaimer')}
        </p>
      </div>
    </div>
  );
};